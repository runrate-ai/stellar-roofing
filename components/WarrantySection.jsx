import Image from 'next/image';
import Link from 'next/link';

// Stellar's own "Lifetime Workmanship Warranty" badge, drawn in SVG so it stays
// sharp at any size and needs no outside artwork. It is Stellar's promise on its
// installation work. It is NOT a shingle-manufacturer certification or program
// (Stellar holds none), so the badge never uses manufacturer names or marks.
export function WarrantyBadge({ className = '' }) {
  return (
    <svg viewBox="0 0 200 200" className={className} role="img" aria-label="Stellar Roofing lifetime workmanship warranty badge">
      <defs>
        <linearGradient id="wb-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F6DD7B" />
          <stop offset="0.5" stopColor="#C9A227" />
          <stop offset="1" stopColor="#8A6A12" />
        </linearGradient>
        <path id="wb-top" d="M 34 100 A 66 66 0 0 1 166 100" />
        <path id="wb-bottom" d="M 28 100 A 72 72 0 0 0 172 100" />
      </defs>
      <circle cx="100" cy="100" r="96" fill="url(#wb-gold)" />
      <circle cx="100" cy="100" r="90" fill="none" stroke="#7A5C0E" strokeWidth="1.5" />
      <circle cx="100" cy="100" r="58" fill="#0B1547" stroke="#F6DD7B" strokeWidth="3" />
      <text fontSize="17" fontWeight="900" fill="#0B1547" letterSpacing="2.2" textAnchor="middle" fontFamily="Inter, Arial, sans-serif">
        <textPath href="#wb-top" startOffset="50%">WORKMANSHIP</textPath>
      </text>
      <text fontSize="19" fontWeight="900" fill="#0B1547" letterSpacing="4" textAnchor="middle" fontFamily="Inter, Arial, sans-serif">
        <textPath href="#wb-bottom" startOffset="50%" dominantBaseline="hanging">WARRANTY</textPath>
      </text>
      <text x="100" y="100" fontSize="30" fontWeight="900" fill="#F6DD7B" textAnchor="middle" fontFamily="Inter, Arial, sans-serif" letterSpacing="1">LIFE</text>
      <text x="100" y="122" fontSize="20" fontWeight="900" fill="#F6DD7B" textAnchor="middle" fontFamily="Inter, Arial, sans-serif" letterSpacing="3">TIME</text>
      <path d="M100 66 l3.5 8 8.5.8-6.4 5.7 1.9 8.4-7.5-4.4-7.5 4.4 1.9-8.4-6.4-5.7 8.5-.8z" fill="#9DB8FF" transform="translate(0 -14) scale(1) translate(0 0)" />
      <g fill="#0B1547">
        <path d="M24 100 l2.6 5.4 5.9.7-4.3 4.1 1.1 5.8-5.3-2.9-5.3 2.9 1.1-5.8-4.3-4.1 5.9-.7z" transform="translate(4 -8) scale(.85)" />
        <path d="M24 100 l2.6 5.4 5.9.7-4.3 4.1 1.1 5.8-5.3-2.9-5.3 2.9 1.1-5.8-4.3-4.1 5.9-.7z" transform="translate(171 -8) scale(.85)" />
      </g>
    </svg>
  );
}

export default function WarrantySection({ photo = '/images/crew-working-02.jpg', photoAlt = 'Stellar Roofing crew on a roof replacement' }) {
  return (
    <section className="py-20 px-4 bg-white reveal" id="warranty">
      <div className="max-w-6xl mx-auto grid items-center gap-12 lg:grid-cols-2">
        <div className="relative mx-auto w-full max-w-lg pb-10 pr-6">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-xl">
            <Image src={photo} alt={photoAlt} fill className="object-cover" sizes="(min-width: 1024px) 480px, 90vw" />
          </div>
          <WarrantyBadge className="absolute -bottom-2 -right-2 h-40 w-40 drop-shadow-xl sm:h-48 sm:w-48" />
        </div>
        <div>
          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-star">We stand behind our work</p>
          <h2 className="mb-5 text-3xl font-bold leading-tight text-primary md:text-5xl">No-Nonsense Workmanship Warranty</h2>
          <p className="mb-5 text-lg leading-relaxed text-text-muted">
            Every roof replacement we install comes with a lifetime workmanship warranty. It is our promise on the installation itself, from a local company that answers the phone 24/7.
          </p>
          <p className="mb-8 text-lg leading-relaxed text-text-muted">
            Want the details? Ask us to walk you through the coverage during your free inspection, before you decide anything.
          </p>
          <Link href="/free-inspection" className="inline-block rounded-lg bg-star px-8 py-4 text-lg font-extrabold text-white shadow-lg transition hover:bg-star-dark">
            Get My Free Inspection
          </Link>
          <p className="mt-5 max-w-xl text-xs leading-relaxed text-text-muted">
            This is Stellar Roofing &amp; Restorations&rsquo; own workmanship warranty on complete roof replacements. It is separate from any shingle manufacturer&rsquo;s product warranty.
          </p>
        </div>
      </div>
    </section>
  );
}
