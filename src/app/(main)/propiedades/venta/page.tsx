import type { Metadata } from 'next';
import { getProperties } from '@/lib/sanity';
import PropiedadesClient from '../PropiedadesClient';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Propiedades en Venta - Gallego Cazaux',
  description: 'Casas, departamentos, terrenos y locales en venta en Santa Rosa y La Pampa. Gallego Cazaux Negocios Inmobiliarios — más de 20 años de experiencia.',
  openGraph: {
    title: 'Propiedades en Venta - Gallego Cazaux',
    description: 'Encontrá tu propiedad ideal en venta en La Pampa.',
    type: 'website',
  },
};

export default async function Page() {
  const properties = await getProperties({ operation: 'venta' });
  return <PropiedadesClient initialProperties={properties} initialOperation="venta" />;
}
