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
  title: "Roof Replacement Boise ID | Hail Damage & Insurance Claims | Stellar Roofing",
  description: "Expert roof replacement in Boise, ID. Hail damage specialists, insurance claims help, lifetime warranty, free estimates. Serving the Treasure Valley. Call today.",
  alternates: { canonical: 'https://thestellarroofing.com/boise/services/roof-replacement' },
};

const faqs = [
  { question: "How long does a roof replacement take in Boise?", answer: "Most residential roof replacements take 1–2 days. Larger or more complex roofs may take 2–3 days. We work efficiently and clean up completely before we leave." },
  { question: "What roofing materials work best in Boise's climate?", answer: "Architectural (dimensional) shingles are our most popular choice for Boise-area homes — they handle Idaho's temperature extremes well, resist UV degradation from intense summer sun, and perform well in snow. Metal roofing is an excellent premium option for its longevity and snow-shedding ability." },
  { question: "Do I need to worry about snow loads on my Boise roof?", answer: "Yes. The Treasure Valley can receive significant snowfall, and it's important that your roof is properly installed and ventilated to handle snow loads and prevent ice dams. All of our installations account for Idaho's winter conditions." },
  { question: "Will my insurance pay for a roof replacement in Boise?", answer: "If your roof was damaged by a covered event — hail, wind, or storm — your homeowners insurance should cover most or all of the cost. Idaho sees significant hail activity each year. We help you navigate the claims process from start to finish." },
  { question: "How much does a roof replacement cost in Boise?", answer: "Most residential roof replacements in Boise range from $12,000 to $28,000. The cost depends on roof size, pitch, materials selected, and complexity. We provide free, detailed estimates so there are no surprises." },
];

export default function RoofReplacementBoisePage() {
  const svcSchema = serviceSchema({
    name: "Roof Replacement in Boise, ID",
    description: "Professional roof replacement services in Boise, ID and the Treasure Valley. Lifetime warranty, free estimates, insurance claims assistance.",
    url: "https://thestellarroofing.com/boise/services/roof-replacement",
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
        { name: "Roof Replacement", path: "/boise/services/roof-replacement" },
      ]} />

      <section className="relative h-72 md:h-96 flex items-center">
        <Image src="/images/service-roof-replacement.jpg" alt="Roof replacement in Boise, ID" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-primary/75" />
        <div className="relative z-10 px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Roof Replacement in Boise, ID</h1>
          <p className="text-white/90 text-xl mb-6">Lifetime warranty. Free estimates. Built for Idaho's climate.</p>
          <a href={`tel:${loc.phoneRaw}`} className="inline-flex items-center gap-2 bg-white hover:bg-white/90 text-primary font-bold px-6 py-3 rounded-lg transition-colors">
            <Phone size={18} /> Call {loc.phone}
          </a>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">When Does Your Boise Roof Need to Be Replaced?</h2>
          <p className="text-text-muted leading-relaxed mb-6">
            Most roofs in Boise and the Treasure Valley last between 20 and 30 years, but Idaho's climate can accelerate that timeline. Intense UV exposure from summer sun dries out and cracks shingles faster than in many other regions. Annual hailstorms cause hidden damage that shortens shingle lifespan. And freeze-thaw cycles over winter can stress aging roofing systems. Stellar Roofing &amp; Restorations provides professional roof replacement services throughout Boise and the Treasure Valley, using materials and installation methods proven to perform in Idaho's demanding climate.
          </p>
          <p className="text-text-muted leading-relaxed mb-8">
            Signs you may need a roof replacement include widespread shingle curling or cracking, excessive granule loss in your gutters, visible sagging, persistent leaks, or a roof that's 20+ years old. During your free inspection, we'll give you an honest assessment and tell you whether a repair or full replacement is the right call.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">How Much Does a Roof Replacement Cost in Boise?</h2>
          <p className="text-text-muted leading-relaxed mb-4">A typical residential roof replacement in Boise ranges from <strong>$12,000 to $28,000</strong>. Factors that affect the price include:</p>
          <ul className="space-y-2 mb-8">
            {["Roof size (measured in squares — 100 sq ft each)", "Roof pitch and complexity (valleys, dormers, skylights)", "Material choice (architectural shingles, metal, etc.)", "Tear-off and disposal of old roofing materials", "Decking repairs if needed", "Location and accessibility"].map(item => (
              <li key={item} className="flex items-start gap-3 text-text-muted">
                <CheckCircle2 size={18} className="text-primary flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Roofing Materials for Idaho's Climate</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[
              { title: "Architectural Shingles", desc: "Our most popular choice for Boise homes. Handles UV exposure, temperature swings, and hail well. Excellent curb appeal and value. Available in dozens of colors." },
              { title: "Impact-Resistant Shingles", desc: "Class 4 impact-rated shingles offer maximum protection against Idaho's hailstorms. Many insurance companies offer premium discounts for impact-resistant shingles." },
              { title: "Metal Roofing", desc: "An excellent choice for Boise homes. Long-lasting (40–70 years), sheds snow effectively, handles UV exposure well, and is extremely durable in all weather conditions." },
            ].map(({ title, desc }) => (
              <div key={title} className="bg-bg-alt rounded-xl p-6">
                <h3 className="font-bold text-primary mb-2">{title}</h3>
                <p className="text-text-muted text-sm">{desc}</p>
              </div>
            ))}
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Insurance Claims for Idaho Hail Damage</h2>
          <p className="text-text-muted leading-relaxed mb-4">The Treasure Valley sees significant hail activity, particularly in spring and early summer. If your roof has hail damage, your homeowners insurance may cover most or all of the replacement cost. We can:</p>
          <ul className="space-y-2 mb-8">
            {["Document all hail damage thoroughly with photos and written reports", "Meet with your insurance adjuster on-site", "Provide a detailed estimate that matches insurance scope of work", "Help you supplement a low initial settlement if damage was missed"].map(item => (
              <li key={item} className="flex items-start gap-3 text-text-muted">
                <CheckCircle2 size={18} className="text-primary flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-12 px-4 bg-bg-alt">
        <div className="max-w-2xl mx-auto">
          <GHLForm type="quote" title="Get Your Free Roof Replacement Estimate in Boise" />
        </div>
      </section>

      <CTABanner heading="Ready to Replace Your Boise Roof?" subtext="Get a free, no-obligation estimate from the Treasure Valley's trusted roofing team." ctaText="Schedule Free Estimate" phone={loc.phone} phoneRaw={loc.phoneRaw} />
      <FAQ faqs={faqs} heading="Roof Replacement FAQs — Boise, ID" />
    </>
  );
}
