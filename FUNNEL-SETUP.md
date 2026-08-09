# PPC Funnel — Setup & Launch Checklist

Paid-traffic landing page for Google Ads, Nashville market.

- **Public URL (after DNS):** `https://get.thestellarroofing.com`
- **Route in this repo:** `/lp/nashville-roofing`
- **Local preview:** `http://localhost:3000/lp/nashville-roofing`

---

## 1. Point the subdomain at Vercel

Your DNS is at **GoDaddy** (`ns55/ns56.domaincontrol.com`), hosting is **Vercel**.
The subdomain is added in Vercel first, then pointed from GoDaddy.

### Step A — Add the domain in Vercel

1. Vercel dashboard → the **stellar-roofing** project
2. **Settings → Domains → Add**
3. Enter `get.thestellarroofing.com` and confirm
4. Vercel shows the DNS record it wants — a **CNAME** target that looks like
   `cname.vercel-dns.com` or a project-specific value. **Copy the exact value
   Vercel shows you**; don't reuse the one in this doc.

Leave that screen open — it live-checks the record and flips to "Valid" once
GoDaddy propagates.

### Step B — Create the record in GoDaddy

1. GoDaddy → **My Products → Domains → thestellarroofing.com → DNS**
2. **Add New Record**

   | Field | Value |
   |---|---|
   | Type | `CNAME` |
   | Name | `get` |
   | Value | *(the target Vercel gave you)* |
   | TTL | 1 hour |

3. Save.

> **Name is `get`, not the full hostname.** GoDaddy appends the domain
> automatically — entering `get.thestellarroofing.com` creates
> `get.thestellarroofing.com.thestellarroofing.com`.

### Step C — Wait, then verify

Propagation is usually 5–30 minutes. Check from your terminal:

```bash
dig +short get.thestellarroofing.com
```

Once it returns a `vercel-dns` target, Vercel auto-issues the SSL certificate
(another minute or two). The domain shows **Valid Configuration** with SSL when
it's done. Don't send traffic before the padlock is live — ads pointed at an
uncertified domain get disapproved.

### How the routing works

`middleware.js` rewrites any request whose `Host` starts with `get.` into the
`/lp/nashville-roofing` route tree:

```
get.thestellarroofing.com/           →  /lp/nashville-roofing
get.thestellarroofing.com/thank-you  →  /lp/nashville-roofing/thank-you
```

It's a **rewrite, not a redirect** — the visitor's URL bar keeps showing the
clean subdomain, and `gclid` / UTM query params survive to the form.

---

## 2. Connect the form to GoHighLevel — **required before launch**

The form posts to `/api/funnel-lead`, which forwards to a GHL inbound webhook.
**Until this is set, every submission fails** (by design — the form then shows
a "call us instead" fallback rather than silently swallowing the lead).

1. In GHL: **Automation → Workflows → Create Workflow**
2. Trigger: **Inbound Webhook** → copy the generated URL
3. In Vercel: **Settings → Environment Variables** → add

   | Key | Value |
   |---|---|
   | `GHL_WEBHOOK_URL` | *(the webhook URL)* |

   Apply to Production, Preview, and Development.
4. Redeploy (env vars only take effect on a new deployment).
5. For local testing, copy `.env.example` to `.env.local` and paste the same URL.

### Fields delivered to GHL

Contact: `full_name`, `phone` (10-digit normalized), `email`, `address`,
`postal_code`, `city`, `state`

Qualification: `project_type`, `timeline`, `offer_claimed`

Attribution: `source`, `landing_page`, `gclid`, `wbraid`, `gbraid`,
`utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`,
`referrer`, `submitted_at`

`gclid` is the important one — it's what lets Google Ads tie a closed job back
to the exact click that produced it.

---

## 3. Conversion tracking

GTM (`GTM-MCP6RQRL`) loads on the funnel. The form pushes to `dataLayer`:

| Event | Fires when |
|---|---|
| `funnel_form_start` | First interaction with any field |
| `funnel_form_step` | Each step advance (`funnel_step`: 1–3) |
| `generate_lead` | Successful submission |

In GTM, create a **Google Ads Conversion** tag triggered on `generate_lead`,
then set that conversion as the optimization goal in your campaign.

`funnel_form_start` vs `generate_lead` gives you step-level drop-off — if
people start but never finish, the friction is in steps 2–3.

---

## 4. Pre-launch checklist

