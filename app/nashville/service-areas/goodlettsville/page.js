import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, Phone, MapPin } from 'lucide-react';
import Breadcrumbs from '../../../../components/Breadcrumbs';
import CTABanner from '../../../../components/CTABanner';
import FAQ from '../../../../components/FAQ';
import SiteLeadForm from '../../../../components/SiteLeadForm';
import SchemaMarkup from '../../../../components/SchemaMarkup';
import { serviceSchema, faqSchema } from '../../../../lib/schema';
import config from '../../../../lib/config';

const loc = config.locations.nashville;
const addr = loc.address;

export const metadata = {
  title: { absolute: "Roofing Company Goodlettsville TN | Local Roofers | Stellar Roofing" },
  description: "Stellar Roofing & Restorations is based in Goodlettsville, TN at 110 Space Park N. Roof repair, roof replacement, and storm damage for Goodlettsville homes. Free inspections. Call (629) 277-4249.",
  alternates: { canonical: 'https://www.thestellarroofing.com/nashville/service-areas/goodlettsville' },
};

const faqs = [
  { question: "Where is Stellar Roofing located?", answer: "Our office is at 110 Space Park N, Goodlettsville, TN 37072. Goodlettsville is home base, and we serve the rest of Middle Tennessee from here." },
  { question: "Do you serve both the Davidson and Sumner County sides of Goodlettsville?", answer: "Yes. Goodlettsville sits on both sides of the county line, and we work throughout the city, from the Rivergate area and Dickerson Pike to Long Hollow Pike and the neighborhoods near Moss-Wright Park." },
  { question: "Do you do roof repairs, or only replacements?", answer: "Both. We fix leaks at flashing, chimneys, and pipe boots, replace wind-damaged shingles, and do full replacements when a roof is at the end of its life. We inspect first and tell you which you need." },
  { question: "Do you help with hail and storm insurance claims?", answer: "Yes. We inspect and photograph storm damage and can meet your adjuster on-site at no extra charge." },
];

const nearby = ['hendersonville', 'nashville', 'gallatin', 'brentwood', 'clarksville'];
const trustItems = ['Based in Goodlettsville', 'Lifetime Workmanship Warranty', 'Free Inspections', 'Licensed & Insured', 'Insurance Claims Help'];

export default function GoodlettsvillePage() {
  const svcSchema = serviceSchema({ name: "Roofing Services in Goodlettsville, TN", description: "Roof repair, roof replacement, and storm damage restoration in Goodlettsville, TN, from our office at 110 Space Park N.", url: "https://www.thestellarroofing.com/nashville/service-areas/goodlettsville", areaServed: "Goodlettsville, TN", phone: loc.phone });

  return (
    <>
      <SchemaMarkup schema={svcSchema} />
      <SchemaMarkup schema={faqSchema(faqs)} />

      <Breadcrumbs items={[{ name: "Nashville", path: "/nashville" }, { name: "Service Areas", path: "/nashville#service-areas" }, { name: "Goodlettsville", path: "/nashville/service-areas/goodlettsville" }]} />

      <section className="relative h-64 md:h-80 flex items-center">
        <Image src="/images/crew-working-02.jpg" alt="Roofing company in Goodlettsville, TN" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-primary/75" />
        <div className="relative z-10 px-4 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-white/80 mb-2"><MapPin size={18} /><span className="font-semibold text-sm">Goodlettsville, TN · Our home base</span></div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Roofing Company in Goodlettsville, TN</h1>
          <p className="text-white/90 text-lg mb-5">Your neighborhood roofers, based on Space Park N.</p>
          <a href={`tel:${loc.phoneRaw}`} className="inline-flex items-center gap-2 bg-white hover:bg-white/90 text-primary font-bold px-6 py-3 rounded-lg transition-colors">
            <Phone size={18} /> {loc.phone}
          </a>
        </div>
      </section>

      <section id="estimate-section" className="py-10 px-4 bg-bg-alt">
        <div className="max-w-2xl mx-auto">
          <SiteLeadForm type="quote" title="Get a Free Roof Inspection in Goodlettsville" />
        </div>
      </section>

      <section className="bg-bg-alt py-5 px-4 border-b border-slate-200">
        <ul className="max-w-5xl mx-auto flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm font-semibold text-primary">
          {trustItems.map(item => (
            <li key={item} className="flex items-center gap-2"><CheckCircle2 size={16} /> {item}</li>
          ))}
        </ul>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Goodlettsville Is Home Base</h2>
          <p className="text-text-muted leading-relaxed mb-6">Stellar Roofing &amp; Restorations works out of {addr.street}, {addr.city}, {addr.state} {addr.zip}. For Goodlettsville homeowners, that means your roofer is minutes away, whether it&apos;s a leak after a heavy rain or a full inspection after a hail storm.</p>
          <p className="text-text-muted leading-relaxed mb-6">Goodlettsville straddles Davidson and Sumner counties, and its homes range from older ranches near the historic downtown to newer subdivisions off Long Hollow Pike. We handle all of it: roof repair, full replacement with Owens Corning or GAF architectural shingles, and storm damage inspections and claims.</p>
          <p className="text-text-muted leading-relaxed mb-8"><a href={loc.mapUrl} target="_blank" rel="noopener" className="font-semibold text-primary underline">Find us on Google Maps</a>, or learn more about our <Link href="/nashville/services/roof-repair" className="font-semibold text-primary underline">roof repair</Link>, <Link href="/nashville/services/roof-replacement" className="font-semibold text-primary underline">roof replacement</Link>, and <Link href="/nashville/services/storm-damage-repair" className="font-semibold text-primary underline">storm damage</Link> services.</p>

          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Roofing Services in Goodlettsville, TN</h2>
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

          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Nearby Areas We Serve</h2>
          <div className="flex flex-wrap gap-3">
            {nearby.map(slug => loc.serviceAreas.find(a => a.slug === slug)).filter(Boolean).map(a => (
              <Link key={a.slug} href={`/nashville/service-areas/${a.slug}`} className="bg-bg-alt hover:bg-slate-200 text-primary font-semibold text-sm px-4 py-2 rounded-full transition-colors">
                {a.city}, {a.state}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABanner heading="Need a Roofer in Goodlettsville?" subtext="Free inspections, honest answers, and a lifetime workmanship warranty on every roof we replace." phone={loc.phone} phoneRaw={loc.phoneRaw} />
      <FAQ faqs={faqs} heading="Goodlettsville Roofing FAQs" />
    </>
  );
}
