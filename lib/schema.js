import config from './config';

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'RoofingContractor',
    name: config.business.name,
    legalName: config.business.legalName,
    description: config.business.description,
    telephone: config.business.phone,
    email: config.business.email,
    url: config.business.website,
    foundingDate: config.business.yearFounded.toString(),
    areaServed: [
      'Nashville, TN', 'Murfreesboro, TN', 'Clarksville, TN',
      'Franklin, TN', 'Brentwood, TN', 'Hendersonville, TN',
      'Gallatin, TN', 'Smyrna, TN', 'Spring Hill, TN',
      'Mount Juliet, TN', 'Lebanon, TN',
    ],
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '07:00', closes: '19:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday'], opens: '08:00', closes: '17:00' },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Roofing Services',
      itemListElement: config.services.map(s => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: s.name },
      })),
    },
  };
}

export function serviceSchema({ name, description, url, areaServed = 'Nashville, TN' }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    provider: {
      '@type': 'RoofingContractor',
      name: config.business.name,
      telephone: config.business.phone,
      url: config.business.website,
    },
    areaServed,
    url,
  };
}

export function faqSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  };
}

export function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${config.business.website}${item.path}`,
    })),
  };
}
