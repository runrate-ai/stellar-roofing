import Image from 'next/image';
import { Phone, Mail } from 'lucide-react';
import config from '../../lib/config';

const nashville = config.locations.nashville;

// Legal + contact only. Google Ads policy requires reachable privacy/terms and
// clear business identity on a landing page; it does not require site nav.
export default function FunnelFooter({ offerFinePrint }) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <Image
              src="/images/logo.png"
              alt={config.business.name}
              width={200}
              height={67}
              className="w-[170px] h-auto mb-3"
            />
            <p className="text-white/70 text-sm">{config.business.tagline}</p>
            <p className="text-white/50 text-xs mt-1">
              Serving Nashville &amp; Middle Tennessee · Licensed &amp; Insured
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <a href={`tel:${nashville.phoneRaw}`} className="flex items-center gap-2 text-white font-bold hover:text-white/80 transition-colors">
              <Phone size={16} fill="currentColor" /> {nashville.phone}
            </a>
            <a href={`mailto:${config.business.email}`} className="flex items-center gap-2 text-white/80 text-sm hover:text-white transition-colors">
              <Mail size={15} /> {config.business.email}
            </a>
          </div>
        </div>

        {offerFinePrint && (
          <p className="mt-8 text-white/45 text-xs leading-relaxed max-w-3xl">
            {offerFinePrint}
          </p>
        )}

        <div className="mt-6 pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-white/50 text-xs">
            © {year} {config.business.legalName}. All rights reserved.
          </p>
          <div className="flex gap-5">
            <a href="https://thestellarroofing.com/privacy-policy" className="text-white/50 hover:text-white text-xs transition-colors">
              Privacy Policy
            </a>
            <a href="https://thestellarroofing.com/terms-and-conditions" className="text-white/50 hover:text-white text-xs transition-colors">
              Terms &amp; Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
