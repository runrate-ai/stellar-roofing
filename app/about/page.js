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
      <section className="bg-primary py-20 px-4">
        <div className="max-w-4xl mx-auto text-center reveal">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">About Stellar Roofing &amp; Restorations</h1>
          <p className="text-white/80 text-xl md:text-2xl font-medium max-w-2xl mx-auto leading-relaxed">Nashville's local roofing company — built on honest service and quality craftsmanship.</p>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="py-20 px-4 bg-white reveal">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="reveal reveal-delay-1">
              <p className="text-primary font-bold uppercase tracking-widest text-sm mb-3">Our Story</p>
              <h2 className="text-3xl md:text-5xl font-bold text-primary mb-8">Nashville's Trusted Experts</h2>
              <div className="space-y-6 text-text-muted leading-relaxed text-lg">
                <p>
                  At Stellar Roofing &amp; Restorations, we're committed to providing homeowners in Nashville and throughout Middle Tennessee with roofing services they can truly rely on. The company is led by Nate, who has spent many years working in the roofing industry and understands firsthand the importance of quality craftsmanship, honest communication, and dependable service.
                </p>
                <p>
                  Our team focuses on delivering durable roofing solutions—from repairs and storm damage restoration to full roof replacements—using proven materials and professional installation techniques. When you choose Stellar Roofing &amp; Restorations, you're choosing a local roofing company that takes pride in protecting your home and standing behind every job we complete.
                </p>
                <p>
                  Founded in {config.business.yearFounded}, Stellar Roofing &amp; Restorations has grown steadily by doing things the right way: honest inspections, fair prices, quality work, and standing behind every project with a lifetime warranty on workmanship.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 reveal reveal-delay-2">
              <div className="relative h-80 rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/crew-working.jpg"
                  alt="Stellar Roofing crew working on a Nashville roof"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-64 rounded-3xl overflow-hidden shadow-2xl">
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
      <section className="py-20 px-4 bg-bg-alt reveal">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-4">What Sets Us Apart</h2>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">We're not the biggest roofing company in Nashville. We're just the most committed to doing things right.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { Icon: Shield, title: "Lifetime Warranty", desc: "Every roof replacement we complete is backed by a lifetime workmanship warranty. If something goes wrong with our work, we'll make it right." },
              { Icon: BadgeCheck, title: "Licensed & Insured", desc: "Fully licensed and insured in Tennessee. You're protected, and so is our team. We never cut corners on compliance." },
              { Icon: MapPin, title: "Locally Owned", desc: "We're a Nashville-based company, not a national franchise. Your money stays in the community and you deal with real local people." },
              { Icon: Users, title: "Honest Assessments", desc: "We tell you what your roof actually needs — even if that means telling you it's in great shape and doesn't need work right now." },
            ].map(({ Icon, title, desc }, i) => (
              <div key={title} className={`bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 text-center reveal reveal-delay-${i + 1}`}>
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary transition-colors duration-300">
                  <Icon className="text-primary group-hover:text-white" size={32} />
                </div>
                <h3 className="text-xl font-bold text-primary mb-4">{title}</h3>
                <p className="text-text-muted text-base leading-relaxed">{desc}</p>
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
