import Link from 'next/link';
import { Phone, Mail, Clock, MapPin } from 'lucide-react';
import Breadcrumbs from '../../components/Breadcrumbs';
import GHLForm from '../../components/GHLForm';
import SchemaMarkup from '../../components/SchemaMarkup';
import { localBusinessSchema } from '../../lib/schema';
import config from '../../lib/config';

export const metadata = {
  title: "Contact Stellar Roofing | Nashville TN & Boise ID | Free Estimates",
  description: "Contact Stellar Roofing & Restorations. Nashville: (629) 277-4249 | Boise: (208) 370-8599. Free roof estimates, no obligation.",
  alternates: { canonical: 'https://thestellarroofing.com/contact' },
};

const nashville = config.locations.nashville;
const boise = config.locations.boise;

export default function ContactPage() {
  const lbSchema = localBusinessSchema();

  return (
    <>
      <SchemaMarkup schema={lbSchema} />

      <Breadcrumbs items={[
        { name: "Home", path: "/" },
        { name: "Contact", path: "/contact" },
      ]} />

      {/* HERO */}
      <section className="bg-primary py-14 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Contact Stellar Roofing &amp; Restorations</h1>
          <p className="text-white/80 text-xl">Two locations. One standard of service.</p>
        </div>
      </section>

      {/* TWO LOCATION CONTACTS */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Nashville */}
            <div className="bg-bg-alt rounded-2xl p-8">
              <div className="flex items-center gap-2 mb-6">
                <MapPin size={22} className="text-primary" />
                <h2 className="text-2xl font-bold text-primary">Nashville, TN</h2>
              </div>
              <p className="text-text-muted text-sm mb-6">Serving Middle Tennessee — Nashville, Clarksville, Franklin, Murfreesboro, Brentwood, and surrounding areas.</p>

              <a href={`tel:${nashville.phoneRaw}`} className="flex items-center gap-3 mb-4 group">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="text-white" size={18} />
                </div>
                <span className="text-xl font-extrabold text-primary group-hover:text-primary-light transition-colors">{nashville.phone}</span>
              </a>
              <a href={`mailto:${nashville.email}`} className="flex items-center gap-3 mb-6 group">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="text-primary" size={18} />
                </div>
                <span className="text-sm font-semibold text-text-muted group-hover:text-primary transition-colors">{nashville.email}</span>
              </a>
              <div className="flex gap-3">
                <Link href="/nashville" className="flex-1 text-center bg-primary hover:bg-primary-light text-white font-bold py-3 rounded-lg transition-colors text-sm">Nashville Hub</Link>
                <Link href="/nashville/service-areas/nashville" className="flex-1 text-center border border-primary text-primary hover:bg-primary hover:text-white font-bold py-3 rounded-lg transition-colors text-sm">Service Areas</Link>
              </div>
            </div>

            {/* Boise */}
            <div className="bg-bg-alt rounded-2xl p-8">
              <div className="flex items-center gap-2 mb-6">
                <MapPin size={22} className="text-primary" />
                <h2 className="text-2xl font-bold text-primary">Boise, ID</h2>
              </div>
              <p className="text-text-muted text-sm mb-6">Serving the Treasure Valley — Boise, Meridian, Nampa, Eagle, Caldwell, and surrounding areas.</p>

              <a href={`tel:${boise.phoneRaw}`} className="flex items-center gap-3 mb-4 group">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="text-white" size={18} />
                </div>
                <span className="text-xl font-extrabold text-primary group-hover:text-primary-light transition-colors">{boise.phone}</span>
              </a>
              <a href={`mailto:${boise.email}`} className="flex items-center gap-3 mb-6 group">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="text-primary" size={18} />
                </div>
                <span className="text-sm font-semibold text-text-muted group-hover:text-primary transition-colors">{boise.email}</span>
              </a>
              <div className="flex gap-3">
                <Link href="/boise" className="flex-1 text-center bg-primary hover:bg-primary-light text-white font-bold py-3 rounded-lg transition-colors text-sm">Boise Hub</Link>
                <Link href="/boise/service-areas/boise" className="flex-1 text-center border border-primary text-primary hover:bg-primary hover:text-white font-bold py-3 rounded-lg transition-colors text-sm">Service Areas</Link>
              </div>
            </div>
          </div>

          {/* HOURS + FORM */}
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-primary mb-6">Business Hours</h2>
              <div className="bg-bg-alt rounded-2xl p-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Clock className="text-primary" size={18} />
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex gap-6">
                      <span className="font-medium text-text-dark w-28">Mon – Fri</span>
                      <span className="text-text-muted">{config.business.hours.weekdays}</span>
                    </div>
                    <div className="flex gap-6">
                      <span className="font-medium text-text-dark w-28">Saturday</span>
                      <span className="text-text-muted">{config.business.hours.saturday}</span>
                    </div>
                    <div className="flex gap-6">
                      <span className="font-medium text-text-dark w-28">Sunday</span>
                      <span className="text-text-muted">{config.business.hours.sunday}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <GHLForm type="contact" title="Send Us a Message" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
