import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, Phone, Building2 } from 'lucide-react';
import Breadcrumbs from '../../../components/Breadcrumbs';
import CTABanner from '../../../components/CTABanner';
import FAQ from '../../../components/FAQ';
import GHLForm from '../../../components/GHLForm';
import SchemaMarkup from '../../../components/SchemaMarkup';
import { serviceSchema, faqSchema } from '../../../lib/schema';
import config from '../../../lib/config';

export const metadata = {
  title: "Commercial Roofing Nashville TN | Stellar Roofing & Restorations",
  description: "Commercial roofing services in Nashville, TN. Flat roofs, TPO, metal, roof replacement and repair for businesses. Free estimates. Call (629) 277-4249.",
  alternates: { canonical: 'https://thestellarroofing.com/services/commercial-roofing' },
};

const faqs = [
  { question: "What types of commercial roofing do you install?", answer: "We install a range of commercial roofing systems including TPO (thermoplastic polyolefin), EPDM rubber roofing, modified bitumen, metal roofing, and built-up roofing (BUR). The best system for your building depends on your roof slope, climate, budget, and building use." },
  { question: "Can you work around our business hours?", answer: "Yes. We understand that your business can't stop for a roof. We work with you to schedule roofing work during off-hours, weekends, or in phases to minimize disruption to your operations." },
  { question: "Do you handle commercial insurance claims?", answer: "Absolutely. Commercial storm damage claims work similarly to residential claims. We document the damage thoroughly and work with your insurance adjuster to ensure your claim accurately reflects the scope of work required." },
  { question: "How long does a commercial roof last?", answer: "Commercial roofing lifespan varies by system. TPO and EPDM typically last 20–30 years. Metal roofing can last 40+ years. Built-up roofing lasts 15–25 years. Proper installation and regular maintenance are the biggest factors in maximizing lifespan." },
];

export default function CommercialRoofingPage() {
  const svcSchema = serviceSchema({
    name: "Commercial Roofing",
    description: "Commercial roofing installation and repair in Nashville, TN. Flat roofs, TPO, metal, and more for businesses of all sizes.",
    url: "https://thestellarroofing.com/services/commercial-roofing",
  });
  const faqSchemaData = faqSchema(faqs);

  return (
    <>
      <SchemaMarkup schema={svcSchema} />
      <SchemaMarkup schema={faqSchemaData} />

      <Breadcrumbs items={[
        { name: "Home", path: "/" },
        { name: "Services", path: "/#services" },
        { name: "Commercial Roofing", path: "/services/commercial-roofing" },
      ]} />

      {/* HERO */}
      <section className="relative h-72 md:h-96 flex items-center">
        <Image
          src="/images/service-commercial.jpg"
          alt="Commercial roofing in Nashville, TN"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-primary/75" />
        <div className="relative z-10 px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Commercial Roofing in Nashville, TN</h1>
          <p className="text-white/90 text-xl mb-6">Minimal downtime. Quality systems. Businesses of all sizes.</p>
          <a href={`tel:${config.business.phoneRaw}`} className="inline-flex items-center gap-2 bg-white hover:bg-white/90 text-primary font-bold px-6 py-3 rounded-lg transition-colors">
            <Phone size={18} /> Call {config.business.phone}
          </a>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-text-muted leading-relaxed mb-8">
            Stellar Roofing &amp; Restorations provides commercial roofing services in Nashville and Middle Tennessee for businesses of all sizes. From flat roof replacement to metal roofing systems, our team has the experience to handle commercial projects efficiently, professionally, and on your schedule. We work around your business hours to minimize disruption and deliver roofing systems designed for durability and long-term performance.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Commercial Roofing Systems We Install</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {[
              { title: "TPO (Thermoplastic Polyolefin)", desc: "One of the most popular flat roofing systems. TPO offers excellent UV resistance, energy efficiency, and weldable seams. Ideal for low-slope commercial roofs." },
              { title: "EPDM Rubber Roofing", desc: "A durable, cost-effective option for low-slope roofs. EPDM is resistant to UV radiation and ozone, and performs well in a variety of weather conditions." },
              { title: "Metal Roofing", desc: "Long-lasting (40+ years), extremely durable, and energy-efficient. Metal roofing systems can be installed on both steep and low-slope commercial roofs." },
              { title: "Modified Bitumen", desc: "A multi-layer asphalt system ideal for flat and low-slope roofs. Modified bitumen provides excellent waterproofing and is a reliable, proven commercial roofing solution." },
              { title: "Built-Up Roofing (BUR)", desc: "Traditional multi-layer roofing system using alternating layers of bitumen and reinforcing fabric. Known for its redundancy and durability in commercial applications." },
              { title: "Roof Coatings & Restoration", desc: "If your commercial roof is structurally sound but weathered, a roof coating system may extend its life by 10–15 years at a fraction of replacement cost." },
            ].map(({ title, desc }) => (
              <div key={title} className="bg-bg-alt rounded-xl p-5">
                <h3 className="font-bold text-primary mb-2">{title}</h3>
                <p className="text-text-muted text-sm">{desc}</p>
              </div>
            ))}
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Industries We Serve</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
            {[
              "Office Buildings",
              "Retail Stores",
              "Restaurants",
              "Warehouses",
              "Multi-Family Properties",
              "Churches & Religious Buildings",
              "Schools & Educational Facilities",
              "Industrial Buildings",
              "HOAs & Community Centers",
            ].map(industry => (
              <div key={industry} className="flex items-center gap-2 bg-bg-alt rounded-lg px-4 py-3 text-sm text-text-muted">
                <Building2 size={14} className="text-primary flex-shrink-0" />
                {industry}
              </div>
            ))}
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Why Businesses Choose Stellar Roofing</h2>
          <ul className="space-y-3 mb-8">
            {[
              "We work around your business hours — evenings, weekends, or phased scheduling available",
              "Detailed project management with clear timelines and milestones",
              "Commercial insurance claims assistance for storm or wind damage",
              "Licensed, insured, and experienced with commercial roofing projects in Nashville",
              "Transparent pricing with no hidden fees or change orders without your approval",
              "Warranty-backed workmanship on all commercial installations",
            ].map(item => (
              <li key={item} className="flex items-start gap-3 text-text-muted">
                <CheckCircle2 size={18} className="text-primary flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Ongoing Maintenance Programs</h2>
          <p className="text-text-muted leading-relaxed mb-4">
            Proactive maintenance is the best way to protect your commercial roofing investment. Our maintenance programs include twice-yearly inspections, cleaning of drains and gutters, minor repairs, and written condition reports. Catching issues early prevents costly emergency repairs and extends the life of your commercial roofing system significantly.
          </p>
          <p className="text-text-muted leading-relaxed mb-8">
            Ask about our commercial maintenance program when you call for a free estimate.
          </p>
        </div>
      </section>

      {/* GHL FORM */}
      <section className="py-12 px-4 bg-bg-alt">
        <div className="max-w-2xl mx-auto">
          <GHLForm type="quote" title="Request a Commercial Roofing Estimate" />
        </div>
      </section>

      <CTABanner
        heading="Need a Commercial Roofing Quote?"
        subtext="We'll assess your building and provide a detailed estimate with no obligation."
        ctaText="Get Free Commercial Estimate"
      />

      <FAQ faqs={faqs} heading="Commercial Roofing FAQs" />
    </>
  );
}
