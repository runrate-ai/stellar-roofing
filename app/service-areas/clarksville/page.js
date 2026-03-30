import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, Phone, MapPin } from 'lucide-react';
import Breadcrumbs from '../../../components/Breadcrumbs';
import CTABanner from '../../../components/CTABanner';
import FAQ from '../../../components/FAQ';
import GHLForm from '../../../components/GHLForm';
import SchemaMarkup from '../../../components/SchemaMarkup';
import { serviceSchema, faqSchema } from '../../../lib/schema';
import config from '../../../lib/config';

export const metadata = {
  title: "Roofing Company Clarksville TN | Stellar Roofing & Restorations",
  description: "Roofing services in Clarksville, TN. Roof replacement, repair, storm damage, free inspections. Stellar Roofing & Restorations — call (629) 277-4249.",
  alternates: { canonical: 'https://thestellarroofing.com/service-areas/clarksville' },
};

const faqs = [
  { question: "Do you provide roofing services in Clarksville?", answer: "Yes, we serve Clarksville and Montgomery County. Our team makes regular trips to the Clarksville area to handle roof replacements, repairs, and storm damage inspections." },
  { question: "Is roofing in Clarksville affected by military base proximity?", answer: "Fort Campbell's presence means Clarksville sees a constant flow of residents, many of whom are renting or recently purchasing homes. We work with homeowners, property managers, and landlords throughout the Clarksville area." },
  { question: "What are the most common roofing problems in Clarksville?", answer: "Storm damage from hail and high winds is the most common issue. Clarksville also sees heat-related shingle degradation during the long Tennessee summers. We recommend annual inspections for homes in the area." },
];

export default function ClarksvillePage() {
  const svcSchema = serviceSchema({
    name: "Roofing Services in Clarksville, TN",
    description: "Professional roofing services in Clarksville, TN including roof replacement, repair, and storm damage restoration.",
    url: "https://thestellarroofing.com/service-areas/clarksville",
    areaServed: "Clarksville, TN",
  });
  const faqSchemaData = faqSchema(faqs);

  return (
    <>
      <SchemaMarkup schema={svcSchema} />
      <SchemaMarkup schema={faqSchemaData} />

      <Breadcrumbs items={[
        { name: "Home", path: "/" },
        { name: "Service Areas", path: "/#service-areas" },
        { name: "Clarksville", path: "/service-areas/clarksville" },
      ]} />

      {/* HERO */}
      <section className="relative h-64 md:h-80 flex items-center">
        <Image src="/images/crew-working.jpg" alt="Roofing company in Clarksville, TN" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-primary/75" />
        <div className="relative z-10 px-4 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-primary mb-2"><MapPin size={18} /><span className="font-semibold text-sm">Clarksville, TN</span></div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Roofing Company in Clarksville, TN</h1>
          <p className="text-white/90 text-lg mb-5">Serving Montgomery County with quality roofing you can count on.</p>
          <a href={`tel:${config.business.phoneRaw}`} className="inline-flex items-center gap-2 bg-white hover:bg-white/90 text-primary font-bold px-6 py-3 rounded-lg transition-colors">
            <Phone size={18} /> {config.business.phone}
          </a>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Quality Roofing in Clarksville</h2>
          <p className="text-text-muted leading-relaxed mb-6">
            Clarksville is Tennessee's fifth-largest city and one of the fastest-growing communities in the state. Located along the Cumberland River in Montgomery County, Clarksville's combination of older established neighborhoods and rapidly expanding new developments creates a wide variety of roofing needs — from major replacements on homes built in the 1980s and 90s to repairs on newer construction.
          </p>
          <p className="text-text-muted leading-relaxed mb-6">
            Like the rest of Middle Tennessee, Clarksville is no stranger to severe weather. The city sits in a region that receives significant annual precipitation, spring storm activity, and enough hail events to keep roofers busy. Heat and UV exposure during the long Tennessee summers also takes a toll on asphalt shingles, accelerating granule loss and shortening roof lifespan. Our team understands these regional factors and uses materials and techniques suited for the Tennessee climate.
          </p>
          <p className="text-text-muted leading-relaxed mb-8">
            Stellar Roofing &amp; Restorations brings the same commitment to quality and honest service that we deliver in Nashville and Murfreesboro to every job we take in Clarksville. From the time you call for your free inspection to the final nail sweep when the job is done, you'll experience the professional, no-pressure approach that sets us apart from other roofing contractors.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Roofing Services in Clarksville, TN</h2>
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
          <GHLForm type="quote" title="Get a Free Roofing Estimate in Clarksville" />
        </div>
      </section>

      <CTABanner heading="Clarksville — Schedule Your Free Roof Inspection" subtext="We'll give you an honest assessment with no pressure to buy." />

      <FAQ faqs={faqs} heading="Clarksville Roofing FAQs" />
    </>
  );
}
