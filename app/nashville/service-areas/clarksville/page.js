import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, Phone, MapPin } from 'lucide-react';
import Breadcrumbs from '../../../../components/Breadcrumbs';
import CTABanner from '../../../../components/CTABanner';
import FAQ from '../../../../components/FAQ';
import GHLForm from '../../../../components/GHLForm';
import SchemaMarkup from '../../../../components/SchemaMarkup';
import { serviceSchema, faqSchema } from '../../../../lib/schema';
import config from '../../../../lib/config';

const loc = config.locations.nashville;

export const metadata = {
  title: "Roof Repair & Replacement Clarksville TN | Stellar Roofing",
  description: "Roof repair and replacement in Clarksville, TN. Shingle repair, storm damage, hail damage, insurance claims. Montgomery County's trusted roofer. Call (629) 277-4249.",
  alternates: { canonical: 'https://thestellarroofing.com/nashville/service-areas/clarksville' },
};

const faqs = [
  { question: "How much does roof repair cost in Clarksville, TN?", answer: "Most roof repairs in Clarksville range from $400 to $2,500 depending on the type and extent of the damage. Minor shingle repairs or pipe boot replacements are on the lower end. More extensive repairs involving flashing, decking, or large storm-damaged areas will cost more. We provide free written estimates before any work begins." },
  { question: "How much does a roof replacement cost in Clarksville, TN?", answer: "A typical residential roof replacement in Clarksville ranges from $14,000 to $28,000, depending on your roof's size, pitch, and the materials you choose. Architectural shingles are the most popular option in the area. We provide free estimates with no obligation." },
  { question: "Does insurance cover storm damage in Clarksville?", answer: "In most cases, yes. Homeowners insurance typically covers hail and wind damage. Clarksville gets significant storm activity each year. We help Clarksville homeowners document damage, meet with their adjuster, and navigate the full insurance claims process — at no extra charge." },
  { question: "How quickly can you get to my Clarksville home?", answer: "We make regular service trips to Clarksville and Montgomery County. For standard inspections and estimates, we're typically available within a few days. For storm damage or urgent situations, we prioritize as quickly as possible." },
  { question: "Do you do shingle roof repair in Clarksville?", answer: "Yes. Shingle repair is one of our most common services in Clarksville — from replacing a few blown-off shingles after a wind event to repairing larger sections damaged by hail. We fix it right and stand behind the work with a warranty." },
];

