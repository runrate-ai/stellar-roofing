import { q } from './db';
import { centralDay } from './time';

const GHL_API = 'https://services.leadconnectorhq.com';
const WAVV_API = 'https://api.wavv.com/v3';
const MAX_PAGES = 80;
// GHL is slow to page through, so it is checked less often than WAVV.
const FRESH_MS = { ghl: 5 * 60000, wavv: 60000 };
const FETCH_TIMEOUT_MS = 20000;
const GHL_TIMEOUT_MS = 75000;
const MIN_ACCOUNT_CALLS = 100;
// GHL can add a call record hours late, so the last two days are read again.
// WAVV results and lengths settle within a couple of hours.
const OVERLAP_MS = { ghl: 48 * 3600000, wavv: 2 * 3600000 };
const ANSWERED = new Set(['answered', 'completed']);

const digits = (value) => String(value || '').replace(/\D/g, '').slice(-10);

// Results that mean the caller spoke with a person.
export const PERSON_RESULTS = new Set(['interested', 'not_interested', 'appointment', 'appointment_requested', 'callback', 'wrong_number', 'dnc']);
const RESULT_NAMES = {
  interested: 'interested', 'not interested': 'not_interested', 'appointment set': 'appointment',
  'requested appointment': 'appointment_requested', callback: 'callback', 'call back': 'callback', 'follow up': 'callback',
  'wrong number': 'wrong_number', 'incorrect number': 'wrong_number', 'do not contact': 'dnc', 'do not call': 'dnc',
  'voice message': 'voicemail', voicemail: 'voicemail', 'left voicemail': 'voicemail', 'no answer': 'no_answer',
  'bad number': 'bad_number', 'agent canceled': 'canceled', 'call blocked': 'blocked', disconnected: 'disconnected',
  'good number': 'good_number',
};
export function normalizeResult(value) {
  if (!value) return null;
  const key = String(value).trim().toLowerCase().replace(/_/g, ' ');
  return RESULT_NAMES[key] || 'other';
}

// Both sources return call facts only. Customer names, ids, numbers, notes,
// and summaries are dropped here and never reach the database or the browser.
async function fetchGhlCalls(start, end) {
  // A read-only token just for call records; the lead form keeps its own.
  const token = process.env.TEAM_GHL_TOKEN || process.env.GHL_API_TOKEN;
  const location = process.env.GHL_LOCATION_ID;
  if (!token || !location) return { ok: false, calls: [], partial: false };
  const byId = new Map();
  let lastFirstId = null;
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
      // GHL sometimes answers the first page with a stray 0 or 1 record. This
      // account has far more calls than that, so retry instead of reporting zero.
      let data = null;
      for (let attempt = 0; attempt < 6; attempt += 1) {
        // The signal keeps React from reusing page one's answer for later pages.
        // Some GHL pages take about 40 seconds, so its limit is longer.
        const res = await fetch(url.toString(), {
          cache: 'no-store',
          signal: AbortSignal.timeout(GHL_TIMEOUT_MS),
          headers: { Authorization: `Bearer ${token}`, Version: '2021-04-15', Accept: 'application/json' },
        });
        if (!res.ok) return { ok: false, calls: [], partial: false };
        data = await res.json();
        if (page > 0 || Number(data.total) >= MIN_ACCOUNT_CALLS) break;
        if (attempt === 5) return { ok: false, calls: [], partial: false };
        await new Promise((resolve) => { setTimeout(resolve, 400); });
      }
      const messages = data.messages || [];
      for (const m of messages) {
        const at = new Date(m.dateAdded);
        if (m.direction !== 'outbound' || at < start || at >= end) continue;
        const callMeta = m.meta?.call || {};
        const status = String(m.status || callMeta.status || '').toLowerCase();
        const duration = Math.round(Number(callMeta.duration) || 0);
        byId.set(m.id, {
          id: `ghl:${m.id}`, source: 'ghl', at: at.toISOString(), userId: m.userId || null, from: digits(m.from),
          answered: duration > 0 || ANSWERED.has(status), duration,
          loggedByWavv: !m.userId && m.source === 'api', result: null,
        });
      }
      // GHL keeps the same cursor across pages, so a repeat page is spotted by
      // its records.
      const newest = messages.length ? messages[0].id : null;
      if (newest && newest === lastFirstId) { partial = true; break; }
      lastFirstId = newest;
      cursor = data.nextCursor;
      const oldest = messages.length ? new Date(messages[messages.length - 1].dateAdded) : null;
      if (!messages.length || !cursor || oldest < start) break;
    }
  } catch {
    return { ok: false, calls: [], partial: false };
  }
  return { ok: true, calls: [...byId.values()], partial };
}

