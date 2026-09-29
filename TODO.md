# Stellar Roofing: Running To-Do List

The one list for PPC, SEO, and website work, **in priority order**. Work top to bottom. Mark items ✅ with the date as they're done and move them to Done.

Brandon's own action items are also GHL tasks (with due dates), on the internal contact **"Stellar Game Plan (internal)"**, assigned to Brandon.

**Last updated:** 2026-09-29

Reference files: [PPC-LAUNCH.md](PPC-LAUNCH.md) · [PPC-AUDIT.md](PPC-AUDIT.md) · [CONTENT-PLAN.md](CONTENT-PLAN.md) · [LOCAL-SEO-AUDIT.md](LOCAL-SEO-AUDIT.md) · [LINK-PROSPECTS.md](LINK-PROSPECTS.md) · [KEYWORD-AUDIT.md](KEYWORD-AUDIT.md) · [BLOG_CONFIG.md](BLOG_CONFIG.md) · [TOMORROW.md](TOMORROW.md) (original funnel launch notes)

## ▶️ Next session (2026-09-29): Google Ads relaunch

Work through [PPC-LAUNCH.md](PPC-LAUNCH.md) together, Parts A–F. Have Google Ads, GTM (GTM-MCP6RQRL), and GHL open.
- Before turning spend on: build the GHL new-lead alert workflow (`ppc-lead` + `website-lead` tags) so leads don't arrive silently.
- GTM: `phone_call_click` trigger + "Funnel Call Tap" conversion tag, then publish; Claude verifies the live container.
- After launch: send the search terms report every 2–3 days for the first 2 weeks.

---

## 🥇 Priority 1: fix the PPC ads and funnel (now)

**Why first:** $1,821.51 was spent on 212 clicks with **zero leads**. The mobile form was hard to finish and never produced a CRM contact, and ~80% of visible spend went to the wrong searches. Details are in PPC-AUDIT.md. The ads are mostly paused, so keep them paused until this section is done.

Uses the **current number (629) 277-4249** for now. The GHL number swap comes in Priority 2.

**Step 1: GHL setup (Claude, using Token 1)**
- [ ] Create GHL custom fields for lead tracking: gclid, wbraid, gbraid, utm_source, utm_medium, utm_campaign, utm_term, utm_content, landing_page, project_type, timeline.
- [ ] Create the `ppc-lead` tag.

**Step 2: rebuild the funnel form (Claude)**
- [ ] Replace the AI Studio iframe with the site's built-in 3-step form on every funnel page. No inner scrolling, and the form sits right under the headline on phones.
- [ ] Form posts to the site's own API route, which creates or updates the GHL contact (fields + `ppc-lead` tag) and fires the `generate_lead` conversion. On failure it shows a "call us" fallback, so leads are never silently lost.
- [ ] Track taps on the phone button as a conversion.
- [ ] Show it on a local preview (phone size) for approval before anything goes live.

**Step 2b: offer + booking (Claude, waiting on inputs)**
- [x] ✅ 2026-09-28 Price "beat" → price **match**, apples to apples, on all funnel pages.
- [x] ✅ 2026-09-28 Native form built and tested end to end locally (test contact "TEST Claude Funnel Check", tagged `test`; Brandon to delete it in GHL).
- [x] ✅ 2026-09-28 Restack offers per page: replacement = free gutters + dog-pampering install day + price match; general = price match + free inspection with the perks as backup; repair = free inspection/honest repair; storm = no perks until legal check.
- [x] ✅ 2026-09-28 Testimonials: left off for now (2 of 3 supplied reviews were by Stellar team members). Add real Google reviews as they come in.
- [x] ✅ 2026-09-28 Dog perk: Dog Oasis (Goodlettsville), daycare + bath, up to $75, owner drops off/picks up, retail replacements only.
- [ ] Booking calendar on the thank-you pages. **Needs: a "Free Roof Inspection" GHL calendar + `calendars.readonly` on Token 1.**
- [ ] Legal: can free gutters or dog perks be offered on insurance-paid replacements in TN? Until confirmed, fine print says the offers apply to retail (non-insurance) replacements.

**Step 3: connect it (Stellar team)**
- [ ] Create **Token 2** ("Website – PPC Lead Form (Vercel)": contacts.write + contacts.readonly) and add it in Vercel → Settings → Environment Variables as `GHL_API_TOKEN` and `GHL_LOCATION_ID` (Production).
- [ ] In GHL, build the workflow **"Contact Tag Added: ppc-lead"** → email + app notification to the owner, and create a task. *(Lead auto-text waits for A2P; see Priority 2.)* Claude supplies step-by-step instructions.

**Step 4: test (together)**
- [x] ✅ 2026-09-28 New form, offers, and price match pushed live on all 4 funnel pages (commit f94b25d); Token 2 added in Vercel.
- [x] ✅ 2026-09-28 Live phone test lead reached GHL (tags, source, fields, note). gclid capture verified separately in the browser. Delete both `test`-tagged contacts in GHL.
- [ ] Confirm Google Ads records a "PPC Funnel Lead" after the first real ad lead. Confirm it shows in GHL with the tag and fields, the owner gets notified, `/thank-you` loads, and Google Ads records a "PPC Funnel Lead".
- [ ] Mark `generate_lead` as a key event in GA4.

