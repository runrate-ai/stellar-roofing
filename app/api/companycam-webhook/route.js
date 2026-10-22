import crypto from 'node:crypto';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// CompanyCam -> GoHighLevel bridge.
// Nate adds an outcome label to a CompanyCam project after an inspection. CompanyCam
// sends a project.label_added webhook here; we find (or create) the GHL contact from
// the project's primary contact, add the matching tag (which starts the GHL workflow),
// and put the lead in the right pipeline stage.
//
// Env: COMPANYCAM_API_TOKEN, COMPANYCAM_WEBHOOK_TOKEN (our secret, given to CompanyCam
// when the webhook is created), GHL_COMPANYCAM_TOKEN, GHL_LOCATION_ID.
// COMPANYCAM_BRIDGE_ENABLED must be "true" or the route only logs what it would do.

const CC_API = 'https://api.companycam.com/v2';
const GHL_API = 'https://services.leadconnectorhq.com';
const GHL_VERSION = '2021-07-28';

const PIPELINES = { TN: 'Tennessee', ID: 'Idaho' };
const ESTIMATE_STAGE = 'OOP Given';

// CompanyCam label name -> what to do in GHL. Any other label is ignored.
const ACTIONS = {
  'TN - Good Lead': { tags: ['cc-tn-good-lead'], state: 'TN', stage: ESTIMATE_STAGE },
  'TN - Manual': { tags: ['cc-tn-manual'], state: 'TN', stage: ESTIMATE_STAGE },
  'TN - Bad Lead': { tags: ['cc-tn-bad-lead'], state: 'TN', lost: true },
  // "request google review" starts the existing "1. Roofing Google Review Request" workflow.
  'TN - Paid': { tags: ['cc-tn-paid', 'request google review'], state: 'TN' },
  'ID - Good Lead': { tags: ['cc-id-good-lead'], state: 'ID', stage: ESTIMATE_STAGE },
  'ID - Manual': { tags: ['cc-id-manual'], state: 'ID', stage: ESTIMATE_STAGE },
  'ID - Bad Lead': { tags: ['cc-id-bad-lead'], state: 'ID', lost: true },
  'ID - Paid': { tags: ['cc-id-paid', 'request google review'], state: 'ID' },
};

const log = (...args) => console.log('[companycam-webhook]', ...args);

