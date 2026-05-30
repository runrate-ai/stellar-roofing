'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone } from 'lucide-react';
import config from '../lib/config';

const nashville = config.locations.nashville;
const boise = config.locations.boise;

export default function MobileCTABar() {
  const pathname = usePathname();
  const isNashville = pathname?.startsWith('/nashville');
  const isBoise = pathname?.startsWith('/boise');
  const locationSlug = isNashville ? 'nashville' : isBoise ? 'boise' : null;
  const location = locationSlug ? config.locations[locationSlug] : null;

  // Generic pages — show both location numbers
  if (!locationSlug) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-50 flex lg:hidden bg-white border-t border-gray-200 shadow-lg">
        <a
          href={`tel:${nashville.phoneRaw}`}
          className="flex-1 flex flex-col items-center justify-center gap-0.5 bg-primary text-white font-semibold py-3"
        >
          <Phone size={14} />
          <span className="text-xs">Nashville</span>
        </a>
        <a
          href={`tel:${boise.phoneRaw}`}
          className="flex-1 flex flex-col items-center justify-center gap-0.5 bg-primary/80 text-white font-semibold py-3 border-l border-primary-light"
        >
          <Phone size={14} />
          <span className="text-xs">Boise</span>
        </a>
        <Link
          href="/free-inspection"
          className="flex-1 flex items-center justify-center bg-white text-primary font-semibold py-3 text-xs border-l border-gray-200"
        >
          Free Estimate
        </Link>
      </div>
    );
  }

  // Location-specific pages
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex lg:hidden bg-white border-t border-gray-200 shadow-lg">
      <a
        href={`tel:${location.phoneRaw}`}
        className="flex-1 flex items-center justify-center gap-2 bg-primary text-white font-semibold py-4 text-sm"
      >
        <Phone size={16} />
        Call Now
      </a>
      <Link
        href="/free-inspection"
        className="flex-1 flex items-center justify-center bg-white text-primary font-semibold py-4 text-sm border-l border-gray-200"
      >
        Free Estimate
      </Link>
    </div>
  );
}
