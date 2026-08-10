# Tomorrow's Checklist — PPC Funnel Launch

Ordered so each step unblocks the next. Detail for any step is in
[FUNNEL-SETUP.md](FUNNEL-SETUP.md).

---

## 0. Decide first

- [ ] **Pick the subdomain name** (replacing `get`). Everything in §2 depends on it.

---

## 1. Deploy what's built

- [ ] Merge `feat/ppc-funnel-nashville` → `main`, push, let Vercel deploy
- [ ] Confirm pages are live on the main domain:
      `thestellarroofing.com/lp/nashville-roofing`
      (`/roof-replacement`, `/roof-repair`, `/storm-damage`)
- [ ] Spot-check the main site is unaffected — nav, footer, Roofle widget

> The `/lp/...` paths work on the main domain with no DNS at all. That's the
> fastest way to start testing while the subdomain is still pending.

---

## 2. Subdomain

- [ ] Rename the subdomain in [`middleware.js`](middleware.js) — `FUNNEL_SUBDOMAIN`, one string
- [ ] **Vercel** → stellar-roofing → Settings → Domains → add the subdomain
- [ ] Copy the CNAME target Vercel gives you
- [ ] **GoDaddy** → DNS → Add record: type `CNAME`, name = subdomain only (e.g. `quote`, not the full hostname)
- [ ] Wait for `dig +short <subdomain>.thestellarroofing.com` to resolve
- [ ] Confirm the padlock before sending any traffic

> Do **not** move nameservers to Vercel. Company email runs on Microsoft 365
> via Proofpoint; repointing NS without recreating MX/SPF/TXT breaks it.

---

## 3. Conversion tracking — in this order

- [ ] **GHL** — set the form's post-submit redirect to the funnel's own
      thank-you page, on the subdomain so the visitor never leaves it:
      `https://<subdomain>.thestellarroofing.com/thank-you`
      (no `/lp/` — the middleware strips it. Do this *after* §2 so you
      only set it once.)
- [ ] **GHL** — add hidden fields for `gclid` + UTMs, populated from URL params
- [ ] **Google Ads** — auto-tagging ON (Settings → Account settings)
- [ ] **Google Ads** — open the "Submit lead form" conversion action:
      - confirm Source = **Website** (not GA4 import)
      - set **Count = One** (not Every)
      - copy the **Conversion ID** and **Conversion Label**
- [ ] **GTM** — Custom Event trigger on `generate_lead`
- [ ] **GTM** — Google Ads Conversion Tracking tag using that ID + Label
- [ ] **GTM** — GA4 Event tag, `generate_lead`, pointed at `G-XGHJWHETWD`
- [ ] Preview → submit a test lead → confirm both tags fire → **Submit/publish**
- [ ] Confirm the test lead landed in GHL **with the gclid attached**

> Skip the "Measure purchases in Google Ads" guided setup on the GTM home
> screen — it's for ecommerce and will create tags you'll have to undo.

---

## 4. Trust — before spend, not after

- [ ] Replace placeholder reviews in `client-data/reviews/reviews.json`
      (biggest impact on the generic/comparison ad group — ~730 searches/mo
      for "best roofers near me" currently land on a page with zero reviews)
- [ ] Owens Corning badge → `public/images/badges/`, enable in `lib/funnel-trust.js`
- [ ] Completed job photos → `public/images/projects/`, add to `projectPhotos`
- [ ] Set the real Google rating + review count in `lib/funnel-trust.js`

---

## 5. Risks to close out

- [ ] **Confirm the form embed URL is permanent.** `vibepreview.com` looks like
      a preview host. If it's recycled, every funnel silently loses its form.
- [ ] **Legal review** — price beat fine print + storm/insurance copy
      (Tennessee restricts unlicensed public adjusting)

---

## 6. Optional / nice to have

- [ ] **Call tracking** — GTM Click trigger on `tel:` links → separate Google
      Ads conversion. Roofing PPC drives a lot of calls; without this,
      Smart Bidding only learns from form fills.
- [ ] Match the main site navbar logo to the funnel's larger size
- [ ] Add an npm script pinning Node 20 so plain `npm run dev` works
- [ ] Delete unused `components/funnel/FunnelForm.jsx` and `app/api/funnel-lead/`

---

## Do not turn on ad spend until

1. Subdomain resolves with a valid certificate
2. A test lead reaches GHL **with its gclid**
3. `generate_lead` fires and the Google Ads conversion is recording
4. Real reviews are live

Clicks that arrive before tracking works are permanently unmeasured — and at
$60–$120 top-of-page bids, that's expensive data you can't get back.
