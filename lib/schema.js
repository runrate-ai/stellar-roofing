import config from './config';

const geoData = {
  nashville: { latitude: 36.1627, longitude: -86.7816, addressLocality: 'Nashville', addressRegion: 'TN', postalCode: '37201', addressCountry: 'US' },
  boise: { latitude: 43.6150, longitude: -116.2023, addressLocality: 'Boise', addressRegion: 'ID', postalCode: '83701', addressCountry: 'US' },
};

export function localBusinessSchema(locationSlug = null) {
  const loc = locationSlug ? config.locations[locationSlug] : null;
  const phone = loc ? loc.phone : config.business.phone;
  const geo = locationSlug ? geoData[locationSlug] : geoData.nashville;
  const areaServed = loc
    ? loc.serviceAreas.map(a => `${a.city}, ${a.state}`)
    : [
        'Nashville, TN', 'Murfreesboro, TN', 'Clarksville, TN',
        'Franklin, TN', 'Brentwood, TN', 'Boise, ID',
        'Meridian, ID', 'Nampa, ID', 'Eagle, ID', 'Caldwell, ID',
      ];

  return {
    '@context': 'https://schema.org',
    '@type': 'RoofingContractor',
    name: config.business.name,
    legalName: config.business.legalName,
    description: loc ? loc.description : config.business.description,
    telephone: phone,
    email: loc ? loc.email : config.business.email,
    url: config.business.website,
    foundingDate: config.business.yearFounded.toString(),
    priceRange: '$$',
    areaServed,
    address: {
      '@type': 'PostalAddress',
      addressLocality: geo.addressLocality,
      addressRegion: geo.addressRegion,
      postalCode: geo.postalCode,
      addressCountry: geo.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: geo.latitude,
      longitude: geo.longitude,
    },
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

export function serviceSchema({ name, description, url, areaServed = 'Nashville, TN', phone = null }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    provider: {
      '@type': 'RoofingContractor',
      name: config.business.name,
      telephone: phone || config.business.phone,
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
