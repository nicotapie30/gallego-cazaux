import type { Metadata } from 'next';
import type { Property } from '@/lib/types';
import { getFeaturedProperties } from '@/lib/sanity';
import { ogBase } from '@/lib/seo';
import HomeClient from './HomeClient';

export const revalidate = 86400;

export const metadata: Metadata = {
  title: 'Gallego Cazaux - Negocios Inmobiliarios',
  // 145 chars: la anterior medía 158 y quedaba justo en el corte del SERP.
  // Se sacó el segundo "Santa Rosa", que estaba repetido
  description: 'Inmobiliaria en Santa Rosa, La Pampa. Más de 8 años acompañando familias e inversores en toda la zona. Venta, alquiler y tasación de propiedades.',
  keywords: ['inmobiliaria', 'propiedades', 'venta', 'alquiler', 'Santa Rosa', 'La Pampa'],
  alternates: { canonical: '/' },
  openGraph: {
    ...ogBase('/'),
    title: 'Gallego Cazaux - Negocios Inmobiliarios',
    description: 'Inmobiliaria en Santa Rosa, La Pampa. Venta y alquiler de propiedades.',
  },
};

export default async function Page() {
  const featuredProperties: Property[] = await getFeaturedProperties();
  return (
    <>
      {/* Marcador de ruta home: el Header lee `body:has([data-home])` por CSS
          para entrar en modo transparente/fixed. Determinista, sin usePathname. */}
      <div data-home hidden />
      <HomeClient featuredProperties={featuredProperties} />
    </>
  );
}
