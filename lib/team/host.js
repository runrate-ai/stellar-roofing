// The private timesheet lives on its own subdomain. Shared by middleware and
// the site-wide trackers so none of them run on staff pages.
export const TEAM_SUBDOMAIN = 'team.';
export const TEAM_URL = 'https://team.thestellarroofing.com';

export function isTeamHostname(hostname) {
  return Boolean(hostname) && hostname.startsWith(TEAM_SUBDOMAIN);
}

export function isTeamPage(location) {
  return isTeamHostname(location.hostname) || /^\/team(\/|$)/.test(location.pathname);
}
