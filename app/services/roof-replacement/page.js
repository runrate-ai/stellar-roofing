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
  title: "Roof Replacement Nashville TN | Free Estimates | Stellar Roofing",
  description: "Professional roof replacement in Nashville, TN. Lifetime warranty, free estimates, insurance claims help. Stellar Roofing & Restorations — call (629) 277-4249.",
  alternates: { canonical: 'https://thestellarroofing.com/services/roof-replacement' },
};

const faqs = [
  { question: "How long does a roof replacement take in Nashville?", answer: "Most residential roof replacements take 1–2 days. Larger or more complex roofs may take 2–3 days. We work efficiently and clean up completely before we leave." },
  { question: "What type of shingles do you install?", answer: "We install architectural (dimensional) shingles, 3-tab shingles, and premium designer shingles from top manufacturers. Architectural shingles are our most popular choice due to their durability and appearance." },
  { question: "Do you offer a warranty on roof replacements?", answer: "Yes — we offer a lifetime workmanship warranty on all roof replacements. Combined with manufacturer warranties on materials, you're fully covered." },
  { question: "Will my insurance pay for a roof replacement?", answer: "If your roof was damaged by a covered event like hail, wind, or storm, your homeowners insurance should cover most or all of the cost. We help you navigate the claims process from start to finish." },
  { question: "How much does a roof replacement cost in Nashville?", answer: "Most residential roof replacements in Nashville range from $15,000 to $30,000. The cost depends on roof size, pitch, materials selected, and complexity. We provide free, detailed estimates so there are no surprises." },
];

export default function RoofReplacementPage() {
  const svcSchema = serviceSchema({
    name: "Roof Replacement",
    description: "Professional roof replacement services in Nashville, TN and Middle Tennessee. Lifetime warranty, free estimates, insurance claims assistance.",
    url: "https://thestellarroofing.com/services/roof-replacement",
  });
  const faqSchemaData = faqSchema(faqs);

  return (
    <>
      <SchemaMarkup schema={svcSchema} />
      <SchemaMarkup schema={faqSchemaData} />

      <Breadcrumbs items={[
        { name: "Home", path: "/" },
        { name: "Services", path: "/#services" },
        { name: "Roof Replacement", path: "/services/roof-replacement" },
      ]} />

      {/* HERO */}
      <section className="relative h-72 md:h-96 flex items-center">
        <Image
          src="/images/service-roof-replacement.jpg"
          alt="Roof replacement in Nashville, TN"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-primary/75" />
        <div className="relative z-10 px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Roof Replacement in Nashville, TN</h1>
          <p className="text-white/90 text-xl mb-6">Lifetime warranty. Free estimates. Insurance claims help.</p>
          <a href={`tel:${config.business.phoneRaw}`} className="inline-flex items-center gap-2 bg-white hover:bg-white/90 text-primary font-bold px-6 py-3 rounded-lg transition-colors">
            <Phone size={18} /> Call {config.business.phone}
          </a>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">When Does Your Roof Need to Be Replaced?</h2>
          <p className="text-text-muted leading-relaxed mb-6">
            Most roofs in Nashville last between 20 and 30 years, depending on the materials used and how well they've been maintained. When your roof reaches the end of its lifespan — or suffers significant damage from a storm — a full replacement is often the most cost-effective long-term solution. Stellar Roofing &amp; Restorations provides professional roof replacement services throughout Nashville and Middle Tennessee, using high-quality materials and proven installation methods.
          </p>
          <p className="text-text-muted leading-relaxed mb-8">
            Signs you may need a roof replacement include widespread shingle curling or cracking, large amounts of granule loss in gutters, visible sagging, persistent leaks that keep returning despite repairs, or a roof that's simply reached the end of its expected lifespan. During your free inspection, we'll give you an honest assessment and help you understand whether a repair or full replacement is the right call for your situation.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">How Much Does a Roof Replacement Cost in Nashville?</h2>
          <p className="text-text-muted leading-relaxed mb-4">
            A typical residential roof replacement in Nashville costs between <strong>$15,000 and $30,000</strong>. Several factors affect the final price:
          </p>
          <ul className="space-y-2 mb-8">
            {[
              "Roof size (measured in squares — 100 sq ft each)",
              "Roof pitch and complexity (valleys, dormers, skylights)",
              "Material choice (3-tab, architectural, or premium shingles)",
              "Tear-off and disposal of old roofing materials",
              "Decking repairs if needed",
              "Location and accessibility",
            ].map(item => (
              <li key={item} className="flex items-start gap-3 text-text-muted">
                <CheckCircle2 size={18} className="text-primary flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-text-muted leading-relaxed mb-8">
            We provide detailed, itemized estimates so you know exactly what you're paying for. We never use high-pressure sales tactics — just honest numbers and straightforward recommendations.
          </p>

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

          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Our Roof Replacement Process</h2>
          <ol className="space-y-4 mb-8">
            {[
              { n: "1", title: "Free Inspection & Estimate", desc: "We start with a comprehensive roof inspection at no cost. We assess the condition of your shingles, flashing, decking, gutters, and ventilation. You'll receive a detailed written estimate." },
              { n: "2", title: "Material Selection", desc: "We'll walk you through your material options and help you choose the right shingle color, style, and brand for your home and budget." },
              { n: "3", title: "Scheduling", desc: "Once you approve the estimate, we'll schedule your installation at a time that works for you. Most jobs are scheduled within 1–2 weeks." },
              { n: "4", title: "Installation Day", desc: "Our crew arrives on time, removes the old roofing, inspects and repairs the decking if needed, installs new underlayment, and installs your new shingles. We protect your landscaping and clean up thoroughly." },
              { n: "5", title: "Final Walkthrough", desc: "Before we leave, we do a complete walkthrough with you to make sure you're 100% satisfied. We also do a magnetic nail sweep of your yard." },
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

          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Insurance Claims Assistance</h2>
          <p className="text-text-muted leading-relaxed mb-4">
            If your roof was damaged by a storm, hail, or wind, there's a good chance your homeowners insurance will cover a significant portion of the replacement cost. Stellar Roofing &amp; Restorations is experienced in working with insurance companies throughout the Nashville area. We can:
          </p>
          <ul className="space-y-2 mb-8">
            {[
              "Document all damage thoroughly with photos and written reports",
              "Meet with your insurance adjuster on-site",
              "Provide a detailed estimate that matches insurance scope of work",
              "Help you understand your policy and what you're entitled to",
              "Handle the paperwork and back-and-forth so you don't have to",
            ].map(item => (
              <li key={item} className="flex items-start gap-3 text-text-muted">
                <CheckCircle2 size={18} className="text-primary flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Lifetime Warranty</h2>
          <p className="text-text-muted leading-relaxed mb-8">
            Every roof replacement completed by Stellar Roofing &amp; Restorations comes with a lifetime workmanship warranty. This covers any issues related to how the roof was installed — not just material defects. Combined with the manufacturer's material warranty (typically 25–50 years depending on the shingle line), you have comprehensive coverage and real peace of mind. If something goes wrong, we'll make it right.
          </p>
        </div>
      </section>

      {/* GHL FORM */}
      <section className="py-12 px-4 bg-bg-alt">
        <div className="max-w-2xl mx-auto">
          <GHLForm type="quote" title="Get Your Free Roof Replacement Estimate" />
        </div>
      </section>

      <CTABanner
        heading="Ready to Replace Your Roof?"
        subtext="Get a free, no-obligation estimate from Nashville's trusted roofing team."
        ctaText="Schedule Free Estimate"
      />

      <FAQ faqs={faqs} heading="Roof Replacement FAQs" />
    </>
  );
}
