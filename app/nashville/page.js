import Image from 'next/image';
import Link from 'next/link';
import { Phone, Shield, SearchCheck, BadgeCheck, FileCheck, Home, Wrench, CloudLightning, Search, Building2, AlertTriangle, MapPin } from 'lucide-react';
import SchemaMarkup from '../../components/SchemaMarkup';
import CTABanner from '../../components/CTABanner';
import FAQ from '../../components/FAQ';
import ReviewWidget from '../../components/ReviewWidget';
import { localBusinessSchema, faqSchema } from '../../lib/schema';
import config from '../../lib/config';

const loc = config.locations.nashville;

export const metadata = {
  title: "Roofing Company Nashville TN | Free Estimates | Stellar Roofing",
  description: "Nashville's trusted roofing contractor. Roof replacement, storm & hail damage repair, free inspections, lifetime warranty. Serving Davidson County & Middle Tennessee. Call (629) 277-4249.",
  alternates: { canonical: 'https://thestellarroofing.com/nashville' },
  openGraph: {
    title: "Roofing Company Nashville TN | Free Estimates | Stellar Roofing",
    description: "Nashville's trusted roofing contractor. Roof replacement, storm damage, free inspections, lifetime warranty.",
    url: 'https://thestellarroofing.com/nashville',
    images: [{ url: '/images/hero.jpg', width: 1200, height: 630, alt: 'Stellar Roofing Nashville TN' }],
  },
};

const iconMap = { Home, Wrench, CloudLightning, Search, Building2, AlertTriangle };

const serviceDescriptions = {
  'roof-replacement': "When your roof reaches the end of its lifespan or suffers significant damage, we provide professional roof replacement services in Nashville and the surrounding Middle Tennessee area using high-quality roofing systems.",
  'roof-repair': "Not every roofing issue requires a full replacement. We offer reliable roof repair services in Nashville to fix leaks, damaged shingles, flashing issues, and other common roofing problems.",
  'storm-damage-repair': "Severe storms in Nashville can cause major roofing issues. Our team quickly assesses hail, wind, and tornado damage, documents the problem areas, and completes the necessary repairs.",
  'roof-inspection': "Get a free, honest roof inspection from our experienced team. We assess your shingles, flashing, gutters, and ventilation — and give you a straight answer with no pressure.",
  'commercial-roofing': "From flat roofs to metal systems, we handle commercial roofing for businesses of all sizes in Nashville. We work around your schedule to minimize downtime.",
  'emergency-roof-repair': "Active leak? Storm damage? Our team responds quickly to roof emergencies in Nashville. We assess the damage, provide temporary protection if needed, and get your roof repaired fast.",
};

const faqs = [
  { question: "How much does a new roof cost in Nashville, TN?", answer: "A typical roof replacement in Nashville costs between $15,000 and $30,000 for most homes, depending on the size of your roof, the materials chosen, and the complexity of the job. Architectural shingles are the most popular choice and typically fall in the middle of that range. We provide free estimates so you know exactly what to expect before committing to anything." },
  { question: "Will my homeowners insurance cover a roof replacement in Nashville?", answer: "In many cases, yes — if your roof was damaged by a storm, hail, wind, or another covered peril, your homeowners insurance policy may cover most or all of the replacement cost. Middle Tennessee sees multiple significant hail events each year, and many Nashville homeowners don't realize they're entitled to a claim. Stellar Roofing helps you document the damage, meet with your adjuster, and navigate the claims process from start to finish." },
  { question: "How do I know if my Nashville roof has hail damage?", answer: "Hail damage is often invisible from the ground. Common signs include granules washing off into your gutters, small circular dents or bruising on shingle surfaces, and dents on metal gutters or downspouts. After any significant storm in Middle Tennessee, we strongly recommend a free professional inspection — it's the only reliable way to know the true condition of your roof." },
  { question: "How long does a roof replacement take in Nashville?", answer: "Most residential roof replacements in Nashville take 1–2 days to complete. The timeline depends on the size and pitch of your roof, the materials being installed, and weather conditions. Our crew works efficiently and performs a complete nail sweep and cleanup before leaving." },
  { question: "What are signs I need a new roof in Nashville?", answer: "Key signs include shingles that are curling, cracked, or missing; granules in your gutters; daylight visible through your attic; water stains on your ceiling; a roof that's 20+ years old; or recent storm damage. If you're unsure, schedule a free inspection and we'll give you an honest, no-pressure assessment." },
  { question: "What Nashville and Middle Tennessee areas do you serve?", answer: "We serve Nashville and the greater Middle Tennessee area, including Davidson, Rutherford, Williamson, and Montgomery Counties. Key areas include Murfreesboro, Clarksville, Franklin, Brentwood, Hendersonville, Gallatin, Smyrna, Spring Hill, Mount Juliet, and Lebanon. If you're not sure whether we cover your area, just give us a call." },
];

