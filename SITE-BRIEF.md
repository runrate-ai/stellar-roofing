# SITE-BRIEF.md — Stellar Roofing & Restorations

> **This file is the single source of truth for Claude Code.**
> Read this ENTIRE file before writing any code. Every page, component, and content decision flows from this brief.

---

## PROJECT OVERVIEW

**Goal:** Build and deploy a production-ready, SEO-optimized Next.js website for Stellar Roofing & Restorations this week. This is an MVP launch — ship fast with the core pages, then expand.

**Platform:** Next.js 14+ (App Router), Tailwind CSS, deployed to Vercel
**CRM Backend:** GoHighLevel (GHL) — all forms and review widgets are GHL embeds
**Domain:** thestellarroofing.com
**Market:** Nashville, TN metro area ONLY (Boise comes later)

---

## BUSINESS INFORMATION

```
Business Name:    Stellar Roofing & Restorations
Phone (Nashville): (629) 277-4249
Email:            Office@thestellarroofing.com
Service Area:     Nashville and surrounding Middle Tennessee
Tagline:          "Out of This World Roofing"
```

### Trust Signals / Differentiators
- Lifetime Warranty on every roof installed
- Free roof inspections
- Licensed & insured
- Residential AND commercial
- Insurance claims assistance
- Serves Nashville, Clarksville, Murfreesboro, Franklin, Brentwood, and surrounding areas

### Brand Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `primary` | `#1B2B4B` | Deep navy — headers, navbar, footer, primary buttons |
| `accent` | `#F59E0B` | Gold/amber — CTAs, highlights, hover states, icons |
| `bg-light` | `#FFFFFF` | White — main backgrounds |
| `bg-alt` | `#F8FAFC` | Light gray — alternating sections |
| `text-dark` | `#1E293B` | Body text |
| `text-muted` | `#64748B` | Secondary/supporting text |

### Typography
- **Font:** Inter (Google Fonts)
- **Headings:** Bold, navy (`primary`)
- **Body:** Regular, `text-dark`

---

## DESIGN REFERENCE

**Primary inspiration:** billraganroofing.com — study their:
- Clean, professional layout
- Content-first approach (lots of helpful text, not just pretty pictures)
- Blog-driven SEO strategy
- Pricing page / cost calculator concept
- "Best roofers in [city]" content strategy
- Downloadable checklists as lead magnets

**Secondary inspiration:** The current GoDaddy site's branding (keep the space/stellar theme subtle — in copy and tagline only, not in visual design. The site should look like a premium roofing contractor, not a space company.)

**Overall vibe:** Clean, white, professional, trustworthy. Think "the roofer your neighbor recommends" not "flashy marketing agency." Light backgrounds, navy text, gold accents on CTAs.

---

## MVP PAGE LIST (BUILD THESE FIRST)

This is the minimum viable site to launch this week. Build these pages in this order.

### 1. Homepage (`/`)
**Primary keyword:** `roofing company Nashville TN`
**Secondary keywords:** `Nashville roofing contractor`, `Nashville roofer`
**Title tag:** `Stellar Roofing & Restorations | Nashville's Trusted Roofing Company`
**Meta description:** `Nashville's trusted roofing company. Free inspections, lifetime warranty, residential & commercial. Roof replacement, repair, storm damage. Call (629) 277-4249.`

