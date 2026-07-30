import type { Metadata } from 'next';
import { OG_IMAGE } from '@/lib/seo';
import { notFound } from 'next/navigation';
import { getProperties, getCities } from '@/lib/sanity';
import { slugifyCity, deslugifyCity } from '@/lib/utils';
import PropiedadesClient from '../../PropiedadesClient';
import PropiedadesHeader from '../../PropiedadesHeader';

export const revalidate = 3600;

export async function generateStaticParams() {
  const cities = await getCities();
  return cities.map((city) => ({ ciudad: slugifyCity(city) }));
}

export async function generateMetadata({ params }: { params: Promise<{ ciudad: string }> }): Promise<Metadata> {
  const { ciudad } = await params;
  const cities = await getCities();
  const cityName = deslugifyCity(cities, ciudad);
  if (!cityName) return {};

  return {
    title: `Propiedades en ${cityName} - Gallego Cazaux`,
    description: `Casas, departamentos, terrenos y locales en venta y alquiler en ${cityName}, La Pampa. Gallego Cazaux Negocios Inmobiliarios.`,
    alternates: { canonical: `/propiedades/ciudad/${ciudad}` },
    openGraph: {
      title: `Propiedades en ${cityName} - Gallego Cazaux`,
      description: `Encontrá tu propiedad ideal en ${cityName}. Venta y alquiler con más de 8 años de experiencia.`,
      type: 'website',
      images: [OG_IMAGE],
    },
  };
}

export default async function Page({ params }: { params: Promise<{ ciudad: string }> }) {
  const { ciudad } = await params;
  const cities = await getCities();
  const cityName = deslugifyCity(cities, ciudad);
  if (!cityName) notFound();

  const properties = await getProperties({ city: cityName });

  return (
    <>
      <PropiedadesHeader
        heading={{
          title: `Propiedades en ${cityName}`,
          subtitle: `Casas, departamentos, terrenos y locales en venta y alquiler en ${cityName}`,
          crumb: cityName,
        }}
      />
      <PropiedadesClient initialProperties={properties} initialCity={cityName} />
    </>
  );
}
