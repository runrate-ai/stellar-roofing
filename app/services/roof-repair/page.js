import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, Phone } from 'lucide-react';
import Breadcrumbs from '../../../components/Breadcrumbs';
import CTABanner from '../../../components/CTABanner';
import FAQ from '../../../components/FAQ';
import GHLForm from '../../../components/GHLForm';
import SchemaMarkup from '../../../components/SchemaMarkup';
import { serviceSchema, faqSchema } from '../../../lib/schema';
import config from '../../../lib/config';

export const metadata = {
  title: "Roof Repair Nashville TN | Fast & Reliable | Stellar Roofing",
  description: "Fast, reliable roof repair in Nashville, TN. Leaks, missing shingles, storm damage, flashing issues. Free estimates. Call Stellar Roofing at (629) 277-4249.",
  alternates: { canonical: 'https://thestellarroofing.com/services/roof-repair' },
};

const faqs = [
  { question: "How much does roof repair cost in Nashville?", answer: "Most roof repairs in Nashville range from $500 to $2,500 depending on the type and extent of the damage. Minor repairs like fixing a few missing shingles or sealing a small leak are on the lower end. More extensive repairs involving flashing, decking, or multiple damaged areas will cost more. We provide free estimates so you know the cost upfront." },
  { question: "Should I repair or replace my roof?", answer: "If your roof is less than 15–20 years old and the damage is isolated to a specific area, repair is usually the right call. If your roof is older, the damage is widespread, or you've had repeated leaks, replacement may be more cost-effective in the long run. We'll give you an honest recommendation after the inspection." },
  { question: "How quickly can you do an emergency roof repair?", answer: "For active leaks or urgent damage, we aim to respond the next day or sooner depending on our schedule. We'll assess the damage and either make a permanent repair or apply temporary protection to prevent further damage until a full repair can be completed." },
  { question: "What are common causes of roof leaks in Nashville?", answer: "Common causes include damaged or missing shingles, cracked or deteriorated flashing around chimneys and vents, clogged gutters causing water backup, damaged pipe boot collars, and storm damage from hail or wind. A thorough inspection can identify the exact cause." },
];

