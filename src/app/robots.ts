import type { MetadataRoute } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL
  ?? (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'https://gallegocazaux.com');

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // /studio es el Sanity Studio — no tiene por qué estar en el índice
      disallow: ['/api/', '/studio'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
