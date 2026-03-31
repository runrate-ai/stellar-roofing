import Link from 'next/link';
import { Phone, CheckCircle, Clock, Shield } from 'lucide-react';
import config from '../../lib/config';

export const metadata = {
  title: "Thank You | Stellar Roofing & Restorations",
  description: "Thanks for requesting a free roof inspection. We'll be in touch within 1 business day.",
  robots: { index: false },
};

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-bg-alt flex items-center justify-center px-4 py-20">
      <div className="max-w-2xl w-full text-center">

        <div className="flex justify-center mb-6">
          <CheckCircle size={72} className="text-green-500" />
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-4">
          You're All Set!
        </h1>
        <p className="text-xl text-text-muted mb-10 leading-relaxed">
          Thanks for reaching out to Stellar Roofing &amp; Restorations. We received your request for a free roof inspection and will be in touch within <strong>1 business day</strong>.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            { Icon: Clock, title: "Fast Response", desc: "We'll call or text you within 1 business day to schedule your inspection." },
            { Icon: Shield, title: "No Pressure", desc: "Your inspection is 100% free with no obligation to buy anything." },
            { Icon: CheckCircle, title: "What to Expect", desc: "A certified inspector will assess your roof and give you an honest report." },
          ].map(({ Icon, title, desc }) => (
            <div key={title} className="bg-white rounded-2xl p-6 shadow-md">
              <Icon size={32} className="text-primary mx-auto mb-3" />
              <h3 className="font-bold text-primary text-lg mb-2">{title}</h3>
              <p className="text-text-muted text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <p className="text-text-muted mb-4">Need to reach us sooner?</p>
        <a
          href={`tel:${config.business.phoneRaw}`}
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary-light text-white font-bold px-8 py-4 rounded-lg shadow-lg transition-colors text-lg mb-8"
        >
          <Phone size={20} />
          Call {config.business.phone}
        </a>

        <div className="mt-4">
          <Link href="/" className="text-primary font-semibold hover:underline">
            ← Back to Home
          </Link>
        </div>

      </div>
    </main>
  );
}
