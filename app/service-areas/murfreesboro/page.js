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
  title: "Roofing Company Murfreesboro TN | Stellar Roofing & Restorations",
  description: "Roofing services in Murfreesboro, TN. Roof replacement, repair, storm damage, free inspections. Stellar Roofing & Restorations — call (629) 277-4249.",
  alternates: { canonical: 'https://thestellarroofing.com/service-areas/murfreesboro' },
};

const faqs = [
  { question: "Do you serve Murfreesboro homeowners?", answer: "Yes! Murfreesboro is one of our primary service areas. We regularly work in subdivisions across Rutherford County and can typically schedule estimates within a few days." },
  { question: "Is Murfreesboro prone to storm damage?", answer: "Absolutely. Murfreesboro and Rutherford County see regular severe weather including hail, strong thunderstorm winds, and the occasional tornado. After major storm events, we prioritize getting to affected homeowners quickly." },
  { question: "Can you help with insurance claims in Murfreesboro?", answer: "Yes. We have extensive experience with insurance claims in the Rutherford County area and will work directly with your adjuster to document damage and get your claim approved." },
];

export default function MurfreesboroPage() {
  const svcSchema = serviceSchema({
    name: "Roofing Services in Murfreesboro, TN",
    description: "Professional roofing services in Murfreesboro, TN including roof replacement, repair, and storm damage restoration.",
    url: "https://thestellarroofing.com/service-areas/murfreesboro",
    areaServed: "Murfreesboro, TN",
  });
  const faqSchemaData = faqSchema(faqs);

  return (
    <>
      <SchemaMarkup schema={svcSchema} />
      <SchemaMarkup schema={faqSchemaData} />

      <Breadcrumbs items={[
        { name: "Home", path: "/" },
        { name: "Service Areas", path: "/#service-areas" },
        { name: "Murfreesboro", path: "/service-areas/murfreesboro" },
      ]} />

      {/* HERO */}
      <section className="relative h-64 md:h-80 flex items-center">
        <Image src="/images/service-roof-replacement.jpg" alt="Roofing company in Murfreesboro, TN" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-primary/75" />
        <div className="relative z-10 px-4 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-primary mb-2"><MapPin size={18} /><span className="font-semibold text-sm">Murfreesboro, TN</span></div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Roofing Company in Murfreesboro, TN</h1>
          <p className="text-white/90 text-lg mb-5">Serving Rutherford County with expert roofing services.</p>
          <a href={`tel:${config.business.phoneRaw}`} className="inline-flex items-center gap-2 bg-white hover:bg-white/90 text-primary font-bold px-6 py-3 rounded-lg transition-colors">
            <Phone size={18} /> {config.business.phone}
          </a>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Expert Roofing in Murfreesboro</h2>
          <p className="text-text-muted leading-relaxed mb-6">
            Murfreesboro has become one of the fastest-growing cities in Tennessee, and with that growth comes a massive increase in roofing needs. From new construction in developments throughout Rutherford County to aging roofs in established neighborhoods near MTSU and downtown Murfreesboro, Stellar Roofing &amp; Restorations is here to provide the quality roofing work that Murfreesboro homeowners deserve.
          </p>
          <p className="text-text-muted leading-relaxed mb-6">
            Rutherford County sits squarely in Middle Tennessee's severe weather corridor. Spring and fall bring intense storms with large hail and high winds that regularly damage roofs across the county. Many homeowners in Murfreesboro are unaware they have storm damage until they see water stains on their ceiling — by which point the damage has compounded significantly. A free inspection from our team can identify problems early and help you protect your investment.
          </p>
          <p className="text-text-muted leading-relaxed mb-8">
            We've completed roof replacements and repairs across Murfreesboro — from the older ranch-style homes near downtown to newer subdivisions in areas like Blackman, Cason Lane, and Barfield. Our team is licensed, insured, and committed to delivering the same quality of work in Murfreesboro that has earned us our reputation in Nashville.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Our Murfreesboro Roofing Services</h2>
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
          <GHLForm type="quote" title="Get a Free Roofing Estimate in Murfreesboro" />
        </div>
      </section>

      <CTABanner heading="Murfreesboro Homeowners — Get a Free Roof Inspection" subtext="No obligation, no pressure. Just an honest look at your roof." />

      <FAQ faqs={faqs} heading="Murfreesboro Roofing FAQs" />
    </>
  );
}
