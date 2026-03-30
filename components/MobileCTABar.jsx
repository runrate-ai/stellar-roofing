'use client';
import Link from 'next/link';
import { Phone } from 'lucide-react';
import config from '../lib/config';

export default function MobileCTABar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex lg:hidden bg-white border-t border-gray-200 shadow-lg">
      <a
        href={`tel:${config.business.phoneRaw}`}
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
