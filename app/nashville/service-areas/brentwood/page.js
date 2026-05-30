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
  title: "Roofing Company Brentwood TN | Premium Roofing Contractor | Stellar Roofing",
  description: "Premium roofing contractor in Brentwood, TN. Roof replacement, repair, storm & hail damage for Williamson County's finest homes. Lifetime warranty. Call (629) 277-4249.",
  alternates: { canonical: 'https://thestellarroofing.com/nashville/service-areas/brentwood' },
};

const faqs = [
  { question: "Do you serve Brentwood homeowners?", answer: "Yes. Brentwood is one of our core service areas. We understand the high standards Brentwood homeowners expect and deliver the quality workmanship and premium materials to match." },
  { question: "Do you work with high-end homes in Brentwood?", answer: "Absolutely. Many Brentwood homes feature premium architectural details and complex roof lines. We have experience handling these projects with the care and precision they require, including premium shingle lines and specialty installations." },
  { question: "How does storm damage affect Brentwood roofs?", answer: "Brentwood sits in the same storm corridor as Nashville and Franklin. Hail events regularly affect Williamson County, and even a small hail event can cause hidden damage that shortens your roof's lifespan. A free inspection after any storm is the best way to know what you're dealing with." },
];

export default function BrentwoodPage() {
  const svcSchema = serviceSchema({ name: "Roofing Services in Brentwood, TN", description: "Professional roofing services in Brentwood, TN including roof replacement, repair, and storm damage restoration.", url: "https://thestellarroofing.com/nashville/service-areas/brentwood", areaServed: "Brentwood, TN", phone: loc.phone });

  return (
    <>
      <SchemaMarkup schema={svcSchema} />
      <SchemaMarkup schema={faqSchema(faqs)} />

      <Breadcrumbs items={[{ name: "Nashville", path: "/nashville" }, { name: "Service Areas", path: "/nashville#service-areas" }, { name: "Brentwood", path: "/nashville/service-areas/brentwood" }]} />

      <section className="relative h-64 md:h-80 flex items-center">
        <Image src="/images/crew-working-02.jpg" alt="Roofing company in Brentwood, TN" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-primary/75" />
        <div className="relative z-10 px-4 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-white/80 mb-2"><MapPin size={18} /><span className="font-semibold text-sm">Brentwood, TN</span></div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Roofing Company in Brentwood, TN</h1>
          <p className="text-white/90 text-lg mb-5">Premium roofing for Williamson County's finest homes.</p>
          <a href={`tel:${loc.phoneRaw}`} className="inline-flex items-center gap-2 bg-white hover:bg-white/90 text-primary font-bold px-6 py-3 rounded-lg transition-colors">
            <Phone size={18} /> {loc.phone}
          </a>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Brentwood Roofing — Quality That Matches Your Home</h2>
          <p className="text-text-muted leading-relaxed mb-6">Brentwood is one of the most affluent communities in Tennessee, known for its spacious homes, mature neighborhoods, and high standards of living. Stellar Roofing &amp; Restorations brings the same commitment to quality that Brentwood homeowners expect in every aspect of their home to each roofing project we undertake in the area.</p>
          <p className="text-text-muted leading-relaxed mb-6">Many Brentwood homes feature larger, more complex roof lines with multiple peaks, valleys, and dormers — all of which require experienced hands and careful installation. We use premium materials from leading manufacturers and back every installation with a lifetime workmanship warranty.</p>
          <p className="text-text-muted leading-relaxed mb-8">Brentwood, like the rest of Williamson County, is not immune to Middle Tennessee's storm seasons. We offer free post-storm inspections and full insurance claims assistance for homeowners who've experienced hail or wind damage.</p>

          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Roofing Services in Brentwood, TN</h2>
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
          <GHLForm type="quote" title="Get a Free Roofing Estimate in Brentwood" />
        </div>
      </section>

      <CTABanner heading="Brentwood — Free Roof Inspection Available" subtext="Premium roofing for premium homes. Lifetime warranty, no pressure." phone={loc.phone} phoneRaw={loc.phoneRaw} />
      <FAQ faqs={faqs} heading="Brentwood Roofing FAQs" />
    </>
  );
}
