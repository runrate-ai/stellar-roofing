import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, Phone, MapPin } from 'lucide-react';
import Breadcrumbs from '../../../components/Breadcrumbs';
import CTABanner from '../../../components/CTABanner';
import FAQ from '../../../components/FAQ';
import GHLForm from '../../../components/GHLForm';
import SchemaMarkup from '../../../components/SchemaMarkup';
import { localBusinessSchema, serviceSchema, faqSchema } from '../../../lib/schema';
import config from '../../../lib/config';

export const metadata = {
  title: "Roofing Company Nashville TN | Stellar Roofing & Restorations",
  description: "Nashville's trusted roofing company. Roof replacement, repair, storm damage, and free inspections. Stellar Roofing & Restorations — call (629) 277-4249.",
  alternates: { canonical: 'https://thestellarroofing.com/service-areas/nashville' },
};

const faqs = [
  { question: "Are you a local Nashville roofing company?", answer: "Yes. Stellar Roofing & Restorations is based in Nashville and serves the greater Middle Tennessee area. We're your neighbors, not a national franchise, and we care about our reputation in this community." },
  { question: "Do you serve all Nashville neighborhoods?", answer: "Yes, we serve all Nashville neighborhoods including East Nashville, Bellevue, Antioch, Madison, Donelson, Green Hills, 12 South, The Nations, Germantown, and more. If you're in Davidson County, we've got you covered." },
  { question: "How quickly can you get to my Nashville home?", answer: "For standard inspections and estimates, we're typically available within a few days. For urgent repairs or storm damage situations, we prioritize getting out as quickly as possible." },
];

export default function NashvillePage() {
  const lbSchema = localBusinessSchema();
  const svcSchema = serviceSchema({
    name: "Roofing Services in Nashville, TN",
    description: "Professional roof replacement, repair, storm damage repair, and inspections in Nashville, TN.",
    url: "https://thestellarroofing.com/service-areas/nashville",
    areaServed: "Nashville, TN",
  });
  const faqSchemaData = faqSchema(faqs);

  return (
    <>
      <SchemaMarkup schema={lbSchema} />
      <SchemaMarkup schema={svcSchema} />
      <SchemaMarkup schema={faqSchemaData} />

      <Breadcrumbs items={[
        { name: "Home", path: "/" },
        { name: "Service Areas", path: "/#service-areas" },
        { name: "Nashville", path: "/service-areas/nashville" },
      ]} />

      {/* HERO */}
      <section className="relative h-64 md:h-80 flex items-center">
        <Image src="/images/hero.jpg" alt="Roofing company in Nashville, TN" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-primary/75" />
        <div className="relative z-10 px-4 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-primary mb-2"><MapPin size={18} /><span className="font-semibold text-sm">Nashville, TN</span></div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Roofing Company in Nashville, TN</h1>
          <p className="text-white/90 text-lg mb-5">Trusted by Nashville homeowners since 2020.</p>
          <a href={`tel:${config.business.phoneRaw}`} className="inline-flex items-center gap-2 bg-white hover:bg-white/90 text-primary font-bold px-6 py-3 rounded-lg transition-colors">
            <Phone size={18} /> {config.business.phone}
          </a>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Nashville's Trusted Roofing Team</h2>
          <p className="text-text-muted leading-relaxed mb-6">
            Stellar Roofing &amp; Restorations is proud to be Nashville's local roofing company. Founded in 2020 and led by owner Nate, we've built our reputation one roof at a time throughout Davidson County and the greater Nashville metro area. When you call us, you're talking to a local team that knows Nashville's weather, neighborhoods, and the roofing challenges that come with living in Middle Tennessee.
          </p>
          <p className="text-text-muted leading-relaxed mb-6">
            Nashville's climate puts roofs through a real test. We get hot, humid summers that accelerate shingle wear. We get significant storm seasons with hail, high winds, and the occasional tornado — like the destructive storms that rolled through Nashville in March 2020. We get enough ice and snow to create problems with older roofing systems. All of that adds up to a city full of homes that need reliable, professional roofing care from people who actually know what they're doing.
          </p>
          <p className="text-text-muted leading-relaxed mb-8">
            Nashville has grown dramatically over the past decade. New developments in areas like East Nashville, The Nations, Germantown, and Antioch have brought new homes and new roofing needs. Older neighborhoods like Bellevue, Madison, and Donelson are home to houses with roofs that are 15–25 years old and due for replacement or repair. Whether you're in a new build or a classic Nashville ranch house, Stellar Roofing &amp; Restorations has the expertise to handle your roofing needs.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Roofing Services We Provide in Nashville</h2>
          <ul className="space-y-3 mb-8">
            {config.services.map(s => (
              <li key={s.slug} className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <Link href={`/services/${s.slug}`} className="font-semibold text-primary hover:text-primary transition-colors">{s.name}</Link>
                  <span className="text-text-muted text-sm"> — {s.shortDescription}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* GHL FORM */}
      <section className="py-12 px-4 bg-bg-alt">
        <div className="max-w-2xl mx-auto">
          <GHLForm type="quote" title="Get a Free Roofing Estimate in Nashville" />
        </div>
      </section>

      <CTABanner heading="Nashville's Roofing Experts Are Ready to Help" subtext="Free inspections, honest estimates, lifetime warranty on every roof we install." />

      <FAQ faqs={faqs} heading="Nashville Roofing FAQs" />
    </>
  );
}
