import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, Phone, MapPin } from 'lucide-react';
import Breadcrumbs from '../../../../components/Breadcrumbs';
import CTABanner from '../../../../components/CTABanner';
import FAQ from '../../../../components/FAQ';
import GHLForm from '../../../../components/GHLForm';
import SchemaMarkup from '../../../../components/SchemaMarkup';
import { serviceSchema, faqSchema } from '../../../../lib/schema';
import config from '../../../../lib/config';

const loc = config.locations.boise;

export const metadata = {
  title: "Roofing Company Nampa ID | Canyon County Roofer | Stellar Roofing",
  description: "Trusted roofing contractor in Nampa, ID. Roof replacement, repair, wind damage & storm damage for Canyon County homes. Free estimates, lifetime warranty. Call today.",
  alternates: { canonical: 'https://thestellarroofing.com/boise/service-areas/nampa' },
};

const faqs = [
  { question: "Do you serve Nampa and Canyon County?", answer: "Yes. We serve Nampa and Canyon County as part of our Treasure Valley service area. Our team handles roof replacements, repairs, wind and storm damage, and insurance claims throughout the Nampa area." },
  { question: "Are Nampa homes at risk for wind damage?", answer: "Yes. Canyon County sees the same high-wind events as the rest of the Treasure Valley, driven by the gap effect that funnels air through the region. Wind uplift is a leading cause of shingle damage in the area. Nampa homeowners should schedule a free inspection after any notable wind or storm event." },
  { question: "Do you offer affordable roofing options in Nampa?", answer: "Yes. We offer a range of roofing materials and solutions at different price points and provide free, detailed estimates upfront. We'll give you honest recommendations without pressure toward more expensive options than you need." },
];

export default function NampaPage() {
  const svcSchema = serviceSchema({ name: "Roofing Services in Nampa, ID", description: "Professional roofing services in Nampa, ID and Canyon County including roof replacement, repair, and wind and storm damage restoration.", url: "https://thestellarroofing.com/boise/service-areas/nampa", areaServed: "Nampa, ID", phone: loc.phone });

  return (
    <>
      <SchemaMarkup schema={svcSchema} />
      <SchemaMarkup schema={faqSchema(faqs)} />

      <Breadcrumbs items={[{ name: "Boise", path: "/boise" }, { name: "Service Areas", path: "/boise#service-areas" }, { name: "Nampa", path: "/boise/service-areas/nampa" }]} />

      <section className="relative h-64 md:h-80 flex items-center">
        <Image src="/images/crew-working.jpg" alt="Roofing company in Nampa, ID" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-primary/75" />
        <div className="relative z-10 px-4 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-white/80 mb-2"><MapPin size={18} /><span className="font-semibold text-sm">Nampa, ID</span></div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Roofing Company in Nampa, ID</h1>
          <p className="text-white/90 text-lg mb-5">Serving Canyon County with quality roofing you can count on.</p>
          <a href={`tel:${loc.phoneRaw}`} className="inline-flex items-center gap-2 bg-white hover:bg-white/90 text-primary font-bold px-6 py-3 rounded-lg transition-colors">
            <Phone size={18} /> {loc.phone}
          </a>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Roofing in Nampa, ID</h2>
          <p className="text-text-muted leading-relaxed mb-6">Nampa is Canyon County's largest city and one of the most important communities in the Treasure Valley. Like the rest of the region, Nampa has experienced significant population growth in recent years, bringing a mix of new construction and an expanding stock of homes from the 1980s, 90s, and early 2000s that are now reaching an age where roofing needs become more pressing.</p>
          <p className="text-text-muted leading-relaxed mb-6">Canyon County sits in the same storm corridor as Ada County and sees regular high-wind events that can cause significant but often subtle damage to shingles. Wind uplift is the primary roofing threat in the area — lifted shingles, cracked ridge caps, and damaged flashing are common after Treasure Valley windstorms. Nampa also experiences the characteristic temperature swings — hot, UV-intense summers that dry out and crack asphalt shingles, and cold winters with snow and freeze-thaw cycles that stress aging roofing systems.</p>
          <p className="text-text-muted leading-relaxed mb-8">Stellar Roofing &amp; Restorations serves Nampa homeowners with the same professional, no-pressure approach and lifetime workmanship warranty we deliver throughout the Treasure Valley.</p>

          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Roofing Services in Nampa, ID</h2>
          <ul className="space-y-3 mb-8">
            {config.services.map(s => (
              <li key={s.slug} className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <Link href={`/boise/services/${s.slug}`} className="font-semibold text-primary hover:text-primary-light transition-colors">{s.name}</Link>
                  <span className="text-text-muted text-sm"> — {s.shortDescription}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-12 px-4 bg-bg-alt">
        <div className="max-w-2xl mx-auto">
          <GHLForm type="quote" title="Get a Free Roofing Estimate in Nampa" />
        </div>
      </section>

      <CTABanner heading="Nampa — Schedule Your Free Roof Inspection" subtext="Honest assessments, lifetime warranty, no pressure." phone={loc.phone} phoneRaw={loc.phoneRaw} />
      <FAQ faqs={faqs} heading="Nampa Roofing FAQs" />
    </>
  );
}
