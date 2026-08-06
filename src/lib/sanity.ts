import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url';
import type { Property, FAQ } from './types';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
if (!projectId || projectId === 'your-project-id') {
  throw new Error('NEXT_PUBLIC_SANITY_PROJECT_ID no está configurada. Copiá .env.example a .env.local y completá los valores.');
}

export const sanityClient = createClient({
  projectId,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
});

const builder = createImageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

/** Un tag por tipo de documento: el webhook de Sanity rompe el del tipo que se
 *  editó y Next regenera todas las páginas que hayan consultado ese contenido,
 *  incluidas las de generateStaticParams. Ver src/app/api/revalidate/route.ts */
export const SANITY_TAGS = ['property', 'faq', 'post'] as const;
export type SanityTag = (typeof SANITY_TAGS)[number];

/** El revalidate es la red por si el webhook falla: con tags a secas, un hook
 *  caído dejaría el contenido congelado para siempre. Diario y no horario
 *  porque es solo eso, una red: la frescura real la da el webhook, que rompe
 *  el tag al publicar.
 *
 *  Con 3600 se regeneraba el sitio entero cada hora. Estos fetch los hace el
 *  layout de (main), y el revalidate más bajo de un route gana sobre el de sus
 *  páginas: el 86400 que declaran /contacto, /sobre-nosotros, /terminos y
 *  /privacidad quedaba anulado desde acá, y cada regeneración se paga en
 *  writes al caché ISR. No se estira más que un día porque el caso caro es una
 *  propiedad vendida que sigue publicada si el webhook se rompe en silencio. */
const cache = (tag: SanityTag) => ({ next: { tags: [tag], revalidate: 86400 } });

const PROPERTY_FIELDS = `
  _id,
  title,
  slug,
  operation,
  propertyType,
  price,
  priceOnRequest,
  priceNotes,
  currency,
  address,
  city,
  province,
  features,
  // defined(asset): en el Studio se puede agregar un slot de foto/video y no
  // subir el archivo. Esa entrada llega con asset nulo y urlFor() explota
  // leyendo asset._ref, que tiraba abajo el prerender de la ficha entera.
  // Se filtra acá y no en los componentes porque estos campos alimentan las 3
  // queries de propiedades: así el tipo Property, que declara asset como
  // obligatorio, deja de mentir y los 8 usos de urlFor quedan cubiertos.
  images[defined(asset)]{ _key, asset, alt, "lqip": asset->metadata.lqip },
  "videos": videos[defined(asset)]{ _key, "url": asset->url },
  isFeatured,
  status
`;

export async function getProperties(filters?: {
  operation?: string;
  propertyType?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  city?: string;
  featured?: boolean;
}) {
  let query = `*[_type == "property" && status == "disponible"`;
  const params: Record<string, string | number | boolean | undefined> = {};

  if (filters?.operation) {
    query += ` && operation == $operation`;
    params.operation = filters.operation;
  }
  if (filters?.propertyType) {
    query += ` && propertyType == $propertyType`;
    params.propertyType = filters.propertyType;
  }
  if (filters?.minPrice) {
    query += ` && price >= $minPrice`;
    params.minPrice = filters.minPrice;
  }
  if (filters?.maxPrice) {
    query += ` && price <= $maxPrice`;
    params.maxPrice = filters.maxPrice;
  }
  if (filters?.bedrooms) {
    query += ` && features.bedrooms >= $bedrooms`;
    params.bedrooms = filters.bedrooms;
  }
  if (filters?.city) {
    query += ` && city == $city`;
    params.city = filters.city;
  }
  if (filters?.featured) {
    query += ` && isFeatured == true`;
  }

  query += `] | order(publishedAt desc) { ${PROPERTY_FIELDS} }`;

  return sanityClient.fetch<Property[]>(query, params, cache('property'));
}

export async function getPropertyBySlug(slug: string) {
  const query = `*[_type == "property" && slug.current == $slug][0] {
    ${PROPERTY_FIELDS},
    description,
    publishedAt
  }`;
  return sanityClient.fetch<Property>(query, { slug }, cache('property'));
}

export async function getFeaturedProperties(limit = 4): Promise<Property[]> {
  const safeLimit = Math.max(1, Math.min(20, Math.floor(limit)));
  const query = `*[_type == "property" && status == "disponible"] | order(isFeatured desc, publishedAt desc)[0..${safeLimit - 1}] { ${PROPERTY_FIELDS} }`;
  return sanityClient.fetch<Property[]>(query, {}, cache('property'));
}

export async function getPropertySlugs(): Promise<{ slug: string; updatedAt: string }[]> {
  const query = `*[_type == "property" && defined(slug.current)]{ "slug": slug.current, "updatedAt": _updatedAt }`;
  return sanityClient.fetch(query, {}, cache('property'));
}

/** Fecha de la última FAQ editada — para el lastmod del sitemap */
export async function getLastFaqUpdate(): Promise<string | null> {
  const query = `*[_type == "faq"] | order(_updatedAt desc)[0]._updatedAt`;
  return sanityClient.fetch(query, {}, cache('faq'));
}

export async function getFAQ() {
  const query = `*[_type == "faq"] | order(category asc) {
    _id,
    question,
    answer,
    category
  }`;
  return sanityClient.fetch<FAQ[]>(query, {}, cache('faq'));
}

export async function getBlogPosts() {
  const query = `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt
  }`;
  return sanityClient.fetch(query, {}, cache('post'));
}

/** Tipos que hoy tienen al menos una propiedad disponible — el sitemap no debe
 *  listar landings vacías (thin content) */
export async function getPropertyTypesInUse(): Promise<string[]> {
  // order(@) como en getCities: el array se serializa tal cual en el payload RSC
  // de todas las páginas (va como prop al Footer, que es client). Sin orden fijo,
  // dos regeneraciones con los mismos datos pueden dar bytes distintos y cada una
  // se paga como un write al caché ISR.
  const query = `array::unique(*[_type == "property" && status == "disponible" && defined(propertyType)].propertyType) | order(@)`;
  return sanityClient.fetch(query, {}, cache('property'));
}

export async function getCities(): Promise<string[]> {
  const query = `array::unique(*[_type == "property" && status == "disponible" && defined(city)].city) | order(@)`;
  return sanityClient.fetch(query, {}, cache('property'));
}

export async function getBlogPostBySlug(slug: string) {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    content,
    publishedAt
  }`;
  return sanityClient.fetch(query, { slug }, cache('post'));
}
