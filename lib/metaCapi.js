import crypto from 'crypto';
import config from './config';

// Meta Conversions API (server-side events) for the "Stellar Roofing || Owned"
// dataset. Used by the lead form (a server copy of each Lead, deduplicated
// with the browser pixel by event_id) and by /api/roofle-lead. Booked
// appointments and closed deals are sent by GHL workflows (the Meta
// Conversion API action), not from here; see brain/TRACKING-PLAN.md.
//
// Needs META_CAPI_TOKEN (Events Manager → dataset → Settings → Generate access
// token) in Vercel / .env.local. Without it every call is skipped, so the site
// works the same as before. Optional META_CAPI_TEST_CODE sends events to the
// Test Events tab instead of counting them.
//
// The website's events don't include phone numbers (GHL's action does, hashed;
// the privacy policy covers both).

const GRAPH = 'https://graph.facebook.com/v23.0';

const sha256 = value => crypto.createHash('sha256').update(value).digest('hex');

// Meta's normalization rules: lowercase, trimmed; names without punctuation;
// US ZIP as 5 digits; state and country as 2-letter codes.
const normalize = {
  em: v => v.trim().toLowerCase(),
  name: v => v.trim().toLowerCase().replace(/[^\p{L}]/gu, ''),
  zp: v => v.replace(/\D/g, '').slice(0, 5),
  code2: v => v.trim().toLowerCase().slice(0, 2),
};

export function buildUserData({ email, firstName, lastName, zip, state, country = 'US', externalId, fbc, fbp, ip, userAgent }) {
  const userData = {};
  const hashed = (key, value, fn) => {
    const normalized = value ? fn(String(value)) : '';
    if (normalized) userData[key] = [sha256(normalized)];
  };
  hashed('em', email, normalize.em);
  hashed('fn', firstName, normalize.name);
  hashed('ln', lastName, normalize.name);
  hashed('zp', zip, normalize.zp);
  hashed('st', state, normalize.code2);
  hashed('country', country, normalize.code2);
  if (externalId) userData.external_id = [sha256(String(externalId))];
  // These are sent as-is, per Meta's spec.
  if (fbc) userData.fbc = fbc;
  if (fbp) userData.fbp = fbp;
  if (ip) userData.client_ip_address = ip;
  if (userAgent) userData.client_user_agent = userAgent;
  return userData;
}

// The _fbc cookie if the pixel set one, otherwise built from the ad click ID
// in the landing URL, in Meta's fb.1.<time>.<fbclid> format.
export function fbcValue({ cookie, fbclid }) {
  if (cookie) return cookie;
  if (fbclid) return `fb.1.${Date.now()}.${fbclid}`;
  return '';
}

export async function sendMetaEvent(event, { timeoutMs = 3000 } = {}) {
  const token = process.env.META_CAPI_TOKEN;
  const pixelId = config.analytics.metaPixelId;
  if (!token || !pixelId) return { skipped: true };

  const testCode = process.env.META_CAPI_TEST_CODE;
  const payload = { data: [event], ...(testCode ? { test_event_code: testCode } : {}) };
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(`${GRAPH}/${pixelId}/events?access_token=${encodeURIComponent(token)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      console.error('[meta-capi]', event.event_name, res.status, JSON.stringify(data.error || data).slice(0, 300));
    }
    return { ok: res.ok, status: res.status, received: data.events_received, test: Boolean(testCode) };
  } catch (err) {
    console.error('[meta-capi]', event.event_name, 'request failed:', err.name);
    return { ok: false, error: err.name };
  } finally {
    clearTimeout(timer);
  }
}
