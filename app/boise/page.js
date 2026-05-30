import Image from 'next/image';
import Link from 'next/link';
import { Phone, Shield, SearchCheck, BadgeCheck, FileCheck, Home, Wrench, CloudLightning, Search, Building2, AlertTriangle, MapPin } from 'lucide-react';
import SchemaMarkup from '../../components/SchemaMarkup';
import CTABanner from '../../components/CTABanner';
import FAQ from '../../components/FAQ';
import { localBusinessSchema, faqSchema } from '../../lib/schema';
import config from '../../lib/config';

const loc = config.locations.boise;

export const metadata = {
  title: "Roofing Company Boise ID | Hail Damage & Free Estimates | Stellar Roofing",
  description: "Boise's trusted roofing contractor. Hail damage specialists, roof replacement, free inspections, lifetime warranty. Serving Ada & Canyon Counties. Call today.",
  alternates: { canonical: 'https://thestellarroofing.com/boise' },
  openGraph: {
    title: "Roofing Company Boise ID | Hail Damage & Free Estimates | Stellar Roofing",
    description: "Boise's trusted roofing contractor. Hail damage specialists, roof replacement, free inspections, lifetime warranty.",
    url: 'https://thestellarroofing.com/boise',
    images: [{ url: '/images/hero.jpg', width: 1200, height: 630, alt: 'Stellar Roofing Boise Idaho Hail Damage' }],
  },
};

const iconMap = { Home, Wrench, CloudLightning, Search, Building2, AlertTriangle };

const serviceDescriptions = {
  'roof-replacement': "When your Boise home's roof reaches the end of its lifespan or suffers damage from Idaho's harsh winters or summer hailstorms, we provide professional roof replacement with high-quality materials built for the Treasure Valley climate.",
  'roof-repair': "From hail hits to wind damage and winter ice issues, our team provides reliable roof repair services throughout Boise and the Treasure Valley. We diagnose the real problem and fix it right the first time.",
  'storm-damage-repair': "Boise sees its share of spring hailstorms and high-wind events. Our team quickly assesses the damage, documents it thoroughly for your insurance claim, and restores your roof's protection.",
  'roof-inspection': "Get a free, honest roof inspection from our experienced team. We assess your shingles, flashing, gutters, and ventilation — and give you a straight answer with no pressure.",
  'commercial-roofing': "From flat TPO systems to metal roofing, we handle commercial roofing for Boise businesses of all sizes. We work around your schedule to minimize downtime and disruption.",
  'emergency-roof-repair': "Active leak? Hail damage? Wind damage? Our team responds quickly to roofing emergencies throughout Boise and the Treasure Valley. We'll assess, protect, and repair.",
};

const faqs = [
  { question: "How much does a roof replacement cost in Boise, ID?", answer: "A typical roof replacement in Boise ranges from $12,000 to $28,000 for most homes, depending on roof size, pitch, and materials. The Treasure Valley's climate — intense UV, hail, and winter snow — makes material quality especially important. We provide free estimates with no obligation so you know exactly what to expect." },
  { question: "Does homeowners insurance cover hail damage in Idaho?", answer: "In most cases, yes. Homeowners insurance typically covers hail and storm damage. Idaho — especially the Treasure Valley — sees multiple significant hail events each year, primarily from April through July. Many Boise homeowners don't realize they're entitled to a full roof replacement at little to no out-of-pocket cost. We help you document the damage, meet with your adjuster, and navigate the full claims process." },
  { question: "How do I know if my Boise roof has hail damage?", answer: "Hail damage is often not visible from the ground. Signs include granule loss in gutters, dents on metal gutters or AC units (hit alongside the roof), or small circular bruising on shingles that requires a trained eye to spot. After any hail event in Ada or Canyon County, we recommend a free professional inspection — it's the only reliable way to assess the damage." },
  { question: "Do Boise roofs need to handle snow loads?", answer: "Yes. Boise and the Treasure Valley can receive significant snowfall, and roofs need to be properly installed and ventilated to handle snow loads and prevent ice dam formation. We use materials and installation methods appropriate for Idaho's full climate range — from summer heat to winter freezes." },
  { question: "What roofing materials work best in Idaho's climate?", answer: "Architectural shingles are the most popular choice for Boise-area homes. Class 4 impact-resistant shingles are an excellent upgrade — they handle hail better and many insurance companies offer premium discounts for them. Metal roofing is the premium option for Boise homes: long-lasting, snow-shedding, and UV-resistant. We'll recommend the right material for your specific home and budget." },
  { question: "What Treasure Valley areas do you serve?", answer: "We serve Boise and the greater Treasure Valley, including Meridian, Nampa, Eagle, Caldwell, Kuna, Star, Middleton, and Garden City. We cover both Ada and Canyon Counties. If you're in the Treasure Valley, give us a call." },
];

