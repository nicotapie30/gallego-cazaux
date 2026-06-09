import type { MetadataRoute } from 'next';
import { getPropertySlugs } from '@/lib/sanity';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL
  ?? (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'https://gallegocazaux.com');

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getPropertySlugs();

  const propertyUrls: MetadataRoute.Sitemap = slugs.map((s) => ({
    url: `${SITE_URL}/propiedades/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [
    { url: SITE_URL,                          lastModified: new Date(), changeFrequency: 'daily',   priority: 1.0 },
    { url: `${SITE_URL}/propiedades`,          lastModified: new Date(), changeFrequency: 'daily',   priority: 0.9 },
    { url: `${SITE_URL}/contacto`,             lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/faq`,                  lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/sobre-nosotros`,       lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/privacidad`,           lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${SITE_URL}/terminos`,             lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.3 },
    ...propertyUrls,
  ];
}
