import { NextResponse } from 'next/server';
import { getFunnel } from '../../../lib/funnels';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const GHL_API = 'https://services.leadconnectorhq.com';
const GHL_VERSION = '2021-07-28';

const REQUIRED = ['name', 'phone', 'projectType', 'address'];

// Must match the option lists on the GHL custom fields "Project Type" and
// "Project Urgency" exactly, or GHL stores the value blank.
const PROJECT_TYPES = ['Roof Replacement', 'Roof Repair', 'Storm Damage', "I'm Not Sure"];
const TIMELINES = [
  'As soon as possible — Emergency',
  'Within 1 month',
  'Within 1–3 months',
  'Just getting pricing / Planning ahead',
];

// GHL custom field keys (contact.<key>) the funnel fills in.
const ATTRIBUTION_FIELDS = {
  gclid: 'google_click_id',
  wbraid: 'wbraid',
  gbraid: 'gbraid',
  utm_source: 'utm_source',
  utm_medium: 'utm_medium',
  utm_campaign: 'utm_campaign',
  utm_term: 'utm_term',
  utm_content: 'utm_content',
};

// Digits only, tolerant of (629) 277-4249 / 629.277.4249 / +1 629 277 4249
function normalizePhone(raw) {
  const digits = String(raw || '').replace(/\D/g, '');
  if (digits.length === 11 && digits.startsWith('1')) return digits.slice(1);
  return digits;
}

const clean = (value, max = 500) => String(value || '').trim().slice(0, max);

function splitName(full) {
  const parts = full.split(/\s+/);
  return { firstName: parts[0] || '', lastName: parts.slice(1).join(' ') };
}

async function ghl(path, token, body) {
  const res = await fetch(`${GHL_API}${path}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      Version: GHL_VERSION,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, data };
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request body.' }, { status: 400 });
  }

  // Bots fill every field; people never see this one.
  if (clean(body.company)) return NextResponse.json({ ok: true });

  const missing = REQUIRED.filter(f => !clean(body[f]));
  if (missing.length) {
    return NextResponse.json(
      { ok: false, error: `Missing required field(s): ${missing.join(', ')}.` },
      { status: 400 }
    );
  }

  const phone = normalizePhone(body.phone);
  if (phone.length !== 10) {
    return NextResponse.json(
      { ok: false, error: 'Please enter a valid 10-digit US phone number.' },
      { status: 400 }
    );
  }

  const token = process.env.GHL_API_TOKEN;
  const locationId = process.env.GHL_LOCATION_ID;
  if (!token || !locationId) {
    // Fail loudly so a missing env var is caught before spend starts, rather
    // than dropping live leads into a void. The form shows the call-us fallback.
    console.error('[funnel-lead] GHL_API_TOKEN / GHL_LOCATION_ID not set; lead was NOT delivered.');
    return NextResponse.json({ ok: false, error: 'Lead routing is not configured.' }, { status: 500 });
  }

  // Two sources share this route: PPC funnel pages (leadSource "funnel") and
  // main-site pages (leadSource "website"), in Nashville or Boise.
  const isWebsite = body.leadSource === 'website';
  const market = body.market === 'boise' ? 'boise' : 'nashville';
  const funnel = isWebsite ? null : getFunnel(clean(body.funnelSlug, 60));
  const pagePath = clean(body.pagePath, 300);
  const message = clean(body.message, 2000);
  const projectType = PROJECT_TYPES.includes(body.projectType) ? body.projectType : "I'm Not Sure";
  const timeline = TIMELINES.includes(body.timeline) ? body.timeline : '';
  const name = clean(body.name, 120);
  const email = clean(body.email, 200);
  const address = clean(body.address, 200);
  const zip = clean(body.zip, 10);
  const landingPage = clean(body.landingPage, 1000);

  const customFields = [
    { key: 'project_type', field_value: projectType },
    ...(message ? [{ key: 'your_message', field_value: message }] : []),
    ...(timeline ? [{ key: 'project_urgency', field_value: timeline }] : []),
    ...(landingPage ? [{ key: 'landing_page', field_value: landingPage }] : []),
    ...Object.entries(ATTRIBUTION_FIELDS)
      .filter(([param]) => clean(body[param]))
      .map(([param, key]) => ({ key, field_value: clean(body[param]) })),
  ];

  const contact = {
    locationId,
    ...splitName(name),
    name,
    phone: `+1${phone}`,
    ...(email ? { email } : {}),
    ...(address ? { address1: address } : {}),
    ...(zip ? { postalCode: zip } : {}),
    state: market === 'boise' ? 'ID' : 'TN',
    country: 'US',
    source: isWebsite
      ? `Website – ${pagePath || '/'}`
      : `PPC Funnel – ${funnel?.adGroup || 'Nashville'}`,
    tags: isWebsite
      ? ['website-lead', market]
      : ['ppc-lead', ...(funnel ? [`ppc-${funnel.slug}`] : [])],
    customFields,
  };

  const upsert = await ghl('/contacts/upsert', token, contact);
  const contactId = upsert.data?.contact?.id;
  if (!upsert.ok || !contactId) {
    console.error('[funnel-lead] GHL upsert failed:', upsert.status, JSON.stringify(upsert.data).slice(0, 500));
    return NextResponse.json({ ok: false, error: 'We could not submit your request.' }, { status: 502 });
  }

  // A readable summary on the contact, so whoever calls back has the context
  // without opening custom fields. Best effort: the lead already exists.
  const note = [
    isWebsite
      ? `New website lead (${market === 'boise' ? 'Boise' : 'Nashville'}) – ${pagePath || '/'}`
      : `New PPC lead – ${funnel?.adGroup || 'Nashville'}`,
    `Project: ${projectType}`,
    timeline && `Timeline: ${timeline}`,
    (address || zip) && `Property: ${[address, zip].filter(Boolean).join(', ')}`,
    message && `Message: ${message}`,
    landingPage && `Landing page: ${landingPage}`,
    clean(body.gclid) ? 'Came from a Google Ads click (gclid captured).' : 'No Google Ads click ID on this visit.',
  ].filter(Boolean).join('\n');
  const noted = await ghl(`/contacts/${contactId}/notes`, token, { body: note });
  if (!noted.ok) console.error('[funnel-lead] GHL note failed:', noted.status);

  return NextResponse.json({ ok: true, isNew: Boolean(upsert.data?.new) });
}
