'use client';
import Script from 'next/script';

// GHL booking calendar. form_embed.js (served from the same GHL domain as the
// widget) resizes the iframe to fit the calendar, so there's no inner scroll
// on phones; the min-height is the fallback until it runs.
export default function BookingEmbed({ src, title = 'Book your free roof inspection' }) {
  const id = src.split('/').pop();
  const origin = new URL(src).origin;
  return (
    <>
      <iframe
        src={src}
        id={`${id}_booking`}
        title={title}
        scrolling="no"
        className="w-full border-0 block min-h-[760px]"
        style={{ overflow: 'hidden' }}
      />
      <Script src={`${origin}/js/form_embed.js`} strategy="afterInteractive" />
    </>
  );
}
