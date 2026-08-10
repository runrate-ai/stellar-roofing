'use client';
import { useEffect, useState } from 'react';

const FORM_URL = 'https://roofing-quo-882c305e.vibepreview.com';

// Google Ads click IDs and UTMs live in the funnel's own URL. A cross-origin
// iframe can't read them, so they're forwarded as query params — the embedded
// form has to read them off its own URL and store them with the lead, or the
// attribution chain breaks here.
const PASSTHROUGH_PARAMS = [
  'gclid', 'wbraid', 'gbraid',
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
];

const FRAME_CLASS = 'w-full max-w-[560px] h-[900px] border-0 mx-auto block';

export default function EmbeddedForm({ id = 'quote-form', lazy = true }) {
  const [src, setSrc] = useState(null);

  useEffect(() => {
    const parentParams = new URLSearchParams(window.location.search);
    const forwarded = new URLSearchParams();
    PASSTHROUGH_PARAMS.forEach(key => {
      const value = parentParams.get(key);
      if (value) forwarded.set(key, value);
    });
    const query = forwarded.toString();
    setSrc(query ? `${FORM_URL}?${query}` : FORM_URL);
  }, []);

  return (
    <div id={id} className="scroll-mt-28">
      {src ? (
        <iframe
          src={src}
          title="Free Roofing Estimate"
          loading={lazy ? 'lazy' : 'eager'}
          className={FRAME_CLASS}
        />
      ) : (
        // Same footprint as the iframe so appending params costs no layout shift.
        <div className={`${FRAME_CLASS} rounded-2xl bg-white/60 animate-pulse`} aria-hidden="true" />
      )}

      <noscript>
        <iframe src={FORM_URL} title="Free Roofing Estimate" className={FRAME_CLASS} />
      </noscript>
    </div>
  );
}
