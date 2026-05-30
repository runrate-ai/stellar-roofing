import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, Phone, MapPin } from 'lucide-react';
import Breadcrumbs from '../../../../components/Breadcrumbs';
import CTABanner from '../../../../components/CTABanner';
import FAQ from '../../../../components/FAQ';
import GHLForm from '../../../../components/GHLForm';
import SchemaMarkup from '../../../../components/SchemaMarkup';
import { serviceSchema, faqSchema } from '../../../../lib/schema';
import config from '../../../../lib/config';

const loc = config.locations.boise;

export const metadata = {
  title: "Roofing Company Middleton ID | Canyon County | Stellar Roofing",
  description: "Trusted roofing contractor in Middleton, ID. Roof replacement, repair, hail & storm damage for Canyon County homes. Free estimates, lifetime warranty. Call today.",
  alternates: { canonical: 'https://thestellarroofing.com/boise/service-areas/middleton' },
};

const faqs = [
  { question: "Do you serve Middleton, ID?", answer: "Yes. We serve Middleton and the surrounding Canyon County area as part of our Treasure Valley service area. We handle roof replacements, repairs, hail damage assessments, and insurance claims throughout Middleton." },
  { question: "Is Middleton at risk for hail damage?", answer: "Yes. Middleton is in Canyon County and shares the same hail storm exposure as Nampa, Caldwell, and the broader Treasure Valley. Spring hail events are common. We recommend a free inspection after any notable storm." },
  { question: "How much does a roof replacement cost in Middleton?", answer: "Roof replacement in Middleton typically ranges from $12,000 to $26,000 depending on roof size, pitch, and materials. We provide free written estimates with no obligation." },
];

export default function MiddletonPage() {
  const svcSchema = serviceSchema({
    name: "Roofing Services in Middleton, ID",
    description: "Professional roofing services in Middleton, ID and Canyon County including roof replacement, repair, and hail damage restoration.",
    url: "https://thestellarroofing.com/boise/service-areas/middleton",
    areaServed: "Middleton, ID",
    phone: loc.phone,
  });

  return (
    <>
      <SchemaMarkup schema={svcSchema} />
      <SchemaMarkup schema={faqSchema(faqs)} />

      <Breadcrumbs items={[
        { name: "Boise", path: "/boise" },
        { name: "Service Areas", path: "/boise#service-areas" },
        { name: "Middleton", path: "/boise/service-areas/middleton" },
      ]} />

      <section className="relative h-64 md:h-80 flex items-center">
        <Image src="/images/service-roof-replacement.jpg" alt="Roofing company in Middleton, ID" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-primary/75" />
        <div className="relative z-10 px-4 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-white/80 mb-2"><MapPin size={18} /><span className="font-semibold text-sm">Middleton, ID — Canyon County</span></div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Roofing Company in Middleton, ID</h1>
          <p className="text-white/90 text-lg mb-5">Serving Canyon County with reliable, professional roofing.</p>
          <a href={`tel:${loc.phoneRaw}`} className="inline-flex items-center gap-2 bg-white hover:bg-white/90 text-primary font-bold px-6 py-3 rounded-lg transition-colors">
            <Phone size={18} /> {loc.phone}
          </a>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Roofing in Middleton, ID</h2>
          <p className="text-text-muted leading-relaxed mb-6">
            Middleton is a growing Canyon County community located west of Nampa along the Boise River. The town has attracted steady residential growth as families look for more rural character within easy reach of the Treasure Valley's job market. Middleton features a mix of newer subdivisions and older properties, with roofing needs spanning from new installations to full replacements on aging homes.
          </p>
          <p className="text-text-muted leading-relaxed mb-8">
            Stellar Roofing &amp; Restorations serves Middleton homeowners with the same professional, no-pressure approach and lifetime workmanship warranty we deliver throughout the Treasure Valley. Free inspections, honest estimates, and quality roofing for Idaho's climate.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Roofing Services in Middleton, ID</h2>
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
          <GHLForm type="quote" title="Get a Free Roofing Estimate in Middleton" />
        </div>
      </section>

      <CTABanner heading="Middleton — Free Roof Inspection Available" subtext="Honest assessments, lifetime warranty, no pressure." phone={loc.phone} phoneRaw={loc.phoneRaw} />
      <FAQ faqs={faqs} heading="Middleton Roofing FAQs" />
    </>
  );
}
