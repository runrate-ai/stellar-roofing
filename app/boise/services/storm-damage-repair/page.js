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
  title: "Wind & Storm Damage Roof Repair Boise ID | Free Inspection & Insurance Claims | Stellar Roofing",
  description: "Wind and storm damage roof repair in Boise, ID. Free inspection, complete insurance claims documentation, fast repairs. Ada & Canyon County. Call today.",
  alternates: { canonical: 'https://thestellarroofing.com/boise/services/storm-damage-repair' },
};

const faqs = [
  { question: "What should I do right after a windstorm or severe storm in Boise?", answer: "First, stay safe and don't go on the roof yourself. Document any damage you can see from the ground with photos — missing shingles, lifted edges, damaged ridge caps. Call your insurance company to report the potential damage and then call us for a free inspection. We can meet with your adjuster and document everything properly." },
  { question: "Does insurance cover wind damage in Idaho?", answer: "In most cases, yes. Homeowners insurance typically covers wind damage, and wind uplift is one of the leading causes of roof insurance claims in the Treasure Valley. We work directly with your insurance adjuster to make sure all damage is documented and you receive the full coverage you're entitled to." },
  { question: "How do I know if my Boise roof has wind or storm damage?", answer: "Wind damage signs include missing or lifted shingles, cracked shingles along edges and ridges, blown-off ridge caps, damaged or separated flashing, and dents or debris damage on gutters and downspouts. Some damage isn't visible from the ground — a professional inspection is the only reliable way to fully assess it." },
  { question: "How long do I have to file an insurance claim in Idaho?", answer: "Idaho homeowners insurance policies typically require claims to be filed within 1 year of the damage event, but this varies by policy. We recommend calling us and your insurance company as soon as possible after a storm." },
];

export default function StormDamageBoisePage() {
  const svcSchema = serviceSchema({
    name: "Storm Damage Roof Repair in Boise, ID",
    description: "Expert wind and storm damage roof repair in Boise, ID. We assess damage, document for insurance claims, and restore your Treasure Valley roof.",
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
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Wind &amp; Storm Damage Roof Repair in Boise, ID</h1>
          <p className="text-white/90 text-xl mb-6">Wind & storm damage specialists. Insurance claims help. Free inspections throughout the Treasure Valley.</p>
          <a href={`tel:${loc.phoneRaw}`} className="inline-flex items-center gap-2 bg-white hover:bg-white/90 text-primary font-bold px-6 py-3 rounded-lg transition-colors">
            <Phone size={18} /> Call {loc.phone}
          </a>
        </div>
      </section>

      <div className="bg-primary/10 border-l-4 border-primary/30 py-4 px-6">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <AlertTriangle className="text-primary flex-shrink-0" size={22} />
          <p className="text-text-dark text-sm font-medium">Recent storm or wind damage? Call us now: <a href={`tel:${loc.phoneRaw}`} className="text-primary font-bold">{loc.phone}</a></p>
        </div>
      </div>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-text-muted leading-relaxed mb-8">
            Boise and the Treasure Valley experience regular wind and storm events that can leave significant damage in their wake. Wind damage is often more deceptive than it looks — lifted shingles, cracked ridge caps, and loosened flashing may appear minor from the ground but have compromised the roof's weather barrier, shortening its lifespan by years. Stellar Roofing &amp; Restorations specializes in wind and storm damage assessment for Boise homeowners, providing thorough inspections, complete insurance claims documentation, and professional repairs or replacement.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Wind & Storm Damage Roof Repair in Boise — What You Need to Know</h2>
          <p className="text-text-muted leading-relaxed mb-4">
            Wind is the primary storm-related roofing threat in the Boise area. The Treasure Valley gap effect — where air accelerates as it funnels between mountain ranges into the valley — creates powerful wind corridors that regularly impact Ada and Canyon County. High-wind events can lift shingles, crack ridge caps, damage flashing, and expose roof decking. What makes Boise-area wind damage particularly important to address quickly: Idaho's intense summer UV exposure causes already-compromised shingles to deteriorate much faster than in other climates, turning what starts as minor uplift damage into active leaks within one or two seasons.
          </p>
          <p className="text-text-muted leading-relaxed mb-8">
            Most homeowners insurance policies in Idaho cover wind damage — and many Boise homeowners are entitled to a full roof replacement at little to no out-of-pocket cost beyond their deductible. But the clock is ticking: most policies require you to file within one year of the storm date.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Boise's Wind & Storm Risk</h2>
          <p className="text-text-muted leading-relaxed mb-4">The Treasure Valley faces several storm-related roofing threats:</p>
          <ul className="space-y-2 mb-8">
            {[
              "High winds — The Treasure Valley gap effect creates powerful wind corridors that regularly strip shingles, damage roof edges, and cause uplift damage across entire neighborhoods",
              "Wind-driven rain — High winds paired with rain can force water under lifted shingles and through compromised flashing, leading to leaks and interior damage",
              "Winter snow loads — Accumulating snow adds weight to roofing systems and creates ice dams as it melts and refreezes",
              "Freeze-thaw cycles — Repeated freezing and thawing in winter expands and contracts roofing materials, leading to cracking and failure over time",
              "UV degradation — Boise's intense summer sun bakes asphalt shingles, making them more brittle and susceptible to wind damage over time",
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
              { n: "1", title: "Free Wind & Storm Damage Inspection", desc: "We inspect your entire roof and document every area of damage with detailed photos and written notes — the foundation of a strong insurance claim." },
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

      <CTABanner heading="Wind or Storm Damage in Boise? Let's Talk." subtext="Free inspection, insurance claims documentation, and fast repairs." ctaText="Schedule Free Inspection" phone={loc.phone} phoneRaw={loc.phoneRaw} />
      <FAQ faqs={faqs} heading="Storm Damage FAQs — Boise, ID" />
    </>
  );
}
