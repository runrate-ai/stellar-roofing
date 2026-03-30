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
  title: "Roofing Company Brentwood TN | Stellar Roofing & Restorations",
  description: "Roofing services in Brentwood, TN. Roof replacement, repair, storm damage, free inspections. Premium roofing for Brentwood homes. Call (629) 277-4249.",
  alternates: { canonical: 'https://thestellarroofing.com/service-areas/brentwood' },
};

const faqs = [
  { question: "Do you serve Brentwood and Williamson County?", answer: "Yes, Brentwood is one of our regular service areas. We work throughout the Brentwood area providing roof replacements, repairs, and storm damage inspections for residential and commercial properties." },
  { question: "What roofing materials do you recommend for Brentwood homes?", answer: "For Brentwood's upscale residential market, we often recommend premium architectural shingles or designer shingles that offer enhanced aesthetics along with superior performance. We also install metal roofing for homeowners seeking a long-term premium solution." },
  { question: "How quickly can you schedule a free inspection in Brentwood?", answer: "We typically can schedule a free inspection in Brentwood within 2–4 business days. For urgent situations like active leaks or recent storm damage, we prioritize getting there faster." },
];

export default function BrentwoodPage() {
  const svcSchema = serviceSchema({
    name: "Roofing Services in Brentwood, TN",
    description: "Premium roofing services in Brentwood, TN including roof replacement, repair, and storm damage restoration.",
    url: "https://thestellarroofing.com/service-areas/brentwood",
    areaServed: "Brentwood, TN",
  });
  const faqSchemaData = faqSchema(faqs);

  return (
    <>
      <SchemaMarkup schema={svcSchema} />
      <SchemaMarkup schema={faqSchemaData} />

      <Breadcrumbs items={[
        { name: "Home", path: "/" },
        { name: "Service Areas", path: "/#service-areas" },
        { name: "Brentwood", path: "/service-areas/brentwood" },
      ]} />

      {/* HERO */}
      <section className="relative h-64 md:h-80 flex items-center">
        <Image src="/images/service-inspection.jpg" alt="Roofing company in Brentwood, TN" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-primary/75" />
        <div className="relative z-10 px-4 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-primary mb-2"><MapPin size={18} /><span className="font-semibold text-sm">Brentwood, TN</span></div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Roofing Company in Brentwood, TN</h1>
          <p className="text-white/90 text-lg mb-5">Premium roofing for Brentwood's finest homes.</p>
          <a href={`tel:${config.business.phoneRaw}`} className="inline-flex items-center gap-2 bg-white hover:bg-white/90 text-primary font-bold px-6 py-3 rounded-lg transition-colors">
            <Phone size={18} /> {config.business.phone}
          </a>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Brentwood's Trusted Roofing Company</h2>
          <p className="text-text-muted leading-relaxed mb-6">
            Brentwood is consistently ranked among the best places to live in Tennessee — and the area's well-maintained, high-value homes deserve roofing that matches their quality. Stellar Roofing &amp; Restorations brings the craftsmanship, premium materials, and professional service that Brentwood homeowners expect to every roofing project in the area.
          </p>
          <p className="text-text-muted leading-relaxed mb-6">
            Many of Brentwood's established neighborhoods have homes built in the 1980s through early 2000s. Those roofs are now reaching the end of their expected lifespan. Even roofs that look visually intact may have lost significant granule protection, have softening decking, or have flashing that's beginning to fail. Our free inspections help Brentwood homeowners understand exactly where their roof stands before small issues become expensive emergencies.
          </p>
          <p className="text-text-muted leading-relaxed mb-8">
            Storm damage is also a real concern in Brentwood. Hailstorms that push through Middle Tennessee don't respect zip codes — they affect Brentwood just as often as anywhere else in the Nashville metro. After significant storms, we see many Brentwood homeowners who were unaware they had claimable damage. A free inspection from Stellar Roofing can mean the difference between a covered claim and paying out of pocket.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Roofing Services in Brentwood, TN</h2>
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
          <GHLForm type="quote" title="Get a Free Roofing Estimate in Brentwood" />
        </div>
      </section>

      <CTABanner heading="Brentwood — Schedule Your Free Roof Inspection" subtext="Honest assessment, premium materials, lifetime warranty. No pressure ever." />

      <FAQ faqs={faqs} heading="Brentwood Roofing FAQs" />
    </>
  );
}
