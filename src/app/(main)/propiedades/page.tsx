import type { Metadata } from 'next';
import { ogBase } from '@/lib/seo';
import type { Property } from '@/lib/types';
import { getProperties } from '@/lib/sanity';
import PropiedadesClient from './PropiedadesClient';
import PropiedadesHeader from './PropiedadesHeader';
import PropertyListSchema from '@/components/PropertyListSchema';

export const revalidate = 3600;

export const metadata: Metadata = {
  // 60 y 158 chars: el título anterior (62) y la description (166) se pasaban
  // del corte del SERP y Google truncaba el final
  title: 'Propiedades en venta y alquiler, Santa Rosa | Gallego Cazaux',
  description: 'Casas, departamentos, terrenos y locales en venta y alquiler en Santa Rosa y La Pampa. Filtrá por zona, precio y dormitorios y encontrá el tuyo.',
  alternates: { canonical: '/propiedades' },
  openGraph: {
    ...ogBase('/propiedades'),
    title: 'Propiedades - Gallego Cazaux',
    description: 'Casas, departamentos, terrenos y locales en venta y alquiler en Santa Rosa, La Pampa.',
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
