import Image from 'next/image';
import { CheckCircle2, Phone } from 'lucide-react';
import Breadcrumbs from '../../../../components/Breadcrumbs';
import CTABanner from '../../../../components/CTABanner';
import FAQ from '../../../../components/FAQ';
import GHLForm from '../../../../components/GHLForm';
import SchemaMarkup from '../../../../components/SchemaMarkup';
import { serviceSchema, faqSchema } from '../../../../lib/schema';
import config from '../../../../lib/config';

const loc = config.locations.nashville;

export const metadata = {
  title: "Roof Replacement Nashville TN | $15k–$30k | Lifetime Warranty | Stellar Roofing",
  description: "Expert roof replacement in Nashville, TN starting at $15,000. Lifetime warranty, free estimates, insurance claims help. Same-week scheduling. Call (629) 277-4249.",
  alternates: { canonical: 'https://thestellarroofing.com/nashville/services/roof-replacement' },
};

const faqs = [
  { question: "How long does a roof replacement take in Nashville?", answer: "Most residential roof replacements take 1–2 days. Larger or more complex roofs may take 2–3 days. We work efficiently and clean up completely before we leave." },
  { question: "What type of shingles do you install?", answer: "We install architectural (dimensional) shingles, 3-tab shingles, and premium designer shingles from top manufacturers. Architectural shingles are our most popular choice due to their durability and appearance." },
  { question: "Do you offer a warranty on roof replacements?", answer: "Yes — we offer a lifetime workmanship warranty on all roof replacements. Combined with manufacturer warranties on materials, you're fully covered." },
  { question: "Will my insurance pay for a roof replacement?", answer: "If your roof was damaged by a covered event like hail, wind, or storm, your homeowners insurance should cover most or all of the cost. We help you navigate the claims process from start to finish." },
  { question: "How much does a roof replacement cost in Nashville?", answer: "Most residential roof replacements in Nashville range from $15,000 to $30,000. The cost depends on roof size, pitch, materials selected, and complexity. We provide free, detailed estimates so there are no surprises." },
];

export default function RoofReplacementNashvillePage() {
  const svcSchema = serviceSchema({
    name: "Roof Replacement in Nashville, TN",
    description: "Professional roof replacement services in Nashville, TN and Middle Tennessee. Lifetime warranty, free estimates, insurance claims assistance.",
    url: "https://thestellarroofing.com/nashville/services/roof-replacement",
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
        { name: "Roof Replacement", path: "/nashville/services/roof-replacement" },
      ]} />

      <section className="relative h-72 md:h-96 flex items-center">
        <Image src="/images/service-roof-replacement.jpg" alt="Roof replacement in Nashville, TN" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-primary/75" />
        <div className="relative z-10 px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Roof Replacement in Nashville, TN</h1>
          <p className="text-white/90 text-xl mb-6">Lifetime warranty. Free estimates. Insurance claims help.</p>
          <a href={`tel:${loc.phoneRaw}`} className="inline-flex items-center gap-2 bg-white hover:bg-white/90 text-primary font-bold px-6 py-3 rounded-lg transition-colors">
            <Phone size={18} /> Call {loc.phone}
          </a>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">When Does Your Nashville Roof Need to Be Replaced?</h2>
          <p className="text-text-muted leading-relaxed mb-6">
            Most roofs in Nashville last between 20 and 30 years, depending on the materials used and how well they've been maintained. When your roof reaches the end of its lifespan — or suffers significant damage from a storm — a full replacement is often the most cost-effective long-term solution. Stellar Roofing &amp; Restorations provides professional roof replacement services throughout Nashville and Middle Tennessee, using high-quality materials and proven installation methods.
          </p>
          <p className="text-text-muted leading-relaxed mb-8">
            Signs you may need a roof replacement include widespread shingle curling or cracking, large amounts of granule loss in gutters, visible sagging, persistent leaks that keep returning despite repairs, or a roof that's simply reached the end of its expected lifespan.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">How Much Does a Roof Replacement Cost in Nashville?</h2>
          <p className="text-text-muted leading-relaxed mb-4">A typical residential roof replacement in Nashville costs between <strong>$15,000 and $30,000</strong>. Several factors affect the final price:</p>
          <ul className="space-y-2 mb-8">
            {["Roof size (measured in squares — 100 sq ft each)", "Roof pitch and complexity (valleys, dormers, skylights)", "Material choice (3-tab, architectural, or premium shingles)", "Tear-off and disposal of old roofing materials", "Decking repairs if needed", "Location and accessibility"].map(item => (
              <li key={item} className="flex items-start gap-3 text-text-muted">
                <CheckCircle2 size={18} className="text-primary flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Roofing Materials We Install</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[
              { title: "Architectural Shingles", desc: "Our most popular choice. Dimensional shingles offer excellent durability (25–30 year lifespan), great curb appeal, and good value. Available in dozens of colors." },
              { title: "3-Tab Shingles", desc: "A traditional, budget-friendly option. Best for lower-slope roofs or situations where cost is the primary factor. Typically carries a 20-year warranty." },
              { title: "Metal Roofing", desc: "Long-lasting (40–70 years), energy-efficient, and extremely durable. Great for homeowners looking for a premium, low-maintenance option." },
            ].map(({ title, desc }) => (
              <div key={title} className="bg-bg-alt rounded-xl p-6">
                <h3 className="font-bold text-primary mb-2">{title}</h3>
                <p className="text-text-muted text-sm">{desc}</p>
              </div>
            ))}
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Insurance Claims Assistance</h2>
          <p className="text-text-muted leading-relaxed mb-4">If your roof was damaged by a storm, hail, or wind, there's a good chance your homeowners insurance will cover a significant portion of the replacement cost. We can:</p>
          <ul className="space-y-2 mb-8">
            {["Document all damage thoroughly with photos and written reports", "Meet with your insurance adjuster on-site", "Provide a detailed estimate that matches insurance scope of work", "Help you understand your policy and what you're entitled to"].map(item => (
              <li key={item} className="flex items-start gap-3 text-text-muted">
                <CheckCircle2 size={18} className="text-primary flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Lifetime Warranty</h2>
          <p className="text-text-muted leading-relaxed mb-8">
            Every roof replacement completed by Stellar Roofing &amp; Restorations comes with a lifetime workmanship warranty. Combined with the manufacturer's material warranty (typically 25–50 years), you have comprehensive coverage and real peace of mind.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 bg-bg-alt">
        <div className="max-w-2xl mx-auto">
          <GHLForm type="quote" title="Get Your Free Roof Replacement Estimate" />
        </div>
      </section>

      <CTABanner heading="Ready to Replace Your Roof?" subtext="Get a free, no-obligation estimate from Nashville's trusted roofing team." ctaText="Schedule Free Estimate" phone={loc.phone} phoneRaw={loc.phoneRaw} />
      <FAQ faqs={faqs} heading="Roof Replacement FAQs" />
    </>
  );
}
