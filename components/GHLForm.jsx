'use client';
import { useEffect, useRef, useState } from 'react';

const FORM_ID = 'mHSFUVTxnTIL4A5clPEi';
const FORM_SRC = `https://link.runratedigital.com/widget/form/${FORM_ID}`;
const SCRIPT_SRC = 'https://link.runratedigital.com/js/form_embed.js';

export default function GHLForm({ title = 'Get Your Free Estimate' }) {
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
    if (document.querySelector(`script[src="${SCRIPT_SRC}"]`)) return;
    const script = document.createElement('script');
    script.src = SCRIPT_SRC;
    script.async = true;
    document.body.appendChild(script);
  }, [visible]);

  return (
    <div ref={ref} className="bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-bg-alt">
      <h3 className="text-3xl font-bold text-primary mb-3">{title}</h3>
      <p className="text-text-muted text-lg mb-8">Fill out the form below and we'll get back to you within 1 business day.</p>

      <div style={{ minHeight: '600px' }}>
        {visible && (
          <iframe
            src={FORM_SRC}
            style={{ width: '100%', height: '100%', minHeight: '600px', border: 'none', borderRadius: '10px' }}
            id={`inline-${FORM_ID}`}
            data-layout="{'id':'INLINE'}"
            data-trigger-type="alwaysShow"
            data-trigger-value=""
            data-activation-type="alwaysActivated"
            data-activation-value=""
            data-deactivation-type="neverDeactivate"
            data-deactivation-value=""
            data-form-name="Website Form"
            data-height="581"
            data-layout-iframe-id={`inline-${FORM_ID}`}
            data-form-id={FORM_ID}
            title="Website Form"
          />
        )}
      </div>

      <div className="mt-6 pt-6 border-t border-bg-alt text-center">
        <p className="text-sm text-text-muted italic">
          Your information is 100% secure. We only use it to provide your estimate.
        </p>
      </div>
    </div>
  );
}
