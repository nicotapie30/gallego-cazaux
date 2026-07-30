import type { Metadata } from 'next';
import { OG_IMAGE } from '@/lib/seo';
import { notFound } from 'next/navigation';
import { getProperties, getPropertyTypesInUse } from '@/lib/sanity';
import PropiedadesClient from '../../PropiedadesClient';
import PropiedadesHeader from '../../PropiedadesHeader';
import PropertyListSchema from '@/components/PropertyListSchema';
import { PROPERTY_TYPES as TIPOS } from '@/lib/property-types';

export const revalidate = 3600;

export async function generateStaticParams() {
  return Object.keys(TIPOS).map((tipo) => ({ tipo }));
}

export async function generateMetadata({ params }: { params: Promise<{ tipo: string }> }): Promise<Metadata> {
  const { tipo } = await params;
  const meta = TIPOS[tipo];
  if (!meta) return {};

  // El tipo es una categoría fija del negocio, así que la página sigue existiendo
  // aunque hoy no haya nada publicado — pero sin propiedades no aporta nada al
  // índice de Google, y ya está fuera del sitemap y del footer.
  const hayPropiedades = (await getPropertyTypesInUse()).includes(tipo);

  return {
    title: `${meta.plural} en Venta y Alquiler - Gallego Cazaux`,
    description: `${meta.plural} en venta y alquiler en Santa Rosa y La Pampa. Gallego Cazaux Negocios Inmobiliarios — más de 8 años de experiencia.`,
    alternates: { canonical: `/propiedades/tipo/${tipo}` },
    ...(hayPropiedades ? {} : { robots: { index: false, follow: true } }),
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
      <PropertyListSchema properties={properties} name={`${meta.plural} en venta y alquiler`} path={`/propiedades/tipo/${tipo}`} />
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
