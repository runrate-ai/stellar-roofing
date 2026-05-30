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
  title: "Roofing Company Eagle ID | Premium Roofing & Hail Damage | Stellar Roofing",
  description: "Premium roofing contractor in Eagle, ID. Hail damage, roof replacement & repair for Ada County's finest homes. Lifetime warranty, free estimates. Call today.",
  alternates: { canonical: 'https://thestellarroofing.com/boise/service-areas/eagle' },
};

const faqs = [
  { question: "Do you serve Eagle and the surrounding area?", answer: "Yes. Eagle is one of our core Treasure Valley service areas. We serve homeowners throughout Eagle, from established neighborhoods near downtown to newer communities along Eagle Road and Floating Feather." },
  { question: "Do you work with premium homes in Eagle?", answer: "Absolutely. Eagle features many high-value homes with complex roof lines, premium finishes, and high architectural standards. We bring the materials, experience, and attention to detail that Eagle homeowners expect." },
  { question: "How does storm damage affect Eagle roofs?", answer: "Eagle is within the Treasure Valley's hail corridor. Hail events regularly affect Ada County, and even a moderate hail storm can cause hidden shingle damage that shortens roof life and creates future leak points. A free post-storm inspection is always a smart move." },
];

export default function EaglePage() {
  const svcSchema = serviceSchema({ name: "Roofing Services in Eagle, ID", description: "Professional roofing services in Eagle, ID including roof replacement, repair, and hail damage restoration.", url: "https://thestellarroofing.com/boise/service-areas/eagle", areaServed: "Eagle, ID", phone: loc.phone });

  return (
    <>
      <SchemaMarkup schema={svcSchema} />
      <SchemaMarkup schema={faqSchema(faqs)} />

      <Breadcrumbs items={[{ name: "Boise", path: "/boise" }, { name: "Service Areas", path: "/boise#service-areas" }, { name: "Eagle", path: "/boise/service-areas/eagle" }]} />

      <section className="relative h-64 md:h-80 flex items-center">
        <Image src="/images/service-roof-repair.jpg" alt="Roofing company in Eagle, ID" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-primary/75" />
        <div className="relative z-10 px-4 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-white/80 mb-2"><MapPin size={18} /><span className="font-semibold text-sm">Eagle, ID</span></div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Roofing Company in Eagle, ID</h1>
          <p className="text-white/90 text-lg mb-5">Premium roofing for Eagle's finest homes.</p>
          <a href={`tel:${loc.phoneRaw}`} className="inline-flex items-center gap-2 bg-white hover:bg-white/90 text-primary font-bold px-6 py-3 rounded-lg transition-colors">
            <Phone size={18} /> {loc.phone}
          </a>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Eagle, ID — Quality Roofing That Matches Your Home</h2>
          <p className="text-text-muted leading-relaxed mb-6">Eagle is one of the most desirable communities in the Treasure Valley — known for its excellent schools, family-friendly neighborhoods, and high quality of life. The city has grown significantly over the past decade, with new master-planned communities alongside established neighborhoods like Floating Feather, Linder Road corridor, and Eagle Road. Homeowners here expect quality, and Stellar Roofing &amp; Restorations delivers it.</p>
          <p className="text-text-muted leading-relaxed mb-6">Many Eagle homes feature premium architectural details, complex roof lines, and high-end finishes that require experienced installers and quality materials. We offer architectural shingles, impact-resistant shingles, and metal roofing options well-suited to Eagle's larger and more sophisticated homes — all backed by a lifetime workmanship warranty.</p>
          <p className="text-text-muted leading-relaxed mb-8">Eagle is also directly within the Treasure Valley's storm corridor. Regular hail events during spring and early summer can cause significant damage to roofs across the area. We offer free post-storm inspections and complete insurance claims assistance for Eagle homeowners who've experienced hail or wind damage.</p>

          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Roofing Services in Eagle, ID</h2>
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
          <GHLForm type="quote" title="Get a Free Roofing Estimate in Eagle" />
        </div>
      </section>

      <CTABanner heading="Eagle Homeowners — Free Roof Inspection Available" subtext="Premium roofing for premium homes. Lifetime warranty, no pressure." phone={loc.phone} phoneRaw={loc.phoneRaw} />
      <FAQ faqs={faqs} heading="Eagle Roofing FAQs" />
    </>
  );
}
