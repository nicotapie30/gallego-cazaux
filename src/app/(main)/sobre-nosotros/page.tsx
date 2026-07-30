import type { Metadata } from 'next';
import { OG_IMAGE } from '@/lib/seo';
import SobreNosotrosClient from './SobreNosotrosClient';

// Contenido fijo: lo único que cambia es el footer, que lista las ciudades y
// tipos con propiedades publicadas. El webhook de Sanity la revalida al publicar;
// esto es solo la red de seguridad por si el webhook falla.
export const revalidate = 86400;

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
