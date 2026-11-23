import { centralDay } from './time';

const GHL_API = 'https://services.leadconnectorhq.com';
const WAVV_API = 'https://api.wavv.com/v3';
const MAX_PAGES = 80;
const CACHE_MS = 60000;
const ANSWERED = new Set(['answered', 'completed']);
const cache = new Map();

const digits = (value) => String(value || '').replace(/\D/g, '').slice(-10);

// Both sources return call facts only. Customer names, ids, numbers, notes,
// and summaries are dropped here and never reach the database or the browser.
async function fetchGhlCalls(start, end) {
  // A read-only token just for call records; the lead form keeps its own.
  const token = process.env.TEAM_GHL_TOKEN || process.env.GHL_API_TOKEN;
  const location = process.env.GHL_LOCATION_ID;
  if (!token || !location) return { ok: false, calls: [], partial: false };
  const calls = [];
  let cursor = null;
  let partial = false;
  try {
    for (let page = 0; ; page += 1) {
      if (page >= MAX_PAGES) { partial = true; break; }
      const url = new URL(`${GHL_API}/conversations/messages/export`);
      url.searchParams.set('locationId', location);
      url.searchParams.set('channel', 'Call');
      url.searchParams.set('limit', '100');
      if (cursor) url.searchParams.set('cursor', cursor);
      const res = await fetch(url, {
        cache: 'no-store',
        headers: { Authorization: `Bearer ${token}`, Version: '2021-04-15', Accept: 'application/json' },
      });
      if (!res.ok) return { ok: false, calls: [], partial: false };
      const data = await res.json();
      const messages = data.messages || [];
      for (const m of messages) {
        const at = new Date(m.dateAdded);
        if (m.direction !== 'outbound' || at < start || at >= end) continue;
        const callMeta = m.meta?.call || {};
        const status = String(m.status || callMeta.status || '').toLowerCase();
        const duration = Number(callMeta.duration) || 0;
        calls.push({
          at: at.toISOString(), userId: m.userId || null, from: digits(m.from),
          answered: duration > 0 || ANSWERED.has(status), duration,
          loggedByWavv: !m.userId && m.source === 'api',
        });
      }
      cursor = data.nextCursor;
      const oldest = messages.length ? new Date(messages[messages.length - 1].dateAdded) : null;
      if (!messages.length || !cursor || oldest < start) break;
    }
  } catch {
    return { ok: false, calls: [], partial: false };
  }
  return { ok: true, calls, partial };
}

async function wavvPage(url, key) {
  for (let attempt = 0; attempt < 2; attempt += 1) {
    const res = await fetch(url, { cache: 'no-store', headers: { Authorization: `Bearer ${key}`, Accept: 'application/json' } });
    if (res.status !== 429 || attempt === 1) return res;
    const wait = Math.min(Number(res.headers.get('retry-after')) || 5, 30);
    await new Promise((resolve) => { setTimeout(resolve, wait * 1000); });
  }
  return null;
}

async function fetchWavvCalls(start, end) {
  const key = process.env.WAVV_API_KEY;
  if (!key) return { ok: false, configured: false, calls: [], partial: false };
  const byId = new Map();
  let cursor = null;
  let partial = false;
  try {
    for (let page = 0; ; page += 1) {
      if (page >= MAX_PAGES) { partial = true; break; }
      const url = new URL(`${WAVV_API}/calls`);
      url.searchParams.set('direction', 'outbound');
      url.searchParams.set('startedAfter', start.toISOString());
      url.searchParams.set('startedBefore', end.toISOString());
      url.searchParams.set('limit', '200');
      if (cursor) url.searchParams.set('cursor', cursor);
      const res = await wavvPage(url, key);
      if (!res?.ok) return { ok: false, configured: true, calls: [], partial: false };
      const data = await res.json();
      for (const c of data.data || []) {
        const at = new Date(c.startedAt);
        if (at < start || at >= end) continue;
        byId.set(c.id, {
          at: at.toISOString(), userId: c.userId || null, from: digits(c.callerId),
          answered: c.human === true, duration: Number(c.seconds) || 0, wavv: true,
        });
      }
      if (!data.nextCursor) break;
      if (data.nextCursor === cursor) { partial = true; break; }
      cursor = data.nextCursor;
    }
  } catch {
    return { ok: false, configured: true, calls: [], partial: false };
  }
  return { ok: true, configured: true, calls: [...byId.values()], partial };
}

export async function fetchCalls(start, end) {
  const key = `${start.toISOString()}|${end.toISOString()}`;
  const hit = cache.get(key);
  if (hit && Date.now() - hit.at < CACHE_MS) return hit.value;

  const [ghl, wavv] = await Promise.all([fetchGhlCalls(start, end), fetchWavvCalls(start, end)]);
  // WAVV's API is complete. GHL only holds part of WAVV's calls, so its copies
  // are replaced when WAVV answers and kept only as a fallback when it doesn't.
  const ghlCalls = wavv.ok ? ghl.calls.filter((c) => !c.loggedByWavv) : ghl.calls;
  const value = {
    ok: ghl.ok || wavv.ok,
    ghlOk: ghl.ok,
    wavvOk: wavv.ok,
    wavvConfigured: wavv.configured,
    calls: [...ghlCalls, ...wavv.calls],
    partial: ghl.partial || wavv.partial,
  };
  if (value.ok) cache.set(key, { at: Date.now(), value });
  return value;
}

export function callsForUser(calls, user) {
  const numbers = new Set(String(user.caller_numbers || '').split(',').map(digits).filter(Boolean));
  return calls.filter((c) => {
    if (c.userId && c.userId === user.ghl_user_id) return true;
    return (c.wavv || !c.userId) && numbers.has(c.from);
  });
}

export function dayCallStats(calls, day, shifts) {
  const list = calls.filter((c) => centralDay(c.at) === day).sort((a, b) => a.at.localeCompare(b.at));
  if (!list.length) return null;
  const answered = list.filter((c) => c.answered);
  const talk = list.reduce((sum, c) => sum + c.duration, 0);
  const inShift = (c) => shifts.some((s) => new Date(c.at) >= new Date(s.clockIn) && (!s.clockOut || new Date(c.at) <= new Date(s.clockOut)));
  let longestGap = 0;
  for (let i = 1; i < list.length; i += 1) {
    if (inShift(list[i]) && inShift(list[i - 1])) longestGap = Math.max(longestGap, (new Date(list[i].at) - new Date(list[i - 1].at)) / 1000);
  }
  return {
    dials: list.length,
    answered: answered.length,
    conversations: list.filter((c) => c.duration >= 60).length,
    talkSeconds: talk,
    talkMissing: answered.filter((c) => !c.duration).length,
    firstCall: list[0].at,
    lastCall: list[list.length - 1].at,
    offClock: list.filter((c) => !inShift(c)).length,
    longestGapSeconds: Math.round(longestGap),
  };
}
