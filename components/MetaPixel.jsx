'use client';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Script from 'next/script';
import config from '../lib/config';

// Meta Pixel for the "Stellar Roofing || Owned" dataset (Stellar's own, not the
// agency's). It loads only on the live domains, so local development never
// sends test traffic into the ads data. The base code sends the first
// PageView; later client-side page changes send their own.
// Lead and Contact events are sent from components/funnel/tracking.js.
const LIVE_HOSTS = ['thestellarroofing.com', 'www.thestellarroofing.com', 'get.thestellarroofing.com'];

export default function MetaPixel() {
  const id = config.analytics.metaPixelId;
  const pathname = usePathname();
  const firstPage = useRef(true);
  const [live, setLive] = useState(false);

  useEffect(() => {
    setLive(LIVE_HOSTS.includes(window.location.hostname));
  }, []);

  useEffect(() => {
    if (firstPage.current) {
      firstPage.current = false;
      return;
    }
    if (window.fbq) window.fbq('track', 'PageView');
  }, [pathname]);

  if (!live || !id) return null;
  return (
    <Script
      id="meta-pixel"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${id}');fbq('track','PageView');`,
      }}
    />
  );
}
