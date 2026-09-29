# Blog Config

## Site

- **Name:** Stellar Roofing & Restorations
- **Domain:** https://www.thestellarroofing.com (blog at `/nashville/blog`)
- **Owner / author:** Stellar Roofing & Restorations (posts are published under the company, not a named person)
- **What the site is (1–2 sentences):** The website of a residential and commercial roofing contractor based at 110 Space Park N, Goodlettsville, TN, serving Nashville and Middle Tennessee since 2020. The blog answers homeowners' roofing questions and sends them to a free inspection.
- **Niche:** Local roofing contractor (Nashville / Middle Tennessee ONLY; never Boise or Idaho)

## Audience

Homeowners in Nashville and Middle Tennessee (Davidson, Sumner, Williamson, Rutherford, Wilson, Montgomery counties), plus some small commercial property owners and managers. Most readers are not roofing experts. They are dealing with a specific moment: a leak, storm or hail damage, an aging roof, an insurance claim, or comparing quotes. They want straight answers, real price ranges, and to know whether they can trust a roofer. Many are reading on a phone.

## Voice & tone

Clean, professional, and trustworthy: "the roofer your neighbor recommends." Plain language, short paragraphs, practical. Honest about trade-offs, and willing to say "you may only need a repair." Speak as the company ("we", "our crews") when describing what Stellar does; otherwise talk directly to the reader ("you"). No hype and no scare tactics. The brand has a light space theme ("Out of This World Roofing") but keep it out of blog copy.

## Banned phrases

- "Out of this world" or any space puns
- "Look no further", "one-stop shop", "second to none", "top-notch", "state-of-the-art"
- "Don't call your insurance company first" or anything telling readers to delay or avoid contacting their insurer
- "We handle your claim", "we negotiate with your insurer", "we file supplements for you" (Tennessee public-adjuster rules)
- "Certified", "Preferred", "Master Elite", "Platinum", "authorized", "partner" in connection with Owens Corning or GAF
- "Waive your deductible" or "we cover your deductible" as an offer
- Any year stamp in a title ("2025", "2026")
- "Financing", "0%", "same-as-cash", "$0 down" (financing is not confirmed)

## Word count

900–1,500 words

## Categories (use exactly one per post)

- Cost & Pricing
- Roof Replacement
- Roof Repair
- Storm Damage
- Materials
- Roof Lifespan
- Hiring a Contractor
- Commercial Roofing

## Internal links

Use the exact paths below. Link 2–4 times per post, where they naturally fit.

- `/nashville` — Nashville homepage; use for "our Nashville roofing team" style mentions
- `/nashville/services/roof-replacement` — replacement service page
- `/nashville/services/roof-repair` — repair service page (high priority: link from any repair-related post)
- `/nashville/services/storm-damage-repair` — hail, wind, storm, insurance claims
- `/nashville/services/roof-inspection` — free inspection service page
- `/nashville/services/commercial-roofing` — commercial roofs
- `/nashville/services/emergency-roof-repair` — active leaks, urgent damage (Stellar answers 24/7)
- `/free-inspection` — the conversion page; the main CTA target
- `/nashville/service-areas/<city>` — city pages: nashville, murfreesboro, clarksville, franklin, brentwood, hendersonville, goodlettsville, gallatin, smyrna, spring-hill, mount-juliet, lebanon
- Existing blog posts, at `/nashville/blog/<slug>`:
  - how-much-does-roof-replacement-cost-nashville (cost)
  - metal-roof-vs-shingles-cost (metal vs shingles)
  - how-long-does-roof-replacement-take (timeline)
  - how-long-do-asphalt-shingles-last (lifespan)
  - signs-you-need-a-new-roof (repair vs replace signs)
  - hail-damage-roof-insurance-claim (hail + insurance claim process)
  - what-size-hail-damages-a-roof (hail size chart)
  - how-to-choose-a-roofing-contractor (hiring, red flags)

## Call to action

A free, no-pressure roof inspection and written estimate. Point to `/free-inspection` or the phone number (629) 277-4249. For leaks or storm damage, mention that Stellar answers the phone 24 hours a day, 7 days a week. The shared post layout already adds a CTA banner and related guides, so the body only needs one natural closing CTA paragraph.

## Research focus

- Real price ranges for Middle Tennessee, framed as ranges and never as quotes. **Site-wide numbers that must not be contradicted:** roof replacement $15,000–$30,000 for most homes; metal roofing typically $8,000–$15,000 more than architectural shingles on the same home; most roof repairs $500–$2,500, with the per-repair ranges listed on `app/nashville/services/roof-repair/page.js` (read that file and match it).
- Middle Tennessee weather: hail and wind seasons (spring and fall), heat and humidity, freeze-thaw, the March 2020 Nashville tornado for context.
- Tennessee specifics: contractor licensing (state license for jobs of $25,000+; some counties require a home improvement license), insurance basics (RCV vs. ACV, wind/hail percentage deductibles).
- Manufacturer product facts for Owens Corning and GAF: shingle lines, wind ratings, impact ratings, and standard warranties, from the manufacturers' own pages.
- What competitors' pages already say, so posts add something they don't.

## Fact-check notes

