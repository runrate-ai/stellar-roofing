import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, Phone, Search } from 'lucide-react';
import Breadcrumbs from '../../../components/Breadcrumbs';
import CTABanner from '../../../components/CTABanner';
import FAQ from '../../../components/FAQ';
import GHLForm from '../../../components/GHLForm';
import SchemaMarkup from '../../../components/SchemaMarkup';
import { serviceSchema, faqSchema } from '../../../lib/schema';
import config from '../../../lib/config';

export const metadata = {
  title: "Free Roof Inspection Nashville TN | No Obligation | Stellar Roofing",
  description: "Free roof inspections in Nashville, TN. No obligation, honest assessment. We check shingles, flashing, gutters, ventilation. Call Stellar Roofing (629) 277-4249.",
  alternates: { canonical: 'https://thestellarroofing.com/services/roof-inspection' },
};

const faqs = [
  { question: "Is the roof inspection really free?", answer: "Yes, completely free. There is no charge for the inspection and no obligation to hire us for any work. We believe homeowners deserve honest information about the condition of their roof without any sales pressure." },
  { question: "How long does a roof inspection take?", answer: "Most residential roof inspections take 30–60 minutes. We'll physically inspect your roof as well as check your attic if accessible. Afterward, we'll walk you through our findings and answer any questions." },
  { question: "What happens if you find damage during the inspection?", answer: "We'll show you exactly what we found — with photos — and explain your options. We may recommend a repair, full replacement, or simply keeping an eye on a particular area. There is never any pressure to make a decision on the spot." },
  { question: "When should I get a roof inspection?", answer: "We recommend a professional inspection after any significant storm, if you notice water stains on your ceiling, if your roof is more than 15 years old, or before buying or selling a home. Catching issues early saves money." },
];

