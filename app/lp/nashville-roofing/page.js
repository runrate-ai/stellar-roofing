import Image from 'next/image';
import {
  Phone, CheckCircle2, Shield, BadgeCheck, FileCheck, SearchCheck,
  Star, ClipboardCheck, HardHat, Home, Wrench, CloudLightning,
  Building2, AlertTriangle, Gift, TrendingDown,
} from 'lucide-react';
import FunnelHeader from '../../../components/funnel/FunnelHeader';
import FunnelFooter from '../../../components/funnel/FunnelFooter';
import EmbeddedForm from '../../../components/funnel/EmbeddedForm';
import TrustRow from '../../../components/funnel/TrustRow';
import ProjectGallery from '../../../components/funnel/ProjectGallery';
import config from '../../../lib/config';
import allReviews from '../../../client-data/reviews/reviews.json';

const nashville = config.locations.nashville;

// Only real, verifiable reviews are eligible for display. Seed entries in
// reviews.json are flagged `placeholder: true` and are filtered out here so
// invented testimonials can never reach a live paid-traffic page.
const reviews = allReviews.filter(r => !r.placeholder).slice(0, 3);

const OFFER_FINE_PRINT =
  'Free gutters offer applies to complete roof replacements only and covers standard 5" seamless aluminum gutters on the replaced roof sections; it cannot be combined with other offers or discounts. Price beat guarantee requires a comparable written estimate from a licensed and insured Tennessee roofing contractor for the same scope of work and materials, presented before your contract is signed; Stellar Roofing & Restorations reserves the right to verify any estimate submitted. Offers subject to change or withdrawal at any time.';

export const metadata = {
  title: 'Free Gutters With Your New Roof | Nashville Roofing | Stellar Roofing',
  description:
    "Get a free estimate on your Nashville roof replacement — plus free gutters and our price beat guarantee. Licensed, insured, lifetime warranty. Call (629) 277-4249.",
  // Paid-traffic landing page: kept out of the index so it never competes with
  // the main site's organic Nashville pages. Google Ads does not require indexing.
  robots: { index: false, follow: false },
};

const ICONS = { Home, Wrench, CloudLightning, SearchCheck, Building2, AlertTriangle };

