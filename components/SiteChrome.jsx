'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Script from 'next/script';
import Navbar from './Navbar';
import Footer from './Footer';
import MobileCTABar from './MobileCTABar';
import { isFunnelHostname } from '../lib/funnel-host';
import { pushDataLayer } from './funnel/tracking';

// Paid-traffic funnel routes render without site chrome: no nav, no footer,
// no Roofle slideout. Every exit path competes with the form, and the Roofle
// widget in particular pulls the visitor into a second, unrelated quote flow.
const FUNNEL_PREFIX = '/lp';

function useIsFunnel() {
  const pathname = usePathname();

  // Path check covers server rendering and direct /lp/* visits on the main
  // domain. On the funnel subdomain the middleware rewrite is invisible to the
  // browser, so after hydration usePathname() returns '/' rather than
  // '/lp/...'. Without the hostname check the chrome reappears on the client.
  if (pathname?.startsWith(FUNNEL_PREFIX)) return true;
  if (typeof window !== 'undefined' && isFunnelHostname(window.location.hostname)) return true;
  return false;
}

export function SiteHeader() {
  return useIsFunnel() ? null : <Navbar />;
}

export function SiteFooter() {
  return useIsFunnel() ? null : <Footer />;
}

export function SiteMobileCTA() {
  return useIsFunnel() ? null : <MobileCTABar />;
}

export function RoofleWidget() {
  if (useIsFunnel()) return null;
  return (
    <Script
      src="https://app.roofle.com/roof-quote-pro-widget.js?id=kHakVBq6LcM_PE_-7mzom"
      strategy="afterInteractive"
    />
  );
}

// Reports every tap on a tel: link on the main site to GTM as
// phone_call_click. Funnel pages report their own taps (CallLink), so this
// listener stays off there.
export function PhoneClickTracker() {
  const isFunnel = useIsFunnel();
  const pathname = usePathname();

  useEffect(() => {
    if (isFunnel) return undefined;
    const onClick = event => {
      const link = event.target.closest?.('a[href^="tel:"]');
      if (!link) return;
      pushDataLayer('phone_call_click', {
        lead_source: 'website',
        click_location: window.location.pathname,
        phone_number: link.getAttribute('href').replace('tel:', ''),
      });
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [isFunnel, pathname]);

  return null;
}
