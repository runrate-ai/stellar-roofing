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
  title: "Roofing Company Spring Hill TN | Williamson & Maury County | Stellar Roofing",
  description: "Trusted roofing contractor in Spring Hill, TN. Roof replacement, repair, storm & hail damage. Serving Williamson and Maury County. Free estimates. Call (629) 277-4249.",
  alternates: { canonical: 'https://thestellarroofing.com/nashville/service-areas/spring-hill' },
};

const faqs = [
  { question: "Do you serve Spring Hill, TN?", answer: "Yes. Spring Hill is one of our active service areas in Middle Tennessee. We serve homeowners throughout Spring Hill, including both the Williamson and Maury County portions of the city." },
  { question: "How much does a roof replacement cost in Spring Hill?", answer: "Most roof replacements in Spring Hill range from $15,000 to $30,000 depending on roof size, pitch, and materials. We provide free written estimates with no obligation." },
  { question: "Do Spring Hill roofs have storm damage issues?", answer: "Yes. Spring Hill is in the path of Middle Tennessee's storm systems. Hail and wind events regularly affect the area, and many Spring Hill homeowners have storm damage that qualifies for an insurance claim. We provide free inspections and full claims assistance." },
];

export default function SpringHillPage() {
  const svcSchema = serviceSchema({
    name: "Roofing Services in Spring Hill, TN",
    description: "Professional roofing services in Spring Hill, TN serving both Williamson and Maury County homeowners.",
    url: "https://thestellarroofing.com/nashville/service-areas/spring-hill",
    areaServed: "Spring Hill, TN",
    phone: loc.phone,
  });

  return (
    <>
      <SchemaMarkup schema={svcSchema} />
      <SchemaMarkup schema={faqSchema(faqs)} />

      <Breadcrumbs items={[
        { name: "Nashville", path: "/nashville" },
        { name: "Service Areas", path: "/nashville#service-areas" },
        { name: "Spring Hill", path: "/nashville/service-areas/spring-hill" },
      ]} />

      <section className="relative h-64 md:h-80 flex items-center">
        <Image src="/images/service-storm-damage.jpg" alt="Roofing company in Spring Hill, TN" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-primary/75" />
        <div className="relative z-10 px-4 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-white/80 mb-2"><MapPin size={18} /><span className="font-semibold text-sm">Spring Hill, TN — Williamson &amp; Maury County</span></div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Roofing Company in Spring Hill, TN</h1>
          <p className="text-white/90 text-lg mb-5">Serving one of Middle Tennessee's fastest-growing communities.</p>
          <a href={`tel:${loc.phoneRaw}`} className="inline-flex items-center gap-2 bg-white hover:bg-white/90 text-primary font-bold px-6 py-3 rounded-lg transition-colors">
            <Phone size={18} /> {loc.phone}
          </a>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Roofing in Spring Hill, TN</h2>
          <p className="text-text-muted leading-relaxed mb-6">
            Spring Hill has been one of the fastest-growing cities in Tennessee for well over a decade, straddling the Williamson and Maury County line along US-31 south of Nashville. The city's explosive residential growth means a large stock of homes built in the 1990s, 2000s, and 2010s — many of which are now at or approaching the age where roof replacement or significant maintenance becomes necessary.
          </p>
          <p className="text-text-muted leading-relaxed mb-8">
            Stellar Roofing &amp; Restorations serves Spring Hill homeowners with the same professional, no-pressure approach and lifetime workmanship warranty we deliver throughout Middle Tennessee. Free inspections, honest estimates, and quality work on every job.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Roofing Services in Spring Hill, TN</h2>
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
          <GHLForm type="quote" title="Get a Free Roofing Estimate in Spring Hill" />
        </div>
      </section>

      <CTABanner heading="Spring Hill — Free Roof Inspection Available" subtext="Honest assessments, lifetime warranty, no pressure." phone={loc.phone} phoneRaw={loc.phoneRaw} />
      <FAQ faqs={faqs} heading="Spring Hill Roofing FAQs" />
    </>
  );
}