**Step 5: rebuild the campaign (Stellar team in Google Ads; Claude supplies exact settings)**
- [ ] Locations: Nashville-area counties, **"Presence"** only (not "presence or interest"). Language: English.
- [ ] No broad match. Pause "residential roofing companies" (it took 51% of spend), or make it exact match.
- [ ] 4 ad groups, each pointing at its own funnel page: repair → `/roof-repair`, replacement → `/roof-replacement`, storm/hail → `/storm-damage`, roofer/company + city → `/`.
- [ ] Add the negative keyword list from PPC-AUDIT.md, plus competitor names.
- [ ] Add a **call asset** (current number for now) with call reporting on, counting calls ≥60 seconds as conversions.
- [ ] Link Google Ads ↔ GA4.

**Step 6: relaunch and watch**
- [ ] Relaunch at ~$40–50/day.
- [ ] Review the search terms every 2–3 days for 2 weeks and add negatives (Claude reviews exports you send).
- [ ] If 60+ clicks bring no leads after the fixes, pause and re-check.
- [ ] Legal review of the price-beat fine print and the storm/insurance copy on the funnel pages.

---

## 🥈 Priority 2: when the GHL number is approved (A2P)

- [ ] Put the **GHL number on the funnel pages only** (not the main site or Business Profile; those stay (629) 277-4249).
- [ ] Switch the Google Ads call asset to the GHL number.
- [ ] Confirm GHL call forwarding → owner's cell.
- [ ] Add texting to the `ppc-lead` workflow: instant text to the lead and a text alert to the owner.
- [ ] Review the wording, then publish **Missed Call Text Back** and **Form Submission → Confirmation**.
- [ ] Publish the review request workflows once the Google review link is set (this feeds Priority 3).

---

## 🥉 Priority 3: local SEO, reviews, and listings

