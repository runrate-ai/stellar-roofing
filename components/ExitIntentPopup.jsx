'use client';
import { useEffect, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { usePathname } from 'next/navigation';
import { X, ShieldCheck, ClipboardCheck, Scale } from 'lucide-react';
import SiteLeadForm from './SiteLeadForm';
import { isFunnelHostname } from '../lib/funnel-host';
import { pushDataLayer } from './funnel/tracking';

// "Wait, before you go" popup for the Nashville main site. Shows once per
// visit when a visitor looks about to leave. Browsers never tell a page that
// someone clicked close, back or home, so it watches for the moment before:
//   - desktop: the cursor leaves through the top of the window, toward the
//     tabs, address bar, back and close buttons;
//   - phones: a fast swipe back up the page (to bring back the address bar);
//   - any device: they switch to another tab or app (or press home) and come
//     back. The popup is waiting when they return.
// No popup for the rest of the visit once someone has called, texted, emailed,
// opened the chat, or reached a thank-you page. It only offers what Stellar
// really offers: a free inspection, a written estimate, and a price match.
// No countdowns, no "limited time".
//
// To test: add ?exitpopup=test to a page's URL. That clears the "already
// shown" and "closed it" memory on that device.
const SEEN_KEY = 'stellar_exit_popup_seen';
const DISMISSED_KEY = 'stellar_exit_popup_dismissed';
const VISIT_START_KEY = 'stellar_visit_start';
const DISMISS_DAYS = 7;
const MIN_VISIT_MS = 4000; // time on the site before any trigger counts
const MIN_VISIT_FOR_SWIPE_MS = 10000;
const MIN_AWAY_MS = 1500; // shorter trips away (a notification glance) don't count
const TOP_EDGE_PX = 50; // fast mouse moves report the last spot inside the page
const SWIPE_WINDOW_MS = 300;
const SWIPE_DISTANCE_PX = 500; // 500px up within 300ms is a flick, not reading
const SWIPE_MIN_DEPTH_PX = 800;

// Pages that already are the form, a thank-you, or legal text.
const SKIP_PREFIXES = ['/boise', '/lp', '/thank-you', '/free-inspection', '/contact', '/privacy-policy', '/terms-and-conditions'];
// The brand homepage serves Nashville and Boise visitors, and the popup's copy
// is for Goodlettsville. Exact match only: every other page stays eligible.
const SKIP_EXACT = ['/'];

function readStore(store, key) {
  try { return window[store].getItem(key); } catch { return null; }
}
function writeStore(store, key, value) {
  try { window[store].setItem(key, value); } catch { /* private mode: fine */ }
}
function removeStore(store, key) {
  try { window[store].removeItem(key); } catch { /* private mode: fine */ }
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
    !SKIP_EXACT.includes(pathname) &&
    !SKIP_PREFIXES.some(prefix => pathname === prefix || pathname.startsWith(`${prefix}/`)) &&
    !(typeof window !== 'undefined' && isFunnelHostname(window.location.hostname));

  const close = useCallback((reason) => {
    setOpen(false);
    writeStore('localStorage', DISMISSED_KEY, String(Date.now()));
    pushDataLayer('exit_popup_dismiss', { reason, click_location: pathname });
  }, [pathname]);

  // Reaching a thank-you page means they already sent a request.
  useEffect(() => {
    if (pathname === '/thank-you' || pathname.startsWith('/thank-you/')) {
      writeStore('sessionStorage', SEEN_KEY, '1');
    }
  }, [pathname]);

  useEffect(() => {
    if (!eligible) return undefined;
    if (new URLSearchParams(window.location.search).get('exitpopup') === 'test') {
      removeStore('sessionStorage', SEEN_KEY);
      removeStore('localStorage', DISMISSED_KEY);
    }
    if (readStore('sessionStorage', SEEN_KEY) || recentlyDismissed()) return undefined;

    // Time on the site counts from the first page of the visit, not this page.
    let visitStart = Number(readStore('sessionStorage', VISIT_START_KEY));
    if (!visitStart) {
      visitStart = Date.now();
      writeStore('sessionStorage', VISIT_START_KEY, String(visitStart));
    }
    const visitAge = () => Date.now() - visitStart;

    let fired = false;
    let formStarted = false;
    let hiddenAt = 0;
    let lastSwipe = 0;
    let samples = [];

    const show = trigger => {
      if (fired || readStore('sessionStorage', SEEN_KEY)) return;
      fired = true;
      writeStore('sessionStorage', SEEN_KEY, '1');
      setOpen(true);
      pushDataLayer('exit_popup_shown', { trigger, click_location: pathname });
    };

    // Desktop: the cursor leaves the page through the top.
    const onMouseOut = e => {
      if (e.relatedTarget || e.clientY > TOP_EDGE_PX) return;
      if (visitAge() < MIN_VISIT_MS) return;
      show('mouse_leave');
    };

    // Phones: a fast swipe back up the page. Only scrolls the visitor's finger
    // made count, so a button that scrolls up to the form doesn't set it off.
    const onTouchMove = () => { lastSwipe = Date.now(); };
    const onScroll = () => {
      const now = Date.now();
      if (now - lastSwipe > 1000) { samples = []; return; }
      const y = window.scrollY;
      samples.push({ t: now, y });
      samples = samples.filter(s => now - s.t <= SWIPE_WINDOW_MS);
      const peak = Math.max(...samples.map(s => s.y));
      if (peak > SWIPE_MIN_DEPTH_PX && peak - y > SWIPE_DISTANCE_PX && visitAge() > MIN_VISIT_FOR_SWIPE_MS) {
        show('swipe_up');
      }
    };

    // Any device: they went to another tab or app (or pressed home) and came
    // back. Skipped if they had started typing in a form: they were likely
    // looking something up to finish it.
    const onVisibility = () => {
      if (document.visibilityState === 'hidden') {
        hiddenAt = visitAge() >= MIN_VISIT_MS && !formStarted ? Date.now() : 0;
      } else {
        if (hiddenAt && Date.now() - hiddenAt >= MIN_AWAY_MS) show('came_back');
        hiddenAt = 0;
      }
    };

    // Called, texted, emailed or opened the chat: no popup for this visit.
    // Clicks inside the chat widget's shadow DOM reach the document with the
    // <chat-widget> host as their target.
    const onClick = e => {
      if (!(e.target instanceof Element)) return;
      if (e.target.closest('a[href^="tel:"], a[href^="sms:"], a[href^="mailto:"], chat-widget')) {
        fired = true;
        writeStore('sessionStorage', SEEN_KEY, '1');
      }
    };
    const onFocusIn = e => {
      if (e.target instanceof Element && e.target.matches('input, select, textarea')) formStarted = true;
    };

    const isPhone = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    document.addEventListener('mouseout', onMouseOut);
    document.addEventListener('visibilitychange', onVisibility);
    document.addEventListener('click', onClick, true);
    document.addEventListener('focusin', onFocusIn);
    if (isPhone) {
      window.addEventListener('touchmove', onTouchMove, { passive: true });
      window.addEventListener('scroll', onScroll, { passive: true });
    }
    return () => {
      document.removeEventListener('mouseout', onMouseOut);
      document.removeEventListener('visibilitychange', onVisibility);
      document.removeEventListener('click', onClick, true);
      document.removeEventListener('focusin', onFocusIn);
      window.removeEventListener('touchmove', onTouchMove);
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
