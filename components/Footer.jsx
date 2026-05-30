'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Phone, Mail, MapPin } from 'lucide-react';
import config from '../lib/config';

const nashville = config.locations.nashville;
const boise = config.locations.boise;

export default function Footer() {
  const pathname = usePathname();
  const year = new Date().getFullYear();

  const isNashville = pathname?.startsWith('/nashville');
  const isBoise = pathname?.startsWith('/boise');
  const locationSlug = isNashville ? 'nashville' : isBoise ? 'boise' : null;
  const location = locationSlug ? config.locations[locationSlug] : null;
  const locationPrefix = locationSlug ? `/${locationSlug}` : '';

  // Brand/generic pages (homepage, about, contact) get a two-location layout
  if (!locationSlug) {
    return (
      <footer className="bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

            {/* Col 1: Logo + both phones */}
            <div>
              <Image src="/images/logo.png" alt="Stellar Roofing & Restorations" width={200} height={67} className="w-[200px] h-auto mb-4" />
              <p className="text-white/70 text-sm mb-5">{config.business.tagline}</p>

              <p className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-2">Nashville, TN</p>
              <a href={`tel:${nashville.phoneRaw}`} className="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm font-medium mb-4">
                <Phone size={14} /> {nashville.phone}
              </a>

              <p className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-2">Boise, ID</p>
              <a href={`tel:${boise.phoneRaw}`} className="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm font-medium mb-4">
                <Phone size={14} /> {boise.phone}
              </a>

              <a href={`mailto:${config.business.email}`} className="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm font-medium">
                <Mail size={14} /> {config.business.email}
              </a>
            </div>

            {/* Col 2: Nashville areas */}
            <div>
              <Link href="/nashville" className="flex items-center gap-2 font-semibold text-white mb-1 text-sm uppercase tracking-wider hover:text-white/80 transition-colors">
                <MapPin size={14} /> Nashville, TN
              </Link>
              <p className="text-white/50 text-xs mb-4">Middle Tennessee</p>
              <ul className="space-y-2">
                {nashville.serviceAreas.map(a => (
                  <li key={a.slug}>
                    <Link href={`/nashville/service-areas/${a.slug}`} className="text-white/70 hover:text-white text-sm transition-colors">{a.city}, {a.state}</Link>
                  </li>
                ))}
                {nashville.expansionAreas.map((a, i) => (
                  <li key={i}>
                    <span className="text-white/40 text-sm">{a.city}, {a.state}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Boise areas */}
            <div>
              <Link href="/boise" className="flex items-center gap-2 font-semibold text-white mb-1 text-sm uppercase tracking-wider hover:text-white/80 transition-colors">
                <MapPin size={14} /> Boise, ID
              </Link>
              <p className="text-white/50 text-xs mb-4">Treasure Valley</p>
              <ul className="space-y-2">
                {boise.serviceAreas.map(a => (
                  <li key={a.slug}>
                    <Link href={`/boise/service-areas/${a.slug}`} className="text-white/70 hover:text-white text-sm transition-colors">{a.city}, {a.state}</Link>
                  </li>
                ))}
                {boise.expansionAreas.map((a, i) => (
                  <li key={i}>
                    <span className="text-white/40 text-sm">{a.city}, {a.state}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4: Company */}
            <div>
              <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Company</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-white/70 hover:text-white text-sm transition-colors">About Us</Link></li>
                <li><Link href="/contact" className="text-white/70 hover:text-white text-sm transition-colors">Contact</Link></li>
                <li><Link href="/free-inspection" className="text-white/70 hover:text-white text-sm transition-colors">Free Inspection</Link></li>
                <li><Link href="/nashville" className="text-white/70 hover:text-white text-sm transition-colors">Nashville Location</Link></li>
                <li><Link href="/boise" className="text-white/70 hover:text-white text-sm transition-colors">Boise Location</Link></li>
                <li><Link href="/privacy-policy" className="text-white/70 hover:text-white text-sm transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms-and-conditions" className="text-white/70 hover:text-white text-sm transition-colors">Terms &amp; Conditions</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center text-white/50 text-sm">
            &copy; {year} {config.business.legalName}. All Rights Reserved. | Nashville, TN &amp; Boise, ID
          </div>
        </div>
      </footer>
    );
  }

  // Location-specific footer (Nashville or Boise section)
  const phone = location.phone;
  const phoneRaw = location.phoneRaw;
  const email = location.email;
  const serviceAreas = location.serviceAreas;
  const expansionAreas = location.expansionAreas;

  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: Logo + info */}
          <div>
            <Image src="/images/logo.png" alt="Stellar Roofing & Restorations" width={200} height={67} className="w-[200px] h-auto mb-4" />
            <p className="text-white/70 text-sm mb-4">{config.business.tagline}</p>
            <a href={`tel:${phoneRaw}`} className="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm font-medium mb-2">
              <Phone size={15} /> {phone}
            </a>
            <a href={`mailto:${email}`} className="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm font-medium mb-4">
              <Mail size={15} /> {email}
            </a>
            {locationSlug === 'nashville' && location.mapEmbed && (
              <iframe
                src={location.mapEmbed}
                width="100%"
                height="200"
                style={{ border: 0 }}
                className="rounded-xl shadow-inner mt-4"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Stellar Roofing & Restoration — Nashville, TN"
              />
            )}
          </div>

          {/* Col 2: Services */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Services</h3>
            <ul className="space-y-2">
              {config.services.map(s => (
                <li key={s.slug}>
                  <Link href={`${locationPrefix}/services/${s.slug}`} className="text-white/70 hover:text-white text-sm transition-colors">{s.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Service Areas */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Service Areas</h3>
            <ul className="space-y-2">
              {serviceAreas.map(a => (
                <li key={a.slug}>
                  <Link href={`${locationPrefix}/service-areas/${a.slug}`} className="text-white/70 hover:text-white text-sm transition-colors">{a.city}, {a.state}</Link>
                </li>
              ))}
              {expansionAreas.map((a, i) => (
                <li key={i}>
                  <span className="text-white/50 text-sm">{a.city}, {a.state}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Company */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-white/70 hover:text-white text-sm transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-white/70 hover:text-white text-sm transition-colors">Contact</Link></li>
              <li><Link href="/free-inspection" className="text-white/70 hover:text-white text-sm transition-colors">Free Inspection</Link></li>
              <li>
                <Link href={locationSlug === 'nashville' ? '/boise' : '/nashville'} className="text-white/70 hover:text-white text-sm transition-colors">
                  {locationSlug === 'nashville' ? 'Boise, ID Location' : 'Nashville, TN Location'}
                </Link>
              </li>
              <li><Link href="/privacy-policy" className="text-white/70 hover:text-white text-sm transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-and-conditions" className="text-white/70 hover:text-white text-sm transition-colors">Terms &amp; Conditions</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center text-white/50 text-sm">
          &copy; {year} {config.business.legalName}. All Rights Reserved. | {location.city}, {location.state}
        </div>
      </div>
    </footer>
  );
}
