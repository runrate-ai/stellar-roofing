# Google Ads Audit: "PPC August 11th - Search Leads"

Reviewed 2026-09-28 from the Google Ads exports (search terms report, all time, plus the overview cards for Aug 7 – Sep 27, 2026), GA4 data via OpenSEO, and a live mobile test of get.thestellarroofing.com.

## The numbers

| Metric | Value |
|---|---|
| Spend | **$1,821.51** |
| Clicks | 212 (CTR 3.34%) |
| Avg. cost per click | ~$8.59 |
| Conversions recorded by Google Ads | **1** ("roofing companies murfreesboro tn"), which Stellar says wasn't a real lead |
| Leads Stellar received | **0** |
| Active dates | Aug 12 – Sep 14 (about $100/day from Sep 8–14). Almost no spend since Sep 15; most ad groups are paused and only the hail ad group is on, with ~0 clicks. |
| Mobile share of clicks | **177 of 212 (83%)** |
| Impression share | 17% (competitors in the auction: Mr. Good Roof 15%, plus Five Points, Angi, Bluebird, Best Choice) |

## Problem 1: the landing page loses mobile visitors

83% of clicks came from phones, and the lead form fails on phones:
- The GoHighLevel form sits in a fixed 900px box that scrolls on its own. Scrolling the page gets trapped inside the form.
- After you pick step 1, the **Continue button is off-screen**, and step 2 opens scrolled out of view inside the box.
- The form is served from a temporary preview host (`roofing-quo-882c305e.vibepreview.com`) behind a Cloudflare bot challenge.
- About 95 of ~110 paid visitors in GA4 landed on the generic page, not the matching repair, replacement, or storm page.

GA4 recorded **zero** thank-you page views and **zero** lead events from paid traffic.

## Problem 2: most of the money went to the wrong searches

Google shows the actual search for only 76 of the 212 clicks ($672). The other 135 clicks (**$1,146, 63%**) fall under "other search terms" that it hides. Of the $672 we can see, **only about $130 (~20%) went to searches from someone likely to hire a roofer**, such as roofer near me, roofing companies Clarksville/Murfreesboro, roofing Mt Juliet, and how much a new roof costs.

The rest paid for:

| Wasted-click type | Examples (actual searches clicked) |
|---|---|
| **Other roofers' names / reviews** | don kennedy roofing reviews ($19.83), best choice roofing, estes roofing mt juliet, rackley roofing, dolly's roofing reviews, red's roofing reviews, who owns mr roof, shrum roofing gallatin, proclaim roofing, gold crown roofing, the roof guys clarksville, integrity roofing, barrett roofing, conyer roofing, rmt roofing, elite exteriors, golden truss exteriors, and more |
| **DIY / materials shoppers** | home depot shingles, lowes shingles, edco metal shingles, roof pitch calculator, roof shingles price per bundle, plastic drip edge flashing, rubber roof repair kit, membrane for roof, gutter for sale near me |
| **Wrong kind of roof** | rv roof repair near me, shed roof repairs near me ($33.48), mobile home roof repair cost |
| **Outside the service area** | flow roofing knoxville, homefix roofing … **norfolk** (Virginia), roofers columbia tn |
| **Spanish-language** (ads and site are English) | reparacion de techos de casas, compañias de rufin cerca de mi, teja presidencial, bando de shingles |
| **Freebies / research** | free roof replacement grants near me, what causes a roof leak, steps for roofing |

**Why this happened:** 70% of the matched terms came through **broad match**, and the phrase-match keyword **"residential roofing companies" alone took $926 (51% of all spend)**, matching loosely to other companies' names. "roof repair near me" (broad) took another $387. The Norfolk and Knoxville clicks suggest the location setting may be "Presence **or interest**" rather than "Presence".

## Fix plan

### Before turning ads back on
1. **Fix the landing page form**: switch back to the in-repo 3-step form. It posts to the GHL webhook, has no iframe, and fires the lead event itself. Put it right under the headline on mobile. *(Claude, needs `GHL_WEBHOOK_URL` confirmed in Vercel)*
2. **Submit a real test lead**: confirm it lands in GHL, the `/thank-you` page fires, and "PPC Funnel Lead" records in Google Ads.
3. **Check the one recorded conversion**: look in GHL for a contact around the Murfreesboro click. If there's none, the conversion tag may be firing on something other than a real lead. Fix it before relaunching, or Google's bidding will learn from bad data.
4. **Add call tracking**: a call asset on the ads plus a "click to call" conversion. Most roofing leads from ads are phone calls.

### Campaign rebuild (Google Ads, done in your account)
5. **Locations:** Nashville metro counties only, with the **"Presence: people in or regularly in"** setting, not "presence or interest". **Language:** English.
6. **No broad match** while budget is limited. Use phrase and exact match only.
7. **Pause "residential roofing companies"**, or change it to exact match.
8. **Split into tight ad groups, each with its own landing page:**
   - Roof repair / leak → `get.thestellarroofing.com/roof-repair`
   - Roof replacement / new roof cost → `/roof-replacement`
   - Storm / hail damage → `/storm-damage`
   - Roofer / roofing company + city (Nashville, Murfreesboro, Clarksville, Franklin, Hendersonville, Gallatin, Mt Juliet) → `/`
9. **Add the negative keyword list below** at the campaign level.
10. **Restart at a lower budget** (about $40–50/day) and check the search terms report **every 2–3 days** for the first two weeks, adding negatives as needed.

### Negative keywords (campaign level, phrase match unless noted)

```
reviews
review
who owns
owner
jobs
job
hiring
salary
careers
home depot
lowes
menards
supply
supplies
wholesale
for sale
calculator
price per bundle
per bundle
per square
diy
how to
kit
materials
material
rv
camper
shed
mobile home
manufactured home
trailer
grant
grants
free roof
knoxville
chattanooga
memphis
norfolk
kentucky
alabama
techos
reparacion
teja
rufin
techo
membrane
drip edge
pitch
colors
color options
roofing product
steps for roofing
```

Also add **competitor names as they appear** in the search terms report (exact match), for example: don kennedy, best choice, estes, rackley, dolly's, red's, mr roof, shrum, proclaim, gold crown, the roof guys, integrity roofing, barrett, conyer, rmt, elite exteriors, golden truss, summertown, five points, bluebird, mr good roof, angi. Bidding on competitor names isn't banned, but these clicks cost ~$8 each and haven't converted.

## What to watch after relaunch

- **Cost per lead target:** about $100–250 is typical for Nashville roofing leads. At ~$8.50/click that's roughly 1 lead per 15–30 clicks.
- **If 60+ clicks bring no leads after the fixes**, stop and re-check the search terms and the form before spending more.