**Sections (in order):**
1. **Sticky Navbar** — Logo (left), nav links (Home, Services dropdown, Service Areas dropdown, About, Contact), phone number, "Get Free Estimate" gold button (right). Mobile hamburger menu.
2. **Hero** — Full-width background image (use placeholder). H1: "Nashville's Most Trusted Roofing Company". Subline: "Free Inspections • Lifetime Warranty • Licensed & Insured". Two CTAs: "Get Free Estimate" (gold) and "Call (629) 277-4249" (outline). 
3. **Trust Bar** — Horizontal strip with 4 items: "Lifetime Warranty", "Free Inspections", "Licensed & Insured", "Insurance Claims Help". Use simple icons (Lucide React).
4. **Services Overview** — H2: "Our Roofing Services". Grid of 6 cards linking to service pages: Roof Replacement, Roof Repair, Storm Damage Repair, Roof Inspection, Commercial Roofing, Emergency Roof Repair. Each card: icon, title, 2-sentence description, "Learn More →" link.
5. **Why Choose Us** — H2: "Why Nashville Homeowners Choose Stellar". 3-column layout: (1) Lifetime warranty, (2) Insurance claims help, (3) Local & trusted. Short paragraph for each with icon.
6. **Service Areas** — H2: "Proudly Serving Nashville & Middle Tennessee". List of cities as links to their location pages: Nashville, Clarksville, Murfreesboro, Franklin, Brentwood, Hendersonville, Gallatin, Smyrna, Spring Hill, Mount Juliet, Lebanon. Include a small embedded Google Map centered on Nashville.
7. **Reviews Section** — H2: "What Our Customers Say". GHL review widget embed placeholder. Comment: `<!-- REPLACE: GHL Review Widget Embed Code -->`. Also include 3 hardcoded testimonial cards as fallback (use placeholder text marked clearly for replacement).
8. **CTA Banner** — Full-width navy background. H2: "Ready for a Free Roof Inspection?". Subtext: "Our team will inspect your roof at no cost and give you an honest assessment." Gold "Schedule Free Inspection" button. Phone number.
9. **FAQ Section** — H2: "Frequently Asked Questions". Accordion with these Qs:
   - "How much does a new roof cost in Nashville, TN?"
   - "Does homeowners insurance cover roof replacement?"
   - "How long does a roof replacement take?"
   - "What are signs I need a new roof?"
   - "Do you offer financing?"
   - "What areas do you serve?"
10. **Footer** — 4 columns: (1) Logo + tagline + phone + email, (2) Services links, (3) Service Areas links, (4) Company links (About, Contact, Free Inspection, Privacy Policy). Bottom bar: © 2026 Stellar Roofing & Restorations. All Rights Reserved.

**Schema (JSON-LD):**
- LocalBusiness schema with name, phone, email, address area, service area, hours
- FAQ schema for the FAQ section

---

### 2. Roof Replacement (`/services/roof-replacement`)
**Primary keyword:** `roof replacement Nashville TN`
**Secondary:** `new roof cost Nashville`, `roof installation Nashville`, `how much does roof replacement cost Nashville`
**Title:** `Roof Replacement Nashville TN | Free Estimates | Stellar Roofing`
**Meta:** `Need a roof replacement in Nashville? Stellar Roofing offers lifetime warranties, insurance claims help, and free inspections. Get your free estimate today.`

