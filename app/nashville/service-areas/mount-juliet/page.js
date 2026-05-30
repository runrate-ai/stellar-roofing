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
  title: "Roofing Company Mount Juliet TN | Wilson County | Stellar Roofing",
  description: "Trusted roofing contractor in Mount Juliet, TN. Roof replacement, repair, storm & hail damage for Wilson County homes. Free estimates, lifetime warranty. Call (629) 277-4249.",
  alternates: { canonical: 'https://thestellarroofing.com/nashville/service-areas/mount-juliet' },
};

const faqs = [
  { question: "Do you serve Mount Juliet, TN?", answer: "Yes. Mount Juliet is one of our regular service areas in Wilson County, east of Nashville. We handle roof replacements, repairs, storm damage inspections, and insurance claims throughout the area." },
  { question: "How much does a roof replacement cost in Mount Juliet?", answer: "Most roof replacements in Mount Juliet range from $15,000 to $30,000 depending on roof size, pitch, and materials. We provide free written estimates with no obligation." },
  { question: "Is Mount Juliet at risk for storm and hail damage?", answer: "Yes. Wilson County sits in Middle Tennessee's storm corridor and sees the same hail and wind activity as Nashville and surrounding areas. We provide free post-storm inspections and handle insurance claims from start to finish." },
];

export default function MountJulietPage() {
  const svcSchema = serviceSchema({
    name: "Roofing Services in Mount Juliet, TN",
    description: "Professional roofing services in Mount Juliet, TN and Wilson County including roof replacement, repair, and storm damage restoration.",
    url: "https://thestellarroofing.com/nashville/service-areas/mount-juliet",
    areaServed: "Mount Juliet, TN",
    phone: loc.phone,
  });

  return (
    <>
      <SchemaMarkup schema={svcSchema} />
      <SchemaMarkup schema={faqSchema(faqs)} />

      <Breadcrumbs items={[
        { name: "Nashville", path: "/nashville" },
        { name: "Service Areas", path: "/nashville#service-areas" },
        { name: "Mount Juliet", path: "/nashville/service-areas/mount-juliet" },
      ]} />

      <section className="relative h-64 md:h-80 flex items-center">
        <Image src="/images/service-inspection.jpg" alt="Roofing company in Mount Juliet, TN" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-primary/75" />
        <div className="relative z-10 px-4 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-white/80 mb-2"><MapPin size={18} /><span className="font-semibold text-sm">Mount Juliet, TN — Wilson County</span></div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Roofing Company in Mount Juliet, TN</h1>
          <p className="text-white/90 text-lg mb-5">Serving Wilson County with reliable, professional roofing.</p>
          <a href={`tel:${loc.phoneRaw}`} className="inline-flex items-center gap-2 bg-white hover:bg-white/90 text-primary font-bold px-6 py-3 rounded-lg transition-colors">
            <Phone size={18} /> {loc.phone}
          </a>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Roofing in Mount Juliet, TN</h2>
          <p className="text-text-muted leading-relaxed mb-6">
            Mount Juliet is one of the most in-demand communities in the Nashville metro, known for its family-friendly neighborhoods, strong schools, and easy access to both Nashville and Lebanon via I-40. The city has grown substantially over the past two decades, with a mix of established neighborhoods and new residential developments that keep roofing demand consistently high.
          </p>
          <p className="text-text-muted leading-relaxed mb-8">
            Stellar Roofing &amp; Restorations serves Mount Juliet homeowners with the same professional, no-pressure approach and lifetime workmanship warranty we deliver throughout Middle Tennessee. Whether you need a free post-storm inspection, a repair, or a full roof replacement, we'll give you an honest assessment and a fair estimate.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Roofing Services in Mount Juliet, TN</h2>
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
          <GHLForm type="quote" title="Get a Free Roofing Estimate in Mount Juliet" />
        </div>
      </section>

      <CTABanner heading="Mount Juliet — Free Roof Inspection Available" subtext="Honest assessments, lifetime warranty, no pressure." phone={loc.phone} phoneRaw={loc.phoneRaw} />
      <FAQ faqs={faqs} heading="Mount Juliet Roofing FAQs" />
    </>
  );
}
