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
  title: { absolute: "Roofing Company Hendersonville TN | Roofers & Roof Repair | Stellar Roofing" },
  description: "Hendersonville, TN roofers based next door in Goodlettsville. Roof repair, roof replacement, and hail & storm damage for Sumner County homes. Free inspections. Call (629) 277-4249.",
  alternates: { canonical: 'https://www.thestellarroofing.com/nashville/service-areas/hendersonville' },
};

const faqs = [
  { question: "Where is Stellar Roofing located relative to Hendersonville?", answer: "Our office is at 110 Space Park N in Goodlettsville, right next door to Hendersonville. That makes Hendersonville one of the closest areas we serve, which helps when you need someone out for a leak or after a storm." },
  { question: "Do you do roof repairs in Hendersonville, or only full replacements?", answer: "Both. A lot of Hendersonville calls are repairs: a leak around a chimney or vent, missing shingles after a wind storm, or worn pipe boots. If a repair will do the job, we'll tell you that instead of pushing a new roof." },
  { question: "How much does a new roof cost in Hendersonville?", answer: "It depends on the roof's size, pitch, layers to tear off, and the shingle you choose. We give free written estimates after inspecting the roof. Our roof replacement cost guide explains what drives the price in Middle Tennessee." },
  { question: "Do you help with insurance claims in Hendersonville?", answer: "Yes. Sumner County gets the same hail and wind storms as the rest of Middle Tennessee. We inspect and photograph the damage and can meet your adjuster on-site at no extra charge." },
  { question: "What shingles do you install?", answer: "We install Owens Corning and GAF architectural shingles, and we can talk through impact-resistant options if hail is a concern for your home." },
];

const nearby = ['gallatin', 'nashville', 'mount-juliet', 'lebanon', 'clarksville'];
const trustItems = ['Based in Goodlettsville', 'Lifetime Workmanship Warranty', 'Free Inspections', 'Licensed & Insured', 'Insurance Claims Help'];

export default function HendersonvillePage() {
  const svcSchema = serviceSchema({ name: "Roofing Services in Hendersonville, TN", description: "Roof repair, roof replacement, and storm damage restoration in Hendersonville, TN and Sumner County.", url: "https://www.thestellarroofing.com/nashville/service-areas/hendersonville", areaServed: "Hendersonville, TN", phone: loc.phone });

  return (
    <>
      <SchemaMarkup schema={svcSchema} />
      <SchemaMarkup schema={faqSchema(faqs)} />

      <Breadcrumbs items={[{ name: "Nashville", path: "/nashville" }, { name: "Service Areas", path: "/nashville#service-areas" }, { name: "Hendersonville", path: "/nashville/service-areas/hendersonville" }]} />

      <section className="relative h-64 md:h-80 flex items-center">
        <Image src="/images/service-roof-replacement.jpg" alt="Roofing company in Hendersonville, TN" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-primary/75" />
        <div className="relative z-10 px-4 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-white/80 mb-2"><MapPin size={18} /><span className="font-semibold text-sm">Hendersonville, TN · Sumner County</span></div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Roofing Company in Hendersonville, TN</h1>
          <p className="text-white/90 text-lg mb-5">Local roofers from right next door in Goodlettsville.</p>
          <a href={`tel:${loc.phoneRaw}`} className="inline-flex items-center gap-2 bg-white hover:bg-white/90 text-primary font-bold px-6 py-3 rounded-lg transition-colors">
            <Phone size={18} /> {loc.phone}
          </a>
        </div>
      </section>

      <section id="estimate-section" className="py-10 px-4 bg-bg-alt">
        <div className="max-w-2xl mx-auto">
          <SiteLeadForm type="quote" title="Get a Free Roof Inspection in Hendersonville" />
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
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Hendersonville Roofers, Close to Home</h2>
          <p className="text-text-muted leading-relaxed mb-6">Stellar Roofing &amp; Restorations is based at 110 Space Park N in Goodlettsville, a short drive from Hendersonville. When you call about a leak or storm damage, you&apos;re calling a local roofing company, not a crew driving in from across the state.</p>
          <p className="text-text-muted leading-relaxed mb-6">Hendersonville&apos;s housing runs from lake-area homes along Old Hickory Lake and Drakes Creek to newer subdivisions off Saundersville Road and Durham Farms. Older homes often need a full tear-off and new decking in spots; newer homes more often need a repair or a storm claim. We inspect first and tell you which one you actually need.</p>

          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Roof Repair in Hendersonville, TN</h2>
          <p className="text-text-muted leading-relaxed mb-6">Most leaks start at the same few places: chimney and wall flashing, pipe boots, valleys, and shingles lifted by wind. We find the source, photograph it, and fix what&apos;s broken. If the roof is near the end of its life, we&apos;ll say so and show you why. Curious what repairs usually run? See our <Link href="/nashville/blog/how-much-does-roof-repair-cost" className="font-semibold text-primary underline">roof repair cost guide</Link>, or read more about our <Link href="/nashville/services/roof-repair" className="font-semibold text-primary underline">roof repair service</Link>.</p>

          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Roof Replacement and Storm Damage</h2>
          <p className="text-text-muted leading-relaxed mb-8">When a roof is past saving, we replace it with Owens Corning or GAF architectural shingles and back the work with a lifetime workmanship warranty. After hail or high winds, we offer free inspections and can meet your insurance adjuster on-site. Our <Link href="/nashville/blog/hail-damage-roof-insurance-claim" className="font-semibold text-primary underline">hail damage claim guide</Link> walks through how the process works, and the <Link href="/nashville/blog/how-much-does-roof-replacement-cost-nashville" className="font-semibold text-primary underline">roof replacement cost guide</Link> covers what drives the price.</p>

          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Roofing Services in Hendersonville, TN</h2>
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

      <CTABanner heading="Need a Roofer in Hendersonville?" subtext="Free inspections, honest answers, and a lifetime workmanship warranty on every roof we replace." phone={loc.phone} phoneRaw={loc.phoneRaw} />
      <FAQ faqs={faqs} heading="Hendersonville Roofing FAQs" />
    </>
  );
}
