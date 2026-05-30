import Image from 'next/image';
import { CheckCircle2, Phone, Building2 } from 'lucide-react';
import Breadcrumbs from '../../../../components/Breadcrumbs';
import CTABanner from '../../../../components/CTABanner';
import FAQ from '../../../../components/FAQ';
import GHLForm from '../../../../components/GHLForm';
import SchemaMarkup from '../../../../components/SchemaMarkup';
import { serviceSchema, faqSchema } from '../../../../lib/schema';
import config from '../../../../lib/config';

const loc = config.locations.boise;

export const metadata = {
  title: "Commercial Roofing Boise ID | TPO, Metal & Flat Roofs | Stellar Roofing",
  description: "Commercial roofing contractor in Boise, ID. TPO, EPDM, metal, flat roof replacement & repair. Hail damage claims, after-hours scheduling, free estimates. Call today.",
  alternates: { canonical: 'https://thestellarroofing.com/boise/services/commercial-roofing' },
};

const faqs = [
  { question: "What types of commercial roofing do you install in Boise?", answer: "We install TPO, EPDM rubber roofing, modified bitumen, metal roofing, and built-up roofing (BUR). The best system for your Boise building depends on your roof slope, budget, and building use. We'll recommend the right solution for Idaho's climate." },
  { question: "Can you work around our business hours?", answer: "Yes. We understand that your Boise business can't shut down for a roof. We work with you to schedule roofing work during off-hours, weekends, or in phases to minimize disruption to your operations." },
  { question: "Do you handle commercial hail damage claims in Idaho?", answer: "Absolutely. Commercial hail damage claims in Idaho are common and often covered by business insurance policies. We document the damage thoroughly and work with your adjuster to ensure your claim is complete." },
  { question: "What commercial roofing systems work best in Idaho?", answer: "TPO is a popular choice for Boise's commercial buildings — it reflects UV radiation, which is important given Idaho's intense summer sun, and performs well in snow. Metal roofing is excellent for its longevity and ability to shed snow. We'll help you choose the right system for your building and budget." },
];

export default function CommercialRoofingBoisePage() {
  const svcSchema = serviceSchema({
    name: "Commercial Roofing in Boise, ID",
    description: "Commercial roofing installation and repair in Boise, ID and the Treasure Valley. TPO, metal, flat roofs, and more for businesses of all sizes.",
    url: "https://thestellarroofing.com/boise/services/commercial-roofing",
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
        { name: "Commercial Roofing", path: "/boise/services/commercial-roofing" },
      ]} />

      <section className="relative h-72 md:h-96 flex items-center">
        <Image src="/images/service-commercial.jpg" alt="Commercial roofing in Boise, ID" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-primary/75" />
        <div className="relative z-10 px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Commercial Roofing in Boise, ID</h1>
          <p className="text-white/90 text-xl mb-6">Built for Idaho's climate. Minimal downtime. All sizes.</p>
          <a href={`tel:${loc.phoneRaw}`} className="inline-flex items-center gap-2 bg-white hover:bg-white/90 text-primary font-bold px-6 py-3 rounded-lg transition-colors">
            <Phone size={18} /> Call {loc.phone}
          </a>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-text-muted leading-relaxed mb-8">
            Stellar Roofing &amp; Restorations provides commercial roofing services throughout Boise and the Treasure Valley for businesses of all sizes. Boise's rapid growth means commercial construction and re-roofing demand has never been higher. Our team brings professional project management, climate-appropriate materials, and scheduling flexibility to every commercial project we take on.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Commercial Roofing Systems for Idaho's Climate</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {[
              { title: "TPO (Thermoplastic Polyolefin)", desc: "An excellent choice for Boise's commercial roofs. TPO reflects UV radiation (critical in Idaho's high-UV environment), offers energy efficiency, and provides welded seams that handle temperature swings well." },
              { title: "EPDM Rubber Roofing", desc: "Durable and cost-effective for low-slope commercial roofs. EPDM performs well in Idaho's temperature extremes and is resistant to UV and ozone degradation." },
              { title: "Metal Roofing", desc: "An outstanding choice for Idaho. Metal roofs shed snow effectively, withstand hail better than other systems, last 40+ years, and are highly energy-efficient in both summer and winter." },
              { title: "Modified Bitumen", desc: "A multi-layer waterproofing system for flat and low-slope roofs. Reliable and proven for commercial applications throughout the Mountain West." },
              { title: "Built-Up Roofing (BUR)", desc: "Traditional multi-layer roofing system offering redundant waterproofing — a good choice for high-traffic commercial roofs where durability is the priority." },
              { title: "Roof Coatings & Restoration", desc: "A cost-effective option for structurally sound commercial roofs that need UV protection and waterproofing. Can extend roof life by 10–15 years." },
            ].map(({ title, desc }) => (
              <div key={title} className="bg-bg-alt rounded-xl p-5">
                <h3 className="font-bold text-primary mb-2">{title}</h3>
                <p className="text-text-muted text-sm">{desc}</p>
              </div>
            ))}
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Industries We Serve in Boise</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
            {["Office Buildings", "Retail Stores", "Restaurants", "Warehouses", "Multi-Family Properties", "Churches & Religious Buildings", "Schools & Educational Facilities", "Industrial Buildings", "HOAs & Community Centers"].map(industry => (
              <div key={industry} className="flex items-center gap-2 bg-bg-alt rounded-lg px-4 py-3 text-sm text-text-muted">
                <Building2 size={14} className="text-primary flex-shrink-0" />{industry}
              </div>
            ))}
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Why Boise Businesses Choose Stellar Roofing</h2>
          <ul className="space-y-3 mb-8">
            {[
              "We work around your business hours — evenings, weekends, or phased scheduling available",
              "Experience with commercial hail damage claims — common in the Treasure Valley",
              "Materials chosen for Idaho's specific climate challenges (UV, hail, snow loads)",
              "Licensed, insured, and experienced with commercial roofing in the Boise area",
              "Transparent pricing with no hidden fees or change orders without your approval",
              "Warranty-backed workmanship on all commercial installations",
            ].map(item => (
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
          <GHLForm type="quote" title="Request a Commercial Roofing Estimate in Boise" />
        </div>
      </section>

      <CTABanner heading="Need a Commercial Roofing Quote in Boise?" subtext="We'll assess your building and provide a detailed estimate with no obligation." ctaText="Get Free Commercial Estimate" phone={loc.phone} phoneRaw={loc.phoneRaw} />
      <FAQ faqs={faqs} heading="Commercial Roofing FAQs — Boise, ID" />
    </>
  );
}
