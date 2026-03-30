import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail } from 'lucide-react';
import config from '../lib/config';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: Logo + info */}
          <div>
            <Image src="/images/logo.png" alt="Stellar Roofing & Restorations" width={200} height={67} className="w-[200px] h-auto mb-4" />
            <p className="text-white/70 text-sm mb-4">{config.business.tagline}</p>
            <a href={`tel:${config.business.phoneRaw}`} className="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm font-medium mb-2">
              <Phone size={15} /> {config.business.phone}
            </a>
            <a href={`mailto:${config.business.email}`} className="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm font-medium mb-4">
              <Mail size={15} /> {config.business.email}
            </a>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3221.444444444444!2d-86.7816!3d36.1627!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x886466516f351727%3A0x40707477240700!2sStellar%20Roofing%20%26%20Restorations!5e0!3m2!1sen!2sus!4v1711827000000!5m2!1sen!2sus"
              width="100%"
              height="200"
              style={{ border: 0 }}
              className="rounded-xl shadow-inner mt-4"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Stellar Roofing & Restorations - Google Business Profile"
            />
          </div>

          {/* Col 2: Services */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Services</h3>
            <ul className="space-y-2">
              {config.services.map(s => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="text-white/70 hover:text-white text-sm transition-colors">{s.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Service Areas */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Service Areas</h3>
            <ul className="space-y-2">
              {config.serviceAreas.mvp.map(a => (
                <li key={a.slug}>
                  <Link href={`/service-areas/${a.slug}`} className="text-white/70 hover:text-white text-sm transition-colors">{a.city}, {a.state}</Link>
                </li>
              ))}
              {config.serviceAreas.expansion.map(a => (
                <li key={a.slug}>
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
              <li><Link href="/blog" className="text-white/50 text-sm cursor-default">Blog</Link></li>
              <li><Link href="/gallery" className="text-white/50 text-sm cursor-default">Gallery</Link></li>
              <li><Link href="/financing" className="text-white/50 text-sm cursor-default">Financing</Link></li>
              <li><Link href="/privacy-policy" className="text-white/70 hover:text-white text-sm transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-and-conditions" className="text-white/70 hover:text-white text-sm transition-colors">Terms &amp; Conditions</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center text-white/50 text-sm">
          &copy; {year} {config.business.legalName}. All Rights Reserved. | Nashville, TN
        </div>
      </div>
    </footer>
  );
}
