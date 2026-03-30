import config from '../lib/config';

export default function sitemap() {
  const base = config.business.website;
  const now = new Date().toISOString();

  const staticPages = ['', '/about', '/contact', '/free-inspection'].map(path => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: path === '' ? 1 : 0.8,
  }));

  const servicePages = config.services.map(s => ({
    url: `${base}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.9,
  }));

  const areaPages = config.serviceAreas.mvp.map(a => ({
    url: `${base}/service-areas/${a.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticPages, ...servicePages, ...areaPages];
}
