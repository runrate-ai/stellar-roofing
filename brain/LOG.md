# Session log

Newest first. A few lines per session: what was done and what was decided. Details live in git history and the docs each entry points to.

## 2026-10-20 (Meta ad videos)

- Built Meta ad videos from Nate's real promo footage (`meta-ad-clips/stellar-nate-kinetic-30s-*.mp4`) and an AI b-roll version rendered in Hyperframes (`stellar-ai-hyperframes-{916,45,11,169}.mp4`, ElevenLabs "Brian" voice). Scripts, build code and `UPLOAD-GUIDE.md` are in `meta-ad-scripts/`; Hyperframes projects in `hyperframes-ad*/`.
- Higgsfield API key is in `~/ig-carousels/.env`; helper `~/ig-carousels/tools/higgsfield/gen.py`. Kling 3.0 std is about $0.42 per 5s clip, Seedance 2.5 about $2.31 (720p). Balance not readable by API; the $10 Brandon added is mostly spent.
- Decided: Traffic objective (landing page views) until a Meta Pixel exists; GTM steps for the pixel and Lead event are in the guide. No Meta Pixel in the site code.
- Later the same day: moved to v7 (real footage + AI intro, Nate voice clone on ElevenLabs `eleven_v4` with only `speed` set, the way Brandon's reels are made; the earlier robotic takes forced v2 with custom stability and SSML pauses). Voice key and the "Nate" clone are on the ElevenLabs account in `~/ig-carousels/.env`. Builders: `hyperframes-v3/gen7.py` (ASPECT=916|45|11|169).
- Brandon did not like the AI version (too slow, 10 shots, big captions vs the reference). v3 rebuild (about 28 Kling shots, about $12) is on hold. 10 owner-video hooks written (`owner-video-hooks.md`).

## 2026-10-17

- Built and pushed: A2P consent (checkbox, privacy/terms SMS sections, footer links on every form step), form in the `/nashville` hero, funnel mobile fix, metal roofing copy, Puppy Promise, promo video. Bing Webmaster checked (set up, 51 URLs, 0 errors). PostHog funnel report done (59 visitors, 2 form starts, 0 leads). Competitive landscape saved in OpenSEO. Plan and timeline added to TODO.md. Decisions: no LSAs, Google PPC paused, Meta coming, no second/keyword domains. Brandon claiming Yelp; Nate asking Dog Oasis for a backlink.

## 2026-10-14

- Promo video (YouTube unlisted) added as click-to-play on `/nashville` and all funnels; "The Stellar Puppy Promise" band added to `/nashville` and funnel copy aligned to Nate's video transcript; Dog Oasis linked. Brandon confirmed: installs metal roofs, max CPC $12. Negatives script (60 terms, no "metal") handed over to run. TODO.md got a "Next up" table.

- Local SEO audit (OpenSEO): #3 of 20 for "roofing company" at the storefront, found at 4 of 9 grid points (0 in top 3), not in top 21 downtown. Profile has 4 real-looking reviews and 9 photos (was 0 and 0 on Sep 27), so the earlier "0 reviews" note in NOW.md, TODO.md and the OpenSEO business overview was corrected.

## 2026-10-12

- PPC check from the sheet (full export) and GHL. $605.15 / 69 clicks / 1 real person since launch; nothing since Oct 2 ($498, 54 clicks). Budget now $75/day. "roof repair company" has quality score 1. Wrote 60 new negatives into `add-negatives.js` (not yet run). Brandon confirmed he requested indexing for the 8 URLs.

## 2026-10-07 (local session)

- Merged the cloud branch `claude/jolly-lamport-52yppj` into local `main` (fast-forward, not pushed). The fetch first failed on iCloud duplicate files in `.git` (`refs/heads/main 2`, `refs/remotes/origin/main 2`, `index 2`, `index 3`); moved them out of the repo.
- Rankings + Search Console check through OpenSEO (184 credits). 15 clicks / 4,228 impressions since Sep 26. One page-1 ranking ("roof replacement nashville", cost blog post); nothing else in the top 50 for Nashville head terms or city terms. Found storm damage, Franklin, Goodlettsville, Brentwood pages not indexed. Details in NOW.md.
- Ran the OpenSEO `seo-audit` skill and saved the report in OpenSEO ("SEO Audit — Oct 7, 2026"). Verdict: site is technically clean; the blockers are indexing, zero reviews/listings, and no job proof on city pages.
- Note: the cloud session dated its entries 2026-10-08, a day ahead of the Mac's clock.

## 2026-10-08

- SEO + ads check (cloud session). Ads: $293.81, 37 clicks, 3 conversions, none since Oct 2; Oct 5–6 limited by budget (56% lost). Updated `add-negatives.js` with 30 competitor/DIY terms. GHL not checked (no token in the cloud). SEO technical crawl clean; titles too long is the only finding.

## 2026-10-06

- Wrapped up the long setup session. Brandon confirmed he'll use short per-task sessions from now on. Nothing in progress; next scheduled work is the 2026-10-08 ads review.

## 2026-10-02 to 2026-10-05

- Built the three remaining ad groups by script; verified all four ads approved.
- Set up the "Stellar Ads Report" Google Sheet (daily) and the add-negatives script; negatives went 131 → 161 → 182.
- Added the GHL booking calendar to the funnel and main-site thank-you pages.
- Made the street address required on all lead forms.
- Installed PostHog (US Cloud) on the funnel and the main site.
- Fixed the lead API so it no longer replaces a contact's existing GHL tags. Found because a live deploy check of mine overwrote my own test contact.
- First-week ads result: $170.34, 22 clicks, 1 real person. Impression share ~17%, mostly lost to rank.
- Created this second brain (`CLAUDE.md` + `brain/`).

## 2026-09-29 to 2026-09-30

- Relaunched Google Ads as a new campaign, walked through setup screen by screen (PPC-LAUNCH.md).
- Wrote the negative keyword list (NEGATIVE-KEYWORDS.md) and the copy-paste ad groups (PPC-ADGROUPS.md).
- Discovered "Phone Call Clicked" was already wired in GTM; removed Google-AI sitelinks ("Services In Boise").

## 2026-09-28

- Rebuilt the PPC funnel: native 3-step form straight into GHL, new offer (price match, free gutters, dog day), Trusty photos.
- Main-site conversion work: form under the hero on 33 pages, `/thank-you` conversion, phone-tap tracking, dual-location schema.
- Ranking work: six city pages, commercial/storm/emergency upgrades, Owens Corning Duration blog post, "Shingles we install" line.
- Google Ads audit (PPC-AUDIT.md): $1,821.51, 212 clicks, 0 leads.

## 2026-09-26 to 2026-09-27

- SEO merge audit, keyword audit, OpenSEO setup, 8 blog posts and blog index, www canonical fix, Search Console verified, local SEO audit, Business Profile updates, link prospecting.
