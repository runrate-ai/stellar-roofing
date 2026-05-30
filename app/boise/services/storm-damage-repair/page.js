import Image from 'next/image';
import { CheckCircle2, Phone, AlertTriangle } from 'lucide-react';
import Breadcrumbs from '../../../../components/Breadcrumbs';
import CTABanner from '../../../../components/CTABanner';
import FAQ from '../../../../components/FAQ';
import GHLForm from '../../../../components/GHLForm';
import SchemaMarkup from '../../../../components/SchemaMarkup';
import { serviceSchema, faqSchema } from '../../../../lib/schema';
import config from '../../../../lib/config';

const loc = config.locations.boise;

export const metadata = {
  title: "Hail Damage Roof Repair Boise ID | Free Inspection & Insurance Claims | Stellar Roofing",
  description: "Hail and storm damage roof repair in Boise, ID. Free inspection, complete insurance claims documentation, fast repairs. Ada & Canyon County. Call today.",
  alternates: { canonical: 'https://thestellarroofing.com/boise/services/storm-damage-repair' },
};

const faqs = [
  { question: "What should I do right after a hailstorm in Boise?", answer: "First, stay safe and don't go on the roof yourself. Document any damage you can see from the ground with photos. Call your insurance company to report the potential damage and then call us for a free inspection. We can meet with your adjuster and document everything properly." },
  { question: "Does insurance cover hail damage in Idaho?", answer: "In most cases, yes. Homeowners insurance typically covers hail damage. The Treasure Valley sees regular hail activity each year. We work directly with your insurance adjuster to make sure all damage is documented and you receive the full coverage you're entitled to." },
  { question: "How do I know if my Boise roof has hail damage?", answer: "Hail damage is often not visible from the ground. Signs include small circular dents on shingles, granule loss in gutters, dents on metal gutters and downspouts, or damaged window screens and AC units (these are often hit alongside the roof). A professional inspection is the only reliable way to assess hail damage." },
  { question: "How long do I have to file an insurance claim in Idaho?", answer: "Idaho homeowners insurance policies typically require claims to be filed within 1 year of the damage event, but this varies by policy. We recommend calling us and your insurance company as soon as possible after a storm." },
];

export default function StormDamageBoisePage() {
  const svcSchema = serviceSchema({
    name: "Storm Damage Roof Repair in Boise, ID",
    description: "Expert storm and hail damage roof repair in Boise, ID. We assess damage, document for insurance claims, and restore your Treasure Valley roof.",
    url: "https://thestellarroofing.com/boise/services/storm-damage-repair",
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
        { name: "Storm Damage Repair", path: "/boise/services/storm-damage-repair" },
      ]} />

      <section className="relative h-72 md:h-96 flex items-center">
        <Image src="/images/service-storm-damage.jpg" alt="Storm damage roof repair in Boise, ID" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-primary/75" />
        <div className="relative z-10 px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Hail &amp; Storm Damage Roof Repair in Boise, ID</h1>
          <p className="text-white/90 text-xl mb-6">Hail damage specialists. Insurance claims help. Free inspections throughout the Treasure Valley.</p>
          <a href={`tel:${loc.phoneRaw}`} className="inline-flex items-center gap-2 bg-white hover:bg-white/90 text-primary font-bold px-6 py-3 rounded-lg transition-colors">
            <Phone size={18} /> Call {loc.phone}
          </a>
        </div>
      </section>

      <div className="bg-primary/10 border-l-4 border-primary/30 py-4 px-6">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <AlertTriangle className="text-primary flex-shrink-0" size={22} />
          <p className="text-text-dark text-sm font-medium">Recent storm or hail damage? Call us now: <a href={`tel:${loc.phoneRaw}`} className="text-primary font-bold">{loc.phone}</a></p>
        </div>
      </div>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-text-muted leading-relaxed mb-8">
            Boise and the Treasure Valley experience a significant number of hailstorms each year — particularly during spring and early summer months. Hail damage can be deceptive; it often looks minor from the ground but has actually bruised shingle surfaces and accelerated granule loss, shortening the roof's lifespan by years. Stellar Roofing &amp; Restorations specializes in storm and hail damage assessment for Boise homeowners, providing thorough inspections, complete insurance claims documentation, and professional repairs or replacement.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Hail Damage Roof Repair in Boise — What You Need to Know</h2>
          <p className="text-text-muted leading-relaxed mb-4">
            The Treasure Valley is one of the most hail-active regions in the Pacific Northwest. Ada County and Canyon County both see multiple significant hail events between April and July most years. What makes Boise-area hail damage particularly important to address quickly: Idaho's intense summer UV exposure causes already-damaged shingles to deteriorate much faster than in other climates, turning what starts as cosmetic damage into active leaks within 1–2 storm seasons.
          </p>
          <p className="text-text-muted leading-relaxed mb-8">
            Most homeowners insurance policies in Idaho cover hail damage — and many Boise homeowners are entitled to a full roof replacement at little to no out-of-pocket cost beyond their deductible. But the clock is ticking: most policies require you to file within one year of the storm date.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Boise's Hail & Storm Risk</h2>
          <p className="text-text-muted leading-relaxed mb-4">The Treasure Valley faces several storm-related roofing threats:</p>
          <ul className="space-y-2 mb-8">
            {[
              "Hailstorms — Boise and surrounding areas see multiple significant hail events annually, with stones capable of damaging shingles, gutters, AC units, and siding",
              "High winds — The Treasure Valley gap effect creates powerful wind corridors that can strip shingles and damage roof edges",
              "Winter snow loads — Accumulating snow adds weight to roofing systems and creates ice dams as it melts and refreezes",
              "Freeze-thaw cycles — Repeated freezing and thawing in winter expands and contracts roofing materials, leading to cracking and failure over time",
              "UV degradation — Boise's intense summer sun bakes asphalt shingles, making them more brittle and susceptible to wind and hail damage",
            ].map(item => (
              <li key={item} className="flex items-start gap-3 text-text-muted">
                <CheckCircle2 size={18} className="text-primary flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Our Insurance Claims Process</h2>
          <ol className="space-y-4 mb-8">
            {[
              { n: "1", title: "Free Storm Damage Inspection", desc: "We inspect your entire roof and document every area of damage with detailed photos and written notes — the foundation of a strong insurance claim." },
              { n: "2", title: "File Your Insurance Claim", desc: "We help you understand when and how to file your claim with your Idaho homeowners insurance carrier." },
              { n: "3", title: "Meet With Your Adjuster", desc: "We meet your insurance adjuster on-site and walk through the damage together. Our presence ensures all damage is seen and documented." },
              { n: "4", title: "Review & Supplement", desc: "We review your adjuster's scope of loss and request supplements if any damage was missed or undervalued." },
              { n: "5", title: "Complete the Work", desc: "After approval, we schedule and complete repairs or replacement using insurance-approved materials, from start to finish." },
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
        </div>
      </section>

      <section className="py-12 px-4 bg-bg-alt">
        <div className="max-w-2xl mx-auto">
          <GHLForm type="quote" title="Request a Free Storm Damage Inspection in Boise" />
        </div>
      </section>

      <CTABanner heading="Hail or Storm Damage in Boise? Let's Talk." subtext="Free inspection, insurance claims documentation, and fast repairs." ctaText="Schedule Free Inspection" phone={loc.phone} phoneRaw={loc.phoneRaw} />
      <FAQ faqs={faqs} heading="Storm Damage FAQs — Boise, ID" />
    </>
  );
}
