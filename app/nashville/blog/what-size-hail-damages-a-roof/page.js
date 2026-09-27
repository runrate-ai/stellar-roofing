import Link from 'next/link';
import BlogPost from '../../../../components/BlogPost';
import { postMetadata, postPath } from '../../../../lib/blog-posts';

const SLUG = 'what-size-hail-damages-a-roof';

export const metadata = postMetadata(SLUG);

export default function HailSize() {
  return (
    <BlogPost slug={SLUG} crumb="What Size Hail Damages a Roof">
      <p>Every time a storm moves through Middle Tennessee, homeowners ask the same thing: was that hail big enough to damage my roof? The answer depends on a few variables, but here is a clear way to think about it.</p>
      <p className="callout"><strong>Rule of thumb:</strong> hail around <strong>1 inch</strong> (quarter-sized) and larger is where damage to asphalt shingles becomes likely, especially on older roofs. Smaller hail can still dent gutters and other soft metals.</p>

      <h2>Hail Size Chart for Roof Damage</h2>
      <div className="table-wrap">
        <table>
          <thead>
            <tr><th>Size</th><th>Looks like</th><th>Likely effect on an asphalt roof</th></tr>
          </thead>
          <tbody>
            <tr><td>&frac14; inch</td><td>Pea</td><td>Unlikely to damage shingles</td></tr>
            <tr><td>&frac12; inch</td><td>Marble</td><td>Low risk for healthy shingles; may mark soft metals</td></tr>
            <tr><td>&frac34; inch</td><td>Penny</td><td>Low to moderate; worth checking on older roofs</td></tr>
            <tr><td>1 inch</td><td>Quarter</td><td>Damage becomes likely, especially on older shingles</td></tr>
            <tr><td>1&frac12; inches</td><td>Ping-pong ball</td><td>High risk; get an inspection</td></tr>
            <tr><td>1&frac34; inches</td><td>Golf ball</td><td>Very high risk; assume damage until inspected</td></tr>
            <tr><td>2+ inches</td><td>Egg or larger</td><td>Severe; inspect as soon as it is safe</td></tr>
          </tbody>
        </table>
      </div>

      <h2>Why Hail Size Is Not the Whole Story</h2>
      <ul>
        <li><strong>Age and condition of your shingles.</strong> A 20-year-old roof is far more vulnerable to 1-inch hail than a 5-year-old one.</li>
        <li><strong>How much hail fell, and for how long.</strong> A brief burst over part of a neighborhood is different from a long, dense storm.</li>
        <li><strong>Wind.</strong> Wind-driven hail hits at an angle and often does more damage to one side of the house.</li>
        <li><strong>Shingle type.</strong> Class 4 impact-resistant shingles are built to withstand hail that would damage standard shingles.</li>
      </ul>
      <p>Reported hail sizes are usually the largest stones observed, and different parts of a storm drop different sizes. Damage also adds up: several moderate storms on an aging roof can do as much harm as one big one.</p>

      <h2>How to Tell If Your Roof Was Hit</h2>
      <p>From the ground, check:</p>
      <ul>
        <li>Gutters and downspouts for dents</li>
        <li>A/C condenser fins, vent caps, and other soft metals</li>
        <li>Dings on cars or outdoor furniture that were outside during the storm</li>
        <li>Unusual amounts of granules in gutters or at downspout outlets</li>
      </ul>
      <p>What you cannot judge from the ground is the shingles themselves. Hail bruising on asphalt shingles takes getting on the roof and knowing what to look for, and we do not recommend homeowners climb up to check.</p>

      <h2>When to Call a Roofer</h2>
      <p>If your area had hail around an inch or larger, or you see dents in soft metals around the house, get an inspection. Stellar Roofing offers <Link href="/nashville/services/storm-damage-repair">free storm damage inspections</Link> and will tell you honestly whether there is damage. Many insurance policies set deadlines for reporting a loss, so checking early keeps your options open.</p>
      <p>If there is damage, our <Link href={postPath('hail-damage-roof-insurance-claim')}>hail damage insurance claim guide</Link> walks through what happens next.</p>
    </BlogPost>
  );
}
