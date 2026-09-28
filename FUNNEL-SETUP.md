# PPC Funnel — Setup & Launch Checklist

Paid-traffic landing pages for Google Ads. **Market: Nashville / Middle
Tennessee only** — Boise has no paid campaign.

## Landing pages, one per ad group

Keyword research (Aug 2026) put replacement intent at only ~9% of campaign
volume, so each ad group gets a page whose hero answers the search that
produced the click. The free-gutters offer lives on the replacement page and
nowhere else — repair searchers don't want a new roof, and leading with one
reads as an upsell.

| Ad group | Ad destination URL | Hero leads with |
|---|---|---|
| Generic hire + comparison | `get.thestellarroofing.com/` | Price beat + free inspection |
| Roof replacement | `get.thestellarroofing.com/roof-replacement` | Free gutters |
| Roof repair & leaks | `get.thestellarroofing.com/roof-repair` | "We'll fix it — not upsell you" |
| Storm & hail | `get.thestellarroofing.com/storm-damage` | Free documented assessment |

Local preview: `http://localhost:3000/lp/<slug>`

All copy lives in [`lib/funnels.js`](lib/funnels.js) — one entry per variation.
Adding a fifth ad group is a config entry, not a new page; the route, static
generation, and subdomain rewrite pick it up automatically.

---

## 1. Point the subdomain at Vercel

DNS is at **GoDaddy** (`ns55/ns56.domaincontrol.com`), hosting is **Vercel**.

### Step A — Add the domain in Vercel

1. Vercel dashboard → **stellar-roofing** project
2. **Settings → Domains → Add**
3. Enter `get.thestellarroofing.com` and confirm
4. Vercel shows the CNAME target it wants — **copy the exact value it gives
   you**, don't reuse one from this doc

### Step B — Create the record in GoDaddy

GoDaddy → **My Products → Domains → thestellarroofing.com → DNS → Add New Record**

| Field | Value |
|---|---|
| Type | `CNAME` |
| Name | `get` |
| Value | *(the target Vercel gave you)* |
| TTL | 1 hour |

> **Name is `get`, not the full hostname.** GoDaddy appends the domain
> automatically — entering the full hostname creates
> `get.thestellarroofing.com.thestellarroofing.com`.

### Step C — Verify

```bash
dig +short get.thestellarroofing.com
```

Once it returns a `vercel-dns` target, SSL auto-issues within a minute or two.
**Don't send traffic before the padlock is live** — ads pointed at an
uncertified domain get disapproved.

### Renaming the subdomain

Change `FUNNEL_SUBDOMAIN` in [`middleware.js`](middleware.js) — one string.
Then add the new domain in Vercel, point the CNAME, redeploy. Nothing else
references it.

### How routing works

`middleware.js` rewrites `get.*` hosts into the `/lp` tree:

```
get.thestellarroofing.com/                      →  /lp/nashville-roofing
get.thestellarroofing.com/roof-repair           →  /lp/roof-repair
get.thestellarroofing.com/roof-repair/thank-you →  /lp/roof-repair/thank-you
```

A **rewrite, not a redirect** — the URL bar keeps showing the clean subdomain
and `gclid` survives. Unknown slugs 404 rather than serving a blank page.

---

## 2. The lead form

Since 2026-09-28 the form is the site's own 3-step form
([`components/funnel/FunnelForm.jsx`](components/funnel/FunnelForm.jsx)), not
the GHL AI Studio iframe it replaced. The iframe scrolled inside a fixed box on
phones, and $1,821 of ad spend produced no CRM leads (see PPC-AUDIT.md).

How a lead flows:
1. The form captures `gclid`, `wbraid`, `gbraid`, and the UTMs from the landing
   URL on load, then collects project type, ZIP (+ optional address and
   timeline), name, phone, and optional email.
2. It posts to `/api/funnel-lead`, which upserts the GHL contact through the
   GHL API: tag `ppc-lead` plus `ppc-<slug>`, source `PPC Funnel – <ad group>`,
   custom fields Project Type, Project Urgency, Google Click ID, wbraid,
   gbraid, utm_*, and Landing Page, and a summary note.
3. On success the visitor lands on the thank-you page, which fires
   `generate_lead`. On failure the form shows the phone number instead.

**Required env vars** (Vercel → Settings → Environment Variables, Production):
`GHL_API_TOKEN` (Private Integration "Website – PPC Lead Form (Vercel)", scopes
contacts.write + contacts.readonly) and `GHL_LOCATION_ID`.

Notifications are a GHL workflow triggered by "Contact Tag Added: ppc-lead".

Test: load `get.thestellarroofing.com/?gclid=TEST123`, submit, and confirm the
contact in GHL has the tag, Google Click ID = TEST123, and the note.

---

## 3. Conversion tracking

GTM (`GTM-MCP6RQRL`) loads on every funnel page.

Because the form is a cross-origin iframe, **GTM cannot see the submit**. The
thank-you page is the conversion signal instead:

