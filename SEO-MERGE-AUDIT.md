# Merge Audit: Updated.stellar-seo-pages → stellar-roofing

Step 1 of the organic SEO plan. Audited 2026-09-26 against `main` @ f02f560.
Source: `../Updated.stellar-seo-pages/` (10 blog posts, blog index, /pricing, /reviews, /service-areas/brentwood) and its SEO-EXPANSION-BRIEF.md.

Status: **steps 1–3 done** (step 3 built locally 2026-09-27, not committed/deployed) (step 2 → `KEYWORD-AUDIT.md`). OpenSEO project "Stellar Roofing" (id fefa6b78-083c-4175-a73f-5ecd6a06bf7a) holds the context. Goal + positioning sections are still empty until questions 1, 2, 4, 5 are answered. Step 3 waits on approval of the keyword changes.

Note: `SEO-Strategy` is a tracked notes **file**, not a folder. It holds 2 target keywords ("roof replacement Nashville", "roofing company Nashville TN") and "focus on storm damage content in spring". Converting it into a folder (keeping those notes as `SEO-Strategy/README.md`) needs Brandon's OK. Move this file into that folder afterward.

## Sitewide issues (bigger than the new pages)

1. **Canonical/sitemap host mismatch.** Live site serves `www.thestellarroofing.com`; apex 307-redirects to www. But `config.business.website`, every canonical, `sitemap.xml`, and `robots.txt` use the apex. Fix: pick one host, make the redirect 308/301 in Vercel, set `config.business.website` to match.
2. **Boise is indexed.** 17 Boise URLs in the sitemap; homepage `<title>` is "Nashville TN & Boise ID"; navbar/footer show the Boise phone and location. Undecided whether to noindex/remove while Boise is not live.
3. **Dead route files.** `app/service-areas/*` and `app/services/*` are 301-redirected to `/nashville/...` in `next.config.js`, so those files never serve.

## Blockers if merged as the brief says

- `reviews/page.jsx:58` has a TypeScript annotation → build fails (project is JS).
- `/service-areas/brentwood` is 301-redirected → port the draft's content into `app/nashville/service-areas/brentwood/page.js` instead of copying the file.
- `prose` classes on all posts do nothing: `@tailwindcss/typography` is not installed. Add the plugin or style by hand.
- Every draft wraps content in `<main>`; the layout already provides `<main>`, so the landmarks nest.
- `blog/page.jsx` exports `blogPosts`; move it to `lib/blog-posts.js`.
- Broken links: `/financing`, `/service-areas`, `/service-areas/spring-hill`, `/service-areas/nolensville`. Links to `/services/*` go through a 301; point them at `/nashville/services/*`.
- No canonical, Open Graph, JSON-LD (Article/FAQ/Breadcrumb), or `<Breadcrumbs>` on any draft (SITE-BRIEF requires them).
- Hardcoded `#0B1547` / `yellow-400` / `gray-*`; the site uses `primary`, `text-muted`, and the `cta` token.
- Stale dates: "Updated 2025", "(2025–2026)" titles, and index dates of Nov 2025–Mar 2026 for unpublished posts.
- Nav/footer have no Blog/Pricing/Reviews links: 3 places to update (Nashville nav, brand nav, mobile menu).

## Content conflicts

- **Keyword cannibalization:** `/pricing`, `blog/how-much-does-roof-replacement-cost-nashville`, and `/nashville/services/roof-replacement` all target "roof replacement cost Nashville".
- **Price ranges disagree:** live site $15k–$30k; drafts $10k–$28k, "most pay $14k–18k", 3-tab from $8k; metal quoted as both $22–40k and $22–45k.
- **Hail/claims overlap:** `hail-damage-roof-nashville-insurance-claim`, `what-size-hail-damages-a-roof`, `roof-insurance-claim-process-tennessee`. Likely merge candidates.
- **Reviews page:** 6 invented testimonials plus a "5.0 · Google Reviews" badge. This violates the repo's real-reviews-only rule (`reviews.json` `placeholder: true`, filtered in `app/lp/[slug]/page.js`) and the FTC fake-review rule. Do not ship the testimonials; launch only with the GHL widget or real reviews.

## Facts needing client confirmation

- **Warranty:** /pricing gives 3-tab no lifetime warranty, but the live site says every replacement has one. Workmanship only, or also manufacturer?
- **Certification:** the repo has Owens Corning Preferred Contractor (badge disabled in `lib/funnel-trust.js`). The GAF-vs-CertainTeed post says "we install both". Retarget to Owens Corning or drop. Spec claims to fact-check: Golden Pledge "50-yr labor", "ArmorShield II" name, Master Elite "top 3%", 33% market share.
- **Financing:** the drafts claim 0%, same-as-cash, and $0 down. The live site makes no financing claims and there is no /financing page.
- **Insurance copy (compliance read):** "don't call your insurer first"; contractor at the adjuster meeting and filing supplements (TN public-adjuster rules); "waiving deductible is fraud in TN" (needs a statute); the ACV-shift claim.
- **Licensing:** "TN requires roofers be licensed" is oversimplified ($25k+ state license; home-improvement license in some counties). Show a license number?
- **Operations:** crew 4–6, 7–8 AM start, one-day installs; scheduling 1–2 weeks vs live "same-week"; inspections 1–3 days vs live 2–4; "respond within 1 business day"; samples at every estimate; "Nate leads every job".
- **Other:** premium-tier contents (stainless drip edge, ice-and-water shield only in premium), Brentwood neighborhoods, the Google review link, and the GHL review widget embed.

## Open questions for Brandon

1. SEO goal and timeframe (e.g. top 10 Nashville for roof replacement/repair in 6 months?).
2. Competitors lost to (only Bill Ragan Roofing known from the brief).
3. Is thestellarroofing.com verified in Google Search Console, and under which Google account?
4. Is Stellar currently an Owens Corning Preferred Contractor?
5. Topics to avoid beyond Boise?
6. Are the www canonical fix and Boise de-indexing in scope for the step 3 build?
7. OK to convert the `SEO-Strategy` file into a folder (notes kept as README.md)?

## Remaining plan

- ~~OpenSEO project setup~~ done 2026-09-26 (Search Console not connected yet).
2. ~~Keyword check~~ done → `KEYWORD-AUDIT.md` (move into `SEO-Strategy/` after folder OK)
3. ~~Merge + keyword changes + sitemap/nav/footer + local build~~ done 2026-09-27, uncommitted. Blog lives at `/nashville/blog/*` (8 posts, data in `lib/blog-posts.js`, layout `components/BlogPost.jsx`). Not shipped: /reviews (fake testimonials), /financing, GAF-vs-CertainTeed (Stellar installs Owens Corning + GAF, no certifications → rewrite as OC vs GAF). /pricing merged into the cost post.
   - Done same day: canonicals/sitemap/robots/config now use `https://www.thestellarroofing.com`; layout title template no longer appends the brand (titles were doubling it).
   - Still open: Boise de-index; in Vercel → Domains, make the apex → www redirect permanent (308) instead of 307.
4. Local SEO audit (OpenSEO) → `SEO-Strategy/local-seo-audit.md`
5. BLOG_CONFIG.md from `~/.claude/skills/blog-pipeline/BLOG_CONFIG.template.md`, then 5 next post topics.
