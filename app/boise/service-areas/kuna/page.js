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
  title: "Roofing Company Kuna ID | Ada County | Stellar Roofing",
  description: "Trusted roofing contractor in Kuna, ID. Roof replacement, repair, hail damage & storm damage for Ada County homes. Free estimates, lifetime warranty. Call today.",
  alternates: { canonical: 'https://thestellarroofing.com/boise/service-areas/kuna' },
};

const faqs = [
  { question: "Do you serve Kuna, ID?", answer: "Yes. We serve Kuna and surrounding Ada County communities as part of our Treasure Valley service area. We handle roof replacements, repairs, hail damage assessments, and insurance claims throughout the Kuna area." },
  { question: "Is Kuna at risk for hail damage?", answer: "Yes. Kuna is within Ada County and shares the same hail storm exposure as Boise and Meridian. Spring hail events regularly affect the area. We recommend a free inspection after any notable storm." },
  { question: "How much does a roof replacement cost in Kuna, ID?", answer: "Roof replacement in the Kuna area typically ranges from $12,000 to $28,000 depending on roof size, pitch, and materials. We provide free written estimates with no obligation before any work begins." },
];

export default function KunaPage() {
  const svcSchema = serviceSchema({
    name: "Roofing Services in Kuna, ID",
    description: "Professional roofing services in Kuna, ID including roof replacement, repair, and hail damage restoration.",
    url: "https://thestellarroofing.com/boise/service-areas/kuna",
    areaServed: "Kuna, ID",
    phone: loc.phone,
  });

  return (
    <>
      <SchemaMarkup schema={svcSchema} />
      <SchemaMarkup schema={faqSchema(faqs)} />

      <Breadcrumbs items={[
        { name: "Boise", path: "/boise" },
        { name: "Service Areas", path: "/boise#service-areas" },
        { name: "Kuna", path: "/boise/service-areas/kuna" },
      ]} />

      <section className="relative h-64 md:h-80 flex items-center">
        <Image src="/images/service-roof-replacement.jpg" alt="Roofing company in Kuna, ID" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-primary/75" />
        <div className="relative z-10 px-4 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-white/80 mb-2"><MapPin size={18} /><span className="font-semibold text-sm">Kuna, ID — Ada County</span></div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Roofing Company in Kuna, ID</h1>
          <p className="text-white/90 text-lg mb-5">Serving Ada County with reliable, professional roofing.</p>
          <a href={`tel:${loc.phoneRaw}`} className="inline-flex items-center gap-2 bg-white hover:bg-white/90 text-primary font-bold px-6 py-3 rounded-lg transition-colors">
            <Phone size={18} /> {loc.phone}
          </a>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Roofing in Kuna, ID</h2>
          <p className="text-text-muted leading-relaxed mb-6">
            Kuna is a growing community in Ada County, sitting southwest of Boise along the Snake River Plain. The city has seen significant residential development in recent years as families look for more space within reach of the Treasure Valley's job market. That growth means a mix of newer homes alongside older properties — and a wide range of roofing needs across the community.
          </p>
          <p className="text-text-muted leading-relaxed mb-6">
            Like all Treasure Valley communities, Kuna is exposed to Idaho's demanding roofing climate: spring hailstorms that can cause widespread shingle damage, intense summer UV that accelerates shingle aging, and winter snow loads that test older roofing systems. Our team is familiar with these conditions and uses materials and installation techniques designed to perform in Idaho's full climate range.
          </p>
          <p className="text-text-muted leading-relaxed mb-8">
            Stellar Roofing &amp; Restorations serves Kuna homeowners with the same professional, no-pressure approach and lifetime workmanship warranty that defines our work throughout the Treasure Valley.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Roofing Services in Kuna, ID</h2>
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
          <GHLForm type="quote" title="Get a Free Roofing Estimate in Kuna" />
        </div>
      </section>

      <CTABanner heading="Kuna — Schedule Your Free Roof Inspection" subtext="Honest assessments, lifetime warranty, no pressure." phone={loc.phone} phoneRaw={loc.phoneRaw} />
      <FAQ faqs={faqs} heading="Kuna Roofing FAQs" />
    </>
  );
}
