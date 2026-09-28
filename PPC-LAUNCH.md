# Google Ads Relaunch Checklist

Written 2026-09-28. The funnel now captures leads into GHL (tested live). This is the campaign rebuild, call tracking, and relaunch. Why each change: [PPC-AUDIT.md](PPC-AUDIT.md).

Account: 373-543-2315 (under "RunRate Manager PPC"). Campaign: "PPC August 11th - Search Leads".

> **Heads-up:** leads currently arrive in GHL **silently**; the `ppc-lead` alert workflow isn't built yet. Until it is, check GHL for `ppc-lead` contacts at least twice a day. Speed to call back decides most roofing leads.

---

## Part A: Campaign settings

In the campaign → **Settings**:

- [ ] **Networks:** Search only. **Uncheck** "Include Google search partners" and "Include Google Display Network".
- [ ] **Locations:** remove anything broad and add these counties: **Davidson, Sumner, Williamson, Rutherford, Wilson, Robertson, Montgomery (TN)**.
- [ ] **Location options** (expand "Location options"): select **"Presence: People in or regularly in your included locations"**. *Not* "Presence or interest"; that's how the Knoxville and Norfolk, VA clicks got in.
- [ ] **Languages:** English only.
- [ ] **Budget:** **$45/day**.
- [ ] **Bidding:** **Maximize clicks** with a **maximum CPC bid limit of $12** for the first 2 weeks. After ~15 recorded conversions, switch to **Maximize conversions**.
- [ ] **Ad schedule:** all day, every day (Stellar answers 24/7).
- [ ] **Auto-tagging:** confirm ON (Admin → Account settings). Needed for gclid.

## Part B: Keywords and ad groups

Rebuild into 4 ad groups. **Phrase match ("…") and exact match ([…]) only; no broad match.** Pause or remove the old ad groups (including "residential roofing companies", which took 51% of spend).

### Ad group 1: Roof Repair → `https://get.thestellarroofing.com/roof-repair`
```
"roof repair near me"
[roof repair near me]
"roof leak repair"
[roof leak repair near me]
"roof repair nashville"
"emergency roof repair"
"roof leak" "near me"
"roofer for leak"
"fix roof leak"
"roof repair company"
```

### Ad group 2: Roof Replacement → `https://get.thestellarroofing.com/roof-replacement`
```
"roof replacement near me"
[roof replacement near me]
"roof replacement nashville"
"new roof near me"
"roof installation near me"
"replace my roof"
"new roof cost nashville"
"roof replacement company"
```

### Ad group 3: Storm & Hail → `https://get.thestellarroofing.com/storm-damage`
Keep the existing hail keywords (roof hail damage, hail damage roof repair, and so on) and add:
```
"storm damage roof repair"
"wind damage roof"
"storm damage roofer"
"roof damage from storm"
```
*(No gutter or dog offers in these ads; see the insurance note in TODO.md.)*

### Ad group 4: Roofers / Roofing Company → `https://get.thestellarroofing.com/`
```
[roofers near me]
"roofers near me"
"roofing company near me"
"roofing contractors near me"
"roofing company nashville"
"roofers nashville"
"roofing company hendersonville"
"roofing company goodlettsville"
"roofing company murfreesboro"
"roofing company franklin tn"
"roofing company clarksville tn"
"roofing company gallatin"
"roofing company mt juliet"
```

### Negative keywords
Add at the **campaign** level: the full list in PPC-AUDIT.md (reviews, jobs, home depot, lowes, supply, DIY, rv, shed, mobile home, grants, out-of-area cities, Spanish terms, and so on), plus competitor names from the search terms report (exact match).

## Part C: Ads (Responsive Search Ads)

All headlines are ≤30 characters and descriptions ≤90, already checked. Pin nothing; let Google test.

**Shared headlines (use in every ad group):**
`Free Roof Inspection` · `We Match Any Written Quote` · `Licensed & Insured Roofers` · `Lifetime Workmanship Warranty` · `Local Goodlettsville Roofer` · `Open 24/7 - Call Now` · `Photos of Everything We Find`