1. In the GHL form settings, set the post-submit redirect to
   `https://get.thestellarroofing.com/<slug>/thank-you`
   — matching the slug the visitor came from
2. That page fires `generate_lead` into `dataLayer` via
   [`ConversionEvent.jsx`](components/funnel/ConversionEvent.jsx)
3. In GTM, trigger the Google Ads conversion tag on `generate_lead`

The event carries `funnel_slug` and `funnel_ad_group`, so conversions break
down **per ad group** rather than showing only a campaign-level total.

---

## 4. Pre-launch checklist

- [ ] `get.thestellarroofing.com` resolves with a valid certificate
- [x] Form renders inside the iframe — confirmed 2026-08-09
- [ ] **Auto-tagging is ON** in Google Ads (Settings → Account settings), or
      `gclid` is never appended to the landing URL in the first place
- [ ] `gclid` maps to a GHL hidden field — verified on a real test submission
- [ ] Post-submit redirect points at the matching `/<slug>/thank-you`
- [ ] `generate_lead` fires (GTM Preview mode)
- [ ] Google Ads conversion action created and linked
- [ ] **Real reviews replace the placeholders** (§6)
- [ ] Trust assets added (§5)
- [ ] Legal review of offer fine print and storm/insurance copy (§7)
- [ ] Tested on a real phone — most roofing PPC traffic is mobile

---

## 5. Trust assets

All trust signals live in [`lib/funnel-trust.js`](lib/funnel-trust.js), **off
by default**. Each turns on when its real asset is in place. The hero shows a
`TrustRow` under the headline, deliberately above the fold on mobile.

### Owens Corning badge

1. Save the badge PNG (transparent) to
   `public/images/badges/owens-corning-preferred.png`
2. Set the `owens-corning` entry to `enabled: true`

> Only enable if the contractor status is **current**, and use the exact tier
> badge — Platinum and Preferred aren't interchangeable. Manufacturer badges
> are licensed marks; displaying one you don't hold is trademark misuse and
> grounds for ad disapproval.

### Completed job photos

Drop files in `public/images/projects/`, then add entries to `projectPhotos`:

```js
{
  src: '/images/projects/brentwood-replacement.jpg',
  alt: 'New architectural shingle roof on a Brentwood home',
  city: 'Brentwood, TN',
  service: 'Roof Replacement',
}
```

The gallery stays hidden while the array is empty. `city` and `service` render
on the page — they're factual claims and must match the real job.

**Photos that convert:** before/after pairs beat finished-only shots;
whole-house framing beats roof close-ups; 6–9 is plenty; shoot landscape (the
grid crops 4:3).

> `public/images/project-01.jpg` and `project-02.jpg` are **stock images**, not
> Stellar's work — `project-01` is a Pacific Northwest home. Neither is wired
> into the funnel and neither should be captioned as a completed job.

### Google rating

Set `googleRating` to `enabled: true` with the real rating and count from the
Google Business Profile. Keep it current — a stale count is a false claim.

---

## 6. ⚠️ Placeholder reviews — fix before launch

`client-data/reviews/reviews.json` contains **five invented testimonials**,
each flagged `"placeholder": true`. The funnel filters them out, so **the
testimonial section renders empty**. That's deliberate: invented reviews on a
paid-traffic page are deceptive advertising with real FTC exposure.

This matters most for the **generic/comparison ad group** — ~730 searches/month
for "best roofers near me" and similar land on a page with no reviews at all.

Replace with genuine Google reviews and drop the `placeholder` flag.

---

## 7. Offer fine print & legal review

Fine print is per-variation in [`lib/funnels.js`](lib/funnels.js) and renders in
the funnel footer.

**Price beat guarantee** is scoped to a *comparable written estimate from a
licensed and insured Tennessee contractor, same scope and materials, presented
before contract signing.* Without that qualifier the guarantee is open-ended
and a competitor's stripped-down bid can force you underwater on a job you're
obligated to beat.

**Storm/insurance copy** is written carefully: the page says Stellar documents
damage, provides a written estimate, and can meet an adjuster on site — and
explicitly states it is **not a public adjuster** and does not file, negotiate,
or adjust claims. Tennessee restricts unlicensed public adjusting, and
contractor storm-damage marketing is an area regulators watch.

**Have your attorney or insurer review both before spend starts.** This was
written to be protective, not as legal advice.

---

## 8. Adding another ad group

1. Add an entry to `funnels` in [`lib/funnels.js`](lib/funnels.js)
2. Rebuild — the route, static page, and subdomain path all follow

Anything under `/lp` automatically renders without site nav, footer, or the
Roofle widget ([`components/SiteChrome.jsx`](components/SiteChrome.jsx)).

---

## Local development

System Node is v25, which Next.js 14 **cannot run** — `next dev` hangs with no
output. Node 20 is installed alongside it:

```bash
PATH="/opt/homebrew/opt/node@20/bin:$PATH" npm run dev
```
