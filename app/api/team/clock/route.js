import { q } from '../../../../lib/team/db';
import { currentUser, failure, json, sameOrigin } from '../../../../lib/team/auth';
import { clockAction, clockStatus } from '../../../../lib/team/store';
import { centralDay, validDay } from '../../../../lib/team/time';

export const dynamic = 'force-dynamic';

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
      return json({ ok: true });
    }
    const changed = await clockAction(user.id, body.action);
    const status = await clockStatus(user.id);
    if (!changed) return json({ error: 'Your status already changed. The page is up to date now.', status }, 409);
    return json({ ok: true, status });
  } catch (err) {
    return failure(err);
  }
}