export default function ClarksvillePage() {
  const svcSchema = serviceSchema({
    name: "Roof Repair & Replacement in Clarksville, TN",
    description: "Professional roof repair and replacement in Clarksville, TN. Shingle repair, storm damage, hail damage, and insurance claims for Montgomery County homeowners.",
    url: "https://thestellarroofing.com/nashville/service-areas/clarksville",
    areaServed: "Clarksville, TN",
    phone: loc.phone,
  });

  return (
    <>
      <SchemaMarkup schema={svcSchema} />
      <SchemaMarkup schema={faqSchema(faqs)} />

      <Breadcrumbs items={[
        { name: "Nashville", path: "/nashville" },
        { name: "Service Areas", path: "/nashville#service-areas" },
        { name: "Clarksville", path: "/nashville/service-areas/clarksville" },
      ]} />

      {/* HERO */}
      <section className="relative h-64 md:h-80 flex items-center">
        <Image src="/images/crew-working.jpg" alt="Roof repair and replacement in Clarksville, TN" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-primary/75" />
        <div className="relative z-10 px-4 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-white/80 mb-2"><MapPin size={18} /><span className="font-semibold text-sm">Clarksville, TN — Montgomery County</span></div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Roof Repair &amp; Replacement in Clarksville, TN</h1>
          <p className="text-white/90 text-lg mb-5">Montgomery County's trusted roofing contractor — shingle repair, storm damage, hail claims.</p>
          <a href={`tel:${loc.phoneRaw}`} className="inline-flex items-center gap-2 bg-white hover:bg-white/90 text-primary font-bold px-6 py-3 rounded-lg transition-colors">
            <Phone size={18} /> {loc.phone}
          </a>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Roofing Services in Clarksville, TN</h2>
          <p className="text-text-muted leading-relaxed mb-6">
            Stellar Roofing &amp; Restorations provides roof repair and replacement services throughout Clarksville and Montgomery County. Whether you need a few shingles fixed after a wind event, a full roof replacement on a home that's reached the end of its lifespan, or help navigating a storm damage insurance claim, our team delivers professional service with no pressure and no surprises.
          </p>
          <p className="text-text-muted leading-relaxed mb-8">
            Clarksville is Tennessee's fifth-largest city and one of the fastest-growing in the state. Like the rest of Middle Tennessee, it sits squarely in a region that sees regular severe weather — hailstorms, high winds, and heavy rain that can cause significant roofing damage. Our team makes regular service trips to Clarksville and responds quickly when storms come through Montgomery County.
          </p>

          {/* COST TABLE */}
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Roof Repair &amp; Replacement Costs in Clarksville, TN</h2>
          <div className="bg-bg-alt rounded-2xl p-6 mb-8">
            <div className="grid grid-cols-2 gap-4 text-sm">
              {[
                { type: "Minor shingle repair (1–5 shingles)", range: "$250 – $600" },
                { type: "Storm damage shingle repair", range: "$500 – $2,000" },
                { type: "Flashing repair or replacement", range: "$400 – $900" },
                { type: "Full roof replacement (standard home)", range: "$14,000 – $22,000" },
                { type: "Full roof replacement (larger home)", range: "$22,000 – $28,000+" },
                { type: "Insurance-covered replacement", range: "Per your policy deductible" },
              ].map(({ type, range }) => (
                <div key={type} className="flex justify-between gap-4 py-2 border-b border-slate-200 last:border-0">
                  <span className="text-text-muted">{type}</span>
                  <span className="font-semibold text-primary whitespace-nowrap">{range}</span>
                </div>
              ))}
            </div>
            <p className="text-text-muted text-xs mt-4">*All estimates are free and written. Final cost depends on your specific roof. Insurance coverage may significantly reduce your out-of-pocket cost.</p>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Storm &amp; Hail Damage Roof Repair in Clarksville</h2>
          <p className="text-text-muted leading-relaxed mb-4">
            Storm damage is the most common reason Clarksville homeowners call us. Montgomery County sees significant hail and wind events each year, and the damage isn't always obvious from the ground. Hail bruises asphalt shingles, knocking granules loose and shortening their lifespan — even when the roof appears intact.
          </p>
          <p className="text-text-muted leading-relaxed mb-6">
            If your Clarksville home has experienced a recent storm, we recommend a free inspection before your window to file an insurance claim closes. We document all damage with photos, help you understand your coverage, and meet with your adjuster on-site if needed.
          </p>
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {[
              { title: "Hail Damage", desc: "We identify hail bruising on shingles that isn't visible from the ground — and document it properly for your insurance claim." },
              { title: "Wind Damage", desc: "High winds can lift and tear shingles even on relatively new roofs. We replace damaged shingles and secure any lifted areas." },
              { title: "Shingle Repair", desc: "From a handful of missing shingles to larger damaged sections — we repair what needs repairing with matching materials." },
              { title: "Insurance Claims Help", desc: "We meet with your adjuster, document all damage, and help you navigate the full insurance claims process from inspection to completion." },
            ].map(({ title, desc }) => (
              <div key={title} className="bg-bg-alt rounded-xl p-5">
                <h3 className="font-bold text-primary mb-1">{title}</h3>
                <p className="text-text-muted text-sm">{desc}</p>
              </div>
            ))}
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Roofing Services We Offer in Clarksville</h2>
          <ul className="space-y-3 mb-8">
            {config.services.map(s => (
              <li key={s.slug} className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <Link href={`/nashville/services/${s.slug}`} className="font-semibold text-primary hover:text-primary-light transition-colors">{s.name}</Link>
                  <span className="text-text-muted text-sm"> — {s.shortDescription}</span>
                </div>
              </li>
            ))}
          </ul>

          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Clarksville Neighborhoods We Serve</h2>
          <p className="text-text-muted leading-relaxed mb-4">We serve homeowners throughout Clarksville and Montgomery County, including:</p>
          <div className="flex flex-wrap gap-2 mb-8">
            {["Downtown Clarksville", "Sango", "New Providence", "Dunlop Lane", "St. Bethlehem", "Ringgold", "Oak Grove", "Hopkinsville Rd Corridor", "Fort Campbell area", "Russellville Road"].map(n => (
              <span key={n} className="bg-bg-alt text-text-muted text-sm px-4 py-2 rounded-lg">{n}</span>
            ))}
          </div>
        </div>
      </section>

      {/* GHL FORM */}
      <section className="py-12 px-4 bg-bg-alt">
        <div className="max-w-2xl mx-auto">
          <GHLForm type="quote" title="Get a Free Roofing Estimate in Clarksville" />
        </div>
      </section>

      <CTABanner
        heading="Clarksville — Schedule Your Free Roof Inspection"
        subtext="Storm damage, shingle repair, or full replacement — we'll give you an honest assessment with no pressure to buy."
        phone={loc.phone}
        phoneRaw={loc.phoneRaw}
      />
      <FAQ faqs={faqs} heading="Clarksville Roofing FAQs" />
    </>
  );
}
