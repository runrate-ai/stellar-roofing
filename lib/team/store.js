import { q } from './db';
import { addDays, centralDay, dayStart, weekDays } from './time';
import { callsForUser, dayCallStats, fetchCalls } from './calls';

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
      ON CONFLICT (shift_id) WHERE end_at IS NULL DO NOTHING RETURNING id`, [userId]);
  } else if (action === 'resume') {
    rows = await q(`UPDATE team_breaks SET end_at=now() WHERE end_at IS NULL
      AND shift_id IN (SELECT id FROM team_shifts WHERE user_id=$1 AND clock_out IS NULL) RETURNING id`, [userId]);
  } else if (action === 'out') {
    rows = await q(`WITH s AS (
        UPDATE team_shifts SET clock_out=now() WHERE user_id=$1 AND clock_out IS NULL AND clock_in < now() RETURNING id
      ), b AS (
        UPDATE team_breaks SET end_at=now() WHERE end_at IS NULL AND shift_id IN (SELECT id FROM s) RETURNING id
      ) SELECT id FROM s`, [userId]);
  } else {
    return false;
  }
  return rows.length > 0;
}

export async function weekReport(monday, onlyUserId = null) {
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
  const callData = await fetchCalls(start, end);

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
      return { day, shifts: dayShifts, workedSeconds: dayShifts.reduce((n, s) => n + s.workedSeconds, 0), calls: dayCallStats(userCalls, day, mine) };
    });
    const totalSeconds = rows.reduce((n, r) => n + r.workedSeconds, 0);
    const rate = user.hourly_rate === null ? null : Number(user.hourly_rate);
    people.push({
      id: user.id, name: user.name, username: user.username, status: await clockStatus(user.id), days: rows, totalSeconds,
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
  return { week: monday, days, people, callsConnected: callData.ok, ghlConnected: callData.ghlOk, wavvConnected: callData.wavvOk, wavvConfigured: callData.wavvConfigured, callsPartial: callData.partial };
}

export async function saveShift({ shiftId, userId, clockIn, clockOut, breakMinutes, reason, editorId }) {
  const existing = shiftId ? (await q('SELECT id, user_id, clock_in, clock_out FROM team_shifts WHERE id=$1', [shiftId]))[0] : null;
  if (shiftId && !existing) return { error: 'That shift no longer exists.' };
  const owner = existing?.user_id || userId;
  if (!owner) return { error: 'Pick a person.' };
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
