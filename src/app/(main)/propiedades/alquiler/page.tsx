import type { Metadata } from 'next';
import { getProperties } from '@/lib/sanity';
import PropiedadesClient from '../PropiedadesClient';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Propiedades en Alquiler - Gallego Cazaux',
  description: 'Casas, departamentos y locales en alquiler en Santa Rosa y La Pampa. Gallego Cazaux Negocios Inmobiliarios — más de 20 años de experiencia.',
  openGraph: {
    title: 'Propiedades en Alquiler - Gallego Cazaux',
    description: 'Encontrá tu propiedad ideal en alquiler en La Pampa.',
    type: 'website',
  },
};

export default async function Page() {
  const properties = await getProperties({ operation: 'alquiler' });
  return <PropiedadesClient initialProperties={properties} initialOperation="alquiler" />;
}
