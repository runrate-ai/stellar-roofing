// dataLayer helpers for the PPC funnel. GTM listens for these events:
//   funnel_form_start / funnel_form_step / funnel_form_error: form engagement
//   phone_call_click: a tap on any call button (use as a Google Ads conversion)
//   generate_lead: fired by the thank-you page (the lead conversion)

export function pushDataLayer(event, data = {}) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...data });
}
