import Link from 'next/link';
import { Phone, CheckCircle, Clock, Shield } from 'lucide-react';
import ConversionEvent from '../../components/funnel/ConversionEvent';
import BookingEmbed from '../../components/funnel/BookingEmbed';
import config from '../../lib/config';

export const metadata = {
  title: { absolute: 'Thank You | Stellar Roofing & Restorations' },
  description: "Thanks for requesting a free roof inspection. We'll be in touch to schedule it.",
  robots: { index: false },
};

// Main-site leads land here after the form hands the lead to GHL, so this
// page is the website's conversion signal (generate_lead, lead_source
// "website"). ?market=boise shows the Boise branch's number.
export default function ThankYouPage({ searchParams }) {
  const market = searchParams?.market === 'boise' ? 'boise' : 'nashville';
  const location = config.locations[market];

  return (
    <main className="min-h-screen bg-bg-alt flex items-center justify-center px-4 pt-32 pb-20">
      <ConversionEvent slug={`website-${market}`} adGroup="Website" />
      <div className="max-w-2xl w-full text-center">

        <div className="flex justify-center mb-6">
          <CheckCircle size={72} className="text-green-500" />
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-4">
          You&apos;re All Set!
        </h1>
        <p className="text-xl text-text-muted mb-10 leading-relaxed">
          Thanks for reaching out to Stellar Roofing &amp; Restorations. We received your request
          for a free roof inspection{location.bookingWidget
            ? '. Pick a time below to book it now, or we\'ll reach out to schedule it.'
            : ` and our ${location.city} team will reach out soon to schedule it.`}
        </p>

        {/* Only Nashville has a booking calendar; Boise leads get a call back. */}
        {location.bookingWidget && (
          <div className="mb-12 text-left">
            <h2 className="text-2xl md:text-3xl font-extrabold text-primary text-center mb-2">Book Your Free Inspection</h2>
            <p className="text-text-muted text-center mb-6">Use the same name and phone number you just entered.</p>
            <div className="rounded-2xl overflow-hidden shadow-md bg-white">
              <BookingEmbed src={location.bookingWidget} />
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            { Icon: Clock, title: location.bookingWidget ? 'Pick a Time' : 'We Reach Out', desc: location.bookingWidget ? "Book above, or we'll contact you to set a time if you skip it." : "We'll contact you to set a time that works for your free inspection." },
            { Icon: Shield, title: 'No Pressure', desc: 'Your inspection is 100% free with no obligation to buy anything.' },
            { Icon: CheckCircle, title: 'What to Expect', desc: 'We get on the roof, photograph what we find, and give you an honest assessment.' },
          ].map(({ Icon, title, desc }) => (
            <div key={title} className="bg-white rounded-2xl p-6 shadow-md">
              <Icon size={32} className="text-primary mx-auto mb-3" />
              <h2 className="font-bold text-primary text-lg mb-2">{title}</h2>
              <p className="text-text-muted text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <p className="text-text-muted mb-4">Need to reach us sooner?{market === 'nashville' ? ' We answer 24/7.' : ''}</p>
        <a
          href={`tel:${location.phoneRaw}`}
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary-light text-white font-bold px-8 py-4 rounded-lg shadow-lg transition-colors text-lg mb-8"
        >
          <Phone size={20} />
          Call {location.phone}
        </a>

        <div className="mt-4">
          <Link href={`/${market}`} className="text-primary font-semibold hover:underline">
            ← Back to {location.city}
          </Link>
        </div>

      </div>
    </main>
  );
}
