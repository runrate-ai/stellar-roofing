import Link from 'next/link';
import BlogPost from '../../../../components/BlogPost';
import { postMetadata, postPath } from '../../../../lib/blog-posts';

// In-depth repair cost guide. Per-repair ranges match app/nashville/services/roof-repair/page.js;
// the service page stays the short conversion page for "roof repair nashville tn".
const SLUG = 'how-much-does-roof-repair-cost';

export const metadata = postMetadata(SLUG);

const faqs = [
  { question: "How much does it cost to fix a roof leak?", answer: "A leak diagnosis and minor repair typically runs $300 to $700 in Nashville and Middle Tennessee. Part of that cost is finding the source, since water often runs along the decking and rafters before it drips. If the leak has rotted the decking, that wood has to come out before new shingles go on, which pushes the job higher." },
  { question: "How much does it cost to replace a few missing shingles?", answer: "Replacing one to five shingles typically costs $250 to $600. The shingles cost a few dollars each; most of a small bill is getting a crew, ladders, and safety gear onto the roof. A steep pitch, a two-story home, brittle older shingles, or hard-to-match colors push the price higher." },
  { question: "Does homeowners insurance pay for roof repair?", answer: "Policies generally cover sudden, accidental damage such as wind tearing off shingles, hail, or a fallen tree limb, but not wear and tear or an aging roof. Your deductible still applies, and a percentage wind/hail deductible can be more than most repairs cost. Coverage depends on your policy, so check it or ask your agent. This is general information, not insurance advice." },
  { question: "Do I need a permit to repair my roof in Nashville?", answer: "For single-family homes, Metro Codes does not require a permit for routine roofing work. Replacing more than 64 square feet of roof decking does require a building permit. Rules differ outside Davidson County, so check locally." },
];

