// PPC funnel variations — one per Google Ads ad group.
//
// Market is Nashville / Middle Tennessee only. Boise is a separate location
// with no paid campaign.
//
// Each ad group gets a page whose hero answers the search that produced the
// click. Keyword research (Aug 2026) put replacement intent at only ~9% of
// campaign volume, so the free-gutters offer belongs on the replacement page
// and nowhere else — repair searchers don't want a new roof.
//
// Adding a variation: add an entry here. The route, sitemap exclusion, and
// subdomain rewrite all pick it up automatically.

const PRICE_BEAT_FINE_PRINT =
  'Price beat guarantee requires a comparable written estimate from a licensed and insured Tennessee roofing contractor for the same scope of work and materials, presented before your contract is signed; Stellar Roofing & Restorations reserves the right to verify any estimate submitted. Offer subject to change or withdrawal at any time.';

const GUTTERS_FINE_PRINT =
  'Free gutters offer applies to complete roof replacements only and covers standard 5" seamless aluminum gutters on the replaced roof sections; it cannot be combined with other offers or discounts. ';

const INSURANCE_FINE_PRINT =
  ' Stellar Roofing & Restorations is a licensed roofing contractor, not a public adjuster or insurance representative. We document damage, provide a detailed written estimate, and can meet your insurance adjuster at the property. We do not file, negotiate, or adjust claims on your behalf, and we cannot guarantee any claim outcome. Coverage decisions rest with your insurer.';

const DEFAULT_STEPS = [
  {
    icon: 'ClipboardCheck',
    title: 'Tell Us About Your Roof',
    desc: "Fill out the short form or call us. We'll confirm we service your area and book a time that works for you.",
  },
  {
    icon: 'SearchCheck',
    title: 'Get Your Free Inspection',
    desc: 'We physically get on the roof — not a drive-by. You get photos of everything we find and a straight answer about its condition.',
  },
  {
    icon: 'HardHat',
    title: 'Get Your Written Estimate',
    desc: 'A clear price with no surprise line items. Approve it and we schedule the work — no pressure either way.',
  },
];

