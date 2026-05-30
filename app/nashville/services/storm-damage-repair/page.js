import Image from 'next/image';
import { CheckCircle2, Phone, AlertTriangle } from 'lucide-react';
import Breadcrumbs from '../../../../components/Breadcrumbs';
import CTABanner from '../../../../components/CTABanner';
import FAQ from '../../../../components/FAQ';
import GHLForm from '../../../../components/GHLForm';
import SchemaMarkup from '../../../../components/SchemaMarkup';
import { serviceSchema, faqSchema } from '../../../../lib/schema';
import config from '../../../../lib/config';

const loc = config.locations.nashville;

export const metadata = {
  title: "Storm & Hail Damage Roof Repair Nashville TN | Insurance Claims | Stellar Roofing",
  description: "Storm and hail damage roof repair in Nashville, TN. We inspect, document damage, and handle insurance claims start-to-finish. Free inspection. Call (629) 277-4249.",
  alternates: { canonical: 'https://thestellarroofing.com/nashville/services/storm-damage-repair' },
};

const faqs = [
  { question: "What should I do right after a storm damages my roof?", answer: "First, stay safe and don't go on the roof yourself. Document any damage you can see from the ground with photos. Call your insurance company to report the damage and then call us for a free inspection. We can meet with your adjuster and help document everything properly." },
  { question: "Does insurance cover storm damage roof repair in Nashville?", answer: "In most cases, yes. Homeowners insurance typically covers storm damage including hail, wind, and tornado damage. We work directly with your insurance adjuster to make sure all damage is documented and you receive the full coverage you're entitled to." },
  { question: "How do I know if my roof has hail damage?", answer: "Hail damage can be subtle. Signs include small circular dents on shingles (they look like bruises), granules washing off into gutters, dents on gutters and downspouts, or damage to vents and flashing. A professional inspection is the best way to assess hail damage accurately." },
  { question: "How long do I have to file an insurance claim after storm damage?", answer: "Most homeowner insurance policies require claims to be filed within 1 year of the damage, but policies vary. We recommend calling your insurance company and a roofer as soon as possible after a storm to start the process." },
];

export default function StormDamageNashvillePage() {
  const svcSchema = serviceSchema({
    name: "Storm Damage Roof Repair in Nashville, TN",
    description: "Expert storm damage roof repair in Nashville, TN. We assess hail, wind, and tornado damage and assist with insurance claims.",
    url: "https://thestellarroofing.com/nashville/services/storm-damage-repair",
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
        { name: "Storm Damage Repair", path: "/nashville/services/storm-damage-repair" },
      ]} />

      <section className="relative h-72 md:h-96 flex items-center">
        <Image src="/images/service-storm-damage.jpg" alt="Storm damage roof repair in Nashville, TN" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-primary/75" />
        <div className="relative z-10 px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Storm Damage Roof Repair in Nashville, TN</h1>
          <p className="text-white/90 text-xl mb-6">Insurance claims help. Fast response. Free inspections.</p>
          <a href={`tel:${loc.phoneRaw}`} className="inline-flex items-center gap-2 bg-white hover:bg-white/90 text-primary font-bold px-6 py-3 rounded-lg transition-colors">
            <Phone size={18} /> Call {loc.phone}
          </a>
        </div>
      </section>

      <div className="bg-primary/10 border-l-4 border-primary/30 py-4 px-6">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <AlertTriangle className="text-primary flex-shrink-0" size={22} />
          <p className="text-text-dark text-sm font-medium">Recent storm damage? Call us now for a free emergency inspection: <a href={`tel:${loc.phoneRaw}`} className="text-primary font-bold hover:text-primary">{loc.phone}</a></p>
        </div>
      </div>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-text-muted leading-relaxed mb-8">
            Severe storms in Nashville can cause major roofing issues such as missing shingles, hail damage, and roof leaks. Our team quickly assesses the damage, documents the problem areas, and completes the necessary repairs to restore your roof's protection — helping homeowners recover from storm damage and protect their property from further issues.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Nashville's Storm Risk</h2>
          <p className="text-text-muted leading-relaxed mb-4">Nashville and Middle Tennessee sit in one of the most storm-prone regions in the country. Severe weather here can include:</p>
          <ul className="space-y-2 mb-8">
            {[
              "Hailstorms — Nashville averages multiple significant hail events per year, with stones large enough to damage shingles, gutters, and flashing",
              "High winds — Straight-line winds and thunderstorm gusts routinely exceed 60 mph, easily stripping shingles off a roof",
              "Tornadoes — The March 2020 tornado that tore through Nashville and East Nashville caused widespread roofing destruction across hundreds of homes",
              "Heavy rain and flooding — Prolonged rainfall puts pressure on any existing vulnerabilities in your roof",
              "Ice and snow — Rare but impactful winter storms can cause ice dam formation and snow load stress",
            ].map(item => (
              <li key={item} className="flex items-start gap-3 text-text-muted">
                <CheckCircle2 size={18} className="text-primary flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Hail Damage Roof Repair in Nashville, TN</h2>
          <p className="text-text-muted leading-relaxed mb-4">
            Hail damage is one of the leading causes of roof replacement in Middle Tennessee. Nashville and the surrounding counties — Davidson, Rutherford, Williamson, and Montgomery — experience multiple significant hail events every year. The challenge is that hail damage often looks minor from the ground but has actually compromised shingle integrity across a large portion of the roof, shortening its remaining lifespan by 5–10 years.
          </p>
          <p className="text-text-muted leading-relaxed mb-8">
            If a hail event has occurred in your area, a free inspection is the only way to know the true condition of your roof. We document all damage with photos and written notes — the same documentation required to support a successful insurance claim.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Our Storm Damage Insurance Claims Process</h2>
          <ol className="space-y-4 mb-8">
            {[
              { n: "1", title: "Free Storm Damage Inspection", desc: "We inspect your entire roof and document every area of damage with detailed photos and written notes." },
              { n: "2", title: "File Your Insurance Claim", desc: "We help you understand when and how to file your claim. You contact your insurance company to report the damage and schedule an adjuster visit." },
              { n: "3", title: "Meet With Your Adjuster", desc: "We meet your insurance adjuster on-site to walk through the damage together. Having a professional roofer present ensures nothing is overlooked." },
              { n: "4", title: "Review the Scope of Work", desc: "Once your adjuster provides a scope of loss, we review it to make sure all damage is included." },
              { n: "5", title: "Complete the Repairs or Replacement", desc: "After your claim is approved, we schedule and complete the work using insurance-approved materials." },
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
          <GHLForm type="quote" title="Request a Free Storm Damage Inspection" />
        </div>
      </section>

      <CTABanner heading="Storm Damage? Get a Free Inspection Today." subtext="We'll document the damage, help with your insurance claim, and get your roof restored fast." ctaText="Schedule Free Inspection" phone={loc.phone} phoneRaw={loc.phoneRaw} />
      <FAQ faqs={faqs} heading="Storm Damage FAQs" />
    </>
  );
}
