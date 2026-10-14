'use client';
import { useState } from 'react';
import { Play } from 'lucide-react';
import { pushDataLayer } from './funnel/tracking';

// Click-to-play YouTube embed. Nothing from YouTube loads until the visitor
// taps play (only the thumbnail image), so it doesn't cost page speed or the
// ad landing-page score. Uses the privacy-enhanced youtube-nocookie domain.
const VIDEO_ID = 'ajLg0usGdBU';

export default function PromoVideo({ location = 'page', funnelSlug, title = 'Stellar Roofing & Restorations promotional video', className = '' }) {
  const [playing, setPlaying] = useState(false);

  const start = () => {
    setPlaying(true);
    pushDataLayer('promo_video_play', { click_location: location, funnel_slug: funnelSlug || null });
  };

  return (
    <div className={`relative w-full overflow-hidden rounded-2xl bg-black shadow-lg ring-1 ring-slate-200 ${className}`} style={{ aspectRatio: '16 / 9' }}>
      {playing ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={start}
          aria-label={`Play video: ${title}`}
          className="group absolute inset-0 h-full w-full"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://i.ytimg.com/vi/${VIDEO_ID}/maxresdefault.jpg`}
            alt=""
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <span className="absolute inset-0 bg-black/25 transition-colors group-hover:bg-black/15" />
          <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-primary shadow-xl sm:h-20 sm:w-20">
            <Play size={30} fill="currentColor" className="ml-1" />
          </span>
        </button>
      )}
    </div>
  );
}
