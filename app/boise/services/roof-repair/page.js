import Image from 'next/image';
import { CheckCircle2, Phone } from 'lucide-react';
import Breadcrumbs from '../../../../components/Breadcrumbs';
import CTABanner from '../../../../components/CTABanner';
import FAQ from '../../../../components/FAQ';
import GHLForm from '../../../../components/GHLForm';
import SchemaMarkup from '../../../../components/SchemaMarkup';
import { serviceSchema, faqSchema } from '../../../../lib/schema';
import config from '../../../../lib/config';

const loc = config.locations.boise;

export const metadata = {
  title: "Roof Repair Boise ID | Hail Damage, Leaks & Wind Damage | Stellar Roofing",
  description: "Fast roof repair in Boise, ID. Hail damage, active leaks, missing shingles, wind damage, flashing issues. Free estimates, no pressure. Call today — same-week service.",
  alternates: { canonical: 'https://thestellarroofing.com/boise/services/roof-repair' },
};

const faqs = [
  { question: "How much does roof repair cost in Boise?", answer: "Most roof repairs in Boise range from $400 to $2,500 depending on the type and extent of the damage. Minor repairs like fixing a few missing shingles or sealing a small leak are on the lower end. Flashing repairs, larger section repairs, or hail damage repairs will cost more. We provide free estimates so you know the cost upfront." },
  { question: "Should I repair or replace my Boise roof?", answer: "If your roof is less than 15–20 years old and the damage is isolated, repair is usually the right call. If your roof is older, the damage is widespread (particularly hail damage across a large portion of the roof), or you've had repeated leaks, replacement may be more cost-effective. We'll give you an honest recommendation after the inspection." },
  { question: "Can hail damage be repaired rather than replaced?", answer: "It depends on the extent of the damage. Minor hail damage affecting a small area can often be repaired. However, widespread hail damage that has compromised shingle integrity across most of the roof typically warrants replacement — and in many cases, insurance will cover it." },
  { question: "What are common roof problems in Boise?", answer: "Common issues in the Treasure Valley include hail damage (very common in Idaho), UV degradation from intense summer sun, wind damage from Treasure Valley gap winds, ice dam formation in winter, and flashing failures around chimneys and vents." },
];

export default function RoofRepairBoisePage() {
  const svcSchema = serviceSchema({
    name: "Roof Repair in Boise, ID",
    description: "Fast, reliable roof repair services in Boise, ID and the Treasure Valley. We fix hail damage, leaks, missing shingles, flashing issues, and more.",
    url: "https://thestellarroofing.com/boise/services/roof-repair",
    areaServed: "Boise, ID",
    phone: loc.phone,
  });

  return (
    <>
      <SchemaMarkup schema={svcSchema} />
      <SchemaMarkup schema={faqSchema(faqs)} />

      <Breadcrumbs items={[
        { name: "Boise", path: "/boise" },
        { name: "Services", path: "/boise#services" },
        { name: "Roof Repair", path: "/boise/services/roof-repair" },
      ]} />

      <section className="relative h-72 md:h-96 flex items-center">
        <Image src="/images/service-roof-repair.jpg" alt="Roof repair in Boise, ID" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-primary/75" />
        <div className="relative z-10 px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Roof Repair in Boise, ID</h1>
          <p className="text-white/90 text-xl mb-6">Fast response. Honest assessments. Repairs that last in Idaho's climate.</p>
          <a href={`tel:${loc.phoneRaw}`} className="inline-flex items-center gap-2 bg-white hover:bg-white/90 text-primary font-bold px-6 py-3 rounded-lg transition-colors">
            <Phone size={18} /> Call {loc.phone}
          </a>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-text-muted leading-relaxed mb-8">
            Not every roofing issue requires a full replacement, and Stellar Roofing &amp; Restorations offers reliable roof repair services throughout Boise and the Treasure Valley. Idaho's climate creates unique roofing challenges — from hailstorm damage in spring to UV degradation in summer to ice formation in winter. Our team diagnoses the real source of your roofing problem and delivers honest repairs designed to last.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Common Roof Problems in Boise, ID</h2>
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {[
              { title: "Hail Damage", desc: "Idaho's spring hailstorms are one of the leading causes of roof damage in the Treasure Valley. Hail bruises and cracks shingles, accelerating wear and creating future leak points." },
              { title: "UV & Heat Damage", desc: "Boise's intense summer sun bakes asphalt shingles, causing them to dry out, curl, and crack faster than in many other climates. Regular inspection catches this early." },
              { title: "Wind Damage", desc: "The Treasure Valley is known for gap winds that can reach high speeds, lifting and tearing shingles off roofs. We replace damaged shingles to restore your weather barrier." },
              { title: "Ice Dam Formation", desc: "Winter freeze-thaw cycles can create ice dams at the roof's edge, causing water to back up under shingles and leak into your home. We repair the damage and improve ventilation." },
              { title: "Flashing Failure", desc: "Flashing around chimneys, skylights, and vents fails over time — especially with Idaho's temperature swings. We reseal or replace flashing to stop water intrusion." },
              { title: "Roof Leaks", desc: "We find the actual source of active leaks — not just patch visible symptoms. We trace water intrusion to its origin and fix it properly the first time." },
            ].map(({ title, desc }) => (
              <div key={title} className="bg-bg-alt rounded-xl p-5">
                <h3 className="font-bold text-primary mb-1">{title}</h3>
                <p className="text-text-muted text-sm">{desc}</p>
              </div>
            ))}
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Repair Cost Estimates in Boise</h2>
          <div className="bg-bg-alt rounded-xl p-6 mb-8">
            <div className="grid grid-cols-2 gap-4 text-sm">
              {[
                { type: "Minor shingle repair (1–5 shingles)", range: "$250 – $600" },
                { type: "Flashing repair or replacement", range: "$400 – $900" },
                { type: "Pipe boot replacement", range: "$150 – $350" },
                { type: "Ice dam damage repair", range: "$500 – $1,500" },
                { type: "Larger section repair", range: "$1,000 – $2,500" },
                { type: "Valley repair", range: "$600 – $1,500" },
              ].map(({ type, range }) => (
                <div key={type} className="flex justify-between gap-4 py-2 border-b border-slate-200 last:border-0">
                  <span className="text-text-muted">{type}</span>
                  <span className="font-semibold text-primary whitespace-nowrap">{range}</span>
                </div>
              ))}
            </div>
            <p className="text-text-muted text-xs mt-4">*Price ranges are estimates. Final cost depends on roof pitch, access, and materials. We provide free, written estimates before any work begins.</p>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-bg-alt">
        <div className="max-w-2xl mx-auto">
          <GHLForm type="quote" title="Request a Free Roof Repair Estimate in Boise" />
        </div>
      </section>

      <CTABanner heading="Got a Roof Problem in Boise? We Can Help." subtext="Fast, honest roof repairs in the Treasure Valley. Free estimates, no pressure." ctaText="Get Free Estimate" phone={loc.phone} phoneRaw={loc.phoneRaw} />
      <FAQ faqs={faqs} heading="Roof Repair FAQs — Boise, ID" />
    </>
  );
}
