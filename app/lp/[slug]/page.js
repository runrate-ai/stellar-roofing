import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
  Phone, CheckCircle2, Shield, BadgeCheck, FileCheck, SearchCheck,
  Star, ClipboardCheck, HardHat, Home, Wrench, CloudLightning,
  Building2, AlertTriangle, Gift, TrendingDown, PawPrint,
} from 'lucide-react';
import FunnelHeader from '../../../components/funnel/FunnelHeader';
import FunnelFooter from '../../../components/funnel/FunnelFooter';
import FunnelForm from '../../../components/funnel/FunnelForm';
import CallLink from '../../../components/funnel/CallLink';
import TrustRow from '../../../components/funnel/TrustRow';
import { ProjectGalleryEmbed, ProjectMapEmbed } from '../../../components/TrustyEmbed';
import config from '../../../lib/config';
import { funnels, funnelSlugs, getFunnel } from '../../../lib/funnels';
import allReviews from '../../../client-data/reviews/reviews.json';

const nashville = config.locations.nashville;

// Only real, verifiable reviews are eligible for display. Seed entries in
// reviews.json are flagged `placeholder: true` and are filtered out here so
// invented testimonials can never reach a live paid-traffic page.
const reviews = allReviews.filter(r => !r.placeholder).slice(0, 3);

const ICONS = {
  Home, Wrench, CloudLightning, SearchCheck, Building2, AlertTriangle,
  Gift, TrendingDown, ClipboardCheck, HardHat, FileCheck, Shield, BadgeCheck, PawPrint,
};

export function generateStaticParams() {
  return funnelSlugs.map(slug => ({ slug }));
}

// Unknown slugs 404 rather than rendering an empty shell — a broken ad
// destination should fail visibly, not serve a blank page to paid traffic.
export const dynamicParams = false;

export function generateMetadata({ params }) {
  const funnel = getFunnel(params.slug);
  if (!funnel) return {};
  return {
    // `absolute` opts out of the root layout's title template, which would
    // otherwise append the brand name a second time.
    title: { absolute: funnel.meta.title },
    description: funnel.meta.description,
    // Paid-traffic pages are kept out of the index so they never compete with
    // the main site's organic Nashville pages. Google Ads doesn't need indexing.
    robots: { index: false, follow: false },
  };
}

