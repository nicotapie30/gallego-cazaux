import type { Metadata } from 'next';
import { ogBase } from '@/lib/seo';
import { getProperties } from '@/lib/sanity';
import PropiedadesClient from '../PropiedadesClient';
import PropiedadesHeader from '../PropiedadesHeader';
import PropertyListSchema from '@/components/PropertyListSchema';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Propiedades en Venta - Gallego Cazaux',
  description: 'Casas, departamentos, terrenos y locales en venta en Santa Rosa y La Pampa. Gallego Cazaux Negocios Inmobiliarios — más de 8 años de experiencia.',
  alternates: { canonical: '/propiedades/venta' },
  openGraph: {
    ...ogBase('/propiedades/venta'),
    title: 'Propiedades en Venta - Gallego Cazaux',
    description: 'Encontrá tu propiedad ideal en venta en La Pampa.',
  },
};

export default async function Page() {
  const properties = await getProperties({ operation: 'venta' });
  return (
    <>
      <PropertyListSchema properties={properties} name="Propiedades en venta" path="/propiedades/venta" />
      <PropiedadesHeader
        heading={{
          title: 'Propiedades en venta',
          subtitle: 'Casas, departamentos, terrenos y locales en venta en Santa Rosa y La Pampa',
          crumb: 'Venta',
        }}
      />
      <PropiedadesClient initialProperties={properties} initialOperation="venta" />
    </>
  );
}
