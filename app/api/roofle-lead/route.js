import { NextResponse } from 'next/server';
import { buildUserData, sendMetaEvent } from '../../../lib/metaCapi';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Roofle (RoofQuote PRO) → GHL + Meta.
//
// In the RoofQuote PRO portal: Settings → Developer → Webhooks, type "Contact
// Form Completed", URL www.thestellarroofing.com/api/roofle-lead. Each finished
// instant quote then becomes a GHL contact tagged roofle-lead (with a note
// holding the quote details) and, for Tennessee, a server-side Meta Lead.
//
// Roofle doesn't publish its exact payload, so fields are found by their usual
// names anywhere in the JSON. Only the payload's field names are logged (never
// values), so the first real deliveries show the format without leaking PII.

const GHL_API = 'https://services.leadconnectorhq.com';
const GHL_VERSION = '2021-07-28';

async function ghl(path, token, body) {
  const res = await fetch(`${GHL_API}${path}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, Version: GHL_VERSION, Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, data };
}

const norm = key => String(key).toLowerCase().replace(/[^a-z0-9]/g, '');

// Depth-first search for the first non-empty scalar under any of the names.
function find(obj, names, depth = 0) {
  if (!obj || typeof obj !== 'object' || depth > 5) return '';
  const wanted = names.map(norm);
  for (const [key, value] of Object.entries(obj)) {
    if (wanted.includes(norm(key)) && value != null && typeof value !== 'object' && String(value).trim()) {
      return String(value).trim();
    }
  }
  for (const value of Object.values(obj)) {
    if (value && typeof value === 'object') {
      const hit = find(value, names, depth + 1);
      if (hit) return hit;
    }
  }
  return '';
}

function keysOf(obj, prefix = '', out = [], depth = 0) {
  if (!obj || typeof obj !== 'object' || depth > 3) return out;
  for (const [key, value] of Object.entries(obj)) {
    out.push(prefix + key);
    if (value && typeof value === 'object' && !Array.isArray(value)) keysOf(value, `${prefix}${key}.`, out, depth + 1);
  }
  return out;
}

const clean = (value, max = 300) => String(value || '').trim().slice(0, max);

export async function POST(request) {
  let body;
  const type = request.headers.get('content-type') || '';
  try {
    body = type.includes('application/json')
      ? await request.json()
      : Object.fromEntries(new URLSearchParams(await request.text()));
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid body.' }, { status: 400 });
  }
  console.log('[roofle-lead] payload fields:', keysOf(body).slice(0, 80).join(', '));

  const fullName = find(body, ['name', 'fullName', 'customerName', 'contactName']);
  let firstName = find(body, ['firstName', 'first_name', 'fname']);
  let lastName = find(body, ['lastName', 'last_name', 'lname']);
  if (!firstName && fullName) {
    const parts = fullName.split(/\s+/);
    firstName = parts[0];
    lastName = lastName || parts.slice(1).join(' ');
  }
  const email = clean(find(body, ['email', 'emailAddress', 'contactEmail']), 200);
  const digits = find(body, ['phone', 'phoneNumber', 'mobile', 'contactPhone']).replace(/\D/g, '');
  const phone = digits.length === 11 && digits.startsWith('1') ? digits.slice(1) : digits;
  const street = clean(find(body, ['streetAddress', 'street', 'address1', 'addressLine1', 'address']), 200);
  const city = clean(find(body, ['city']), 100);
  const state = clean(find(body, ['state', 'stateCode', 'province']), 40);
  const zip = clean(find(body, ['zip', 'zipCode', 'postalCode', 'postcode']), 10);
  const fullAddress = clean(find(body, ['fullAddress', 'formattedAddress']), 300);
  const squareFeet = clean(find(body, ['totalSquareFeet', 'totalSqFt', 'squareFeet', 'roofSquareFeet']), 40);
  const sessionId = clean(find(body, ['sessionId', 'session_id', 'leadId', 'id']), 80);

  if (!email && phone.length !== 10) {
    console.error('[roofle-lead] no usable email or phone in the payload.');
    return NextResponse.json({ ok: false, error: 'Missing email and phone.' }, { status: 400 });
  }

  const token = process.env.GHL_API_TOKEN;
  const locationId = process.env.GHL_LOCATION_ID;
  if (!token || !locationId) {
    console.error('[roofle-lead] GHL_API_TOKEN / GHL_LOCATION_ID not set; Roofle lead NOT delivered.');
    return NextResponse.json({ ok: false, error: 'Not configured.' }, { status: 500 });
  }

  const isIdaho = /^(id|idaho)$/i.test(state);
  const contact = {
    locationId,
    firstName: clean(firstName, 60),
    lastName: clean(lastName, 60),
    name: clean([firstName, lastName].filter(Boolean).join(' '), 120),
    ...(phone.length === 10 ? { phone: `+1${phone}` } : {}),
    ...(email ? { email } : {}),
    ...(street ? { address1: street } : {}),
    ...(city ? { city } : {}),
    ...(state ? { state } : {}),
    ...(zip ? { postalCode: zip } : {}),
    country: 'US',
    source: 'Roofle Instant Quote',
  };

  const upsert = await ghl('/contacts/upsert', token, contact);
  const contactId = upsert.data?.contact?.id;
  if (!upsert.ok || !contactId) {
    console.error('[roofle-lead] GHL upsert failed:', upsert.status);
    return NextResponse.json({ ok: false, error: 'Could not save the lead.' }, { status: 502 });
  }

  const tags = ['roofle-lead', isIdaho ? 'boise' : 'nashville'];
  const tagged = await ghl(`/contacts/${contactId}/tags`, token, { tags });
  if (!tagged.ok) console.error('[roofle-lead] GHL tagging failed:', tagged.status);

  const products = body.products || body.data?.products || body.quote?.products;
  const note = [
    'New Roofle instant quote lead',
    (fullAddress || street) && `Property: ${fullAddress || [street, city, state, zip].filter(Boolean).join(', ')}`,
    squareFeet && `Roof size (Roofle): ${squareFeet} sq ft`,
    products && `Quote options: ${JSON.stringify(products).slice(0, 1500)}`,
    sessionId && `Roofle session: ${sessionId}`,
  ].filter(Boolean).join('\n');
  const noted = await ghl(`/contacts/${contactId}/notes`, token, { body: note });
  if (!noted.ok) console.error('[roofle-lead] GHL note failed:', noted.status);

  // Server-side Meta Lead for Tennessee quotes (no phone number; skipped
  // quietly without META_CAPI_TOKEN).
  if (!isIdaho) {
    await sendMetaEvent({
      event_name: 'Lead',
      event_time: Math.floor(Date.now() / 1000),
      event_id: `roofle-${sessionId || contactId}`,
      action_source: 'website',
      event_source_url: 'https://www.thestellarroofing.com/',
      user_data: buildUserData({ email, firstName, lastName, zip, state: state || 'TN', externalId: contactId }),
      custom_data: { content_name: 'roofle-quote', content_category: 'Roofle' },
    });
  }

  return NextResponse.json({ ok: true });
}
