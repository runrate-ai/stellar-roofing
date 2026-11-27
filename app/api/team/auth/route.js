import { q } from '../../../../lib/team/db';
import { changePassword, currentUser, endSession, failure, hashPassword, json, logAdminAction, login, safeEqual, sameOrigin, startSession, stopActing } from '../../../../lib/team/auth';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  if (!sameOrigin(request)) return json({ error: 'Not allowed.' }, 403);
  try {
    const body = await request.json().catch(() => ({}));
    if (body.action === 'login') {
      const result = await login(body.username, body.password);
      return json(result, result.error ? 401 : 200);
    }
    if (body.action === 'logout') {
      await endSession();
      return json({ ok: true });
    }
    if (body.action === 'stop-acting') {
      const user = await currentUser();
      if (user?.actor) await logAdminAction(user.actor.id, user.id, 'stop-acting');
      await stopActing();
      return json({ ok: true });
    }
    if (body.action === 'forgot') {
      // Same answer whether or not the username exists, so it can't be used to guess logins.
      const username = String(body.username || '').trim().toLowerCase();
      if (/^[a-z0-9._-]{3,30}$/.test(username)) {
        await q(`INSERT INTO team_reset_requests (user_id)
                 SELECT id FROM team_users WHERE username=$1 AND active
                 ON CONFLICT (user_id) WHERE status='open' DO NOTHING`, [username]);
      }
      return json({ ok: true });
    }
    if (body.action === 'change-password') {
      const user = await currentUser();
      if (!user) return json({ error: 'Please log in.' }, 401);
      if (user.actor) return json({ error: 'Go back to your own login to change a password.' }, 403);
      const result = await changePassword(user, body.current, body.next);
      return json(result, result.error ? 400 : 200);
    }
    if (body.action === 'setup') {
      const code = process.env.TEAM_SETUP_CODE;
      const name = String(body.name || '').trim().slice(0, 80);
      const username = String(body.username || '').trim().toLowerCase();
      if (!code || !safeEqual(body.code || '', code)) return json({ error: 'Setup code is wrong.' }, 403);
      if (!name || !/^[a-z0-9._-]{3,30}$/.test(username)) return json({ error: 'Enter a name and a simple username.' }, 400);
      if (String(body.password || '').length < 10) return json({ error: 'Use at least 10 characters.' }, 400);
      const hash = await hashPassword(String(body.password));
      const rows = await q(
        `INSERT INTO team_users (name, username, role, password_hash, must_change)
         SELECT $1,$2,'admin',$3,false WHERE NOT EXISTS (SELECT 1 FROM team_users) RETURNING id`, [name, username, hash]);
      if (!rows[0]) return json({ error: 'Setup is already done.' }, 409);
      await startSession(rows[0].id);
      return json({ ok: true });
    }
    return json({ error: 'Unknown action.' }, 400);
  } catch (err) {
    return failure(err);
  }
}
