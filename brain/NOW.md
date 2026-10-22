# Where we left off

**Last updated:** 2026-10-21 (SEO check; popup, offer bar, hero form, and the Goodlettsville home page move pushed)

## The headline

**Google PPC is paused** (Brandon, ~Oct 16): no leads or conversions. **Meta ads launch in a few days.** Business Manager and ad account exist; **no Meta pixel yet** (waiting on the pixel ID from Brandon). PostHog on the funnel (Oct 4–15): 59 visitors, 2 form starts, 0 leads, 0 call taps, half gone in 15 seconds. So the funnel page is the first problem to fix before paying for traffic: on 2026-10-17 Claude tightened the mobile top so all four form options show on the first screen (pushed). Results need a few days of traffic to judge.

Local ranking: Stellar is #3 on the Goodlettsville map for "roofing company" with **4 reviews** vs 96 / 64 / 61 for National Roof Co / Cannons / WCM. The 12-month plan with dated milestones is in `TODO.md` ("Local ranking plan"). LSAs: decided no.

**The Nashville home page is now `/goodlettsville`** (pushed 2026-10-21; `/nashville` 301s to it). Services, service areas and blog stay under `/nashville/...`. Live check of the deploy was not done in the session; look at it first.

Brandon starts **short, separate sessions per task**; say "wrap up" before closing so this page gets updated.

## Waiting on Brandon (ask about these first)

