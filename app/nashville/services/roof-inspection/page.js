import Image from 'next/image';
import { CheckCircle2, Phone, Search } from 'lucide-react';
import Breadcrumbs from '../../../../components/Breadcrumbs';
import CTABanner from '../../../../components/CTABanner';
import FAQ from '../../../../components/FAQ';
import GHLForm from '../../../../components/GHLForm';
import SchemaMarkup from '../../../../components/SchemaMarkup';
import { serviceSchema, faqSchema } from '../../../../lib/schema';
import config from '../../../../lib/config';

const loc = config.locations.nashville;

export const metadata = {
  title: "Free Roof Inspection Nashville TN | No Obligation, No Pressure | Stellar Roofing",
  description: "Free roof inspection in Nashville, TN — no obligation, no sales pressure. We check shingles, flashing, gutters, ventilation & attic. Honest report. Call (629) 277-4249.",
  alternates: { canonical: 'https://thestellarroofing.com/nashville/services/roof-inspection' },
};

const faqs = [
  { question: "Is the roof inspection really free?", answer: "Yes, completely free. There is no charge for the inspection and no obligation to hire us for any work. We believe homeowners deserve honest information about the condition of their roof without any sales pressure." },
  { question: "How long does a roof inspection take?", answer: "Most residential roof inspections take 30–60 minutes. We'll physically inspect your roof as well as check your attic if accessible. Afterward, we'll walk you through our findings and answer any questions." },
  { question: "What happens if you find damage during the inspection?", answer: "We'll show you exactly what we found — with photos — and explain your options. We may recommend a repair, full replacement, or simply keeping an eye on a particular area. There is never any pressure to make a decision on the spot." },
  { question: "When should I get a roof inspection?", answer: "We recommend a professional inspection after any significant storm, if you notice water stains on your ceiling, if your roof is more than 15 years old, or before buying or selling a home. Catching issues early saves money." },
];

export default function RoofInspectionNashvillePage() {
  const svcSchema = serviceSchema({
    name: "Free Roof Inspection in Nashville, TN",
    description: "Free, no-obligation roof inspections in Nashville, TN. Professional assessment of shingles, flashing, gutters, and ventilation.",
    url: "https://thestellarroofing.com/nashville/services/roof-inspection",
    areaServed: "Nashville, TN",
    phone: loc.phone,
  });

  return (
    <>
      <SchemaMarkup schema={svcSchema} />
      <SchemaMarkup schema={faqSchema(faqs)} />

      <Breadcrumbs items={[
        { name: "Home", path: "/nashville" },
        { name: "Services", path: "/nashville#services" },
        { name: "Roof Inspection", path: "/nashville/services/roof-inspection" },
      ]} />

      <section className="relative h-72 md:h-96 flex items-center">
        <Image src="/images/service-inspection.jpg" alt="Free roof inspection in Nashville, TN" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-primary/75" />
        <div className="relative z-10 px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Free Roof Inspection in Nashville, TN</h1>
          <p className="text-white/90 text-xl mb-6">No obligation. No pressure. Just honest answers.</p>
          <a href={`tel:${loc.phoneRaw}`} className="inline-flex items-center gap-2 bg-white hover:bg-white/90 text-primary font-bold px-6 py-3 rounded-lg transition-colors">
            <Phone size={18} /> Call {loc.phone}
          </a>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-text-muted leading-relaxed mb-8">
            Stellar Roofing &amp; Restorations offers free, no-obligation roof inspections to homeowners throughout Nashville and Middle Tennessee. Our experienced team will assess the current condition of your roof and give you a straightforward, honest evaluation — no pressure, no upselling, just the facts about what we find.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">What's Included in Our Free Roof Inspection</h2>
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
            ].map(item => (
              <li key={item} className="flex items-start gap-3 text-text-muted">
                <CheckCircle2 size={18} className="text-primary flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 text-center mb-8">
            <Search className="text-primary mx-auto mb-3" size={36} />
            <h3 className="text-xl font-bold text-primary mb-2">No Obligation. No Pressure. Ever.</h3>
            <p className="text-text-muted max-w-xl mx-auto">We believe you deserve honest information about your roof before making any decisions. If you don't need work done, we'll tell you. If you do, we'll give you a fair estimate and let you decide.</p>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-bg-alt">
        <div className="max-w-2xl mx-auto">
          <GHLForm type="inspection" title="Schedule Your Free Roof Inspection" />
        </div>
      </section>

      <CTABanner heading="Schedule Your Free Roof Inspection Today" subtext="No obligation, no pressure — just an honest look at your roof." ctaText="Book Free Inspection" phone={loc.phone} phoneRaw={loc.phoneRaw} />
      <FAQ faqs={faqs} heading="Roof Inspection FAQs" />
    </>
  );
}
