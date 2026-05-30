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
  title: "Roofing Company Garden City ID | Ada County | Stellar Roofing",
  description: "Trusted roofing contractor in Garden City, ID. Roof replacement, repair, hail & storm damage for Ada County homes. Free estimates, lifetime warranty. Call today.",
  alternates: { canonical: 'https://thestellarroofing.com/boise/service-areas/garden-city' },
};

const faqs = [
  { question: "Do you serve Garden City, ID?", answer: "Yes. Garden City is adjacent to Boise and is part of our core service area. We handle roof replacements, repairs, hail damage assessments, and insurance claims throughout Garden City." },
  { question: "Is Garden City at risk for hail damage?", answer: "Yes. Garden City sits within Ada County and shares the same storm exposure as Boise. Spring and early summer hail events can affect the entire area. A free inspection after any storm is the best way to assess your roof's condition." },
  { question: "How much does a roof replacement cost in Garden City?", answer: "Roof replacement in Garden City typically ranges from $12,000 to $28,000 depending on roof size, pitch, and materials. We provide free written estimates with no obligation." },
];

export default function GardenCityPage() {
  const svcSchema = serviceSchema({
    name: "Roofing Services in Garden City, ID",
    description: "Professional roofing services in Garden City, ID including roof replacement, repair, and hail damage restoration.",
    url: "https://thestellarroofing.com/boise/service-areas/garden-city",
    areaServed: "Garden City, ID",
    phone: loc.phone,
  });

  return (
    <>
      <SchemaMarkup schema={svcSchema} />
      <SchemaMarkup schema={faqSchema(faqs)} />

      <Breadcrumbs items={[
        { name: "Boise", path: "/boise" },
        { name: "Service Areas", path: "/boise#service-areas" },
        { name: "Garden City", path: "/boise/service-areas/garden-city" },
      ]} />

      <section className="relative h-64 md:h-80 flex items-center">
        <Image src="/images/crew-working.jpg" alt="Roofing company in Garden City, ID" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-primary/75" />
        <div className="relative z-10 px-4 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-white/80 mb-2"><MapPin size={18} /><span className="font-semibold text-sm">Garden City, ID — Ada County</span></div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Roofing Company in Garden City, ID</h1>
          <p className="text-white/90 text-lg mb-5">Serving Ada County with reliable, professional roofing.</p>
          <a href={`tel:${loc.phoneRaw}`} className="inline-flex items-center gap-2 bg-white hover:bg-white/90 text-primary font-bold px-6 py-3 rounded-lg transition-colors">
            <Phone size={18} /> {loc.phone}
          </a>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Roofing in Garden City, ID</h2>
          <p className="text-text-muted leading-relaxed mb-6">
            Garden City is a small but vibrant city fully enclosed within the Boise metro, situated along the Boise River between Boise and Eagle. Known for its arts district and riverside development, Garden City has a mix of older residential properties and newer commercial and mixed-use buildings — all of which require professional roofing care.
          </p>
          <p className="text-text-muted leading-relaxed mb-8">
            Stellar Roofing &amp; Restorations serves Garden City homeowners with the same professional, no-pressure approach and lifetime workmanship warranty we deliver throughout the Treasure Valley. Free inspections, honest estimates, and roofing built to handle Idaho's climate.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Roofing Services in Garden City, ID</h2>
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
          <GHLForm type="quote" title="Get a Free Roofing Estimate in Garden City" />
        </div>
      </section>

      <CTABanner heading="Garden City — Free Roof Inspection Available" subtext="Honest assessments, lifetime warranty, no pressure." phone={loc.phone} phoneRaw={loc.phoneRaw} />
      <FAQ faqs={faqs} heading="Garden City Roofing FAQs" />
    </>
  );
}
