import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const REQUIRED = ['name', 'phone', 'projectType'];

// Digits only, tolerant of (629) 277-4249 / 629.277.4249 / +1 629 277 4249
function normalizePhone(raw) {
  const digits = String(raw || '').replace(/\D/g, '');
  if (digits.length === 11 && digits.startsWith('1')) return digits.slice(1);
  return digits;
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request body.' }, { status: 400 });
  }

  const missing = REQUIRED.filter(f => !String(body[f] || '').trim());
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

  const webhookUrl = process.env.GHL_WEBHOOK_URL;
  if (!webhookUrl) {
    // Fail loudly in dev/preview so this is caught before spend starts, rather
    // than dropping live leads into a void.
    console.error('[funnel-lead] GHL_WEBHOOK_URL is not set — lead was NOT delivered:', {
      name: body.name,
      phone,
      email: body.email,
    });
    return NextResponse.json(
      { ok: false, error: 'Lead routing is not configured.' },
      { status: 500 }
    );
  }

  const payload = {
    // Contact
    full_name: String(body.name).trim(),
    phone,
    email: String(body.email || '').trim(),
    address: String(body.address || '').trim(),
    postal_code: String(body.zip || '').trim(),
    city: 'Nashville',
    state: 'TN',

    // Qualification
    project_type: body.projectType,
    timeline: body.timeline || '',
    offer_claimed: 'Free Gutters + Price Beat Guarantee',

    // Attribution — this is what makes Google Ads spend measurable
    source: 'PPC Funnel — Nashville',
    landing_page: body.landingPage || '',
    gclid: body.gclid || '',
    wbraid: body.wbraid || '',
    gbraid: body.gbraid || '',
    utm_source: body.utm_source || '',
    utm_medium: body.utm_medium || '',
    utm_campaign: body.utm_campaign || '',
    utm_term: body.utm_term || '',
    utm_content: body.utm_content || '',
    referrer: body.referrer || '',
    submitted_at: new Date().toISOString(),
  };

  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => '');
      console.error('[funnel-lead] GHL webhook rejected the lead:', res.status, detail, payload);
      return NextResponse.json(
        { ok: false, error: 'We could not submit your request.' },
        { status: 502 }
      );
    }
  } catch (err) {
    console.error('[funnel-lead] GHL webhook request failed:', err, payload);
    return NextResponse.json(
      { ok: false, error: 'We could not submit your request.' },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
