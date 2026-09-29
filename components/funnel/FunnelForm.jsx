'use client';
import { useState, useEffect, useRef } from 'react';
import { Home, Wrench, CloudLightning, HelpCircle, ArrowLeft, Phone, Loader2, ShieldCheck } from 'lucide-react';
import config from '../../lib/config';
import { DEFAULT_FUNNEL_SLUG } from '../../lib/funnels';
import { pushDataLayer } from './tracking';


// Values must match the GHL "Project Type" and "Project Urgency" option lists
// (checked again server-side in /api/funnel-lead).
const PROJECT_TYPES = [
  { value: 'Roof Replacement', label: 'Roof Replacement', hint: 'Full new roof', Icon: Home },
  { value: 'Roof Repair', label: 'Roof Repair', hint: 'Leak or damage', Icon: Wrench },
  { value: 'Storm Damage', label: 'Storm Damage', hint: 'Hail or wind', Icon: CloudLightning },
  { value: "I'm Not Sure", label: "I'm Not Sure", hint: 'Need an expert look', Icon: HelpCircle },
];

const TIMELINES = [
  { value: 'As soon as possible — Emergency', label: 'As soon as possible' },
  { value: 'Within 1 month', label: 'Within a month' },
  { value: 'Within 1–3 months', label: 'In 1–3 months' },
  { value: 'Just getting pricing / Planning ahead', label: 'Just getting pricing' },
];

const ATTRIBUTION_KEYS = [
  'gclid', 'wbraid', 'gbraid',
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
];

