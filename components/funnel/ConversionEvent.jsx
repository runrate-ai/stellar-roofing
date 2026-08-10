'use client';
import { useEffect } from 'react';

// The lead form is a cross-origin iframe, so GTM cannot observe its submit
// event. The thank-you page is therefore the conversion signal: point the GHL
// form's post-submit redirect at /<slug>/thank-you and this fires on load.
//
// In GTM, trigger the Google Ads conversion tag on the `generate_lead` event.
// `funnel_slug` and `funnel_ad_group` let you break conversions down per ad
// group instead of only seeing a campaign-level total.
export default function ConversionEvent({ slug, adGroup }) {
  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'generate_lead',
      funnel_slug: slug,
      funnel_ad_group: adGroup,
    });
  }, [slug, adGroup]);

  return null;
}
