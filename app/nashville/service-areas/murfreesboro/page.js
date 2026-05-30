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
  title: "Roofing Company Murfreesboro TN | Rutherford County | Stellar Roofing",
  description: "Trusted roofing contractor in Murfreesboro, TN. Roof replacement, repair, storm & hail damage for Rutherford County homes. Free estimates. Call (629) 277-4249.",
  alternates: { canonical: 'https://thestellarroofing.com/nashville/service-areas/murfreesboro' },
};

const faqs = [
  { question: "Do you serve Murfreesboro and Rutherford County?", answer: "Yes. Murfreesboro is one of our regularly served areas in Middle Tennessee. We handle roof replacements, repairs, inspections, and storm damage claims throughout Rutherford County." },
  { question: "Is Murfreesboro affected by the same storm patterns as Nashville?", answer: "Yes. Rutherford County sits in the same Middle Tennessee storm corridor and experiences similar hail, wind, and tornado risk as Nashville and Davidson County. Annual inspections are a good idea for any homeowner in the area." },
  { question: "How long will it take to get a free estimate in Murfreesboro?", answer: "We typically can schedule a free inspection and estimate within a few days. For storm damage situations we try to prioritize as quickly as possible." },
];

export default function MurfreesboroPage() {
  const svcSchema = serviceSchema({ name: "Roofing Services in Murfreesboro, TN", description: "Professional roofing services in Murfreesboro, TN and Rutherford County including roof replacement, repair, and storm damage restoration.", url: "https://thestellarroofing.com/nashville/service-areas/murfreesboro", areaServed: "Murfreesboro, TN", phone: loc.phone });

  return (
    <>
      <SchemaMarkup schema={svcSchema} />
      <SchemaMarkup schema={faqSchema(faqs)} />

      <Breadcrumbs items={[{ name: "Nashville", path: "/nashville" }, { name: "Service Areas", path: "/nashville#service-areas" }, { name: "Murfreesboro", path: "/nashville/service-areas/murfreesboro" }]} />

      <section className="relative h-64 md:h-80 flex items-center">
        <Image src="/images/service-roof-replacement.jpg" alt="Roofing company in Murfreesboro, TN" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-primary/75" />
        <div className="relative z-10 px-4 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-white/80 mb-2"><MapPin size={18} /><span className="font-semibold text-sm">Murfreesboro, TN</span></div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Roofing Company in Murfreesboro, TN</h1>
          <p className="text-white/90 text-lg mb-5">Serving Rutherford County with professional, reliable roofing.</p>
          <a href={`tel:${loc.phoneRaw}`} className="inline-flex items-center gap-2 bg-white hover:bg-white/90 text-primary font-bold px-6 py-3 rounded-lg transition-colors">
            <Phone size={18} /> {loc.phone}
          </a>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Roofing in Murfreesboro &amp; Rutherford County</h2>
          <p className="text-text-muted leading-relaxed mb-6">Murfreesboro has been one of the fastest-growing cities in the entire United States for over a decade. The city's rapid expansion — from its downtown core near the Rutherford County Courthouse to massive new developments in areas like NorthPoint and Northwest Rutherford — means thousands of new homes are being built every year, alongside a large existing stock of homes from the 1990s and 2000s that are now reaching the age where roof replacement becomes necessary.</p>
          <p className="text-text-muted leading-relaxed mb-6">Like the rest of Middle Tennessee, Murfreesboro sits in a region with significant storm activity. Hail events are common during spring and summer months, and the city has seen its share of tornado and high-wind damage in recent years. Our team is experienced with the roofing challenges specific to Rutherford County and responds quickly when storms cause damage in the area.</p>
          <p className="text-text-muted leading-relaxed mb-8">Stellar Roofing &amp; Restorations makes regular service trips throughout Rutherford County. From the time you call for your free inspection to the final nail sweep when the job is done, you'll experience the professional, no-pressure approach that has earned us the trust of homeowners throughout Middle Tennessee.</p>

          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Roofing Services in Murfreesboro, TN</h2>
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
          <GHLForm type="quote" title="Get a Free Roofing Estimate in Murfreesboro" />
        </div>
      </section>

      <CTABanner heading="Murfreesboro — Schedule Your Free Roof Inspection" subtext="Honest assessments, lifetime warranty, insurance claims help." phone={loc.phone} phoneRaw={loc.phoneRaw} />
      <FAQ faqs={faqs} heading="Murfreesboro Roofing FAQs" />
    </>
  );
}
