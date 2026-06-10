import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url';
import type { Property, FAQ, Post } from './types';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
if (!projectId || projectId === 'your-project-id') {
  throw new Error('NEXT_PUBLIC_SANITY_PROJECT_ID no está configurada. Copiá .env.example a .env.local y completá los valores.');
}

export const sanityClient = createClient({
  projectId,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
});

const builder = createImageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

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
  images[]{ _key, asset, alt },
  "videos": videos[]{ _key, "url": asset->url },
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

  return sanityClient.fetch<Property[]>(query, params);
}

export async function getPropertyBySlug(slug: string) {
  const query = `*[_type == "property" && slug.current == $slug][0] {
    ${PROPERTY_FIELDS},
    description,
    publishedAt
  }`;
  return sanityClient.fetch<Property>(query, { slug });
}

export async function getFeaturedProperties(limit = 4): Promise<Property[]> {
  const safeLimit = Math.max(1, Math.min(20, Math.floor(limit)));
  const query = `*[_type == "property" && status == "disponible"] | order(isFeatured desc, publishedAt desc)[0..${safeLimit - 1}] { ${PROPERTY_FIELDS} }`;
  return sanityClient.fetch<Property[]>(query);
}

export async function getPropertySlugs(): Promise<{ slug: string }[]> {
  const query = `*[_type == "property" && defined(slug.current)]{ "slug": slug.current }`;
  return sanityClient.fetch(query);
}

export async function getFAQ() {
  const query = `*[_type == "faq"] | order(category asc) {
    _id,
    question,
    answer,
    category
  }`;
  return sanityClient.fetch<FAQ[]>(query);
}

export async function getBlogPosts() {
  const query = `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt
  }`;
  return sanityClient.fetch(query);
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
  return sanityClient.fetch(query, { slug });
}
