'use client';
import { useState, useEffect, useRef } from 'react';
import { Phone, Loader2, ShieldCheck } from 'lucide-react';
import config from '../../lib/config';
import { DEFAULT_FUNNEL_SLUG } from '../../lib/funnels';
import { pushDataLayer } from './tracking';


// Values must match the GHL "Project Type" option list (checked again
// server-side in /api/funnel-lead).
const PROJECT_TYPES = ['Roof Replacement', 'Roof Repair', 'Storm Damage', "I'm Not Sure"];

const ATTRIBUTION_KEYS = [
  'gclid', 'wbraid', 'gbraid', 'fbclid',
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
];

// The subdomain serves funnels at /<slug> (the default at /), while the main
// domain serves them at /lp/<slug>. Send the visitor to the matching thank-you
// page, which fires the generate_lead conversion.
function thankYouPath(slug) {
  if (window.location.pathname.startsWith('/lp/')) return `/lp/${slug}/thank-you`;
  return slug === DEFAULT_FUNNEL_SLUG ? '/thank-you' : `/${slug}/thank-you`;
}

// Shared by the PPC funnel and the main site. Main-site pages pass
// leadSource="website", their market, and a thank-you URL.
export default function FunnelForm({
  id = 'quote-form',
  funnelSlug,
  heading,
  submitLabel,
  leadSource = 'funnel',
  market = 'nashville',
  thankYouHref,
  showMessage = false,
  twoStep = false,
}) {
  const location = config.locations[market] || config.locations.nashville;
  // twoStep: step 1 asks only what/where (short, low-commitment); step 2 asks
  // for contact details. Off by default, so existing forms are unchanged.
  const [step, setStep] = useState(1);
  const showStep1 = !twoStep || step === 1;
  const showStep2 = !twoStep || step === 2;
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [fields, setFields] = useState({
    projectType: '', address: '', zip: '', name: '', phone: '', email: '', message: '', company: '', smsConsent: false,
  });
  const attribution = useRef({});
  const startedRef = useRef(false);
  const rootRef = useRef(null);

  // Google Ads click IDs and UTMs live only in the landing URL; grab them on
  // mount or they're gone by submit time.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const captured = {};
    ATTRIBUTION_KEYS.forEach(key => {
      const value = params.get(key);
      if (value) captured[key] = value;
    });
    attribution.current = { ...captured, landingPage: window.location.href };
  }, []);

  const set = (key, value) => {
    setFields(prev => ({ ...prev, [key]: value }));
    setError('');
    if (!startedRef.current) {
      startedRef.current = true;
      pushDataLayer('funnel_form_start', { funnel_slug: funnelSlug, lead_source: leadSource });
    }
  };

  // Returns an error message for step 1 (what and where), or '' when it's fine.
  const step1Error = () => {
    if (!PROJECT_TYPES.includes(fields.projectType)) return 'Please choose what you need help with.';
    if (fields.zip.length !== 5) return 'Please enter your 5-digit ZIP code.';
    const address = fields.address.trim();
    if (address.length < 5 || !/\d/.test(address) || !/[a-z]/i.test(address)) {
      return 'Please enter the street address, like 123 Main St.';
    }
    return '';
  };

  const goToStep2 = () => {
    const problem = step1Error();
    if (problem) return setError(problem);
    setError('');
    setStep(2);
    pushDataLayer('funnel_form_step', { funnel_slug: funnelSlug, lead_source: leadSource, step: 2 });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (twoStep && step === 1) return goToStep2();
    const step1Problem = step1Error();
    if (step1Problem) return setError(step1Problem);
    if (!fields.name.trim()) return setError('Please enter your name.');
    if (fields.phone.replace(/\D/g, '').length < 10) {
      return setError('Please enter a valid 10-digit phone number.');
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) {
      return setError('Please enter a valid email address.');
    }
    if (showMessage && !fields.message.trim()) return setError('Please tell us a little about your project.');

    setSubmitting(true);
    setError('');
    // On shared pages (contact, free inspection) an Idaho ZIP (83xxx) routes
    // the lead to the Boise branch.
    const leadMarket = leadSource === 'website' && fields.zip.startsWith('83') ? 'boise' : market;
    try {
      const res = await fetch('/api/funnel-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...fields, ...attribution.current, funnelSlug, leadSource, market: leadMarket, pagePath: window.location.pathname }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error('lead not accepted');
      // The thank-you page fires generate_lead, so the conversion counts once
      // whether a visitor submits here or lands there another way.
      window.location.assign(
        typeof thankYouHref === 'function' ? thankYouHref(leadMarket) : (thankYouHref || thankYouPath(funnelSlug))
      );
    } catch {
      setSubmitting(false);
      pushDataLayer('funnel_form_error', { funnel_slug: funnelSlug, lead_source: leadSource });
      setError(`Something went wrong on our end. Please call us at ${location.phone} and we'll take care of you right away.`);
    }
  };

  const inputClass =
    'w-full rounded-lg border-2 border-slate-200 px-4 py-3.5 text-text-dark text-base placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition';
  const labelClass = 'block text-sm font-semibold text-text-dark mb-1.5';

  return (
    <div
      id={id}
      ref={rootRef}
      className="scroll-mt-24 bg-white rounded-2xl shadow-2xl ring-1 ring-black/5 overflow-hidden"
    >
      <div className="bg-primary px-5 py-3 sm:px-6 sm:py-4 text-center">
        <p className="text-white font-extrabold text-xl leading-tight">{heading || 'Get Your Free Roof Inspection'}</p>
        <p className="text-white/70 text-sm mt-1">Free estimate &middot; no obligation</p>
      </div>

      <div className="px-6 py-5">
        <form onSubmit={handleSubmit} noValidate>
          {showStep1 && (<>
          <div className="mb-3.5">
            <label className={labelClass} htmlFor={`${id}-type`}>What do you need help with?</label>
            <select
              id={`${id}-type`} required className={inputClass}
              value={fields.projectType}
              onChange={e => set('projectType', e.target.value)}
            >
              <option value="" disabled>Choose one</option>
              {PROJECT_TYPES.map(value => <option key={value} value={value}>{value}</option>)}
            </select>
          </div>

          <div className="mb-3.5 grid grid-cols-[1fr_7rem] gap-3">
            <div>
              <label className={labelClass} htmlFor={`${id}-address`}>Street address</label>
              <input
                id={`${id}-address`} type="text" autoComplete="street-address" required className={inputClass}
                placeholder="123 Main St"
                value={fields.address}
                onChange={e => set('address', e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass} htmlFor={`${id}-zip`}>ZIP</label>
              <input
                id={`${id}-zip`} type="text" inputMode="numeric" autoComplete="postal-code" required
                className={inputClass} placeholder={market === 'boise' ? '83702' : '37072'} maxLength={5}
                value={fields.zip}
                onChange={e => set('zip', e.target.value.replace(/\D/g, ''))}
              />
            </div>
          </div>
          </>)}

          {showStep2 && (<>
          {twoStep && (
            <button type="button" onClick={() => { setStep(1); setError(''); }} className="mb-3 text-sm font-semibold text-primary underline underline-offset-2">
              &larr; Back
            </button>
          )}
          <div className="mb-3.5">
            <label className={labelClass} htmlFor={`${id}-name`}>Full name</label>
            <input
              id={`${id}-name`} type="text" autoComplete="name" required className={inputClass}
              placeholder="Jane Smith"
              value={fields.name}
              onChange={e => set('name', e.target.value)}
            />
          </div>

          <div className="mb-3.5">
            <label className={labelClass} htmlFor={`${id}-phone`}>Phone number</label>
            <input
              id={`${id}-phone`} type="tel" autoComplete="tel" required className={inputClass}
              placeholder={market === 'boise' ? '(208) 555-0123' : '(615) 555-0123'}
              value={fields.phone}
              onChange={e => set('phone', e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className={labelClass} htmlFor={`${id}-email`}>Email</label>
            <input
              id={`${id}-email`} type="email" autoComplete="email" required className={inputClass}
              placeholder="jane@example.com"
              value={fields.email}
              onChange={e => set('email', e.target.value)}
            />
          </div>

          {showMessage && (
            <div className="mb-4">
              <label className={labelClass} htmlFor={`${id}-message`}>Tell us about your project</label>
              <textarea
                id={`${id}-message`} rows={3} required className={inputClass}
                placeholder="Leak over the kitchen, storm last week, and so on"
                value={fields.message}
                onChange={e => set('message', e.target.value)}
              />
            </div>
          )}
          </>)}

          {/* Honeypot: hidden from people, filled by bots. */}
          <div aria-hidden="true" className="absolute left-[-9999px] w-px h-px overflow-hidden">
            <label htmlFor={`${id}-company`}>Company</label>
            <input
              id={`${id}-company`} type="text" tabIndex={-1} autoComplete="off"
              value={fields.company}
              onChange={e => setFields(prev => ({ ...prev, company: e.target.value }))}
            />
          </div>

          {error && (
            <div className="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3" role="alert">
              <p className="text-red-700 text-sm font-semibold">{error}</p>
              <a
                href={`tel:${location.phoneRaw}`}
                onClick={() => pushDataLayer('phone_call_click', { funnel_slug: funnelSlug, lead_source: leadSource, click_location: 'form_error' })}
                className="mt-2 inline-flex items-center gap-1.5 text-red-700 font-bold underline"
              >
                <Phone size={14} /> {location.phone}
              </a>
            </div>
          )}

          {/* A2P 10DLC consent: optional, unchecked by default, never required to submit. */}
          {showStep2 && (
          <div className="mb-4 flex items-start gap-3">
            <input
              id={`${id}-sms`} type="checkbox" className="mt-1 h-5 w-5 flex-shrink-0 rounded border-2 border-slate-300 accent-primary"
              checked={fields.smsConsent}
              onChange={e => set('smsConsent', e.target.checked)}
            />
            <label htmlFor={`${id}-sms`} className="text-xs leading-relaxed text-text-muted">
              I agree to receive text messages from Stellar Roofing &amp; Restorations about my roofing inquiry, estimate, and appointment. Message frequency varies. Message and data rates may apply. Reply STOP to opt out or HELP for help. Consent is not a condition of purchase. See our{' '}
              <a href="https://www.thestellarroofing.com/privacy-policy" target="_blank" rel="noopener" className="underline">Privacy Policy</a> and{' '}
              <a href="https://www.thestellarroofing.com/terms-and-conditions" target="_blank" rel="noopener" className="underline">Terms &amp; Conditions</a>.
            </label>
          </div>
          )}

          <button
            type="submit" disabled={submitting}
            className="w-full rounded-lg bg-cta hover:bg-cta-hover disabled:opacity-70 disabled:cursor-not-allowed text-primary font-extrabold text-lg py-4 transition shadow-lg flex items-center justify-center gap-2"
          >
            {submitting ? (<><Loader2 size={20} className="animate-spin" /> Sending…</>) : (twoStep && step === 1 ? 'Next' : (submitLabel || 'Get My Free Inspection'))}
          </button>
          {twoStep && step === 1 && (
            <p className="mt-3 text-center text-xs font-semibold text-primary">Takes about 30 seconds to start.</p>
          )}
        </form>
      </div>

      <div className="border-t border-slate-100 px-6 py-4 flex flex-col items-center gap-1.5 text-text-muted">
        <div className="flex items-center justify-center gap-2">
          <ShieldCheck size={15} className="text-primary flex-shrink-0" />
          <span className="text-xs">Your info stays with Stellar Roofing. No spam.</span>
        </div>
        {/* Always visible. Full URLs so they work from the funnel subdomain. */}
        <div className="text-xs">
          <a href="https://www.thestellarroofing.com/terms-and-conditions" target="_blank" rel="noopener" className="underline hover:text-primary">Terms</a>
          <span className="mx-2" aria-hidden="true">&middot;</span>
          <a href="https://www.thestellarroofing.com/privacy-policy" target="_blank" rel="noopener" className="underline hover:text-primary">Privacy Policy</a>
        </div>
      </div>
    </div>
  );
}
