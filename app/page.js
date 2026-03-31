import Image from 'next/image';
import Link from 'next/link';
import { Phone, Shield, SearchCheck, BadgeCheck, FileCheck, Home, Wrench, CloudLightning, Search, Building2, AlertTriangle } from 'lucide-react';
import SchemaMarkup from '../components/SchemaMarkup';
import CTABanner from '../components/CTABanner';
import FAQ from '../components/FAQ';
import GHLForm from '../components/GHLForm';
import ReviewWidget from '../components/ReviewWidget';
import { localBusinessSchema, faqSchema } from '../lib/schema';
import config from '../lib/config';

export const metadata = {
  title: "Stellar Roofing & Restorations | Nashville's Trusted Roofing Company",
  description: "Nashville's trusted roofing company. Free inspections, lifetime warranty, residential & commercial. Roof replacement, repair, storm damage. Call (629) 277-4249.",
  alternates: { canonical: 'https://thestellarroofing.com' },
  openGraph: {
    title: "Stellar Roofing & Restorations | Nashville's Trusted Roofing Company",
    description: "Nashville's trusted roofing company. Free inspections, lifetime warranty, residential & commercial. Roof replacement, repair, storm damage.",
    url: 'https://thestellarroofing.com',
    images: [{ url: '/images/hero.jpg', width: 1200, height: 630, alt: 'Stellar Roofing Nashville' }],
  },
};

const iconMap = { Home, Wrench, CloudLightning, Search, Building2, AlertTriangle };

const serviceDescriptions = {
  'roof-replacement': "When your roof reaches the end of its lifespan or suffers significant damage, Stellar Roofing & Restorations provides professional roof replacement services in Nashville and the surrounding Middle Tennessee area. Our experienced team installs high-quality roofing systems designed to protect your home.",
  'roof-repair': "Not every roofing issue requires a full replacement, and Stellar Roofing & Restorations offers reliable roof repair services in Nashville to fix leaks, damaged shingles, flashing issues, and other common roofing problems.",
  'storm-damage-repair': "Severe storms in Nashville can cause major roofing issues such as missing shingles, hail damage, and roof leaks. Our team quickly assesses the damage, documents the problem areas, and completes the necessary repairs to restore your roof's protection.",
  'roof-inspection': "Get a free, honest roof inspection from our experienced team. We assess the condition of your shingles, flashing, gutters, and ventilation — and give you a straight answer with no pressure to buy.",
  'commercial-roofing': "From flat roofs to metal systems, Stellar Roofing & Restorations handles commercial roofing for businesses of all sizes in Nashville. We work around your schedule to minimize downtime and disruption.",
  'emergency-roof-repair': "Active leak? Roof damage from a storm? Our team responds quickly to roof emergencies in Nashville. We'll assess the damage, provide temporary protection if needed, and get your roof repaired fast.",
};

const faqs = [
  { question: "How much does a new roof cost in Nashville, TN?", answer: "A typical roof replacement in Nashville costs between $15,000 and $30,000 for most homes, depending on the size of your roof, the materials chosen, and the complexity of the job. Architectural shingles are the most popular choice and typically fall in the middle of that range. We provide free estimates so you know exactly what to expect." },
  { question: "Does homeowners insurance cover roof replacement?", answer: "In many cases, yes — if your roof was damaged by a storm, hail, wind, or another covered peril, your homeowners insurance policy may cover the cost of replacement. Stellar Roofing helps homeowners navigate the claims process from start to finish, including working directly with your adjuster." },
  { question: "How long does a roof replacement take?", answer: "Most residential roof replacements in Nashville take 1–2 days to complete. The timeline depends on the size and pitch of your roof, the materials being installed, and weather conditions. Our crew works efficiently to minimize disruption to your home." },
  { question: "What are signs I need a new roof?", answer: "Key signs include shingles that are curling, cracked, or missing; granules in your gutters; daylight visible through your attic; water stains on your ceiling; or a roof that's 20+ years old. If you're unsure, schedule a free inspection and we'll give you an honest assessment." },
  { question: "Do you offer financing?", answer: "Yes, we work with financing options to make roof replacement more manageable. Ask us about available plans when you get your free estimate. We want quality roofing to be accessible for every Nashville homeowner." },
  { question: "What are areas do you serve?", answer: "We serve Nashville and the greater Middle Tennessee area, including Murfreesboro, Clarksville, Franklin, Brentwood, Hendersonville, Gallatin, Smyrna, Spring Hill, Mount Juliet, and Lebanon. If you're not sure whether we cover your area, just give us a call." },
];

