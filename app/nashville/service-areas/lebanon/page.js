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

const loc = config.locations.nashville;

export const metadata = {
  title: "Roofing Company Lebanon TN | Wilson County | Stellar Roofing",
  description: "Trusted roofing contractor in Lebanon, TN. Roof replacement, repair, storm & hail damage for Wilson County homes. Free estimates, lifetime warranty. Call (629) 277-4249.",
  alternates: { canonical: 'https://thestellarroofing.com/nashville/service-areas/lebanon' },
};

const faqs = [
  { question: "Do you serve Lebanon, TN?", answer: "Yes. Lebanon is one of our service areas in Wilson County, east of Nashville. We handle roof replacements, repairs, storm damage inspections, and insurance claims throughout the Lebanon area." },
  { question: "How much does a roof replacement cost in Lebanon, TN?", answer: "Most roof replacements in Lebanon range from $14,000 to $28,000 depending on roof size, pitch, and materials. We provide free written estimates with no obligation." },
  { question: "Do you handle storm damage in Lebanon?", answer: "Yes. Wilson County sees the same storm activity as the rest of Middle Tennessee. We offer free post-storm inspections and handle insurance claims from documentation through completion." },
];

export default function LebanonPage() {
  const svcSchema = serviceSchema({
    name: "Roofing Services in Lebanon, TN",
    description: "Professional roofing services in Lebanon, TN and Wilson County including roof replacement, repair, and storm damage restoration.",
    url: "https://thestellarroofing.com/nashville/service-areas/lebanon",
    areaServed: "Lebanon, TN",
    phone: loc.phone,
  });

  return (
    <>
      <SchemaMarkup schema={svcSchema} />
      <SchemaMarkup schema={faqSchema(faqs)} />

      <Breadcrumbs items={[
        { name: "Nashville", path: "/nashville" },
        { name: "Service Areas", path: "/nashville#service-areas" },
        { name: "Lebanon", path: "/nashville/service-areas/lebanon" },
      ]} />

      <section className="relative h-64 md:h-80 flex items-center">
        <Image src="/images/crew-working-02.jpg" alt="Roofing company in Lebanon, TN" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-primary/75" />
        <div className="relative z-10 px-4 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-white/80 mb-2"><MapPin size={18} /><span className="font-semibold text-sm">Lebanon, TN — Wilson County</span></div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Roofing Company in Lebanon, TN</h1>
          <p className="text-white/90 text-lg mb-5">Serving Wilson County with professional roofing services.</p>
          <a href={`tel:${loc.phoneRaw}`} className="inline-flex items-center gap-2 bg-white hover:bg-white/90 text-primary font-bold px-6 py-3 rounded-lg transition-colors">
            <Phone size={18} /> {loc.phone}
          </a>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Roofing in Lebanon, TN</h2>
          <p className="text-text-muted leading-relaxed mb-6">
            Lebanon is the county seat of Wilson County and a key anchor of the eastern Nashville metro. The city has grown considerably as people seek more affordable living options east of Nashville along I-40. Lebanon's housing stock ranges from older downtown homes to newer suburban developments, creating a steady need for roofing services across the area.
          </p>
          <p className="text-text-muted leading-relaxed mb-8">
            Stellar Roofing &amp; Restorations serves Lebanon homeowners with the same professional, no-pressure approach and lifetime workmanship warranty we deliver throughout Middle Tennessee. Free inspections, honest estimates, and quality craftsmanship on every project.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Roofing Services in Lebanon, TN</h2>
          <ul className="space-y-3 mb-8">
            {config.services.map(s => (
              <li key={s.slug} className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <Link href={`/nashville/services/${s.slug}`} className="font-semibold text-primary hover:text-primary-light transition-colors">{s.name}</Link>
                  <span className="text-text-muted text-sm"> — {s.shortDescription}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-12 px-4 bg-bg-alt">
        <div className="max-w-2xl mx-auto">
          <GHLForm type="quote" title="Get a Free Roofing Estimate in Lebanon" />
        </div>
      </section>

      <CTABanner heading="Lebanon — Free Roof Inspection Available" subtext="Honest assessments, lifetime warranty, no pressure." phone={loc.phone} phoneRaw={loc.phoneRaw} />
      <FAQ faqs={faqs} heading="Lebanon Roofing FAQs" />
    </>
  );
}
