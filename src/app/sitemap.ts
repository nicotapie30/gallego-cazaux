import type { MetadataRoute } from 'next';
import { getPropertySlugs, getCities, getPropertyTypesInUse, getLastFaqUpdate } from '@/lib/sanity';
import { PROPERTY_TYPES } from '@/lib/property-types';
import { slugifyCity } from '@/lib/utils';

// Sin esto el sitemap se congela en el build: una propiedad nueva no aparecería
// hasta el próximo deploy. Diario y no horario porque el webhook ya lo revalida
// por tag al publicar — el reloj es solo la red por si el hook falla
export const revalidate = 86400;

/**
 * Última edición del contenido fijo (contacto, nosotros, términos, privacidad).
 * Se actualiza a mano cuando se cambia ese texto. Con `new Date()` el lastmod
 * cambiaba en cada regeneración: Google detecta que no es confiable y deja de
 * tenerlo en cuenta para todo el sitemap, incluidas las fichas donde sí es real.
 */
const CONTENIDO_FIJO = new Date('2026-07-30T00:00:00.000Z');

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL
  ?? (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'https://gallegocazaux.com');

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [properties, cities, typesInUse, lastFaqUpdate] = await Promise.all([
    getPropertySlugs(),
    getCities(),
    getPropertyTypesInUse(),
    getLastFaqUpdate(),
  ]);

  // La fecha real de cada propiedad, no "ahora": si le decimos a Google que
  // todo cambió recién, deja de confiar en lastModified
  const propertyUrls: MetadataRoute.Sitemap = properties.map((p) => ({
    url: `${SITE_URL}/propiedades/${p.slug}`,
    lastModified: new Date(p.updatedAt),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // El listado se renueva con la propiedad más reciente
  const lastPropertyChange = properties.length
    ? new Date(Math.max(...properties.map((p) => new Date(p.updatedAt).getTime())))
    : new Date();

  const operationUrls: MetadataRoute.Sitemap = ['venta', 'alquiler'].map((op) => ({
    url: `${SITE_URL}/propiedades/${op}`,
    lastModified: lastPropertyChange,
    changeFrequency: 'daily',
    priority: 0.85,
  }));

  const cityUrls: MetadataRoute.Sitemap = cities.map((city) => ({
    url: `${SITE_URL}/propiedades/ciudad/${slugifyCity(city)}`,
    lastModified: lastPropertyChange,
    changeFrequency: 'daily',
    priority: 0.8,
  }));

  // Solo los tipos que tienen landing Y al menos una propiedad publicada
  const typeUrls: MetadataRoute.Sitemap = Object.keys(PROPERTY_TYPES)
    .filter((tipo) => typesInUse.includes(tipo))
    .map((tipo) => ({
      url: `${SITE_URL}/propiedades/tipo/${tipo}`,
      lastModified: lastPropertyChange,
      changeFrequency: 'daily' as const,
      priority: 0.75,
    }));

  return [
    { url: SITE_URL,                     lastModified: lastPropertyChange, changeFrequency: 'daily',   priority: 1.0 },
    { url: `${SITE_URL}/propiedades`,    lastModified: lastPropertyChange, changeFrequency: 'daily',   priority: 0.9 },
    ...operationUrls,
    ...cityUrls,
    ...typeUrls,
    { url: `${SITE_URL}/contacto`,       lastModified: CONTENIDO_FIJO, changeFrequency: 'monthly', priority: 0.7 },
    // La FAQ sí cambia: se sigue la fecha de la última pregunta editada en Sanity
    { url: `${SITE_URL}/faq`,            lastModified: lastFaqUpdate ? new Date(lastFaqUpdate) : CONTENIDO_FIJO, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/sobre-nosotros`, lastModified: CONTENIDO_FIJO, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/privacidad`,     lastModified: CONTENIDO_FIJO, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${SITE_URL}/terminos`,       lastModified: CONTENIDO_FIJO, changeFrequency: 'yearly',  priority: 0.3 },
    ...propertyUrls,
  ];
}
