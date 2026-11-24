import { q } from './db';
import { addDays, centralDay, dayStart, weekDays } from './time';
import { callsForUser, dayCallStats, fetchCalls } from './calls';
import { CALLER_PRESETS } from './callers';
import { fetchAppointments } from './appointments';
import { fetchPipelineResults } from './results';
import { PERSON_RESULTS } from './calls';

function workedSeconds(shift, breaks, now) {
  const start = new Date(shift.clock_in).getTime();
  const end = shift.clock_out ? new Date(shift.clock_out).getTime() : now;
  let off = 0;
  for (const b of breaks) {
    const from = Math.max(start, new Date(b.start_at).getTime());
    const to = Math.min(end, b.end_at ? new Date(b.end_at).getTime() : now);
    if (to > from) off += to - from;
  }
  return { worked: Math.max(0, Math.floor((end - start - off) / 1000)), breakSeconds: Math.floor(off / 1000) };
}

export async function clockStatus(userId) {
  const rows = await q(
    `SELECT s.id, s.clock_in, b.start_at AS break_start
     FROM team_shifts s LEFT JOIN team_breaks b ON b.shift_id=s.id AND b.end_at IS NULL
     WHERE s.user_id=$1 AND s.clock_out IS NULL`, [userId]);
  if (!rows[0]) return { state: 'out' };
  return { state: rows[0].break_start ? 'break' : 'in', clockIn: rows[0].clock_in, breakStart: rows[0].break_start || null };
}

export async function clockAction(userId, action) {
  let rows;
  if (action === 'in') {
    rows = await q(`INSERT INTO team_shifts (user_id, clock_in) VALUES ($1, now())
      ON CONFLICT (user_id) WHERE clock_out IS NULL DO NOTHING RETURNING id`, [userId]);
  } else if (action === 'break') {
    rows = await q(`INSERT INTO team_breaks (shift_id)
      SELECT id FROM team_shifts WHERE user_id=$1 AND clock_out IS NULL
      ON CONFLICT (shift_id) WHERE end_at IS NULL DO NOTHING RETURNING shift_id AS id`, [userId]);
  } else if (action === 'resume') {
    rows = await q(`UPDATE team_breaks SET end_at=now() WHERE end_at IS NULL
      AND shift_id IN (SELECT id FROM team_shifts WHERE user_id=$1 AND clock_out IS NULL) RETURNING shift_id AS id`, [userId]);
  } else if (action === 'out') {
    rows = await q(`WITH s AS (
        UPDATE team_shifts SET clock_out=now() WHERE user_id=$1 AND clock_out IS NULL AND clock_in < now() RETURNING id
      ), b AS (
        UPDATE team_breaks SET end_at=now() WHERE end_at IS NULL AND shift_id IN (SELECT id FROM s) RETURNING id
      ) SELECT id FROM s`, [userId]);
  } else {
    return false;
  }
  // The shift that changed, or false if nothing did.
  return rows[0]?.id || false;
}

// Paid hours an admin set by hand, keyed "userId|day".
async function dayHours(fromDay, toDay, userIds) {
  if (!userIds.length) return new Map();
  const rows = await q(
    `SELECT h.user_id, h.work_day::text AS day, h.paid_seconds, h.reason, u.name AS editor, h.updated_at
     FROM team_day_hours h JOIN team_users u ON u.id=h.editor_id
     WHERE h.work_day >= $1 AND h.work_day <= $2 AND h.user_id = ANY($3::uuid[])`, [fromDay, toDay, userIds]);
  return new Map(rows.map((r) => [`${r.user_id}|${r.day}`, { seconds: r.paid_seconds, reason: r.reason, editor: r.editor, at: r.updated_at }]));
}

export async function setDayHours({ userId, day, seconds, reason, editorId }) {
  if (seconds === null) {
    const rows = await q('DELETE FROM team_day_hours WHERE user_id=$1 AND work_day=$2 RETURNING paid_seconds', [userId, day]);
    if (rows[0]) await q('INSERT INTO team_admin_actions (admin_id, user_id, action, detail) VALUES ($1,$2,$3,$4)', [editorId, userId, 'clear-paid-hours', `${day}: was ${rows[0].paid_seconds}s. ${reason}`]);
    return { ok: true };
  }
  await q(`INSERT INTO team_day_hours (user_id, work_day, paid_seconds, reason, editor_id) VALUES ($1,$2,$3,$4,$5)
    ON CONFLICT (user_id, work_day) DO UPDATE SET paid_seconds=EXCLUDED.paid_seconds, reason=EXCLUDED.reason, editor_id=EXCLUDED.editor_id, updated_at=now()`,
  [userId, day, seconds, reason, editorId]);
  await q('INSERT INTO team_admin_actions (admin_id, user_id, action, detail) VALUES ($1,$2,$3,$4)', [editorId, userId, 'set-paid-hours', `${day}: ${seconds}s. ${reason}`]);
  return { ok: true };
}

