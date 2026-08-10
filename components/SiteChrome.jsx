'use client';
import { usePathname } from 'next/navigation';
import Script from 'next/script';
import Navbar from './Navbar';
import Footer from './Footer';
import MobileCTABar from './MobileCTABar';
import { isFunnelHostname } from '../lib/funnel-host';

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