const TOTAL_STEPS = 3;

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
}) {
  const location = config.locations[market] || config.locations.nashville;
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [fields, setFields] = useState({
    projectType: '', timeline: '', address: '', zip: '', name: '', phone: '', email: '', message: '', company: '',
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

  const goToStep = next => {
    setStep(next);
    setError('');
    pushDataLayer('funnel_form_step', { funnel_slug: funnelSlug, lead_source: leadSource, funnel_step: next });
    // Only scroll when the top of the form has left the screen; otherwise the
    // page jumps on every step.
    const top = rootRef.current?.getBoundingClientRect().top ?? 0;
    if (top < 0) rootRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const selectProject = value => {
    set('projectType', value);
    goToStep(2);
  };

  const handleStep2 = e => {
    e.preventDefault();
    if (fields.zip.length !== 5) return setError('Please enter your 5-digit ZIP code.');
    goToStep(3);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!fields.name.trim()) return setError('Please enter your name.');
    if (fields.phone.replace(/\D/g, '').length < 10) {
      return setError('Please enter a valid 10-digit phone number.');
    }

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
  const backClass = 'mt-3 w-full flex items-center justify-center gap-1.5 text-text-muted hover:text-primary text-sm font-semibold transition';

  return (
    <div
      id={id}
      ref={rootRef}
      className="scroll-mt-24 bg-white rounded-2xl shadow-2xl ring-1 ring-black/5 overflow-hidden"
    >
      <div className="bg-primary px-6 py-4 text-center">
        <p className="text-white font-extrabold text-xl leading-tight">{heading || 'Get Your Free Roof Inspection'}</p>
        <p className="text-white/70 text-sm mt-1">3 quick steps · no obligation</p>
      </div>

      <div className="px-6 pt-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-text-muted">
            Step {step} of {TOTAL_STEPS}
          </span>
          <span className="text-xs font-bold text-primary">{Math.round((step / TOTAL_STEPS) * 100)}%</span>
        </div>
        <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
          <div
            className="h-full rounded-full bg-cta transition-all duration-500 ease-out"
            style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
          />
        </div>
      </div>

      <div className="px-6 py-6">
        {/* STEP 1: project type. Tapping a card advances; no Continue button to hunt for. */}
        {step === 1 && (
          <div>
            <h3 className="text-lg font-bold text-text-dark mb-1">What do you need help with?</h3>
            <p className="text-text-muted text-sm mb-5">Tap one to get started.</p>
            <div className="grid grid-cols-2 gap-3">
              {PROJECT_TYPES.map(({ value, label, hint, Icon }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => selectProject(value)}
                  className="group flex flex-col items-center text-center gap-2 rounded-xl border-2 border-slate-200 px-3 py-5 hover:border-primary hover:bg-primary/5 focus:border-primary focus:outline-none transition"
                >
                  <Icon size={26} className="text-primary" />
                  <span className="font-bold text-text-dark text-sm leading-tight">{label}</span>
                  <span className="text-text-muted text-xs leading-tight">{hint}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: property */}
        {step === 2 && (
          <form onSubmit={handleStep2} noValidate>
            <h3 className="text-lg font-bold text-text-dark mb-1">Where is the property?</h3>
            <p className="text-text-muted text-sm mb-5">So we can confirm we service your area.</p>

            <div className="mb-4">
              <label className={labelClass} htmlFor={`${id}-zip`}>ZIP code</label>
              <input
                id={`${id}-zip`} type="text" inputMode="numeric" autoComplete="postal-code" required
                className={inputClass} placeholder={market === 'boise' ? '83702' : '37072'} maxLength={5}
                value={fields.zip}
                onChange={e => set('zip', e.target.value.replace(/\D/g, ''))}
              />
            </div>

            <div className="mb-4">
              <label className={labelClass} htmlFor={`${id}-address`}>
                Street address <span className="font-normal text-text-muted">(optional)</span>
              </label>
              <input
                id={`${id}-address`} type="text" autoComplete="street-address" className={inputClass}
                placeholder="123 Main St"
                value={fields.address}
                onChange={e => set('address', e.target.value)}
              />
            </div>

            <div className="mb-5">
              <span className={labelClass}>How soon do you need it? <span className="font-normal text-text-muted">(optional)</span></span>
              <div className="grid grid-cols-2 gap-2">
                {TIMELINES.map(option => (
                  <button
                    key={option.value} type="button"
                    onClick={() => set('timeline', fields.timeline === option.value ? '' : option.value)}
                    aria-pressed={fields.timeline === option.value}
                    className={`text-left rounded-lg border-2 px-3 py-2.5 text-sm font-semibold transition ${
                      fields.timeline === option.value
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-slate-200 text-text-dark hover:border-primary/50'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {error && <p className="text-red-600 text-sm font-semibold mb-3" role="alert">{error}</p>}

            <button type="submit" className="w-full rounded-lg bg-cta hover:bg-cta-hover text-primary font-extrabold text-lg py-4 transition shadow-lg">
              Continue →
            </button>
            <button type="button" onClick={() => goToStep(1)} className={backClass}>
              <ArrowLeft size={14} /> Back
            </button>
          </form>
        )}

        {/* STEP 3: contact */}
        {step === 3 && (
          <form onSubmit={handleSubmit} noValidate>
            <h3 className="text-lg font-bold text-text-dark mb-1">Who should we contact?</h3>
            <p className="text-text-muted text-sm mb-5">We&apos;ll reach out to schedule your free inspection.</p>

            <div className="mb-4">
              <label className={labelClass} htmlFor={`${id}-name`}>Full name</label>
              <input
                id={`${id}-name`} type="text" autoComplete="name" required className={inputClass}
                placeholder="Jane Smith"
                value={fields.name}
                onChange={e => set('name', e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className={labelClass} htmlFor={`${id}-phone`}>Phone number</label>
              <input
                id={`${id}-phone`} type="tel" autoComplete="tel" required className={inputClass}
                placeholder={market === 'boise' ? '(208) 555-0123' : '(615) 555-0123'}
                value={fields.phone}
                onChange={e => set('phone', e.target.value)}
              />
            </div>

            <div className="mb-5">
              <label className={labelClass} htmlFor={`${id}-email`}>
                Email <span className="font-normal text-text-muted">(optional)</span>
              </label>
              <input
                id={`${id}-email`} type="email" autoComplete="email" className={inputClass}
                placeholder="jane@example.com"
                value={fields.email}
                onChange={e => set('email', e.target.value)}
              />
            </div>

            {showMessage && (
              <div className="mb-5">
                <label className={labelClass} htmlFor={`${id}-message`}>
                  Anything we should know? <span className="font-normal text-text-muted">(optional)</span>
                </label>
                <textarea
                  id={`${id}-message`} rows={3} className={inputClass}
                  placeholder="Leak over the kitchen, storm last week, and so on"
                  value={fields.message}
                  onChange={e => set('message', e.target.value)}
                />
              </div>
            )}

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

            <button
              type="submit" disabled={submitting}
              className="w-full rounded-lg bg-cta hover:bg-cta-hover disabled:opacity-70 disabled:cursor-not-allowed text-primary font-extrabold text-lg py-4 transition shadow-lg flex items-center justify-center gap-2"
            >
              {submitting ? (<><Loader2 size={20} className="animate-spin" /> Sending…</>) : (submitLabel || 'Get My Free Inspection')}
            </button>
            <button type="button" onClick={() => goToStep(2)} className={backClass}>
              <ArrowLeft size={14} /> Back
            </button>
          </form>
        )}
      </div>

      <div className="border-t border-slate-100 px-6 py-4 flex items-center justify-center gap-2 text-text-muted">
        <ShieldCheck size={15} className="text-primary flex-shrink-0" />
        <span className="text-xs">Your info stays with Stellar Roofing. No spam.</span>
      </div>
    </div>
  );
}
