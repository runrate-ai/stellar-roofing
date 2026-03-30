'use client';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQ({ faqs, heading = "Frequently Asked Questions" }) {
  const [open, setOpen] = useState(null);
  return (
    <section className="py-16 px-4 bg-bg-alt">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-10 text-center">{heading}</h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left font-semibold text-text-dark hover:text-primary transition-colors"
                aria-expanded={open === i}
              >
                <span>{faq.question}</span>
                <ChevronDown size={20} className={`flex-shrink-0 ml-4 transition-transform ${open === i ? 'rotate-180' : ''}`} />
              </button>
              {open === i && (
                <div className="px-6 pb-5 text-text-muted leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
