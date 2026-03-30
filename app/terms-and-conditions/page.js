import Breadcrumbs from '../../components/Breadcrumbs';
import config from '../../lib/config';

export const metadata = {
  title: "Terms & Conditions | Stellar Roofing & Restorations",
  description: "Terms and conditions for Stellar Roofing & Restorations roofing services in Nashville, TN.",
  alternates: { canonical: 'https://thestellarroofing.com/terms-and-conditions' },
};

export default function TermsAndConditionsPage() {
  return (
    <>
      <Breadcrumbs items={[
        { name: "Home", path: "/" },
        { name: "Terms & Conditions", path: "/terms-and-conditions" },
      ]} />

      {/* HERO */}
      <section className="bg-primary py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Terms &amp; Conditions</h1>
          <p className="text-white/80 text-xl">Last updated: March 2025</p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">

          <h2 className="text-2xl font-bold text-primary mb-4">Agreement to Terms</h2>
          <p className="text-text-muted leading-relaxed mb-8">
            By accessing or using the website at <strong>thestellarroofing.com</strong> or engaging Stellar Roofing &amp; Restorations ("Company," "we," "our," or "us") for roofing services, you agree to be bound by these Terms &amp; Conditions. If you do not agree, please do not use our website or services.
          </p>

          <h2 className="text-2xl font-bold text-primary mb-4">Services</h2>
          <p className="text-text-muted leading-relaxed mb-4">
            Stellar Roofing &amp; Restorations provides residential and commercial roofing services including, but not limited to, roof replacement, roof repair, storm damage repair, roof inspection, and emergency roof repair in Nashville, TN and the surrounding Middle Tennessee area.
          </p>
          <p className="text-text-muted leading-relaxed mb-8">
            All services are subject to a written estimate or contract agreed upon by both parties prior to work commencing. We reserve the right to decline any project at our discretion.
          </p>

          <h2 className="text-2xl font-bold text-primary mb-4">Estimates &amp; Pricing</h2>
          <ul className="list-disc pl-6 space-y-2 text-text-muted mb-8">
            <li>All estimates provided are valid for 30 days from the date of issuance unless otherwise stated in writing.</li>
            <li>Estimates are based on visible and accessible conditions at the time of inspection. Additional costs may arise if hidden damage, structural issues, or code compliance requirements are discovered during the project.</li>
            <li>Any scope changes or additional work must be approved in writing by the customer before proceeding.</li>
            <li>Final invoices reflect the actual work completed and materials used, which may differ from the original estimate if scope changes occur.</li>
          </ul>

          <h2 className="text-2xl font-bold text-primary mb-4">Payment Terms</h2>
          <ul className="list-disc pl-6 space-y-2 text-text-muted mb-8">
            <li>Payment terms will be outlined in the project contract or invoice.</li>
            <li>A deposit may be required prior to scheduling or ordering materials.</li>
            <li>Final payment is due upon completion of work and customer approval.</li>
            <li>We accept cash, check, and major credit cards. Financing options may be available — ask for details.</li>
            <li>Unpaid balances may be subject to a late fee and collection proceedings.</li>
          </ul>

          <h2 className="text-2xl font-bold text-primary mb-4">Insurance Claims</h2>
          <p className="text-text-muted leading-relaxed mb-8">
            We assist homeowners with insurance claims for storm damage and other covered roofing events. However, the final determination of coverage is made solely by the insurance carrier. We make no guarantee that an insurance claim will be approved or that any specific amount will be paid by the insurer. The customer remains responsible for any amounts not covered by insurance.
          </p>

          <h2 className="text-2xl font-bold text-primary mb-4">Warranty</h2>
          <p className="text-text-muted leading-relaxed mb-4">
            We offer a workmanship warranty on installations. Specific warranty terms will be outlined in your project contract. Please note:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-text-muted mb-8">
            <li>Manufacturer product warranties are separate from our workmanship warranty and are governed by the manufacturer's terms.</li>
            <li>Warranties are void if damage results from improper maintenance, acts of nature (such as hail or wind beyond the product's rated resistance), or modifications made by anyone other than Stellar Roofing &amp; Restorations.</li>
            <li>Warranty service requires that all invoices are paid in full.</li>
          </ul>

          <h2 className="text-2xl font-bold text-primary mb-4">Scheduling &amp; Access</h2>
          <p className="text-text-muted leading-relaxed mb-8">
            Customer agrees to provide reasonable access to the property for inspections and project work. We will make reasonable efforts to complete work as scheduled, but timelines may be affected by weather, material availability, or other factors beyond our control. We are not liable for delays caused by such circumstances.
          </p>

          <h2 className="text-2xl font-bold text-primary mb-4">Customer Responsibilities</h2>
          <ul className="list-disc pl-6 space-y-2 text-text-muted mb-8">
            <li>Customers are responsible for removing vehicles, lawn furniture, and other movable items from the work area prior to the project start date.</li>
            <li>Customers should notify us of any known hazards on or around the property (e.g., buried utilities, solar panels, fragile structures).</li>
            <li>Customers are responsible for securing pets and ensuring the safety of children during project work.</li>
          </ul>

          <h2 className="text-2xl font-bold text-primary mb-4">Limitation of Liability</h2>
          <p className="text-text-muted leading-relaxed mb-8">
            To the fullest extent permitted by law, Stellar Roofing &amp; Restorations shall not be liable for any indirect, incidental, special, or consequential damages arising out of or related to our services or your use of our website. Our total liability shall not exceed the amount paid by you for the specific service giving rise to the claim.
          </p>

          <h2 className="text-2xl font-bold text-primary mb-4">Website Use</h2>
          <p className="text-text-muted leading-relaxed mb-8">
            The content on this website is provided for general informational purposes only. We make no warranties regarding the accuracy, completeness, or suitability of the information. You may not use our website in any way that violates applicable laws, infringes on third-party rights, or could damage, overburden, or impair our systems.
          </p>

          <h2 className="text-2xl font-bold text-primary mb-4">Governing Law</h2>
          <p className="text-text-muted leading-relaxed mb-8">
            These Terms &amp; Conditions are governed by and construed in accordance with the laws of the State of Tennessee, without regard to its conflict of law provisions. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts located in Davidson County, Tennessee.
          </p>

          <h2 className="text-2xl font-bold text-primary mb-4">Changes to These Terms</h2>
          <p className="text-text-muted leading-relaxed mb-8">
            We reserve the right to update these Terms &amp; Conditions at any time. Changes will be posted on this page with an updated date. Continued use of our website or services after changes are posted constitutes your acceptance of the revised terms.
          </p>

          <h2 className="text-2xl font-bold text-primary mb-4">Contact Us</h2>
          <p className="text-text-muted leading-relaxed mb-2">
            If you have questions about these Terms &amp; Conditions, please contact us:
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
