import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, Phone, AlertTriangle, Clock } from 'lucide-react';
import Breadcrumbs from '../../../components/Breadcrumbs';
import CTABanner from '../../../components/CTABanner';
import FAQ from '../../../components/FAQ';
import GHLForm from '../../../components/GHLForm';
import SchemaMarkup from '../../../components/SchemaMarkup';
import { serviceSchema, faqSchema } from '../../../lib/schema';
import config from '../../../lib/config';

export const metadata = {
  title: "Emergency Roof Repair Nashville TN | Fast Response | Stellar Roofing",
  description: "Emergency roof repair in Nashville, TN. Active leaks, storm damage, roof collapses — we respond fast. Call Stellar Roofing 24/7 at (629) 277-4249.",
  alternates: { canonical: 'https://thestellarroofing.com/services/emergency-roof-repair' },
};

const faqs = [
  { question: "What qualifies as an emergency roof repair?", answer: "Any situation where water is actively entering your home, a section of your roof has collapsed or is severely damaged, large portions of shingles have blown off, or structural integrity has been compromised qualifies as a roofing emergency. When in doubt, call us and we'll help you assess the situation." },
  { question: "How fast can you respond to an emergency in Nashville?", answer: "We prioritize emergency calls and aim to respond the next morning in most cases. For urgent situations — active interior flooding or severe structural damage — call us directly and we'll do our best to get someone out as quickly as possible." },
  { question: "What's the difference between a temporary and permanent repair?", answer: "A temporary repair (like tarping) is meant to stop immediate water intrusion and protect your home until a permanent repair can be made. A permanent repair restores your roof to full integrity using proper materials. We'll be transparent about which approach is appropriate for your situation." },
  { question: "Will insurance cover emergency roof repair?", answer: "If the damage was caused by a covered event like a storm or wind, your homeowners insurance should cover emergency repairs. Document everything with photos before any temporary repairs are made, and call your insurance company to report the claim." },
];

