import { q } from '../../../../lib/team/db';
import { currentUser, endAllSessions, failure, hashPassword, json, logAdminAction, sameOrigin, startActing, temporaryPassword } from '../../../../lib/team/auth';
import { monthReport, saveShift, setDayHours, setStartDate, weekReport } from '../../../../lib/team/store';
import { centralDay, fromCentralInput, mondayOf, validDay } from '../../../../lib/team/time';
import { CALLER_PRESETS } from '../../../../lib/team/callers';

export const dynamic = 'force-dynamic';
// GHL can be slow; give background call refreshes room to finish.
export const maxDuration = 300;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

async function isOwner(userId) {
  return (await q('SELECT 1 FROM team_users WHERE id=$1 AND is_owner', [userId])).length > 0;
}

async function admin() {
  const user = await currentUser();
  if (!user) return { response: json({ error: 'Please log in.' }, 401) };
  if (user.role !== 'admin' || user.must_change) return { response: json({ error: 'Not allowed.' }, 403) };
  return { user };
}

export async function GET(request) {
  try {
    const { response } = await admin();
    if (response) return response;
    const params = new URL(request.url).searchParams;
    const asked = params.get('week');
    const month = params.get('month');
    const refresh = params.get('refresh') === '1';
    const report = /^\d{4}-(0[1-9]|1[0-2])$/.test(month || '')
      ? await monthReport(month, { refresh })
      : await weekReport(validDay(asked) ? mondayOf(asked) : mondayOf(centralDay()), null, { refresh });
    const users = await q(`SELECT id, name, username, role, active, is_owner, hourly_rate, start_date::text AS start_date FROM team_users ORDER BY active DESC, is_owner DESC, role, name`);
    const requests = await q(`SELECT r.id, r.work_day::text AS day, r.note, u.name FROM team_fix_requests r JOIN team_users u ON u.id=r.user_id WHERE r.status='open' ORDER BY r.created_at`);
    return json({ report, users, requests, presets: CALLER_PRESETS.map(({ key, name, username }) => ({ key, name, username })) });
  } catch (err) {
    return failure(err);
  }
}

