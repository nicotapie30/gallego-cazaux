import type { Metadata } from 'next';
import { mockProperties } from '@/lib/mock-data';
import PropertyDetailClient from './PropertyDetailClient';
import { breadcrumbSchema, propertySchema } from '@/lib/schema';

export const revalidate = 3600;

export async function generateStaticParams() {
  return mockProperties.map((p) => ({ slug: p.slug.current }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const property = mockProperties.find((p) => p.slug.current === slug) ?? mockProperties[0];
  const image = property.images[0]?.asset?.url;
  const description = property.description.slice(0, 160);

  return {
    title: `${property.title} | Gallego Cazaux`,
    description,
    openGraph: {
      title: property.title,
      description,
      type: 'website',
      images: image ? [{ url: image, width: 1200, height: 630, alt: property.title }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: property.title,
      description,
      images: image ? [image] : [],
    },
  };
}

export default async function PropertyDetailPage({ params }: Props) {
  const { slug } = await params;
  const property = mockProperties.find((p) => p.slug.current === slug) ?? mockProperties[0];

  const similar = mockProperties
    .filter((p) => p._id !== property._id && p.operation === property.operation && p.propertyType === property.propertyType)
    .slice(0, 3);

  if (similar.length < 3) {
    const more = mockProperties
      .filter((p) => p._id !== property._id && p.operation === property.operation && !similar.find((s) => s._id === p._id))
      .slice(0, 3 - similar.length);
    similar.push(...more);
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
    ?? (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'https://gallegocazaux.com');

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(propertySchema(property)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
        { name: 'Inicio', url: siteUrl },
        { name: 'Propiedades', url: `${siteUrl}/propiedades` },
        { name: property.title, url: `${siteUrl}/propiedades/${property.slug.current}` },
      ])) }} />
      <PropertyDetailClient property={property} similarProperties={similar} />
    </>
  );
}
