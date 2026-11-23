import { q } from '../../../../lib/team/db';
import { currentUser, failure, json } from '../../../../lib/team/auth';
import { clockStatus, weekReport } from '../../../../lib/team/store';
import { centralDay, mondayOf, validDay } from '../../../../lib/team/time';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const user = await currentUser();
    if (!user) {
      const count = await q('SELECT count(*)::int AS n FROM team_users');
      return json({ user: null, setupNeeded: count[0].n === 0 });
    }
    const me = { id: user.id, name: user.name, role: user.role, mustChange: user.must_change };
    if (user.must_change) return json({ user: me });
    const asked = new URL(request.url).searchParams.get('week');
    const week = validDay(asked) ? mondayOf(asked) : mondayOf(centralDay());
    const report = await weekReport(week, user.id);
    const requests = await q(`SELECT id, work_day::text AS day, note, status FROM team_fix_requests WHERE user_id=$1 ORDER BY created_at DESC LIMIT 5`, [user.id]);
    return json({ user: me, status: await clockStatus(user.id), report, requests, serverNow: new Date().toISOString() });
  } catch (err) {
    return failure(err);
  }
}
