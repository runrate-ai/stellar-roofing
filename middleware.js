import { NextResponse } from 'next/server';
import { DEFAULT_FUNNEL_SLUG } from './lib/funnels';
import { FUNNEL_SUBDOMAIN } from './lib/funnel-host';

// Maps the paid-traffic subdomain onto the funnel route tree, one path per
// Google Ads ad group:
//   get.thestellarroofing.com/                    → /lp/nashville-roofing
//   get.thestellarroofing.com/roof-repair         → /lp/roof-repair
//   get.thestellarroofing.com/storm-damage        → /lp/storm-damage
//   get.thestellarroofing.com/roof-repair/thank-you → /lp/roof-repair/thank-you
//
// The visitor's URL bar keeps showing the subdomain — this is a rewrite, not a
// redirect, so ad destination URLs and gclid query params survive intact.
//
// The subdomain itself is defined in lib/funnel-host.js, shared with
// SiteChrome so the rewrite and the chrome-stripping can't drift apart.
const FUNNEL_ROOT = '/lp';

export function middleware(request) {
  const host = request.headers.get('host') || '';
  if (!host.startsWith(FUNNEL_SUBDOMAIN)) return NextResponse.next();

  const { pathname } = request.nextUrl;

  // Already-rewritten paths and API calls pass through untouched. Without the
  // /api exemption a form POST would be rewritten into a route that doesn't
  // exist.
  if (pathname.startsWith('/api') || pathname.startsWith(FUNNEL_ROOT)) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();

  if (pathname === '/') {
    url.pathname = `${FUNNEL_ROOT}/${DEFAULT_FUNNEL_SLUG}`;
  } else if (pathname === '/thank-you') {
    // Bare /thank-you is the natural post-submit URL and the one configured in
    // GHL. Without this it would rewrite to /lp/thank-you, which doesn't exist
    // — the thank-you pages live under a slug.
    url.pathname = `${FUNNEL_ROOT}/${DEFAULT_FUNNEL_SLUG}/thank-you`;
  } else {
    url.pathname = `${FUNNEL_ROOT}${pathname}`;
  }

  return NextResponse.rewrite(url);
}

export const config = {
  // Skip Next internals and static assets so images and JS still resolve from
  // the subdomain.
  matcher: ['/((?!_next/static|_next/image|images/|favicon.ico|icon.png|robots.txt|sitemap.xml).*)'],
};