export async function weekReport(monday, onlyUserId = null, { refresh = true } = {}) {
  const days = weekDays(monday);
  const start = dayStart(monday);
  const end = dayStart(addDays(monday, 7));
  const now = Date.now();
  const users = await q(
    `SELECT id, name, username, role, active, ghl_user_id, caller_numbers, hourly_rate FROM team_users
     WHERE ($1::uuid IS NULL OR id=$1::uuid) ORDER BY role DESC, name`, [onlyUserId]);
  const shifts = await q(
    `SELECT id, user_id, clock_in, clock_out FROM team_shifts
     WHERE clock_in >= $1 AND clock_in < $2 AND ($3::uuid IS NULL OR user_id=$3::uuid) ORDER BY clock_in`,
    [start.toISOString(), end.toISOString(), onlyUserId]);
  const breaks = shifts.length
    ? await q('SELECT shift_id, start_at, end_at FROM team_breaks WHERE shift_id = ANY($1::uuid[])', [shifts.map((s) => s.id)])
    : [];
  const edited = shifts.length
    ? await q('SELECT DISTINCT shift_id FROM team_edits WHERE shift_id = ANY($1::uuid[])', [shifts.map((s) => s.id)])
    : [];
  const editedIds = new Set(edited.map((e) => e.shift_id));
  const callData = await fetchCalls(start, end, { refresh });
  const setHours = await dayHours(days[0], days[days.length - 1], users.map((u) => u.id));

  const people = [];
  for (const user of users) {
    const mine = shifts.filter((s) => s.user_id === user.id).map((s) => {
      const { worked, breakSeconds } = workedSeconds(s, breaks.filter((b) => b.shift_id === s.id), now);
      return { id: s.id, day: centralDay(s.clock_in), clockIn: s.clock_in, clockOut: s.clock_out, workedSeconds: worked, breakSeconds, edited: editedIds.has(s.id) };
    });
    const userCalls = callsForUser(callData.calls, user);
    // Admins who don't work the phones stay off the board; admins who do stay on it.
    if (user.role === 'admin' && !mine.length && !userCalls.length) continue;
    const rows = days.map((day) => {
      const dayShifts = mine.filter((s) => s.day === day);
      const clocked = dayShifts.reduce((n, s) => n + s.workedSeconds, 0);
      const override = setHours.get(`${user.id}|${day}`) || null;
      const calls = dayCallStats(userCalls, day, mine);
      return {
        day, shifts: dayShifts, clockedSeconds: clocked, workedSeconds: override ? override.seconds : clocked,
        paidOverride: override, activeSeconds: calls?.activeSeconds || 0, calls,
      };
    });
    // Paid hours: what an admin set for the day, else the clocked hours.
    const totalSeconds = rows.reduce((n, r) => n + r.workedSeconds, 0);
    const rate = user.hourly_rate === null ? null : Number(user.hourly_rate);
    people.push({
      id: user.id, name: user.name, username: user.username, status: await clockStatus(user.id), days: rows, totalSeconds,
      clockedSeconds: rows.reduce((n, r) => n + r.clockedSeconds, 0), activeSeconds: rows.reduce((n, r) => n + r.activeSeconds, 0),
      hourlyRate: rate, estimatedPay: rate === null ? null : Math.round((totalSeconds / 3600) * rate * 100) / 100,
      totals: {
        dials: rows.reduce((n, r) => n + (r.calls?.dials || 0), 0),
        answered: rows.reduce((n, r) => n + (r.calls?.answered || 0), 0),
        conversations: rows.reduce((n, r) => n + (r.calls?.conversations || 0), 0),
        talkSeconds: rows.reduce((n, r) => n + (r.calls?.talkSeconds || 0), 0),
        talkMissing: rows.reduce((n, r) => n + (r.calls?.talkMissing || 0), 0),
        offClock: rows.reduce((n, r) => n + (r.calls?.offClock || 0), 0),
      },
    });
  }
  return { week: monday, days, people, callsConnected: callData.ok, ghlConnected: callData.ghlOk, wavvConnected: callData.wavvOk, wavvConfigured: callData.wavvConfigured, callsPartial: callData.partial, callsUpdatedAt: callData.updatedAt };
}

