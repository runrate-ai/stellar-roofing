import Image from 'next/image';
import { Phone } from 'lucide-react';
import config from '../../lib/config';
import CallLink from './CallLink';

const nashville = config.locations.nashville;

// Deliberately not a <nav>. The only outbound action is the phone number —
// every other link would be a leak on paid traffic.
export default function FunnelHeader({ funnelSlug }) {
  return (
    <header className="sticky top-0 z-50 bg-primary shadow-lg">
      <div className="max-w-6xl mx-auto px-4 h-[72px] md:h-[84px] flex items-center justify-between">
        <Image
          src="/images/logo.png"
          alt={config.business.name}
          width={240}
          height={80}
          priority
          className="w-auto h-[56px] md:h-[66px]"
        />

        <div className="flex items-center gap-3">
          <div className="hidden sm:block text-right leading-tight">
            <p className="text-white/60 text-[11px] font-semibold uppercase tracking-wider">
              Call for fastest service
            </p>
            <CallLink phoneRaw={nashville.phoneRaw} funnelSlug={funnelSlug} location="header" className="text-white font-extrabold text-lg hover:text-white/80 transition-colors">
              {nashville.phone}
            </CallLink>
          </div>
          <CallLink
            phoneRaw={nashville.phoneRaw}
            funnelSlug={funnelSlug}
            location="header"
            className="sm:hidden flex items-center gap-2 bg-cta hover:bg-cta-hover text-primary font-bold px-4 py-2.5 rounded-lg transition-colors"
          >
            <Phone size={16} fill="currentColor" /> Call Now
          </CallLink>
        </div>
      </div>
    </header>
  );
}
