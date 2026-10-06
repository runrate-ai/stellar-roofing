# Decisions (don't re-argue these)

Newest first. Each one says what was decided and why.

| Date | Decision | Why |
|---|---|---|
| 2026-10-05 | Brandon's goal for PPC is **lead volume**. He doesn't consider tracking whether each lead closed important right now. | His words. Still report real people, not Google's conversion count. |
| 2026-10-04 | Analytics: **PostHog Cloud (US)** for recordings and funnels; keep Google Analytics for counts. Not Plausible, not Clarity, not self-hosted PostHog. | Free at this traffic; recordings + funnels + A/B tests in one tool. |
| 2026-10-04 | Don't install the big third-party skill/agent catalogs (claude-skills, claude-code-templates). Cherry-pick one piece only for a specific need. | Mostly irrelevant here; unreviewed code; more skills slows the assistant. |
| 2026-10-02 | **Street address is required** on every lead form. | Brandon asked. Nate can look at the roof and plan the route before calling. Watch form completion; loosen first if leads drop. |
| 2026-10-02 | Booking calendar appears **after** the form (thank-you page), not instead of it. Bookings aren't a separate Ads conversion. | The form captures the lead and the ad click ID first; avoids double counting. |
| 2026-10-02 | See and change Google Ads through **Google Ads scripts + a report Google Sheet**, not the Ads API or a paid connector. | No approval wait, free, no third party in the account. |
| 2026-09-29 | Relaunch as a **new campaign**; pause the old one, don't delete it. | Old one had zero conversions, so no bidding history to lose; clean before/after numbers; old search terms feed the negatives. |
| 2026-09-29 | Start on **Maximize clicks with a max CPC**, phrase and exact match only, Search network only, Presence-only locations. Switch to Maximize conversions after ~15 conversions and lower the $1,000 placeholder conversion values first. | The old campaign's waste came from broad match, search partners, and "presence or interest". |
| 2026-09-29 | No overlay accessibility widget (UserWay etc.); fix accessibility in the site code. | Overlays don't make a site compliant and don't prevent lawsuits. |
| 2026-09-29 | Not using Customers.ai (visitor identification). | Too little traffic; TCPA risk texting people who never opted in. |
| 2026-09-28 | Offer: price **match** (not beat), free gutters, Dog Oasis dog day (daycare + bath, up to $75). Gutters and dog day are retail-only and stay off storm/insurance traffic. | Brandon's call; insurance-inducement question is still open. |
| 2026-09-28 | Reviews stay off the site for now. | 2 of the 3 supplied were written by team members (FTC rule). |
| 2026-09-28 | **Boise stays** on the homepage and indexed, with no address in its schema. | Boise customers search the brand and saw "only Nashville"; there's no Boise office or Business Profile yet. |
| 2026-09-28 | Task tracking: `TODO.md` in the repo plus GHL tasks. Notion/Reminders dashboard deferred. | "As long as we have a to-do list and tasks in GHL, that's good for now." |
| 2026-09-28 | Priority order: PPC funnel and ads → GHL number swap after A2P → local SEO (reviews, listings) → content. Main-site ranking and conversion was later moved up. | Brandon set it. |
