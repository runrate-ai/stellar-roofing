'use client';
import { useEffect, useRef, useState } from 'react';

export default function ReviewWidget() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { rootMargin: '200px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    if (document.querySelector('script[src="https://reputationhub.site/reputation/assets/review-widget.js"]')) return;
    const script = document.createElement('script');
    script.src = 'https://reputationhub.site/reputation/assets/review-widget.js';
    script.async = true;
    document.body.appendChild(script);
  }, [visible]);

  return (
    <div ref={ref} className="w-full" style={{ minHeight: '400px' }}>
      {visible && (
        <iframe
          className="lc_reviews_widget"
          src="https://reputationhub.site/reputation/widgets/review_widget/5Tm0puTu21j1uly45lB0"
          style={{ minWidth: '100%', width: '100%', minHeight: '400px', border: 'none', overflow: 'hidden' }}
        />
      )}
    </div>
  );
}
