// Nashville blog index. Each post's page lives at app/nashville/blog/<slug>/page.js
// and reads its metadata from here, so the index, sitemap, and post pages agree.
// Primary keywords come from KEYWORD-AUDIT.md (OpenSEO, 2026-09-26).

import { generateMetadata } from './seo';

export const BLOG_BASE = '/nashville/blog';

const blogPosts = [
  {
    slug: 'how-much-does-roof-replacement-cost-nashville',
    title: 'How Much Does a Roof Replacement Cost in Nashville, TN?',
    metaTitle: 'Roof Replacement Cost in Nashville, TN | Price Guide | Stellar Roofing',
    description: 'What a roof replacement costs in Nashville, TN: typical price ranges, what drives the cost up or down, how insurance fits in, and how to get an accurate estimate.',
    excerpt: 'Typical price ranges for a Nashville roof replacement, what drives the cost up or down, and how to get an accurate number for your home.',
    primaryKeyword: 'roof replacement cost',
    category: 'Cost & Pricing',
    readTime: '6 min read',
    datePublished: '2026-09-26',
    relatedService: 'roof-replacement',
    related: ['signs-you-need-a-new-roof', 'metal-roof-vs-shingles-cost', 'how-long-does-roof-replacement-take'],
  },
  {
    slug: 'metal-roof-vs-shingles-cost',
    title: 'Metal Roof vs. Shingles: Cost, Lifespan, and Which Is Right for Your Nashville Home',
    metaTitle: 'Metal Roof vs Shingles Cost | Nashville Homeowner Guide | Stellar Roofing',
    description: 'Metal roof vs. asphalt shingles for Nashville homes: upfront cost, cost over the life of the roof, hail performance, noise, and when each one makes sense.',
    excerpt: 'Metal costs more upfront and lasts longer. Here is how the cost comparison works out for Middle Tennessee homes, and when each option wins.',
    primaryKeyword: 'metal roof vs shingles cost',
    category: 'Materials',
    readTime: '6 min read',
    datePublished: '2026-09-26',
    relatedService: 'roof-replacement',
    related: ['how-much-does-roof-replacement-cost-nashville', 'how-long-do-asphalt-shingles-last', 'what-size-hail-damages-a-roof'],
  },
  {
    slug: 'how-long-does-roof-replacement-take',
    title: 'How Long Does a Roof Replacement Take?',
    metaTitle: 'How Long Does a Roof Replacement Take? | Nashville | Stellar Roofing',
    description: 'Most roof replacements take one to two days. Here is what happens on installation day, what can stretch the timeline, and how Nashville weather factors in.',
    excerpt: 'One day or one week? An honest look at roof replacement timelines, what happens on installation day, and what can slow things down.',
    primaryKeyword: 'how long does a roof replacement take',
    category: 'Roof Replacement',
    readTime: '4 min read',
    datePublished: '2026-09-26',
    relatedService: 'roof-replacement',
    related: ['how-much-does-roof-replacement-cost-nashville', 'signs-you-need-a-new-roof', 'how-to-choose-a-roofing-contractor'],
  },
  {
    slug: 'how-long-do-asphalt-shingles-last',
    title: 'How Long Do Asphalt Shingles Last? (And What Shortens Their Life in Nashville)',
    metaTitle: 'How Long Do Asphalt Shingles Last? | Nashville Climate Guide | Stellar Roofing',
    description: 'How long asphalt shingles really last in Middle Tennessee, why heat, humidity, and storms shorten that, and what you can do to get more years out of your roof.',
    excerpt: 'Manufacturer ratings and real-world lifespan are not the same thing. Here is what to expect from asphalt shingles in Middle Tennessee.',
    primaryKeyword: 'how long do asphalt shingles last',
    category: 'Roof Lifespan',
    readTime: '5 min read',
    datePublished: '2026-09-26',
    relatedService: 'roof-inspection',
    related: ['signs-you-need-a-new-roof', 'metal-roof-vs-shingles-cost', 'how-much-does-roof-replacement-cost-nashville'],
  },
  {
    slug: 'signs-you-need-a-new-roof',
    title: '7 Signs You Need a New Roof',
    metaTitle: '7 Signs You Need a New Roof | Nashville Homeowner Guide | Stellar Roofing',
    description: 'Repair or replace? Seven warning signs that a Nashville roof needs replacing rather than patching, and what to do about each one.',
    excerpt: 'Not sure if your roof needs replacing or just a repair? These are the seven warning signs Nashville homeowners should not ignore.',
    primaryKeyword: 'signs you need a new roof',
    category: 'Roof Replacement',
    readTime: '5 min read',
    datePublished: '2026-09-26',
    relatedService: 'roof-inspection',
    related: ['how-long-do-asphalt-shingles-last', 'how-much-does-roof-replacement-cost-nashville', 'what-size-hail-damages-a-roof'],
  },
  {
    slug: 'hail-damage-roof-insurance-claim',
    title: 'Hail Damage and Your Roof: How the Insurance Claim Process Works in Tennessee',
    metaTitle: 'Hail Damage Roof Insurance Claim | Tennessee Guide | Stellar Roofing',
    description: 'What hail damage looks like, whether Tennessee homeowners insurance covers it, and a step-by-step walk through the roof insurance claim process.',
    excerpt: 'What hail damage looks like, what insurance usually covers, and a plain-language walk through the claim process from storm day to new roof.',
    primaryKeyword: 'hail damage roof insurance claim',
    category: 'Storm Damage',
    readTime: '8 min read',
    datePublished: '2026-09-26',
    relatedService: 'storm-damage-repair',
    related: ['what-size-hail-damages-a-roof', 'how-to-choose-a-roofing-contractor', 'signs-you-need-a-new-roof'],
  },
  {
    slug: 'what-size-hail-damages-a-roof',
    title: 'What Size Hail Damages a Roof?',
    metaTitle: 'What Size Hail Damages a Roof? | Hail Size Chart | Stellar Roofing',
    description: 'Pea, quarter, or golf ball? A hail size chart for roof damage, why size is not the whole story, and what to check after a storm in Middle Tennessee.',
    excerpt: 'Not all hail damages a roof. Here is the size range that matters, and what to check if your area was just hit.',
    primaryKeyword: 'what size hail damages a roof',
    category: 'Storm Damage',
    readTime: '5 min read',
    datePublished: '2026-09-26',
    relatedService: 'storm-damage-repair',
    related: ['hail-damage-roof-insurance-claim', 'signs-you-need-a-new-roof', 'how-long-do-asphalt-shingles-last'],
  },
  {
    slug: 'how-to-choose-a-roofing-contractor',
    title: 'How to Choose a Roofing Contractor (Without Getting Burned)',
    metaTitle: 'How to Choose a Roofing Contractor | Nashville Guide | Stellar Roofing',
    description: 'What a legitimate roofing contractor should have, the red flags that signal a storm chaser, and the questions to ask before you sign anything.',
    excerpt: 'Storm chasers and unqualified contractors are a real problem after Tennessee storms. Here is what to look for, and what to avoid.',
    primaryKeyword: 'how to choose a roofing contractor',
    category: 'Hiring a Contractor',
    readTime: '6 min read',
    datePublished: '2026-09-26',
    relatedService: 'roof-replacement',
    related: ['hail-damage-roof-insurance-claim', 'how-much-does-roof-replacement-cost-nashville', 'how-long-does-roof-replacement-take'],
  },
];

export default blogPosts;

export function getPost(slug) {
  const post = blogPosts.find(p => p.slug === slug);
  if (!post) throw new Error(`Unknown blog post: ${slug}`);
  return post;
}

export function postPath(slug) {
  return `${BLOG_BASE}/${slug}`;
}

export function postMetadata(slug) {
  const post = getPost(slug);
  const meta = generateMetadata({ title: post.metaTitle, description: post.description, path: postPath(slug) });
  return {
    ...meta,
    title: { absolute: post.metaTitle },
    openGraph: { ...meta.openGraph, type: 'article', publishedTime: post.datePublished },
  };
}