async function wavvPage(url, key) {
  for (let attempt = 0; attempt < 2; attempt += 1) {
    const res = await fetch(url.toString(), {
      cache: 'no-store',
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      headers: { Authorization: `Bearer ${key}`, Accept: 'application/json' },
    });
    if (res.status !== 429 || attempt === 1) return res;
    const wait = Math.min(Number(res.headers.get('retry-after')) || 5, 30);
    await new Promise((resolve) => { setTimeout(resolve, wait * 1000); });
  }
  return null;
}

async function fetchWavvCalls(start, end) {
  const key = process.env.WAVV_API_KEY;
  if (!key) return { ok: false, calls: [], partial: false };
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
      if (!res?.ok) return { ok: false, calls: [], partial: false };
      const data = await res.json();
      for (const c of data.data || []) {
        const at = new Date(c.startedAt);
        if (at < start || at >= end) continue;
        byId.set(c.id, {
          id: `wavv:${c.id}`, source: 'wavv', at: at.toISOString(), userId: c.userId || null, from: digits(c.callerId),
          answered: c.human === true, duration: Math.round(Number(c.seconds) || 0), loggedByWavv: false,
          result: normalizeResult(c.disposition),
        });
      }
      if (!data.nextCursor) break;
      if (data.nextCursor === cursor) { partial = true; break; }
      cursor = data.nextCursor;
    }
  } catch {
    return { ok: false, calls: [], partial: false };
  }
  return { ok: true, calls: [...byId.values()], partial };
}

async function saveCalls(calls) {
  for (let i = 0; i < calls.length; i += 1000) {
    const batch = calls.slice(i, i + 1000);
    await q(
      `INSERT INTO team_calls (id, source, at, user_id, from_number, answered, duration, logged_by_wavv, result)
       SELECT * FROM unnest($1::text[], $2::text[], $3::timestamptz[], $4::text[], $5::text[], $6::boolean[], $7::int[], $8::boolean[], $9::text[])
       ON CONFLICT (id) DO UPDATE SET at=EXCLUDED.at, user_id=EXCLUDED.user_id, from_number=EXCLUDED.from_number,
         answered=EXCLUDED.answered, duration=EXCLUDED.duration, logged_by_wavv=EXCLUDED.logged_by_wavv, result=EXCLUDED.result`,
      [batch.map((c) => c.id), batch.map((c) => c.source), batch.map((c) => c.at), batch.map((c) => c.userId),
        batch.map((c) => c.from), batch.map((c) => c.answered), batch.map((c) => c.duration), batch.map((c) => c.loggedByWavv),
        batch.map((c) => c.result)],
    );
  }
}

async function syncSource(source, fetcher, start, state) {
  const now = new Date();
  let from;
  if (!state || start < new Date(state.covered_from)) {
    from = start;
  } else {
    if (now - new Date(state.synced_at) < FRESH_MS[source]) return;
    // Claim this refresh so two open screens do not both download the same
    // slow GHL pages. A failed refresh is simply tried again later.
    const claimed = await q(
      'UPDATE team_call_sync SET synced_at=$2 WHERE source=$1 AND synced_at < $3 RETURNING covered_to',
      [source, now.toISOString(), new Date(now.getTime() - FRESH_MS[source]).toISOString()],
    );
    if (!claimed.length) return;
    from = new Date(new Date(claimed[0].covered_to).getTime() - OVERLAP_MS[source]);
  }
  const result = await fetcher(from, now);
  if (!result.ok) return;
  await saveCalls(result.calls);
  if (result.partial) return;
  await q(
    `INSERT INTO team_call_sync (source, covered_from, covered_to, synced_at) VALUES ($1,$2,$3,$3)
     ON CONFLICT (source) DO UPDATE SET covered_from=LEAST(team_call_sync.covered_from, EXCLUDED.covered_from),
       covered_to=GREATEST(team_call_sync.covered_to, EXCLUDED.covered_to), synced_at=EXCLUDED.synced_at`,
    [source, from.toISOString(), now.toISOString()],
  );
}

