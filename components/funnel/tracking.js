import posthog from 'posthog-js';

// dataLayer helpers for the PPC funnel. GTM listens for these events:
//   funnel_form_start / funnel_form_step / funnel_form_error: form engagement
//   phone_call_click: a tap on any call button (use as a Google Ads conversion)
//   generate_lead: fired by the thank-you page (the lead conversion)
// The same events also go to PostHog, so its funnel reports line up with GTM.
// Some also go to the Meta Pixel, for audiences (see brain/TRACKING-PLAN.md).

export function pushDataLayer(event, data = {}) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...data });
  if (posthog.__loaded) posthog.capture(event, data);
  // A tap on a call button is a Meta "Contact" event.
  if (event === 'phone_call_click') metaTrack('Contact', { content_name: data.click_location || data.funnel_slug || 'call' });
  // Custom Meta events for audiences: started a form, played the promo video.
  if (event === 'funnel_form_start') metaTrack('FormStart', { content_name: data.funnel_slug || data.lead_source || 'form' }, undefined, 'trackCustom');
  if (event === 'promo_video_play') metaTrack('VideoPlay', { content_name: data.click_location || 'promo' }, undefined, 'trackCustom');
}

// Sends a Meta Pixel event ('track' for standard events, 'trackCustom' for
// our own). The pixel only loads on the live site (components/MetaPixel.jsx),
// and it can finish loading after a page's own effects run, so this waits up
// to ~5 seconds for it. Boise pages are skipped: the Meta ads and this pixel
// are for Nashville / Middle TN only.
export function metaTrack(event, params = {}, options, method = 'track') {
  if (typeof window === 'undefined') return;
  if (window.location.pathname.startsWith('/boise')) return;
  let tries = 0;
  const send = () => {
    if (window.fbq) {
      if (options) window.fbq(method, event, params, options);
      else window.fbq(method, event, params);
    } else if (++tries < 20) {
      setTimeout(send, 250);
    }
  };
  send();
}