// Read-only call report for the GHL dashboard: names and totals only, no pay
// and no customer data.
export async function callReport(from, to, { refresh = false } = {}) {
  const days = [];
  for (let day = from; day <= to; day = addDays(day, 1)) days.push(day);
  const start = dayStart(from);
  const end = dayStart(addDays(to, 1));
  const now = Date.now();
  const users = await q('SELECT id, ghl_user_id FROM team_users WHERE ghl_user_id = ANY($1::text[])', [CALLER_PRESETS.map((c) => c.ghlUserId)]);
  const shifts = users.length
    ? await q(
      `SELECT id, user_id, clock_in, clock_out FROM team_shifts
       WHERE clock_in >= $1 AND clock_in < $2 AND user_id = ANY($3::uuid[]) ORDER BY clock_in`,
      [start.toISOString(), end.toISOString(), users.map((u) => u.id)])
    : [];
  const breaks = shifts.length
    ? await q('SELECT shift_id, start_at, end_at FROM team_breaks WHERE shift_id = ANY($1::uuid[])', [shifts.map((s) => s.id)])
    : [];
  const setHours = await dayHours(from, to, users.map((u) => u.id));
  const [callData, appointmentData, pipelineData] = await Promise.all([
    fetchCalls(start, end, { refresh }), fetchAppointments(start, end), fetchPipelineResults(start, end),
  ]);

  const people = CALLER_PRESETS.map((caller) => {
    const account = users.find((u) => u.ghl_user_id === caller.ghlUserId);
    const mine = account ? shifts.filter((s) => s.user_id === account.id).map((s) => ({
      day: centralDay(s.clock_in), clockIn: s.clock_in, clockOut: s.clock_out,
      workedSeconds: workedSeconds(s, breaks.filter((b) => b.shift_id === s.id), now).worked,
    })) : [];
    const calls = callsForUser(callData.calls, { ghl_user_id: caller.ghlUserId, caller_numbers: caller.numbers });
    const appointments = appointmentData.appointments.filter((a) => a.userId === caller.ghlUserId);
    // WAVV callers pick a result on each call; GHL callers' results come from
    // their pipeline, which has no per-call link, so "no result" is unknown there.
    const fromPipeline = Boolean(caller.pipelineId);
    const results = fromPipeline
      ? pipelineData.results.filter((r) => r.userId === caller.ghlUserId)
      : calls.filter((c) => c.wavv && PERSON_RESULTS.has(c.result)).map((c) => ({ result: c.result, at: c.at }));
    const resultsOk = fromPipeline ? pipelineData.ok : callData.wavvOk;
    const noResult = fromPipeline ? null : calls.filter((c) => c.wavv && !c.result).length;
    const rows = days.map((day) => {
      const dayShifts = mine.filter((s) => s.day === day);
      const override = account ? setHours.get(`${account.id}|${day}`) : null;
      return {
        day, workedSeconds: override ? override.seconds : dayShifts.reduce((n, s) => n + s.workedSeconds, 0), calls: dayCallStats(calls, day, mine),
        appointments: appointments.filter((a) => centralDay(a.bookedAt) === day).length,
        results: results.filter((r) => centralDay(r.at) === day).length,
      };
    });
    const sum = (field) => rows.reduce((n, r) => n + (r.calls?.[field] || 0), 0);
    const count = (...names) => results.filter((r) => names.includes(r.result)).length;
    return {
      key: caller.key,
      name: caller.name,
      onTimesheet: Boolean(account),
      resultsOk,
      resultSource: fromPipeline ? 'pipeline' : 'dialer',
      rows,
      totals: {
        results: results.length,
        interested: count('interested', 'callback', 'appointment_requested', 'appointment'),
        notInterested: count('not_interested'),
        wrongNumber: count('wrong_number'),
        dnc: count('dnc'),
        noResult,
        dials: sum('dials'), thirty: sum('thirty'), oneMinute: sum('conversations'), talkSeconds: sum('talkSeconds'),
        offClock: account ? sum('offClock') : 0, workedSeconds: rows.reduce((n, r) => n + r.workedSeconds, 0),
        appointments: appointments.length,
        upcoming: appointments.filter((a) => new Date(a.startsAt).getTime() > now).length,
      },
    };
  });
  return { from, to, days, people, ghlOk: callData.ghlOk, wavvOk: callData.wavvOk, appointmentsOk: appointmentData.ok, partial: callData.partial, updatedAt: callData.updatedAt };
}

