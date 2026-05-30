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

const loc = config.locations.nashville;

export const metadata = {
  title: "Roofing Company Smyrna TN | Rutherford County | Stellar Roofing",
  description: "Trusted roofing contractor in Smyrna, TN. Roof replacement, repair, storm & hail damage for Rutherford County homes. Free estimates, lifetime warranty. Call (629) 277-4249.",
  alternates: { canonical: 'https://thestellarroofing.com/nashville/service-areas/smyrna' },
};

const faqs = [
  { question: "Do you serve Smyrna, TN?", answer: "Yes. Smyrna is one of our regular service areas in Rutherford County. We handle roof replacements, repairs, storm damage inspections, and insurance claims throughout the Smyrna area." },
  { question: "How much does a roof replacement cost in Smyrna?", answer: "Most roof replacements in Smyrna range from $15,000 to $28,000 depending on roof size, pitch, and materials. We provide free written estimates with no obligation." },
  { question: "Do you work near the Nissan plant in Smyrna?", answer: "Yes. We serve residential and commercial properties throughout Smyrna, including neighborhoods near the Smyrna industrial corridor and the residential areas surrounding them." },
];

export default function SmyrnaPage() {
  const svcSchema = serviceSchema({
    name: "Roofing Services in Smyrna, TN",
    description: "Professional roofing services in Smyrna, TN and Rutherford County including roof replacement, repair, and storm damage restoration.",
    url: "https://thestellarroofing.com/nashville/service-areas/smyrna",
    areaServed: "Smyrna, TN",
    phone: loc.phone,
  });

  return (
    <>
      <SchemaMarkup schema={svcSchema} />
      <SchemaMarkup schema={faqSchema(faqs)} />

      <Breadcrumbs items={[
        { name: "Nashville", path: "/nashville" },
        { name: "Service Areas", path: "/nashville#service-areas" },
        { name: "Smyrna", path: "/nashville/service-areas/smyrna" },
      ]} />

      <section className="relative h-64 md:h-80 flex items-center">
        <Image src="/images/service-roof-repair.jpg" alt="Roofing company in Smyrna, TN" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-primary/75" />
        <div className="relative z-10 px-4 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-white/80 mb-2"><MapPin size={18} /><span className="font-semibold text-sm">Smyrna, TN — Rutherford County</span></div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Roofing Company in Smyrna, TN</h1>
          <p className="text-white/90 text-lg mb-5">Serving Rutherford County with professional roofing services.</p>
          <a href={`tel:${loc.phoneRaw}`} className="inline-flex items-center gap-2 bg-white hover:bg-white/90 text-primary font-bold px-6 py-3 rounded-lg transition-colors">
            <Phone size={18} /> {loc.phone}
          </a>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Roofing in Smyrna, TN</h2>
          <p className="text-text-muted leading-relaxed mb-6">
            Smyrna is a thriving Rutherford County community situated between Nashville and Murfreesboro along I-24. Home to one of Tennessee's largest employers and a growing residential base, Smyrna has seen consistent growth in both new construction and older neighborhoods requiring roofing maintenance and replacement.
          </p>
          <p className="text-text-muted leading-relaxed mb-8">
            Like the rest of Middle Tennessee, Smyrna is subject to the region's active storm season. Hail events, high winds, and heavy rain regularly affect Rutherford County, and our team responds quickly to assess and repair storm-related roof damage. Stellar Roofing &amp; Restorations serves Smyrna homeowners with free inspections, honest estimates, and a lifetime workmanship warranty.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Roofing Services in Smyrna, TN</h2>
          <ul className="space-y-3 mb-8">
            {config.services.map(s => (
              <li key={s.slug} className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <Link href={`/nashville/services/${s.slug}`} className="font-semibold text-primary hover:text-primary-light transition-colors">{s.name}</Link>
                  <span className="text-text-muted text-sm"> — {s.shortDescription}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-12 px-4 bg-bg-alt">
        <div className="max-w-2xl mx-auto">
          <GHLForm type="quote" title="Get a Free Roofing Estimate in Smyrna" />
        </div>
      </section>

      <CTABanner heading="Smyrna — Free Roof Inspection Available" subtext="Honest assessments, lifetime warranty, no pressure." phone={loc.phone} phoneRaw={loc.phoneRaw} />
      <FAQ faqs={faqs} heading="Smyrna Roofing FAQs" />
    </>
  );
}
