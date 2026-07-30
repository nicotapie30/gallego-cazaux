import type { Metadata } from 'next';
import type { Property } from '@/lib/types';
import { getProperties } from '@/lib/sanity';
import PropiedadesClient from './PropiedadesClient';
import PropiedadesHeader from './PropiedadesHeader';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Propiedades - Gallego Cazaux',
  description: 'Explorá todas nuestras propiedades en Santa Rosa y La Pampa. Casas, departamentos, terrenos y locales en venta y alquiler.',
  alternates: { canonical: '/propiedades' },
  openGraph: {
    title: 'Propiedades - Gallego Cazaux',
    description: 'Casas, departamentos, terrenos y locales en venta y alquiler en Santa Rosa, La Pampa.',
    type: 'website',
  },
};

export default async function Page() {
  const properties: Property[] = await getProperties();
  return (
    <>
      <PropiedadesHeader />
      <PropiedadesClient initialProperties={properties} />
    </>
  );
}
