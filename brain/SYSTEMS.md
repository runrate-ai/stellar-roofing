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
| FB lead voice sequence (drafts, 2026-11-10) | `1.4 FB Lead - Voice AI No-Reply Sequence (14 days)` (id `dc7228fc-b07b-41f8-a449-25f60a920bdd`) and `1.4a FB Lead - Exit Voice Sequence (replied or booked)` (id `27fffc14-9707-4f2b-b64c-cedff4afe530`). Voice AI agents: "Dakota - Outbound Calling" (`6ac66d8208a6a97abdff4dea`, no number assigned; the workflow action sets the caller ID). Conversation AI agent: "Stellar Roofing AI Assistant" (`v0vvESnqgD8AG9knjxA9`, outbound trigger = Facebook/Instagram lead form, own follow-ups at 30 min and 1 day, stops after booking). Phone numbers: Main Stellar Number +1 629-356-4290 (default, A2P verified), "Brandon's number" +1 208-314-6572. Voicemail files in GHL Media Storage: `stellar-vm-a.mp3`, `stellar-vm-b.mp3`. |
| Facebook Leads pipeline (2026-11-10) | `1F7WKD6FFVUuNMQjxTBn`. Stage ids: New Lead `a5373a7e-0807-41fc-bdf9-191a02c1ccac`, AI Follow-Up Sequence `b115b7f7-a0ad-43a3-ab23-54f7d3316535`, No Response - 14 Days `411fe40e-5314-4a0a-a03d-3d2ac92266a1`, Responded `1b2b21f2-f7af-400c-8acd-d2fb843ad9c2`, Appointment Booked `33562431-2d89-4557-b5da-6df43b80e197`, No-Show `6083f424-0e4c-4327-8137-1b410a73c42b`, Dakota Called `482ebf0a-…`, No answer - SMS sent `a53734a4-…`. Workflow `1.4b FB Lead - Booked (exit sequence, Appointment Booked stage)` id `37df5087-dc38-440c-b088-7e9bac2beeda`. API: GET `/contacts/{id}/appointments` and PUT `/opportunities/{id}` work with Token 1. |
| GHL dashboard "Stellar KPIs" (2026-11-10) | id `6af37692221fe50f64aec24c` (Dashboard > picker). Meta tiles read the ad account set in Settings > Integrations > Facebook > Manage > Settings > Ad Account ("Select ad account for reporting"), now **Stellar Roofing and Restorations 1324812369421225** (was Account 2 until 2026-11-10). If a Meta tile shows stale numbers, open Edit dashboard > tile > Edit > Integration, pick another account, Save, pick Stellar again, Save. |
| Lead tags (2026-11-10) | Source tags: `fb lead`, `messenger lead`, `phone lead`, `glasshouse lead`, `premura` (+`premura.appt`), `website-lead`, `ppc-lead`, `roofle-lead`, `form submission lead`, `adverta.lead`, `chat widget lead`, `instagram lead`, `referral lead`. Status tags: `responded`, `booked`, `ghosted`. Dashboard tiles filter on these (GHL tile filters allow Tags once per tile, operator 'Is one of'). Draft workflows 2.1 `9a7c8e96-d35f-490f-9acc-7d602b60bc3e`, 2.2 `8aa51be8-9a5e-4cda-879b-d43b4f79c439`, 2.3 `96babf3c-e0a7-4476-a578-6bbfe614b6c0`, 2.4 `fa597649-4ca5-4559-857f-5fe66904a9c5`, 2.5 `014fbbb5-0edf-4a73-b662-2f1b66344277`, 2.6 `2d73f621-789f-4dd7-8159-93242115c9a7`. GlassHouse: native GHL integration, Source = 'GlassHouse', no tag option on their side. |
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