export default function RoofRepairPage() {
  const svcSchema = serviceSchema({
    name: "Roof Repair",
    description: "Fast, reliable roof repair services in Nashville, TN. We fix leaks, damaged shingles, flashing issues, and storm damage.",
    url: "https://thestellarroofing.com/services/roof-repair",
  });
  const faqSchemaData = faqSchema(faqs);

  return (
    <>
      <SchemaMarkup schema={svcSchema} />
      <SchemaMarkup schema={faqSchemaData} />

      <Breadcrumbs items={[
        { name: "Home", path: "/" },
        { name: "Services", path: "/#services" },
        { name: "Roof Repair", path: "/services/roof-repair" },
      ]} />

      {/* HERO */}
      <section className="relative h-72 md:h-96 flex items-center">
        <Image
          src="/images/service-roof-repair.jpg"
          alt="Roof repair in Nashville, TN"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-primary/75" />
        <div className="relative z-10 px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Roof Repair in Nashville, TN</h1>
          <p className="text-white/90 text-xl mb-6">Fast response. Honest assessments. Repairs that last.</p>
          <a href={`tel:${config.business.phoneRaw}`} className="inline-flex items-center gap-2 bg-white hover:bg-white/90 text-primary font-bold px-6 py-3 rounded-lg transition-colors">
            <Phone size={18} /> Call {config.business.phone}
          </a>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-text-muted leading-relaxed mb-8">
            Not every roofing issue requires a full replacement, and Stellar Roofing &amp; Restorations offers reliable roof repair services in Nashville to fix leaks, damaged shingles, flashing issues, and other common roofing problems. Our team carefully inspects your roof to identify the source of the issue and provides honest solutions that restore the integrity of your roof while helping extend its lifespan and prevent more costly damage in the future.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">When to Repair vs. Replace Your Roof</h2>
          <p className="text-text-muted leading-relaxed mb-4">
            One of the most common questions homeowners ask is whether they should repair their roof or replace it entirely. The answer depends on several factors including the age of your roof, the extent of the damage, and the type of issues present.
          </p>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <h3 className="font-bold text-green-800 mb-3">Repair is usually right when:</h3>
              <ul className="space-y-2">
                {[
                  "Damage is isolated to a small area",
                  "Roof is less than 15–20 years old",
                  "Only a few shingles are damaged",
                  "Flashing or pipe boots need sealing",
                  "One-time storm damage on an otherwise sound roof",
                ].map(item => (
                  <li key={item} className="text-green-700 text-sm flex items-start gap-2">
                    <CheckCircle2 size={15} className="flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
              <h3 className="font-bold text-orange-800 mb-3">Replacement makes more sense when:</h3>
              <ul className="space-y-2">
                {[
                  "Roof is 20+ years old",
                  "Damage is widespread across multiple areas",
                  "You've had repeated leaks that keep coming back",
                  "Structural decking is compromised",
                  "More than 30% of shingles are damaged",
                ].map(item => (
                  <li key={item} className="text-orange-700 text-sm flex items-start gap-2">
                    <CheckCircle2 size={15} className="flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Common Roof Problems We Fix in Nashville</h2>
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {[
              { title: "Roof Leaks", desc: "We find the source of active leaks — not just patch visible symptoms. We trace water intrusion to its origin and fix it properly." },
              { title: "Missing or Damaged Shingles", desc: "High winds in Nashville are notorious for lifting and tearing shingles. We replace damaged shingles to restore your roof's weather barrier." },
              { title: "Flashing Failure", desc: "Flashing around chimneys, skylights, and vents is a common failure point. We reseal or replace flashing to stop water intrusion." },
              { title: "Pipe Boot Seals", desc: "Rubber pipe boot collars dry out and crack over time. We replace them before they cause interior water damage." },
              { title: "Gutter-Related Issues", desc: "Improperly installed or clogged gutters cause water to back up under shingles. We address roofline water management issues." },
              { title: "Hail Damage", desc: "Hail impacts may not cause immediate leaks but they accelerate shingle wear. We assess and repair hail damage before it becomes a bigger problem." },
            ].map(({ title, desc }) => (
              <div key={title} className="bg-bg-alt rounded-xl p-5">
                <h3 className="font-bold text-primary mb-1">{title}</h3>
                <p className="text-text-muted text-sm">{desc}</p>
              </div>
            ))}
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">How Much Does Roof Repair Cost in Nashville?</h2>
          <p className="text-text-muted leading-relaxed mb-4">
            Roof repair costs vary widely depending on the type and extent of the damage. Here's a general range for common repairs in the Nashville area:
          </p>
          <div className="bg-bg-alt rounded-xl p-6 mb-8">
            <div className="grid grid-cols-2 gap-4 text-sm">
              {[
                { type: "Minor shingle repair (1–5 shingles)", range: "$250 – $600" },
                { type: "Flashing repair or replacement", range: "$400 – $900" },
                { type: "Pipe boot replacement", range: "$150 – $350" },
                { type: "Leak diagnosis & minor repair", range: "$300 – $700" },
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

          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Emergency Roof Repair Availability</h2>
          <p className="text-text-muted leading-relaxed mb-4">
            When you have an active leak or storm-related damage, you can't wait days for someone to show up. Stellar Roofing &amp; Restorations prioritizes emergency calls. If you're dealing with an urgent roofing issue, call us directly and we'll do our best to get out to you as fast as possible — often the next morning or same day depending on availability and weather conditions.
          </p>
          <p className="text-text-muted leading-relaxed mb-8">
            In emergency situations, we can apply temporary waterproofing measures (tarping, emergency sealants) to protect your home while we arrange a permanent repair or replacement.
          </p>
        </div>
      </section>

      {/* GHL FORM */}
      <section className="py-12 px-4 bg-bg-alt">
        <div className="max-w-2xl mx-auto">
          <GHLForm type="quote" title="Request a Free Roof Repair Estimate" />
        </div>
      </section>

      <CTABanner
        heading="Got a Roof Leak? We Can Help."
        subtext="Fast, honest roof repairs in Nashville. Free estimates, no pressure."
        ctaText="Get Free Estimate"
      />

      <FAQ faqs={faqs} heading="Roof Repair FAQs" />
    </>
  );
}
