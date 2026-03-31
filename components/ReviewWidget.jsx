'use client';
import { useEffect } from 'react';

export default function ReviewWidget() {
  useEffect(() => {
    if (document.querySelector('script[src="https://reputationhub.site/reputation/assets/review-widget.js"]')) return;
    const script = document.createElement('script');
    script.src = 'https://reputationhub.site/reputation/assets/review-widget.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="w-full" style={{ minHeight: '400px' }}>
      <iframe
        className="lc_reviews_widget"
        src="https://reputationhub.site/reputation/widgets/review_widget/5Tm0puTu21j1uly45lB0"
        style={{ minWidth: '100%', width: '100%', minHeight: '400px', border: 'none', overflow: 'hidden' }}
      />
    </div>
  );
}
