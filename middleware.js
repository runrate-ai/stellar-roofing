import { NextResponse } from 'next/server';

// Maps the paid-traffic subdomain onto the funnel route tree.
//   get.thestellarroofing.com/            → /lp/nashville-roofing
//   get.thestellarroofing.com/thank-you   → /lp/nashville-roofing/thank-you
// The visitor's URL bar keeps showing the subdomain — this is a rewrite, not a
// redirect, so ad destination URLs and gclid query params survive intact.
const FUNNEL_SUBDOMAIN = 'get.';
const FUNNEL_ROOT = '/lp/nashville-roofing';

export function middleware(request) {
  const host = request.headers.get('host') || '';
  if (!host.startsWith(FUNNEL_SUBDOMAIN)) return NextResponse.next();

  const { pathname } = request.nextUrl;

  // Already-rewritten paths and API calls pass through untouched. Without the
  // /api exemption the form's POST would be rewritten into a route that
  // doesn't exist.
  if (pathname.startsWith('/api') || pathname.startsWith(FUNNEL_ROOT)) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = pathname === '/' ? FUNNEL_ROOT : `${FUNNEL_ROOT}${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip Next internals and static assets so images and JS still resolve from
  // the subdomain.
  matcher: ['/((?!_next/static|_next/image|images/|favicon.ico|icon.png|robots.txt|sitemap.xml).*)'],
};
