import { notFound } from 'next/navigation';
import { CheckCircle2, Phone, Clock, ClipboardCheck } from 'lucide-react';
import FunnelHeader from '../../../../components/funnel/FunnelHeader';
import FunnelFooter from '../../../../components/funnel/FunnelFooter';
import ConversionEvent from '../../../../components/funnel/ConversionEvent';
import config from '../../../../lib/config';
import { funnelSlugs, getFunnel } from '../../../../lib/funnels';

const nashville = config.locations.nashville;

export function generateStaticParams() {
  return funnelSlugs.map(slug => ({ slug }));
}

export const dynamicParams = false;

export const metadata = {
  title: 'Request Received | Stellar Roofing & Restorations',
  description: 'Thanks — we received your request and will be in touch within one business day.',
  robots: { index: false, follow: false },
};

export default function FunnelThankYouPage({ params }) {
  const funnel = getFunnel(params.slug);
  if (!funnel) notFound();

  return (
    <>
      {/* Fires generate_lead for GTM. The form lives in a cross-origin iframe,
          so GTM can't observe the submit itself — this page is the conversion
          signal. Point the GHL form's post-submit redirect here. */}
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
          <p className="text-white/85 text-lg leading-relaxed mb-8">
            A member of our Nashville team will reach out within one business day
            to schedule your free inspection.
          </p>
          <a
            href={`tel:${nashville.phoneRaw}`}
            className="inline-flex items-center gap-2.5 rounded-lg bg-white text-primary font-extrabold text-xl px-8 py-4 hover:bg-white/90 transition shadow-lg"
          >
            <Phone size={22} fill="currentColor" /> {nashville.phone}
          </a>
          <p className="text-white/55 text-sm mt-3">
            Need it sooner? Call us directly and we&apos;ll get you on the schedule.
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
              { Icon: Phone, title: 'We Call You', desc: "Within one business day, from a local Nashville number. If we miss you, we'll leave a voicemail and text." },
              { Icon: Clock, title: 'We Book Your Inspection', desc: "Pick a time that works. Most inspections take 30–45 minutes and you don't need to be home for the roof itself." },
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
              Bring it to your appointment and we&apos;ll beat it — with the lifetime
              warranty still included.
            </p>
          </div>
        </div>
      </section>

      <FunnelFooter offerFinePrint={funnel.finePrint} />
    </>
  );
}
