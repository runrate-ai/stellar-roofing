import { q } from '../../../../lib/team/db';
import { currentUser, failure, json } from '../../../../lib/team/auth';
import { clockStatus, weekReport } from '../../../../lib/team/store';
import { centralDay, mondayOf, validDay } from '../../../../lib/team/time';

export const dynamic = 'force-dynamic';
// GHL can be slow; give background call refreshes room to finish.
export const maxDuration = 300;

export async function GET(request) {
  try {
    const user = await currentUser();
    if (!user) {
      const count = await q('SELECT count(*)::int AS n FROM team_users');
      return json({ user: null, setupNeeded: count[0].n === 0 });
    }
    const me = { id: user.id, name: user.name, role: user.role, mustChange: user.must_change };
    // Admins load their board separately, so login never waits on call data.
    if (user.must_change || user.role === 'admin') return json({ user: me });
    const params = new URL(request.url).searchParams;
    const asked = params.get('week');
    const week = validDay(asked) ? mondayOf(asked) : mondayOf(centralDay());
    const report = await weekReport(week, user.id, { refresh: params.get('refresh') === '1' });
    const requests = await q(`SELECT id, work_day::text AS day, note, status FROM team_fix_requests WHERE user_id=$1 ORDER BY created_at DESC LIMIT 5`, [user.id]);
    return json({ user: me, status: await clockStatus(user.id), report, requests, serverNow: new Date().toISOString() });
  } catch (err) {
    return failure(err);
  }
}
