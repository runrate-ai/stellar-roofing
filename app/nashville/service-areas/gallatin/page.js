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
  title: "Roofing Company Gallatin TN | Sumner County | Stellar Roofing",
  description: "Trusted roofing contractor in Gallatin, TN. Roof replacement, repair, storm & hail damage for Sumner County homes. Free estimates, lifetime warranty. Call (629) 277-4249.",
  alternates: { canonical: 'https://thestellarroofing.com/nashville/service-areas/gallatin' },
};

const faqs = [
  { question: "Do you serve Gallatin, TN?", answer: "Yes. We serve Gallatin and Sumner County as part of our Middle Tennessee service area. We handle roof replacements, repairs, storm damage inspections, and insurance claims throughout the Gallatin area." },
  { question: "How much does a roof replacement cost in Gallatin?", answer: "Most roof replacements in Gallatin range from $15,000 to $30,000 depending on roof size, pitch, and materials. We provide free written estimates with no obligation." },
  { question: "Are Gallatin homes affected by hail and storm damage?", answer: "Yes. Gallatin and Sumner County sit in Middle Tennessee's storm corridor and see similar hail and wind activity as Nashville. We recommend a free inspection after any significant storm event." },
];

export default function GallatinPage() {
  const svcSchema = serviceSchema({
    name: "Roofing Services in Gallatin, TN",
    description: "Professional roofing services in Gallatin, TN and Sumner County including roof replacement, repair, and storm damage restoration.",
    url: "https://thestellarroofing.com/nashville/service-areas/gallatin",
    areaServed: "Gallatin, TN",
    phone: loc.phone,
  });

  return (
    <>
      <SchemaMarkup schema={svcSchema} />
      <SchemaMarkup schema={faqSchema(faqs)} />

      <Breadcrumbs items={[
        { name: "Nashville", path: "/nashville" },
        { name: "Service Areas", path: "/nashville#service-areas" },
        { name: "Gallatin", path: "/nashville/service-areas/gallatin" },
      ]} />

      <section className="relative h-64 md:h-80 flex items-center">
        <Image src="/images/crew-working.jpg" alt="Roofing company in Gallatin, TN" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-primary/75" />
        <div className="relative z-10 px-4 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-white/80 mb-2"><MapPin size={18} /><span className="font-semibold text-sm">Gallatin, TN — Sumner County</span></div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Roofing Company in Gallatin, TN</h1>
          <p className="text-white/90 text-lg mb-5">Serving Sumner County with quality roofing you can count on.</p>
          <a href={`tel:${loc.phoneRaw}`} className="inline-flex items-center gap-2 bg-white hover:bg-white/90 text-primary font-bold px-6 py-3 rounded-lg transition-colors">
            <Phone size={18} /> {loc.phone}
          </a>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Roofing in Gallatin, TN</h2>
          <p className="text-text-muted leading-relaxed mb-6">
            Gallatin is the county seat of Sumner County and one of the fastest-growing cities in Middle Tennessee. Located about 30 miles northeast of Nashville, Gallatin has seen rapid residential development in recent years, bringing a mix of new construction and older established neighborhoods with roofing systems that are reaching the end of their useful life.
          </p>
          <p className="text-text-muted leading-relaxed mb-8">
            Stellar Roofing &amp; Restorations serves Gallatin homeowners with the same honest approach and quality craftsmanship we bring to every project across Middle Tennessee. Free inspections, no-pressure estimates, and lifetime workmanship warranty on every installation.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Roofing Services in Gallatin, TN</h2>
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
          <GHLForm type="quote" title="Get a Free Roofing Estimate in Gallatin" />
        </div>
      </section>

      <CTABanner heading="Gallatin — Free Roof Inspection Available" subtext="Honest assessments, lifetime warranty, no pressure." phone={loc.phone} phoneRaw={loc.phoneRaw} />
      <FAQ faqs={faqs} heading="Gallatin Roofing FAQs" />
    </>
  );
}
