export const SITE_URL = 'https://montdesarts.org';

export const ATTRACTION = {
  name: 'Mont des Arts',
  alternateName: 'Kunstberg',
  description:
    'Mont des Arts (Kunstberg) is a historic cultural district and landscaped public garden in central Brussels, known for its terraced gardens, central fountain and panoramic viewpoint over the old town.',
  streetAddress: 'Mont des Arts 1',
  postalCode: '1000',
  addressLocality: 'Bruxelles',
  addressRegion: 'Brussels-Capital Region',
  addressCountry: 'BE',
  latitude: 50.8436,
  longitude: 4.3563,
  plusCode: 'R9V4+9X Brussels',
  ratingValue: 4.6,
  ratingCount: 17894,
  ratingChecked: '2026-10',
  mapsUrl: 'https://maps.app.goo.gl/cCCbQsPnaB1Vrnqp9',
  image: `${SITE_URL}/gallery/mont-des-arts-brussels-panorama.jpg`,
  sameAs: [
    'https://maps.app.goo.gl/cCCbQsPnaB1Vrnqp9',
    'https://www.wikidata.org/wiki/Q1492433',
  ],
  officialSources: [
    { label: 'Visit Brussels', url: 'https://visit.brussels/en' },
    { label: 'City of Brussels', url: 'https://www.brussels.be/' },
    { label: 'KBR', url: 'https://www.kbr.be/en' },
    { label: 'Belgium.be', url: 'https://www.belgium.be/en' },
  ],
};

type FaqItem = { q: string; a: string };

export function buildTouristAttraction(locale: string, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    '@id': `${SITE_URL}#mont-des-arts`,
    name: ATTRACTION.name,
    alternateName: ATTRACTION.alternateName,
    description: ATTRACTION.description,
    url,
    image: ATTRACTION.image,
    isAccessibleForFree: true,
    publicAccess: true,
    inLanguage: locale,
    address: {
      '@type': 'PostalAddress',
      streetAddress: ATTRACTION.streetAddress,
      postalCode: ATTRACTION.postalCode,
      addressLocality: ATTRACTION.addressLocality,
      addressRegion: ATTRACTION.addressRegion,
      addressCountry: ATTRACTION.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: ATTRACTION.latitude,
      longitude: ATTRACTION.longitude,
    },
    hasMap: ATTRACTION.mapsUrl,
    sameAs: ATTRACTION.sameAs,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '00:00',
        closes: '23:59',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: ATTRACTION.ratingValue,
      reviewCount: ATTRACTION.ratingCount,
      bestRating: 5,
      worstRating: 1,
    },
  };
}

export function buildFaqPage(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };
}

export function buildBreadcrumb(locale: string, name: string, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: ATTRACTION.name,
        item: `${SITE_URL}/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name,
        item: `${SITE_URL}/${locale}${path}`,
      },
    ],
  };
}

export function buildArticle(locale: string, url: string, headline: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    inLanguage: locale,
    url,
    image: ATTRACTION.image,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };
}
