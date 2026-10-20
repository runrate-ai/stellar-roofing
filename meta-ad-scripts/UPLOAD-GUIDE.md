# Upload guide: "Replace your roof?" AI kinetic ad (Hyperframes version)

Files (in `meta-ad-clips/`):
- `stellar-ai-hyperframes-916.mp4` (1080x1920, 24.4s): Reels and Stories
- `stellar-ai-hyperframes-45.mp4` (1080x1350, 24.4s): Feed

Voice: ElevenLabs "Brian" (a stock voice, not Nate or Brandon). Footage: AI-generated, labeled on screen as "Illustrative AI footage".

## Audience: retail replacement only
The ad mentions the Puppy Promise, which applies to retail (non-insurance) replacements only. Do not add storm or insurance interests to this ad set.

## Campaign settings (suggested starting point)
| Setting | Value |
|---|---|
| Objective | **Leads** or **Traffic** (see "Optimization" below) |
| Location | Nashville and the 7 Middle TN counties the Google campaign targets. People living in or recently in this location. Never Boise. |
| Age | 30-65+ (homeowners skew older; widen later from data) |
| Targeting | Broad. Skip detailed interests at first. |
| Placements | Advantage+ placements, or Reels + Stories (use the 9:16 file) and Feed (use the 4:5 file) |
| Budget | Your call. Suggestion: small test, 3-5 days, then judge on real leads in GHL, not Meta's numbers |
| Special ad category | None needed for roofing (confirm Meta doesn't flag it) |

**Optimization (decided 2026-10-20, no Meta Pixel yet):** Objective **Traffic**, performance goal **Landing page views**, destination Website. Count real leads from GHL (UTM source `facebook`). Once the pixel below is live and has fired Lead a few times, switch new ad sets to the **Leads** objective, conversion location Website, optimize for Leads.

## Ad creative
Upload both files to one ad (placement customization): 9:16 for Stories/Reels, 4:5 for Feed.

**Primary text** (first 125 characters are what shows; confirmed facts only):
```
Getting quotes to replace your roof? Here's what to look for: a free inspection, a written estimate you can compare, and a lifetime workmanship warranty on every replacement. Family-owned, licensed and insured, and based in Goodlettsville. Our phone is answered 24/7. We'll even send your dog to a spa day on install day (retail replacements only).
```

**Headline** (pick one):
```
Free Inspection + Written Estimate
```
```
Replacing Your Roof? Start Here
```

**Description:** `Licensed and insured`
**CTA button:** Get quote

**Website URL** (the funnel page):
```
https://get.thestellarroofing.com/roof-replacement?utm_source=facebook&utm_medium=paid_social&utm_campaign=nashville-retail-replacement&utm_content=ai-kinetic-hyperframes
```

Do not add: "best", "most trusted", price claims, financing, Owens Corning or GAF names, insurance outcomes, or the tracking phone number (it is not approved yet).

## AI-info label (what I can and can't confirm)
I could not look up Meta's current Ads Manager screens, so check these in the UI:
1. Meta applies "AI info" labels itself when it detects AI-generated content, and it requires advertisers to disclose AI use in some cases (realistic people or events; mandatory for political and social-issue ads). Policy and screens change, so read Meta's current "AI info" help page before publishing.
2. If Ads Manager shows an AI disclosure option or toggle at the ad level, turn it on for this ad. Do not strip file metadata to avoid the label.
3. The on-screen line "Illustrative AI footage" stays in both videos as our own disclosure.
4. This is not a claim that the footage shows Stellar jobs. Real-footage ad is `stellar-nate-kinetic-30s-*.mp4` if you want a version with Nate.

## After launch
- Report real people (each counted once) from GHL, filtered by `utm_source=facebook`. Meta "leads" are not jobs.
- Check the thank-you page fires and the funnel form works from a phone before spending (use the test number 615-555-0142 and tag the contact `test`).

## Add the Meta Pixel and a Lead event in GTM (one step at a time)

The site already pushes `generate_lead` to the dataLayer on the thank-you pages (`components/funnel/ConversionEvent.jsx`). We only need a pixel and two GTM tags. Do these in order and tell me when each is done.

**Step 1. Create the pixel.** Meta Events Manager -> Connect data sources -> Web -> Meta Pixel -> name it `Stellar Roofing`. Choose "Install code manually" and copy the **Pixel ID** (a number). Don't paste it in chat; it is public but keep it handy.

**Step 2. GTM: base tag.** tagmanager.google.com -> container `GTM-MCP6RQRL` -> Tags -> New -> name `Meta Pixel - Base` -> type **Custom HTML** -> paste this, replacing `YOUR_PIXEL_ID`:
```html
<script>
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','YOUR_PIXEL_ID');
fbq('track','PageView');
</script>
```
Trigger: **Initialization - All Pages** (or All Pages).

**Step 3. GTM: trigger for leads.** Triggers -> New -> name `generate_lead event` -> type **Custom Event** -> Event name:
```
generate_lead
```
-> This trigger fires on: All Custom Events.

**Step 4. GTM: Lead tag.** Tags -> New -> name `Meta Pixel - Lead` -> **Custom HTML**:
```html
<script>fbq('track','Lead');</script>
```
Trigger: `generate_lead event`. Under Advanced Settings -> Tag firing options choose **Once per page**, and Tag sequencing -> "Fire a tag before": `Meta Pixel - Base`.

**Step 5. Test before publishing.** GTM -> Preview -> enter `https://get.thestellarroofing.com/roof-replacement`. Submit a test lead with the fake number 615-555-0142 (it creates a GHL contact: tag it `test` and delete it later, never delete in the API). On the thank-you page, Tag Assistant should show both Meta tags fired. Also install the "Meta Pixel Helper" Chrome extension and confirm it shows `PageView` and `Lead`.

**Step 6. Publish** the GTM container (Submit -> Publish).

**Step 7. Privacy policy.** Add a line that the site uses the Meta Pixel for advertising measurement. I can edit `app/privacy` for you; it deploys only when you ask me to push to `main`.

Caveats I could not verify: whether the funnel domain `get.thestellarroofing.com` loads the same GTM container (Step 5 will show it), and whether a consent banner is needed for your audience.
