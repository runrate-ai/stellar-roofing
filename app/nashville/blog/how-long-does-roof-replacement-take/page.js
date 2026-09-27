import Link from 'next/link';
import BlogPost from '../../../../components/BlogPost';
import { postMetadata, postPath } from '../../../../lib/blog-posts';

const SLUG = 'how-long-does-roof-replacement-take';

export const metadata = postMetadata(SLUG);

export default function RoofReplacementTimeline() {
  return (
    <BlogPost slug={SLUG} crumb="Roof Replacement Timeline">
      <p className="callout"><strong>Short answer:</strong> most residential roof replacements take <strong>one to two days</strong>. Many standard homes are finished in a single day; larger or more complex roofs can take two to three.</p>
      <p>Several things can stretch that timeline, and it helps to know what they are so you can plan around installation day.</p>

      <h2>What a Typical Roof Replacement Day Looks Like</h2>
      <ol>
        <li><strong>Setup and protection.</strong> Tarps over landscaping, protection for the driveway, and staging for materials.</li>
        <li><strong>Tear-off.</strong> The old shingles and underlayment come off down to the decking.</li>
        <li><strong>Decking inspection and repairs.</strong> With the decking exposed, the crew checks for soft spots and rot and replaces damaged boards before anything new goes down.</li>
        <li><strong>Underlayment.</strong> Synthetic underlayment goes on the bare decking, with ice and water shield in valleys and other vulnerable areas.</li>
        <li><strong>Shingles.</strong> New shingles go on from the eaves up.</li>
        <li><strong>Ridge, flashing, and details.</strong> Ridge cap, pipe boots, vents, and flashing are completed.</li>
        <li><strong>Cleanup.</strong> Old materials are hauled off and the yard and driveway get a magnetic nail sweep.</li>
        <li><strong>Final walkthrough.</strong> We walk the job with you before we leave.</li>
      </ol>

      <h2>What Makes a Roof Replacement Take Longer?</h2>

      <h3>Size and complexity</h3>
      <p>Large homes, steep roofs, and roofs with many valleys, dormers, skylights, and penetrations take more time. These jobs often run two days or more.</p>

      <h3>Two layers of old shingles</h3>
      <p>If there are already two layers on the roof, both have to come off before the new roof goes on. That roughly doubles tear-off time and disposal.</p>

      <h3>Decking repairs</h3>
      <p>Nobody knows how much decking needs replacing until the old roof is off. Extensive rot can add hours and sometimes turns a one-day job into two.</p>

      <h3>Weather</h3>
      <p>Roofing is not done in rain or high wind. If weather moves in mid-job, exposed areas are covered and work resumes when conditions allow. This is most likely during Nashville&rsquo;s spring and fall storm seasons.</p>

      <h2>How Soon Can the Work Be Scheduled?</h2>
      <p>Scheduling depends on the season and on material availability. Standard shingle colors are usually easy to get; specialty colors or premium lines can take longer to arrive. After a major storm, demand across Middle Tennessee spikes, so it pays to get on the schedule early. Ask for the current timeline when you get your estimate.</p>

      <h2>Do I Need to Be Home?</h2>
      <p>Not for the whole day. It helps to have someone available at the start to answer questions, and at the end for the final walkthrough. If that is not possible, let us know and we will work around your schedule.</p>

      <h2>Planning Your Replacement</h2>
      <p>If you are still working out whether you need a new roof, start with <Link href={postPath('signs-you-need-a-new-roof')}>the seven signs you need a new roof</Link>. For budgeting, see <Link href={postPath('how-much-does-roof-replacement-cost-nashville')}>how much a roof replacement costs in Nashville</Link>. When you are ready, a free inspection is the first step.</p>
    </BlogPost>
  );
}