- Stellar's own dataset: **"Stellar Roofing || Owned", id `1621301542805399`**, business "Stellar Roofing and Restorations" (`1299918782222559`), created 2026-11-05 by Brandon. Connected to the right ad account, **"Stellar Roofing and Restorations" `1324812369421225`** (confirmed 2026-11-05 via the connector), and also to "Account 2" `1608227207343251` (the wrong account, connected by mistake on 2026-11-05; harmless). Automatic Advanced Matching ON since 2026-11-05. The other dataset in that business, "Stellar Roofing - Nate" (`1635319534704745`), is not ours to use.
- **Live since 2026-11-05** (merge `e6411a6`); verified PageView requests to id 1621301542805399 from www and get. subdomains, and Meta's `last_fired_time` updated. Automatic Advanced Matching was OFF at launch.
- Site code: `components/MetaPixel.jsx` (live hosts only), events via `metaTrack()` in `components/funnel/tracking.js`: PageView, Lead (thank-you pages, Nashville only), Contact (call taps).
- GHL's built-in "Facebook Conversion API" workflow action needs GHL-captured Facebook attribution (it skips with "no attribution data" otherwise) and sends phone numbers, which the privacy policy and A2P wording rule out. Plan instead: server-side CAPI from the site (Lead at submit with the same event id; Purchase via a GHL Won-opportunity webhook), token in Vercel as `META_CAPI_TOKEN`, no phone numbers.
- **Server-side CAPI (built 2026-11-05, branch `meta-capi`):** `lib/metaCapi.js` (Graph v23.0; em/fn/ln/zp/st/country/external_id hashed, fbc/fbp/ip/ua raw, never phone). `funnel-lead` sends Lead (Nashville) with the browser's event id and saves GHL fields `contact.meta_fbc` / `contact.meta_fbp` (created 2026-11-05). `POST /api/meta-conversion` with Custom Data `opportunity_id={{opportunity.id}}` from a GHL workflow (Opportunity Status Changed → Won): looks the opportunity up, sends Purchase (value = opportunity value, event id `won-<id>`) only if Won; Boise skipped. Env: `META_CAPI_TOKEN` (Brandon adds), optional `META_CAPI_TEST_CODE`. Production `GHL_API_TOKEN` must read opportunities: on 2026-11-05 the live endpoint got **401** on `/opportunities/{id}` (the local Token 1 works). Brandon to add View Opportunities, View Contacts and View Custom Fields scopes to the production private integration.
- GHL fields for Meta: `contact.facebook_click_id` (raw fbclid, for the GHL Meta Conversion API action's Custom mapping), `contact.meta_fbc`, `contact.meta_fbp` (all created 2026-11-05). Roofle webhook endpoint: `POST /api/roofle-lead` (tag `roofle-lead`).
- GHL custom value **Meta CAPI Access Token** (`{{ custom_values.meta_capi_access_token }}`, created 2026-11-05 with a placeholder value) feeds every Meta Conversion API workflow step. Brandon pastes the real token there; Claude never handles it.
- GHL pipelines: Facebook Leads, Tennessee, Cold Call Appointments, Idaho, Adverta Leads, Agape. One calendar: Free Roof Inspection (its description still says (629) 277-4249).
- **Right ad account (Brandon, 2026-11-05): "Stellar Roofing and Restorations" `1324812369421225`.** WEB audiences recreated there 2026-11-05: All visitors 180d (52555836662901), Ad funnel visitors 30d (52555836670701), Started form no lead 30d (52555836680101), Tapped to call 30d (52555836685901), Website leads 180d exclude (52555836689101), Reached form step 2 no lead 30d (52555836840501), Engaged visitors 60d (52555836842501). Plus (after Brandon's OK): All visitors 30d (52555837063701), All visitors 90d (52555837067301), Roof replacement page 60d (52555837071901), Storm damage page 60d (52555837072901), Top 25% time on site 30d (52555837074101), Promo video players 90d (52555837075501), Opened Roofle quote 30d (52555837077501), Opened chat 30d (52555837078101). All 15 active. Already in that account from the agency/Brandon: Opened Form, Opened but didnt submit, People who opened and submitted form, People who engaged with any post or ad - 365, who engaged with page - 365.
- **Meta website audiences in the WRONG account ("Account 2", created 2026-11-05 by Claude via the connector, all from dataset 1621301542805399, backfilled):** WEB - All visitors 30d / 90d / 180d (Nashville; exclude URLs containing /boise), WEB - Ad funnel visitors 30d (get.thestellarroofing.com), WEB - Roof replacement page visitors 60d, WEB - Storm damage page visitors 60d (storm ads only), WEB - Started form, no lead 30d (FormStart minus Lead), WEB - Tapped to call 30d (Contact), WEB - Website leads 180d (exclude), WEB - Top 25% time on site 30d, WEB - Promo video players 90d (VideoPlay). Added later the same day (events live 17:28 CT): WEB - Reached form step 2, no lead 30d (FormStep2 minus Lead, 120257660570580196), WEB - Engaged visitors 60d (EngagedVisit, 120257660570740196), WEB - Opened Roofle quote 30d (RoofleOpen, 120257660570830196), WEB - Opened chat 30d (ChatOpen, 120257660570940196). Pre-existing in the account: "10 Second Promotion Video Views" (engagement), "People who opened form". The other lead-form audiences Brandon mentioned are not in Ad Account 2 (probably the agency's account).
