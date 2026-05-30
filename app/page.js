import Image from 'next/image';
import Link from 'next/link';
import { Phone, Shield, SearchCheck, BadgeCheck, FileCheck, MapPin } from 'lucide-react';
import SchemaMarkup from '../components/SchemaMarkup';
import { localBusinessSchema } from '../lib/schema';
import config from '../lib/config';

export const metadata = {
  title: "Stellar Roofing & Restorations | Nashville TN & Boise ID",
  description: "Stellar Roofing & Restorations serves Nashville, TN and Boise, ID. Free inspections, lifetime warranty, licensed & insured. Call today for a free estimate.",
  alternates: { canonical: 'https://thestellarroofing.com' },
  openGraph: {
    title: "Stellar Roofing & Restorations | Nashville TN & Boise ID",
    description: "Trusted roofing company serving Nashville, TN and Boise, ID. Free inspections, lifetime warranty, residential & commercial.",
    url: 'https://thestellarroofing.com',
    images: [{ url: '/images/hero.jpg', width: 1200, height: 630, alt: 'Stellar Roofing & Restorations' }],
  },
};

const nashville = config.locations.nashville;
const boise = config.locations.boise;

export default function BrandHomePage() {
  const schema = localBusinessSchema();

  return (
    <>
      <SchemaMarkup schema={schema} />

      {/* HERO */}
      <section className="relative flex items-center justify-center" style={{ minHeight: 'calc(100vh - 44px)' }}>
        <Image
          src="/images/hero.jpg"
          alt="Stellar Roofing & Restorations"
          fill
          className="object-cover"
          priority
          quality={75}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <p className="text-white/80 font-semibold uppercase tracking-widest text-sm mb-4">Serving Two Markets</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
            Out of This World<br />Roofing
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-12 font-medium">
            Free Inspections&nbsp;&bull;&nbsp;Lifetime Warranty&nbsp;&bull;&nbsp;Licensed &amp; Insured
          </p>

          {/* LOCATION CARDS */}
          <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <Link
              href="/nashville"
              className="group bg-white/10 backdrop-blur-sm border-2 border-white/30 hover:bg-white hover:border-white rounded-2xl p-8 text-center transition-all duration-300 hover:shadow-2xl"
            >
              <MapPin size={32} className="text-white group-hover:text-primary mx-auto mb-3 transition-colors" />
              <div className="text-2xl font-extrabold text-white group-hover:text-primary transition-colors mb-1">Nashville, TN</div>
              <div className="text-white/80 group-hover:text-text-muted text-sm transition-colors mb-4">Middle Tennessee</div>
              <div className="text-white group-hover:text-primary font-bold text-sm transition-colors mb-4">
                {nashville.phone}
              </div>
              <div className="inline-flex items-center gap-1 text-white group-hover:text-primary font-bold text-sm transition-colors">
                View Nashville &rarr;
              </div>
            </Link>

            <Link
              href="/boise"
              className="group bg-white/10 backdrop-blur-sm border-2 border-white/30 hover:bg-white hover:border-white rounded-2xl p-8 text-center transition-all duration-300 hover:shadow-2xl"
            >
              <MapPin size={32} className="text-white group-hover:text-primary mx-auto mb-3 transition-colors" />
              <div className="text-2xl font-extrabold text-white group-hover:text-primary transition-colors mb-1">Boise, ID</div>
              <div className="text-white/80 group-hover:text-text-muted text-sm transition-colors mb-4">Treasure Valley</div>
              <div className="text-white group-hover:text-primary font-bold text-sm transition-colors mb-4">
                {boise.phone}
              </div>
              <div className="inline-flex items-center gap-1 text-white group-hover:text-primary font-bold text-sm transition-colors">
                View Boise &rarr;
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="bg-primary py-6 relative z-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { label: "Lifetime Warranty", Icon: Shield },
              { label: "Free Inspections", Icon: SearchCheck },
              { label: "Licensed & Insured", Icon: BadgeCheck },
              { label: "Insurance Claims Help", Icon: FileCheck },
            ].map(({ label, Icon }) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <Icon className="text-white" size={28} />
                <span className="text-white font-semibold text-sm md:text-base">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT / WHO WE ARE */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-primary font-bold uppercase tracking-widest text-sm mb-3">About Us</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-8">One Company. Two Markets. Same Standard.</h2>
              <p className="text-text-muted leading-relaxed text-lg mb-6">
                Stellar Roofing &amp; Restorations is led by Nate, a roofing industry veteran who built the company on a simple principle: do honest work, stand behind it, and treat every homeowner's roof like it's your own.
              </p>
              <p className="text-text-muted leading-relaxed text-lg mb-10">
                What started in Nashville, Tennessee has grown to serve the Treasure Valley in Idaho — bringing the same commitment to quality craftsmanship, transparent pricing, and dependable service to both markets.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/nashville" className="inline-flex items-center gap-2 bg-primary hover:bg-primary-light text-white font-bold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                  <MapPin size={18} /> Nashville, TN
                </Link>
                <Link href="/boise" className="inline-flex items-center gap-2 border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold px-8 py-4 rounded-lg transition-all duration-300">
                  <MapPin size={18} /> Boise, ID
                </Link>
              </div>
            </div>
            <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/crew-working.jpg"
                alt="Stellar Roofing crew working"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES OVERVIEW */}
      <section className="py-20 px-4 bg-bg-alt">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-primary mb-4">What We Do</h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto mb-14">The same professional services available in both Nashville and Boise.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {config.services.map(s => (
              <div key={s.slug} className="bg-white rounded-2xl p-6 text-left shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg font-bold text-primary mb-2">{s.name}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{s.shortDescription}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="bg-primary py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Not Sure Which Location?</h2>
          <p className="text-white/80 text-lg mb-8">Give us a call and we'll point you to the right team.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={`tel:${nashville.phoneRaw}`} className="flex items-center justify-center gap-2 bg-white hover:bg-white/90 text-primary font-bold px-8 py-4 rounded-lg transition-colors text-lg">
              <Phone size={20} /> Nashville: {nashville.phone}
            </a>
            <a href={`tel:${boise.phoneRaw}`} className="flex items-center justify-center gap-2 border-2 border-white text-white hover:bg-white hover:text-primary font-semibold px-8 py-4 rounded-lg transition-colors text-lg">
              <Phone size={20} /> Boise: {boise.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
