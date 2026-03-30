import Link from 'next/link';
import { CheckCircle2, Phone, Shield, SearchCheck, BadgeCheck, FileCheck } from 'lucide-react';
import Breadcrumbs from '../../components/Breadcrumbs';
import GHLForm from '../../components/GHLForm';
import SchemaMarkup from '../../components/SchemaMarkup';
import { serviceSchema } from '../../lib/schema';
import config from '../../lib/config';

export const metadata = {
  title: "Free Roof Inspection Nashville TN | Schedule Now | Stellar Roofing",
  description: "Schedule a free roof inspection in Nashville, TN. No obligation, no pressure — just an honest assessment of your roof. Call Stellar Roofing (629) 277-4249.",
  alternates: { canonical: 'https://thestellarroofing.com/free-inspection' },
};

export default function FreeInspectionPage() {
  const svcSchema = serviceSchema({
    name: "Free Roof Inspection",
    description: "Free, no-obligation roof inspections in Nashville, TN for homeowners and businesses.",
    url: "https://thestellarroofing.com/free-inspection",
  });

  return (
    <>
      <SchemaMarkup schema={svcSchema} />

      <Breadcrumbs items={[
        { name: "Home", path: "/" },
        { name: "Free Inspection", path: "/free-inspection" },
      ]} />

      {/* HERO */}
      <section className="bg-primary py-14 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-primary font-semibold uppercase tracking-widest text-sm mb-3">100% Free. Zero Obligation.</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Schedule Your Free Roof Inspection</h1>
          <p className="text-white/80 text-xl mb-6">An honest look at your roof — with no pressure to buy anything.</p>
          <a href={`tel:${config.business.phoneRaw}`} className="inline-flex items-center gap-2 bg-white hover:bg-white/90 text-primary font-bold px-8 py-4 rounded-lg transition-colors text-lg">
            <Phone size={20} /> Call {config.business.phone}
          </a>
        </div>
      </section>

      {/* TRUST SIGNALS */}
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
                <Icon className="text-white" size={26} />
                <span className="text-white font-semibold text-sm">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">What's Included in Your Free Inspection</h2>
              <p className="text-text-muted leading-relaxed mb-6">
                Our inspectors physically get on your roof and conduct a comprehensive, systematic evaluation. We document everything we find with photos and give you a straight answer about the condition of your roof. No fluff, no scare tactics, no pressure.
              </p>

              <h3 className="text-lg font-bold text-primary mb-4">We check everything:</h3>
              <ul className="space-y-3 mb-8">
                {[
                  { title: "Shingles", desc: "Condition, granule loss, curling, cracking, hail bruising, missing pieces" },
                  { title: "Flashing", desc: "Chimney, skylights, pipe boots, valleys, wall intersections" },
                  { title: "Gutters & Drainage", desc: "Granule buildup, attachment, slope, gutter damage" },
                  { title: "Ventilation", desc: "Ridge vents, soffit vents, attic ventilation adequacy" },
                  { title: "Decking", desc: "Soft spots, rot, water damage, structural integrity" },
                  { title: "Attic (if accessible)", desc: "Signs of water intrusion, mold, insulation issues" },
                ].map(({ title, desc }) => (
                  <li key={title} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-text-dark">{title}: </span>
                      <span className="text-text-muted text-sm">{desc}</span>
                    </div>
                  </li>
                ))}
              </ul>

              <h2 className="text-2xl font-bold text-primary mb-4">No Obligation. No Pressure. Ever.</h2>
              <p className="text-text-muted leading-relaxed mb-4">
                We believe every homeowner deserves honest information about the condition of their roof. Our free inspections come with zero pressure. If your roof is in great shape, we'll tell you and walk away. If we find issues, we'll explain your options clearly and let you decide what to do — on your timeline, not ours.
              </p>
              <p className="text-text-muted leading-relaxed mb-6">
                That's how we do business. And it's why Nashville homeowners trust Stellar Roofing &amp; Restorations.
              </p>

              <div className="bg-bg-alt rounded-2xl p-6">
                <h3 className="font-bold text-primary mb-3">When should you schedule an inspection?</h3>
                <ul className="space-y-2">
                  {[
                    "After a hailstorm, tornado, or high-wind event",
                    "If you see water stains on your ceiling",
                    "If your roof is 15+ years old",
                    "Before buying or selling your home",
                    "If you're filing or considering an insurance claim",
                    "If you just want peace of mind",
                  ].map(item => (
                    <li key={item} className="text-text-muted text-sm flex items-start gap-2">
                      <CheckCircle2 size={14} className="text-primary flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* GHL FORM */}
            <div>
              <GHLForm type="inspection" title="Schedule Your Free Inspection" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
