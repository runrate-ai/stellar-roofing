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
  title: { absolute: "Roofing Company Murfreesboro TN | Roofers & Roof Repair | Stellar Roofing" },
  description: "Murfreesboro, TN roofing company for roof repair, roof replacement, and hail & storm damage across Rutherford County. Free inspections, lifetime workmanship warranty. Call (629) 277-4249.",
  alternates: { canonical: 'https://www.thestellarroofing.com/nashville/service-areas/murfreesboro' },
};

const faqs = [
  { question: "Do you serve all of Murfreesboro and Rutherford County?", answer: "Yes. We work throughout Murfreesboro, including the Blackman area, Gateway and Medical Center Parkway, the neighborhoods around MTSU, and the newer subdivisions on the edges of town, plus nearby Smyrna." },
  { question: "Do you repair roofs in Murfreesboro, or only replace them?", answer: "Both. Plenty of Murfreesboro roofs just need a repair: a leak at a vent or chimney, shingles lifted by wind, or a worn pipe boot. We inspect first, and if a repair is the right call, that's what we recommend." },
  { question: "My Murfreesboro home is fairly new. Could it still have roof problems?", answer: "Yes. Newer homes often have builder-grade shingles and quick installs, and wind and hail don't care how old the roof is. A free inspection tells you whether there's damage worth fixing or claiming." },
  { question: "Do you help with hail and storm insurance claims in Murfreesboro?", answer: "Yes. Rutherford County sits in the same Middle Tennessee storm corridor as Nashville. We document damage with photos and can meet your adjuster on-site at no extra charge." },
  { question: "How do I get a free estimate in Murfreesboro?", answer: "Fill out the short form on this page or call us. We'll set a time to inspect the roof and give you a written estimate with no obligation." },
];

const nearby = ['smyrna', 'nashville', 'lebanon', 'mount-juliet', 'franklin', 'brentwood'];
const trustItems = ['Lifetime Workmanship Warranty', 'Free Inspections', 'Licensed & Insured', 'Insurance Claims Help', 'Locally Owned'];

export default function MurfreesboroPage() {
  const svcSchema = serviceSchema({ name: "Roofing Services in Murfreesboro, TN", description: "Roof repair, roof replacement, and storm damage restoration in Murfreesboro, TN and Rutherford County.", url: "https://www.thestellarroofing.com/nashville/service-areas/murfreesboro", areaServed: "Murfreesboro, TN", phone: loc.phone });

  return (
    <>
      <SchemaMarkup schema={svcSchema} />
      <SchemaMarkup schema={faqSchema(faqs)} />

      <Breadcrumbs items={[{ name: "Nashville", path: "/nashville" }, { name: "Service Areas", path: "/nashville#service-areas" }, { name: "Murfreesboro", path: "/nashville/service-areas/murfreesboro" }]} />

      <section className="relative h-64 md:h-80 flex items-center">
        <Image src="/images/service-roof-replacement.jpg" alt="Roofing company in Murfreesboro, TN" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-primary/75" />
        <div className="relative z-10 px-4 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-white/80 mb-2"><MapPin size={18} /><span className="font-semibold text-sm">Murfreesboro, TN · Rutherford County</span></div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Roofing Company in Murfreesboro, TN</h1>
          <p className="text-white/90 text-lg mb-5">Roof repair, replacement, and storm damage for Rutherford County homes.</p>
          <a href={`tel:${loc.phoneRaw}`} className="inline-flex items-center gap-2 bg-white hover:bg-white/90 text-primary font-bold px-6 py-3 rounded-lg transition-colors">
            <Phone size={18} /> {loc.phone}
          </a>
        </div>
      </section>

      <section id="estimate-section" className="py-10 px-4 bg-bg-alt">
        <div className="max-w-2xl mx-auto">
          <SiteLeadForm type="quote" title="Get a Free Roof Inspection in Murfreesboro" />
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
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Murfreesboro Roofers You Can Trust</h2>
          <p className="text-text-muted leading-relaxed mb-6">Murfreesboro has grown fast, and a lot of its homes went up in the same building boom. That means many roofs in Blackman, around Gateway, and in the subdivisions off Old Fort Parkway and Veterans Parkway are reaching the age where problems start to show: granule loss, lifted shingles, and leaks at flashing and vents.</p>
          <p className="text-text-muted leading-relaxed mb-6">Stellar Roofing &amp; Restorations gives Murfreesboro homeowners a straight answer. We get on the roof, photograph what we find, and tell you whether you need a repair, a replacement, or nothing at all right now.</p>

          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Roof Repair in Murfreesboro, TN</h2>
          <p className="text-text-muted leading-relaxed mb-6">A leak is rarely where the water stain is. We trace it back to the source, whether that&apos;s flashing, a pipe boot, a valley, or wind-damaged shingles, and fix what&apos;s actually broken. See our <Link href="/nashville/blog/how-much-does-roof-repair-cost" className="font-semibold text-primary underline">roof repair cost guide</Link> for typical price ranges, or learn more about our <Link href="/nashville/services/roof-repair" className="font-semibold text-primary underline">roof repair service</Link>.</p>

          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Roof Replacement and Storm Damage in Rutherford County</h2>
          <p className="text-text-muted leading-relaxed mb-8">When a roof is done, we replace it with Owens Corning or GAF architectural shingles and back the work with a lifetime workmanship warranty. Rutherford County sees regular hail and wind, and hail bruising is hard to spot from the ground. After a storm, we offer free inspections and can meet your adjuster on-site. Start with our <Link href="/nashville/blog/what-size-hail-damages-a-roof" className="font-semibold text-primary underline">guide to what size hail damages a roof</Link> and the <Link href="/nashville/blog/signs-you-need-a-new-roof" className="font-semibold text-primary underline">signs you need a new roof</Link>.</p>

          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Roofing Services in Murfreesboro, TN</h2>
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

      <CTABanner heading="Need a Roofer in Murfreesboro?" subtext="Free inspections, honest answers, and a lifetime workmanship warranty on every roof we replace." phone={loc.phone} phoneRaw={loc.phoneRaw} />
      <FAQ faqs={faqs} heading="Murfreesboro Roofing FAQs" />
    </>
  );
}