export default function FunnelPage({ params }) {
  const funnel = getFunnel(params.slug);
  if (!funnel) notFound();

  const { headline, offer, closing, steps, pillars } = funnel;

  return (
    <>
      <FunnelHeader funnelSlug={funnel.slug} />

      {/* ── HERO ────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-b from-bg-alt to-white">
        <div className="relative max-w-6xl mx-auto px-4 py-10 lg:py-16">
          {/* Phones: headline, then the form, then the supporting copy, so the
              form sits near the top instead of below the pillars. Desktop: copy
              on the left, form on the right. */}
          <div className="grid lg:grid-cols-[1fr_460px] lg:grid-rows-[auto_1fr] gap-x-14 gap-y-7 items-start">

            <div className="text-center lg:text-left lg:col-start-1 lg:row-start-1">
              {/* Navy text on amber, not white; white on #F59E0B is ~2.1:1 */}
              <div className="inline-flex items-center gap-2 rounded-full bg-cta px-4 py-1.5 mb-5">
                <Gift size={15} className="text-primary" />
                <span className="text-primary font-extrabold text-xs uppercase tracking-wider">
                  {funnel.eyebrow}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary leading-[1.12] mb-5">
                {headline.before}
                {/* cta-hover (#D97706), not cta; the lighter amber fails on white */}
                <span className="text-cta-hover">{headline.highlight}</span>
                {headline.after}
              </h1>

              <TrustRow />
            </div>

            <div className="lg:col-start-2 lg:row-start-1 lg:row-span-2">
              <FunnelForm
                id="quote-form"
                funnelSlug={funnel.slug}
                heading={funnel.formHeading}
                submitLabel={funnel.submitLabel}
              />
            </div>

            <div className="text-center lg:text-left lg:col-start-1 lg:row-start-2">
              <p className="text-text-muted text-lg lg:text-xl leading-relaxed mb-7 max-w-xl mx-auto lg:mx-0">
                {funnel.subhead}
              </p>

              {/* Offer pillars */}
              <div className={`grid gap-3 mb-8 max-w-xl mx-auto lg:mx-0 ${pillars.length === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'}`}>
                {pillars.map(pillar => {
                  const Icon = ICONS[pillar.icon] || Gift;
                  return (
                    <div key={pillar.title} className="flex items-start gap-3 rounded-xl bg-white ring-1 ring-slate-200 shadow-sm px-4 py-3.5 text-left">
                      <Icon size={20} className="text-cta-hover flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-primary font-bold text-sm">{pillar.title}</p>
                        <p className="text-text-muted text-xs leading-snug">{pillar.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <CallLink
                phoneRaw={nashville.phoneRaw}
                funnelSlug={funnel.slug}
                location="hero"
                className="inline-flex items-center gap-2.5 text-primary font-extrabold text-2xl hover:text-cta-hover transition-colors"
              >
                <Phone size={24} fill="currentColor" /> {nashville.phone}
              </CallLink>
              <p className="text-text-muted text-sm mt-1.5">
                {nashville.hours.summary}
              </p>
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
              {offer.heading}
            </h2>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">{offer.subhead}</p>
          </div>

          <div className={`grid gap-6 ${offer.cards.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
            {offer.cards.map(card => {
              const Icon = ICONS[card.icon] || Gift;
              const isCta = card.accent === 'cta';
              return (
                <div key={card.title} className="bg-white rounded-2xl p-7 shadow-sm ring-1 ring-black/5">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${isCta ? 'bg-cta/10' : 'bg-primary/10'}`}>
                    <Icon size={24} className={isCta ? 'text-cta-hover' : 'text-primary'} />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-2.5">{card.title}</h3>
                  <p className="text-text-muted leading-relaxed mb-4">{card.body}</p>
                  <ul className="space-y-2">
                    {card.bullets.map(item => (
                      <li key={item} className="flex items-start gap-2 text-sm text-text-dark">
                        <CheckCircle2 size={16} className={`flex-shrink-0 mt-0.5 ${isCta ? 'text-cta-hover' : 'text-primary'}`} /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-9">
            <a href="#quote-form" className="inline-block rounded-lg bg-cta hover:bg-cta-hover text-primary font-extrabold text-lg px-9 py-4 shadow-lg transition">
              {funnel.ctaLabel}
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
            {steps.map((step, i) => {
              const Icon = ICONS[step.icon] || ClipboardCheck;
              return (
                <div key={step.title} className="text-center">
                  <div className="relative inline-flex mb-5">
                    <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center">
                      <Icon size={28} className="text-white" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-cta text-primary text-sm font-extrabold flex items-center justify-center ring-4 ring-white">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-primary mb-2">{step.title}</h3>
                  <p className="text-text-muted leading-relaxed text-sm">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── COMPLETED JOBS: real Stellar projects from Trusty ── */}
      <section className="bg-bg-alt py-14 lg:py-18 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-primary text-center mb-3">
            Recent Roofs We&apos;ve Completed
          </h2>
          <p className="text-text-muted text-lg text-center mb-10 max-w-2xl mx-auto">
            Real homes, real crews, right here in Middle Tennessee.
          </p>
          <ProjectGalleryEmbed src={nashville.projectGalleryEmbed} />
          {/* Desktop only: on phones a map grabs touch scrolling. */}
          <div className="hidden md:block mt-10">
            <h3 className="text-2xl font-bold text-primary mb-4 text-center">Where We&apos;ve Been Working</h3>
            <ProjectMapEmbed src={nashville.projectMapEmbed} className="h-[480px]" />
          </div>
        </div>
      </section>

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
        <div className="max-w-5xl mx-auto grid lg:grid-cols-[1fr_460px] gap-10 items-center">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-4 leading-tight">
              {closing.heading}
            </h2>
            <p className="text-white/80 text-lg mb-7">{closing.body}</p>
            <CallLink
              phoneRaw={nashville.phoneRaw}
              funnelSlug={funnel.slug}
              location="closing"
              className="inline-flex items-center gap-2.5 rounded-lg bg-white text-primary font-extrabold text-xl px-8 py-4 hover:bg-white/90 transition shadow-lg"
            >
              <Phone size={22} fill="currentColor" /> {nashville.phone}
            </CallLink>
          </div>
          <FunnelForm
            id="quote-form-bottom"
            funnelSlug={funnel.slug}
            heading={funnel.formHeading}
            submitLabel={funnel.submitLabel}
          />
        </div>
      </section>

      <FunnelFooter offerFinePrint={funnel.finePrint} />
    </>
  );
}