export default function NashvilleHubPage() {
  const lbSchema = localBusinessSchema('nashville');
  const faqSchemaData = faqSchema(faqs);

  return (
    <>
      <SchemaMarkup schema={lbSchema} />
      <SchemaMarkup schema={faqSchemaData} />

      {/* HERO */}
      <section className="relative flex items-center justify-center" style={{ minHeight: 'calc(100vh - 44px)' }}>
        <Image src="/images/hero.jpg" alt="Nashville roofing company - Stellar Roofing & Restorations" fill className="object-cover" priority quality={75} sizes="100vw" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-white/80 mb-3">
            <MapPin size={16} />
            <span className="text-sm font-semibold uppercase tracking-wider">Nashville, TN</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight">
            Nashville's Most Trusted<br />Roofing Company
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
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-4">Roofing Services in Nashville, TN</h2>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">From storm & hail damage repairs to full roof replacements, we handle every roofing need in Nashville and Middle Tennessee.</p>
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
                  <Link href={`/nashville/services/${service.slug}`} className="text-primary font-bold text-sm hover:text-primary-light transition-colors flex items-center gap-2">
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
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">How Much Does a New Roof Cost in Nashville, TN?</h2>
          <p className="text-text-muted text-lg mb-6">Roof replacement in Nashville typically ranges from <strong>$15,000 to $30,000</strong> for a standard residential home. Several factors affect your final cost:</p>
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
            <div className="grid grid-cols-1 text-sm">
              {[
                { type: "Standard ranch home (1,500–2,000 sq ft)", range: "$15,000 – $20,000" },
                { type: "Two-story home (2,000–2,800 sq ft)", range: "$18,000 – $25,000" },
                { type: "Larger home (2,800–4,000 sq ft)", range: "$22,000 – $30,000+" },
                { type: "Architectural shingles (most popular)", range: "Included above" },
                { type: "Premium / designer shingles", range: "Add $2,000 – $5,000" },
                { type: "Metal roofing upgrade", range: "Add $8,000 – $15,000" },
              ].map(({ type, range }) => (
                <div key={type} className="flex justify-between gap-4 py-2 border-b border-slate-100 last:border-0">
                  <span className="text-text-muted">{type}</span>
                  <span className="font-semibold text-primary whitespace-nowrap">{range}</span>
                </div>
              ))}
            </div>
            <p className="text-text-muted text-xs mt-4">*Ranges are estimates for Middle Tennessee. Your exact cost depends on roof size, pitch, materials, and decking condition. We provide free written estimates with no obligation.</p>
          </div>
          <p className="text-text-muted leading-relaxed">If your roof was damaged by hail or a storm, your homeowners insurance may cover most or all of the replacement cost. <Link href="/nashville/services/storm-damage-repair" className="text-primary font-semibold hover:underline">Learn about our insurance claims process →</Link></p>
        </div>
      </section>

      {/* SERVICE AREAS */}
      <section className="py-16 px-4 bg-white reveal">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Nashville & Middle Tennessee Service Areas</h2>
          <p className="text-text-muted text-lg mb-10">We serve Nashville and the surrounding communities throughout Middle Tennessee — from Davidson County to Rutherford, Williamson, and Montgomery Counties.</p>
          <div className="flex flex-wrap justify-center gap-4">
            {loc.serviceAreas.map(a => (
              <Link key={a.slug} href={`/nashville/service-areas/${a.slug}`} className="flex items-center gap-2 bg-white border border-slate-200 hover:border-primary hover:text-primary text-text-dark font-semibold px-6 py-3 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md">
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

      {/* ABOUT */}
      <section className="py-20 px-4 bg-white reveal">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="reveal reveal-delay-1">
              <p className="text-primary font-bold uppercase tracking-widest text-sm mb-3">About Us</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-8">Nashville's Premier Roofing Team</h2>
              <p className="text-text-muted leading-relaxed text-lg mb-6">
                At Stellar Roofing &amp; Restorations, we're committed to providing homeowners in Nashville and throughout Middle Tennessee with roofing services they can truly rely on. The company is led by Nate, who has spent many years working in the roofing industry and understands firsthand the importance of quality craftsmanship, honest communication, and dependable service.
              </p>
              <p className="text-text-muted leading-relaxed text-lg mb-6">
                Middle Tennessee's climate puts roofs through a real test — hot, humid summers, frequent hailstorms in spring and fall, and occasional tornado events like the destructive March 2020 storm that tore through East Nashville and Germantown. We know the local weather, the neighborhoods, and the roofing challenges specific to this region.
              </p>
              <p className="text-text-muted leading-relaxed text-base mb-6 text-text-muted/80">
                <strong className="text-primary">Neighborhoods we serve:</strong> East Nashville, 12 South, The Nations, Germantown, Sylvan Park, Green Hills, Bellevue, Antioch, Madison, Donelson, Inglewood, Berry Hill, and all of Davidson County.
              </p>
              <Link href="/about" className="inline-block bg-primary hover:bg-primary-light text-white font-bold px-10 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                Meet The Team
              </Link>
            </div>
            <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl reveal reveal-delay-2">
              <Image src="/images/crew-working.jpg" alt="Stellar Roofing crew working on a Nashville home" fill className="object-cover" />
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
              { step: "01", title: "Free Inspection", desc: "We start with a thorough, no-pressure assessment of your roof's condition to identify any issues." },
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

      {/* REVIEWS */}
      <section className="py-20 px-4 bg-white reveal">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-4">What Our Customers Say</h2>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">Real reviews from Nashville homeowners and business owners who trust Stellar Roofing.</p>
          </div>
          <ReviewWidget />
        </div>
      </section>

      <CTABanner phone={loc.phone} phoneRaw={loc.phoneRaw} />
      <FAQ faqs={faqs} />
    </>
  );
}
