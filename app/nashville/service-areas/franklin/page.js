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
  title: { absolute: "Roofers Franklin TN | Roof Repair & Roof Replacement | Stellar Roofing" },
  description: "Franklin, TN roofers for roof repair, roof replacement, and hail & storm damage across Williamson County. Free inspections, Owens Corning & GAF shingles, lifetime workmanship warranty. Call (629) 277-4249.",
  alternates: { canonical: 'https://www.thestellarroofing.com/nashville/service-areas/franklin' },
};

const faqs = [
  { question: "What parts of Franklin do you serve?", answer: "All of Franklin and the surrounding Williamson County communities, including Cool Springs, Westhaven, Fieldstone Farms, Berry Farms, McKay's Mill, and the neighborhoods around downtown." },
  { question: "Do you do roof repairs in Franklin?", answer: "Yes. Leaks at flashing, chimneys, skylights, and pipe boots are some of the most common calls we get. We find the source, photograph it, and fix it. If the roof really needs replacing, we'll show you why." },
  { question: "Does my HOA need to approve a new roof?", answer: "Many Franklin neighborhoods have an HOA or architectural review committee that approves shingle style and color before work starts. We'll give you the product details and color samples you need for the request." },
  { question: "What about homes in Franklin's historic districts?", answer: "Homes in the city's historic overlay districts may need approval from Franklin's Historic Zoning Commission before changing roofing materials. Check with the city's planning department early; we can provide product information for the application." },
  { question: "Do you help with hail damage insurance claims in Franklin?", answer: "Yes. Williamson County sits in Middle Tennessee's storm corridor. We document damage with photos and can meet your adjuster on-site at no extra charge." },
];

const nearby = ['brentwood', 'spring-hill', 'nashville', 'murfreesboro', 'smyrna'];
const trustItems = ['Lifetime Workmanship Warranty', 'Free Inspections', 'Licensed & Insured', 'Insurance Claims Help', 'Locally Owned'];

export default function FranklinPage() {
  const svcSchema = serviceSchema({ name: "Roofing Services in Franklin, TN", description: "Roof repair, roof replacement, and storm damage restoration in Franklin, TN and Williamson County.", url: "https://www.thestellarroofing.com/nashville/service-areas/franklin", areaServed: "Franklin, TN", phone: loc.phone });

  return (
    <>
      <SchemaMarkup schema={svcSchema} />
      <SchemaMarkup schema={faqSchema(faqs)} />

      <Breadcrumbs items={[{ name: "Nashville", path: "/nashville" }, { name: "Service Areas", path: "/nashville#service-areas" }, { name: "Franklin", path: "/nashville/service-areas/franklin" }]} />

      <section className="relative h-64 md:h-80 flex items-center">
        <Image src="/images/service-roof-repair.jpg" alt="Roofers in Franklin, TN" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-primary/75" />
        <div className="relative z-10 px-4 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-white/80 mb-2"><MapPin size={18} /><span className="font-semibold text-sm">Franklin, TN · Williamson County</span></div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Roofers in Franklin, TN</h1>
          <p className="text-white/90 text-lg mb-5">Roof repair and replacement for Williamson County homes.</p>
          <a href={`tel:${loc.phoneRaw}`} className="inline-flex items-center gap-2 bg-white hover:bg-white/90 text-primary font-bold px-6 py-3 rounded-lg transition-colors">
            <Phone size={18} /> {loc.phone}
          </a>
        </div>
      </section>

      <section id="estimate-section" className="py-10 px-4 bg-bg-alt">
        <div className="max-w-2xl mx-auto">
          <SiteLeadForm type="quote" title="Get a Free Roof Inspection in Franklin" />
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
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">A Franklin Roofing Company That Shows You the Roof</h2>
          <p className="text-text-muted leading-relaxed mb-6">Franklin homeowners expect work that matches their homes, whether that&apos;s a newer build in Westhaven or Berry Farms, an established home in Fieldstone Farms, or a house near downtown. Stellar Roofing &amp; Restorations starts every job the same way: we get on the roof, photograph everything, and walk you through what we found before we recommend anything.</p>
          <p className="text-text-muted leading-relaxed mb-6">Many Franklin homes have complex roof lines with multiple valleys, dormers, and wall intersections. Those are exactly the spots where leaks start, and where careful flashing work makes the difference between a roof that lasts and one that doesn&apos;t.</p>

          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Roof Repair in Franklin, TN</h2>
          <p className="text-text-muted leading-relaxed mb-6">Most Franklin repair calls come down to flashing, pipe boots, valleys, or shingles damaged by wind. We trace the leak to its source and fix it properly. Read our <Link href="/nashville/blog/how-much-does-roof-repair-cost" className="font-semibold text-primary underline">roof repair cost guide</Link> for typical prices, or see our <Link href="/nashville/services/roof-repair" className="font-semibold text-primary underline">roof repair service</Link>.</p>

          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Roof Replacement in Franklin, TN</h2>
          <p className="text-text-muted leading-relaxed mb-6">We install Owens Corning and GAF architectural shingles, and every replacement comes with our lifetime workmanship warranty. If your HOA needs to approve the shingle and color, we&apos;ll give you the product details for the request. See our <Link href="/nashville/services/roof-replacement" className="font-semibold text-primary underline">roof replacement service</Link> and the <Link href="/nashville/blog/how-much-does-roof-replacement-cost-nashville" className="font-semibold text-primary underline">roof replacement cost guide</Link>.</p>

          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Hail and Storm Damage in Williamson County</h2>
          <p className="text-text-muted leading-relaxed mb-8">Hail regularly hits Williamson County, and the damage is rarely visible from the ground. After a storm, we offer free inspections, document what we find, and can meet your insurance adjuster on-site. Our <Link href="/nashville/blog/hail-damage-roof-insurance-claim" className="font-semibold text-primary underline">hail damage claim guide</Link> explains the process.</p>

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

      <CTABanner heading="Need a Roofer in Franklin?" subtext="Free inspections, honest answers, and a lifetime workmanship warranty on every roof we replace." phone={loc.phone} phoneRaw={loc.phoneRaw} />
      <FAQ faqs={faqs} heading="Franklin Roofing FAQs" />
    </>
  );
}
