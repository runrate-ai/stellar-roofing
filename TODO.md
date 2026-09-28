# Stellar Roofing: Running To-Do List

The one list for SEO and website work. Update it as things get done, adding ✅ and the date. PPC funnel items live in [TOMORROW.md](TOMORROW.md) (summary at the bottom).

**Last updated:** 2026-09-28

Reference files: [CONTENT-PLAN.md](CONTENT-PLAN.md) · [KEYWORD-AUDIT.md](KEYWORD-AUDIT.md) · [LOCAL-SEO-AUDIT.md](LOCAL-SEO-AUDIT.md) · [LINK-PROSPECTS.md](LINK-PROSPECTS.md) · [BLOG_CONFIG.md](BLOG_CONFIG.md) · [SEO-MERGE-AUDIT.md](SEO-MERGE-AUDIT.md)

---

## 🔥 Now: highest impact

**Stellar team**
- [ ] **Google reviews:** ask every past customer, and set up the automatic post-job review text in GHL. Reply to every review. Goal: 20+ by late November. *(#1 Maps ranking factor; Stellar has 0.)*
- [ ] **Business listings, round 1:** Bing Places, Apple Business Connect, Yelp, Facebook, Nextdoor, BBB. Use the exact details block in LINK-PROSPECTS.md. (~2 hours)
- [ ] **Business Profile photos:** 20+ real job photos, then keep adding after each job.

**Claude**
- [ ] Check that Google has indexed the new blog posts and updated pages. If any are missing, list them so you can request indexing in Search Console. *(free)*
- [ ] **PPC: fix the mobile lead form before any more ad spend.** See the PPC section and PPC-AUDIT.md.

## 📅 This month

**Stellar team**
- [ ] Join the Goodlettsville Area Chamber of Commerce (and Hendersonville if the budget allows).
- [ ] Email Habitat for Humanity of Sumner County about the Critical Repair Program (draft A in LINK-PROSPECTS.md).
- [ ] Ask Goodlettsville Little League about sponsorship.
- [ ] Check that Google approved the Business Profile category and service changes; they weren't showing on 2026-09-27.

**Claude**
*Build order from CONTENT-PLAN.md:*
- [ ] Weeks 1–2: city pages for Hendersonville, Murfreesboro, and Franklin (Brentwood template); upgrade the commercial roofing page ("commercial roofers nashville" cluster, KD 0).
- [ ] Weeks 3–4: city pages for Clarksville and Gallatin; storm damage and emergency page upgrades; new Goodlettsville page.
- [ ] Weeks 5–6: blog posts on Owens Corning Duration (18,100/mo) and GAF Timberline HDZ (9,900/mo), plus the Owens Corning vs. GAF post; update the metal post for "metal roof cost" (14,800/mo).
- [ ] Weeks 7–8: blog posts on roof inspection cost, roof leaking / finding a leak, and Class 4 shingles; add a flashing section to the repair page.
- [ ] Set up rank tracking for about 25 money keywords (price-check the credits first).

## 🗓️ Next month

**Stellar team**
- [ ] Apply to CAI Tennessee (HOA managers) and the Greater Nashville Apartment Association (draft B).
- [ ] Round 2 listings: HomeAdvisor/Angi, Houzz, Thumbtack, Porch, YellowPages, Superpages, D&B, Nashville Builders Pro, pickaroofer.com.
- [ ] Realtor and home inspector referral partnerships (draft C).

**Claude**
- [ ] Site audit crawl for technical issues (price-check the credits first).
- [ ] Search Console near-miss queries: once a few weeks of www data exist (about late October), find pages ranking #5–20 and improve them.
- [ ] Roofing-basics blog cluster, 1–2 a week (drip edge, ice & water shield, underlayment, roof boot, step flashing, and so on; see CONTENT-PLAN.md).
- [ ] Commercial roofing content: TPO vs. EPDM, and commercial roof types.

## ❓ Decisions / answers needed from you

- [ ] **Does Stellar do gutters?** If yes, a gutters page is worth it (Don Kennedy ranks #4–8; installation CPC $59).

- [ ] **Boise:** hide from Google, drop from the sitemap, or leave as is? This affects the homepage title ("Nashville TN & Boise ID"), the nav, and the sitemap.
- [ ] **Roof repair page promises:** can Stellar really deliver "same-week service" and "next day" response? If not, Claude softens them.
- [ ] **Lifetime warranty:** workmanship only, or manufacturer too? Needed before a warranty post (1,300 searches/mo).
- [ ] **SEO goal and timeframe**, for example "top 3 in Maps around Goodlettsville/Hendersonville in 6 months".
- [ ] OK to turn the `SEO-Strategy` notes file into a folder and move the audit files into it?
- [ ] Owens Corning Preferred: search the OC contractor locator, or ask your supplier for an intro to the OC rep.
- [ ] Does every Trusty project-map pin represent a completed Stellar job? If yes, the stronger subtitle can go back in.

## 🔧 Quick checks (Stellar team, 2 minutes each)

- [ ] Click the footer map link on the live site and confirm it opens the right Google listing.
- [ ] In OpenSEO → Integrations, confirm Search Console points at `sc-domain:thestellarroofing.com`, not the old `https://thestellarroofing.com/` property.
- [ ] Look at `/nashville` on a phone and confirm the Trusty map fills its card.

## 🧹 Cleanup (low priority, Claude)

- [ ] Delete the dead `app/services/*` and `app/service-areas/*` route files. They're 301-redirected, so they never load.
- [ ] Update the old 7–7 hours in `client-data/client.config.js`. It isn't read by the site, but it's stale.
- [ ] Move the project off the iCloud-synced Desktop, for example to `~/Projects`, so builds stop hanging. *(Stellar team: move the folder; Claude: verify the build)*

## 🔁 Recurring

- [ ] **~2026-11-26:** re-run the Maps rank grid and the backlink check, and compare with the 2026-09-27 baseline (0/9 grid points, 1 real link).
- [ ] **Monthly:** check-in covering reviews, Maps grid, rankings, and Search Console trends.

---

## PPC funnel (from TOMORROW.md)

**Findings 2026-09-28 (GA4, last ~30 days):** 110 paid sessions (98 people). **Zero `/thank-you` page views and zero GA4 key events**, so either no one finished the form, or the finishes aren't recorded. About 95 of ~110 paid visitors landed on the root funnel page; the service pages got 2–9 each. The form loads in a real browser (step 1 of 4). Phone calls from ads aren't tracked at all.

- [x] ✅ 2026-09-28 Confirmed: **zero leads** from $1,821.51 / 212 clicks (Aug 12 – Sep 19). Full audit in [PPC-AUDIT.md](PPC-AUDIT.md).
- [ ] **Keep ads paused** until the form fix and test lead are done (most ad groups are already paused).
- [ ] Claude: switch the funnel back to the in-repo 3-step form (no iframe) and put it high on mobile. Needs `GHL_WEBHOOK_URL` confirmed in Vercel.
- [ ] Check GHL for a lead around the one "conversion" Google Ads recorded (search: roofing companies murfreesboro tn).
- [ ] Campaign rebuild in Google Ads: presence-only Nashville locations, English only, no broad match, pause "residential roofing companies", 4 tight ad groups → matching funnel pages, add the negative keyword list (PPC-AUDIT.md).
- [ ] Relaunch at ~$40–50/day; review the search terms report every 2–3 days for 2 weeks.
- [ ] Submit one real test lead end to end, and watch for `/thank-you` in GA4 Realtime and "PPC Funnel Lead" in Google Ads.
- [ ] Add call tracking (Google Ads call assets / call-from-website conversion). Roofing ads convert heavily by phone.
- [ ] Mark `generate_lead` as a key event in GA4 (current key events are close_convert_lead, qualify_lead, purchase).
- [ ] Link Google Ads ↔ GA4 so campaign names show up in GA4 (currently missing).
- [ ] Move the form off the `vibepreview.com` preview host to a permanent GHL form URL.

- [ ] Submit one real test lead and confirm "PPC Funnel Lead" flips to Active in Google Ads.
- [ ] Each ad group's Final URL points at its own funnel page.
- [ ] Negative keywords (auto hail terms, jobs, DIY, and so on).
- [ ] Confirm the `vibepreview.com` form host is permanent.
- [ ] Legal review of the price-beat fine print and storm/insurance copy.

---

## ✅ Done

**2026-09-26 / 27**
- Merge audit (SEO-MERGE-AUDIT.md), keyword audit (KEYWORD-AUDIT.md), OpenSEO project set up.
- 8 blog posts and a blog index live at `/nashville/blog`; Brentwood page expanded; nav, footer, and sitemap updated.
- Canonicals, sitemap, and robots moved to www; apex → www redirect set to 308 in Vercel; duplicate brand in page titles fixed.
- Search Console Domain property verified; www sitemap accepted (48 pages); Search Console and GA4 connected in OpenSEO.
- Local SEO audit (LOCAL-SEO-AUDIT.md).
- Business Profile: description rewritten, hours set to 24/7, website link points to `/nashville`.
- Site schema matches the Business Profile (Goodlettsville address, 24/7 hours, map link); footer shows the address and map link.
- Owens Corning and GAF named on the roof replacement page (with the independence disclaimer).
- Trusty project map added to `/nashville`.
- Mobile fix: hero headlines and breadcrumbs no longer hide behind the navbar.
- BLOG_CONFIG.md set up; blog post: roof repair cost (live), linked from the roof repair page.
- Link prospecting research (LINK-PROSPECTS.md).

**2026-09-28**
- Running TODO list created.
- Keyword research and content plan (CONTENT-PLAN.md).
