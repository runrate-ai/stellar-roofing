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
  title: "Roofing Company Caldwell ID | Canyon County | Stellar Roofing",
  description: "Trusted roofing contractor in Caldwell, ID. Roof replacement, repair, wind & storm damage for Canyon County homes. Free estimates, lifetime warranty. Call today.",
  alternates: { canonical: 'https://thestellarroofing.com/boise/service-areas/caldwell' },
};

const faqs = [
  { question: "Do you serve Caldwell and Canyon County?", answer: "Yes. We serve Caldwell and Canyon County as part of our Treasure Valley service area. We handle roof replacements, repairs, wind and storm damage assessments, and insurance claims throughout the area." },
  { question: "What roofing problems are most common in Caldwell?", answer: "Wind damage from Treasure Valley gap winds, UV degradation from intense summer sun, and aging asphalt shingles on homes from the 1980s–2000s are the most common roofing issues we see in the Caldwell area. Canyon County is particularly exposed to high-wind events that can lift and crack shingles across entire neighborhoods." },
  { question: "How do I know if my Caldwell roof has wind or storm damage?", answer: "Wind damage signs include missing or lifted shingles, cracked shingles along the edges, damaged flashing, and blown-off ridge caps. Some damage isn't visible from the ground — a professional inspection is the only reliable way to know, and it's completely free with no obligation. We use photos to show you exactly what we find." },
];

export default function CaldwellPage() {
  const svcSchema = serviceSchema({ name: "Roofing Services in Caldwell, ID", description: "Professional roofing services in Caldwell, ID and Canyon County including roof replacement, repair, and wind and storm damage restoration.", url: "https://thestellarroofing.com/boise/service-areas/caldwell", areaServed: "Caldwell, ID", phone: loc.phone });

  return (
    <>
      <SchemaMarkup schema={svcSchema} />
      <SchemaMarkup schema={faqSchema(faqs)} />

      <Breadcrumbs items={[{ name: "Boise", path: "/boise" }, { name: "Service Areas", path: "/boise#service-areas" }, { name: "Caldwell", path: "/boise/service-areas/caldwell" }]} />

      <section className="relative h-64 md:h-80 flex items-center">
        <Image src="/images/crew-working-02.jpg" alt="Roofing company in Caldwell, ID" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-primary/75" />
        <div className="relative z-10 px-4 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-white/80 mb-2"><MapPin size={18} /><span className="font-semibold text-sm">Caldwell, ID</span></div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Roofing Company in Caldwell, ID</h1>
          <p className="text-white/90 text-lg mb-5">Serving Canyon County with reliable, professional roofing.</p>
          <a href={`tel:${loc.phoneRaw}`} className="inline-flex items-center gap-2 bg-white hover:bg-white/90 text-primary font-bold px-6 py-3 rounded-lg transition-colors">
            <Phone size={18} /> {loc.phone}
          </a>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Roofing in Caldwell, ID</h2>
          <p className="text-text-muted leading-relaxed mb-6">Caldwell is Canyon County's county seat and one of the oldest cities in the Treasure Valley. The city has a mix of older established neighborhoods and newer residential developments that are expanding as the greater Boise metro continues to grow. This range of home ages means Caldwell sees roofing needs that span from storm repairs on newer homes to full replacements on homes that are 25–35 years old.</p>
          <p className="text-text-muted leading-relaxed mb-6">Caldwell shares the Treasure Valley's climate challenges — high-wind events that can impact entire neighborhoods, summer UV exposure that accelerates shingle aging, and winter conditions that test older roofing systems. Canyon County is particularly known for its wind events — powerful gusts driven by the Treasure Valley gap effect that can cause shingle blow-offs and uplift damage even on roofs that are otherwise in reasonable condition.</p>
          <p className="text-text-muted leading-relaxed mb-8">Stellar Roofing &amp; Restorations serves Caldwell homeowners with the same professional, honest approach and lifetime workmanship warranty that defines our work throughout the Treasure Valley.</p>

          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Roofing Services in Caldwell, ID</h2>
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
          <GHLForm type="quote" title="Get a Free Roofing Estimate in Caldwell" />
        </div>
      </section>

      <CTABanner heading="Caldwell — Schedule Your Free Roof Inspection" subtext="Honest assessments, lifetime warranty, no pressure." phone={loc.phone} phoneRaw={loc.phoneRaw} />
      <FAQ faqs={faqs} heading="Caldwell Roofing FAQs" />
    </>
  );
}
