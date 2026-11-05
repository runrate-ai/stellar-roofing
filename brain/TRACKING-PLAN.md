# Stellar tracking plan: Meta pixel, Conversions API, audiences (2026-11-05)

Goal: catch every person who comes from Facebook (lead form or website), send Meta each important step **once, from one place**, and build audiences from it. Nashville / Middle TN only.

## What we found

- **Pixel is live** on the site and funnel: dataset "Stellar Roofing || Owned", `1621301542805399` (PageView, Lead, Contact).
- **Facebook lead-form leads already reach GHL**: 21 of the last 100 contacts (Oct 19 to Nov 5) have source "Facebook" and tag `fb lead`. GHL holds Meta's lead ID for them.
- Other channels in GHL: Premura cold callers (34, tag `premura`, 33 with `premura.appt`), GlassHouse texting (4), website forms (4). No Roofle-tagged contacts.
- The course (Skool, "L5 - Conversion Tracking & Pixels") sends CAPI from a **GHL workflow** with the built-in **Meta Conversion API** action. Fields: event type (Funnel Event / Lead Event), access token, dataset ID, event name, value, currency, test code, and **Custom mapping** (FBCLID for funnel events, Facebook Lead ID for lead events).
- Roofle (RoofQuote PRO) can send each finished quote to a webhook URL ("Contact Form Completed", portal → Developer tab).

## One owner per event (so nothing doubles)

| Event | When | Sent by |
|---|---|---|
| PageView | Every website / funnel page | Website pixel (live). This is what catches lead-form-ad viewers who also visit the site. |
| Contact | Tap to call | Website pixel (live) |
| Lead (website or funnel form) | Form submitted | Website pixel + website server copy, same event ID (code live; needs `META_CAPI_TOKEN`). GHL's "Form Submitted" trigger doesn't see these forms, they arrive by webhook. |
| FormStart (custom) | Started the website form | Website pixel (to add) |
| VideoPlay (custom) | Played the promo video on the site | Website pixel (to add) |
| Lead (Roofle) | Instant quote finished | Roofle webhook → new website endpoint → GHL contact tagged `roofle-lead` + server Lead (to add) |
| Lead (Facebook lead form) | Form submitted on Facebook | Meta records it itself. Nothing to send. |
| **Schedule** | Appointment booked on the GHL calendar | **GHL workflow → Meta Conversion API action** |
| **Purchase** (job value) | Opportunity marked Won (Tennessee) | **GHL workflow → Meta Conversion API action** |
| Lead stages (optional) | e.g. inspection booked, sold, for lead-form leads | GHL workflow, Lead Event type with stage names. Feeds Meta's "Conversion leads" optimization for lead-form campaigns. |

Inside each GHL workflow, branch by where the contact came from:
- **Facebook lead form** (source Facebook / tag `fb lead`): event type **Lead Event** (uses the lead ID GHL already has).
- **Website or funnel with a Facebook click**: event type **Funnel Event**, Custom mapping FBCLID = `{{contact.facebook_click_id}}` (new field the website fills).
- **Everyone else** (Premura, GlassHouse, Google, organic): not sent. They didn't come from Facebook; GHL's action skips contacts with no Facebook data anyway.

Retire the website's own Won-deal endpoint (`/api/meta-conversion`) so Purchase has a single owner (GHL).

## Privacy

GHL's action sends hashed phone numbers, so the privacy policy line "We never send your phone number to Meta" has to change. Proposed: contact details (email, phone, name, ZIP) may be sent to Meta in hashed form to measure ads; SMS opt-in data and consent are never shared. Keep the A2P sentence about mobile information. Brandon's call; a lawyer can confirm alongside the cold-texting question.

## Who does what

1. **Claude (code, push on Brandon's go):** save the raw Facebook click ID in a new GHL field `facebook_click_id`; add FormStart and VideoPlay pixel events; Roofle webhook endpoint; remove `/api/meta-conversion`; privacy wording.
2. **Brandon (about 5 minutes):** in Events Manager connect the dataset to Ad Account 2, turn on Automatic Advanced Matching, generate the access token and add it in Vercel as `META_CAPI_TOKEN`; in the Roofle portal (Developer tab) add the webhook URL Claude gives.
3. **Claude in Brandon's Chrome:** build the GHL workflows "CAPI - Appointment Booked" and "CAPI - Closed Won" (and optional lead stages). Brandon pastes the access token into each action (Claude never handles tokens).
4. **Test** with a Test Events code, then remove the code.

## Audiences

Already built: lead form opened; opened but not submitted; submitted; Facebook Page visitors.

Website (pixel, live now):
- All website visitors: 30, 90 and 180 days
- Funnel visitors (get.thestellarroofing.com): 30 days
- Replacement or storm-damage page visitors: 60 days
- Started the website form but no Lead (FormStart minus Lead): 30 days
- Tapped to call (Contact): 30 days
- Website leads (Lead): 180 days, for excluding
- Top 25% by time on site: 30 days
- Promo video players on the site (VideoPlay)

Meta engagement:
- Viewed 50% / 75% of your video ads: 30 and 90 days
- Instagram engagers: 365 days
- People who messaged the Page
- People who saved a post or ad

Customer lists (kept in sync from GHL with the "Add to Facebook Custom Audience" workflow action):
- Past customers (Won, plus the ~145 past jobs in JobNimbus): exclude, and seed for lookalikes
- Booked appointments: lookalike seed
- Bad leads / Lost: exclude
- Open leads: exclude from cold ads

Lookalikes (US, with the ad set limited to Middle TN): 1–3% of past customers; 1% of booked appointments; 1% of website leads. Meta needs at least 100 matched people per seed.

Retargeting combinations:
- Website visitors 30 days, excluding leads: free inspection ad
- Lead form opened but not submitted: reminder ad
- Video 50% viewers, excluding leads: offer ad
