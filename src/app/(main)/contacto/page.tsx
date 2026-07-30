import type { Metadata } from 'next';
import { OG_IMAGE } from '@/lib/seo';
import ContactoClient from './ContactoClient';

// El footer lista las ciudades y tipos con propiedades publicadas: sin esto
// la página queda congelada en el build y muestra links que pueden dar 404
export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Contacto - Inmobiliaria en Santa Rosa | Gallego Cazaux',
  description: 'Contactate con Gallego Cazaux Negocios Inmobiliarios. Pellegrini 594, Santa Rosa, La Pampa. Tel: (2954) 272138. Lunes a viernes de 9:30 a 13 y de 16:30 a 19 hs.',
  alternates: { canonical: '/contacto' },
  openGraph: {
    title: 'Contacto - Gallego Cazaux',
    description: 'Estamos para ayudarte. Escribinos o llamanos.',
    type: 'website',
    images: [OG_IMAGE],
  },
};

export default function Page() {
  return <ContactoClient />;
}
