import { q } from '../../../../lib/team/db';
import { currentUser, failure, json, logAdminAction, sameOrigin } from '../../../../lib/team/auth';
import { clockAction, clockStatus } from '../../../../lib/team/store';
import { centralDay, validDay } from '../../../../lib/team/time';

export const dynamic = 'force-dynamic';
const LABELS = { in: 'Clocked in', break: 'Started break', resume: 'Ended break', out: 'Clocked out' };

export async function POST(request) {
  if (!sameOrigin(request)) return json({ error: 'Not allowed.' }, 403);
  try {
    const user = await currentUser();
    if (!user) return json({ error: 'Please log in.' }, 401);
    if (user.must_change) return json({ error: 'Change your password first.' }, 403);
    const body = await request.json().catch(() => ({}));
    if (body.action === 'request-fix') {
      const note = String(body.note || '').trim().slice(0, 500);
      if (!validDay(body.day) || body.day > centralDay() || !note) return json({ error: 'Pick the day and say what needs fixing.' }, 400);
      await q('INSERT INTO team_fix_requests (user_id, work_day, note) VALUES ($1,$2,$3)', [user.id, body.day, note]);
      if (user.actor) await logAdminAction(user.actor.id, user.id, 'request-fix', `${body.day}: ${note}`);
      return json({ ok: true });
    }
    const shiftId = await clockAction(user.id, body.action);
    const status = await clockStatus(user.id);
    if (!shiftId) return json({ error: 'Your status already changed. The page is up to date now.', status }, 409);
    if (user.actor) {
      // Done by an admin for the caller: record it and mark the shift as edited.
      const reason = `${LABELS[body.action]} by ${user.actor.name} for ${user.name}`;
      await logAdminAction(user.actor.id, user.id, body.action, reason);
      await q('INSERT INTO team_edits (shift_id, editor_id, reason, before_value, after_value) VALUES ($1,$2,$3,NULL,$4::jsonb)',
        [shiftId, user.actor.id, reason, JSON.stringify({ action: body.action, at: new Date().toISOString() })]);
    }
    return json({ ok: true, status });
  } catch (err) {
    return failure(err);
  }
}
