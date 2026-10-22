'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';

// Goodlettsville Area Chamber of Commerce member widget (ChamberMaster, member 2789).
// The embed code came from the Chamber; it fills the div below once Member.js loads.
// The badge stays hidden until the widget actually renders something, so an inactive
// listing (ChamberMaster answers "member is not currently active") never shows an empty box.
const WIDGET_ID = 'mni-membership-639281118397098426';

function createWidget() {
  const el = document.getElementById(WIDGET_ID);
  if (!el || !window.MNI?.Widgets?.Member) return;
  el.innerHTML = ''; // avoid a duplicate badge when the page is revisited client-side
  new window.MNI.Widgets.Member(WIDGET_ID, {
    member: 2789,
    secure: true, // always use ChamberMaster's https endpoint (the http one is blocked on https pages)
    // Logo only: hide the member name and "Proud Member of" text and let the logo fill the card.
    styleTemplate:
      '#@id{text-align:center;position:relative;font-size:0;line-height:0}#@id .mn-widget-member-name{display:none}#@id > *:not(:has(img)){display:none}#@id a{display:block}#@id img,#@id .mn-widget-member-logo{display:block !important;width:100% !important;max-width:100% !important;height:auto !important;max-height:none !important;margin:0 auto !important}',
  }).create();
}

export default function ChamberBadge({ className = '' }) {
  const ref = useRef(null);
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const check = () => setFilled(el.textContent.trim().length > 0 || !!el.querySelector('img'));
    check();
    const observer = new MutationObserver(check);
    observer.observe(el, { childList: true, subtree: true, characterData: true });
    return () => observer.disconnect();
  }, []);

  return (
    <div className={filled ? `block ${className}` : 'hidden'}>
      <div className="inline-block w-[200px] max-w-full rounded-lg bg-white p-1.5 shadow-md">
        <div id={WIDGET_ID} ref={ref} />
      </div>
      <Script
        src="https://goodlettsvillechamber.chambermaster.com/Content/Script/Member.js"
        strategy="afterInteractive"
        onReady={createWidget}
      />
    </div>
  );
}