export async function POST(request) {
  if (!sameOrigin(request)) return json({ error: 'Not allowed.' }, 403);
  try {
    const { user, response } = await admin();
    if (response) return response;
    const b = await request.json().catch(() => ({}));

    if (b.action === 'add-user') {
      const preset = CALLER_PRESETS.find((p) => p.key === b.preset);
      const name = String(preset?.name || b.name || '').trim().slice(0, 80);
      const username = String(preset?.username || b.username || '').trim().toLowerCase();
      const role = b.role === 'admin' ? 'admin' : 'caller';
      if (!name || !/^[a-z0-9._-]{3,30}$/.test(username)) return json({ error: 'Enter a name and a simple username.' }, 400);
      const rate = b.hourlyRate === '' || b.hourlyRate == null ? null : Number(b.hourlyRate);
      if (rate !== null && (!Number.isFinite(rate) || rate < 0 || rate > 1000)) return json({ error: 'Check the hourly rate.' }, 400);
      const startDate = validDay(b.startDate) && b.startDate <= centralDay() ? b.startDate : centralDay();
      const password = temporaryPassword();
      const rows = await q(
        `INSERT INTO team_users (name, username, role, password_hash, ghl_user_id, caller_numbers, hourly_rate, start_date)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8) ON CONFLICT (username) DO NOTHING RETURNING id`,
        [name, username, role, await hashPassword(password), preset?.ghlUserId || null, preset?.numbers || '', rate, startDate]);
      if (!rows[0]) return json({ error: 'That username is taken.' }, 409);
      return json({ ok: true, username, temporaryPassword: password });
    }

    if (b.action === 'act-as' && UUID.test(b.userId || '')) {
      const target = await q(`SELECT id FROM team_users WHERE id=$1 AND active AND role='caller'`, [b.userId]);
      if (!target[0]) return json({ error: 'You can act as active callers only.' }, 400);
      if (!(await startActing(user.id, b.userId))) return json({ error: 'Please log in again.' }, 401);
      await logAdminAction(user.id, b.userId, 'start-acting');
      return json({ ok: true });
    }

    if (b.action === 'reset-password' && UUID.test(b.userId || '')) {
      const password = temporaryPassword();
      const rows = await q('UPDATE team_users SET password_hash=$1, must_change=true, failed_logins=0, locked_until=NULL WHERE id=$2 RETURNING username', [await hashPassword(password), b.userId]);
      if (!rows[0]) return json({ error: 'Person not found.' }, 404);
      await endAllSessions(b.userId);
      return json({ ok: true, username: rows[0].username, temporaryPassword: password });
    }

    if (b.action === 'set-owner' && UUID.test(b.userId || '')) {
      // The owner can hand it on; anyone can name the first owner while there is none.
      const owners = await q('SELECT id FROM team_users WHERE is_owner');
      if (owners.length && !user.is_owner) return json({ error: 'Only the owner can change who the owner is.' }, 403);
      const target = await q(`SELECT id FROM team_users WHERE id=$1 AND active AND role='admin'`, [b.userId]);
      if (!target[0]) return json({ error: 'The owner must be an active admin.' }, 400);
      await q('UPDATE team_users SET is_owner=(id=$1)', [b.userId]);
      await logAdminAction(user.id, b.userId, 'set-owner');
      return json({ ok: true });
    }

    if (b.action === 'set-active' && UUID.test(b.userId || '')) {
      if (b.userId === user.id) return json({ error: 'You cannot turn off your own login.' }, 400);
      if (await isOwner(b.userId)) return json({ error: "The owner's login cannot be turned off." }, 403);
      await q('UPDATE team_users SET active=$1 WHERE id=$2', [Boolean(b.active), b.userId]);
      if (!b.active) await endAllSessions(b.userId);
      return json({ ok: true });
    }

    if (b.action === 'set-role' && UUID.test(b.userId || '')) {
      if (b.role !== 'admin' && b.role !== 'caller') return json({ error: 'Pick a role.' }, 400);
      if (b.userId === user.id) return json({ error: 'You cannot change your own access.' }, 400);
      if (await isOwner(b.userId)) return json({ error: "The owner's admin access cannot be removed." }, 403);
      const rows = await q('UPDATE team_users SET role=$1 WHERE id=$2 RETURNING id', [b.role, b.userId]);
      if (!rows[0]) return json({ error: 'Person not found.' }, 404);
      return json({ ok: true });
    }

    if (b.action === 'set-rate' && UUID.test(b.userId || '')) {
      const rate = b.hourlyRate === '' || b.hourlyRate == null ? null : Number(b.hourlyRate);
      if (rate !== null && (!Number.isFinite(rate) || rate < 0 || rate > 1000)) return json({ error: 'Check the hourly rate.' }, 400);
      await q('UPDATE team_users SET hourly_rate=$1 WHERE id=$2', [rate, b.userId]);
      return json({ ok: true });
    }

    if (b.action === 'save-shift') {
      const clockIn = fromCentralInput(b.clockIn);
      const clockOut = fromCentralInput(b.clockOut);
      const reason = String(b.reason || '').trim().slice(0, 300);
      if (!clockIn || (!clockOut && !b.shiftId)) return json({ error: 'Enter both times.' }, 400);
      if (!reason) return json({ error: 'Say why this is being changed.' }, 400);
      if (b.shiftId && !UUID.test(b.shiftId)) return json({ error: 'Bad shift.' }, 400);
      if (!b.shiftId && !UUID.test(b.userId || '')) return json({ error: 'Pick a person.' }, 400);
      const result = await saveShift({ shiftId: b.shiftId || null, userId: b.userId || null, clockIn, clockOut, breakMinutes: Number(b.breakMinutes || 0), reason, editorId: user.id });
      return json(result, result.error ? 400 : 200);
    }

    if (b.action === 'set-start' && UUID.test(b.userId || '')) {
      if (b.startDate && (!validDay(b.startDate) || b.startDate > centralDay())) return json({ error: 'Pick a start date up to today.' }, 400);
      const result = await setStartDate({ userId: b.userId, startDate: b.startDate || null, editorId: user.id });
      return json(result, result.error ? 404 : 200);
    }

    if (b.action === 'set-day-hours' && UUID.test(b.userId || '')) {
      if (!validDay(b.day) || b.day > centralDay()) return json({ error: 'Pick a day up to today.' }, 400);
      const reason = String(b.reason || '').trim().slice(0, 300);
      if (!reason) return json({ error: 'Say why this is being changed.' }, 400);
      const cleared = b.hours === '' || b.hours == null;
      const hours = Number(b.hours);
      if (!cleared && (!Number.isFinite(hours) || hours < 0 || hours > 24)) return json({ error: 'Enter hours between 0 and 24.' }, 400);
      const target = await q('SELECT id FROM team_users WHERE id=$1', [b.userId]);
      if (!target[0]) return json({ error: 'Person not found.' }, 404);
      return json(await setDayHours({ userId: b.userId, day: b.day, seconds: cleared ? null : Math.round(hours * 3600), reason, editorId: user.id }));
    }

    if (b.action === 'close-request' && UUID.test(b.requestId || '')) {
      await q(`UPDATE team_fix_requests SET status='done' WHERE id=$1`, [b.requestId]);
      return json({ ok: true });
    }
    return json({ error: 'Unknown action.' }, 400);
  } catch (err) {
    return failure(err);
  }
}
