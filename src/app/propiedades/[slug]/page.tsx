import type { Metadata } from 'next';
import { mockProperties } from '@/lib/mock-data';
import PropertyDetailClient from './PropertyDetailClient';

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
  return <PropertyDetailClient property={property} />;
}
