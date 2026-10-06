# Where we left off

**Last updated:** 2026-10-05 (end of session)

## The headline

The relaunched Google Ads campaign has run one week and produced **one real person** (they called and filled out the form) for $170. Brandon wants more leads and is frustrated with PPC. The open decision is whether to raise the budget and bid. Nobody is alerted when a lead arrives, because the GHL alert workflow still isn't built.

## Waiting on Brandon (ask about these first)

1. **Raise the ad budget and bid?** Proposed: budget $45 → **$75/day**, max CPC $12 → **$15**. He asked "should we increase the cap"; Claude first said wait until Thursday, then left it to him once he said volume matters most. No answer yet.
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

- **Thursday 2026-10-08: ads review.** Read the "Stellar Ads Report" sheet and GHL. Then:
  - Update `ppc-scripts/add-negatives.js` with: `"valor roofing"`, `"weatherguard"`, `"summit ridge"`, `"top dawg"`, `"watson roofing"`, `"turbo poly"`, `"roof patch"`, `"what's good"`, `"sealing"`, `"leak source"`, plus anything new. Print the script in chat for Brandon to paste.
  - Add the quality-score breakdown (ad relevance, landing page experience, expected CTR) to `ppc-scripts/report-to-sheet.js`.
  - Improve the Roofers ad group's landing page and ad match ("roofing company near me" has quality score 3/10).
- **PostHog funnel report** (page view → form start → step 2 → step 3 → lead) once there's about a week of traffic. Watch whether the required street address (since 2026-10-02) is costing form completions.
- **Blog:** GAF Timberline HDZ post is paused by Brandon; Owens Corning vs. GAF and the metal roof cost update come after.

## Google Ads snapshot (Sep 29 – Oct 4)

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

## Known problems

- **iCloud keeps offloading project files** (the project is on the Desktop). Symptoms: `next dev` hangs with no output, or a shell command that reads files times out. Fix: `rm -rf node_modules .next && npm ci`. Real fix: move the project to `~/Projects` (on TODO).
- Google hides low-volume search terms, so only some clicks are itemized in the report.