// A shift that is still running: only its start time changes, and it stays open.
async function moveOpenClockIn(existing, clockIn, reason, editorId) {
  if (clockIn > new Date()) return { error: 'Clock in cannot be in the future.' };
  const breaks = await q('SELECT start_at, end_at FROM team_breaks WHERE shift_id=$1 ORDER BY start_at', [existing.id]);
  if (breaks.some((b) => new Date(b.start_at) < clockIn)) return { error: 'Clock in must be before their first break.' };
  const overlap = await q(
    `SELECT id FROM team_shifts WHERE user_id=$1 AND id<>$2 AND clock_in < now() AND COALESCE(clock_out, now()) > $3 LIMIT 1`,
    [existing.user_id, existing.id, clockIn.toISOString()]);
  if (overlap.length) return { error: 'This overlaps another shift for that person.' };
  await q('UPDATE team_shifts SET clock_in=$1 WHERE id=$2', [clockIn.toISOString(), existing.id]);
  await q('INSERT INTO team_edits (shift_id, editor_id, reason, before_value, after_value) VALUES ($1,$2,$3,$4::jsonb,$5::jsonb)', [
    existing.id, editorId, reason, JSON.stringify({ clockIn: existing.clock_in, clockOut: null, breaks }),
    JSON.stringify({ clockIn: clockIn.toISOString(), clockOut: null }),
  ]);
  return { ok: true };
}

export async function saveShift({ shiftId, userId, clockIn, clockOut, breakMinutes, reason, editorId }) {
  const existing = shiftId ? (await q('SELECT id, user_id, clock_in, clock_out FROM team_shifts WHERE id=$1', [shiftId]))[0] : null;
  if (shiftId && !existing) return { error: 'That shift no longer exists.' };
  const owner = existing?.user_id || userId;
  if (!owner) return { error: 'Pick a person.' };
  if (existing && !existing.clock_out && !clockOut) return moveOpenClockIn(existing, clockIn, reason, editorId);
  if (!clockOut || clockOut <= clockIn) return { error: 'Clock out must be after clock in.' };
  if (clockOut > new Date()) return { error: 'Clock out cannot be in the future.' };
  const totalMinutes = (clockOut - clockIn) / 60000;
  if (!Number.isFinite(breakMinutes) || breakMinutes < 0 || breakMinutes >= totalMinutes) return { error: 'Break must be shorter than the shift.' };
  const overlap = await q(
    `SELECT id FROM team_shifts WHERE user_id=$1 AND ($2::uuid IS NULL OR id<>$2::uuid)
     AND clock_in < $4 AND COALESCE(clock_out, now()) > $3 LIMIT 1`,
    [owner, shiftId || null, clockIn.toISOString(), clockOut.toISOString()]);
  if (overlap.length) return { error: 'This overlaps another shift for that person.' };

  const before = existing ? {
    clockIn: existing.clock_in, clockOut: existing.clock_out,
    breaks: await q('SELECT start_at, end_at FROM team_breaks WHERE shift_id=$1 ORDER BY start_at', [existing.id]),
  } : null;
  let id = existing?.id;
  if (id) {
    await q('UPDATE team_shifts SET clock_in=$1, clock_out=$2 WHERE id=$3', [clockIn.toISOString(), clockOut.toISOString(), id]);
  } else {
    id = (await q('INSERT INTO team_shifts (user_id, clock_in, clock_out) VALUES ($1,$2,$3) RETURNING id', [owner, clockIn.toISOString(), clockOut.toISOString()]))[0].id;
  }
  await q('DELETE FROM team_breaks WHERE shift_id=$1', [id]);
  if (breakMinutes > 0) {
    const startAt = new Date(clockIn.getTime() + ((totalMinutes - breakMinutes) / 2) * 60000);
    await q('INSERT INTO team_breaks (shift_id, start_at, end_at) VALUES ($1,$2,$3)', [id, startAt.toISOString(), new Date(startAt.getTime() + breakMinutes * 60000).toISOString()]);
  }
  await q('INSERT INTO team_edits (shift_id, editor_id, reason, before_value, after_value) VALUES ($1,$2,$3,$4::jsonb,$5::jsonb)', [
    id, editorId, reason, before ? JSON.stringify(before) : null,
    JSON.stringify({ clockIn: clockIn.toISOString(), clockOut: clockOut.toISOString(), breakMinutes }),
  ]);
  return { ok: true };
}
