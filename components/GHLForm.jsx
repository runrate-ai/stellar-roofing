'use client';
import { useState, useEffect } from 'react';
import config from '../lib/config';

export default function GHLForm({ type = 'quote', title = 'Get Your Free Estimate' }) {
  const [loading, setLoading] = useState(true);
  
  const ids = {
    quote: config.ghl.quoteFormId,
    contact: config.ghl.contactFormId,
  };
  
  const formId = ids[type] || ids.quote;
  const isPlaceholder = !formId || formId === 'REPLACE_WITH_GHL_FORM_ID' || formId === 'REPLACE_WITH_GHL_CONTACT_FORM_ID';

  useEffect(() => {
    if (!isPlaceholder) {
      const timer = setTimeout(() => setLoading(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [isPlaceholder]);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-bg-alt relative overflow-hidden">
      <h3 className="text-3xl font-bold text-primary mb-3">{title}</h3>
      <p className="text-text-muted text-lg mb-8">Fill out the form below and we'll get back to you within 1 business day.</p>
      
      <div className="min-h-[500px] relative bg-bg-alt rounded-xl flex items-center justify-center">
        {isPlaceholder ? (
          <div className="text-center p-8 max-w-sm">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-primary text-2xl font-bold">!</span>
            </div>
            <p className="text-primary font-bold text-xl mb-3">Form Coming Soon</p>
            <p className="text-text-muted mb-8 leading-relaxed">We're currently updating our online booking system. Please call us directly for an immediate estimate.</p>
            <a 
              href={`tel:${config.business.phoneRaw}`} 
              className="block w-full bg-primary text-white font-bold px-8 py-4 rounded-xl hover:bg-primary-light transition-all shadow-lg hover:shadow-primary/20"
            >
              Call {config.business.phone}
            </a>
          </div>
        ) : (
          <>
            {loading && (
              <div className="absolute inset-0 z-10 bg-bg-alt flex flex-col items-center justify-center">
                <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4"></div>
                <p className="text-primary font-semibold animate-pulse">Loading secure form...</p>
              </div>
            )}
            <iframe
              src={`https://link.msgsndr.com/widget/form/${formId}`}
              style={{ width: '100%', height: '100%', minHeight: '500px', border: 'none' }}
              id={`inline-${formId}`}
              data-layout="{'id':'INLINE'}"
              data-trigger-type="alwaysShow"
              data-trigger-value=""
              data-activation-type="alwaysActivated"
              data-activation-value=""
              data-deactivation-type="neverDeactivate"
              data-deactivation-value=""
              data-form-name="Form"
              data-height="500"
              data-layout-iframe-id={`inline-${formId}`}
              data-form-id={formId}
              title="Stellar Roofing Request Form"
              onLoad={() => setLoading(false)}
            />
          </>
        )}
      </div>
      
      <div className="mt-8 pt-6 border-t border-bg-alt text-center">
        <p className="text-sm text-text-muted italic">
          Your information is 100% secure. We only use it to provide your estimate.
        </p>
      </div>
    </div>
  );
}
