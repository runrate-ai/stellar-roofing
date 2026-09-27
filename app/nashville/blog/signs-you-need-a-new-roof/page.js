import Link from 'next/link';
import BlogPost from '../../../../components/BlogPost';
import { postMetadata, postPath } from '../../../../lib/blog-posts';

const SLUG = 'signs-you-need-a-new-roof';

export const metadata = postMetadata(SLUG);

export default function SignsYouNeedANewRoof() {
  return (
    <BlogPost slug={SLUG} crumb="Signs You Need a New Roof">
      <p>One of the most common questions we hear from Nashville homeowners is, &ldquo;Do I need a whole new roof, or can this be repaired?&rdquo; The honest answer depends on what is actually happening up there.</p>
      <p>Repairs are the right call for isolated problems: a few missing shingles, or a small leak at a pipe boot or flashing. When problems are widespread, or the roof is near the end of its lifespan, replacement usually costs less over time than patching again and again.</p>
      <p>These are the seven signs we see most often on roofs that need replacing, not patching.</p>

      <h2>1. Your Roof Is 20 or More Years Old</h2>
      <p>Architectural shingles often carry 25- or 30-year ratings, but real-world lifespan in Middle Tennessee&rsquo;s heat, humidity, and storms tends to be shorter. <Link href={postPath('how-long-do-asphalt-shingles-last')}>Here is how long asphalt shingles really last</Link>. If your roof is approaching 20 years, start planning even if it looks fine from the street.</p>
      <p>Age alone does not mean you need a new roof tomorrow, but it changes the math on repairs. Putting several thousand dollars into a 22-year-old roof is rarely a good investment.</p>

      <h2>2. Widespread Curling or Cupping</h2>
      <p>Shingles curling up at the edges (cupping) or bowing in the middle (clawing) have lost their integrity. It happens with age and with poor attic ventilation. Once a large share of the roof is curling, you are past the repair window.</p>

      <h2>3. Heavy Granule Loss, Especially in the Gutters</h2>
      <p>The granules on asphalt shingles protect them from UV and weather. Aging shingles shed them, and you will see dark, sand-like buildup in gutters and at downspouts. A little loss is normal on a brand-new roof; steady heavy loss on an older roof means the shingles are wearing out.</p>

      <h2>4. Visible Sagging</h2>
      <p>A sagging roofline is a structural warning, not a cosmetic one. It usually means the decking is wet, rotted, or failing. It will not fix itself, and waiting makes it worse and more expensive. Have it looked at promptly.</p>

      <h2>5. Leaks That Keep Coming Back</h2>
      <p>One leak at a pipe boot is a repair. Repeated leaks in different spots, especially after previous repairs, point to a roof that is failing in several places at once. Patching becomes a temporary fix with diminishing returns.</p>

      <h2>6. Storm Damage from Hail or Wind</h2>
      <p>Nashville sees hail most years, and hail damage is usually not visible from the ground. It shows up as bruised shingles, missing granules, and dents in soft metals like gutters and flashing. If a significant storm hit your neighborhood, get an inspection. Covered storm damage may be paid for by your homeowners insurance; our <Link href={postPath('hail-damage-roof-insurance-claim')}>hail damage insurance claim guide</Link> explains how that works.</p>

      <h2>7. Daylight Through the Roof Boards</h2>
      <p>On a sunny day, look around your attic. If you can see daylight through the roof boards, water can get in through the same gaps. That usually means failing decking, missing shingles, or serious flashing problems.</p>

      <h2>What to Do If You See These Signs</h2>
      <p>The next step is an honest professional inspection. At Stellar Roofing, <Link href="/nashville/services/roof-inspection">roof inspections are free</Link> and come with no pressure. We will tell you what we find, whether repair or replacement makes more sense, and whether storm damage is worth reporting to your insurer. If the roof only needs a repair, we will tell you that too.</p>
      <p>Planning ahead? See <Link href={postPath('how-much-does-roof-replacement-cost-nashville')}>what a roof replacement costs in Nashville</Link>.</p>
    </BlogPost>
  );
}
