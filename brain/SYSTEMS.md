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

## GoHighLevel (GHL)

| | |
|---|---|
| Access | API v2 with "Token 1" in `.env.local` (`GHL_API_TOKEN`, `GHL_LOCATION_ID`). Base `https://services.leadconnectorhq.com`, header `Version: 2021-07-28`. Production uses a separate token in Vercel. |
| Lead tags | Ad funnel: `ppc-lead` + `ppc-<slug>`. Main site: `website-lead` + `nashville` or `boise`. Tests: also `test`. |
| Custom fields | `project_type`, `project_urgency`, `your_message`, `landing_page`, `google_click_id`, `wbraid`, `gbraid`, `utm_source/medium/campaign/term/content` |
| Counting leads | `POST /contacts/search` with a `tags contains` filter; print only date, tags, and source. Exclude `test`. |
| Can't do by API | Create or edit workflows; read calendars (no scope). Those happen in the GHL UI. |
| Booking calendar | `https://link.runratedigital.com/widget/booking/QO7LCJe62qeDxjE1VuuP` (Nate's calendar), embedded by `components/funnel/BookingEmbed.jsx` |
| Brandon's tasks | On the contact "Stellar Game Plan (internal)" |
| Test contacts | Fake number 615-555-0142; all tagged `test` for Brandon to delete |

## SEO tools

- OpenSEO (paid plan, credits) with the project set up for thestellarroofing.com. Ask before any batch over 2,000 credits.
- Blog pipeline skill (`blog-pipeline`) driven by `BLOG_CONFIG.md`; posts live in `app/nashville/blog/` and `lib/blog-posts.js`.
- Trusty embeds (project map and gallery) configured in `lib/config.js`.

## iCloud (recurring problem)

The project sits on the iCloud-synced Desktop, and macOS offloads its files. Symptoms: `next dev` prints nothing and never serves; `next build` hangs at "Creating an optimized production build"; a shell command that reads files times out. Check with `find node_modules/next -flags +dataless | head`. Fix: stop the preview, `rm -rf node_modules .next && npm ci`, start the preview again. Use the Read tool, not `cat`, when a shell read hangs.