**Stellar team**
- [ ] **Google reviews:** ask every past customer; reply to every review. Goal: 20+ by late November. *(#1 Maps factor; Stellar has 0.)*
- [ ] **Business Profile photos:** 20+ real job photos, then more after each job.
- [ ] **Claim the core listings yourself** (free, you keep them): Bing Places, Apple Business Connect, Facebook, Yelp, BBB, Nextdoor. Use the exact details block in LINK-PROSPECTS.md.
- [ ] **Decide on GHL Listings (Yext)** for the rest of the directory network. Check the price first. If yes: use (629) 277-4249, the Goodlettsville address, and the `/nashville` URL, **not** the GHL tracking number. Listings may drop off if you cancel.
- [ ] Check that Google approved the Business Profile category and service changes.
- [ ] Join the Goodlettsville Chamber (and Hendersonville if the budget allows).
- [ ] Email Habitat for Humanity of Sumner County (draft A); ask Goodlettsville Little League about sponsorship.
- [ ] Later: CAI Tennessee and GNAA (draft B); realtor and home inspector partnerships (draft C).

---

## 4️⃣ Priority 4: main website, ranking and converting (Claude)

**Conversion (done 2026-09-28, see Done):** the 3-step form sits right under the hero on every Nashville and Boise page and writes straight into GHL.
- [ ] **Brandon, in GTM:** the "PPC Funnel Lead" Ads tag fires on every `generate_lead`, including website leads (`funnel_ad_group` = "Website"). That's fine: Google only counts it when the visitor came from an ad. In GA4, `generate_lead` becomes the site's lead key event.
- [ ] **Brandon, in GHL:** add `website-lead` to the new-lead alert workflow (same as `ppc-lead`). Delete the test contact "Test Website Lead" (tagged `test`).
- [ ] Add the Trusty project gallery to the service pages.
- [ ] "Meet Nate" section on `/nashville` once a photo is available.

*Accessibility (right after the Ads relaunch; build it in, no overlay widget like UserWay)*
- [ ] Audit the funnel pages first, then the main site (Lighthouse + axe + a keyboard-only pass).
- [ ] Fix what it finds: form labels (incl. the 3-step form's tap buttons), image alt text, color contrast, visible focus outlines, a skip-to-content link, and keyboard traps in the Trusty/Roofle embeds.
- [ ] Add a short accessibility statement page with a contact method.

*Ranking: build order from CONTENT-PLAN.md*
- [ ] Check that Google has indexed the new blog posts and updated pages *(free)*.
- [x] ✅ 2026-09-28 City pages for Hendersonville, Murfreesboro, and Franklin rewritten (Brentwood template, roof repair sections, FAQs, blog links); commercial roofing page upgraded (flat roof repair, process, property managers).
- [x] ✅ 2026-09-28 Clarksville retargeted and Gallatin rewritten; storm damage page (wind damage section, softened unverified stats) and emergency page (24/7, leak repair, tarping, what-to-do steps) upgraded; new Goodlettsville page (added to nav, footer, sitemap).
- [x] ✅ 2026-09-28 Brandon confirmed the Clarksville price table ranges are accurate.
- [x] ✅ 2026-09-28 Owens Corning Duration post live; "Shingles we install: Owens Corning® · GAF" line on the homepage, /nashville, and footer.
- [ ] Blog posts on GAF Timberline HDZ (paused by Brandon) and Owens Corning vs. GAF; update the metal post for "metal roof cost".
- [ ] Blog posts on roof inspection cost, roof leaking / finding a leak, and Class 4 shingles; flashing section on the repair page.
- [ ] Rank tracking for ~25 money keywords (price-check the credits first).
- [ ] Site audit crawl (price-check the credits first).
- [ ] Late October: Search Console near-miss queries (#5–20) → improve those pages.
- [ ] Ongoing: roofing-basics blog cluster, 1–2 a week; commercial content (TPO vs. EPDM, commercial roof types).

---

## ❓ Decisions / answers needed from you

- [ ] **The new GHL phone number** (for Priority 2).
- [ ] **Does Stellar do gutters?** If yes, a gutters page is worth it.
- [x] **Boise:** keep indexed and visible on the homepage (answered 2026-09-28). No Boise office or GBP yet, so the Boise schema has no address.
- [ ] **Boise Business Profile:** set one up when there's a Boise address to verify with.
- [ ] **Roof repair page promises:** can Stellar really deliver "same-week service" and "next day" response? If not, Claude softens them.
- [ ] **Lifetime warranty:** workmanship only, or manufacturer too?
- [ ] **SEO goal and timeframe**, for example "top 3 in Maps around Goodlettsville/Hendersonville in 6 months".
- [ ] OK to turn the `SEO-Strategy` notes file into a folder and move the audit files into it?
- [ ] Owens Corning Preferred: search the OC contractor locator, or ask your supplier for an intro to the OC rep.
- [ ] Does every Trusty project-map pin represent a completed Stellar job?

## 🔧 Quick checks (Stellar team, 2 minutes each)

- [ ] Click the footer map link on the live site and confirm it opens the right Google listing.
- [ ] Look at `/nashville` on a phone and confirm the Trusty map fills its card.

## 🧹 Cleanup (low priority, Claude)

- [ ] Delete the dead `app/services/*` and `app/service-areas/*` route files (301-redirected; never load).
- [ ] Update the old hours in `client-data/client.config.js` (unused, but stale).
- [ ] Move the project off the iCloud-synced Desktop, for example to `~/Projects`, so builds stop hanging.
- [ ] Revoke GHL Token 1 once the Priority 1 setup is done.

## 🔁 Recurring

- [ ] **~2026-11-26:** re-run the Maps rank grid and the backlink check against the 2026-09-27 baseline (0/9 grid points, 1 real link).
- [ ] **Monthly:** check-in covering leads and cost per lead, reviews, Maps grid, rankings, and Search Console.

---

## ✅ Done

**2026-09-28: main-site conversion**
- Old GHL iframe form replaced site-wide with the native 3-step form (`SiteLeadForm`). Leads go into GHL tagged `website-lead` + `nashville`/`boise`, with the page path as the source and a summary note. Boise ZIPs (83xxx) route to the Boise market.
- Form moved directly under the hero on all 33 Nashville and Boise service and city pages. The contact page form has a message field.
- `/thank-you` fires `generate_lead` and shows the Boise number for Boise leads.
- Every phone tap on the main site now pushes `phone_call_click` (`lead_source: website`), so the GTM call-tap conversion covers the site too.
- Homepage schema lists both Nashville and Boise; Boise has no address or map pin (no office yet).
- Tested locally: test lead landed in GHL with the right tags, source, and state.

**2026-09-26 / 27**
- Merge audit, keyword audit, OpenSEO project set up.
- 8 blog posts and a blog index live at `/nashville/blog`; Brentwood page expanded; nav, footer, and sitemap updated.
- Canonicals, sitemap, and robots moved to www; apex → www redirect set to 308; duplicate brand in page titles fixed.
- Search Console Domain property verified; www sitemap accepted (48 pages); Search Console and GA4 connected in OpenSEO.
- Local SEO audit (LOCAL-SEO-AUDIT.md).
- Business Profile: description rewritten, hours set to 24/7, website link points to `/nashville`.
- Site schema matches the Business Profile; footer shows the address and map link.
- Owens Corning and GAF named on the roof replacement page (with the disclaimer).
- Trusty project map on `/nashville`; mobile headline/breadcrumb fix.
- BLOG_CONFIG.md; blog post: roof repair cost (live).
- Link prospecting research (LINK-PROSPECTS.md).

**2026-09-28**
- Running TODO list created; keyword research and content plan (CONTENT-PLAN.md).
- Google Ads audit (PPC-AUDIT.md): $1,821.51 / 212 clicks / 0 leads. Causes: the mobile form, broad-match waste, and location/language settings.
- GHL access set up (Token 1). Internal contact "Stellar Game Plan (internal)" created; 10 Priority 1/2 tasks added in GHL, assigned to Brandon.
- GHL read access set up (Token 1). Confirmed no CRM contacts or form submissions from the funnel since the ads started; "Ai Studio Form Lead – Google PPC" workflow is still a draft; most GHL automations are drafts.