- Never claim a manufacturer certification or program warranty for Stellar. Stellar installs Owens Corning and GAF shingles (GAF often on lower-cost jobs) but is NOT an Owens Corning Preferred/Platinum contractor or a GAF certified contractor, and does not install CertainTeed.
- When Owens Corning is featured, include this line once near the end: "Stellar Roofing & Restorations is an independent contractor and is not an affiliate of Owens Corning Roofing and Asphalt, LLC or its affiliated companies." Mention OC and GAF as plain text only.
- Stellar's confirmed claims (safe to use): free inspections and written estimates; lifetime workmanship warranty on roof replacements; licensed and insured; residential and commercial; in business since 2020; based in Goodlettsville; documents storm damage with photos and can meet the insurance adjuster on-site; answers the phone 24/7.
- Unconfirmed, do NOT state: crew sizes, start times, scheduling lead times, response-time promises, financing, owner-led jobs, samples at every estimate, specific past jobs, or customer quotes.
- Insurance content is general information, not legal or insurance advice. Say so once. Coverage depends on the policy.
- Prices must be ranges tied to "most homes" or "typically", with the factors that move them.
- Never invent reviews, testimonials, statistics, or quotes.

## Credibility focus

Insider credibility here means local roofing knowledge, not personal stories:
- Middle Tennessee specifics: how storm seasons, humidity, tree cover, and older neighborhoods affect roofs; what Nashville-area homeowners commonly run into.
- Real numbers with the factors that move them, and worked examples ("on a typical 2,000 sq ft two-story...").
- Common mistakes homeowners make and honest limits ("this is where a repair stops making sense").
- The trade-offs a contractor would actually explain at the kitchen table.

No first-person anecdotes, invented job stories, or customer quotes. There are no approved real stories yet.

## Author bio

None. Posts are attributed to Stellar Roofing & Restorations. Do not add a bio or byline paragraph.

## Existing posts

- Post pages: `app/nashville/blog/*/page.js`
- Post index and metadata: `lib/blog-posts.js` (the `blogPosts` array)
- Also check `KEYWORD-AUDIT.md` for keyword targets and cannibalization notes, so a new post doesn't compete with an existing post or service page.

## Output

Two files per post:

1. **Path:** `app/nashville/blog/[slug]/page.js`
2. **Also:** add one entry to the `blogPosts` array in `lib/blog-posts.js`, and add the new slug to the `related` list of 1–2 existing posts where it fits.

- **Body format:** JSX (React server component), wrapped in the shared `BlogPost` component.
- **JSX rules:**
  - Allowed elements: `<p>`, `<h2>`, `<h3>`, `<ul>`, `<ol>`, `<li>`, `<strong>`, `<em>`; tables wrapped in `<div className="table-wrap"><table>…</table></div>`; one optional summary box as `<p className="callout">`.
  - Internal links use `<Link href="...">` (no className). Blog links use `postPath('<slug>')`.
  - Escape apostrophes and quotes as `&rsquo;` `&ldquo;` `&rdquo;`, and dashes as `&ndash;`.
  - No `<h1>` (the layout renders the title), no inline styles, no images, no CTA banner (the layout adds one).
  - FAQs are optional: 3–4 short Q&A in a `faqs` array passed to `BlogPost`. They are rendered and added to FAQ schema automatically.
- **Template:**

```js
import Link from 'next/link';
import BlogPost from '../../../../components/BlogPost';
import { postMetadata, postPath } from '../../../../lib/blog-posts';

const SLUG = '[slug]';

export const metadata = postMetadata(SLUG);

const faqs = [
  { question: "[question]", answer: "[plain-text answer, no JSX]" },
];

export default function [PascalCaseName]() {
  return (
    <BlogPost slug={SLUG} crumb="[short breadcrumb label]" faqs={faqs}>
      <p className="callout"><strong>Quick answer:</strong> [one-paragraph answer]</p>
      <p>[intro]</p>

      <h2>[section]</h2>
      <p>[body with <Link href="/nashville/services/roof-repair">internal links</Link>]</p>
    </BlogPost>
  );
}
```

`lib/blog-posts.js` entry:

```js
{
  slug: '[slug]',
  title: '[H1 title, no year]',
  metaTitle: '[<= 60 chars] | Stellar Roofing',
  description: '[meta description, 140-160 chars]',
  excerpt: '[1-2 sentence card excerpt]',
  primaryKeyword: '[primary keyword]',
  category: '[one category from the list above]',
  readTime: '[N] min read',
  datePublished: '[YYYY-MM-DD, today]',
  relatedService: '[roof-replacement | roof-repair | storm-damage-repair | roof-inspection | commercial-roofing | emergency-roof-repair]',
  related: ['[existing-slug]', '[existing-slug]', '[existing-slug]'],
},
```

## Secondary output (optional)

None.

## After saving

Run `npm run build` to confirm the post compiles, then tell the user the local URL (`npm run dev` → `http://localhost:3000/nashville/blog/[slug]`). Do not commit or push. When the user says **PUBLISH IT**, commit the new files and push `main`; Vercel deploys automatically and the sitemap picks up the new post.

If a build hangs silently at "Creating an optimized production build", check for iCloud-offloaded files (`find . -flags +dataless | wc -l`); `rm -rf node_modules .next && npm ci` fixes it.
