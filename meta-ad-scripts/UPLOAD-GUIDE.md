# Upload guide: "Why hire Stellar Roofing" (v7)

Files (in `meta-ad-clips/`, 29s each):
- `stellar-v7-nate-916.mp4` (1080x1920): Reels and Stories
- `stellar-v7-nate-45.mp4` (1080x1350): Feed
- `stellar-v7-nate-11.mp4` (1080x1080): square Feed and carousel
- `stellar-v7-nate-169.mp4` (1920x1080): in-stream and landscape

What it is: fast cuts of Stellar's own real crew footage, a short AI-generated intro (old roof to new roof), captions, Final Level music (CC0), and a voiceover in an AI clone of Nate's voice (ElevenLabs).

Voiceover:
> So, why hire Stellar Roofing? Honestly, it starts with me. I'm Nate, I own the company, and I'm the one who inspects your roof, and that's free. Then you get a written estimate, so you know your number before you sign anything. And if you've got a comparable quote from someone else, we'll match it. Every replacement comes with a lifetime workmanship warranty, we're family owned, and when you call, we pick up, day or night. So if you're thinking about a new roof, tap Get Quote.

Before running: confirm Nate is OK with an AI clone of his voice in paid ads (Brandon cloned it; Nate's consent is not recorded anywhere I can see).

Older versions (v1 to v6, the AI-footage cuts, and the Nate real-voice cuts) are still in `meta-ad-clips/` and are not recommended.

## Audience: retail replacement
Homeowners considering a roof replacement. The ad does not mention the Puppy Promise, free gutters, or storm and insurance. Keep it on retail audiences.

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
Upload all four files to one ad, and assign by placement: 9:16 for Stories/Reels, 4:5 for Feed, 1:1 for square placements, 16:9 for landscape. (Meta's placement customization lets you pick a different file per placement.)

**Primary text** (first 125 characters are what shows; confirmed facts only):
```
Why hire Stellar Roofing? Nate, the owner, inspects your roof himself, and it's free. You get a written estimate before you sign, and we'll match a comparable written quote. Every replacement comes with a lifetime workmanship warranty. Family owned, licensed and insured, and our phone is answered 24/7.
```

**Headline** (pick one):
```
Free Inspection + Written Estimate
```
```
Why Hire Stellar Roofing?
```

**Description:** `Licensed and insured`
**CTA button:** Get quote

**Website URL** (the funnel page):
```
https://get.thestellarroofing.com/roof-replacement?utm_source=facebook&utm_medium=paid_social&utm_campaign=nashville-retail-replacement&utm_content=why-hire-nate-v7
```

Do not add: "best", "most trusted", "better than other companies", price claims, financing, Owens Corning or GAF names, insurance outcomes, or the tracking phone number (it is not approved yet). One shot in the video shows the office window logo with (629) 277-4249, the main number.

## AI-info label (what I can and can't confirm)
I could not look up Meta's current Ads Manager screens, so check these in the UI:
1. Meta applies "AI info" labels itself when it detects AI-generated content, and it requires advertisers to disclose AI use in some cases (realistic people or events; mandatory for political and social-issue ads). Policy and screens change, so read Meta's current "AI info" help page before publishing.
2. This ad has two AI parts: the opening 5 seconds (AI-generated roof and roofer, labeled on screen "AI-generated intro") and the voiceover (an AI clone of Nate's voice). If Ads Manager offers an AI disclosure option or toggle at the ad level, turn it on. Do not strip file metadata to avoid the label.
3. Everything after the intro is real Stellar footage from the promo shoot.

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
