import Link from 'next/link';
import BlogPost from '../../../../components/BlogPost';
import { postMetadata, postPath } from '../../../../lib/blog-posts';

const SLUG = 'how-to-choose-a-roofing-contractor';

export const metadata = postMetadata(SLUG);

export default function ChooseARoofer() {
  return (
    <BlogPost slug={SLUG} crumb="How to Choose a Roofing Contractor">
      <p>Hiring a roofer in Middle Tennessee is harder than it should be. There are a lot of contractors, and after a major storm, crews from out of state arrive by the truckload. A bad hire can mean poor workmanship, a roof that fails early, and nobody to call when it does.</p>
      <p>Here is what to look for, and what to avoid.</p>

      <h2>5 Things a Legitimate Roofing Contractor Should Have</h2>

      <h3>1. The right Tennessee license</h3>
      <p>In Tennessee, contractors generally need a state contractor&rsquo;s license for projects of $25,000 or more, and some counties also require a home improvement license for smaller residential jobs. You can look up a license on the Tennessee Department of Commerce &amp; Insurance website. A contractor who will not give you their license information when asked is a red flag.</p>

      <h3>2. Liability insurance and workers&rsquo; comp</h3>
      <p>Ask for a certificate of insurance. Liability coverage protects you if the crew damages your home, and workers&rsquo; compensation matters if someone is hurt on your property.</p>

      <h3>3. A real local presence</h3>
      <p>Ask a simple question: &ldquo;If I have a problem with this roof in three years, how do I reach you?&rdquo; A local phone number and a history of work in the area matter more than a temporary storm-season address.</p>

      <h3>4. Reviews you can verify</h3>
      <p>Look at Google reviews, not only testimonials on the company&rsquo;s own website. Look for reviews that mention specific neighborhoods, projects, or people by name, spread out over time.</p>

      <h3>5. A written, itemized estimate</h3>
      <p>You should get a written estimate that spells out the materials by brand and product line, the scope of work, payment terms, and warranty details. A verbal quote or a single number on a business card is not enough for a project this size. See <Link href={postPath('how-much-does-roof-replacement-cost-nashville')}>what goes into roof replacement cost</Link> for what a good estimate covers.</p>

      <h2>Red Flags</h2>
      <ul>
        <li><strong>Pressure to sign immediately after a storm.</strong> Especially from door-to-door crews that just arrived in town.</li>
        <li><strong>Full payment upfront.</strong> A reasonable deposit is normal. Paying everything before work starts is not.</li>
        <li><strong>Offers to &ldquo;waive&rdquo; or cover your deductible.</strong> Your deductible is your responsibility under your policy, and a contractor offering to hide it is asking you to misrepresent your claim.</li>
        <li><strong>No written contract.</strong> &ldquo;We can start today, no paperwork&rdquo; protects the contractor, not you.</li>
        <li><strong>Vague answers about materials or warranty.</strong> You should know exactly what is going on your roof and what happens if something goes wrong.</li>
      </ul>

      <h2>Questions to Ask Before You Hire</h2>
      <ul>
        <li>How long have you been working in the Nashville area?</li>
        <li>Can I see your license and insurance certificate?</li>
        <li>Will your own crew do the work, or subcontractors?</li>
        <li>Which shingle brand and product line are you quoting?</li>
        <li>What does your workmanship warranty cover, and for how long?</li>
        <li>How do you handle rotted decking if you find it?</li>
        <li>Can you give me references from homeowners nearby?</li>
      </ul>

      <h2>About Stellar Roofing &amp; Restorations</h2>
      <p>We are a local Middle Tennessee roofing company, licensed and insured, and we have been in business since 2020. We give free inspections and written estimates, and every roof replacement we complete comes with a lifetime workmanship warranty. Ask us any of the questions above; we are happy to answer them.</p>
      <p>Dealing with storm damage? Read our <Link href={postPath('hail-damage-roof-insurance-claim')}>guide to hail damage insurance claims</Link> before you sign anything.</p>
    </BlogPost>
  );
}
