import Image from 'next/image';
import Link from 'next/link';
import { Phone } from 'lucide-react';
import { CheckCircle2, Shield, BadgeCheck, MapPin, Users } from 'lucide-react';
import Breadcrumbs from '../../components/Breadcrumbs';
import SchemaMarkup from '../../components/SchemaMarkup';
import { localBusinessSchema } from '../../lib/schema';
import config from '../../lib/config';

const nashville = config.locations.nashville;
const boise = config.locations.boise;

export const metadata = {
  title: "About Stellar Roofing & Restorations | Nashville TN & Boise ID",
  description: "Learn about Stellar Roofing & Restorations — serving Nashville, TN and Boise, ID. Led by owner Nate, we deliver honest service, quality craftsmanship, and lifetime warranties.",
  alternates: { canonical: 'https://thestellarroofing.com/about' },
};

export default function AboutPage() {
  const lbSchema = localBusinessSchema();

  return (
    <>
      <SchemaMarkup schema={lbSchema} />

      <Breadcrumbs items={[
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
      ]} />

      {/* HERO */}
      <section className="bg-primary py-20 px-4">
        <div className="max-w-4xl mx-auto text-center reveal">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">About Stellar Roofing &amp; Restorations</h1>
          <p className="text-white/80 text-xl md:text-2xl font-medium max-w-2xl mx-auto leading-relaxed">One company. Two markets. The same commitment to honest service and quality craftsmanship.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link href="/nashville" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
              <MapPin size={16} /> Nashville, TN
            </Link>
            <Link href="/boise" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
              <MapPin size={16} /> Boise, ID
            </Link>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="py-20 px-4 bg-white reveal">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="reveal reveal-delay-1">
              <p className="text-primary font-bold uppercase tracking-widest text-sm mb-3">Our Story</p>
              <h2 className="text-3xl md:text-5xl font-bold text-primary mb-8">Built on Doing Things Right</h2>
              <div className="space-y-6 text-text-muted leading-relaxed text-lg">
                <p>
                  Stellar Roofing &amp; Restorations is led by Nate, a roofing industry veteran who built this company on a straightforward principle: give every homeowner an honest assessment, do quality work, and stand behind it.
                </p>
                <p>
                  What started as a Nashville, Tennessee-based roofing company has grown to serve the Treasure Valley in Boise, Idaho — bringing the same professional approach, lifetime workmanship warranty, and no-pressure philosophy to both markets.
                </p>
                <p>
                  Founded in {config.business.yearFounded}, we've grown steadily by doing things the right way: honest inspections, fair prices, quality materials, and standing behind every project long after the crew has gone home.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 reveal reveal-delay-2">
              <div className="relative h-80 rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/crew-working.jpg"
                  alt="Stellar Roofing crew on the job"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-64 rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/crew-working-02.jpg"
                  alt="Stellar Roofing team on a roofing project"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TWO LOCATIONS */}
      <section className="py-16 px-4 bg-bg-alt reveal">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Two Markets, One Standard</h2>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">Whether you're in Middle Tennessee or the Treasure Valley, you get the same level of service.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <MapPin size={22} className="text-primary" />
                <h3 className="text-xl font-bold text-primary">Nashville, TN</h3>
              </div>
              <p className="text-text-muted text-sm leading-relaxed mb-4">Serving Davidson, Rutherford, Williamson, and Montgomery Counties throughout Middle Tennessee.</p>
              <a href={`tel:${nashville.phoneRaw}`} className="flex items-center gap-2 text-primary font-bold hover:text-primary-light transition-colors text-sm mb-4">
                <Phone size={14} /> {nashville.phone}
              </a>
              <Link href="/nashville" className="inline-block text-sm font-semibold text-primary border border-primary hover:bg-primary hover:text-white px-4 py-2 rounded-lg transition-colors">
                View Nashville →
              </Link>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <MapPin size={22} className="text-primary" />
                <h3 className="text-xl font-bold text-primary">Boise, ID</h3>
              </div>
              <p className="text-text-muted text-sm leading-relaxed mb-4">Serving Boise, Meridian, Nampa, Eagle, and Caldwell throughout Ada and Canyon Counties.</p>
              <a href={`tel:${boise.phoneRaw}`} className="flex items-center gap-2 text-primary font-bold hover:text-primary-light transition-colors text-sm mb-4">
                <Phone size={14} /> {boise.phone}
              </a>
              <Link href="/boise" className="inline-block text-sm font-semibold text-primary border border-primary hover:bg-primary hover:text-white px-4 py-2 rounded-lg transition-colors">
                View Boise →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* COMPANY VALUES */}
      <section className="py-20 px-4 bg-white reveal">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-4">What Sets Us Apart</h2>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">We're not the biggest roofing company in either market. We're just the most committed to doing things right.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { Icon: Shield, title: "Lifetime Warranty", desc: "Every roof replacement we complete is backed by a lifetime workmanship warranty. If something goes wrong with our work, we'll make it right." },
              { Icon: BadgeCheck, title: "Licensed & Insured", desc: "Fully licensed and insured in both Tennessee and Idaho. You're protected, and so is our team. We never cut corners on compliance." },
              { Icon: MapPin, title: "Locally Operated", desc: "We're not a national franchise. We're a locally operated company with real people in both markets — Nashville and Boise." },
              { Icon: Users, title: "Honest Assessments", desc: "We tell you what your roof actually needs — even if that means telling you it's in great shape and doesn't need work right now." },
            ].map(({ Icon, title, desc }, i) => (
              <div key={title} className={`bg-bg-alt rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 text-center reveal reveal-delay-${i + 1}`}>
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Icon className="text-primary" size={32} />
                </div>
                <h3 className="text-xl font-bold text-primary mb-4">{title}</h3>
                <p className="text-text-muted text-base leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="bg-primary py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-white/80 text-lg mb-8">Free inspections, honest estimates, lifetime warranty. Choose your location and give us a call.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={`tel:${nashville.phoneRaw}`} className="flex items-center justify-center gap-2 bg-white hover:bg-white/90 text-primary font-bold px-8 py-4 rounded-lg transition-colors">
              <Phone size={18} /> Nashville: {nashville.phone}
            </a>
            <a href={`tel:${boise.phoneRaw}`} className="flex items-center justify-center gap-2 border-2 border-white text-white hover:bg-white hover:text-primary font-semibold px-8 py-4 rounded-lg transition-colors">
              <Phone size={18} /> Boise: {boise.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
