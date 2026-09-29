import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, Phone, AlertTriangle, Clock } from 'lucide-react';
import Breadcrumbs from '../../../../components/Breadcrumbs';
import CTABanner from '../../../../components/CTABanner';
import FAQ from '../../../../components/FAQ';
import SiteLeadForm from '../../../../components/SiteLeadForm';
import SchemaMarkup from '../../../../components/SchemaMarkup';
import { serviceSchema, faqSchema } from '../../../../lib/schema';
import config from '../../../../lib/config';

const loc = config.locations.nashville;

export const metadata = {
  title: { absolute: "24/7 Emergency Roof Repair Nashville TN | Roof Leak Repair | Stellar Roofing" },
  description: "24/7 emergency roof repair and roof leak repair in Nashville, TN. Active leaks, blown-off shingles, fallen limbs, emergency roof tarping, then permanent repairs. Call (629) 277-4249 any time.",
  alternates: { canonical: 'https://www.thestellarroofing.com/nashville/services/emergency-roof-repair' },
};

const faqs = [
  { question: "What qualifies as an emergency roof repair?", answer: "Any situation where water is actively entering your home, a section of your roof has collapsed or is severely damaged, large portions of shingles have blown off, or structural integrity has been compromised qualifies as a roofing emergency. When in doubt, call us and we'll help you assess the situation." },
  { question: "How fast can you respond to an emergency in Nashville?", answer: "We answer the phone 24/7. Tell us what's happening, and we'll prioritize active leaks and serious damage and get someone out as quickly as we can. Call rather than using the form if water is coming in." },
  { question: "What's the difference between a temporary and permanent repair?", answer: "A temporary repair (like tarping) is meant to stop immediate water intrusion and protect your home until a permanent repair can be made. A permanent repair restores your roof to full integrity using proper materials." },
  { question: "Do you tarp roofs?", answer: "Yes. Emergency roof tarping is often the first step when shingles are missing or a limb has punched through. A properly secured tarp keeps water out until the permanent repair is done. If you can do it safely, photograph the damage before the tarp goes on." },
  { question: "How do you find where a roof leak is coming from?", answer: "Water travels along decking and rafters before it shows up on a ceiling, so the stain is rarely right under the hole. We check the usual sources first, including flashing at chimneys and walls, pipe boots, valleys, and damaged shingles, and trace the path from the attic when needed." },
  { question: "Will insurance cover emergency roof repair?", answer: "If the damage was caused by a covered event like a storm or wind, your homeowners insurance should cover emergency repairs. Document everything with photos before any temporary repairs are made." },
];

export default function EmergencyRoofRepairNashvillePage() {
  const svcSchema = serviceSchema({
    name: "Emergency Roof Repair in Nashville, TN",
    description: "Fast emergency roof repair in Nashville, TN. We respond quickly to active leaks, storm damage, and urgent roofing issues.",
    url: "https://www.thestellarroofing.com/nashville/services/emergency-roof-repair",
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
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">24/7 Emergency Roof Repair in Nashville, TN</h1>
          <p className="text-white/90 text-xl mb-6">Roof leaking? We answer 24/7. Call now.</p>
          <a href={`tel:${loc.phoneRaw}`} className="inline-flex items-center gap-2 bg-white hover:bg-white/90 text-primary font-extrabold px-8 py-4 rounded-lg transition-colors text-xl">
            <Phone size={22} /> {loc.phone}
          </a>
        </div>
      </section>

      <section id="estimate-section" className="py-10 px-4 bg-bg-alt">
        <div className="max-w-2xl mx-auto">
          <SiteLeadForm type="quote" title="Request Emergency Roof Repair" />
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

          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Roof Leak Repair in Nashville</h2>
          <p className="text-text-muted leading-relaxed mb-8">
            Most roof leaks start in a handful of places: flashing around chimneys, walls, and skylights; cracked pipe boots; valleys; and shingles lifted or torn off by wind. Because water runs along the decking before it drips, the stain on your ceiling is rarely right under the problem. We trace the leak to its source, photograph it, and fix it properly instead of smearing sealant over the spot. See our <Link href="/nashville/services/roof-repair" className="font-semibold text-primary underline">roof repair service</Link> and <Link href="/nashville/blog/how-much-does-roof-repair-cost" className="font-semibold text-primary underline">roof repair cost guide</Link>.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Emergency Roof Tarping</h2>
          <p className="text-text-muted leading-relaxed mb-8">
            When a storm tears off shingles or a limb punches through, a properly secured tarp is the fastest way to stop more water getting in. We tarp the damaged area, then come back for the permanent repair, and our photos double as documentation for your insurance claim. If hail or wind caused the damage, see our <Link href="/nashville/services/storm-damage-repair" className="font-semibold text-primary underline">storm damage repair</Link> page.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">What to Do While You Wait</h2>
          <ol className="space-y-3 mb-8 list-decimal pl-5 text-text-muted">
            <li><strong className="text-primary">Stay off the roof.</strong> Wet or storm-damaged roofs are dangerous. Leave it to us.</li>
            <li><strong className="text-primary">Keep away from water near electrical fixtures.</strong> If water is reaching lights or outlets, shut off power to that area at the breaker if you can do it safely.</li>
            <li><strong className="text-primary">Catch the water and move valuables.</strong> Buckets, towels, and plastic sheeting over furniture and electronics limit the damage.</li>
            <li><strong className="text-primary">Take photos.</strong> Photograph the ceiling, the water, and anything damaged. Your insurance company will want them.</li>
          </ol>

          <div className="bg-primary rounded-2xl p-10 text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Roof Emergency? Call Right Now.</h2>
            <p className="text-white/80 mb-6">Don't wait. Every minute water is in your home causes more damage.</p>
            <a href={`tel:${loc.phoneRaw}`} className="inline-flex items-center gap-3 bg-white hover:bg-white/90 text-primary font-extrabold px-10 py-5 rounded-xl transition-colors text-2xl">
              <Phone size={28} /> {loc.phone}
            </a>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Areas We Cover</h2>
          <div className="flex flex-wrap gap-3 mb-8">
            {loc.serviceAreas.map(a => (
              <Link key={a.slug} href={`/nashville/service-areas/${a.slug}`} className="bg-bg-alt hover:bg-slate-200 text-primary font-semibold text-sm px-4 py-2 rounded-full transition-colors">
                {a.city}, {a.state}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABanner heading="Don't Let Roof Damage Get Worse" subtext="Fast response, professional repairs, insurance claims help. Call or fill out the form now." ctaText="Contact Us Now" phone={loc.phone} phoneRaw={loc.phoneRaw} />
      <FAQ faqs={faqs} heading="Emergency Repair FAQs" />
    </>
  );
}
