import Image from 'next/image';
import { BadgeCheck, Shield, MapPin, Star, FileCheck, SearchCheck } from 'lucide-react';
import { activeBadges, googleRating } from '../../lib/funnel-trust';

const ICONS = { BadgeCheck, Shield, MapPin, FileCheck, SearchCheck };

// Compact credibility strip for the hero — sits directly under the H1 so it
// lands above the fold on mobile, where the full trust bar further down the
// page is never seen by most visitors.
export default function TrustRow({ className = '' }) {
  const imageBadges = activeBadges.filter(b => b.type === 'image');
  const iconBadges = activeBadges.filter(b => b.type === 'icon');

  return (
    <div className={`flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-3 ${className}`}>
      {imageBadges.map(badge => (
        <Image
          key={badge.id}
          src={badge.src}
          alt={badge.alt}
          width={badge.width}
          height={badge.height}
          className="h-12 w-auto"
        />
      ))}

      {googleRating.enabled && googleRating.rating && (
        <span className="inline-flex items-center gap-1.5">
          <span className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={15} className="text-cta-hover" fill="currentColor" />
            ))}
          </span>
          <span className="text-primary font-bold text-sm">
            {googleRating.rating}
          </span>
          <span className="text-text-muted text-sm">
            ({googleRating.reviewCount} Google reviews)
          </span>
        </span>
      )}

      {iconBadges.map(badge => {
        const Icon = ICONS[badge.icon] || BadgeCheck;
        return (
          <span key={badge.id} className="inline-flex items-center gap-1.5">
            <Icon size={17} className="text-primary flex-shrink-0" />
            <span className="text-text-dark font-semibold text-sm">{badge.label}</span>
          </span>
        );
      })}
    </div>
  );
}
