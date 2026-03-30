import config from './config';

export function generateMetadata({ title, description, path = '', ogImage }) {
  const url = `${config.business.website}${path}`;
  const image = ogImage || config.seo.defaultOgImage;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: config.business.name,
      images: [{ url: `${config.business.website}${image}`, width: 1200, height: 630, alt: title }],
      type: 'website',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${config.business.website}${image}`],
    },
  };
}
