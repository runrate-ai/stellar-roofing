import Link from 'next/link';
import { Phone, Mail, Clock, MapPin } from 'lucide-react';
import Breadcrumbs from '../../components/Breadcrumbs';
import GHLForm from '../../components/GHLForm';
import SchemaMarkup from '../../components/SchemaMarkup';
import { localBusinessSchema } from '../../lib/schema';
import config from '../../lib/config';

export const metadata = {
  title: "Contact Stellar Roofing | Nashville TN | Free Estimates",
  description: "Contact Stellar Roofing & Restorations in Nashville, TN. Call (629) 277-4249 or fill out our form for a free roof estimate. Serving Nashville and Middle Tennessee.",
  alternates: { canonical: 'https://thestellarroofing.com/contact' },
};

export default function ContactPage() {
  const lbSchema = localBusinessSchema();

  return (
    <>
      <SchemaMarkup schema={lbSchema} />

      <Breadcrumbs items={[
        { name: "Home", path: "/" },
        { name: "Contact", path: "/contact" },
      ]} />

      {/* HERO */}
      <section className="bg-primary py-14 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Contact Stellar Roofing &amp; Restorations</h1>
          <p className="text-white/80 text-xl">We're here to help. Call, email, or fill out the form below.</p>
        </div>
      </section>

      {/* CONTACT CONTENT */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8">Get in Touch</h2>

              {/* BIG PHONE */}
              <div className="bg-bg-alt rounded-2xl p-6 mb-6">
                <p className="text-text-muted text-sm font-medium uppercase tracking-wider mb-2">Call or Text</p>
                <a href={`tel:${config.business.phoneRaw}`} className="flex items-center gap-3 text-primary hover:text-primary transition-colors">
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="text-white" size={22} />
                  </div>
                  <span className="text-3xl font-extrabold">{config.business.phone}</span>
                </a>
              </div>

              {/* EMAIL */}
              <div className="bg-bg-alt rounded-2xl p-6 mb-6">
                <p className="text-text-muted text-sm font-medium uppercase tracking-wider mb-2">Email Us</p>
                <a href={`mailto:${config.business.email}`} className="flex items-center gap-3 text-primary hover:text-primary transition-colors">
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="text-white" size={22} />
                  </div>
                  <span className="text-lg font-semibold">{config.business.email}</span>
                </a>
              </div>

              {/* HOURS */}
              <div className="bg-bg-alt rounded-2xl p-6 mb-6">
                <p className="text-text-muted text-sm font-medium uppercase tracking-wider mb-3">Business Hours</p>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Clock className="text-primary" size={18} />
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex gap-6">
                      <span className="font-medium text-text-dark w-28">Mon – Fri</span>
                      <span className="text-text-muted">{config.business.hours.weekdays}</span>
                    </div>
                    <div className="flex gap-6">
                      <span className="font-medium text-text-dark w-28">Saturday</span>
                      <span className="text-text-muted">{config.business.hours.saturday}</span>
                    </div>
                    <div className="flex gap-6">
                      <span className="font-medium text-text-dark w-28">Sunday</span>
                      <span className="text-text-muted">{config.business.hours.sunday}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* SERVICE AREA */}
              <div className="bg-bg-alt rounded-2xl p-6 mb-6">
                <p className="text-text-muted text-sm font-medium uppercase tracking-wider mb-3">Service Area</p>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="text-primary" size={18} />
                  </div>
                  <div>
                    <p className="font-semibold text-text-dark">Nashville &amp; Middle Tennessee</p>
                    <p className="text-text-muted text-sm mt-1">
                      Serving Nashville, Murfreesboro, Clarksville, Franklin, Brentwood, Hendersonville, Gallatin, Smyrna, Spring Hill, Mount Juliet, Lebanon, and surrounding areas.
                    </p>
                  </div>
                </div>
              </div>

              {/* MAP PLACEHOLDER */}
              <div className="h-56 bg-slate-200 rounded-2xl flex items-center justify-center text-slate-500 text-sm">
                [Google Map — Nashville, TN]
                {/* TODO: Replace with Google Maps embed */}
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <GHLForm type="contact" title="Send Us a Message" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
