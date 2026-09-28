'use client';
import { pushDataLayer } from './tracking';

// A tel: link that reports the tap to GTM as phone_call_click, so calls from
// the funnel can count as Google Ads conversions.
export default function CallLink({ phoneRaw, funnelSlug, location, className, children }) {
  return (
    <a
      href={`tel:${phoneRaw}`}
      className={className}
      onClick={() => pushDataLayer('phone_call_click', { funnel_slug: funnelSlug, click_location: location })}
    >
      {children}
    </a>
  );
}
