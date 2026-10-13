# Where we left off

**Last updated:** 2026-10-12 (PPC check done; new negatives script written, waiting on Brandon to run it; local `main` ahead of origin, not pushed)

## The headline

The relaunched Google Ads campaign has run one week and produced **one real person** (they called and filled out the form) for $170. Brandon wants more leads and is frustrated with PPC. The open decision is whether to raise the budget and bid. Nobody is alerted when a lead arrives, because the GHL alert workflow still isn't built.

The long setup session ended 2026-10-06. No work is half-finished and nothing is uncommitted. Brandon will start **short, separate sessions per task** from here (cheaper than one long one); say "wrap up" before closing so this page gets updated.

## Waiting on Brandon (ask about these first)

00. **Run the updated `add-negatives.js`** (60 new terms, printed in chat 2026-10-12). Answer: does Stellar install metal roofs? (Indexing requests for the 8 URLs were done by Brandon ~2026-10-08; recheck after 2026-10-15.)
0. Did anyone call or fill out the form since Oct 2? Claude couldn't read GHL from the cloud session. (The 30 new negatives were run on 2026-10-08.)
1. Budget was raised to **$75/day** by Brandon (seen in the sheet 2026-10-12). Whether max CPC went from $12 to $15 is unknown; ask.
2. **Build the GHL new-lead alert** (10 min, in the GHL UI). Design: one workflow, three triggers (tag added `ppc-lead`, tag added `website-lead`, customer booked appointment on the inspection calendar), then an internal email and an in-app notification to Nate. Full copy-paste steps were given in chat on 2026-10-02; re-give them.
3. **GHL calendar cleanup:** rename "Nate Sneed's Personal Calendar" to "Free Roof Inspection" (name and description were given), confirm Central time, turn on booking notifications. Suggested rules: 60-min slots, 60-min interval, 4-hour minimum notice, 14-day range, 30-min post buffer, max 4/day.
4. **Google Local Services Ads:** Claude offered to write the application steps. Not answered.
5. **Google reviews:** Stellar has 0. First 5–10 from past customers would help ads, LSAs, and Maps.
6. **Google Ads housekeeping:** turn off Auto-apply recommendations and Automatically created assets (the report sheet can't show these).
7. **PostHog:** turn on "Filter test accounts"; confirm typed fields are masked in the first recording that has typing.
8. **Instagram bio link:** change to `https://www.thestellarroofing.com/?utm_source=instagram&utm_medium=social` so IG leads are labeled in GHL.
9. **Delete the `test`-tagged contacts in GHL** (three of them).
10. Owens Corning logo artwork file (for the badge); GHL number A2P approval.

## What Claude does next

- **Ads follow-ups from the 2026-10-08 review** (negatives already done):
  - Add the quality-score breakdown (ad relevance, landing page experience, expected CTR) to `ppc-scripts/report-to-sheet.js`.
  - Improve the Roofers ad group's landing page and ad match ("roofing company near me" has quality score 3/10).
- **PostHog funnel report** (page view → form start → step 2 → step 3 → lead) once there's about a week of traffic. Watch whether the required street address (since 2026-10-02) is costing form completions.
- **Blog:** GAF Timberline HDZ post is paused by Brandon; Owens Corning vs. GAF and the metal roof cost update come after.

## Google Ads snapshot (Sep 29 – Oct 11, checked 2026-10-12)

- **$605.15, 69 clicks ($8.77 each), 3 Google conversions, 1 real person** (Oct 2). **Oct 3–11: $498.26, 54 clicks, 0 conversions, 0 new GHL leads.** GHL checked 2026-10-12: only the Oct 2 `ppc-lead` and the Sep 29 Instagram `website-lead`; calls to Nate's cell are not visible to Claude.
- Budget is now **$75/day** (Brandon raised it; date unknown, max CPC not visible in the sheet). Oct 8 spent $133. Oct 10–11: ~$38/day, 0% lost to budget, 64–70% lost to rank. Impression share 30–36%.
- By ad group: Roof Repair $322.56 / 38 clicks / all 3 conversions; Roofers $153.74 / 17; Replacement $128.85 / 14; Storm $0 / 28 impressions.
- **"roof repair company" (phrase) has quality score 1**, with 718 impressions and $165.54, the biggest keyword. It is catching general "roofing company" searches and sending them to the repair page. Fix proposed: ad-group negatives in Roof Repair so those go to Roofers. Not done yet.
- Only 26 of 69 clicks are itemized by search term; 5 of those 26 were competitor names. `ppc-scripts/add-negatives.js` now holds 60 new negatives (through Oct 11); **Brandon has not run it yet**.
- Open question: does Stellar install **metal roofs**? About 25 metal searches showed (no clicks yet). If no, add "metal" as a negative.
- Next diagnostic: PostHog funnel (do ad visitors start the form?). 54 clicks with nothing is too many to blame on search terms alone.

## Earlier snapshot (Sep 29 – Oct 6, checked 2026-10-08)

- $293.81, 37 clicks ($7.94 each), 3 Google conversions, all on Oct 1–2. **Oct 3–6: $186.92, 22 clicks, 0 conversions.**
- Oct 5–6: impression share under 10%, and **56% lost to budget** (Oct 5 spent $77 on the $45 budget). Budget is now the bigger limit, not rank.
- Quality score 3 on "roofing company near me", "roof leak repair", "hail damage roof repair"; 5 on "roof repair nashville".
- The sheet's "Last updated" was still 2026-10-07 6:04 on the morning of Oct 8; check whether the daily run is still firing.

## Earlier snapshot (Sep 29 – Oct 4)

| | |
|---|---|
| Campaign | `Search – Nashville Leads (Relaunch)`, live since 2026-09-29; old campaign paused |
| Settings | Search only, 7 counties, Presence, Maximize clicks, **$12 max CPC**, **$45/day** |
| Ad groups | Roof Repair, Roofers, Roof Replacement, Storm Damage (last three added 2026-10-02); 39 phrase/exact keywords; 182 negatives |
| Spend / clicks | $170.34 / 22 clicks ($7.74 each) |
| Google conversions | 3 (1 form + 2 phone taps) |
| Real people | **1** (call + form, same person, Oct 2). Unknown whether it became a job. |
| By ad group | Roof Repair: 20 clicks, all 3 conversions. Roofers: 2 clicks. Replacement: 106 impressions, 0 clicks. Storm: 3 impressions. |
| Impression share | 12–26%; top of page 10–19%. Mostly lost to **rank** (bid × quality), budget-limited only on Oct 2–3. |
| Quality scores seen | "roof repair nashville" 5; "roofing company near me" 3 |

The Sep 29 website lead (Contact page) came from **Instagram**, not ads or search.

## Live on the site (all pushed)

- Native 3-step lead form on the funnel and the main site; **street address required** since 2026-10-02.
- GHL booking calendar on the funnel thank-you pages and `/thank-you` (Nashville only).
- PostHog on the funnel and main site since 2026-10-04 (recordings, autocapture, funnel events; privacy policy updated).
- Lead API adds tags without replacing a contact's existing tags (fixed 2026-10-04).
- SEO: Hendersonville, Murfreesboro, Franklin, Clarksville, Gallatin, Goodlettsville pages; commercial, storm, emergency upgrades; Owens Corning Duration blog post; "Shingles we install" line on the homepage, `/nashville`, and footer.

## SEO check (technical crawl, cloud session)

All 51 sitemap URLs return 200, are indexable, have the right canonical, one H1, schema, and image alt text. `/thank-you` and the funnel are noindex (correct). Only finding: most titles run 66–95 characters and get cut off in Google (meta descriptions 166–205). Low priority.

## Rankings and Search Console check (2026-10-07, OpenSEO, 184 credits)

**Search Console** (data only exists from Sep 26, so "28 days" is really Sep 26 – Oct 5): **15 clicks, 4,228 impressions**. Impressions went from ~180/day to ~600/day after the Sep 28 pages; average position 27 → 18. About 8 of the clicks are `/nashville` (mostly brand), 2 are a Boise page.

- City pages are getting seen but sit on pages 2–4, **0 clicks**: Murfreesboro 564 impressions (pos 29), Gallatin 532 (www URL pos 12.7), Clarksville 443 (19.5), Hendersonville 416 (22), Spring Hill 366 (18), Smyrna 308 (23), Lebanon 141 (21).
- Closest to page 1: storm/hail/emergency + city queries (pos 6–11 in Clarksville, Hendersonville, Smyrna, Murfreesboro, Spring Hill), "roof repair companies gallatin tn" 9.8, "roof contractors gallatin tn" 12.
- Owens Corning Duration post: 456 impressions, pos 11.6, 1 click (many are out-of-state queries).
- Nashville head terms barely register: no impressions at all for "roofing company nashville", "roofers nashville", "roofing contractor nashville".
- Boise pages still take roughly a tenth of impressions.

**Live Google check from each city (top ~50, one snapshot):**

- "roof replacement nashville": **2nd organic result** (6th item on the page, under the map pack), with the cost blog post, not the service page.
- "roof replacement cost nashville": #25, and Google shows the roof *repair* cost post for it (wrong page).
- Not in the top 50: roofing company nashville tn, roofers nashville, roofing contractor nashville, roof repair nashville, storm damage roof repair nashville, commercial roofing nashville, roof inspection nashville. (Emergency roof repair nashville returned only 14 rows; not in them.)
- Not found for "roofing company [city] tn" in Hendersonville, Gallatin, Murfreesboro, Franklin, Clarksville, or "roof repair [city] tn" in Hendersonville, Gallatin, Murfreesboro, Clarksville. Goodlettsville: only our paid ad shows.
- Not in any map pack. No rank tracker is set up in OpenSEO.

**Indexing problems found (live pages are fine; Google's copy is stale or missing):**

- `/nashville/services/storm-damage-repair`: **not indexed**. "Duplicate without user-selected canonical"; Google picked an unrelated site as canonical. Last crawled Sep 20, before the upgrade.
- `/nashville/service-areas/franklin`: **not indexed** ("Alternate page with proper canonical", last crawled Aug 30).
- `/nashville/service-areas/goodlettsville` and `/brentwood`: **unknown to Google** (in the sitemap, never crawled).
- Indexed but Google still holds the pre-upgrade version: roof-repair (Sep 12), roof-replacement (Sep 11), emergency-roof-repair (Jun 24), roof-inspection (Jul 4).
- Fine: homepage, `/nashville`, Hendersonville, Murfreesboro, Gallatin, Clarksville, commercial roofing.

**Full OpenSEO audit (2026-10-07):** report saved at https://app.openseo.so/p/fefa6b78-083c-4175-a73f-5ecd6a06bf7a/reports/2b067f48-ddd0-4876-b401-40307fb549d2. Crawl of 53 pages clean (only long titles, long meta descriptions, heading order). Three recommendations, in order: (1) request indexing for the 8 URLs; (2) first Google reviews plus Yelp, BBB, Thumbtack, Nextdoor profiles (map pack tops all 20 searches; directories are 5–6 of the top 10 in city results); (3) add real local job photos to the Gallatin and Hendersonville pages (Trusty embed is only on `/nashville` today). Open question for Brandon: the `/nashville` headline says "Nashville's Most Trusted Roofing Company", which can't be verified; keep or reword?

**Next for SEO:** after Brandon requests indexing, recheck those 8 URLs in a week. Then: fix the cost-post mix-up (link the replacement cost post from the replacement service page and the repair cost post), and consider a rank tracker for ~20 terms.

## Known problems

- **iCloud keeps offloading project files** (the project is on the Desktop). Symptoms: `next dev` hangs with no output, or a shell command that reads files times out. Fix: `rm -rf node_modules .next && npm ci`. Real fix: move the project to `~/Projects` (on TODO).
- Google hides low-volume search terms, so only some clicks are itemized in the report.
