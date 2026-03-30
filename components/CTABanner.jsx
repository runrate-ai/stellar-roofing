import Link from 'next/link';
import { Phone } from 'lucide-react';
import config from '../lib/config';

export default function CTABanner({
  heading = "Ready for a Free Roof Inspection?",
  subtext = "Our team will inspect your roof at no cost and give you an honest assessment.",
  ctaText = "Schedule Free Inspection",
  ctaHref = "/free-inspection",
}) {
  return (
    <section className="bg-primary py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{heading}</h2>
        <p className="text-white/80 text-lg mb-8">{subtext}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href={ctaHref} className="bg-white hover:bg-white/90 text-primary font-bold px-8 py-4 rounded-lg transition-colors text-lg">
            {ctaText}
          </Link>
          <a href={`tel:${config.business.phoneRaw}`} className="flex items-center gap-2 border-2 border-white text-white hover:bg-white hover:text-primary font-semibold px-8 py-4 rounded-lg transition-colors text-lg">
            <Phone size={20} />
            {config.business.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