**Add per ad group:**
- **Repair:** `Roof Repair in Nashville` · `Roof Leak? Call Us 24/7` · `Honest Repairs, No Upsell`
- **Replacement:** `Free Gutters With New Roof` · `Dog Spa Day on Install Day` · `Roof Replacement Nashville` · `New Roof in Nashville`
- **Storm:** `Storm & Hail Roof Damage` · `Free Storm Damage Inspection` · `We Meet Your Adjuster On-Site`
- **Roofers:** `Nashville Roofing Company` · `Trusted Middle TN Roofers` · `Free Gutters With New Roof`

**Descriptions:**
- All: `Free inspection with photos of everything we find. We'll match any written quote.`
- All: `Licensed, insured and local to Goodlettsville. Lifetime workmanship warranty.`
- Replacement + Roofers: `Replace your roof with us: free seamless gutters plus a dog spa day at Dog Oasis.`
- Repair: `Leak or damage? We find the source and fix what's broken. Free inspection, no pressure.`
- Storm: `Hail or wind damage? Free inspection with photos, and we can meet your adjuster on-site.`
- Roofers: `Get your other quotes, then bring us the best one. We'll match it, apples to apples.`

## Part D: Assets (campaign level)

- [ ] **Call asset:** (629) 277-4249. Turn **call reporting ON** so Google gives the ad a forwarding number and tracks calls. *(Switch to the GHL number once A2P is approved.)*
- [ ] **Sitelinks:** Roof Repair → `/roof-repair` · New Roof + Free Gutters → `/roof-replacement` · Storm Damage → `/storm-damage` · Free Inspection → `/`
- [ ] **Callouts:** Free Roof Inspection · Price Match Guarantee · Lifetime Workmanship Warranty · Licensed & Insured · Open 24/7 · Locally Owned
- [ ] **Structured snippet (Services):** Roof Repair, Roof Replacement, Storm Damage, Leak Repair, Roof Inspection, Commercial Roofing

## Part E: Call tracking (conversions)

### E1. Calls from the ad itself (the call asset)
- [ ] Goals → Conversions → **+ New conversion action → Phone calls → "Calls from ads using call assets"**.
  - Name: `Calls from ads (60s+)` · Value: **$300** · Count: **One** · Call length: **60 seconds** · Primary.

### E2. Taps on the phone number on the landing pages
The funnel now pushes a `phone_call_click` event every time someone taps a call button.
- [ ] **Google Ads:** Goals → Conversions → **+ New conversion action → Website → Add a conversion action manually**:
  - Name: `Funnel Call Tap` · Category: **Phone call lead** · Value: **$150** · Count: **One** · Primary.
  - Choose **"Use Google Tag Manager"** and copy the **Conversion ID** (18377143790) and the new **Conversion label**.
- [ ] **GTM** (container GTM-MCP6RQRL):
  - **Trigger:** New → **Custom Event** → Event name: `phone_call_click` → All Custom Events → Save as `CE – phone_call_click`.
  - **Tag:** New → **Google Ads Conversion Tracking** → Conversion ID `18377143790`, the new label → Trigger: `CE – phone_call_click` → Save as `Ads – Funnel Call Tap`.
  - **Submit and Publish** the container. Preview alone doesn't go live. Tell Claude when it's published, and Claude verifies the live container.

### E3. The form lead (already set up)
"PPC Funnel Lead" fires on `generate_lead` from the thank-you pages. Nothing to change. It flips from Inactive to Active after the first real ad lead.

### E4. GA4
- [ ] After the first lead, in GA4 → Admin → Events, mark `generate_lead` as a **key event**.
- [ ] Link Google Ads ↔ GA4 (GA4 Admin → Product links → Google Ads links).

## Part F: Relaunch and watch

- [ ] Turn the campaign on at **$45/day**.
- [ ] **Every 2–3 days for 2 weeks:** export the **Search terms** report (and Keywords + Conversions if easy) and send it to Claude. Claude flags new negatives and wasted spend.
- [ ] **Stop rule:** if **60+ clicks** come in with **no leads or calls**, pause and review before spending more.
- [ ] **Target:** $100–250 per lead. At ~$8–10 per click, that's roughly 1 lead per 15–25 clicks.
