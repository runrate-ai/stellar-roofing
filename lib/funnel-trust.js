// Trust signals for the PPC funnel.
//
// Everything here is OFF by default and turns on only once the real asset or
// credential is in place. Paid-traffic pages are held to advertising-claim
// standards: an unearned certification badge or an invented project photo is a
// deceptive claim, not a placeholder.

import config from './config';

export const trustBadges = [
  {
    id: 'owens-corning',
    // ── TURN ON: drop the badge PNG at the `src` path below, then set true.
    enabled: false,
    type: 'image',
    src: '/images/badges/owens-corning-preferred.png',
    alt: 'Owens Corning Preferred Contractor',
    label: 'Owens Corning Preferred Contractor',
    width: 132,
    height: 66,
  },
  // These three are already claimed across the live site, so they're safe to show.
  { id: 'licensed', enabled: true, type: 'icon', icon: 'BadgeCheck', label: 'Licensed & Insured' },
  { id: 'warranty', enabled: true, type: 'icon', icon: 'Shield', label: 'Lifetime Warranty' },
  {
    id: 'local',
    enabled: true,
    type: 'icon',
    icon: 'MapPin',
    label: `Locally Owned Since ${config.business.yearFounded}`,
  },
];

// ── TURN ON: fill in the real numbers from the Google Business Profile, set true.
export const googleRating = {
  enabled: false,
  rating: null,        // e.g. 4.9
  reviewCount: null,   // e.g. 47
  profileUrl: '',
};

// ── TURN ON: add real completed-job photos. The gallery section stays hidden
// while this array is empty.
//
// Drop files in public/images/projects/ and add an entry:
//   {
//     src: '/images/projects/brentwood-replacement.jpg',
//     alt: 'New architectural shingle roof on a Brentwood home',
//     city: 'Brentwood, TN',
//     service: 'Roof Replacement',
//   }
//
// Use real jobs only — city and service must match the actual work.
export const projectPhotos = [];

export const hasProjectPhotos = projectPhotos.length > 0;
export const activeBadges = trustBadges.filter(b => b.enabled);
