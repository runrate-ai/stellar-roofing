import { NextResponse } from 'next/server';
import { buildUserData, sendMetaEvent } from '../../../lib/metaCapi';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// GHL → Meta "Purchase" when a deal closes.
//
// A GHL workflow (trigger: Opportunity Status Changed → Won) calls this URL
// with a Webhook action whose Custom Data includes
//   opportunity_id = {{opportunity.id}}
// Nothing in the request is trusted: the opportunity is looked up in our own
// GHL location, and the event is sent only if it really is Won. The job value
// comes from the opportunity's value field. Contact details are hashed; the
// phone number is never sent. The event id is "won-<opportunity id>", so a
// repeated webhook doesn't count twice.
//
// Needs GHL_API_TOKEN (contacts, opportunities and custom fields read access)
// and META_CAPI_TOKEN. Boise (Idaho) contacts are skipped.

const GHL_API = 'https://services.leadconnectorhq.com';
const GHL_VERSION = '2021-07-28';

async function ghlGet(path, token) {
  const res = await fetch(`${GHL_API}${path}`, {
    headers: { Authorization: `Bearer ${token}`, Version: GHL_VERSION, Accept: 'application/json' },
    cache: 'no-store',
  });
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, data };
}

// Custom field ids for meta_fbc / meta_fbp (GHL returns contact custom fields by id).
let fieldIds = null;
async function metaFieldIds(token, locationId) {
  if (fieldIds) return fieldIds;
  const res = await ghlGet(`/locations/${locationId}/customFields?model=contact`, token);
  const ids = {};
  for (const f of res.data?.customFields || []) {
    if (f.fieldKey === 'contact.meta_fbc') ids.fbc = f.id;
    if (f.fieldKey === 'contact.meta_fbp') ids.fbp = f.id;
  }
  if (res.ok) fieldIds = ids;
  return ids;
}

function opportunityIdFrom(body) {
  const candidates = [
    body?.customData?.opportunity_id,
    body?.customData?.opportunityId,
    body?.opportunity_id,
    body?.opportunityId,
    body?.opportunity?.id,
  ];
  const id = candidates.find(v => typeof v === 'string' && /^[A-Za-z0-9]{8,40}$/.test(v.trim()));
  return id ? id.trim() : '';
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON.' }, { status: 400 });
  }

  const opportunityId = opportunityIdFrom(body);
  if (!opportunityId) {
    return NextResponse.json({ ok: false, error: 'Missing opportunity_id (add it as Custom Data in the GHL webhook).' }, { status: 400 });
  }

  const token = process.env.GHL_API_TOKEN;
  const locationId = process.env.GHL_LOCATION_ID;
  if (!token || !locationId) {
    console.error('[meta-conversion] GHL_API_TOKEN / GHL_LOCATION_ID not set.');
    return NextResponse.json({ ok: false, error: 'Not configured.' }, { status: 500 });
  }

  const opp = await ghlGet(`/opportunities/${opportunityId}`, token);
  const opportunity = opp.data?.opportunity;
  if (!opp.ok || !opportunity) {
    console.error('[meta-conversion] opportunity lookup failed:', opp.status);
    return NextResponse.json({ ok: false, error: 'Opportunity not found.' }, { status: opp.status === 401 ? 502 : 404 });
  }
  if (opportunity.locationId && opportunity.locationId !== locationId) {
    return NextResponse.json({ ok: false, error: 'Opportunity not found.' }, { status: 404 });
  }
  if (String(opportunity.status).toLowerCase() !== 'won') {
    return NextResponse.json({ ok: true, sent: false, reason: 'Opportunity is not Won.' });
  }

  const contactRes = await ghlGet(`/contacts/${opportunity.contactId}`, token);
  const contact = contactRes.data?.contact;
  if (!contactRes.ok || !contact) {
    console.error('[meta-conversion] contact lookup failed:', contactRes.status);
    return NextResponse.json({ ok: false, error: 'Contact not found.' }, { status: 404 });
  }

  const tags = (contact.tags || []).map(t => String(t).toLowerCase());
  if (String(contact.state || '').toUpperCase() === 'ID' || tags.includes('boise')) {
    return NextResponse.json({ ok: true, sent: false, reason: 'Boise contact (Meta ads are Nashville only).' });
  }

  const ids = await metaFieldIds(token, locationId);
  const fieldValue = id => (contact.customFields || []).find(f => f.id === id)?.value || '';
  const value = Number(opportunity.monetaryValue) || 0;

  const result = await sendMetaEvent({
    event_name: 'Purchase',
    event_time: Math.floor(Date.now() / 1000),
    event_id: `won-${opportunityId}`,
    action_source: 'system_generated',
    user_data: buildUserData({
      email: contact.email,
      firstName: contact.firstName,
      lastName: contact.lastName,
      zip: contact.postalCode,
      state: contact.state || 'TN',
      country: contact.country || 'US',
      externalId: contact.id,
      fbc: ids.fbc ? String(fieldValue(ids.fbc)).slice(0, 600) : '',
      fbp: ids.fbp ? String(fieldValue(ids.fbp)).slice(0, 200) : '',
    }),
    custom_data: { value, currency: 'USD', content_category: 'Roof job' },
  });

  if (result.skipped) {
    return NextResponse.json({ ok: true, sent: false, reason: 'META_CAPI_TOKEN not set.' });
  }
  return NextResponse.json({ ok: Boolean(result.ok), sent: Boolean(result.ok), value, test: result.test || false }, { status: result.ok ? 200 : 502 });
}
