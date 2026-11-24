import { NextResponse } from 'next/server';
import { DEFAULT_FUNNEL_SLUG } from './lib/funnels';
import { FUNNEL_SUBDOMAIN } from './lib/funnel-host';
import { isTeamHostname, TEAM_URL } from './lib/team/host';

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

// team.thestellarroofing.com serves the private timesheet and nothing else.
function teamResponse(request) {
  const { pathname } = request.nextUrl;
  let response;
  if (pathname.startsWith('/api/team/')) {
    response = NextResponse.next();
  } else if (pathname.startsWith('/api')) {
    response = NextResponse.json({ error: 'Not found.' }, { status: 404 });
  } else if (pathname === '/') {
    const url = request.nextUrl.clone();
    url.pathname = '/team';
    response = NextResponse.rewrite(url);
  } else if (/^\/report\/[A-Za-z0-9_-]{32,}$/.test(pathname)) {
    // The private call report may only be framed by the GHL app.
    const url = request.nextUrl.clone();
    url.pathname = `/team${pathname}`;
    response = NextResponse.rewrite(url);
    response.headers.set('Content-Security-Policy', 'frame-ancestors https://app.gohighlevel.com https://app.runratedigital.com');
    response.headers.set('Referrer-Policy', 'no-referrer');
    response.headers.set('Cache-Control', 'no-store');
  } else {
    const proto = request.headers.get('x-forwarded-proto') || request.nextUrl.protocol.replace(':', '');
    response = NextResponse.redirect(`${proto}://${request.headers.get('host')}/`);
  }
  response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  return response;
}

export function middleware(request) {
  const host = request.headers.get('host') || '';
  const hostname = host.split(':')[0];
  if (isTeamHostname(hostname)) return teamResponse(request);

  // On the public domains the timesheet only exists at its own subdomain.
  if (hostname === 'thestellarroofing.com' || hostname.endsWith('.thestellarroofing.com')) {
    const path = request.nextUrl.pathname;
    if (path === '/team' || path.startsWith('/team/')) return NextResponse.redirect(`${TEAM_URL}/`, 308);
    if (path.startsWith('/api/team/')) return NextResponse.json({ error: 'Not found.' }, { status: 404 });
  }
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