- [ ] `get.thestellarroofing.com` resolves and shows the padlock
- [ ] `GHL_WEBHOOK_URL` set in Vercel + redeployed
- [ ] **Submit a real test lead and confirm it lands in GHL**
- [ ] `generate_lead` fires (GTM Preview mode)
- [ ] Google Ads conversion action created and linked
- [ ] **Replace the placeholder reviews** (see below)
- [ ] Legal review of the offer fine print
- [ ] Test on a real phone — most PPC roofing traffic is mobile

---

## ⚠️ Placeholder reviews — must fix before launch

`client-data/reviews/reviews.json` currently contains **five invented
testimonials**, each flagged `"placeholder": true`.

The funnel filters these out, so **the testimonial section renders empty
right now** — that's deliberate. Publishing invented reviews on a page
running paid traffic is deceptive advertising and carries real FTC exposure.

To turn the section on, replace them with genuine reviews and drop the
`"placeholder": true` flag:

```json
{
  "name": "James R.",
  "rating": 5,
  "text": "…their actual words…",
  "date": "2026-01-15",
  "service": "Roof Replacement",
  "city": "Nashville",
  "source": "Google"
}
```

Pull real ones from the Google Business Profile. First names + last initial is
fine and standard practice.

---

## 5. Trust assets — Owens Corning badge & job photos

All trust signals live in [`lib/funnel-trust.js`](lib/funnel-trust.js) and are
**off by default**. Each turns on when its real asset is in place.

The hero shows a `TrustRow` directly under the headline — deliberately above
the fold on mobile, since the full trust bar further down the page is never
seen by most paid visitors.

### Owens Corning badge

1. Save the badge PNG (transparent background) to
   `public/images/badges/owens-corning-preferred.png`
2. In `lib/funnel-trust.js`, set the `owens-corning` entry to `enabled: true`

It then renders in the hero trust row at 48px tall.

> Only enable this if the Owens Corning contractor status is **current**.
> Manufacturer program badges are licensed marks — displaying one you don't
> hold is trademark misuse and grounds for Google Ads disapproval. If the
> status is Platinum or Preferred specifically, use that exact badge; they
> aren't interchangeable.

### Completed job photos

1. Drop photos in `public/images/projects/`
2. Add an entry per photo to `projectPhotos` in `lib/funnel-trust.js`:

```js
{
  src: '/images/projects/brentwood-replacement.jpg',
  alt: 'New architectural shingle roof on a Brentwood home',
  city: 'Brentwood, TN',
  service: 'Roof Replacement',
}
```

The gallery section stays hidden while the array is empty. City and service
must match the actual job — those captions are factual claims.

**Photo tips that move conversion:** before/after pairs beat finished-only
shots; include the whole house rather than roof close-ups so homeowners can
picture their own; 6–9 photos is plenty. Shoot landscape — the grid crops to
4:3.

### ⚠️ The two existing project photos are stock

`public/images/project-01.jpg` and `project-02.jpg` are **stock images**, not
Stellar's work — `project-01` is a Pacific Northwest home with cedars and
conifers, nothing like Middle Tennessee. Neither is wired into the funnel and
neither should be captioned as a completed job.

### Google rating

Set `googleRating` in `lib/funnel-trust.js` to `enabled: true` with the real
rating and review count from the Google Business Profile. Keep the number
current — a stale count is a false claim.

---

## 6. Offer fine print

Both offers carry qualifying language, rendered in the funnel footer and
defined in `app/lp/nashville-roofing/page.js` as `OFFER_FINE_PRINT`.

The price-beat guarantee is scoped to a **comparable written estimate from a
licensed and insured Tennessee contractor, same scope and materials, presented
before contract signing.** Without that qualifier the guarantee is open-ended
and a competitor's stripped-down bid can force you underwater on a job you're
contractually obligated to beat.

**Have your attorney or insurer read this before spend starts.** I wrote it to
be protective, not to be legal advice.

---

## 7. Adding more funnels

The structure is reusable — e.g. a Boise funnel or a storm-damage variant:

1. Create `app/lp/<slug>/page.js` (copy the Nashville one)
2. Reuse `components/funnel/` — `FunnelHeader`, `FunnelFooter`, `FunnelForm`
3. For a separate subdomain, extend the host map in `middleware.js`
4. Anything under `/lp` automatically renders without site nav, footer, or the
   Roofle widget (`components/SiteChrome.jsx`)

---

## Local development

System Node is v25, which Next.js 14 **cannot run** — `next dev` hangs with no
output. Node 20 is installed alongside it:

```bash
PATH="/opt/homebrew/opt/node@20/bin:$PATH" npm run dev
```
