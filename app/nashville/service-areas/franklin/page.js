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
  title: "Roofing Company Franklin TN | Williamson County | Stellar Roofing",
  description: "Expert roofing contractor in Franklin, TN. Roof replacement, repair, storm & hail damage for Williamson County homes. Free estimates, lifetime warranty. Call (629) 277-4249.",
  alternates: { canonical: 'https://thestellarroofing.com/nashville/service-areas/franklin' },
};

const faqs = [
  { question: "Do you work in Franklin and Williamson County?", answer: "Yes, Franklin is one of our most active service areas. We work throughout Williamson County — from downtown Franklin to Cool Springs, Westhaven, and surrounding neighborhoods." },
  { question: "Are Franklin roofs affected by storm damage?", answer: "Absolutely. Williamson County is well within Tennessee's severe storm corridor. Hail damage is especially common in the Franklin area. We recommend inspections after any significant storm event." },
  { question: "Do you offer premium roofing products for high-end Franklin homes?", answer: "Yes. For upscale homes in areas like Westhaven, we offer premium architectural shingles, designer shingle lines, and metal roofing that provide superior performance and curb appeal." },
];

export default function FranklinPage() {
  const svcSchema = serviceSchema({ name: "Roofing Services in Franklin, TN", description: "Professional roofing services in Franklin, TN and Williamson County including roof replacement, repair, and storm damage restoration.", url: "https://thestellarroofing.com/nashville/service-areas/franklin", areaServed: "Franklin, TN", phone: loc.phone });

  return (
    <>
      <SchemaMarkup schema={svcSchema} />
      <SchemaMarkup schema={faqSchema(faqs)} />

      <Breadcrumbs items={[{ name: "Nashville", path: "/nashville" }, { name: "Service Areas", path: "/nashville#service-areas" }, { name: "Franklin", path: "/nashville/service-areas/franklin" }]} />

      <section className="relative h-64 md:h-80 flex items-center">
        <Image src="/images/service-roof-repair.jpg" alt="Roofing company in Franklin, TN" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-primary/75" />
        <div className="relative z-10 px-4 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-white/80 mb-2"><MapPin size={18} /><span className="font-semibold text-sm">Franklin, TN</span></div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Roofing Company in Franklin, TN</h1>
          <p className="text-white/90 text-lg mb-5">Serving Williamson County with expert, professional roofing.</p>
          <a href={`tel:${loc.phoneRaw}`} className="inline-flex items-center gap-2 bg-white hover:bg-white/90 text-primary font-bold px-6 py-3 rounded-lg transition-colors">
            <Phone size={18} /> {loc.phone}
          </a>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Franklin &amp; Williamson County Roofing</h2>
          <p className="text-text-muted leading-relaxed mb-6">Franklin, Tennessee is one of the most desirable places to live in the entire state — and with high-quality homes comes the expectation of high-quality roofing. Stellar Roofing &amp; Restorations brings the professionalism, attention to detail, and quality materials that Franklin homeowners expect to every project we take on in Williamson County.</p>
          <p className="text-text-muted leading-relaxed mb-6">Whether you're in a historic home near downtown Franklin, a newer build in the Westhaven community, a Cool Springs subdivision, or anywhere else in the Franklin area, our team delivers the same standard of excellence. We use premium roofing materials from trusted manufacturers, stand behind every installation with a lifetime warranty, and approach every job — large or small — with professionalism and care.</p>
          <p className="text-text-muted leading-relaxed mb-8">Franklin and Williamson County are not immune to the severe weather that affects all of Middle Tennessee. Hail storms that move through the Nashville metro regularly impact Franklin, damaging shingles and gutters in ways that aren't always visible from the ground.</p>

          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Roofing Services in Franklin, TN</h2>
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
          <GHLForm type="quote" title="Get a Free Roofing Estimate in Franklin" />
        </div>
      </section>

      <CTABanner heading="Franklin Homeowners — Free Roof Inspection Available" subtext="Quality roofing for Williamson County's finest homes. No obligation estimate." phone={loc.phone} phoneRaw={loc.phoneRaw} />
      <FAQ faqs={faqs} heading="Franklin Roofing FAQs" />
    </>
  );
}
