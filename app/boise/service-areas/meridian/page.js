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
  title: "Roofing Company Meridian ID | Hail Damage Experts | Stellar Roofing",
  description: "Trusted roofing contractor in Meridian, ID. Hail damage assessment, roof replacement, repair, insurance claims. Serving Paramount, Verado & all of Meridian. Call today.",
  alternates: { canonical: 'https://thestellarroofing.com/boise/service-areas/meridian' },
};

const faqs = [
  { question: "Do you serve Meridian and Ada County?", answer: "Yes. Meridian is one of our primary service areas in the Treasure Valley. We handle roof replacements, repairs, hail damage inspections, and insurance claims throughout Ada County." },
  { question: "Is Meridian at risk for hail damage?", answer: "Yes. Meridian and Ada County are directly in the Treasure Valley's hail storm path. The area sees multiple significant hail events each year, particularly in spring. We recommend inspections after any notable storm." },
  { question: "My Meridian home is newer — do I still need a roof inspection?", answer: "Yes. Even newer homes can have installation defects, storm damage, or manufacturing issues that only become apparent on inspection. Hail damage in particular can affect shingles of any age and is often not visible without getting on the roof." },
];

export default function MeridianPage() {
  const svcSchema = serviceSchema({ name: "Roofing Services in Meridian, ID", description: "Professional roofing services in Meridian, ID including roof replacement, repair, hail damage, and storm damage restoration.", url: "https://thestellarroofing.com/boise/service-areas/meridian", areaServed: "Meridian, ID", phone: loc.phone });

  return (
    <>
      <SchemaMarkup schema={svcSchema} />
      <SchemaMarkup schema={faqSchema(faqs)} />

      <Breadcrumbs items={[{ name: "Boise", path: "/boise" }, { name: "Service Areas", path: "/boise#service-areas" }, { name: "Meridian", path: "/boise/service-areas/meridian" }]} />

      <section className="relative h-64 md:h-80 flex items-center">
        <Image src="/images/service-roof-replacement.jpg" alt="Roofing company in Meridian, ID" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-primary/75" />
        <div className="relative z-10 px-4 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-white/80 mb-2"><MapPin size={18} /><span className="font-semibold text-sm">Meridian, ID</span></div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Roofing Company in Meridian, ID</h1>
          <p className="text-white/90 text-lg mb-5">Serving Ada County with professional, reliable roofing.</p>
          <a href={`tel:${loc.phoneRaw}`} className="inline-flex items-center gap-2 bg-white hover:bg-white/90 text-primary font-bold px-6 py-3 rounded-lg transition-colors">
            <Phone size={18} /> {loc.phone}
          </a>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Roofing in Meridian, ID</h2>
          <p className="text-text-muted leading-relaxed mb-6">Meridian is Idaho's largest city and one of the fastest-growing cities in the entire United States. Its explosive growth over the past two decades — from established neighborhoods near downtown Meridian to massive new master-planned communities like Paramount, Verado, Settlers, and Victory Commons — means the city has a wide range of roofing needs, from brand-new installations to replacements on homes that are now hitting the 20–25 year mark.</p>
          <p className="text-text-muted leading-relaxed mb-6">Like the rest of the Treasure Valley, Meridian sees regular hailstorms that can cause significant but often hidden damage to shingles across entire subdivisions. A free inspection after any notable storm is the best way to know whether your roof has sustained damage that warrants an insurance claim.</p>
          <p className="text-text-muted leading-relaxed mb-8">Stellar Roofing &amp; Restorations brings professional roofing services to Meridian homeowners — using quality materials suited for Idaho's climate, backed by a lifetime workmanship warranty, and delivered with the honest, no-pressure approach that defines our company.</p>

          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Roofing Services in Meridian, ID</h2>
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
          <GHLForm type="quote" title="Get a Free Roofing Estimate in Meridian" />
        </div>
      </section>

      <CTABanner heading="Meridian — Schedule Your Free Roof Inspection" subtext="Honest assessments, lifetime warranty, insurance claims help." phone={loc.phone} phoneRaw={loc.phoneRaw} />
      <FAQ faqs={faqs} heading="Meridian Roofing FAQs" />
    </>
  );
}
