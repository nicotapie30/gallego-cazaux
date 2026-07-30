import type { Metadata } from 'next';
import { OG_IMAGE } from '@/lib/seo';
import type { Property } from '@/lib/types';
import { getProperties } from '@/lib/sanity';
import PropiedadesClient from './PropiedadesClient';
import PropiedadesHeader from './PropiedadesHeader';
import PropertyListSchema from '@/components/PropertyListSchema';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Propiedades en venta y alquiler en Santa Rosa | Gallego Cazaux',
  description: 'Explorá todas nuestras propiedades en Santa Rosa y La Pampa: casas, departamentos, terrenos y locales en venta y alquiler, con filtros por zona, precio y dormitorios.',
  alternates: { canonical: '/propiedades' },
  openGraph: {
    title: 'Propiedades - Gallego Cazaux',
    description: 'Casas, departamentos, terrenos y locales en venta y alquiler en Santa Rosa, La Pampa.',
    type: 'website',
    images: [OG_IMAGE],
  },
};

export default async function Page() {
  const properties: Property[] = await getProperties();
  return (
    <>
      <PropertyListSchema properties={properties} name="Propiedades en venta y alquiler" path="/propiedades" />
      <PropiedadesHeader />
      <PropiedadesClient initialProperties={properties} />
    </>
  );
}
