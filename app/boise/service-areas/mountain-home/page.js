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
  title: "Roofing Company Mountain Home ID | Elmore County | Stellar Roofing",
  description: "Trusted roofing contractor in Mountain Home, ID. Roof replacement, repair, wind & storm damage for Elmore County homes. Free estimates, lifetime warranty. Call today.",
  alternates: { canonical: 'https://thestellarroofing.com/boise/service-areas/mountain-home' },
};

const faqs = [
  { question: "Do you serve Mountain Home, ID?", answer: "Yes. We serve Mountain Home and the surrounding Elmore County area. We handle roof replacements, repairs, wind and storm damage assessments, and insurance claims for Mountain Home homeowners." },
  { question: "Is Mountain Home at risk for wind damage?", answer: "Absolutely. Mountain Home's high desert location makes it one of the more wind-exposed communities in southwest Idaho. Sitting along the open Snake River Plain with little natural windbreak, Mountain Home sees persistent high-wind events that can lift shingles, damage ridge caps, and stress roofing systems year-round. Wind uplift is the primary roofing concern here — a free inspection is the best way to know whether your roof has sustained damage." },
  { question: "How much does a roof replacement cost in Mountain Home?", answer: "Roof replacement in Mountain Home typically ranges from $11,000 to $25,000 depending on roof size, pitch, and materials. We provide free written estimates with no obligation." },
];

export default function MountainHomePage() {
  const svcSchema = serviceSchema({
    name: "Roofing Services in Mountain Home, ID",
    description: "Professional roofing services in Mountain Home, ID and Elmore County including roof replacement, repair, and wind and storm damage restoration.",
    url: "https://thestellarroofing.com/boise/service-areas/mountain-home",
    areaServed: "Mountain Home, ID",
    phone: loc.phone,
  });

  return (
    <>
      <SchemaMarkup schema={svcSchema} />
      <SchemaMarkup schema={faqSchema(faqs)} />

      <Breadcrumbs items={[
        { name: "Boise", path: "/boise" },
        { name: "Service Areas", path: "/boise#service-areas" },
        { name: "Mountain Home", path: "/boise/service-areas/mountain-home" },
      ]} />

      <section className="relative h-64 md:h-80 flex items-center">
        <Image src="/images/service-storm-damage.jpg" alt="Roofing company in Mountain Home, ID" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-primary/75" />
        <div className="relative z-10 px-4 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-white/80 mb-2"><MapPin size={18} /><span className="font-semibold text-sm">Mountain Home, ID — Elmore County</span></div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Roofing Company in Mountain Home, ID</h1>
          <p className="text-white/90 text-lg mb-5">Serving Elmore County with professional roofing services.</p>
          <a href={`tel:${loc.phoneRaw}`} className="inline-flex items-center gap-2 bg-white hover:bg-white/90 text-primary font-bold px-6 py-3 rounded-lg transition-colors">
            <Phone size={18} /> {loc.phone}
          </a>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Roofing in Mountain Home, ID</h2>
          <p className="text-text-muted leading-relaxed mb-6">
            Mountain Home is the county seat of Elmore County, situated in the high desert of southwest Idaho along I-84 between Boise and Twin Falls. Home to Mountain Home Air Force Base, the city has a steady residential population that includes both long-term community members and military families who rotate through the area regularly.
          </p>
          <p className="text-text-muted leading-relaxed mb-6">
            Idaho's high desert climate presents real roofing challenges in Mountain Home — intense UV exposure from high-altitude sun, significant and persistent wind, and winter freeze-thaw cycles. Wind is the primary roofing threat here: Mountain Home sits on the open Snake River Plain with little terrain to break the flow of air, and high-wind events are frequent enough that wind uplift damage is a regular occurrence. We use materials and installation techniques appropriate for this demanding climate, including wind-rated shingles and proper fastening systems designed to hold up in southwest Idaho's conditions.
          </p>
          <p className="text-text-muted leading-relaxed mb-8">
            Stellar Roofing &amp; Restorations serves Mountain Home homeowners with the same honest approach and lifetime workmanship warranty we deliver throughout our service area. Free inspections, no-pressure estimates, quality work.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Roofing Services in Mountain Home, ID</h2>
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
          <GHLForm type="quote" title="Get a Free Roofing Estimate in Mountain Home" />
        </div>
      </section>

      <CTABanner heading="Mountain Home — Free Roof Inspection Available" subtext="Honest assessments, lifetime warranty, no pressure." phone={loc.phone} phoneRaw={loc.phoneRaw} />
      <FAQ faqs={faqs} heading="Mountain Home Roofing FAQs" />
    </>
  );
}
