export default function GHLForm({ type = 'quote', title = 'Get Your Free Estimate' }) {
  const ids = {
    quote: 'ghl-quote-form',
    contact: 'ghl-contact-form',
    inspection: 'ghl-inspection-form',
  };
  const id = ids[type] || ids.quote;
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h3 className="text-2xl font-bold text-primary mb-2">{title}</h3>
      <p className="text-text-muted mb-6">Fill out the form below and we'll get back to you within 1 business day.</p>
      {/* GHL-FORM: Quote/Contact/Inspection Form */}
      <div id={id}>
        {/* REPLACE WITH GHL FORM EMBED SCRIPT */}
        <div className="space-y-4">
          <p className="text-sm text-text-muted italic">Form loading... Please call us at <a href="tel:6292774249" className="text-primary font-semibold hover:text-primary">(629) 277-4249</a> if you need immediate assistance.</p>
        </div>
      </div>
    </div>
  );
}
