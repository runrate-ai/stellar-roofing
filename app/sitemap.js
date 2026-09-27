import config from '../lib/config';
import blogPosts, { BLOG_BASE, postPath } from '../lib/blog-posts';

export default function sitemap() {
  const base = config.business.website;
  const now = new Date().toISOString();

  const staticPages = ['', '/about', '/contact', '/free-inspection'].map(path => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: path === '' ? 1 : 0.8,
  }));

  const locationHubs = Object.values(config.locations).map(loc => ({
    url: `${base}/${loc.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.95,
  }));

  const servicePages = Object.values(config.locations).flatMap(loc =>
    config.services.map(s => ({
      url: `${base}/${loc.slug}/services/${s.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    }))
  );

  const areaPages = Object.values(config.locations).flatMap(loc =>
    loc.serviceAreas.map(a => ({
      url: `${base}/${loc.slug}/service-areas/${a.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    }))
  );

  const blogPages = [
    { url: `${base}${BLOG_BASE}`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    ...blogPosts.map(p => ({
      url: `${base}${postPath(p.slug)}`,
      lastModified: new Date(p.datePublished).toISOString(),
      changeFrequency: 'monthly',
      priority: 0.7,
    })),
  ];

  return [...staticPages, ...locationHubs, ...servicePages, ...areaPages, ...blogPages];
}