0. **Meta ads:** the ad to run is **v9** (v8 has the older third-person snap intro) (`meta-ad-clips/stellar-v9-pov-{916,45,11,169}.mp4`: $5,999 hook, real Stellar footage, AI snap intro, Nate voice clone on ElevenLabs v4, Final Level music; v7 is the no-price fallback). Guide: `meta-ad-scripts/UPLOAD-GUIDE.md`. Nate confirmed the $5,999 terms and the voice clone on 2026-10-21. Create the Meta Pixel (guide Steps 1-7), and have Nate record the hooks in `meta-ad-scripts/owner-video-hooks.md`. Higgsfield API balance is low; check console.higgsfield.ai.
0a. **Goodlettsville Chamber badge:** done. Chamber activated member 2789 on 2026-10-21; badge now sits in the footer of every `/nashville` page (not the homepage or Boise), moved out of the hero at Brandon's request. Uses ChamberMaster's https endpoint (`secure: true`); the plain http one is blocked on https pages.
0b. **CompanyCam ↔ GHL (2026-10-22):** CompanyCam labels renamed to `TN - …` (red) / `ID - …` (blue), 16 total incl. new ID Good/Bad/Manual. GHL tags created: `cc-tn-good-lead`, `cc-tn-bad-lead`, `cc-tn-manual`, `cc-tn-paid`, and the same four `cc-id-…`. Draft workflow **"CC - TN Good Lead Follow-Up"** built (tag trigger → wait 1 day → SMS 1 → wait 2 days → SMS 2 → wait 4 days → SMS 3; stop on response, re-entry on, Mon–Sat 8–5, from +1 629-356-4290). **Not published.** Existing published "1. Roofing Google Review Request" triggers on tag `request google review` (asks for willingness, link on YES; no sentiment gate): the connection should add that tag on the Paid labels. Still to do: Manual and Bad Lead workflows, Idaho versions, the receiver on the site. Blockers: Brandon to create the CompanyCam token "Stellar website" (an existing token named "GHL" is someone else's; leave it) and give the GHL private integration write access to contacts. GHL numbers: +1 629-356-4290 (default) and +1 208-314-6572 (Boise); no 615 number is in GHL. GHL's workflow list sometimes ignores Claude's clicks on first load; reloading fixed it.
1. **Meta Pixel ID** (Events Manager, Connect data sources, Web, Meta Pixel). Claude then adds the pixel, Conversions API, a lead event, and gives the UTM link format. Also: which offer will the Meta ads lead with?
2. **Test lead after the A2P changes:** name "Test", phone 615-555-0142, tick the SMS box; check the `sms-consent` tag in GHL; tag `test`.
3. **A2P/10DLC registration** in GHL: site now has SMS consent checkbox on every form, SMS sections in Privacy and Terms, Terms and Privacy links in the form footer. If GHL rejects the wording, Claude adjusts.
4. **Business Profile:** change the website link to `https://www.thestellarroofing.com/goodlettsville` now (the home page moved there). Real job photos (11 now; rivals 25–92), Services list, true extra categories. **Search Console:** request indexing for `/goodlettsville`, and again for storm-damage, Franklin, Brentwood (Google had not recrawled them by 2026-10-21; the daily request limit means two batches).
5. **Request indexing** was done by Brandon 2026-10-16 for the Goodlettsville, storm-damage, and Franklin pages. Claude rechecks about **2026-10-23**. (Goodlettsville was "unknown to Google" on Oct 16.)
6. **Citations:** Yelp claim in progress (2026-10-17). Also Thumbtack, Nextdoor, BBB, Apple, Bing Places. GHL Listings is Yext-style; keep name, address, phone, hours identical everywhere and don't let it overwrite the Google profile. Don't ask customers for Yelp reviews.
7. **Dog Oasis backlink:** Nate is asking Dog Oasis (dogoasis.com) to link to `https://www.thestellarroofing.com/nashville`. The site links to them from the Puppy Promise band.
8. **Confirm** the Puppy Promise "we bring the dog home" wording; and whether the Owens Corning / IKO / GAF shingle list changed (Brandon said Owens Corning and IKO on 2026-10-14; the file says Owens Corning and GAF). No brand is named on the metal copy until this is answered.
9. **Connect the PostHog MCP** (mcp.posthog.com) in connector settings, so Claude can read funnels without the Chrome workaround.
10. **Build the GHL new-lead alert** (10 min). One workflow, triggers: tag `ppc-lead`, tag `website-lead`, appointment booked; actions: email and in-app notification to Nate. Re-give steps.
11. **GHL calendar cleanup:** rename to "Free Roof Inspection", Central time, booking notifications, booking rules (60-min slots, 4-hour notice, 14-day range, max 4/day).
12. **Google Ads housekeeping** (still worth doing even when paused): turn off Auto-apply recommendations and Automatically created assets.
13. Small: delete the `test`-tagged GHL contacts; Instagram bio link with UTM (`https://www.thestellarroofing.com/?utm_source=instagram&utm_medium=social`); PostHog "Filter test accounts"; Owens Corning logo artwork; ask Nate for jobs per month (sets the review timeline).
14. The metal-roof blog post (`metal-roof-vs-shingles-cost`) probably lists prices; Brandon said metal prices can't be listed. Review it.
15. (Resolved 2026-10-21: the "most trusted" headline was replaced.) Watch `/nashville` rankings for a dip over the next 2-3 weeks after the URL move; tell Claude if impressions or clicks fall sharply.
16. Look at the live site after the deploy: `/nashville` lands on `/goodlettsville`, phone hero shows offer bar, headline and form on the first screen, menu Home link and footer go to the new URL.

## What Claude does next

- **Meta pixel and tracking** once Brandon sends the pixel ID: pixel + Conversions API on the funnel and main site, lead event on `/thank-you`, UTM format, read-only Meta reporting.
- **Recheck indexing** on 2026-10-23: `/goodlettsville` (new URL), storm-damage, Franklin, Brentwood.
- **Trim titles** to about 60 characters and descriptions to 160 on money pages (28 titles, 23 descriptions flagged); link the storm-damage page from the homepage/footer; real job photos and a price range on the city pages with impressions and no clicks (Murfreesboro, Clarksville, Spring Hill, Hendersonville, Gallatin). Consider Bing IndexNow (Bing Webmaster is set up, 51 URLs, 0 errors).
- **Rank tracker** (OpenSEO, about 20 terms) plus a monthly Maps grid: show the credit estimate first.
- **PostHog funnel check** after a few days of Meta traffic: form starts per visitor after the mobile fix.
- **Metal:** a dedicated metal page and ad group only if Meta/search data shows volume; needs Brandon's brand answer.
- **Blog:** GAF Timberline HDZ post paused by Brandon; Owens Corning vs. GAF and the metal roof cost update come after.

## Google Ads (PAUSED) snapshot (Sep 29 – Oct 11, checked 2026-10-12)

- **$605.15, 69 clicks ($8.77 each), 3 Google conversions, 1 real person** (Oct 2). **Oct 3–11: $498.26, 54 clicks, 0 conversions, 0 new GHL leads.** GHL checked 2026-10-12: only the Oct 2 `ppc-lead` and the Sep 29 Instagram `website-lead`; calls to Nate's cell are not visible to Claude.
- Budget is now **$75/day** (Brandon raised it; date unknown, max CPC not visible in the sheet). Oct 8 spent $133. Oct 10–11: ~$38/day, 0% lost to budget, 64–70% lost to rank. Impression share 30–36%.
- By ad group: Roof Repair $322.56 / 38 clicks / all 3 conversions; Roofers $153.74 / 17; Replacement $128.85 / 14; Storm $0 / 28 impressions.
- **"roof repair company" (phrase) has quality score 1**, with 718 impressions and $165.54, the biggest keyword. It is catching general "roofing company" searches and sending them to the repair page. Fix proposed: ad-group negatives in Roof Repair so those go to Roofers. Not done yet.
- Only 26 of 69 clicks are itemized by search term; 5 of those 26 were competitor names. `ppc-scripts/add-negatives.js` now holds 60 new negatives (through Oct 11); run by Brandon 2026-10-14.
- Metal: Stellar **does** install metal roofs (all types), so "metal" is NOT a negative. The negatives script (60 terms) was run by Brandon 2026-10-14.
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
- 2026-10-21: `/goodlettsville` home page (hero "Goodlettsville's Local Choice for Roof Repair & Replacement", address and FAQs merged from the old city page); exit-intent popup on Nashville pages; gold offer bar on `/nashville/*` and `/goodlettsville`; two-step hero form (service, address, ZIP, then name, phone, email); 5-step process; offers section (gutters and Puppy Promise labeled retail-only).
- 2026-10-14 to 17: YouTube unlisted promo video (click-to-play, `promo_video_play` event) on `/nashville` and funnels; "The Stellar Puppy Promise" band on `/nashville` and funnel copy matching Nate's video (retail replacements only, Dog Oasis, up to $75); metal roofing added to the roof-replacement funnel and service page (no price; the homepage metal price line was removed); lead form in the `/nashville` hero; A2P consent checkbox, SMS sections in Privacy and Terms, Terms and Privacy links in every form footer, full business address in both pages; funnel mobile top tightened.

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
