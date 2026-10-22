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
    styleTemplate:
      '#@id{text-align:center;position:relative}#@id .mn-widget-member-name{font-weight:700}#@id .mn-widget-member-logo{max-width:100%;max-height:48px;width:auto}',
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
      <div className="inline-block bg-white text-primary text-[11px] leading-tight rounded-lg px-2.5 py-2 shadow-md max-w-[130px]">
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