**Content Requirements (800-1200 words):**
- H1: "Roof Replacement in Nashville, TN"
- Intro paragraph about when you need a replacement
- Section: "How Much Does a Roof Replacement Cost in Nashville?" (reference local costs: $15K-$30K range for most homes, varies by material and size — link to Bill Ragan's data as general market context)
- Section: "Roofing Materials We Install" (asphalt shingles, architectural shingles, metal roofing — brief descriptions)
- Section: "Our Roof Replacement Process" (numbered steps: inspection → estimate → material selection → tear-off → install → cleanup → final inspection)
- Section: "Insurance Claims Assistance" (paragraph about helping with storm damage claims)
- Section: "Lifetime Warranty" (brief paragraph about the warranty)
- CTA banner with GHL form embed
- FAQ (3-4 questions specific to roof replacement) with FAQ schema
- Service schema markup

---

### 3. Roof Repair (`/services/roof-repair`)
**Primary keyword:** `roof repair Nashville TN`
**Secondary:** `roof leak repair Nashville`, `fix roof leak Nashville`, `roof patch Nashville`
**Title:** `Roof Repair Nashville TN | Fast & Reliable | Stellar Roofing`
**Meta:** `Leaking roof? Stellar Roofing provides fast, reliable roof repair in Nashville, TN. Free inspections, honest assessments. Call (629) 277-4249.`

**Content Requirements (800-1200 words):**
- H1: "Roof Repair in Nashville, TN"
- When to repair vs. replace
- Common roof problems in Nashville (storm damage, missing shingles, leaks, flashing issues)
- Repair process
- Cost section (average repairs $500-$2,500 range in Nashville)
- Emergency repair availability
- CTA + GHL form embed
- FAQ with FAQ schema

---

### 4. Storm Damage Repair (`/services/storm-damage-repair`)
**Primary keyword:** `storm damage roof repair Nashville`
**Secondary:** `hail damage roof Nashville`, `wind damage roof repair Nashville TN`, `roof insurance claim Nashville`
**Title:** `Storm Damage Roof Repair Nashville | Insurance Claims Help | Stellar Roofing`
**Meta:** `Storm damage your roof? Stellar Roofing handles Nashville storm damage repair and helps with insurance claims. Free damage inspections. Call now.`

**Content Requirements (800-1200 words):**
- H1: "Storm Damage Roof Repair in Nashville, TN"
- Nashville's storm risks (tornado alley, hail, severe thunderstorms, reference 2020 tornado)
- Signs of storm damage (hail dents, missing shingles, granules in gutters, leaks)
- Insurance claims process (step by step — this is a major differentiator)
- Free storm damage inspections
- Emergency response
- CTA + GHL form embed
- FAQ with FAQ schema

---

### 5. Roof Inspection (`/services/roof-inspection`)
**Primary keyword:** `roof inspection Nashville TN`
**Secondary:** `free roof inspection Nashville`, `roof assessment Nashville`
**Title:** `Free Roof Inspection Nashville TN | Stellar Roofing & Restorations`
**Meta:** `Get a free, no-obligation roof inspection in Nashville from Stellar Roofing. Honest assessments, no pressure. Schedule your inspection today.`

**Content (600-800 words):**
- H1: "Free Roof Inspection in Nashville, TN"
- What's included in the inspection
- When you should get an inspection (after storms, aging roof, buying/selling home)
- The inspection process
- CTA — this is the primary lead capture page
- FAQ with FAQ schema

---

### 6. Commercial Roofing (`/services/commercial-roofing`)
**Primary keyword:** `commercial roofing Nashville TN`
**Secondary:** `commercial roof repair Nashville`, `flat roof repair Nashville`
**Title:** `Commercial Roofing Nashville TN | Stellar Roofing & Restorations`
**Meta:** `Commercial roofing services in Nashville, TN. Flat roofs, metal roofs, repairs, replacements. Licensed and insured. Call for a free estimate.`

**Content (600-800 words):**
- H1: "Commercial Roofing in Nashville, TN"
- Types of commercial roofing (flat, TPO, metal, modified bitumen)
- Industries served
- Maintenance programs
- CTA + form
- FAQ with FAQ schema

---

### 7. Emergency Roof Repair (`/services/emergency-roof-repair`)
**Primary keyword:** `emergency roof repair Nashville`
**Secondary:** `24 hour roofer Nashville`, `urgent roof repair Nashville TN`
**Title:** `Emergency Roof Repair Nashville | 24/7 Response | Stellar Roofing`
**Meta:** `Roof emergency in Nashville? Stellar Roofing provides fast emergency roof repair. Call (629) 277-4249 for immediate help.`

**Content (500-700 words):**
- H1: "Emergency Roof Repair in Nashville, TN"
- What qualifies as an emergency
- Response time
- Temporary vs permanent repairs
- Huge CTA emphasis — phone number large and prominent
- FAQ with FAQ schema

---

### 8. About Page (`/about`)
**Title:** `About Stellar Roofing & Restorations | Nashville Roofing Company`
**Meta:** `Learn about Stellar Roofing & Restorations, Nashville's trusted roofing company. Licensed, insured, lifetime warranty on every roof.`

**Content:**
- H1: "About Stellar Roofing & Restorations"
- Company story and mission
- What makes us different (warranty, insurance help, quality materials)
- Credentials / certifications
- Photo of team (placeholder)
- CTA

---

### 9. Contact Page (`/contact`)
**Title:** `Contact Stellar Roofing | Nashville TN | Free Estimates`
**Meta:** `Contact Stellar Roofing & Restorations in Nashville, TN. Call (629) 277-4249 or fill out our form for a free roof estimate.`

**Content:**
- H1: "Contact Stellar Roofing & Restorations"
- Phone number (large, clickable)
- Email
- GHL contact/quote form embed: `<!-- REPLACE: GHL Contact Form Embed Code -->`
- Embedded Google Map
- Service hours

---

### 10. Free Inspection Landing Page (`/free-inspection`)
**Title:** `Free Roof Inspection Nashville TN | Schedule Now | Stellar Roofing`
**Meta:** `Schedule your free, no-obligation roof inspection in Nashville, TN. Stellar Roofing provides honest assessments with no pressure to buy.`

**Content:**
- H1: "Schedule Your Free Roof Inspection"
- Benefits of the inspection
- What we check (shingles, flashing, gutters, ventilation, decking)
- "No obligation, no pressure" messaging
- GHL form embed (THIS IS THE PRIMARY CONVERSION PAGE)
- Trust signals: warranty, reviews, credentials

---

## LOCATION PAGES (MVP — Build Top 5)

Build these 5 first. Same template, unique content per city.

### Template Structure for All Location Pages:
- H1: "Roofing Company in [City], TN"
- 600-800 words unique content per page
- Why [City] residents need roofing (mention local weather, home styles, neighborhoods)
- Services available in [City]
- Phone number CTA
- GHL form embed
- Link back to all services
- FAQ (2-3 questions) with FAQ schema
- LocalBusiness + Service schema

### Pages to Build:

| URL | Primary Keyword | Title Tag |
|-----|----------------|-----------|
| `/service-areas/nashville` | `roofing company Nashville TN` | `Roofing Company Nashville TN \| Stellar Roofing & Restorations` |
| `/service-areas/murfreesboro` | `roofing company Murfreesboro TN` | `Roofing Company Murfreesboro TN \| Stellar Roofing` |
| `/service-areas/clarksville` | `roofing contractor Clarksville TN` | `Roofing Contractor Clarksville TN \| Stellar Roofing` |
| `/service-areas/franklin` | `roofer Franklin TN` | `Roofer Franklin TN \| Stellar Roofing & Restorations` |
| `/service-areas/brentwood` | `roofing company Brentwood TN` | `Roofing Company Brentwood TN \| Stellar Roofing` |

---

## TECHNICAL REQUIREMENTS

### SEO — Non-Negotiable
- **Every page** gets a unique `<title>` and `<meta name="description">`
- **Every page** gets Open Graph tags (`og:title`, `og:description`, `og:image`, `og:url`)
- **Every page** uses proper heading hierarchy (one H1, H2s for sections, H3s for subsections)
- **All images** get descriptive alt text with keywords where natural
- **JSON-LD schema** on every page (LocalBusiness on homepage, Service on service pages, FAQ on pages with FAQs)
- **Breadcrumbs** on all inner pages with BreadcrumbList schema
- Auto-generated **sitemap.xml** at `/sitemap.xml`
- **robots.txt** at `/robots.txt` allowing all crawlers
- **Canonical URLs** on every page
- Internal linking between related service pages and location pages

### Performance
- Use Next.js `<Image>` component for all images (WebP, lazy loading, responsive sizes)
- SSR or SSG for all pages (NO client-side-only rendering — Google must see full HTML)
- Target 90+ on Google PageSpeed Insights (mobile)
- Minimal JavaScript bundle — don't over-engineer animations
- Use Framer Motion SPARINGLY — fade-in on scroll for sections only, nothing heavy

### GHL Integration Points
Mark every GHL embed with clear HTML comments so they're easy to find and replace:

```html
<!-- GHL-FORM: Main Quote Form -->
<div id="ghl-quote-form">
  <!-- REPLACE WITH GHL FORM EMBED SCRIPT -->
  <p>Loading form...</p>
</div>

<!-- GHL-FORM: Contact Form -->
<div id="ghl-contact-form">
  <!-- REPLACE WITH GHL FORM EMBED SCRIPT -->
  <p>Loading form...</p>
</div>

<!-- GHL-WIDGET: Review Widget -->
<div id="ghl-reviews">
  <!-- REPLACE WITH GHL REVIEW WIDGET EMBED SCRIPT -->
  <p>Loading reviews...</p>
</div>
```

### Click-to-Call
Every phone number on the site should be an `<a href="tel:6292774249">` link. The phone number should appear:
- In the navbar (desktop)
- In the mobile menu
- In the hero
- In every CTA banner
- In the footer
- On every service and location page

### Mobile
- Mobile-first responsive design
- Sticky mobile CTA bar at bottom of screen with "Call Now" and "Free Estimate" buttons
- Hamburger menu for nav
- All forms usable on mobile
- Tap-to-call on all phone numbers

---

## FILE STRUCTURE

```
stellar-roofing/
├── app/
│   ├── layout.js          (root layout with navbar + footer + fonts + analytics)
│   ├── page.js            (homepage)
│   ├── about/page.js
│   ├── contact/page.js
│   ├── free-inspection/page.js
│   ├── services/
│   │   ├── page.js        (services index — optional, can redirect to homepage #services)
│   │   ├── roof-replacement/page.js
│   │   ├── roof-repair/page.js
│   │   ├── storm-damage-repair/page.js
│   │   ├── roof-inspection/page.js
│   │   ├── commercial-roofing/page.js
│   │   └── emergency-roof-repair/page.js
│   ├── service-areas/
│   │   ├── nashville/page.js
│   │   ├── murfreesboro/page.js
│   │   ├── clarksville/page.js
│   │   ├── franklin/page.js
│   │   └── brentwood/page.js
│   ├── sitemap.js         (auto-generated sitemap)
│   └── robots.js          (robots.txt)
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── Hero.jsx
│   ├── TrustBar.jsx
│   ├── ServicesGrid.jsx
│   ├── ServiceCard.jsx
│   ├── WhyChooseUs.jsx
│   ├── ServiceAreas.jsx
│   ├── ReviewsSection.jsx
│   ├── CTABanner.jsx
│   ├── FAQ.jsx
│   ├── GHLForm.jsx        (reusable GHL embed wrapper)
│   ├── Breadcrumbs.jsx
│   ├── MobileCTABar.jsx
│   └── SchemaMarkup.jsx   (reusable JSON-LD component)
├── lib/
│   ├── seo.js             (metadata generation helpers)
│   └── schema.js          (JSON-LD schema builders)
├── public/
│   ├── logo.png           (placeholder — will be replaced)
│   ├── og-image.jpg       (placeholder — Open Graph default image)
│   └── images/            (placeholder directory for photos)
├── SITE-BRIEF.md          (this file)
├── tailwind.config.js
├── package.json
└── next.config.js
```

---

## CONTENT NOTES

### Tone of Voice
- Professional but approachable — like a trusted neighbor who happens to be a roofer
- Confident, not salesy
- Emphasize honesty, transparency, and quality
- Use "we" and "our team" — personal and human
- Nashville-specific references where natural (weather, neighborhoods, local landmarks)
- NO generic filler content. Every sentence should be useful or persuasive.

### Placeholder Content
Where real content isn't available yet, write SEO-optimized placeholder content that is REALISTIC and READY TO USE. Do NOT use lorem ipsum or obviously fake text. Write it as if it were the real content — the client can refine later but it should be good enough to launch with.

### Image Placeholders
Use styled divs with descriptive text labels:
```jsx
<div className="bg-slate-200 rounded-lg flex items-center justify-center h-64 text-slate-500">
  [Photo: Stellar Roofing crew installing new architectural shingles]
</div>
```

---

## PAGES TO ADD LATER (NOT IN MVP)

These are planned but NOT part of the initial build. Leave the routing/linking structure ready for them.

**Additional Location Pages:**
- `/service-areas/hendersonville`
- `/service-areas/gallatin`
- `/service-areas/smyrna`
- `/service-areas/spring-hill`
- `/service-areas/mount-juliet`
- `/service-areas/lebanon`

**Blog:**
- `/blog` (index)
- `/blog/how-much-does-roof-replacement-cost-nashville`
- `/blog/best-roofing-companies-nashville-tn`
- `/blog/signs-you-need-new-roof`
- `/blog/how-to-file-roof-insurance-claim-tennessee`
- `/blog/storm-damage-roof-what-to-do`

**Additional Pages:**
- `/reviews` (dedicated testimonials page)
- `/gallery` (project portfolio)
- `/financing`
- `/privacy-policy`

**Include links to these in the nav/footer even if the pages don't exist yet — point them to `#` with a TODO comment.**

---

## LAUNCH CHECKLIST (For Brandon after build)

After Claude Code finishes the build:

1. [ ] Replace all `<!-- GHL-FORM -->` placeholders with real GHL embed codes
2. [ ] Replace all `<!-- GHL-WIDGET -->` placeholders with real GHL review widget
3. [ ] Replace logo placeholder with real Stellar Roofing logo
4. [ ] Add real project photos (or Cloudinary URLs)
5. [ ] Review and refine placeholder content on each page
6. [ ] Push to GitHub: `git add . && git commit -m "MVP launch" && git push`
7. [ ] Connect domain in Vercel (A record → 76.76.21.21, CNAME www → cname.vercel-dns.com)
8. [ ] Submit sitemap to Google Search Console (https://thestellarroofing.com/sitemap.xml)
9. [ ] Verify GBP website URL points to new site
10. [ ] Test all click-to-call links on mobile
11. [ ] Test GHL form submissions
12. [ ] Run PageSpeed Insights and fix any issues above
13. [ ] Check all pages render in Google's Mobile-Friendly Test
