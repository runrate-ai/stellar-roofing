'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Home, Wrench, CloudLightning, HelpCircle, ArrowLeft, Phone, Loader2, ShieldCheck } from 'lucide-react';
import config from '../../lib/config';

const nashville = config.locations.nashville;

const PROJECT_TYPES = [
  { value: 'Roof Replacement', label: 'Roof Replacement', hint: 'Full new roof', Icon: Home },
  { value: 'Roof Repair', label: 'Roof Repair', hint: 'Leak or damage', Icon: Wrench },
  { value: 'Storm Damage', label: 'Storm Damage', hint: 'Hail or wind', Icon: CloudLightning },
  { value: 'Not Sure', label: "I'm Not Sure", hint: 'Need an expert look', Icon: HelpCircle },
];

const TIMELINES = ['As soon as possible', 'Within 1–3 months', 'Just getting pricing'];

const ATTRIBUTION_KEYS = [
  'gclid', 'wbraid', 'gbraid',
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
];

const TOTAL_STEPS = 3;

function pushDataLayer(event, data = {}) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...data });
}

export default function FunnelForm({ id = 'quote-form', compact = false }) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [fields, setFields] = useState({
    projectType: '', timeline: '', address: '', zip: '', name: '', phone: '', email: '',
  });
  const attribution = useRef({});
  const startedRef = useRef(false);

  // Capture Google Ads click IDs and UTMs once on mount. These live only in the
  // landing URL, so if we don't grab them here they're gone by submit time.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const captured = {};
    ATTRIBUTION_KEYS.forEach(key => {
      const value = params.get(key);
      if (value) captured[key] = value;
    });
    attribution.current = {
      ...captured,
      landingPage: window.location.href,
      referrer: document.referrer || '',
    };
  }, []);

  const set = (key, value) => {
    setFields(prev => ({ ...prev, [key]: value }));
    setError('');
    if (!startedRef.current) {
      startedRef.current = true;
      pushDataLayer('funnel_form_start');
    }
  };

  const goToStep = next => {
    setStep(next);
    setError('');
    pushDataLayer('funnel_form_step', { funnel_step: next });
    // Keep the form in view on mobile, where steps can shift page height.
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const selectProject = value => {
    set('projectType', value);
    goToStep(2);
  };

  const handleStep2 = e => {
    e.preventDefault();
    if (!fields.zip.trim()) return setError('Please enter your ZIP code.');
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
    try {
      const res = await fetch('/api/funnel-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...fields, ...attribution.current }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.ok) {
        setSubmitting(false);
        setError(`Something went wrong on our end. Please call us at ${nashville.phone} and we'll take care of you right away.`);
        return;
      }

      pushDataLayer('generate_lead', {
        funnel_project_type: fields.projectType,
        funnel_timeline: fields.timeline,
      });
      router.push('/lp/nashville-roofing/thank-you');
    } catch {
      setSubmitting(false);
      setError(`Something went wrong on our end. Please call us at ${nashville.phone} and we'll take care of you right away.`);
    }
  };

  const inputClass =
    'w-full rounded-lg border-2 border-slate-200 px-4 py-3.5 text-text-dark text-base placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition';
  const labelClass = 'block text-sm font-semibold text-text-dark mb-1.5';

  return (
    <div
      id={id}
      className="scroll-mt-24 bg-white rounded-2xl shadow-2xl ring-1 ring-black/5 overflow-hidden"
    >
      {/* Header */}
      <div className="bg-primary px-6 py-5 text-center">
        <p className="text-white font-extrabold text-xl leading-tight">
          {compact ? 'Claim Your Free Gutters' : 'Get Your Free Estimate + Free Gutters'}
        </p>
        <p className="text-white/70 text-sm mt-1">
          Takes about 30 seconds — no obligation
        </p>
      </div>

      {/* Progress */}
      <div className="px-6 pt-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-text-muted">
            Step {step} of {TOTAL_STEPS}
          </span>
          <span className="text-xs font-bold text-primary">
            {Math.round((step / TOTAL_STEPS) * 100)}%
          </span>
        </div>
        <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
          <div
            className="h-full rounded-full bg-cta transition-all duration-500 ease-out"
            style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
          />
        </div>
      </div>

      <div className="px-6 py-6">
        {/* STEP 1 — project type */}
        {step === 1 && (
          <div>
            <h3 className="text-lg font-bold text-text-dark mb-1">What do you need help with?</h3>
            <p className="text-text-muted text-sm mb-5">Choose one to get started.</p>
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

        {/* STEP 2 — property */}
        {step === 2 && (
          <form onSubmit={handleStep2}>
            <h3 className="text-lg font-bold text-text-dark mb-1">Where is the property?</h3>
            <p className="text-text-muted text-sm mb-5">So we can confirm we service your area.</p>

            <div className="mb-4">
              <label className={labelClass} htmlFor="lp-address">Street address <span className="font-normal text-text-muted">(optional)</span></label>
              <input
                id="lp-address" type="text" autoComplete="street-address" className={inputClass}
                placeholder="123 Main St"
                value={fields.address}
                onChange={e => set('address', e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className={labelClass} htmlFor="lp-zip">ZIP code</label>
              <input
                id="lp-zip" type="text" inputMode="numeric" autoComplete="postal-code" required
                className={inputClass} placeholder="37203" maxLength={5}
                value={fields.zip}
                onChange={e => set('zip', e.target.value.replace(/\D/g, ''))}
              />
            </div>

            <div className="mb-5">
              <span className={labelClass}>How soon do you need this done?</span>
              <div className="space-y-2">
                {TIMELINES.map(option => (
                  <button
                    key={option} type="button"
                    onClick={() => set('timeline', option)}
                    className={`w-full text-left rounded-lg border-2 px-4 py-3 text-sm font-semibold transition ${
                      fields.timeline === option
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-slate-200 text-text-dark hover:border-primary/50'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {error && <p className="text-red-600 text-sm font-semibold mb-3">{error}</p>}

            <button type="submit" className="w-full rounded-lg bg-cta hover:bg-cta-hover text-primary font-extrabold text-lg py-4 transition shadow-lg">
              Continue →
            </button>
            <button type="button" onClick={() => goToStep(1)} className="mt-3 w-full flex items-center justify-center gap-1.5 text-text-muted hover:text-primary text-sm font-semibold transition">
              <ArrowLeft size={14} /> Back
            </button>
          </form>
        )}

        {/* STEP 3 — contact */}
        {step === 3 && (
          <form onSubmit={handleSubmit}>
            <h3 className="text-lg font-bold text-text-dark mb-1">Where should we send your estimate?</h3>
            <p className="text-text-muted text-sm mb-5">We'll reach out within 1 business day.</p>

            <div className="mb-4">
              <label className={labelClass} htmlFor="lp-name">Full name</label>
              <input
                id="lp-name" type="text" autoComplete="name" required className={inputClass}
                placeholder="Jane Smith"
                value={fields.name}
                onChange={e => set('name', e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className={labelClass} htmlFor="lp-phone">Phone number</label>
              <input
                id="lp-phone" type="tel" autoComplete="tel" required className={inputClass}
                placeholder="(629) 555-0123"
                value={fields.phone}
                onChange={e => set('phone', e.target.value)}
              />
            </div>

            <div className="mb-5">
              <label className={labelClass} htmlFor="lp-email">Email <span className="font-normal text-text-muted">(optional)</span></label>
              <input
                id="lp-email" type="email" autoComplete="email" className={inputClass}
                placeholder="jane@example.com"
                value={fields.email}
                onChange={e => set('email', e.target.value)}
              />
            </div>

            {error && (
              <div className="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3">
                <p className="text-red-700 text-sm font-semibold">{error}</p>
                <a href={`tel:${nashville.phoneRaw}`} className="mt-2 inline-flex items-center gap-1.5 text-red-700 font-bold underline">
                  <Phone size={14} /> {nashville.phone}
                </a>
              </div>
            )}

            <button
              type="submit" disabled={submitting}
              className="w-full rounded-lg bg-cta hover:bg-cta-hover disabled:opacity-70 disabled:cursor-not-allowed text-primary font-extrabold text-lg py-4 transition shadow-lg flex items-center justify-center gap-2"
            >
              {submitting ? (<><Loader2 size={20} className="animate-spin" /> Sending…</>) : 'Claim My Free Gutters'}
            </button>

            <button type="button" onClick={() => goToStep(2)} className="mt-3 w-full flex items-center justify-center gap-1.5 text-text-muted hover:text-primary text-sm font-semibold transition">
              <ArrowLeft size={14} /> Back
            </button>
          </form>
        )}
      </div>

      {/* Reassurance */}
      <div className="border-t border-slate-100 px-6 py-4 flex items-center justify-center gap-2 text-text-muted">
        <ShieldCheck size={15} className="text-primary flex-shrink-0" />
        <span className="text-xs">Your info is secure. No spam, no pushy sales calls.</span>
      </div>
    </div>
  );
}