const syncRows = () => q('SELECT source, covered_from, covered_to, synced_at FROM team_call_sync');

// Reads saved calls right away. With refresh on, it first pulls only what is
// new from GHL and WAVV, so a page never waits on a full history download.
export async function fetchCalls(start, end, { refresh = true } = {}) {
  if (refresh) {
    const states = await syncRows();
    const stateFor = (source) => states.find((s) => s.source === source);
    await Promise.all([
      syncSource('ghl', fetchGhlCalls, start, stateFor('ghl')),
      syncSource('wavv', fetchWavvCalls, start, stateFor('wavv')),
    ]);
  }
  const [states, rows] = await Promise.all([
    syncRows(),
    q(`SELECT source, at, user_id, from_number, answered, duration, logged_by_wavv, result
       FROM team_calls WHERE at >= $1 AND at < $2 ORDER BY at`, [start.toISOString(), end.toISOString()]),
  ]);
  const ghl = states.find((s) => s.source === 'ghl');
  const wavv = states.find((s) => s.source === 'wavv');
  const covered = (s) => Boolean(s) && new Date(s.covered_from) <= start;
  const calls = rows
    // WAVV's own records are complete, so GHL's partial copies are left out.
    .filter((r) => !(r.logged_by_wavv && wavv))
    .map((r) => ({
      at: new Date(r.at).toISOString(), day: centralDay(r.at), userId: r.user_id, from: r.from_number, answered: r.answered,
      duration: Number(r.duration) || 0, wavv: r.source === 'wavv', result: r.result || null,
    }));
  const times = [ghl, wavv].filter(Boolean).map((s) => new Date(s.synced_at).getTime());
  return {
    ok: Boolean(ghl || wavv),
    ghlOk: covered(ghl),
    wavvOk: covered(wavv),
    wavvConfigured: Boolean(process.env.WAVV_API_KEY),
    calls,
    partial: false,
    updatedAt: times.length ? new Date(Math.min(...times)).toISOString() : null,
  };
}

export function callsForUser(calls, user) {
  const numbers = new Set(String(user.caller_numbers || '').split(',').map(digits).filter(Boolean));
  return calls.filter((c) => {
    if (c.userId && c.userId === user.ghl_user_id) return true;
    return (c.wavv || !c.userId) && numbers.has(c.from);
  });
}

const IDLE_MS = 15 * 60 * 1000;

export function dayCallStats(calls, day, shifts) {
  const list = calls.filter((c) => (c.day || centralDay(c.at)) === day).sort((a, b) => a.at.localeCompare(b.at));
  if (!list.length) return null;
  const answered = list.filter((c) => c.answered);
  const talk = list.reduce((sum, c) => sum + c.duration, 0);
  const spans = shifts.map((s) => [new Date(s.clockIn).getTime(), s.clockOut ? new Date(s.clockOut).getTime() : Infinity]);
  const inShift = (c) => { const t = new Date(c.at).getTime(); return spans.some(([a, b]) => t >= a && t <= b); };
  let longestGap = 0;
  // Working time: first call to last, leaving out any stretch of 15+ minutes
  // with no dialing, plus the last call itself.
  let activeMs = (list[list.length - 1].duration || 0) * 1000;
  for (let i = 1; i < list.length; i += 1) {
    const gap = new Date(list[i].at) - new Date(list[i - 1].at);
    if (gap < IDLE_MS) activeMs += gap;
  }
  for (let i = 1; i < list.length; i += 1) {
    if (inShift(list[i]) && inShift(list[i - 1])) longestGap = Math.max(longestGap, (new Date(list[i].at) - new Date(list[i - 1].at)) / 1000);
  }
  return {
    dials: list.length,
    answered: answered.length,
    conversations: list.filter((c) => c.duration >= 60).length,
    thirty: list.filter((c) => c.duration >= 30).length,
    talkSeconds: talk,
    talkMissing: answered.filter((c) => !c.duration).length,
    firstCall: list[0].at,
    lastCall: list[list.length - 1].at,
    offClock: list.filter((c) => !inShift(c)).length,
    longestGapSeconds: Math.round(longestGap),
    activeSeconds: Math.round(activeMs / 1000),
  };
}
