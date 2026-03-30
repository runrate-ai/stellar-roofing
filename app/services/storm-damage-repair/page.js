import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, Phone, AlertTriangle } from 'lucide-react';
import Breadcrumbs from '../../../components/Breadcrumbs';
import CTABanner from '../../../components/CTABanner';
import FAQ from '../../../components/FAQ';
import GHLForm from '../../../components/GHLForm';
import SchemaMarkup from '../../../components/SchemaMarkup';
import { serviceSchema, faqSchema } from '../../../lib/schema';
import config from '../../../lib/config';

export const metadata = {
  title: "Storm Damage Roof Repair Nashville TN | Insurance Help | Stellar Roofing",
  description: "Storm damage roof repair in Nashville, TN. Hail, wind, tornado damage assessment and repair. We handle insurance claims. Call Stellar Roofing (629) 277-4249.",
  alternates: { canonical: 'https://thestellarroofing.com/services/storm-damage-repair' },
};

const faqs = [
  { question: "What should I do right after a storm damages my roof?", answer: "First, stay safe and don't go on the roof yourself. Document any damage you can see from the ground with photos. Call your insurance company to report the damage and then call us for a free inspection. We can meet with your adjuster and help document everything properly." },
  { question: "Does insurance cover storm damage roof repair in Nashville?", answer: "In most cases, yes. Homeowners insurance typically covers storm damage including hail, wind, and tornado damage. We work directly with your insurance adjuster to make sure all damage is documented and you receive the full coverage you're entitled to." },
  { question: "How do I know if my roof has hail damage?", answer: "Hail damage can be subtle. Signs include small circular dents on shingles (they look like bruises), granules washing off into gutters, dents on gutters and downspouts, or damage to vents and flashing. A professional inspection is the best way to assess hail damage accurately." },
  { question: "How long do I have to file an insurance claim after storm damage?", answer: "Most homeowner insurance policies require claims to be filed within 1 year of the damage, but policies vary. We recommend calling your insurance company and a roofer as soon as possible after a storm to start the process." },
];