export default function RoofRepairCostGuide() {
  return (
    <BlogPost slug={SLUG} crumb="Roof Repair Cost" faqs={faqs}>
      <p className="callout"><strong>Quick answer:</strong> Most roof repairs in Nashville and Middle Tennessee cost between $500 and $2,500. A simple fix, like a cracked pipe boot, can come in below that. Flashing work, rotted decking, or damage in several spots pushes a job toward the top.</p>

      <p>The water stain on your ceiling usually isn&rsquo;t under the hole in your roof. Water runs along the decking and down the rafters before it drips, sometimes several feet from where it got in. So part of what you pay for is finding the problem, not just fixing it.</p>

      <h2>Roof repair cost at a glance</h2>
      <p>These are the typical ranges for our <Link href="/nashville/services/roof-repair">roof repair in Nashville</Link> and the surrounding counties. They&rsquo;re estimates, not quotes. Your final cost depends on roof pitch, access, and materials, and we give you a free written estimate before any work begins.</p>

      <div className="table-wrap">
        <table>
          <thead>
            <tr><th>Repair</th><th>Typical range</th><th>What pushes it higher</th></tr>
          </thead>
          <tbody>
            <tr><td>Minor shingle repair (1&ndash;5 shingles)</td><td>$250 &ndash; $600</td><td>Steep pitch, two stories, brittle older shingles, hard-to-match colors</td></tr>
            <tr><td>Leak diagnosis &amp; minor repair</td><td>$300 &ndash; $700</td><td>A hard-to-trace source, water-damaged decking</td></tr>
            <tr><td>Pipe boot replacement</td><td>$150 &ndash; $350</td><td>Several boots, steep or high roof sections</td></tr>
            <tr><td>Flashing repair or replacement</td><td>$400 &ndash; $900</td><td>New step or counter flashing instead of resealing</td></tr>
            <tr><td>Valley repair</td><td>$600 &ndash; $1,500</td><td>Long valleys, debris damage, worn shingles on both sides</td></tr>
            <tr><td>Larger section repair</td><td>$1,000 &ndash; $2,500</td><td>Storm damage across a section, decking replacement</td></tr>
          </tbody>
        </table>
      </div>

      <p>For context, national cost guides put the average roof repair at around $1,100 to $1,200, and Angi reports that most homeowners pay roughly $400 to $2,000. Our range lines up with those.</p>

      <h2>What each common repair involves</h2>

      <h3>Roof leak repair cost</h3>
      <p>A leak diagnosis and minor repair typically runs $300 to $700, and the diagnosis matters as much as the patch. Ever had a leak &ldquo;come back&rdquo; a month after someone fixed it? A cheap patch over the wrong spot is a common reason.</p>
      <p>If water has soaked the decking for a while, the rotted wood has to come out before new shingles go on. Water coming through the ceiling right now? Go straight to <Link href="/nashville/services/emergency-roof-repair">emergency roof repair</Link>. We answer the phone 24 hours a day, 7 days a week.</p>

      <h3>Missing shingles repair</h3>
      <p>Replacing one to five shingles typically costs $250 to $600. Spring and fall storms in Middle Tennessee lift and tear shingles off every year, so this is one of the most common repairs homeowners need.</p>
      <p>So why doesn&rsquo;t a &ldquo;$50 repair&rdquo; cost $50? Shingles cost a few dollars each. Getting a crew, ladders, and safety gear onto your roof takes the same effort for one shingle or five, and on small jobs that setup is most of the bill. It&rsquo;s also why bundling small fixes into one visit pays off.</p>

      <h3>Pipe boot replacement</h3>
      <p>A pipe boot replacement typically costs $150 to $350, the cheapest fix on the list. The rubber collar around your plumbing vents dries out and cracks after years of Tennessee sun and summer heat. Cracked boots are a common cause of leaks, so catch them before water reaches the decking. Roof cement smeared over a split boot usually buys you a season. It isn&rsquo;t a fix.</p>

      <h3>Roof flashing repair</h3>
      <p>Flashing repair or replacement typically runs $400 to $900. Flashing is the metal that seals the joints around chimneys, skylights, walls, and dormers. Resealing sits at the low end, and replacing bent or rusted step or counter flashing sits at the high end. Comparing quotes? Check which one each roofer is proposing. Large or brick-heavy chimneys are usually priced after an inspection, since the masonry work varies so much.</p>

      <h3>Valley repair</h3>
      <p>Valley repair typically costs $600 to $1,500. Valleys collect runoff from two slopes, so they carry more water than almost any other part of your roof. In older Nashville neighborhoods with heavy tree cover, leaves and pine needles pile up in them, hold moisture through humid summers, and wear the shingles out faster.</p>

      <h3>Larger section repair</h3>
      <p>A larger section repair typically runs $1,000 to $2,500. That covers storm damage across part of a slope, or a repair where soft decking turns up underneath and needs replacing.</p>

      <h2>What moves the price within the range</h2>
      <p>Two roofs with the &ldquo;same&rdquo; problem can land at opposite ends of a range. Here&rsquo;s what decides it:</p>
      <ul>
        <li><strong>Pitch and height.</strong> A steep two-story roof takes more safety setup and more time than a low ranch roof.</li>
        <li><strong>Access.</strong> Fences, landscaping, and steep lots slow down ladders and material handling.</li>
        <li><strong>Number of damaged areas.</strong> Three small problems cost more than one.</li>
        <li><strong>Hidden decking rot.</strong> You can&rsquo;t see it until the shingles come off, and it&rsquo;s one of the most common reasons a repair moves up.</li>
        <li><strong>Matching.</strong> Weathered or discontinued shingles rarely match exactly. A roofer may blend, borrow shingles from a less visible slope, or suggest redoing a full roof plane. Expect a new patch to look a shade off for a while.</li>
        <li><strong>Urgency.</strong> After-hours work and the rush after a big storm can add cost.</li>
      </ul>

      <p><strong>Worked example (hypothetical).</strong> Take a typical 2,000 sq ft two-story home with a steep roof. A cracked pipe boot plus a small patch of water-stained decking would likely fall in the leak diagnosis &amp; minor repair range. Leave that same leak through a summer of storms, though, and the rot can spread far enough to push the job into the larger section repair range.</p>

      <p><strong>Permits in Metro Nashville.</strong> For single-family homes, Metro Codes doesn&rsquo;t require a permit for routine roofing work, including a new layer or replacing more than a third of the roof. Replacing more than 64 square feet of roof decking does require a building permit. Rules differ outside Davidson County, so check locally.</p>

      <p><strong>Licensing on small jobs.</strong> Tennessee requires a home improvement license in Davidson and Rutherford counties (among others) for residential projects from $3,000 to $24,999, and a state contractor license for projects of $25,000 and up. Most repairs come in under $3,000, below both thresholds. Ask any roofer for proof of insurance anyway, even on a $400 job.</p>

      <h2>Does insurance pay for roof repair?</h2>
      <p>Homeowners policies generally cover sudden, accidental damage: wind tearing off shingles, hail, a fallen tree limb. They generally don&rsquo;t cover wear and tear or an aging roof. Your deductible still applies, and whether your policy pays replacement cost (RCV) or actual cash value (ACV) changes the payout. This is general information, not insurance advice, and coverage depends on your policy.</p>
      <p>Deductibles trip up a lot of people. Some policies, including some written in Tennessee, use a separate wind and hail deductible set as a percentage of your dwelling coverage instead of a flat dollar amount. Say your home carries $350,000 in dwelling coverage with a 1% wind/hail deductible. That&rsquo;s a $3,500 deductible, more than most repairs in the $500 to $2,500 range. In that case, you&rsquo;ll usually pay for a small storm repair out of pocket.</p>
      <p>Check your policy or ask your agent what applies to you. If the damage looks bigger than a repair, our <Link href="/nashville/services/storm-damage-repair">storm damage repair</Link> team documents it with photos and can meet your adjuster on-site. Our guide to <Link href={postPath('hail-damage-roof-insurance-claim')}>filing a hail damage roof insurance claim</Link> walks through the process.</p>

      <h2>When repair money stops making sense</h2>
      <p>A repair is usually the right call when the damage is isolated, the roof is under 15 to 20 years old, or one storm hit an otherwise sound roof. You may only need a repair, and we&rsquo;ll tell you when that&rsquo;s the case.</p>
      <p>Things change as a roof ages. On shingles 18 to 20+ years old, lifting brittle tabs to slide in new ones can crack the shingles next to them, so one repair can start the next. Matching gets harder, too. Putting several thousand dollars into a 20+ year old roof, or paying for a new leak every season, starts working against you.</p>
      <p>Replacement generally makes more sense when more than 30% of the shingles are damaged, the damage is widespread, the decking is compromised, or leaks keep coming back. Most full replacements run $15,000 to $30,000. Our <Link href={postPath('how-much-does-roof-replacement-cost-nashville')}>roof replacement cost guide</Link> breaks down what drives that number, and <Link href={postPath('signs-you-need-a-new-roof')}>signs you need a new roof</Link> covers what to look for.</p>

      <h2>Get a real number for your roof</h2>
      <p>Ranges help you plan, but only someone on your roof can tell you where your repair lands. We offer a <Link href="/free-inspection">free, no-pressure roof inspection</Link> with a written estimate. Call (629) 277-4249. For active leaks or storm damage, we answer 24 hours a day, 7 days a week.</p>
    </BlogPost>
  );
}
