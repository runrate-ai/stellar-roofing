import Breadcrumbs from '../../components/Breadcrumbs';
import config from '../../lib/config';

export const metadata = {
  title: "Privacy Policy | Stellar Roofing & Restorations",
  description: "Privacy policy for Stellar Roofing & Restorations. Learn how we collect, use, and protect your personal information.",
  alternates: { canonical: 'https://thestellarroofing.com/privacy-policy' },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Breadcrumbs items={[
        { name: "Home", path: "/" },
        { name: "Privacy Policy", path: "/privacy-policy" },
      ]} />

      {/* HERO */}
      <section className="bg-primary py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Privacy Policy</h1>
          <p className="text-white/80 text-xl">Last updated: March 2025</p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto prose prose-slate">

          <h2 className="text-2xl font-bold text-primary mb-4">Introduction</h2>
          <p className="text-text-muted leading-relaxed mb-6">
            Stellar Roofing &amp; Restorations ("we," "our," or "us") respects your privacy and is committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website at <strong>thestellarroofing.com</strong> or contact us for roofing services.
          </p>
          <p className="text-text-muted leading-relaxed mb-8">
            Please read this policy carefully. If you disagree with its terms, please discontinue use of our site.
          </p>

          <h2 className="text-2xl font-bold text-primary mb-4">Information We Collect</h2>
          <p className="text-text-muted leading-relaxed mb-4">We may collect the following types of information:</p>
          <ul className="list-disc pl-6 space-y-2 text-text-muted mb-6">
            <li><strong>Contact Information</strong> — Name, phone number, email address, and service address when you submit a form requesting a quote, inspection, or contact.</li>
            <li><strong>Project Details</strong> — Information about your roofing needs, property type, and the nature of any damage or work requested.</li>
            <li><strong>Communications</strong> — Records of emails, calls, or messages you send us.</li>
            <li><strong>Usage Data</strong> — Browser type, IP address, pages visited, and time spent on our site, collected automatically through cookies and analytics tools.</li>
          </ul>

          <h2 className="text-2xl font-bold text-primary mb-4">How We Collect Information</h2>
          <ul className="list-disc pl-6 space-y-2 text-text-muted mb-8">
            <li><strong>Contact &amp; Quote Forms</strong> — When you submit a form on our website, your information is collected and processed through <strong>GoHighLevel (GHL)</strong>, our customer relationship management (CRM) platform.</li>
            <li><strong>Cookies</strong> — Our website uses cookies to track site usage and improve your experience. You may disable cookies in your browser settings, though some features may not function properly.</li>
            <li><strong>Analytics</strong> — We may use third-party analytics tools (such as Google Analytics) to understand how visitors use our site.</li>
            <li><strong>Phone Calls</strong> — If you call us directly, we may keep records of the call for service and quality purposes.</li>
          </ul>

          <h2 className="text-2xl font-bold text-primary mb-4">How We Use Your Information</h2>
          <p className="text-text-muted leading-relaxed mb-4">We use the information we collect to:</p>
          <ul className="list-disc pl-6 space-y-2 text-text-muted mb-8">
            <li>Respond to your inquiries and schedule estimates or inspections</li>
            <li>Provide roofing services and manage your project</li>
            <li>Send appointment reminders, follow-ups, and relevant service information</li>
            <li>Improve our website, services, and customer experience</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2 className="text-2xl font-bold text-primary mb-4">GoHighLevel (CRM) &amp; Third-Party Tools</h2>
          <p className="text-text-muted leading-relaxed mb-8">
            We use <strong>GoHighLevel</strong> as our CRM and marketing automation platform. When you submit a form or interact with our communications, your data may be stored and managed within GoHighLevel. GoHighLevel has its own privacy practices — please refer to their privacy policy at <strong>gohighlevel.com</strong> for details. We do not sell your personal information to third parties. We may share your information with service providers (such as our CRM) solely to provide services to you.
          </p>

          <h2 className="text-2xl font-bold text-primary mb-4">Cookies</h2>
          <p className="text-text-muted leading-relaxed mb-8">
            Our site uses cookies — small data files stored on your device — to improve site functionality and analyze traffic. By continuing to use our site, you consent to our use of cookies. You can control cookies through your browser settings at any time.
          </p>

          <h2 className="text-2xl font-bold text-primary mb-4">Data Retention</h2>
          <p className="text-text-muted leading-relaxed mb-8">
            We retain your personal information for as long as necessary to provide services, comply with legal requirements, and resolve disputes. If you would like your information removed from our systems, please contact us at the information below.
          </p>

          <h2 className="text-2xl font-bold text-primary mb-4">Your Rights</h2>
          <p className="text-text-muted leading-relaxed mb-4">You have the right to:</p>
          <ul className="list-disc pl-6 space-y-2 text-text-muted mb-8">
            <li>Request access to the personal information we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your personal information (subject to legal obligations)</li>
            <li>Opt out of marketing communications at any time</li>
          </ul>

          <h2 className="text-2xl font-bold text-primary mb-4">Children's Privacy</h2>
          <p className="text-text-muted leading-relaxed mb-8">
            Our website is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe we have inadvertently collected such information, please contact us immediately.
          </p>

          <h2 className="text-2xl font-bold text-primary mb-4">Changes to This Policy</h2>
          <p className="text-text-muted leading-relaxed mb-8">
            We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated date. We encourage you to review this page periodically.
          </p>

          <h2 className="text-2xl font-bold text-primary mb-4">Contact Us</h2>
          <p className="text-text-muted leading-relaxed mb-2">
            If you have questions about this Privacy Policy or wish to exercise your rights, please contact us:
          </p>
          <p className="text-text-muted leading-relaxed">
            <strong>{config.business.name}</strong><br />
            Nashville, TN<br />
            Phone: <a href={`tel:${config.business.phoneRaw}`} className="text-primary hover:text-primary-light underline">{config.business.phone}</a><br />
            Email: <a href={`mailto:${config.business.email}`} className="text-primary hover:text-primary-light underline">{config.business.email}</a>
          </p>

        </div>
      </section>
    </>
  );
}