export default function HomePage() {
  const lbSchema = localBusinessSchema();
  const faqSchemaData = faqSchema(faqs);

  return (
    <>
      <SchemaMarkup schema={lbSchema} />
      <SchemaMarkup schema={faqSchemaData} />

      {/* HERO */}
      <section className="relative flex items-center justify-center" style={{ minHeight: 'calc(100vh - 44px)' }}>
        <Image
          src="/images/hero.jpg"
          alt="Nashville roofing company - Stellar Roofing & Restorations"
          fill
          className="object-cover"
          priority
          quality={85}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
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
            <a href={`tel:${config.business.phoneRaw}`} className="flex items-center justify-center gap-2 border-2 border-white text-white hover:bg-white hover:text-primary font-semibold px-8 py-4 rounded-lg transition-colors text-lg">
              <Phone size={20} />
              {config.business.phone}
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
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-4">Our Roofing Services</h2>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">From routine repairs to full roof replacements, we handle every roofing need in Nashville and Middle Tennessee.</p>
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
                  <Link href={`/services/${service.slug}`} className="text-primary font-bold text-sm hover:text-primary-light transition-colors flex items-center gap-2">
                    Learn More <span className="text-xl">&rarr;</span>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ABOUT US */}
      <section className="py-20 px-4 bg-bg-alt reveal">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="reveal reveal-delay-1">
              <p className="text-primary font-bold uppercase tracking-widest text-sm mb-3">About Us</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-8">Nashville's Premier Roofing Team</h2>
              <p className="text-text-muted leading-relaxed text-lg mb-8">
                At Stellar Roofing &amp; Restorations, we're committed to providing homeowners in Nashville and throughout Middle Tennessee with roofing services they can truly rely on. The company is led by Nate, who has spent many years working in the roofing industry and understands firsthand the importance of quality craftsmanship, honest communication, and dependable service. 
              </p>
              <p className="text-text-muted leading-relaxed text-lg mb-10">
                Our team focuses on delivering durable roofing solutions—from repairs and storm damage restoration to full roof replacements—using proven materials and professional installation techniques. When you choose Stellar Roofing &amp; Restorations, you're choosing a local roofing company that takes pride in protecting your home and standing behind every job we complete.
              </p>
              <Link href="/about" className="inline-block bg-primary hover:bg-primary-light text-white font-bold px-10 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                Meet The Team
              </Link>
            </div>
            <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl reveal reveal-delay-2">
              <Image
                src="/images/crew-working.jpg"
                alt="Stellar Roofing crew working on a Nashville home"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* OUR PROCESS */}
      <section className="py-20 px-4 bg-white reveal">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-primary font-bold uppercase tracking-widest text-sm mb-3">The Process</p>
            <h2 className="text-3xl md:text-5xl font-bold text-primary">Simple & Transparent</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { step: "01", title: "Free Inspection", desc: "We start with a thorough, no-pressure assessment of your roof's condition to identify any issues." },
              { step: "02", title: "Expert Estimate", desc: "You'll receive a detailed, honest estimate tailored to your home's specific needs and your budget." },
              { step: "03", title: "Quality Install", desc: "Our professional crew completes your roofing project with precision, leaving your property spotless." },
            ].map(({ step, title, desc }, i) => (
              <div key={step} className={`text-center reveal reveal-delay-${i + 1}`}>
                <div className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-black shadow-xl">
                  {step}
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4">{title}</h3>
                <p className="text-text-muted leading-relaxed text-lg">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="py-20 px-4 bg-bg-alt reveal">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-4">What Our Customers Say</h2>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">Real reviews from Nashville homeowners and business owners who trust Stellar Roofing.</p>
          </div>

          <ReviewWidget />
        </div>
      </section>

      {/* CTA BANNER */}
      <CTABanner />

      {/* FAQ */}
      <FAQ faqs={faqs} />
    </>
  );
}
