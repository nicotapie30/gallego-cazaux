import { urlFor } from './sanity';
import type { SanityImage } from './types';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL
  ?? (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'https://gallegocazaux.com');

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['RealEstateAgent', 'LocalBusiness'],
    name: 'Gallego Cazaux Negocios Inmobiliarios',
    url: SITE_URL,
    telephone: '+542954272138',
    email: 'gallegocazaux@gmail.com',
    description: 'Inmobiliaria en Santa Rosa, La Pampa. Más de 20 años acompañando familias e inversores en compra, venta y alquiler de propiedades.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Pellegrini 594',
      addressLocality: 'Santa Rosa',
      addressRegion: 'La Pampa',
      postalCode: '6300',
      addressCountry: 'AR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -36.6167,
      longitude: -64.2895,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:30',
        closes: '13:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '16:30',
        closes: '19:00',
      },
    ],
    areaServed: [
      { '@type': 'City', name: 'Santa Rosa', containedInPlace: { '@type': 'State', name: 'La Pampa', containedInPlace: { '@type': 'Country', name: 'Argentina' } } },
      { '@type': 'State', name: 'La Pampa' },
    ],
    sameAs: ['https://www.instagram.com/gallegocazauxnegocios/'],
    priceRange: '$$',
    image: `${SITE_URL}/equipo-opt.webp`,
  };
}

export function faqPageSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function propertySchema(property: {
  title: string;
  description: string;
  address: string;
  city: string;
  province: string;
  price: number | null;
  currency: string;
  priceOnRequest?: boolean;
  publishedAt: string;
  slug: { current: string };
  images: SanityImage[];
}) {
  const firstImage = property.images?.[0];
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: property.title,
    description: property.description,
    url: `${SITE_URL}/propiedades/${property.slug.current}`,
    datePosted: property.publishedAt,
    image: firstImage ? urlFor(firstImage).width(1200).url() : undefined,
    address: {
      '@type': 'PostalAddress',
      streetAddress: property.address,
      addressLocality: property.city,
      addressRegion: property.province,
      addressCountry: 'AR',
    },
    ...(!property.priceOnRequest && property.price != null && property.price > 0 ? {
      offers: {
        '@type': 'Offer',
        price: property.price,
        priceCurrency: property.currency,
        availability: 'https://schema.org/InStock',
      },
    } : {}),
  };
}
