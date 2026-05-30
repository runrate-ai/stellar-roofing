import Image from 'next/image';
import { CheckCircle2, Phone, AlertTriangle, Clock } from 'lucide-react';
import Breadcrumbs from '../../../../components/Breadcrumbs';
import CTABanner from '../../../../components/CTABanner';
import FAQ from '../../../../components/FAQ';
import GHLForm from '../../../../components/GHLForm';
import SchemaMarkup from '../../../../components/SchemaMarkup';
import { serviceSchema, faqSchema } from '../../../../lib/schema';
import config from '../../../../lib/config';

const loc = config.locations.nashville;

export const metadata = {
  title: "Emergency Roof Repair Nashville TN | Active Leaks & Storm Damage | Stellar Roofing",
  description: "Emergency roof repair in Nashville, TN. Active leaks, blown-off shingles, storm damage — we respond fast. Temporary tarping + permanent repairs. Call (629) 277-4249 now.",
  alternates: { canonical: 'https://thestellarroofing.com/nashville/services/emergency-roof-repair' },
};

const faqs = [
  { question: "What qualifies as an emergency roof repair?", answer: "Any situation where water is actively entering your home, a section of your roof has collapsed or is severely damaged, large portions of shingles have blown off, or structural integrity has been compromised qualifies as a roofing emergency. When in doubt, call us and we'll help you assess the situation." },
  { question: "How fast can you respond to an emergency in Nashville?", answer: "We prioritize emergency calls and aim to respond the next morning in most cases. For urgent situations — active interior flooding or severe structural damage — call us directly and we'll do our best to get someone out as quickly as possible." },
  { question: "What's the difference between a temporary and permanent repair?", answer: "A temporary repair (like tarping) is meant to stop immediate water intrusion and protect your home until a permanent repair can be made. A permanent repair restores your roof to full integrity using proper materials." },
  { question: "Will insurance cover emergency roof repair?", answer: "If the damage was caused by a covered event like a storm or wind, your homeowners insurance should cover emergency repairs. Document everything with photos before any temporary repairs are made." },
];

export default function EmergencyRoofRepairNashvillePage() {
  const svcSchema = serviceSchema({
    name: "Emergency Roof Repair in Nashville, TN",
    description: "Fast emergency roof repair in Nashville, TN. We respond quickly to active leaks, storm damage, and urgent roofing issues.",
    url: "https://thestellarroofing.com/nashville/services/emergency-roof-repair",
    areaServed: "Nashville, TN",
    phone: loc.phone,
  });

  return (
    <>
      <SchemaMarkup schema={svcSchema} />
      <SchemaMarkup schema={faqSchema(faqs)} />

      <Breadcrumbs items={[
        { name: "Home", path: "/nashville" },
        { name: "Services", path: "/nashville#services" },
        { name: "Emergency Roof Repair", path: "/nashville/services/emergency-roof-repair" },
      ]} />

      <section className="relative h-72 md:h-96 flex items-center">
        <Image src="/images/service-storm-damage.jpg" alt="Emergency roof repair in Nashville, TN" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-primary/80" />
        <div className="relative z-10 px-4 max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <AlertTriangle className="text-white" size={28} />
            <span className="text-white font-bold uppercase tracking-wider text-sm">Emergency Service</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Emergency Roof Repair in Nashville, TN</h1>
          <p className="text-white/90 text-xl mb-6">Active leak? Call us now. We respond fast.</p>
          <a href={`tel:${loc.phoneRaw}`} className="inline-flex items-center gap-2 bg-white hover:bg-white/90 text-primary font-extrabold px-8 py-4 rounded-lg transition-colors text-xl">
            <Phone size={22} /> {loc.phone}
          </a>
        </div>
      </section>

      <div className="bg-red-50 border-l-4 border-red-500 py-5 px-6">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Clock className="text-red-500 flex-shrink-0" size={24} />
          <div>
            <p className="font-bold text-red-700">Dealing with an active roof emergency right now?</p>
            <p className="text-red-600 text-sm">Call us immediately: <a href={`tel:${loc.phoneRaw}`} className="font-bold underline">{loc.phone}</a> — Do NOT wait for a callback form if water is entering your home.</p>
          </div>
        </div>
      </div>

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

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="font-bold text-blue-800 mb-3">Temporary Repair Options</h3>
              <ul className="space-y-2">
                {["Heavy-duty roof tarping", "Emergency sealant application", "Temporary flashing", "Board-up services for structural damage"].map(item => (
                  <li key={item} className="text-blue-700 text-sm flex items-start gap-2">
                    <CheckCircle2 size={15} className="flex-shrink-0 mt-0.5" />{item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <h3 className="font-bold text-green-800 mb-3">Permanent Repair Solutions</h3>
              <ul className="space-y-2">
                {["Full shingle replacement", "Structural decking repair", "Flashing replacement", "Complete damaged section re-roofing"].map(item => (
                  <li key={item} className="text-green-700 text-sm flex items-start gap-2">
                    <CheckCircle2 size={15} className="flex-shrink-0 mt-0.5" />{item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-primary rounded-2xl p-10 text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Roof Emergency? Call Right Now.</h2>
            <p className="text-white/80 mb-6">Don't wait. Every minute water is in your home causes more damage.</p>
            <a href={`tel:${loc.phoneRaw}`} className="inline-flex items-center gap-3 bg-white hover:bg-white/90 text-primary font-extrabold px-10 py-5 rounded-xl transition-colors text-2xl">
              <Phone size={28} /> {loc.phone}
            </a>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-bg-alt">
        <div className="max-w-2xl mx-auto">
          <GHLForm type="quote" title="Request Emergency Roof Repair" />
        </div>
      </section>

      <CTABanner heading="Don't Let Roof Damage Get Worse" subtext="Fast response, professional repairs, insurance claims help. Call or fill out the form now." ctaText="Contact Us Now" phone={loc.phone} phoneRaw={loc.phoneRaw} />
      <FAQ faqs={faqs} heading="Emergency Repair FAQs" />
    </>
  );
}
