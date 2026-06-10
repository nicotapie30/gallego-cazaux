import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { Property } from '@/lib/types';
import { getPropertyBySlug, getProperties } from '@/lib/sanity';
import { urlFor } from '@/lib/sanity';
import PropertyDetailClient from './PropertyDetailClient';
import { breadcrumbSchema, propertySchema } from '@/lib/schema';
import { safeJsonLd } from '@/lib/safe-json-ld';

export const revalidate = 3600;
export const dynamicParams = true;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);
  if (!property) return {};

  const image = property.images?.[0];
  const imageUrl = image ? urlFor(image).width(1200).height(630).url() : undefined;
  const description = property.description?.slice(0, 160) ?? '';

  return {
    title: `${property.title} | Gallego Cazaux`,
    description,
    openGraph: {
      title: property.title,
      description,
      type: 'website',
      images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630, alt: property.title }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: property.title,
      description,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

export default async function PropertyDetailPage({ params }: Props) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);
  if (!property) notFound();

  const allProperties: Property[] = await getProperties();
  const similar = allProperties
    .filter((p: Property) => p._id !== property._id && p.operation === property.operation && p.propertyType === property.propertyType)
    .slice(0, 3);

  if (similar.length < 3) {
    const more = allProperties
      .filter((p: Property) => p._id !== property._id && p.operation === property.operation && !similar.find((s: Property) => s._id === p._id))
      .slice(0, 3 - similar.length);
    similar.push(...more);
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
    ?? (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'https://gallegocazaux.com');

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(propertySchema(property)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbSchema([
        { name: 'Inicio', url: siteUrl },
        { name: 'Propiedades', url: `${siteUrl}/propiedades` },
        { name: property.title, url: `${siteUrl}/propiedades/${property.slug.current}` },
      ])) }} />
      <PropertyDetailClient property={property} similarProperties={similar} />
    </>
  );
}
