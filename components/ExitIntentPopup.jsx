'use client';
import { useEffect, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { usePathname } from 'next/navigation';
import { X, ShieldCheck, ClipboardCheck, Scale } from 'lucide-react';
import SiteLeadForm from './SiteLeadForm';
import { isFunnelHostname } from '../lib/funnel-host';
import { pushDataLayer } from './funnel/tracking';

// "Wait, before you go" popup for the Nashville main site. Shows once per
// visit when a visitor looks about to leave: the cursor leaves through the top
// of the window (desktop), or a fast scroll back to the top (phones, which have
// no cursor). It only offers what Stellar really offers: a free inspection, a
// written estimate, and a price match. No countdowns, no "limited time".
const SEEN_KEY = 'stellar_exit_popup_seen';
const DISMISSED_KEY = 'stellar_exit_popup_dismissed';
const DISMISS_DAYS = 7;
const MIN_TIME_ON_PAGE_MS = 8000;
const MIN_TIME_FOR_SCROLL_TRIGGER_MS = 20000;

// Pages that already are the form, a thank-you, or legal text.
const SKIP_PREFIXES = ['/boise', '/lp', '/thank-you', '/free-inspection', '/contact', '/privacy-policy', '/terms-and-conditions'];

function readStore(store, key) {
  try { return window[store].getItem(key); } catch { return null; }
}
function writeStore(store, key, value) {
  try { window[store].setItem(key, value); } catch { /* private mode: fine */ }
}

function recentlyDismissed() {
  const at = Number(readStore('localStorage', DISMISSED_KEY));
  return Boolean(at) && Date.now() - at < DISMISS_DAYS * 24 * 60 * 60 * 1000;
}

export default function ExitIntentPopup() {
  const pathname = usePathname() || '/';
  const [open, setOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const eligible =
    !SKIP_PREFIXES.some(prefix => pathname === prefix || pathname.startsWith(`${prefix}/`)) &&
    !(typeof window !== 'undefined' && isFunnelHostname(window.location.hostname));

  const close = useCallback((reason) => {
    setOpen(false);
    writeStore('localStorage', DISMISSED_KEY, String(Date.now()));
    pushDataLayer('exit_popup_dismiss', { reason, click_location: pathname });
  }, [pathname]);

  useEffect(() => {
    if (!eligible || readStore('sessionStorage', SEEN_KEY) || recentlyDismissed()) return undefined;

    const loadedAt = Date.now();
    let lastY = window.scrollY;
    let lastT = loadedAt;
    let fired = false;

    const show = trigger => {
      if (fired) return;
      fired = true;
      writeStore('sessionStorage', SEEN_KEY, '1');
      setOpen(true);
      pushDataLayer('exit_popup_shown', { trigger, click_location: pathname });
    };

    // Desktop: the pointer leaves through the top edge (toward tabs, back, close).
    const onMouseOut = e => {
      if (e.relatedTarget || e.clientY > 0) return;
      if (Date.now() - loadedAt < MIN_TIME_ON_PAGE_MS) return;
      show('mouse_leave');
    };

    // Phones: a quick flick back up toward the top after reading for a while.
    const onScroll = () => {
      const now = Date.now();
      const y = window.scrollY;
      const speed = (lastY - y) / Math.max(now - lastT, 1); // px per ms, up = positive
      if (
        now - loadedAt > MIN_TIME_FOR_SCROLL_TRIGGER_MS &&
        lastY > 600 && speed > 1.2 && y < lastY - 250
      ) {
        show('scroll_up');
      }
      lastY = y;
      lastT = now;
    };

    document.addEventListener('mouseout', onMouseOut);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      document.removeEventListener('mouseout', onMouseOut);
      window.removeEventListener('scroll', onScroll);
    };
  }, [eligible, pathname]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = e => { if (e.key === 'Escape') close('escape'); };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close]);

  if (!eligible || !open) return null;

  // Portaled to the end of <body> with the maximum z-index so the Roofle quote
  // tab and the chat bubble (both injected by third-party scripts) stay behind it.
  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/60 p-4"
      style={{ zIndex: 2147483647 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-popup-title"
      onClick={e => { if (e.target === e.currentTarget) close('backdrop'); }}
    >
      <div className="relative w-full max-w-md max-h-[92vh] overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <button
          type="button"
          onClick={() => close('x')}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-text-muted ring-1 ring-slate-200 hover:text-primary"
        >
          <X size={18} />
        </button>

        {showForm ? (
          <div className="p-3 pt-12">
            <SiteLeadForm id="exit-popup-form" title="Get Your Free Roof Inspection" />
          </div>
        ) : (
          <div>
            <div className="bg-primary px-6 pb-6 pt-8 text-center">
              <p className="text-sm font-semibold uppercase tracking-wide text-cta">Stellar Roofing &amp; Restorations</p>
              <h2 id="exit-popup-title" className="mt-2 text-2xl font-extrabold leading-tight text-white">
                Wait, before you go
              </h2>
              <p className="mt-2 text-base text-white/80">
                Get a free roof inspection from a local Goodlettsville crew.
              </p>
            </div>

            <div className="px-6 py-6">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <ClipboardCheck size={22} className="mt-0.5 flex-shrink-0 text-primary" />
                  <span className="text-text-dark"><strong>Free inspection and written estimate.</strong> No obligation.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Scale size={22} className="mt-0.5 flex-shrink-0 text-primary" />
                  <span className="text-text-dark"><strong>Already have a quote?</strong> We&rsquo;ll price match it, apples to apples.</span>
                </li>
                <li className="flex items-start gap-3">
                  <ShieldCheck size={22} className="mt-0.5 flex-shrink-0 text-primary" />
                  <span className="text-text-dark"><strong>Lifetime workmanship warranty</strong> on roof replacements. Licensed and insured.</span>
                </li>
              </ul>

              <button
                type="button"
                onClick={() => { setShowForm(true); pushDataLayer('exit_popup_click', { click_location: pathname }); }}
                className="mt-6 w-full rounded-lg bg-cta py-4 text-lg font-extrabold text-primary shadow-lg transition hover:bg-cta-hover"
              >
                Get My Free Roof Inspection
              </button>
              <button
                type="button"
                onClick={() => close('no_thanks')}
                className="mt-3 w-full py-2 text-sm text-text-muted hover:text-primary"
              >
                No thanks
              </button>
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
