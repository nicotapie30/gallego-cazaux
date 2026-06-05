import type { Metadata } from 'next';
import PropiedadesClient from './PropiedadesClient';

export const metadata: Metadata = {
  title: 'Propiedades - Gallego Cazaux',
  description: 'Explorá todas nuestras propiedades en Santa Rosa y La Pampa. Casas, departamentos, terrenos y locales en venta y alquiler.',
  openGraph: {
    title: 'Propiedades - Gallego Cazaux',
    description: 'Casas, departamentos, terrenos y locales en venta y alquiler en Santa Rosa, La Pampa.',
    type: 'website',
  },
};

export default function Page() {
  return <PropiedadesClient />;
}
