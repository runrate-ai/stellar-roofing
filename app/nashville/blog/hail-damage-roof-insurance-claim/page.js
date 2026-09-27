import Link from 'next/link';
import BlogPost from '../../../../components/BlogPost';
import { postMetadata, postPath } from '../../../../lib/blog-posts';

// Merges the two claim drafts (hail-damage-roof-nashville-insurance-claim and
// roof-insurance-claim-process-tennessee). Copy stays on the contractor side of
// TN public-adjuster rules: we document and can attend the adjuster visit; the
// homeowner files and deals with the insurer.
const SLUG = 'hail-damage-roof-insurance-claim';

export const metadata = postMetadata(SLUG);

const faqs = [
  { question: "Does homeowners insurance cover hail damage to a roof in Tennessee?", answer: "Hail is usually a covered peril under standard Tennessee homeowners policies, because it is sudden and accidental. Normal wear and tear and pre-existing damage are not covered. Your deductible, and whether your policy pays replacement cost or actual cash value, determine how much you receive." },
  { question: "Should I call my roofer or my insurance company first?", answer: "Either order works. Many homeowners get a free inspection first so they know whether there is damage worth reporting. Whatever you do, report real damage promptly: most policies require prompt notice and set deadlines for filing." },
  { question: "Can a contractor pay or waive my deductible?", answer: "No. Your deductible is your responsibility under your policy. A contractor who offers to cover or waive it is asking you to misrepresent the claim to your insurer, which can put your coverage at risk." },
  { question: "How long does a roof insurance claim take?", answer: "It varies with how quickly an adjuster can visit and how straightforward the damage is. After a large storm across Middle Tennessee, high claim volume can slow everything down, so it helps to start early." },
];

export default function HailDamageInsuranceClaim() {
  return (
    <BlogPost slug={SLUG} crumb="Hail Damage Insurance Claims" faqs={faqs}>
      <p>Middle Tennessee gets hail every year. After a storm rolls through, most homeowners have two questions: <em>did my roof get damaged,</em> and <em>should I file a claim?</em> This guide covers both, then walks through the claim process step by step in plain language.</p>
      <p className="text-base text-text-muted">This is general information, not legal or insurance advice. Your policy and your insurer have the final word on coverage.</p>

      <h2>What Hail Damage Looks Like on a Roof</h2>
      <p>Hail damage on asphalt shingles is usually not obvious from the ground. You will rarely see holes. What an inspector looks for:</p>
      <ul>
        <li><strong>Random dark spots or bruises</strong> where hail knocked off granules and exposed the asphalt underneath</li>
        <li><strong>Soft spots</strong> that give when pressed, where the shingle mat is fractured</li>
        <li><strong>Dents in soft metals</strong>: gutters, downspouts, flashing, vent caps, and A/C condenser fins, often the easiest clue from ground level</li>
      </ul>
      <p>You cannot reliably judge shingle damage from the ground. It takes getting on the roof and knowing the difference between hail impacts and normal wear. For the size thresholds that matter, see <Link href={postPath('what-size-hail-damages-a-roof')}>what size hail damages a roof</Link>.</p>

      <h2>Does Insurance Cover Hail Damage in Tennessee?</h2>
      <p>Usually, yes. Hail is typically a covered peril under a standard homeowners policy because it is sudden and accidental. Gradual wear and pre-existing damage are not covered. Two parts of your policy decide how much you receive:</p>
      <ul>
        <li><strong>Replacement cost value (RCV) vs. actual cash value (ACV).</strong> RCV pays to replace the roof at today&rsquo;s prices, minus your deductible. ACV subtracts depreciation for the roof&rsquo;s age, so you receive less. Some policies switch older roofs to ACV.</li>
        <li><strong>Your deductible.</strong> Many are a flat amount; some policies use a separate wind/hail deductible calculated as a percentage of your home&rsquo;s insured value, which can be much larger.</li>
      </ul>
      <p>Check your declarations page, or ask your agent, before you need to file.</p>

      <h2>The Roof Insurance Claim Process, Step by Step</h2>

      <h3>Step 1: Stay safe and prevent further damage</h3>
      <p>Take photos of any visible damage and of hail on the ground if you can do so safely. If water is coming in, a temporary tarp to prevent further damage is appropriate. Keep receipts for emergency repairs, and check with your insurer before making permanent repairs.</p>

      <h3>Step 2: Get a professional inspection</h3>
      <p>Stellar Roofing does <Link href="/nashville/services/storm-damage-repair">free storm damage inspections</Link> throughout Nashville and Middle Tennessee. We get on the roof, photograph what we find, and tell you honestly whether there is storm damage. You can have the inspection before or after you contact your insurer; the goal is to know what is actually there.</p>

      <h3>Step 3: Report the claim to your insurer</h3>
      <p>Call your insurance company&rsquo;s claims line or file online. Have your policy number, the date of the storm, and a description of the damage ready. You will get a claim number, and the insurer will schedule an adjuster inspection. Report promptly: most policies require prompt notice of a loss.</p>

      <h3>Step 4: The adjuster inspection</h3>
      <p>The adjuster works for your insurance company and decides what the policy covers. You are welcome to have your roofer there. We can meet your adjuster on-site and show them the damage we documented.</p>

      <h3>Step 5: Review the insurer&rsquo;s estimate</h3>
      <p>After the inspection you will receive a scope of loss: a line-item estimate of what the insurer will pay. Compare it with your contractor&rsquo;s estimate. If you believe something was missed, such as damaged gutters, flashing, or code-required items, raise it with your insurer. Your contractor can give you photos and documentation to support your request.</p>

      <h3>Step 6: Payment</h3>
      <p>With an RCV policy, insurers often pay in two parts: an initial payment for the actual cash value, then the held-back depreciation after the work is completed and documented. If you have a mortgage, your lender may be named on the check, so ask them how they handle endorsement.</p>

      <h3>Step 7: The work gets done</h3>
      <p>Once the claim is approved, schedule the repair or replacement. When it is complete, send your insurer proof of completion to release any held-back depreciation. You pay your deductible; insurance pays the rest up to your policy terms.</p>

      <h2>What to Avoid</h2>
      <ul>
        <li><strong>Deductible &ldquo;deals.&rdquo;</strong> A contractor who offers to waive, absorb, or rebate your deductible is asking you to misrepresent your claim. Walk away.</li>
        <li><strong>Signing on the spot.</strong> Be careful with door-to-door crews that appear right after a storm, especially from out of state. Some are gone before warranty problems show up.</li>
        <li><strong>Waiting too long.</strong> Hail damage gets harder to tie to a specific storm as time passes, and policies set filing deadlines.</li>
      </ul>
      <p>For more on vetting a roofer, read <Link href={postPath('how-to-choose-a-roofing-contractor')}>how to choose a roofing contractor</Link>.</p>

      <h2>Hail Hit Your Neighborhood?</h2>
      <p>We will inspect your roof for free, document any damage, and tell you honestly whether it is worth reporting. If you file, we can meet your adjuster on-site and handle the repair or replacement once your claim is approved.</p>
    </BlogPost>
  );
}