export default function BoiseHubPage() {
  const lbSchema = localBusinessSchema('boise');
  const faqSchemaData = faqSchema(faqs);

  return (
    <>
      <SchemaMarkup schema={lbSchema} />
      <SchemaMarkup schema={faqSchemaData} />

      {/* HERO */}
      <section className="relative flex items-center justify-center" style={{ minHeight: 'calc(100vh - 44px)' }}>
        <Image src="/images/hero.jpg" alt="Boise roofing company - Stellar Roofing & Restorations" fill className="object-cover" priority quality={75} sizes="100vw" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-white/80 mb-3">
            <MapPin size={16} />
            <span className="text-sm font-semibold uppercase tracking-wider">Boise, ID — Treasure Valley</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight">
            Boise's Most Trusted<br />Roofing Company
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 font-medium">
            Free Inspections&nbsp;&bull;&nbsp;Lifetime Warranty&nbsp;&bull;&nbsp;Licensed &amp; Insured
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/free-inspection" className="bg-white hover:bg-white/90 text-primary font-bold px-8 py-4 rounded-lg transition-colors text-lg">
              Get Free Estimate
            </Link>
            <a href={`tel:${loc.phoneRaw}`} className="flex items-center justify-center gap-2 border-2 border-white text-white hover:bg-white hover:text-primary font-semibold px-8 py-4 rounded-lg transition-colors text-lg">
              <Phone size={20} /> {loc.phone}
            </a>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="bg-primary py-6 relative z-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { label: "Lifetime Warranty", Icon: Shield },
              { label: "Free Inspections", Icon: SearchCheck },
              { label: "Licensed & Insured", Icon: BadgeCheck },
              { label: "Insurance Claims Help", Icon: FileCheck },
            ].map(({ label, Icon }) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <Icon className="text-white" size={28} />
                <span className="text-white font-semibold text-sm md:text-base">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES OVERVIEW */}
      <section className="py-20 px-4 bg-white reveal" id="services">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-4">Roofing Services in Boise, ID</h2>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">From hail damage repair and insurance claims to full roof replacements, we handle every roofing need in Boise and the Treasure Valley.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {config.services.map((service, i) => {
              const IconComp = iconMap[service.icon] || Home;
              return (
                <div key={service.slug} className={`bg-bg-alt rounded-2xl p-8 hover:shadow-xl transition-all duration-300 group reveal reveal-delay-${(i % 3) + 1}`}>
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <IconComp size={28} />
                  </div>
                  <h3 className="text-2xl font-bold text-primary mb-4">{service.name}</h3>
                  <p className="text-text-muted text-base leading-relaxed mb-6">{serviceDescriptions[service.slug]}</p>
                  <Link href={`/boise/services/${service.slug}`} className="text-primary font-bold text-sm hover:text-primary-light transition-colors flex items-center gap-2">
                    Learn More <span className="text-xl">&rarr;</span>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* COST SECTION */}
      <section className="py-16 px-4 bg-bg-alt reveal">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">How Much Does a New Roof Cost in Boise, ID?</h2>
          <p className="text-text-muted text-lg mb-6">Roof replacement in Boise typically ranges from <strong>$12,000 to $28,000</strong> for a standard residential home. Idaho's climate (UV, hail, snow) makes material quality especially important. Several factors affect your final cost:</p>
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
              {[
                { type: "Standard ranch home (1,500–2,000 sq ft)", range: "$12,000 – $18,000" },
                { type: "Two-story home (2,000–2,800 sq ft)", range: "$16,000 – $22,000" },
                { type: "Larger home (2,800–4,000 sq ft)", range: "$20,000 – $28,000+" },
                { type: "Impact-resistant (Class 4) shingles", range: "Add $1,500 – $3,000" },
                { type: "Metal roofing upgrade", range: "Add $8,000 – $15,000" },
                { type: "Insurance-covered replacement", range: "Per your policy deductible" },
              ].map(({ type, range }) => (
                <div key={type} className="flex justify-between gap-4 py-2 border-b border-slate-100 last:border-0">
                  <span className="text-text-muted">{type}</span>
                  <span className="font-semibold text-primary whitespace-nowrap">{range}</span>
                </div>
              ))}
            </div>
            <p className="text-text-muted text-xs mt-4">*Ranges are estimates for the Treasure Valley. Your exact cost depends on roof size, pitch, and materials. We provide free written estimates with no obligation.</p>
          </div>
          <p className="text-text-muted leading-relaxed">Boise sees significant hail activity each year — if your home was damaged, your insurance may cover most or all of the cost. <Link href="/boise/services/storm-damage-repair" className="text-primary font-semibold hover:underline">Learn about our hail damage inspection process →</Link></p>
        </div>
      </section>

      {/* SERVICE AREAS */}
      <section className="py-16 px-4 bg-white reveal" id="service-areas">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Boise & Treasure Valley Service Areas</h2>
          <p className="text-text-muted text-lg mb-10">We serve Boise and the surrounding communities throughout Ada and Canyon Counties.</p>
          <div className="flex flex-wrap justify-center gap-4">
            {loc.serviceAreas.map(a => (
              <Link key={a.slug} href={`/boise/service-areas/${a.slug}`} className="flex items-center gap-2 bg-white border border-slate-200 hover:border-primary hover:text-primary text-text-dark font-semibold px-6 py-3 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md">
                <MapPin size={16} className="text-primary" /> {a.city}, {a.state}
              </Link>
            ))}
            {loc.expansionAreas.map(a => (
              <span key={a.city} className="flex items-center gap-2 bg-white border border-slate-100 text-text-muted px-6 py-3 rounded-xl text-sm">
                <MapPin size={14} className="text-slate-300" /> {a.city}, {a.state}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT + BOISE-SPECIFIC */}
      <section className="py-20 px-4 bg-white reveal">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="reveal reveal-delay-1">
              <p className="text-primary font-bold uppercase tracking-widest text-sm mb-3">Boise, Idaho</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-8">Built for Idaho's Climate</h2>
              <p className="text-text-muted leading-relaxed text-lg mb-6">
                The Treasure Valley has a demanding climate for roofing. Intense summer sun bakes shingles and accelerates UV degradation. Spring hailstorms — a major annual occurrence in Ada and Canyon Counties — can bruise and crack shingles across entire neighborhoods. Winters bring snow loads and freeze-thaw cycles that test aging roofing systems. And Boise's explosive growth means thousands of homes from the 1990s and 2000s are now reaching the age where replacement becomes necessary.
              </p>
              <p className="text-text-muted leading-relaxed text-base mb-6 text-text-muted/80">
                <strong className="text-primary">Boise neighborhoods we serve:</strong> North End, The Bench, Southeast Boise, East End, Depot Bench, Harris Ranch, Warm Springs, Ustick Corridor, and all of Ada County.
              </p>
              <Link href="/about" className="inline-block bg-primary hover:bg-primary-light text-white font-bold px-10 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                Meet The Team
              </Link>
            </div>
            <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl reveal reveal-delay-2">
              <Image src="/images/crew-working.jpg" alt="Stellar Roofing crew working on a Boise home" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-20 px-4 bg-bg-alt reveal">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-primary font-bold uppercase tracking-widest text-sm mb-3">The Process</p>
            <h2 className="text-3xl md:text-5xl font-bold text-primary">Simple &amp; Transparent</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { step: "01", title: "Free Inspection", desc: "We start with a thorough, no-pressure assessment of your roof's condition to identify any issues specific to Idaho's climate." },
              { step: "02", title: "Expert Estimate", desc: "You'll receive a detailed, honest estimate tailored to your home's specific needs and your budget." },
              { step: "03", title: "Quality Install", desc: "Our professional crew completes your roofing project with precision, leaving your property spotless." },
            ].map(({ step, title, desc }, i) => (
              <div key={step} className={`text-center reveal reveal-delay-${i + 1}`}>
                <div className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-black shadow-xl">{step}</div>
                <h3 className="text-2xl font-bold text-primary mb-4">{title}</h3>
                <p className="text-text-muted leading-relaxed text-lg">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner phone={loc.phone} phoneRaw={loc.phoneRaw} />
      <FAQ faqs={faqs} />
    </>
  );
}
