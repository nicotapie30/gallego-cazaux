import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: { asset: { url: string } }) {
  return builder.image(source);
}

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

  query += `] | order(publishedAt desc) {
    _id,
    title,
    slug,
    operation,
    propertyType,
    price,
    currency,
    address,
    city,
    province,
    features,
    "images": images[].asset->url,
    isFeatured,
    status
  }`;

  return sanityClient.fetch(query, params);
}

export async function getPropertyBySlug(slug: string) {
  const query = `*[_type == "property" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    operation,
    propertyType,
    price,
    currency,
    address,
    city,
    province,
    description,
    features,
    "images": images[].asset->url,
    isFeatured,
    status,
    publishedAt
  }`;

  return sanityClient.fetch(query, { slug });
}

export async function getFeaturedProperties() {
  return getProperties({ featured: true });
}

export async function getFAQ() {
  const query = `*[_type == "faq"] | order(category asc) {
    _id,
    question,
    answer,
    category
  }`;

  return sanityClient.fetch(query);
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