export default function EmergencyRoofRepairPage() {
  const svcSchema = serviceSchema({
    name: "Emergency Roof Repair",
    description: "Fast emergency roof repair in Nashville, TN. We respond quickly to active leaks, storm damage, and urgent roofing issues.",
    url: "https://thestellarroofing.com/services/emergency-roof-repair",
  });
  const faqSchemaData = faqSchema(faqs);

  return (
    <>
      <SchemaMarkup schema={svcSchema} />
      <SchemaMarkup schema={faqSchemaData} />

      <Breadcrumbs items={[
        { name: "Home", path: "/" },
        { name: "Services", path: "/#services" },
        { name: "Emergency Roof Repair", path: "/services/emergency-roof-repair" },
      ]} />

      {/* HERO */}
      <section className="relative h-72 md:h-96 flex items-center">
        <Image
          src="/images/service-storm-damage.jpg"
          alt="Emergency roof repair in Nashville, TN"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-primary/80" />
        <div className="relative z-10 px-4 max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <AlertTriangle className="text-primary" size={28} />
            <span className="text-primary font-bold uppercase tracking-wider text-sm">Emergency Service</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Emergency Roof Repair in Nashville, TN</h1>
          <p className="text-white/90 text-xl mb-6">Active leak? Call us now. We respond fast.</p>
          <a href={`tel:${config.business.phoneRaw}`} className="inline-flex items-center gap-2 bg-white hover:bg-white/90 text-primary font-bold px-8 py-4 rounded-lg transition-colors text-xl">
            <Phone size={22} /> {config.business.phone}
          </a>
        </div>
      </section>

      {/* EMERGENCY CALL-OUT */}
      <div className="bg-red-50 border-l-4 border-red-500 py-5 px-6">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Clock className="text-red-500 flex-shrink-0" size={24} />
          <div>
            <p className="font-bold text-red-700">Dealing with an active roof emergency right now?</p>
            <p className="text-red-600 text-sm">Call us immediately: <a href={`tel:${config.business.phoneRaw}`} className="font-bold underline">{config.business.phone}</a> — Do NOT wait for a callback form if water is entering your home.</p>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-text-muted leading-relaxed mb-8">
            When your roof fails unexpectedly — during a storm, after severe wind damage, or because of a sudden structural issue — you need a roofing team that responds fast and does the job right. Stellar Roofing &amp; Restorations provides emergency roof repair services throughout Nashville and Middle Tennessee, getting to you quickly to assess the damage, protect your home from further harm, and complete proper repairs as fast as possible.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">What Qualifies as a Roofing Emergency?</h2>
          <ul className="space-y-3 mb-8">
            {[
              "Active water leaking into your home or business",
              "Large sections of shingles blown off by high winds",
              "Tree limb or fallen debris damage that has compromised roof integrity",
              "Roof decking exposed to the elements",
              "Visible sagging or partial collapse of any roof section",
              "Chimney, skylight, or vent that has been dislodged or damaged",
              "Severe hail damage that has created immediate leak points",
            ].map(item => (
              <li key={item} className="flex items-start gap-3 text-text-muted">
                <AlertTriangle size={18} className="text-red-400 flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Our Emergency Response Process</h2>
          <ol className="space-y-4 mb-8">
            {[
              { n: "1", title: "Call Us Immediately", desc: "Call our team directly. Describe what's happening so we can prioritize your call appropriately and provide any immediate guidance." },
              { n: "2", title: "Rapid Assessment", desc: "We get to your property as quickly as possible to assess the full scope of the damage. We'll be honest with you about what we find and what needs to happen next." },
              { n: "3", title: "Temporary Protection (if needed)", desc: "If a permanent repair can't be completed immediately, we apply emergency waterproofing measures — tarping, temporary sealants — to stop water intrusion and protect your home." },
              { n: "4", title: "Document Everything", desc: "We photograph all damage thoroughly. This documentation is critical if you need to file an insurance claim." },
              { n: "5", title: "Permanent Repair", desc: "Once we have the materials and conditions are safe, we complete the permanent repair to restore your roof to full integrity." },
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

          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Temporary vs. Permanent Repairs</h2>
          <p className="text-text-muted leading-relaxed mb-4">
            In an emergency, our first priority is stopping water from entering your home. Sometimes this means applying temporary measures while we source materials or wait for safe weather conditions. We'll always be transparent about what's temporary and what's permanent, and we'll never leave your home without protection.
          </p>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="font-bold text-blue-800 mb-3">Temporary Repair Options</h3>
              <ul className="space-y-2">
                {["Heavy-duty roof tarping", "Emergency sealant application", "Temporary flashing", "Board-up services for structural damage"].map(item => (
                  <li key={item} className="text-blue-700 text-sm flex items-start gap-2">
                    <CheckCircle2 size={15} className="flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <h3 className="font-bold text-green-800 mb-3">Permanent Repair Solutions</h3>
              <ul className="space-y-2">
                {["Full shingle replacement", "Structural decking repair", "Flashing replacement", "Complete damaged section re-roofing"].map(item => (
                  <li key={item} className="text-green-700 text-sm flex items-start gap-2">
                    <CheckCircle2 size={15} className="flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* BIG PHONE CTA */}
          <div className="bg-primary rounded-2xl p-10 text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Roof Emergency? Call Right Now.</h2>
            <p className="text-white/80 mb-6">Don't wait. Every minute water is in your home causes more damage.</p>
            <a
              href={`tel:${config.business.phoneRaw}`}
              className="inline-flex items-center gap-3 bg-white hover:bg-white/90 text-primary font-extrabold px-10 py-5 rounded-xl transition-colors text-2xl"
            >
              <Phone size={28} />
              {config.business.phone}
            </a>
          </div>
        </div>
      </section>

      {/* GHL FORM */}
      <section className="py-12 px-4 bg-bg-alt">
        <div className="max-w-2xl mx-auto">
          <GHLForm type="quote" title="Request Emergency Roof Repair" />
        </div>
      </section>

      <CTABanner
        heading="Don't Let Roof Damage Get Worse"
        subtext="Fast response, professional repairs, insurance claims help. Call or fill out the form now."
        ctaText="Contact Us Now"
      />

      <FAQ faqs={faqs} heading="Emergency Repair FAQs" />
    </>
  );
}