export default function StormDamageRepairPage() {
  const svcSchema = serviceSchema({
    name: "Storm Damage Roof Repair",
    description: "Expert storm damage roof repair in Nashville, TN. We assess hail, wind, and tornado damage and assist with insurance claims.",
    url: "https://thestellarroofing.com/services/storm-damage-repair",
  });
  const faqSchemaData = faqSchema(faqs);

  return (
    <>
      <SchemaMarkup schema={svcSchema} />
      <SchemaMarkup schema={faqSchemaData} />

      <Breadcrumbs items={[
        { name: "Home", path: "/" },
        { name: "Services", path: "/#services" },
        { name: "Storm Damage Repair", path: "/services/storm-damage-repair" },
      ]} />

      {/* HERO */}
      <section className="relative h-72 md:h-96 flex items-center">
        <Image
          src="/images/service-storm-damage.jpg"
          alt="Storm damage roof repair in Nashville, TN"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-primary/75" />
        <div className="relative z-10 px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Storm Damage Roof Repair in Nashville, TN</h1>
          <p className="text-white/90 text-xl mb-6">Insurance claims help. Fast response. Free inspections.</p>
          <a href={`tel:${config.business.phoneRaw}`} className="inline-flex items-center gap-2 bg-white hover:bg-white/90 text-primary font-bold px-6 py-3 rounded-lg transition-colors">
            <Phone size={18} /> Call {config.business.phone}
          </a>
        </div>
      </section>

      {/* URGENT BANNER */}
      <div className="bg-primary/10 border-l-4 border-primary/30 py-4 px-6">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <AlertTriangle className="text-primary flex-shrink-0" size={22} />
          <p className="text-text-dark text-sm font-medium">Recent storm damage? Call us now for a free emergency inspection: <a href={`tel:${config.business.phoneRaw}`} className="text-primary font-bold hover:text-primary">{config.business.phone}</a></p>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-text-muted leading-relaxed mb-8">
            Severe storms in Nashville can cause major roofing issues such as missing shingles, hail damage, and roof leaks, which is why Stellar Roofing &amp; Restorations specializes in storm damage roof repair throughout Nashville and Middle Tennessee. Our team quickly assesses the damage, documents the problem areas, and completes the necessary repairs to restore your roof's protection, helping homeowners recover from storm damage and protect their property from further issues.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Nashville's Storm Risk</h2>
          <p className="text-text-muted leading-relaxed mb-4">
            Nashville and Middle Tennessee sit in one of the most storm-prone regions in the country. Severe weather here can include:
          </p>
          <ul className="space-y-2 mb-6">
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

          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Signs of Storm Damage on Your Roof</h2>
          <p className="text-text-muted leading-relaxed mb-4">
            Some storm damage is visible from the ground. Some isn't. Here's what to look for:
          </p>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="font-semibold text-primary mb-3">Visible from the ground:</h3>
              <ul className="space-y-2">
                {[
                  "Missing shingles or large gaps in coverage",
                  "Curled, buckled, or lifted shingles",
                  "Dented or bent gutters and downspouts",
                  "Debris on the roof or around the yard",
                  "Damaged siding or fascia boards",
                ].map(item => (
                  <li key={item} className="text-text-muted text-sm flex items-start gap-2">
                    <CheckCircle2 size={15} className="text-primary flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-primary mb-3">Requires close inspection:</h3>
              <ul className="space-y-2">
                {[
                  "Hail bruising (dents in shingle granule surface)",
                  "Granule loss exposing asphalt mat",
                  "Cracked or split shingles",
                  "Damaged flashing at roof penetrations",
                  "Interior water stains or active leaks",
                ].map(item => (
                  <li key={item} className="text-text-muted text-sm flex items-start gap-2">
                    <CheckCircle2 size={15} className="text-primary flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg mb-8">
            <Image
              src="/images/service-storm-damage-home.jpg"
              alt="Storm damaged home in Nashville requiring roof repair"
              fill
              className="object-cover"
            />
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Our Storm Damage Insurance Claims Process</h2>
          <p className="text-text-muted leading-relaxed mb-6">
            Navigating an insurance claim after storm damage can be overwhelming. Stellar Roofing &amp; Restorations makes it simple. Here's how we guide you through the entire process:
          </p>
          <ol className="space-y-4 mb-8">
            {[
              { n: "1", title: "Free Storm Damage Inspection", desc: "We inspect your entire roof and document every area of damage with detailed photos and written notes. This documentation is critical for your insurance claim." },
              { n: "2", title: "File Your Insurance Claim", desc: "We help you understand when and how to file your claim. You contact your insurance company to report the damage and schedule an adjuster visit." },
              { n: "3", title: "Meet With Your Adjuster", desc: "We meet your insurance adjuster on-site to walk through the damage together. Having a professional roofer present ensures nothing is overlooked." },
              { n: "4", title: "Review the Scope of Work", desc: "Once your adjuster provides a scope of loss, we review it to make sure all damage is included. If anything is missing, we help you request a supplement." },
              { n: "5", title: "Complete the Repairs or Replacement", desc: "After your claim is approved, we schedule and complete the work using insurance-approved materials. We handle everything from start to finish." },
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

      {/* GHL FORM */}
      <section className="py-12 px-4 bg-bg-alt">
        <div className="max-w-2xl mx-auto">
          <GHLForm type="quote" title="Request a Free Storm Damage Inspection" />
        </div>
      </section>

      <CTABanner
        heading="Storm Damage? Get a Free Inspection Today."
        subtext="We'll document the damage, help with your insurance claim, and get your roof restored fast."
        ctaText="Schedule Free Inspection"
      />

      <FAQ faqs={faqs} heading="Storm Damage FAQs" />
    </>
  );
}
