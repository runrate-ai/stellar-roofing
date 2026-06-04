import Image from 'next/image';
import { CheckCircle2, Phone, Search } from 'lucide-react';
import Breadcrumbs from '../../../../components/Breadcrumbs';
import CTABanner from '../../../../components/CTABanner';
import FAQ from '../../../../components/FAQ';
import GHLForm from '../../../../components/GHLForm';
import SchemaMarkup from '../../../../components/SchemaMarkup';
import { serviceSchema, faqSchema } from '../../../../lib/schema';
import config from '../../../../lib/config';

const loc = config.locations.boise;

export const metadata = {
  title: "Free Roof Inspection Boise ID | Wind & Storm Damage Assessment | Stellar Roofing",
  description: "Free roof inspection in Boise, ID — wind damage, UV wear, winter damage, and more. No obligation, no sales pressure. Honest report with photos. Call today.",
  alternates: { canonical: 'https://thestellarroofing.com/boise/services/roof-inspection' },
};

const faqs = [
  { question: "Is the roof inspection really free?", answer: "Yes, completely free. There is no charge for the inspection and no obligation to hire us for any work. We believe Boise homeowners deserve honest information about their roof's condition without any sales pressure." },
  { question: "What does a Boise roof inspection include?", answer: "We physically get on your roof and conduct a thorough evaluation of your shingles (including wind and storm damage assessment), flashing, gutters, ventilation, and decking. We also check for UV degradation from Idaho's intense summer sun and any signs of winter-related damage." },
  { question: "When should I get a roof inspection in Boise?", answer: "After any significant wind event or storm, if you notice water stains or dripping in your home, if your roof is 15+ years old, before buying or selling a home, or heading into winter to confirm your roof can handle snow loads." },
  { question: "What happens if you find wind or storm damage during the inspection?", answer: "We'll show you exactly what we found — with photos — and explain your options. If the damage is insurance-claimable, we'll walk you through the claims process. There's never any pressure to commit on the spot." },
];

export default function RoofInspectionBoisePage() {
  const svcSchema = serviceSchema({
    name: "Free Roof Inspection in Boise, ID",
    description: "Free, no-obligation roof inspections in Boise, ID. We check for wind damage, storm damage, UV wear, winter damage, and general roof condition.",
    url: "https://thestellarroofing.com/boise/services/roof-inspection",
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
        { name: "Roof Inspection", path: "/boise/services/roof-inspection" },
      ]} />

      <section className="relative h-72 md:h-96 flex items-center">
        <Image src="/images/service-inspection.jpg" alt="Free roof inspection in Boise, ID" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-primary/75" />
        <div className="relative z-10 px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Free Roof Inspection in Boise, ID</h1>
          <p className="text-white/90 text-xl mb-6">No obligation. No pressure. Just honest answers.</p>
          <a href={`tel:${loc.phoneRaw}`} className="inline-flex items-center gap-2 bg-white hover:bg-white/90 text-primary font-bold px-6 py-3 rounded-lg transition-colors">
            <Phone size={18} /> Call {loc.phone}
          </a>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-text-muted leading-relaxed mb-8">
            Stellar Roofing &amp; Restorations offers free, no-obligation roof inspections to homeowners throughout Boise and the Treasure Valley. Our experienced team will assess the current condition of your roof — paying close attention to the specific damage patterns caused by Idaho's wind events, UV exposure, and winter weather — and give you a completely honest evaluation.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">What We Check in a Boise Roof Inspection</h2>
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {[
              { title: "Wind & Storm Damage", desc: "Treasure Valley wind events can lift shingles, crack ridge caps, and damage flashing — damage that may not be obvious from the ground. We know exactly what to look for and how to document it for insurance claims." },
              { title: "UV & Heat Wear", desc: "Boise's intense summer sun accelerates shingle aging. We assess granule loss, dryness, cracking, and blistering — all signs of UV degradation." },
              { title: "Flashing", desc: "We inspect all flashing at roof penetrations, valleys, chimneys, and skylights — a common failure point that causes leaks." },
              { title: "Gutters & Drainage", desc: "We check for granule buildup in gutters (a sign of shingle wear), improper slope, detachment, and damage from ice or wind-driven debris." },
              { title: "Winter Damage", desc: "We check for ice dam damage, freeze-thaw related cracking, and any areas where snow accumulation has stressed the roofing system." },
              { title: "Ventilation", desc: "Proper attic ventilation is critical in Idaho's climate — it prevents summer heat buildup and winter ice dam formation. We assess your entire ventilation system." },
            ].map(({ title, desc }) => (
              <div key={title} className="bg-bg-alt rounded-xl p-5">
                <h3 className="font-bold text-primary mb-1">{title}</h3>
                <p className="text-text-muted text-sm">{desc}</p>
              </div>
            ))}
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">When to Schedule a Roof Inspection in Boise</h2>
          <ul className="space-y-3 mb-8">
            {[
              "After any significant wind event or storm in the Treasure Valley",
              "If you notice water stains, dripping, or mold on your ceiling or in your attic",
              "If your roof is 15 years or older and hasn't been recently inspected",
              "Before buying or selling a home in the Boise area",
              "Before Idaho's winter season — know your roof can handle snow loads",
              "If you're considering filing an insurance claim for storm damage",
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
            <p className="text-text-muted max-w-xl mx-auto">If your roof is in great shape, we'll tell you. If we find problems, we'll explain your options clearly. No high-pressure sales tactics — ever.</p>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-bg-alt">
        <div className="max-w-2xl mx-auto">
          <GHLForm type="inspection" title="Schedule Your Free Roof Inspection in Boise" />
        </div>
      </section>

      <CTABanner heading="Schedule Your Free Boise Roof Inspection" subtext="No obligation, no pressure — just an honest assessment of your roof." ctaText="Book Free Inspection" phone={loc.phone} phoneRaw={loc.phoneRaw} />
      <FAQ faqs={faqs} heading="Roof Inspection FAQs — Boise, ID" />
    </>
  );
}
