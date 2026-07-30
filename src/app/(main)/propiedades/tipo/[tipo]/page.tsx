import type { Metadata } from 'next';
import { OG_IMAGE } from '@/lib/seo';
import { notFound } from 'next/navigation';
import { getProperties } from '@/lib/sanity';
import PropiedadesClient from '../../PropiedadesClient';
import PropiedadesHeader from '../../PropiedadesHeader';
import { PROPERTY_TYPES as TIPOS } from '@/lib/property-types';

export const revalidate = 3600;

export async function generateStaticParams() {
  return Object.keys(TIPOS).map((tipo) => ({ tipo }));
}

export async function generateMetadata({ params }: { params: Promise<{ tipo: string }> }): Promise<Metadata> {
  const { tipo } = await params;
  const meta = TIPOS[tipo];
  if (!meta) return {};

  return {
    title: `${meta.plural} en Venta y Alquiler - Gallego Cazaux`,
    description: `${meta.plural} en venta y alquiler en Santa Rosa y La Pampa. Gallego Cazaux Negocios Inmobiliarios — más de 8 años de experiencia.`,
    alternates: { canonical: `/propiedades/tipo/${tipo}` },
    openGraph: {
      title: `${meta.plural} en Venta y Alquiler - Gallego Cazaux`,
      description: `Encontrá ${meta.plural.toLowerCase()} en La Pampa con Gallego Cazaux.`,
      type: 'website',
      images: [OG_IMAGE],
    },
  };
}

export default async function Page({ params }: { params: Promise<{ tipo: string }> }) {
  const { tipo } = await params;
  const meta = TIPOS[tipo];
  if (!meta) notFound();

  const properties = await getProperties({ propertyType: tipo });
  return (
    <>
      <PropiedadesHeader
        heading={{
          title: `${meta.plural} en Santa Rosa y La Pampa`,
          // Sin adjetivos: el plural cambia de género según el tipo (Casas / Terrenos)
          subtitle: `${meta.plural} en venta y alquiler en Santa Rosa y La Pampa`,
          crumb: meta.plural,
        }}
      />
      <PropiedadesClient initialProperties={properties} initialPropertyType={tipo} />
    </>
  );
}
