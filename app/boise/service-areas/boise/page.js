import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, Phone, MapPin } from 'lucide-react';
import Breadcrumbs from '../../../../components/Breadcrumbs';
import CTABanner from '../../../../components/CTABanner';
import FAQ from '../../../../components/FAQ';
import GHLForm from '../../../../components/GHLForm';
import SchemaMarkup from '../../../../components/SchemaMarkup';
import { localBusinessSchema, serviceSchema, faqSchema } from '../../../../lib/schema';
import config from '../../../../lib/config';

const loc = config.locations.boise;

export const metadata = {
  title: "Roofing Contractor Boise ID | Ada County | Wind & Storm Damage Specialists | Stellar Roofing",
  description: "Local roofing contractor in Boise, ID. Wind & storm damage specialists, roof replacement, repair, free inspections. Serving all Ada County neighborhoods. Call today.",
  alternates: { canonical: 'https://thestellarroofing.com/boise/service-areas/boise' },
};

const faqs = [
  { question: "Are you a local Boise roofing company?", answer: "Yes. Stellar Roofing & Restorations serves the Boise area and the Treasure Valley. We're not a national franchise — we're a local team that cares about our reputation in this community." },
  { question: "Do you serve all Boise neighborhoods?", answer: "Yes, we serve all Boise neighborhoods including the North End, Bench, Downtown, Boise Foothills, Southeast Boise, Vista, Harris Ranch, and more. If you're in Ada County, we've got you covered." },
  { question: "How quickly can you get to my Boise home?", answer: "For standard inspections and estimates, we're typically available within a few days. For urgent storm damage situations, we prioritize getting out as quickly as possible." },
];

export default function BoiseAreaPage() {
  const lbSchema = localBusinessSchema('boise');
  const svcSchema = serviceSchema({ name: "Roofing Services in Boise, ID", description: "Professional roof replacement, repair, storm damage repair, and inspections in Boise, ID.", url: "https://thestellarroofing.com/boise/service-areas/boise", areaServed: "Boise, ID", phone: loc.phone });

  return (
    <>
      <SchemaMarkup schema={lbSchema} />
      <SchemaMarkup schema={svcSchema} />
      <SchemaMarkup schema={faqSchema(faqs)} />

      <Breadcrumbs items={[{ name: "Boise", path: "/boise" }, { name: "Service Areas", path: "/boise#service-areas" }, { name: "Boise", path: "/boise/service-areas/boise" }]} />

      <section className="relative h-64 md:h-80 flex items-center">
        <Image src="/images/hero.jpg" alt="Roofing company in Boise, ID" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-primary/75" />
        <div className="relative z-10 px-4 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-white/80 mb-2"><MapPin size={18} /><span className="font-semibold text-sm">Boise, ID</span></div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Roofing Company in Boise, ID</h1>
          <p className="text-white/90 text-lg mb-5">Trusted by Boise homeowners in the Treasure Valley.</p>
          <a href={`tel:${loc.phoneRaw}`} className="inline-flex items-center gap-2 bg-white hover:bg-white/90 text-primary font-bold px-6 py-3 rounded-lg transition-colors">
            <Phone size={18} /> {loc.phone}
          </a>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Boise's Trusted Roofing Team</h2>
          <p className="text-text-muted leading-relaxed mb-6">Stellar Roofing &amp; Restorations serves Boise and the broader Treasure Valley with the same commitment to quality and honest service we've built our reputation on. Boise has grown dramatically — consistently ranking as one of America's fastest-growing cities — and with that growth comes thousands of homes of all ages requiring professional roofing services.</p>
          <p className="text-text-muted leading-relaxed mb-6">Idaho's climate presents unique roofing challenges. Boise summers are hot and sunny, with UV levels that accelerate asphalt shingle degradation faster than in many other regions. The Treasure Valley is well known for its high-wind events — powerful gap winds that can lift shingles, crack ridgecaps, and expose roof decking across entire neighborhoods. Winters bring snow loads, freeze-thaw cycles, and the risk of ice dam formation on poorly ventilated roofs.</p>
          <p className="text-text-muted leading-relaxed mb-8">Whether you're in a new construction home in the Harris Ranch area, a classic Craftsman in the North End, a ranch home on the Bench, or anything in between — our team has the experience and materials to protect your Boise home.</p>

          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Roofing Services in Boise, ID</h2>
          <ul className="space-y-3 mb-8">
            {config.services.map(s => (
              <li key={s.slug} className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <Link href={`/boise/services/${s.slug}`} className="font-semibold text-primary hover:text-primary-light transition-colors">{s.name}</Link>
                  <span className="text-text-muted text-sm"> — {s.shortDescription}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-12 px-4 bg-bg-alt">
        <div className="max-w-2xl mx-auto">
          <GHLForm type="quote" title="Get a Free Roofing Estimate in Boise" />
        </div>
      </section>

      <CTABanner heading="Boise's Roofing Experts Are Ready to Help" subtext="Free inspections, honest estimates, lifetime warranty on every roof we install." phone={loc.phone} phoneRaw={loc.phoneRaw} />
      <FAQ faqs={faqs} heading="Boise Roofing FAQs" />
    </>
  );
}
