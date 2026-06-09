import type { Metadata } from 'next';
import type { Property } from '@/lib/types';
import { getFeaturedProperties } from '@/lib/sanity';
import HomeClient from './HomeClient';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Gallego Cazaux - Negocios Inmobiliarios',
  description: 'Inmobiliaria en Santa Rosa, La Pampa. Más de 20 años acompañando familias e inversores. Venta, alquiler y tasación de propiedades.',
  keywords: ['inmobiliaria', 'propiedades', 'venta', 'alquiler', 'Santa Rosa', 'La Pampa'],
  openGraph: {
    title: 'Gallego Cazaux - Negocios Inmobiliarios',
    description: 'Inmobiliaria en Santa Rosa, La Pampa. Venta y alquiler de propiedades.',
    type: 'website',
  },
};

export default async function Page() {
  const featuredProperties: Property[] = await getFeaturedProperties();
  return <HomeClient featuredProperties={featuredProperties} />;
}
