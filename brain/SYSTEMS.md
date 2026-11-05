# Systems: accounts, IDs, and how Claude reaches each one

No secrets in this file. Tokens live in `.env.local` (local) and Vercel (production).

## Website

| | |
|---|---|
| Live site | https://www.thestellarroofing.com (apex 308s to www) |
| Ad funnel | https://get.thestellarroofing.com — `/` (general), `/roof-repair`, `/roof-replacement`, `/storm-damage`, each with `/thank-you` |
| Repo | github.com/runrate-ai/stellar-roofing, branch `main` → Vercel deploys automatically |
| Local preview | `preview_start` with the `dev` config (port 3000). Never run the dev server from Bash. Don't run `npm run build` while it's up (breaks dev CSS). |
| Phone (everywhere today) | (629) 277-4249, the owner's cell. Boise: (208) 370-8599. |

## Google Ads

| | |
|---|---|
| Account | 373-543-2315, under the manager account "RunRate Manager PPC" |
| Campaign | `Search – Nashville Leads (Relaunch)` (old: "PPC August 11th - Search Leads", paused) |
| Negative list | "Relaunch Negatives" (shared list) |
| Conversion ID | 18377143790. "PPC Funnel Lead" label `SPekCI_Jst8cEO7r87pE` (fires on `generate_lead`); "Phone Call Clicked" label `WV3YCIGJtt8cEO7r87pE` (fires on `tel:` clicks); "Calls from ads". All valued at a $1,000 placeholder. |
| **How Claude sees it** | Google Sheet **"Stellar Ads Report"**, file ID `1Z9U64hnoM2KLCCLBsRm5SIJDCv7P6vr-hDLQmBzXkGo`, read with the Google Drive connector. Refreshes daily ~6 AM; check the Info tab's "Last updated". Tabs: Daily, Search terms (+ 2, 3, …), Ad groups, Impression share, Keywords, Ads, Conversions by type, Campaign settings, Campaign assets, Negatives. Data is last 30 days and excludes today. |
| **How Claude changes it** | Scripts in `ppc-scripts/`. Brandon pastes them into Google Ads → Tools → Bulk actions → Scripts, then Save and **Run** (Preview saves nothing). `report-to-sheet.js` (read-only, scheduled daily), `add-negatives.js` (edit the list each time), `build-ad-groups.js` (one-off, done). |
| Not visible to Claude | Auto-apply settings, automatically created assets, the live UI. Ask for a screenshot. |

## Tag Manager / Analytics

- GTM container `GTM-MCP6RQRL`; GA4 `G-XGHJWHETWD`. Events pushed by the site: `generate_lead`, `phone_call_click`, `funnel_form_start`, `funnel_form_step`, `funnel_form_error`.
- PostHog: US Cloud, project ID `645820`, initialized in `components/PostHogInit.jsx` (key in `lib/config.js`). The same events are forwarded from `components/funnel/tracking.js`. Claude can look at it through Brandon's Chrome (Claude in Chrome) at `us.posthog.com/project/645820`.
- Search Console: Domain property `sc-domain:thestellarroofing.com`; connected to OpenSEO along with GA4.

## CompanyCam

- API token: Personal Access Token "Stellar Website", Read & Write, in `.env.local` as `COMPANYCAM_API_TOKEN` (and Vercel once the receiver is built). Expires ~2027-10-22. API base `https://api.companycam.com/v2`. Labels are `TN - …` / `ID - …`.
- Load it with `grep '^COMPANYCAM_API_TOKEN=' .env.local | cut -d= -f2-`; sourcing the whole file in zsh returned an empty value once.

## GoHighLevel (GHL)

| | |
|---|---|
| Access | API v2 with "Token 1" in `.env.local` (`GHL_API_TOKEN`, `GHL_LOCATION_ID`). Base `https://services.leadconnectorhq.com`, header `Version: 2021-07-28`. Production uses a separate token in Vercel. |
| Lead tags | Ad funnel: `ppc-lead` + `ppc-<slug>`. Main site: `website-lead` + `nashville` or `boise`. Tests: also `test`. |
| Custom fields | `project_type`, `project_urgency`, `your_message`, `landing_page`, `google_click_id`, `wbraid`, `gbraid`, `utm_source/medium/campaign/term/content` |
| Counting leads | `POST /contacts/search` with a `tags contains` filter; print only date, tags, and source. Exclude `test`. |
| Social Planner | `GHL_API_TOKEN` has Social Planner + Media scopes since 2026-11-05 (Brandon added them). Connected: Facebook Pages "Stellar Roofing Nashville" (1237315586131091) and "Stellar Roofing Idaho". Post only to Nashville. Upload images with `/medias/upload-file`, schedule with `POST /social-media-posting/{locationId}/posts` (needs `userId`). GHL's list shows `platform: google` on these posts; ignore it, `accountIds` is what counts. Script: `meta-ad-scripts/fb-posts-src/ghl_fb.py`. |
| Can't do by API | Create or edit workflows; read calendars (no scope). Those happen in the GHL UI. |
| Booking calendar | `https://link.runratedigital.com/widget/booking/WDGkiiKCUeTkVOqhysfd` (website calendar since 2026-10-23; set in `lib/config.js` `bookingWidget`), embedded by `components/funnel/BookingEmbed.jsx` on `/thank-you` and the funnel thank-you pages. Old one: `QO7LCJe62qeDxjE1VuuP` (the Premura test appointment landed there) |
| Brandon's tasks | On the contact "Stellar Game Plan (internal)" |
| Test contacts | Fake number 615-555-0142; all tagged `test` for Brandon to delete |

