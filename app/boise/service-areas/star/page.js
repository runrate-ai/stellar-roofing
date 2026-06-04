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
  title: "Roofing Company Star ID | Ada County | Stellar Roofing",
  description: "Trusted roofing contractor in Star, ID. Roof replacement, repair, wind damage & storm damage for Ada County homes. Free estimates, lifetime warranty. Call today.",
  alternates: { canonical: 'https://thestellarroofing.com/boise/service-areas/star' },
};

const faqs = [
  { question: "Do you serve Star, ID?", answer: "Yes. We serve Star and the surrounding Ada County area as part of our Treasure Valley service area. We handle roof replacements, repairs, wind and storm damage assessments, and insurance claims throughout the Star area." },
  { question: "Is Star at risk for wind damage?", answer: "Yes. Star is in Ada County along the Boise River corridor and experiences the same high-wind events as the greater Treasure Valley. Idaho's mountain-to-valley wind patterns drive powerful gusts through the area that can lift shingles and damage rooflines. We recommend a free inspection after any notable wind or storm event." },
  { question: "How much does a roof replacement cost in Star, ID?", answer: "Roof replacement in the Star area typically ranges from $12,000 to $28,000 depending on roof size, pitch, and materials. We provide free written estimates with no obligation before any work begins." },
];

export default function StarPage() {
  const svcSchema = serviceSchema({
    name: "Roofing Services in Star, ID",
    description: "Professional roofing services in Star, ID including roof replacement, repair, and wind and storm damage restoration.",
    url: "https://thestellarroofing.com/boise/service-areas/star",
    areaServed: "Star, ID",
    phone: loc.phone,
  });

  return (
    <>
      <SchemaMarkup schema={svcSchema} />
      <SchemaMarkup schema={faqSchema(faqs)} />

      <Breadcrumbs items={[
        { name: "Boise", path: "/boise" },
        { name: "Service Areas", path: "/boise#service-areas" },
        { name: "Star", path: "/boise/service-areas/star" },
      ]} />

      <section className="relative h-64 md:h-80 flex items-center">
        <Image src="/images/crew-working.jpg" alt="Roofing company in Star, ID" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-primary/75" />
        <div className="relative z-10 px-4 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-white/80 mb-2"><MapPin size={18} /><span className="font-semibold text-sm">Star, ID — Ada County</span></div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Roofing Company in Star, ID</h1>
          <p className="text-white/90 text-lg mb-5">Serving Ada County with reliable, professional roofing.</p>
          <a href={`tel:${loc.phoneRaw}`} className="inline-flex items-center gap-2 bg-white hover:bg-white/90 text-primary font-bold px-6 py-3 rounded-lg transition-colors">
            <Phone size={18} /> {loc.phone}
          </a>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Roofing in Star, ID</h2>
          <p className="text-text-muted leading-relaxed mb-6">
            Star is one of Ada County's fastest-growing communities, located northwest of Boise along the Boise River corridor. The city has attracted a significant number of new residential developments over the past decade, with a mix of newer construction and established neighborhoods that are reaching an age where roofing maintenance and replacement become a priority.
          </p>
          <p className="text-text-muted leading-relaxed mb-6">
            Star shares the same climate challenges as the rest of the Treasure Valley — high-wind events in spring and fall that can damage shingles across entire subdivisions, intense UV exposure in summer that dries out and cracks asphalt, and winter snow loads and freeze-thaw cycles that test aging roofing systems. Wind is the primary storm-related concern for Star homeowners, with Treasure Valley gap winds capable of lifting shingles and damaging roof edges and ridges. Our team understands these conditions and uses materials and methods built for Idaho's climate.
          </p>
          <p className="text-text-muted leading-relaxed mb-8">
            Stellar Roofing &amp; Restorations serves Star homeowners with the same professional, honest approach and lifetime workmanship warranty we deliver throughout the Treasure Valley. Free inspections, no-pressure estimates, and quality work you can count on.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Roofing Services in Star, ID</h2>
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
          <GHLForm type="quote" title="Get a Free Roofing Estimate in Star" />
        </div>
      </section>

      <CTABanner heading="Star — Schedule Your Free Roof Inspection" subtext="Honest assessments, lifetime warranty, no pressure." phone={loc.phone} phoneRaw={loc.phoneRaw} />
      <FAQ faqs={faqs} heading="Star Roofing FAQs" />
    </>
  );
}
