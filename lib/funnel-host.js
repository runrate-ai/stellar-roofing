// The subdomain that serves the PPC funnel.
//
// Shared by middleware.js (which rewrites the host to /lp routes) and
// SiteChrome (which strips site nav/footer/Roofle from funnel pages).
// Both must agree, so this lives in one place.
//
// ── To rename the subdomain: change this string, add the new domain in
//    Vercel, point the CNAME in GoDaddy, and redeploy.
export const FUNNEL_SUBDOMAIN = 'get.';

export function isFunnelHostname(hostname) {
  return Boolean(hostname) && hostname.startsWith(FUNNEL_SUBDOMAIN);
}