## SEO tools

- OpenSEO (paid plan, credits) with the project set up for thestellarroofing.com. Ask before any batch over 2,000 credits.
- Blog pipeline skill (`blog-pipeline`) driven by `BLOG_CONFIG.md`; posts live in `app/nashville/blog/` and `lib/blog-posts.js`.
- Trusty embeds (project map and gallery) configured in `lib/config.js`.

## iCloud (recurring problem)

The project sits on the iCloud-synced Desktop, and macOS offloads its files. Symptoms: `next dev` prints nothing and never serves; `next build` hangs at "Creating an optimized production build"; a shell command that reads files times out. Check with `find node_modules/next -flags +dataless | head`. Fix: stop the preview, `rm -rf node_modules .next && npm ci`, start the preview again. Use the Read tool, not `cat`, when a shell read hangs.
- Bing Webmaster Tools: set up for `thestellarroofing.com` (51 URLs, 0 errors, 2026-10-17). IndexNow not enabled.
- Promo video: YouTube unlisted `https://youtu.be/ajLg0usGdBU` (component `components/PromoVideo.jsx`).
- PostHog MCP exists (`mcp.posthog.com`); not connected yet. Until then Claude reads PostHog through Claude in Chrome (HogQL via `/api/environments/645820/query/`).
- Meta: Business Manager and ad account exist; no pixel yet (2026-10-17).
- Dog Oasis (partner for the Puppy Promise): dogoasis.com, 812 Meadowlark Lane, Goodlettsville.

## Meta Pixel / dataset (2026-11-05)

- Stellar's own dataset: **"Stellar Roofing || Owned", id `1621301542805399`**, business "Stellar Roofing and Restorations" (`1299918782222559`), created 2026-11-05 by Brandon. Connected 2026-11-05 to Ad Account 2 (`1608227207343251`, shows as "Account 2" in Business Settings) and, from before, to the agency's account `1324812369421225`. Automatic Advanced Matching ON since 2026-11-05. The other dataset in that business, "Stellar Roofing - Nate" (`1635319534704745`), is not ours to use.
- **Live since 2026-11-05** (merge `e6411a6`); verified PageView requests to id 1621301542805399 from www and get. subdomains, and Meta's `last_fired_time` updated. Automatic Advanced Matching was OFF at launch.
- Site code: `components/MetaPixel.jsx` (live hosts only), events via `metaTrack()` in `components/funnel/tracking.js`: PageView, Lead (thank-you pages, Nashville only), Contact (call taps).
- GHL's built-in "Facebook Conversion API" workflow action needs GHL-captured Facebook attribution (it skips with "no attribution data" otherwise) and sends phone numbers, which the privacy policy and A2P wording rule out. Plan instead: server-side CAPI from the site (Lead at submit with the same event id; Purchase via a GHL Won-opportunity webhook), token in Vercel as `META_CAPI_TOKEN`, no phone numbers.
- **Server-side CAPI (built 2026-11-05, branch `meta-capi`):** `lib/metaCapi.js` (Graph v23.0; em/fn/ln/zp/st/country/external_id hashed, fbc/fbp/ip/ua raw, never phone). `funnel-lead` sends Lead (Nashville) with the browser's event id and saves GHL fields `contact.meta_fbc` / `contact.meta_fbp` (created 2026-11-05). `POST /api/meta-conversion` with Custom Data `opportunity_id={{opportunity.id}}` from a GHL workflow (Opportunity Status Changed → Won): looks the opportunity up, sends Purchase (value = opportunity value, event id `won-<id>`) only if Won; Boise skipped. Env: `META_CAPI_TOKEN` (Brandon adds), optional `META_CAPI_TEST_CODE`. Production `GHL_API_TOKEN` must read opportunities: on 2026-11-05 the live endpoint got **401** on `/opportunities/{id}` (the local Token 1 works). Brandon to add View Opportunities, View Contacts and View Custom Fields scopes to the production private integration.
- GHL fields for Meta: `contact.facebook_click_id` (raw fbclid, for the GHL Meta Conversion API action's Custom mapping), `contact.meta_fbc`, `contact.meta_fbp` (all created 2026-11-05). Roofle webhook endpoint: `POST /api/roofle-lead` (tag `roofle-lead`).
- GHL custom value **Meta CAPI Access Token** (`{{ custom_values.meta_capi_access_token }}`, created 2026-11-05 with a placeholder value) feeds every Meta Conversion API workflow step. Brandon pastes the real token there; Claude never handles it.
- GHL pipelines: Facebook Leads, Tennessee, Cold Call Appointments, Idaho, Adverta Leads, Agape. One calendar: Free Roof Inspection (its description still says (629) 277-4249).
- **Meta website audiences (Ad Account 2, created 2026-11-05 by Claude via the connector, all from dataset 1621301542805399, backfilled):** WEB - All visitors 30d / 90d / 180d (Nashville; exclude URLs containing /boise), WEB - Ad funnel visitors 30d (get.thestellarroofing.com), WEB - Roof replacement page visitors 60d, WEB - Storm damage page visitors 60d (storm ads only), WEB - Started form, no lead 30d (FormStart minus Lead), WEB - Tapped to call 30d (Contact), WEB - Website leads 180d (exclude), WEB - Top 25% time on site 30d, WEB - Promo video players 90d (VideoPlay). Pre-existing in the account: "10 Second Promotion Video Views" (engagement), "People who opened form". The other lead-form audiences Brandon mentioned are not in Ad Account 2 (probably the agency's account).