function validSignature(rawBody, header, secret) {
  if (!header || !secret) return false;
  const expected = crypto.createHmac('sha1', secret).update(rawBody).digest('base64');
  const a = Buffer.from(expected);
  const b = Buffer.from(String(header));
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

function normalizePhone(raw) {
  const digits = String(raw || '').replace(/\D/g, '');
  if (digits.length === 11 && digits.startsWith('1')) return digits.slice(1);
  return digits;
}

async function cc(path) {
  const res = await fetch(`${CC_API}${path}`, {
    headers: { Authorization: `Bearer ${process.env.COMPANYCAM_API_TOKEN}`, Accept: 'application/json' },
  });
  return { ok: res.ok, status: res.status, data: await res.json().catch(() => null) };
}

async function ghl(method, path, body) {
  const res = await fetch(`${GHL_API}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${process.env.GHL_COMPANYCAM_TOKEN}`,
      Version: GHL_VERSION,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  return { ok: res.ok, status: res.status, data: await res.json().catch(() => ({})) };
}

// The label that was just added. CompanyCam's payload shape for label events isn't
// documented, so check the likely places before falling back to the project's labels.
function labelsFromPayload(payload) {
  const found = [payload?.label, payload?.project_label, ...(payload?.labels || [])]
    .filter(Boolean)
    .map(l => (typeof l === 'string' ? l : l.display_value || l.name || l.value))
    .filter(Boolean);
  return found;
}

async function findContact(locationId, phone, email) {
  for (const [field, value] of [['phone', phone && `+1${phone}`], ['email', email]]) {
    if (!value) continue;
    const r = await ghl('POST', '/contacts/search', {
      locationId,
      pageLimit: 1,
      filters: [{ field, operator: 'eq', value }],
    });
    const hit = r.data?.contacts?.[0];
    if (hit) return hit;
  }
  return null;
}

// Nate's CompanyCam projects usually carry only the customer's name (as the project
// name) and the address. Fall back to a GHL name search: the full name must match
// exactly; a GHL contact with an address must also have the same house number; one
// without an address counts only if it is the single contact with that name.
const houseNumber = s => (String(s || '').match(/^\s*(\d+)/) || [])[1] || '';
async function findContactByNameAndAddress(locationId, name, street) {
  const query = name.replace(/^(private|test)\s+/i, '').trim();
  if (query.split(/\s+/).length < 2) return null;
  const r = await ghl('POST', '/contacts/search', { locationId, pageLimit: 10, query });
  const target = query.toLowerCase();
  const sameName = (r.data?.contacts || []).filter(
    c => `${c.firstNameLowerCase || c.firstName || ''} ${c.lastNameLowerCase || c.lastName || ''}`.trim().toLowerCase() === target
      || String(c.contactName || c.name || '').toLowerCase() === target
  );
  const num = houseNumber(street);
  const byHouse = num && sameName.find(c => c.address1 && houseNumber(c.address1) === num);
  if (byHouse) return byHouse;
  const plausible = sameName.filter(c => !c.address1 || !num || houseNumber(c.address1) === num);
  return plausible.length === 1 && sameName.length === 1 ? plausible[0] : null;
}

export async function POST(request) {
  const raw = await request.text();
  if (!validSignature(raw, request.headers.get('x-companycam-signature'), process.env.COMPANYCAM_WEBHOOK_TOKEN)) {
    log('rejected: bad or missing signature');
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  let event;
  try {
    event = JSON.parse(raw);
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  if (event.event_type !== 'project.label_added') return NextResponse.json({ ok: true, ignored: event.event_type });

  const enabled = process.env.COMPANYCAM_BRIDGE_ENABLED === 'true';
  const locationId = process.env.GHL_LOCATION_ID;
  const payload = event.payload || {};
  const project = payload.project || payload;
  const projectId = project.id || payload.project_id;
  log('event', { projectId, payloadKeys: Object.keys(payload), enabled });

  // Which outcome labels are we acting on?
  let labels = labelsFromPayload(payload);
  if (!labels.length && projectId) {
    const r = await cc(`/projects/${projectId}/labels`);
    labels = (Array.isArray(r.data) ? r.data : []).map(l => l.display_value || l.name || l.value).filter(Boolean);
  }
  const matched = labels.filter(l => ACTIONS[l]);
  if (!matched.length) return NextResponse.json({ ok: true, ignored: 'no outcome label' });

  // Who is the homeowner? Use the full project record for the primary contact and address.
  const full = projectId ? (await cc(`/projects/${projectId}`)).data || project : project;
  const pc = full.primary_contact || {};
  const phone = normalizePhone(pc.phone_number);
  const email = String(pc.email || '').trim().toLowerCase();
  const name = String(pc.name || full.name || '').trim();
  const addr = full.address || {};

  const plan = matched.map(l => ({ label: l, ...ACTIONS[l] }));

  // Lookups are read-only, so they run in dry-run mode too.
  let contact = (await findContact(locationId, phone, email))
    || (await findContactByNameAndAddress(locationId, name, addr.street_address_1));
  const matchedBy = contact ? (phone || email ? 'phone/email' : 'name + address') : 'none';

  if (!enabled) {
    log('dry run', { projectId, plan, matchedBy });
    return NextResponse.json({ ok: true, dryRun: true, plan, matchedBy });
  }

  if (!contact && !phone && !email) {
    // Nobody to text and no way to reach them; leave it for a person.
    log('skipped: no GHL match and no phone or email on the project', { projectId, labels: matched });
    return NextResponse.json({ ok: true, skipped: 'no GHL contact match and no phone or email on the CompanyCam project' });
  }

  if (!contact) {
    const [firstName, ...rest] = name.split(/\s+/);
    const created = await ghl('POST', '/contacts/upsert', {
      locationId,
      name,
      firstName: firstName || '',
      lastName: rest.join(' '),
      ...(phone ? { phone: `+1${phone}` } : {}),
      ...(email ? { email } : {}),
      ...(addr.street_address_1 ? { address1: addr.street_address_1 } : {}),
      ...(addr.city ? { city: addr.city } : {}),
      ...(addr.postal_code ? { postalCode: addr.postal_code } : {}),
      state: plan[0].state,
      country: 'US',
      source: 'CompanyCam inspection',
    });
    contact = created.data?.contact;
    if (!contact?.id) {
      log('GHL contact create failed', created.status);
      return NextResponse.json({ ok: false }, { status: 502 });
    }
  }

  // Tags start the workflows. Skip tags the contact already has so CompanyCam
  // retries or unrelated label changes don't restart follow-ups.
  const existing = new Set((contact.tags || []).map(t => t.toLowerCase()));
  const active = plan.filter(p => !existing.has(p.tags[0].toLowerCase()));
  const newTags = [...new Set(active.flatMap(p => p.tags))].filter(t => !existing.has(t.toLowerCase()));
  if (!active.length) {
    log('nothing new', { projectId, labels: matched });
    return NextResponse.json({ ok: true, skipped: 'contact already has these outcome tags' });
  }
  if (newTags.length) {
    const tagged = await ghl('POST', `/contacts/${contact.id}/tags`, { tags: newTags });
    if (!tagged.ok) log('GHL tagging failed', tagged.status);
  }

  // Pipeline: estimate-given leads go to OOP Given; bad leads are marked lost.
  for (const p of active.filter(x => x.stage || x.lost)) {
    const pipelines = (await ghl('GET', `/opportunities/pipelines?locationId=${locationId}`)).data?.pipelines || [];
    const pipeline = pipelines.find(x => x.name === PIPELINES[p.state]);
    if (!pipeline) continue;
    const stage = pipeline.stages.find(s => s.name === ESTIMATE_STAGE);
    const search = await ghl(
      'GET',
      `/opportunities/search?location_id=${locationId}&pipeline_id=${pipeline.id}&contact_id=${contact.id}&limit=1`
    );
    const opp = search.data?.opportunities?.[0];
    if (p.lost) {
      if (opp) await ghl('PUT', `/opportunities/${opp.id}`, { status: 'lost' });
    } else if (opp) {
      await ghl('PUT', `/opportunities/${opp.id}`, { pipelineStageId: stage.id, status: 'open' });
    } else {
      await ghl('POST', '/opportunities/', {
        locationId,
        pipelineId: pipeline.id,
        pipelineStageId: stage.id,
        contactId: contact.id,
        name: `${name || 'Homeowner'} – ${addr.street_address_1 || 'roof'}`,
        status: 'open',
      });
    }
  }

  await ghl('POST', `/contacts/${contact.id}/notes`, {
    body: `CompanyCam label: ${active.map(p => p.label).join(', ')} (project ${projectId}). Tags added: ${newTags.join(', ') || 'none (already tagged)'}.`,
  });

  log('done', { projectId, labels: active.map(p => p.label), newTags });
  return NextResponse.json({ ok: true, labels: active.map(p => p.label), newTags });
}
