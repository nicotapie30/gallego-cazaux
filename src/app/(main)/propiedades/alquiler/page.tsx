import type { Metadata } from 'next';
import { ogBase } from '@/lib/seo';
import { getProperties } from '@/lib/sanity';
import PropiedadesClient from '../PropiedadesClient';
import PropiedadesHeader from '../PropiedadesHeader';
import PropertyListSchema from '@/components/PropertyListSchema';

export const revalidate = 86400;

export const metadata: Metadata = {
  title: 'Propiedades en Alquiler - Gallego Cazaux',
  description: 'Casas, departamentos y locales en alquiler en Santa Rosa y La Pampa. Gallego Cazaux Negocios Inmobiliarios — más de 8 años de experiencia.',
  alternates: { canonical: '/propiedades/alquiler' },
  openGraph: {
    ...ogBase('/propiedades/alquiler'),
    title: 'Propiedades en Alquiler - Gallego Cazaux',
    description: 'Encontrá tu propiedad ideal en alquiler en La Pampa.',
  },
};

export default async function Page() {
  const properties = await getProperties({ operation: 'alquiler' });
  return (
    <>
      <PropertyListSchema properties={properties} name="Propiedades en alquiler" path="/propiedades/alquiler" />
      <PropiedadesHeader
        heading={{
          title: 'Propiedades en alquiler',
          subtitle: 'Casas, departamentos y locales en alquiler en Santa Rosa y La Pampa',
          crumb: 'Alquiler',
        }}
      />
      <PropiedadesClient initialProperties={properties} initialOperation="alquiler" />
    </>
  );
}
