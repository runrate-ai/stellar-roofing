import { notFound } from 'next/navigation';
import { CheckCircle2, Phone, Clock, ClipboardCheck, ArrowRight } from 'lucide-react';
import FunnelHeader from '../../../../components/funnel/FunnelHeader';
import FunnelFooter from '../../../../components/funnel/FunnelFooter';
import ConversionEvent from '../../../../components/funnel/ConversionEvent';
import BookingEmbed from '../../../../components/funnel/BookingEmbed';
import config from '../../../../lib/config';
import { funnelSlugs, getFunnel } from '../../../../lib/funnels';

const nashville = config.locations.nashville;

export function generateStaticParams() {
  return funnelSlugs.map(slug => ({ slug }));
}

export const dynamicParams = false;

export const metadata = {
  // `absolute` opts out of the root layout's "%s | Stellar Roofing &
  // Restorations" template, which would otherwise append the brand a second
  // time to a title that already carries it.
  title: { absolute: 'Request Received | Stellar Roofing & Restorations' },
  description: 'Thanks, we received your request. Pick a time for your free roof inspection.',
  robots: { index: false, follow: false },
};

export default function FunnelThankYouPage({ params }) {
  const funnel = getFunnel(params.slug);
  if (!funnel) notFound();

  return (
    <>
      {/* Fires generate_lead for GTM. The funnel form sends visitors here only
          after GHL accepts the lead, so this page is the conversion signal. */}
      <ConversionEvent slug={funnel.slug} adGroup={funnel.adGroup} />

      <FunnelHeader />

      <section className="bg-primary py-16 lg:py-24 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex w-20 h-20 rounded-full bg-cta items-center justify-center mb-6">
            <CheckCircle2 size={40} className="text-primary" />
          </div>
          <h1 className="text-3xl lg:text-4xl font-extrabold text-white mb-4">
            You&apos;re All Set — We Got Your Request
          </h1>
          <p className="text-white/85 text-lg leading-relaxed">
            Skip the phone tag: pick a time for your free inspection below.
            Prefer to talk? Call {nashville.phone}, we answer 24/7.
          </p>
        </div>
      </section>

      <section id="book" className="bg-bg-alt py-10 lg:py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl lg:text-3xl font-extrabold text-primary text-center mb-2">
            Book Your Free Inspection
          </h2>
          <p className="text-text-muted text-center mb-6">
            Choose a day and time that works for you. Use the same name and phone
            number you just entered.
          </p>
          <div className="rounded-2xl overflow-hidden shadow-sm bg-white">
            <BookingEmbed src={nashville.bookingWidget} />
          </div>
          <p className="text-text-muted text-sm text-center mt-5">
            Not sure what time works?{' '}
            <a href={`tel:${nashville.phoneRaw}`} className="font-bold text-primary underline">
              Call {nashville.phone}
            </a>{' '}
            and we&apos;ll set it up with you.
          </p>
        </div>
      </section>

      <section className="bg-white py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl lg:text-3xl font-extrabold text-primary text-center mb-10">
            What Happens Next
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { Icon: Clock, title: 'You Pick a Time', desc: 'Book it above, or we call you to set it up if you skip this step.' },
              { Icon: Phone, title: 'We Inspect the Roof', desc: 'We get on the roof and photograph everything we find.' },
              { Icon: ClipboardCheck, title: 'You Get Your Estimate', desc: 'Photos of what we found and a clear written price — no pressure to sign anything.' },
            ].map(({ Icon, title, desc }) => (
              <div key={title} className="text-center">
                <div className="inline-flex w-14 h-14 rounded-2xl bg-primary items-center justify-center mb-4">
                  <Icon size={26} className="text-white" />
                </div>
                <h3 className="font-bold text-primary mb-2">{title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-2xl bg-bg-alt p-7 max-w-2xl mx-auto text-center">
            <h3 className="font-bold text-primary mb-1.5">Bring your other quotes</h3>
            <p className="text-text-muted text-sm leading-relaxed">
              Have a comparable written estimate from another licensed contractor?
              Bring it to your appointment and we&apos;ll match it, apples to apples,
              with the lifetime warranty still included.
            </p>
          </div>

          {/* Safe to link out only here: the lead is already captured, so this
              is no longer an exit that costs a conversion. */}
          <div className="mt-10 pt-8 border-t border-slate-100 text-center">
            <p className="text-text-muted mb-4">
              While you wait — see more of our work and service areas.
            </p>
            <a
              href={config.business.website}
              className="inline-flex items-center gap-2 rounded-lg border-2 border-primary text-primary font-bold px-7 py-3.5 hover:bg-primary hover:text-white transition-colors"
            >
              Visit Our Website <ArrowRight size={17} />
            </a>
          </div>
        </div>
      </section>

      <FunnelFooter offerFinePrint={funnel.finePrint} />
    </>
  );
}
