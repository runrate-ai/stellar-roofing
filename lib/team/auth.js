import crypto from 'crypto';
import { promisify } from 'util';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { q } from './db';

const scrypt = promisify(crypto.scrypt);
const COOKIE = 'stellar_team';
const SESSION_DAYS = 14;
const MAX_FAILS = 5;
const LOCK_MINUTES = 15;
const DUMMY_SALT = 'stellar-team-dummy-salt';

export async function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const key = await scrypt(password, salt, 32);
  return `${salt}:${key.toString('hex')}`;
}

async function checkPassword(password, stored) {
  const [salt, hex] = (stored || '').split(':');
  const key = await scrypt(password, salt || DUMMY_SALT, 32);
  if (!hex) return false;
  const expected = Buffer.from(hex, 'hex');
  return expected.length === key.length && crypto.timingSafeEqual(expected, key);
}

export function safeEqual(a, b) {
  const x = crypto.createHash('sha256').update(String(a)).digest();
  const y = crypto.createHash('sha256').update(String(b)).digest();
  return crypto.timingSafeEqual(x, y);
}

export function temporaryPassword() {
  const letters = 'abcdefghjkmnpqrstuvwxyz23456789';
  return Array.from(crypto.randomBytes(12), (b) => letters[b % letters.length]).join('');
}

const tokenHash = (token) => crypto.createHash('sha256').update(token).digest('hex');

export async function startSession(userId) {
  const token = crypto.randomBytes(32).toString('base64url');
  const expires = new Date(Date.now() + SESSION_DAYS * 86400000);
  await q('DELETE FROM team_sessions WHERE expires_at < now()');
  await q('INSERT INTO team_sessions (token_hash, user_id, expires_at) VALUES ($1,$2,$3)', [tokenHash(token), userId, expires.toISOString()]);
  cookies().set(COOKIE, token, {
    httpOnly: true, sameSite: 'strict', secure: process.env.NODE_ENV === 'production', path: '/', expires,
  });
}

export async function endSession() {
  const token = cookies().get(COOKIE)?.value;
  if (token) await q('DELETE FROM team_sessions WHERE token_hash=$1', [tokenHash(token)]);
  cookies().delete(COOKIE);
}

export async function endAllSessions(userId) {
  await q('DELETE FROM team_sessions WHERE user_id=$1', [userId]);
}

const USER_FIELDS = 'u.id, u.name, u.username, u.role, u.must_change, u.ghl_user_id, u.caller_numbers, u.hourly_rate';

// The logged-in person. When an admin is acting as a caller, this is the caller,
// with `actor` naming the admin, so every caller screen and action works as-is.
export async function currentUser() {
  const token = cookies().get(COOKIE)?.value;
  if (!token) return null;
  const rows = await q(
    `SELECT ${USER_FIELDS}, s.acting_as
     FROM team_sessions s JOIN team_users u ON u.id=s.user_id
     WHERE s.token_hash=$1 AND s.expires_at>now() AND u.active`, [tokenHash(token)]);
  const { acting_as: actingAs, ...me } = rows[0] || {};
  if (!me.id) return null;
  if (!actingAs || me.role !== 'admin' || me.must_change) return me;
  const target = await q(`SELECT ${USER_FIELDS} FROM team_users u WHERE u.id=$1 AND u.active AND u.role='caller'`, [actingAs]);
  if (!target[0]) return me;
  return { ...target[0], must_change: false, actor: { id: me.id, name: me.name } };
}

export async function startActing(adminId, userId) {
  const token = cookies().get(COOKIE)?.value;
  if (!token) return false;
  const rows = await q('UPDATE team_sessions SET acting_as=$1 WHERE token_hash=$2 AND user_id=$3 RETURNING user_id', [userId, tokenHash(token), adminId]);
  return rows.length > 0;
}

export async function stopActing() {
  const token = cookies().get(COOKIE)?.value;
  if (token) await q('UPDATE team_sessions SET acting_as=NULL WHERE token_hash=$1', [tokenHash(token)]);
}

export async function logAdminAction(adminId, userId, action, detail = null) {
  await q('INSERT INTO team_admin_actions (admin_id, user_id, action, detail) VALUES ($1,$2,$3,$4)', [adminId, userId, action, detail]);
}

export async function login(username, password) {
  const name = String(username || '').trim().toLowerCase();
  const rows = await q('SELECT id, password_hash, failed_logins, locked_until, active FROM team_users WHERE username=$1', [name]);
  const user = rows[0];
  const ok = await checkPassword(String(password || ''), user?.password_hash);
  if (!user || !user.active) return { error: 'Wrong username or password.' };
  if (user.locked_until && new Date(user.locked_until) > new Date()) {
    return { error: `Too many tries. Wait ${LOCK_MINUTES} minutes and try again.` };
  }
  if (!ok) {
    const fails = user.failed_logins + 1;
    const lock = fails >= MAX_FAILS ? new Date(Date.now() + LOCK_MINUTES * 60000).toISOString() : null;
    await q('UPDATE team_users SET failed_logins=$1, locked_until=$2 WHERE id=$3', [lock ? 0 : fails, lock, user.id]);
    return { error: 'Wrong username or password.' };
  }
  await q('UPDATE team_users SET failed_logins=0, locked_until=NULL WHERE id=$1', [user.id]);
  await startSession(user.id);
  return { ok: true };
}

export async function changePassword(user, current, next) {
  const rows = await q('SELECT password_hash FROM team_users WHERE id=$1', [user.id]);
  if (!(await checkPassword(String(current || ''), rows[0]?.password_hash))) return { error: 'Current password is wrong.' };
  if (String(next || '').length < 10) return { error: 'Use at least 10 characters.' };
  await q('UPDATE team_users SET password_hash=$1, must_change=false WHERE id=$2', [await hashPassword(String(next)), user.id]);
  await endAllSessions(user.id);
  await startSession(user.id);
  return { ok: true };
}

export function json(body, status = 200) {
  return NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex, nofollow' } });
}

export function sameOrigin(request) {
  const origin = request.headers.get('origin');
  if (!origin) return false;
  try { return new URL(origin).host === request.headers.get('host'); } catch { return false; }
}

export function failure(err) {
  if (err?.message === 'TEAM_DB_NOT_CONNECTED') return json({ error: 'The timesheet database is not connected yet.' }, 503);
  console.error('team api error', err?.message);
  return json({ error: 'Something went wrong. Try again.' }, 500);
}
