import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProperties } from '@/lib/sanity';
import PropiedadesClient from '../../PropiedadesClient';

export const revalidate = 3600;

const TIPOS: Record<string, { label: string; plural: string }> = {
  casa:         { label: 'Casa',         plural: 'Casas' },
  departamento: { label: 'Departamento', plural: 'Departamentos' },
  ph:           { label: 'PH',           plural: 'PHs' },
  terreno:      { label: 'Terreno',      plural: 'Terrenos' },
  local:        { label: 'Local',        plural: 'Locales' },
};

export async function generateStaticParams() {
  return Object.keys(TIPOS).map((tipo) => ({ tipo }));
}

export async function generateMetadata({ params }: { params: Promise<{ tipo: string }> }): Promise<Metadata> {
  const { tipo } = await params;
  const meta = TIPOS[tipo];
  if (!meta) return {};

  return {
    title: `${meta.plural} en Venta y Alquiler - Gallego Cazaux`,
    description: `${meta.plural} en venta y alquiler en Santa Rosa y La Pampa. Gallego Cazaux Negocios Inmobiliarios — más de 20 años de experiencia.`,
    openGraph: {
      title: `${meta.plural} en Venta y Alquiler - Gallego Cazaux`,
      description: `Encontrá ${meta.plural.toLowerCase()} en La Pampa con Gallego Cazaux.`,
      type: 'website',
    },
  };
}

export default async function Page({ params }: { params: Promise<{ tipo: string }> }) {
  const { tipo } = await params;
  if (!TIPOS[tipo]) notFound();

  const properties = await getProperties({ propertyType: tipo });
  return <PropiedadesClient initialProperties={properties} initialPropertyType={tipo} />;
}