export default function NashvilleFunnelPage() {
  return (
    <>
      <FunnelHeader />

      {/* ── HERO ────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-b from-bg-alt to-white">
        <div className="relative max-w-6xl mx-auto px-4 py-10 lg:py-16">
          <div className="grid lg:grid-cols-[1fr_560px] gap-10 lg:gap-14 items-start">

            {/* Copy */}
            <div className="text-center lg:text-left">
              {/* Navy text on amber, not white — white on #F59E0B is ~2.1:1 and unreadable */}
              <div className="inline-flex items-center gap-2 rounded-full bg-cta px-4 py-1.5 mb-5">
                <Gift size={15} className="text-primary" />
                <span className="text-primary font-extrabold text-xs uppercase tracking-wider">
                  Limited Time — Nashville Homeowners
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary leading-[1.12] mb-5">
                Need a New Roof in Nashville?{' '}
                {/* cta-hover (#D97706), not cta — the lighter amber fails contrast on white */}
                <span className="text-cta-hover">Get Free Gutters</span> — And We&apos;ll Beat Any Competitor&apos;s Price.
              </h1>

              {/* Above the fold on mobile — the full trust bar below the hero
                  is never seen by most paid visitors. */}
              <TrustRow className="mb-6" />

              <p className="text-text-muted text-lg lg:text-xl leading-relaxed mb-7 max-w-xl mx-auto lg:mx-0">
                Free inspection, honest pricing, and a lifetime warranty from the crew
                Middle Tennessee homeowners actually trust. Bring us a written quote —
                we&apos;ll beat it.
              </p>

              {/* Offer pillars */}
              <div className="grid sm:grid-cols-2 gap-3 mb-8 max-w-xl mx-auto lg:mx-0">
                <div className="flex items-start gap-3 rounded-xl bg-white ring-1 ring-slate-200 shadow-sm px-4 py-3.5 text-left">
                  <Gift size={20} className="text-cta-hover flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-primary font-bold text-sm">Free Gutters</p>
                    <p className="text-text-muted text-xs leading-snug">With every full roof replacement</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-xl bg-white ring-1 ring-slate-200 shadow-sm px-4 py-3.5 text-left">
                  <TrendingDown size={20} className="text-cta-hover flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-primary font-bold text-sm">Price Beat Guarantee</p>
                    <p className="text-text-muted text-xs leading-snug">Bring any comparable written quote</p>
                  </div>
                </div>
              </div>

              <a
                href={`tel:${nashville.phoneRaw}`}
                className="inline-flex items-center gap-2.5 text-primary font-extrabold text-2xl hover:text-cta-hover transition-colors"
              >
                <Phone size={24} fill="currentColor" /> {nashville.phone}
              </a>
              <p className="text-text-muted text-sm mt-1.5">
                Open {nashville.hours.weekdays} Mon–Fri · Sat {nashville.hours.saturday}
              </p>
            </div>

            {/* Form — not sticky: at 900px the frame is taller than most
                laptop viewports, so pinning it would cut off the bottom. */}
            <div>
              <EmbeddedForm id="quote-form" lazy={false} />
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ───────────────────────────────────────── */}
      <section className="bg-white border-y border-slate-100 py-6">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-5">
          {[
            { label: 'Lifetime Warranty', Icon: Shield },
            { label: 'Free Inspections', Icon: SearchCheck },
            { label: 'Licensed & Insured', Icon: BadgeCheck },
            { label: 'Insurance Claims Help', Icon: FileCheck },
          ].map(({ label, Icon }) => (
            <div key={label} className="flex flex-col items-center text-center gap-2">
              <Icon className="text-primary" size={26} />
              <span className="text-text-dark font-bold text-xs sm:text-sm leading-tight">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── THE OFFER ───────────────────────────────────────── */}
      <section className="bg-bg-alt py-14 lg:py-18 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-primary mb-3">
              Two Reasons to Call Us First
            </h2>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">
              Most roofing companies make you choose between a fair price and quality work.
              We took that decision off the table.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-7 shadow-sm ring-1 ring-black/5">
              <div className="w-12 h-12 rounded-xl bg-cta/10 flex items-center justify-center mb-4">
                <Gift size={24} className="text-cta" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-2.5">Free Gutters, Fully Installed</h3>
              <p className="text-text-muted leading-relaxed mb-4">
                Replace your roof with us and we&apos;ll install brand-new seamless aluminum
                gutters at no charge. Not a discount, not a rebate — included. New gutters
                protect the roof you just paid for, so it never made sense to us to sell
                them separately.
              </p>
              <ul className="space-y-2">
                {['5" seamless aluminum', 'Professionally installed by our crew', 'No hidden add-on fees'].map(item => (
                  <li key={item} className="flex items-start gap-2 text-sm text-text-dark">
                    <CheckCircle2 size={16} className="text-cta flex-shrink-0 mt-0.5" /> {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-7 shadow-sm ring-1 ring-black/5">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <TrendingDown size={24} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-2.5">We&apos;ll Beat Any Competitor&apos;s Price</h3>
              <p className="text-text-muted leading-relaxed mb-4">
                Get your other estimates. Seriously. Then bring us the written quote and
                we&apos;ll beat it on comparable scope and materials — while still backing
                the job with our lifetime warranty. You should never have to pay more to
                work with the better crew.
              </p>
              <ul className="space-y-2">
                {['Bring any written estimate', 'Same scope, same materials, lower price', 'Lifetime warranty still included'].map(item => (
                  <li key={item} className="flex items-start gap-2 text-sm text-text-dark">
                    <CheckCircle2 size={16} className="text-primary flex-shrink-0 mt-0.5" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="text-center mt-9">
            <a href="#quote-form" className="inline-block rounded-lg bg-cta hover:bg-cta-hover text-primary font-extrabold text-lg px-9 py-4 shadow-lg transition">
              Claim My Free Gutters →
            </a>
          </div>
        </div>
      </section>

      {/* ── PHOTO BAND ──────────────────────────────────────── */}
      <section className="relative py-16 lg:py-20 px-4">
        <Image
          src="/images/crew-working.jpg"
          alt="Stellar Roofing crew installing a new roof in Nashville"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-primary/85" />
        <div className="relative max-w-4xl mx-auto text-center">
          <p className="text-cta font-extrabold text-xs uppercase tracking-widest mb-3">
            {config.business.tagline}
          </p>
          <h2 className="text-2xl lg:text-3xl font-extrabold text-white mb-4 leading-tight">
            Locally Owned. Nashville Crews. Lifetime Warranty on Every Roof.
          </h2>
          <p className="text-white/80 text-lg leading-relaxed">
            We&apos;re not a storm-chasing outfit that rolls into town and disappears.
            We live here, our crews are ours, and we&apos;re still here when you need
            us in year twelve.
          </p>
        </div>
      </section>

      {/* ── HOW IT WORKS ────────────────────────────────────── */}
      <section className="bg-white py-14 lg:py-18 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-primary text-center mb-3">
            How It Works
          </h2>
          <p className="text-text-muted text-lg text-center mb-11 max-w-2xl mx-auto">
            Three steps. No pressure at any of them.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { n: '1', Icon: ClipboardCheck, title: 'Tell Us About Your Roof', desc: 'Fill out the 30-second form or call us. We\'ll confirm we service your area and book a time that works for you.' },
              { n: '2', Icon: SearchCheck, title: 'Get Your Free Inspection', desc: 'We physically get on the roof — not a drive-by. You get photos of everything we find and a straight answer about its condition.' },
              { n: '3', Icon: HardHat, title: 'Get Your Price — And Free Gutters', desc: 'A clear written estimate with no surprise line items. Approve it and we schedule the work, gutters included.' },
            ].map(({ n, Icon, title, desc }) => (
              <div key={n} className="text-center">
                <div className="relative inline-flex mb-5">
                  <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center">
                    <Icon size={28} className="text-white" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-cta text-white text-sm font-extrabold flex items-center justify-center ring-4 ring-white">
                    {n}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-primary mb-2">{title}</h3>
                <p className="text-text-muted leading-relaxed text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPLETED JOBS (hidden until real photos added) ─── */}
      <ProjectGallery />

      {/* ── SOCIAL PROOF (real reviews only) ────────────────── */}
      {reviews.length > 0 && (
        <section className="bg-bg-alt py-14 lg:py-18 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-primary text-center mb-11">
              What Nashville Homeowners Say
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {reviews.map(review => (
                <figure key={review.name} className="bg-white rounded-2xl p-6 shadow-sm ring-1 ring-black/5 flex flex-col">
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} size={16} className="text-cta" fill="currentColor" />
                    ))}
                  </div>
                  <blockquote className="text-text-muted text-sm leading-relaxed flex-1">
                    &ldquo;{review.text}&rdquo;
                  </blockquote>
                  <figcaption className="mt-4 pt-4 border-t border-slate-100">
                    <p className="font-bold text-text-dark text-sm">{review.name}</p>
                    <p className="text-text-muted text-xs">
                      {review.city} · {review.service}
                    </p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── SERVICES ────────────────────────────────────────── */}
      {/* border-t keeps this distinct from How It Works while the reviews
          section between them is empty (no real reviews yet). */}
      <section className="bg-white border-t border-slate-100 py-14 lg:py-18 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-primary text-center mb-11">
            What We Do
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {config.services.map(service => {
              const Icon = ICONS[service.icon] || Home;
              return (
                <div key={service.slug} className="rounded-xl border border-slate-200 p-5 hover:border-primary/40 hover:shadow-md transition">
                  <Icon size={24} className="text-primary mb-3" />
                  <h3 className="font-bold text-primary mb-1.5">{service.name}</h3>
                  <p className="text-text-muted text-sm leading-relaxed">{service.shortDescription}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SERVICE AREAS ───────────────────────────────────── */}
      <section className="bg-bg-alt py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl lg:text-3xl font-extrabold text-primary mb-3">
            Proudly Serving Middle Tennessee
          </h2>
          <p className="text-text-muted mb-7">
            Not sure if you&apos;re in our service area? Call us — we&apos;ll tell you straight.
          </p>
          <div className="flex flex-wrap justify-center gap-2.5">
            {nashville.serviceAreas.map(area => (
              <span key={area.slug} className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-primary ring-1 ring-black/5">
                {area.city}, {area.state}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ───────────────────────────────────────── */}
      <section className="bg-primary py-14 lg:py-18 px-4">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-[1fr_560px] gap-10 items-center">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-4 leading-tight">
              Ready for a Roof That&apos;s Out of This World?
            </h2>
            <p className="text-white/80 text-lg mb-7">
              Free inspection, free gutters with your replacement, and a price we
              guarantee beats your other quotes. Takes 30 seconds to start.
            </p>
            <a
              href={`tel:${nashville.phoneRaw}`}
              className="inline-flex items-center gap-2.5 rounded-lg bg-white text-primary font-extrabold text-xl px-8 py-4 hover:bg-white/90 transition shadow-lg"
            >
              <Phone size={22} fill="currentColor" /> {nashville.phone}
            </a>
          </div>
          <EmbeddedForm id="quote-form-bottom" />
        </div>
      </section>

      <FunnelFooter offerFinePrint={OFFER_FINE_PRINT} />
    </>
  );
}
