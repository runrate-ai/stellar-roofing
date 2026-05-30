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
  title: "Roofing Company Hendersonville TN | Sumner County | Stellar Roofing",
  description: "Trusted roofing contractor in Hendersonville, TN. Roof replacement, repair, storm & hail damage for Sumner County homes. Free estimates, lifetime warranty. Call (629) 277-4249.",
  alternates: { canonical: 'https://thestellarroofing.com/nashville/service-areas/hendersonville' },
};

const faqs = [
  { question: "Do you serve Hendersonville, TN?", answer: "Yes. Hendersonville is one of our regular service areas north of Nashville. We handle roof replacements, repairs, storm damage inspections, and insurance claims throughout Sumner County." },
  { question: "How much does a roof replacement cost in Hendersonville?", answer: "Most roof replacements in Hendersonville range from $15,000 to $30,000 depending on roof size, pitch, and materials. We provide free written estimates with no obligation." },
  { question: "Do you help with insurance claims in Hendersonville?", answer: "Yes. Hendersonville sees the same storm and hail activity as the rest of Middle Tennessee. We document damage, meet with your adjuster, and help navigate the full insurance claims process." },
];

export default function HendersonvillePage() {
  const svcSchema = serviceSchema({
    name: "Roofing Services in Hendersonville, TN",
    description: "Professional roofing services in Hendersonville, TN and Sumner County including roof replacement, repair, and storm damage restoration.",
    url: "https://thestellarroofing.com/nashville/service-areas/hendersonville",
    areaServed: "Hendersonville, TN",
    phone: loc.phone,
  });

  return (
    <>
      <SchemaMarkup schema={svcSchema} />
      <SchemaMarkup schema={faqSchema(faqs)} />

      <Breadcrumbs items={[
        { name: "Nashville", path: "/nashville" },
        { name: "Service Areas", path: "/nashville#service-areas" },
        { name: "Hendersonville", path: "/nashville/service-areas/hendersonville" },
      ]} />

      <section className="relative h-64 md:h-80 flex items-center">
        <Image src="/images/service-roof-replacement.jpg" alt="Roofing company in Hendersonville, TN" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-primary/75" />
        <div className="relative z-10 px-4 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-white/80 mb-2"><MapPin size={18} /><span className="font-semibold text-sm">Hendersonville, TN — Sumner County</span></div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Roofing Company in Hendersonville, TN</h1>
          <p className="text-white/90 text-lg mb-5">Serving Sumner County with professional, reliable roofing.</p>
          <a href={`tel:${loc.phoneRaw}`} className="inline-flex items-center gap-2 bg-white hover:bg-white/90 text-primary font-bold px-6 py-3 rounded-lg transition-colors">
            <Phone size={18} /> {loc.phone}
          </a>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Roofing in Hendersonville, TN</h2>
          <p className="text-text-muted leading-relaxed mb-6">
            Hendersonville is one of Sumner County's most established communities, situated along Old Hickory Lake just north of Nashville. The city blends older lakefront neighborhoods with newer residential subdivisions, creating a wide range of roofing needs — from full replacements on homes built in the 1970s and 80s to repairs on newer construction.
          </p>
          <p className="text-text-muted leading-relaxed mb-8">
            Stellar Roofing &amp; Restorations serves Hendersonville homeowners with the same professional approach and lifetime workmanship warranty we deliver throughout Middle Tennessee. Free inspections, honest estimates, insurance claims assistance — no pressure, no surprises.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Roofing Services in Hendersonville, TN</h2>
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
          <GHLForm type="quote" title="Get a Free Roofing Estimate in Hendersonville" />
        </div>
      </section>

      <CTABanner heading="Hendersonville — Free Roof Inspection Available" subtext="Honest assessments, lifetime warranty, no pressure." phone={loc.phone} phoneRaw={loc.phoneRaw} />
      <FAQ faqs={faqs} heading="Hendersonville Roofing FAQs" />
    </>
  );
}