export default function RoofInspectionPage() {
  const svcSchema = serviceSchema({
    name: "Free Roof Inspection",
    description: "Free, no-obligation roof inspections in Nashville, TN. Professional assessment of shingles, flashing, gutters, and ventilation.",
    url: "https://thestellarroofing.com/services/roof-inspection",
  });
  const faqSchemaData = faqSchema(faqs);

  return (
    <>
      <SchemaMarkup schema={svcSchema} />
      <SchemaMarkup schema={faqSchemaData} />

      <Breadcrumbs items={[
        { name: "Home", path: "/" },
        { name: "Services", path: "/#services" },
        { name: "Roof Inspection", path: "/services/roof-inspection" },
      ]} />

      {/* HERO */}
      <section className="relative h-72 md:h-96 flex items-center">
        <Image
          src="/images/service-inspection.jpg"
          alt="Free roof inspection in Nashville, TN"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-primary/75" />
        <div className="relative z-10 px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Free Roof Inspection in Nashville, TN</h1>
          <p className="text-white/90 text-xl mb-6">No obligation. No pressure. Just honest answers.</p>
          <a href={`tel:${config.business.phoneRaw}`} className="inline-flex items-center gap-2 bg-white hover:bg-white/90 text-primary font-bold px-6 py-3 rounded-lg transition-colors">
            <Phone size={18} /> Call {config.business.phone}
          </a>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-text-muted leading-relaxed mb-8">
            Stellar Roofing &amp; Restorations offers free, no-obligation roof inspections to homeowners throughout Nashville and Middle Tennessee. Our experienced team will assess the current condition of your roof and give you a straightforward, honest evaluation — no pressure, no upselling, just the facts about what we find.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">What's Included in Our Free Roof Inspection</h2>
          <p className="text-text-muted leading-relaxed mb-4">
            Our inspectors physically get on your roof and conduct a systematic, top-to-bottom evaluation. Here's what we check:
          </p>
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {[
              { title: "Shingles", desc: "We assess the condition, age, and integrity of your shingles — looking for curling, cracking, missing pieces, granule loss, and hail bruising." },
              { title: "Flashing", desc: "We inspect all flashing at roof penetrations, valleys, chimneys, and skylights — a common failure point that causes leaks." },
              { title: "Gutters & Drainage", desc: "We check for granule buildup in gutters (a sign of shingle wear), improper slope, detachment, and gutter damage." },
              { title: "Ventilation", desc: "We assess ridge vents, soffit vents, and attic ventilation to ensure proper airflow, which directly impacts roof lifespan." },
              { title: "Decking", desc: "We check for soft spots, water damage, rot, or sagging that could indicate structural concerns beneath the shingles." },
              { title: "Attic (if accessible)", desc: "When accessible, we check the attic for signs of water intrusion, mold, improper insulation, or ventilation problems." },
            ].map(({ title, desc }) => (
              <div key={title} className="bg-bg-alt rounded-xl p-5">
                <h3 className="font-bold text-primary mb-1">{title}</h3>
                <p className="text-text-muted text-sm">{desc}</p>
              </div>
            ))}
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">When Should You Schedule a Roof Inspection?</h2>
          <ul className="space-y-3 mb-8">
            {[
              "After a severe storm, hail event, or high winds in Nashville",
              "If you notice water stains, dripping, or mold on your ceiling or in your attic",
              "If your roof is 15 years or older and hasn't been recently inspected",
              "Before buying or selling a home — know what you're getting into",
              "If you're filing or considering filing an insurance claim for storm damage",
              "If you see visible shingle damage, granules in gutters, or missing shingles",
              "If you want peace of mind heading into storm season",
            ].map(item => (
              <li key={item} className="flex items-start gap-3 text-text-muted">
                <CheckCircle2 size={18} className="text-primary flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Our Inspection Process</h2>
          <ol className="space-y-4 mb-8">
            {[
              { n: "1", title: "Schedule Your Free Inspection", desc: "Call us or fill out the form below. We'll arrange a time that works for you, typically within a few days." },
              { n: "2", title: "On-Site Inspection", desc: "Our inspector arrives on time and conducts a thorough physical inspection of your roof, gutters, and attic (if accessible). This typically takes 30–60 minutes." },
              { n: "3", title: "Photo Documentation", desc: "We photograph any areas of concern so you can see exactly what we're talking about. No guessing, no vague descriptions." },
              { n: "4", title: "Honest Assessment", desc: "We walk you through our findings in plain language. If your roof is in great shape, we'll tell you. If we find problems, we'll explain your options without any pressure." },
              { n: "5", title: "Written Report (if needed)", desc: "If you need a written inspection report for insurance purposes, a home sale, or your own records, we can provide one." },
            ].map(({ n, title, desc }) => (
              <li key={n} className="flex gap-4">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">{n}</div>
                <div>
                  <h3 className="font-bold text-primary">{title}</h3>
                  <p className="text-text-muted text-sm mt-1">{desc}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 text-center mb-8">
            <Search className="text-primary mx-auto mb-3" size={36} />
            <h3 className="text-xl font-bold text-primary mb-2">No Obligation. No Pressure. Ever.</h3>
            <p className="text-text-muted max-w-xl mx-auto">
              We believe you deserve honest information about your roof before making any decisions. Our free inspections come with zero pressure to buy anything. If you don't need work done, we'll tell you. If you do, we'll give you a fair estimate and let you decide.
            </p>
          </div>
        </div>
      </section>

      {/* GHL FORM */}
      <section className="py-12 px-4 bg-bg-alt">
        <div className="max-w-2xl mx-auto">
          <GHLForm type="inspection" title="Schedule Your Free Roof Inspection" />
        </div>
      </section>

      <CTABanner
        heading="Schedule Your Free Roof Inspection Today"
        subtext="No obligation, no pressure — just an honest look at your roof."
        ctaText="Book Free Inspection"
      />

      <FAQ faqs={faqs} heading="Roof Inspection FAQs" />
    </>
  );
}
