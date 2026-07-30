import type { Metadata } from 'next';
import { OG_IMAGE } from '@/lib/seo';
import { getProperties } from '@/lib/sanity';
import PropiedadesClient from '../PropiedadesClient';
import PropiedadesHeader from '../PropiedadesHeader';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Propiedades en Alquiler - Gallego Cazaux',
  description: 'Casas, departamentos y locales en alquiler en Santa Rosa y La Pampa. Gallego Cazaux Negocios Inmobiliarios — más de 8 años de experiencia.',
  alternates: { canonical: '/propiedades/alquiler' },
  openGraph: {
    title: 'Propiedades en Alquiler - Gallego Cazaux',
    description: 'Encontrá tu propiedad ideal en alquiler en La Pampa.',
    type: 'website',
    images: [OG_IMAGE],
  },
};

export default async function Page() {
  const properties = await getProperties({ operation: 'alquiler' });
  return (
    <>
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
