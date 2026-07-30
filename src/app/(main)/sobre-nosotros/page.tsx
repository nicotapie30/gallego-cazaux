import type { Metadata } from 'next';
import { OG_IMAGE } from '@/lib/seo';
import SobreNosotrosClient from './SobreNosotrosClient';

// El footer lista las ciudades y tipos con propiedades publicadas: sin esto
// la página queda congelada en el build y muestra links que pueden dar 404
export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Quiénes Somos - Gallego Cazaux',
  description: 'Más de 8 años acompañando familias e inversores en Santa Rosa y toda la zona de La Pampa. Conocé nuestra historia y nuestros valores.',
  alternates: { canonical: '/sobre-nosotros' },
  openGraph: {
    title: 'Quiénes Somos - Gallego Cazaux',
    description: 'Una empresa familiar con raíces en La Pampa. Abriendo puertas desde 2018.',
    type: 'website',
    images: [OG_IMAGE],
  },
};

export default function Page() {
  return <SobreNosotrosClient />;
}
