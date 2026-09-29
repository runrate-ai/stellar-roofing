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

export const metadata = {
  title: { absolute: "Roofing Company Brentwood TN | Roofer for Williamson County | Stellar Roofing" },
  description: "Brentwood, TN roofer for roof replacement, repair, and hail & storm damage. Free inspections, insurance claims help, lifetime workmanship warranty. Call (629) 277-4249.",
  alternates: { canonical: 'https://www.thestellarroofing.com/nashville/service-areas/brentwood' },
};

const faqs = [
  { question: "Do you serve all of Brentwood, TN?", answer: "Yes. We serve all of Brentwood, from Governors Club and Annandale to the Concord Road and Wilson Pike corridors, plus the surrounding Williamson County communities." },
  { question: "Do you work on large or complex Brentwood homes?", answer: "Yes. Many Brentwood homes have steep pitches, multiple peaks and valleys, dormers, and premium roofing materials. These roofs take experienced installers and careful flashing work, and we plan every project around the specific roof." },
  { question: "How does storm damage affect Brentwood roofs?", answer: "Brentwood sits in the same storm corridor as Nashville and Franklin, and hail regularly affects Williamson County. Hail bruising on shingles is usually invisible from the ground but can shorten a roof's life. A free inspection after a storm is the best way to know what you are dealing with." },
  { question: "Do you help with insurance claims in Brentwood?", answer: "Yes. We inspect and document storm damage with photos and can meet your adjuster on-site, at no extra charge." },
  { question: "What roofing materials work best for Brentwood homes?", answer: "Most Brentwood homeowners choose premium architectural shingles or Class 4 impact-resistant shingles, given Middle Tennessee hail. Standing seam metal is also a strong option on the right home. We will walk you through the trade-offs during your free inspection." },
];

const nearby = ['nashville', 'franklin', 'spring-hill', 'murfreesboro', 'smyrna'];
const trustItems = ['Lifetime Workmanship Warranty', 'Free Inspections', 'Licensed & Insured', 'Insurance Claims Help', 'Locally Owned'];

export default function BrentwoodPage() {
  const svcSchema = serviceSchema({ name: "Roofing Services in Brentwood, TN", description: "Professional roofing services in Brentwood, TN including roof replacement, repair, and storm damage restoration.", url: "https://www.thestellarroofing.com/nashville/service-areas/brentwood", areaServed: "Brentwood, TN", phone: loc.phone });

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

      <section id="estimate-section" className="py-10 px-4 bg-bg-alt">
        <div className="max-w-2xl mx-auto">
          <SiteLeadForm type="quote" title="Get a Free Roofing Estimate in Brentwood" />
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
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Brentwood&apos;s Trusted Roofing Contractor</h2>
          <p className="text-text-muted leading-relaxed mb-6">Brentwood is one of the most desirable communities in Middle Tennessee, and its homes reflect that: well-built, well-kept properties where homeowners expect the same standard from their contractors. Stellar Roofing &amp; Restorations brings that standard to every Brentwood project, from a single leak repair to a full premium replacement.</p>
          <p className="text-text-muted leading-relaxed mb-6">Many Brentwood homes have larger, more complex roof lines with multiple peaks, valleys, and dormers, all of which demand experienced hands and careful flashing. We plan each job around the specific roof and back every replacement with a lifetime workmanship warranty.</p>
          <p className="text-text-muted leading-relaxed mb-6">Brentwood&apos;s spot in Williamson County puts it squarely in Middle Tennessee&apos;s storm corridor, with hail and severe thunderstorms most springs and falls. Hail bruising and dented flashing are rarely visible from the ground, but they shorten a roof&apos;s life and may be covered by homeowners insurance. We offer free post-storm inspections and document everything we find. Read our <Link href="/nashville/blog/hail-damage-roof-insurance-claim" className="font-semibold text-primary underline">guide to hail damage insurance claims</Link> to see how the process works.</p>
          <p className="text-text-muted leading-relaxed mb-8">We work throughout Brentwood, including Governors Club, Annandale, the Concord Road corridor, and the Wilson Pike area, whether you have a newer build or an established home that needs a full replacement.</p>

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

          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Nearby Areas We Serve</h2>
          <div className="flex flex-wrap gap-3">
            {nearby.map(slug => loc.serviceAreas.find(a => a.slug === slug)).map(a => (
              <Link key={a.slug} href={`/nashville/service-areas/${a.slug}`} className="bg-bg-alt hover:bg-slate-200 text-primary font-semibold text-sm px-4 py-2 rounded-full transition-colors">
                {a.city}, {a.state}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABanner heading="Ready to Protect Your Brentwood Home?" subtext="Free inspections, honest estimates, and a lifetime workmanship warranty on every roof we replace." phone={loc.phone} phoneRaw={loc.phoneRaw} />
      <FAQ faqs={faqs} heading="Brentwood Roofing FAQs" />
    </>
  );
}
