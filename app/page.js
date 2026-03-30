import Image from 'next/image';
import Link from 'next/link';
import { Phone, Shield, SearchCheck, BadgeCheck, FileCheck, Home, Wrench, CloudLightning, Search, Building2, AlertTriangle, Star, MapPin } from 'lucide-react';
import SchemaMarkup from '../components/SchemaMarkup';
import CTABanner from '../components/CTABanner';
import FAQ from '../components/FAQ';
import GHLForm from '../components/GHLForm';
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
  { question: "What areas do you serve?", answer: "We serve Nashville and the greater Middle Tennessee area, including Murfreesboro, Clarksville, Franklin, Brentwood, Hendersonville, Gallatin, Smyrna, Spring Hill, Mount Juliet, and Lebanon. If you're not sure whether we cover your area, just give us a call." },
];

const allCities = [
  ...config.serviceAreas.mvp,
  ...config.serviceAreas.expansion,
];

export default function HomePage() {
  const lbSchema = localBusinessSchema();
  const faqSchemaData = faqSchema(faqs);

  return (
    <>
      <SchemaMarkup schema={lbSchema} />
      <SchemaMarkup schema={faqSchemaData} />

      {/* HERO */}
      <section className="relative min-h-[600px] md:min-h-[700px] flex items-center justify-center">
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
      <section className="bg-primary py-6">
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
      <section className="py-16 px-4 bg-white" id="services">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Our Roofing Services</h2>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">From routine repairs to full roof replacements, we handle every roofing need in Nashville and Middle Tennessee.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {config.services.map(service => {
              const IconComp = iconMap[service.icon] || Home;
              return (
                <div key={service.slug} className="bg-bg-alt rounded-2xl p-6 hover:shadow-lg transition-shadow group">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <IconComp className="text-primary transition-colors" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-3">{service.name}</h3>
                  <p className="text-text-muted text-sm leading-relaxed mb-4">{serviceDescriptions[service.slug]}</p>
                  <Link href={`/services/${service.slug}`} className="text-primary font-semibold text-sm hover:text-primary-light transition-colors underline underline-offset-2">
                    Learn More &rarr;
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ABOUT US */}
      <section className="py-16 px-4 bg-bg-alt">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-primary font-semibold uppercase tracking-widest text-sm mb-2">About Us</p>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Reliable Roofing</h2>
              <p className="text-text-muted leading-relaxed text-base">
                At Stellar Roofing &amp; Restorations, we're committed to providing homeowners in Nashville and throughout Middle Tennessee with roofing services they can truly rely on. The company is led by Nate, who has spent many years working in the roofing industry and understands firsthand the importance of quality craftsmanship, honest communication, and dependable service. Our team focuses on delivering durable roofing solutions—from repairs and storm damage restoration to full roof replacements—using proven materials and professional installation techniques. When you choose Stellar Roofing &amp; Restorations, you're choosing a local roofing company that takes pride in protecting your home and standing behind every job we complete.
              </p>
              <Link href="/about" className="mt-6 inline-block bg-primary hover:bg-primary-light text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                Learn About Us
              </Link>
            </div>
            <div className="relative h-80 rounded-2xl overflow-hidden shadow-xl">
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
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-primary font-semibold uppercase tracking-widest text-sm mb-2">The Process</p>
            <h2 className="text-3xl md:text-4xl font-bold text-primary">Our Simple 3 Step Process</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Contact Us", desc: "Start by completing the 'Get a Free Quote' form on our website to share your Roofing needs with us so we can take care of you." },
              { step: "02", title: "Schedule Your Estimate", desc: "Next, we'll arrange a property visit at a time that works for you to provide an in-person estimate for your Roofing needs." },
              { step: "03", title: "Get The Job Done", desc: "After you approve our estimate, we'll schedule a date to complete the job. Our team will work hard to exceed your expectations!" },
            ].map(({ step, title, desc }) => (
              <div key={step} className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-primary/20">
                  <span className="text-white font-bold text-xl">{step}</span>
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">{title}</h3>
                <p className="text-text-muted leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-16 px-4 bg-bg-alt">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Why Nashville Homeowners Choose Stellar</h2>
            <p className="text-text-muted text-lg">We're not just another roofing company — we're your neighbor, and we stand behind our work.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                Icon: Shield,
                title: "Lifetime Warranty",
                desc: "Every roof we install comes with a lifetime warranty. We use premium materials and professional installation techniques because we want your roof to outlast our competition's work."
              },
              {
                Icon: FileCheck,
                title: "Insurance Claims Help",
                desc: "Storm damage? We know the insurance claims process inside and out. Our team works directly with your insurance adjuster to make sure you get the coverage you're entitled to."
              },
              {
                Icon: MapPin,
                title: "Local & Trusted",
                desc: "We're a Nashville-based company, not a national franchise. Nate and the team are your neighbors — we care about this community and our reputation depends on making you happy."
              }
            ].map(({ Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">{title}</h3>
                <p className="text-text-muted leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICE AREAS */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Proudly Serving Nashville &amp; Middle Tennessee</h2>
            <p className="text-text-muted text-lg">We provide expert roofing services throughout the greater Nashville metro area.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                {config.serviceAreas.mvp.map(a => (
                  <Link key={a.slug} href={`/service-areas/${a.slug}`} className="flex items-center gap-2 bg-bg-alt hover:bg-primary hover:text-white rounded-lg px-4 py-3 text-sm font-medium text-primary transition-colors">
                    <MapPin size={14} />
                    {a.city}
                  </Link>
                ))}
                {config.serviceAreas.expansion.map(a => (
                  <div key={a.slug} className="flex items-center gap-2 bg-bg-alt rounded-lg px-4 py-3 text-sm text-text-muted">
                    <MapPin size={14} />
                    {a.city}
                  </div>
                ))}
              </div>
              <p className="text-text-muted text-sm">Don't see your city? Call us — we may still be able to help. <a href={`tel:${config.business.phoneRaw}`} className="text-primary font-semibold hover:text-primary-light underline">{config.business.phone}</a></p>
            </div>
            <div className="flex items-center justify-center py-4">
              <Image
                src="/images/logo-mascot-thumbsup.png"
                alt="Stellar Roofing mascot"
                width={350}
                height={350}
                className="h-[350px] w-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="py-16 px-4 bg-bg-alt">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">What Our Customers Say</h2>
            <p className="text-text-muted text-lg">Real reviews from Nashville homeowners and business owners.</p>
          </div>

          {/* GHL-WIDGET: Review Widget */}
          <div id="ghl-reviews" className="mb-10">
            {/* REPLACE WITH GHL REVIEW WIDGET EMBED SCRIPT */}
          </div>

          {/* Fallback review cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "James R.", city: "Nashville", service: "Storm Damage Repair", text: "Nate and his crew replaced our entire roof after the spring storms. They handled the insurance paperwork and made the whole process stress-free. The new roof looks incredible and they cleaned up everything when they were done. Highly recommend Stellar Roofing." },
              { name: "Amanda K.", city: "Murfreesboro", service: "Roof Replacement", text: "We got three estimates for our roof replacement and Stellar was the best value by far. Professional crew, quality materials, and they finished in one day. The lifetime warranty sealed the deal for us." },
              { name: "David M.", city: "Franklin", service: "Roof Repair", text: "Had a roof leak during a bad storm and called Stellar for an emergency repair. They were out the next morning and had it patched up before lunch. Fair price, honest assessment, and great communication the entire time." },
            ].map(({ name, city, service, text }) => (
              <div key={name} className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} className="text-primary fill-primary" />)}
                </div>
                <p className="text-text-muted text-sm leading-relaxed mb-4">"{text}"</p>
                <div>
                  <p className="font-semibold text-text-dark">{name}</p>
                  <p className="text-text-muted text-xs">{city} &mdash; {service}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <CTABanner />

      {/* FAQ */}
      <FAQ faqs={faqs} />
    </>
  );
}