export const funnels = {
  // ── Generic contractor-hire + comparison searches ──────────────
  // "roofers near me", "roof companies near me", "best roofers near me"
  // ~65% of campaign volume. No service assumed, so the offer stays broad.
  'nashville-roofing': {
    slug: 'nashville-roofing',
    adGroup: 'Generic Hire + Comparison',
    meta: {
      title: 'Nashville Roofing Company | Free Inspection + Price Beat Guarantee',
      description:
        "Licensed, insured, locally owned Nashville roofers. Free inspection, lifetime warranty, and we'll beat any comparable written quote. Call (629) 277-4249.",
    },
    eyebrow: 'Nashville & Middle Tennessee',
    headline: {
      before: 'Need a Roofer in Nashville? ',
      highlight: "We'll Beat Any Competitor's Price",
      after: ' — And the Inspection Is Free.',
    },
    subhead:
      "Locally owned, licensed and insured, with a lifetime warranty on every roof we install. Get your other quotes — then bring us the best one.",
    pillars: [
      { icon: 'TrendingDown', title: 'Price Beat Guarantee', desc: 'Bring any comparable written quote' },
      { icon: 'SearchCheck', title: 'Free Inspection', desc: 'On the roof, photographed, no obligation' },
    ],
    ctaLabel: 'Get My Free Inspection →',
    offer: {
      heading: 'Two Reasons to Call Us First',
      subhead:
        'Most roofing companies make you choose between a fair price and quality work. We took that decision off the table.',
      cards: [
        {
          icon: 'TrendingDown',
          accent: 'primary',
          title: "We'll Beat Any Competitor's Price",
          body: "Get your other estimates. Seriously. Then bring us the written quote and we'll beat it on comparable scope and materials — while still backing the job with our lifetime warranty. You should never have to pay more to work with the better crew.",
          bullets: ['Bring any written estimate', 'Same scope, same materials, lower price', 'Lifetime warranty still included'],
        },
        {
          icon: 'SearchCheck',
          accent: 'cta',
          title: 'A Free Inspection That Tells You the Truth',
          body: "Our inspectors get on the roof and document what's actually there. If your roof has years left, we'll tell you that and walk away. We'd rather earn your call in three years than sell you something you don't need today.",
          bullets: ['Full photo documentation', 'Honest condition assessment', 'Zero obligation, zero pressure'],
        },
      ],
    },
    closing: {
      heading: "Ready for a Roof That's Out of This World?",
      body: "Free inspection, a price we guarantee beats your other quotes, and a lifetime warranty behind the work.",
    },
    steps: DEFAULT_STEPS,
    finePrint: PRICE_BEAT_FINE_PRINT,
  },

  // ── Replacement intent ─────────────────────────────────────────
  // "roof replacement near me", "roof installers near me"
  // The only variation where the free-gutters offer applies.
  'roof-replacement': {
    slug: 'roof-replacement',
    adGroup: 'Roof Replacement',
    meta: {
      title: 'Free Gutters With Your New Roof | Nashville Roof Replacement',
      description:
        "Replacing your Nashville roof? Get free seamless gutters plus our price beat guarantee. Lifetime warranty, licensed and insured. Call (629) 277-4249.",
    },
    eyebrow: 'Limited Time — Nashville Homeowners',
    headline: {
      before: 'Need a New Roof in Nashville? ',
      highlight: 'Get Free Gutters',
      after: " — And We'll Beat Any Competitor's Price.",
    },
    subhead:
      "Free inspection, honest pricing, and a lifetime warranty from the crew Middle Tennessee homeowners actually trust. Bring us a written quote — we'll beat it.",
    pillars: [
      { icon: 'Gift', title: 'Free Gutters', desc: 'With every full roof replacement' },
      { icon: 'TrendingDown', title: 'Price Beat Guarantee', desc: 'Bring any comparable written quote' },
    ],
    ctaLabel: 'Claim My Free Gutters →',
    offer: {
      heading: 'Two Reasons to Call Us First',
      subhead:
        'Most roofing companies make you choose between a fair price and quality work. We took that decision off the table.',
      cards: [
        {
          icon: 'Gift',
          accent: 'cta',
          title: 'Free Gutters, Fully Installed',
          body: "Replace your roof with us and we'll install brand-new seamless aluminum gutters at no charge. Not a discount, not a rebate — included. New gutters protect the roof you just paid for, so it never made sense to us to sell them separately.",
          bullets: ['5" seamless aluminum', 'Professionally installed by our crew', 'No hidden add-on fees'],
        },
        {
          icon: 'TrendingDown',
          accent: 'primary',
          title: "We'll Beat Any Competitor's Price",
          body: "Get your other estimates. Seriously. Then bring us the written quote and we'll beat it on comparable scope and materials — while still backing the job with our lifetime warranty. You should never have to pay more to work with the better crew.",
          bullets: ['Bring any written estimate', 'Same scope, same materials, lower price', 'Lifetime warranty still included'],
        },
      ],
    },
    closing: {
      heading: "Ready for a Roof That's Out of This World?",
      body: 'Free inspection, free gutters with your replacement, and a price we guarantee beats your other quotes.',
    },
    steps: [
      DEFAULT_STEPS[0],
      DEFAULT_STEPS[1],
      {
        icon: 'HardHat',
        title: 'Get Your Price — And Free Gutters',
        desc: 'A clear written estimate with no surprise line items. Approve it and we schedule the work, gutters included.',
      },
    ],
    finePrint: GUTTERS_FINE_PRINT + PRICE_BEAT_FINE_PRINT,
  },

  // ── Repair & leak intent ───────────────────────────────────────
  // "roof repair near me", "roof leak repair", "fix roof leak"
  // ~23% of volume. Deliberately no gutters offer — these searchers do not
  // want a replacement, and leading with one reads as an upsell.
  'roof-repair': {
    slug: 'roof-repair',
    adGroup: 'Roof Repair & Leaks',
    meta: {
      title: 'Roof Leak Repair Nashville TN | Free Inspection | Stellar Roofing',
      description:
        "Roof leak or storm damage in Nashville? We repair what's broken and won't push a replacement you don't need. Free inspection. Call (629) 277-4249.",
    },
    eyebrow: 'Nashville & Middle Tennessee',
    headline: {
      before: 'Roof Leaking in Nashville? ',
      highlight: "We'll Fix It — Not Upsell You.",
      after: '',
    },
    subhead:
      "If your roof needs a repair, we'll repair it. If it genuinely needs replacing, we'll show you the photos and let you decide. Free inspection either way.",
    pillars: [
      { icon: 'Wrench', title: 'Repairs Done Right', desc: "We fix what's broken, not what sells" },
      { icon: 'SearchCheck', title: 'Free Inspection', desc: 'Photographed, with an honest answer' },
    ],
    ctaLabel: 'Get My Free Inspection →',
    offer: {
      heading: 'Why Homeowners Call Us for Repairs',
      subhead:
        "Plenty of roofing companies treat every leak as a replacement lead. We don't — and it's the main reason people call us back.",
      cards: [
        {
          icon: 'Wrench',
          accent: 'primary',
          title: "We Repair. We Don't Upsell.",
          body: "Most leaks are a flashing problem, a pipe boot, or a handful of shingles — not a $20,000 roof. We'll tell you when a repair is the right call, do it properly, and leave. If the roof really is past saving, you'll see the photos that prove it.",
          bullets: ['Leaks, flashing, boots, and shingle damage', 'Photo evidence before and after', 'No replacement pitch unless you need one'],
        },
        {
          icon: 'AlertTriangle',
          accent: 'cta',
          title: 'Active Leak? Tell Us on the Form.',
          body: "Water coming into the house moves to the front of our schedule. Flag it when you reach out — or just call, which is faster — and we'll get someone out to stop the damage before it reaches your drywall and insulation.",
          bullets: ['Active leaks prioritized', 'Temporary protection when needed', 'Licensed and insured crews'],
        },
      ],
    },
    closing: {
      heading: "Let's Get That Leak Stopped",
      body: "Free inspection, honest assessment, and a repair crew that won't try to sell you a roof you don't need.",
    },
    steps: [
      {
        icon: 'ClipboardCheck',
        title: 'Tell Us What You Are Seeing',
        desc: 'Ceiling stain, missing shingles, active drip — whatever it is, tell us on the form or over the phone.',
      },
      {
        icon: 'SearchCheck',
        title: 'We Find the Actual Source',
        desc: "Leaks rarely start where they show up inside. We get on the roof and trace it back to the real cause, then photograph it.",
      },
      {
        icon: 'Wrench',
        title: 'We Fix It — and Show You',
        desc: 'A written price before we start, and photos of the finished repair when we are done.',
      },
    ],
    finePrint: PRICE_BEAT_FINE_PRINT,
  },

  // ── Storm & hail intent ────────────────────────────────────────
  // "roof hail damage", "storm damage roofing" — cheapest CPCs on the list.
  // Copy is scoped carefully: contractors are not public adjusters in TN.
  'storm-damage': {
    slug: 'storm-damage',
    adGroup: 'Storm & Hail Damage',
    meta: {
      title: 'Storm & Hail Damage Roof Repair Nashville TN | Free Assessment',
      description:
        'Hail or wind damage to your Nashville roof? Free damage assessment with full photo documentation, and we can meet your adjuster on site. Call (629) 277-4249.',
    },
    eyebrow: 'Storm & Hail Damage — Middle Tennessee',
    headline: {
      before: 'Storm Damage in Nashville? ',
      highlight: 'Find Out Before Your Claim Window Closes.',
      after: '',
    },
    subhead:
      "Hail and wind damage often isn't visible from the ground — and most insurance policies have a filing deadline. Get a free, documented assessment while you still have options.",
    pillars: [
      { icon: 'CloudLightning', title: 'Free Damage Assessment', desc: 'Full photo documentation' },
      { icon: 'FileCheck', title: 'Adjuster Meet-Ups', desc: "We'll be there when they inspect" },
    ],
    ctaLabel: 'Check My Roof for Storm Damage →',
    offer: {
      heading: 'What We Actually Do for Storm Damage',
      subhead:
        "Storm work attracts a lot of out-of-town crews making big promises. Here's exactly what we do and don't do.",
      cards: [
        {
          icon: 'CloudLightning',
          accent: 'primary',
          title: 'We Document the Damage Properly',
          body: "Hail bruising and wind creasing are easy to miss and easy to dismiss. We get on the roof, mark and photograph every impact, and give you a detailed written estimate of what it takes to make it right.",
          bullets: ['Hail, wind, and debris damage', 'Marked and photographed test squares', 'Detailed written scope and estimate'],
        },
        {
          icon: 'FileCheck',
          accent: 'cta',
          title: 'We Can Meet Your Adjuster On Site',
          body: "When your insurer sends an adjuster, we can be there with our documentation so nothing gets overlooked. We're a roofing contractor, not a public adjuster — we don't file or negotiate your claim, but we make sure the damage is properly presented.",
          bullets: ['On-site during the adjuster visit', 'Our documentation shared directly', 'Repairs handled once your claim settles'],
        },
      ],
    },
    closing: {
      heading: "Don't Let the Claim Window Close",
      body: 'Free assessment, full documentation, and a local crew that will still be here next season.',
    },
    steps: [
      {
        icon: 'ClipboardCheck',
        title: 'Tell Us When the Storm Hit',
        desc: 'Even a rough date helps — insurers tie claims to specific weather events in your area.',
      },
      {
        icon: 'SearchCheck',
        title: 'We Assess and Document',
        desc: 'On the roof, marking and photographing hail strikes and wind damage, with a written scope of what it takes to repair.',
      },
      {
        icon: 'HardHat',
        title: 'We Repair Once You Are Ready',
        desc: 'Whether it goes through insurance or not, the work is backed by our warranty and done by our own crews.',
      },
    ],
    finePrint: PRICE_BEAT_FINE_PRINT + INSURANCE_FINE_PRINT,
  },
};

// Served at the bare subdomain root.
export const DEFAULT_FUNNEL_SLUG = 'nashville-roofing';

export const funnelSlugs = Object.keys(funnels);
export const getFunnel = slug => funnels[slug] || null;
