import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, Shield, BadgeCheck, MapPin, Users } from 'lucide-react';
import Breadcrumbs from '../../components/Breadcrumbs';
import CTABanner from '../../components/CTABanner';
import SchemaMarkup from '../../components/SchemaMarkup';
import { localBusinessSchema } from '../../lib/schema';
import config from '../../lib/config';

export const metadata = {
  title: "About Stellar Roofing & Restorations | Nashville Roofing Company",
  description: "Learn about Stellar Roofing & Restorations — Nashville's trusted local roofing company. Led by owner Nate, we deliver honest service and quality craftsmanship throughout Middle Tennessee.",
  alternates: { canonical: 'https://thestellarroofing.com/about' },
};

export default function AboutPage() {
  const lbSchema = localBusinessSchema();

  return (
    <>
      <SchemaMarkup schema={lbSchema} />

      <Breadcrumbs items={[
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
      ]} />

      {/* HERO */}
      <section className="bg-primary py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">About Stellar Roofing &amp; Restorations</h1>
          <p className="text-white/80 text-xl">Nashville's local roofing company — built on honest service and quality craftsmanship.</p>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-primary font-semibold uppercase tracking-widest text-sm mb-2">About Us</p>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Reliable Roofing</h2>
              <p className="text-text-muted leading-relaxed text-base mb-6">
                At Stellar Roofing &amp; Restorations, we're committed to providing homeowners in Nashville and throughout Middle Tennessee with roofing services they can truly rely on. The company is led by Nate, who has spent many years working in the roofing industry and understands firsthand the importance of quality craftsmanship, honest communication, and dependable service.
              </p>
              <p className="text-text-muted leading-relaxed text-base mb-6">
                Our team focuses on delivering durable roofing solutions—from repairs and storm damage restoration to full roof replacements—using proven materials and professional installation techniques. When you choose Stellar Roofing &amp; Restorations, you're choosing a local roofing company that takes pride in protecting your home and standing behind every job we complete.
              </p>
              <p className="text-text-muted leading-relaxed text-base">
                Founded in {config.business.yearFounded}, Stellar Roofing &amp; Restorations has grown steadily by doing things the right way: honest inspections, fair prices, quality work, and standing behind every project with a lifetime warranty on workmanship. We don't chase volume at the expense of quality — we'd rather earn your referral by doing the job right the first time.
              </p>
            </div>
            <div className="space-y-4">
              <div className="relative h-64 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/crew-working.jpg"
                  alt="Stellar Roofing crew working on a Nashville roof"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-48 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/crew-working-02.jpg"
                  alt="Stellar Roofing team on a project in Middle Tennessee"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMPANY VALUES */}
      <section className="py-16 px-4 bg-bg-alt">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">What Sets Us Apart</h2>
            <p className="text-text-muted text-lg">We're not the biggest roofing company in Nashville. We're just the most committed to doing things right.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { Icon: Shield, title: "Lifetime Warranty", desc: "Every roof replacement we complete is backed by a lifetime workmanship warranty. If something goes wrong with our work, we'll make it right." },
              { Icon: BadgeCheck, title: "Licensed & Insured", desc: "Fully licensed and insured in Tennessee. You're protected, and so is our team. We never cut corners on compliance." },
              { Icon: MapPin, title: "Locally Owned", desc: "We're a Nashville-based company, not a national franchise. Your money stays in the community and you deal with real local people." },
              { Icon: Users, title: "Honest Assessments", desc: "We tell you what your roof actually needs — even if that means telling you it's in great shape and doesn't need work right now." },
            ].map(({ Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-6 shadow-sm text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="text-primary" size={24} />
                </div>
                <h3 className="font-bold text-primary mb-2">{title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CREDENTIALS */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">Our Credentials</h2>
          <ul className="space-y-3 mb-8">
            {[
              "Licensed roofing contractor in the state of Tennessee",
              "Fully insured — general liability and workers' compensation",
              "Experienced insurance claims specialists — we've worked with all major carriers",
              "Premium manufacturer-certified installers — required for lifetime warranty coverage",
              "Serving Nashville and Middle Tennessee since " + config.business.yearFounded,
            ].map(item => (
              <li key={item} className="flex items-start gap-3 text-text-muted">
                <CheckCircle2 size={18} className="text-primary flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* REVIEWS PREVIEW */}
      <section className="py-16 px-4 bg-bg-alt">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-primary mb-4">What Customers Say About Us</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              { name: "Lisa H.", city: "Brentwood", text: "Stellar did a free inspection on our 18-year-old roof and gave us an honest assessment. No pressure at all. When we were ready to move forward with the replacement, the whole process was smooth and professional." },
              { name: "Robert P.", city: "Nashville", text: "We needed a new roof on our commercial building and Stellar handled it perfectly. They worked around our business hours so we didn't lose any downtime. Great team to work with." },
            ].map(({ name, city, text }) => (
              <div key={name} className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-primary fill-primary" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                  ))}
                </div>
                <p className="text-text-muted text-sm leading-relaxed mb-4">"{text}"</p>
                <p className="font-semibold text-text-dark">{name} — {city}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        heading="Ready to Work with Nashville's Most Trusted Roofer?"
        subtext="Call us today for a free, no-obligation roof inspection and estimate."
        ctaText="Get Your Free Estimate"
      />
    </>
  );
}
