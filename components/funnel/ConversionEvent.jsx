'use client';
import { useEffect } from 'react';
import posthog from 'posthog-js';
import { metaTrack } from './tracking';

// The thank-you page is the conversion signal: the funnel form redirects here
// only after GHL accepts the lead, and this fires once on load.
//
// In GTM, trigger the Google Ads conversion tag on the `generate_lead` event.
// `funnel_slug` and `funnel_ad_group` let you break conversions down per ad
// group instead of only seeing a campaign-level total.
export default function ConversionEvent({ slug, adGroup }) {
  useEffect(() => {
    const data = { funnel_slug: slug, funnel_ad_group: adGroup };
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'generate_lead', ...data });
    // Meta "Lead" for Nashville leads (the Meta ads are Nashville only), once per page load.
    // The form saved the lead's event id; the server sent the same id to Meta,
    // so the two copies are deduplicated.
    if (slug !== 'website-boise' && window.__metaLeadFor !== window.location.href) {
      window.__metaLeadFor = window.location.href;
      let eventID = null;
      try {
        eventID = window.sessionStorage.getItem('metaLeadEventId');
        window.sessionStorage.removeItem('metaLeadEventId');
      } catch {}
      metaTrack('Lead', { content_name: slug, content_category: adGroup }, eventID ? { eventID } : undefined);
    }
    // PostHog starts in the root layout's effect, which runs after this one,
    // so wait for it before sending the lead event.
    const timer = setTimeout(() => {
      if (posthog.__loaded) posthog.capture('generate_lead', data);
    }, 1500);
    return () => clearTimeout(timer);
  }, [slug, adGroup]);

  return null;
}
