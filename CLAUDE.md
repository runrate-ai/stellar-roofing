# Stellar Roofing & Restorations: project guide

Marketing site, Google Ads funnel, and SEO for a roofing contractor based at 110 Space Park N, Goodlettsville, TN (Nashville / Middle Tennessee), with a less active Boise, ID branch. Brandon Boswell runs the marketing; Nate Sneed is the owner and does the inspections.

**Start every session by reading the state below.** It is loaded automatically:

@brain/NOW.md

## The second brain (`brain/`)

| File | What it holds | When to update |
|---|---|---|
| `brain/NOW.md` | Where we left off: current state, what's waiting on Brandon, what Claude does next | **Rewrite at the end of every session**, and after any big change mid-session |
| `brain/LOG.md` | One short entry per session: what was done, what was decided | Append at the end of every session |
| `brain/DECISIONS.md` | Decisions that should not be re-argued, with the reason | Append when Brandon decides something |
| `brain/SYSTEMS.md` | Every account, tool, ID, and how Claude reaches it (no secrets) | When a tool or ID changes |
| `TODO.md` | The full prioritized list | When items are added or finished |

End-of-session routine: update `brain/NOW.md`, append to `brain/LOG.md`, tick `TODO.md`, commit, and push the brain files (docs only) so they're never lost.

## Start-of-session routine

1. Read `brain/NOW.md` (above). Tell Brandon in 3–5 lines where things stand and what's next; don't make him re-explain.
2. If the session is about the ads: read the Google Sheet "Stellar Ads Report" (see `brain/SYSTEMS.md`) and count real leads in GHL before saying how the ads are doing.
3. If a local command hangs, see "iCloud" in `brain/SYSTEMS.md`.

## Rules (always)

**Honesty in copy**
- Never invent reviews, testimonials, certifications, statistics, response times, or financing. No stock faces with testimonials.
- Confirmed claims: free inspections and written estimates; lifetime workmanship warranty on replacements; licensed and insured; in business since 2020; based in Goodlettsville; photos of storm damage and can meet the adjuster on-site; answers the phone 24/7; installs Owens Corning and GAF shingles.
- Owens Corning: Stellar is **not** a credentialed/Preferred contractor. Use "Owens Corning®" on first mention with the independent-contractor disclaimer nearby. The OC logo must be used exactly as supplied (waiting on the artwork file).
- The offer is price **match** (apples to apples), never "beat". Free gutters and the Dog Oasis dog day apply to retail (non-insurance) replacements; keep them out of storm/insurance ads and pages.

**Money and accounts**
- Google Ads and the funnel target **Nashville / Middle TN only**, never Boise.
- Never tell Brandon to accept Google's "Apply all", add-keyword, broad match, AI Max, or Search Partner recommendations.
- The GHL tracking number (when approved) goes on the funnel and the ads call asset only; never on the main site, the Business Profile, or listings. Those stay (629) 277-4249.
- A Google Ads "conversion" is not a lead and a lead is not a job. Report real people (each counted once) and say what is unknown.

**Safety**
- Secrets live only in `.env.local` and Vercel. Never print or paste a token. PostHog's `phc_` project token and the GTM ID are public and may sit in code.
- Don't copy customer PII into files or chat; when checking GHL, print dates, tags, and sources only.
- Never hard-delete CRM data. Tag test contacts `test` and let Brandon delete them. Use the fake number 615-555-0142 for test leads, and never submit test requests to the live API while a deploy is in flight.
- Push to `main` (which deploys to production) only when Brandon asks. Docs-only pushes of `brain/` and `TODO.md` are fine.

**How Brandon likes to work**
- One step at a time, in plain language. Put every value he has to paste in its own code block. `pbcopy` commands don't work for him; print the full text in chat.
- He finds the Google Ads UI slow; prefer a Google Ads script (`ppc-scripts/`) over click-by-click instructions.
- Say what you verified and what you couldn't. If you got something wrong, say so plainly.

## Stack

Next.js 14 (App Router) + Tailwind, deployed on Vercel from `main`. `middleware.js` rewrites `get.thestellarroofing.com/*` to `/lp/<slug>` (the ad funnel). Leads post to `app/api/funnel-lead/route.js`, which upserts the GHL contact and adds tags. Shared form: `components/funnel/FunnelForm.jsx` (main site wraps it in `components/SiteLeadForm.jsx`). Site facts and IDs: `lib/config.js`. Funnel copy and offers: `lib/funnels.js`.

Historical files, not current: `HANDOFF.md`, `TOMORROW.md`, `SITE-BRIEF.md`, `SEO-MERGE-AUDIT.md`.
