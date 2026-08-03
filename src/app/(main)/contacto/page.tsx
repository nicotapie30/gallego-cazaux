import type { Metadata } from 'next';
import { ogBase } from '@/lib/seo';
import ContactoClient from './ContactoClient';

// Contenido fijo: lo único que cambia es el footer, que lista las ciudades y
// tipos con propiedades publicadas. El webhook de Sanity la revalida al publicar;
// esto es solo la red de seguridad por si el webhook falla.
export const revalidate = 86400;

export const metadata: Metadata = {
  title: 'Contacto - Inmobiliaria en Santa Rosa | Gallego Cazaux',
  description: 'Contactate con Gallego Cazaux Negocios Inmobiliarios. Pellegrini 594, Santa Rosa, La Pampa. Tel: (2954) 272138. Lunes a viernes de 9:30 a 13 y de 16:30 a 19 hs.',
  alternates: { canonical: '/contacto' },
  openGraph: {
    ...ogBase('/contacto'),
    title: 'Contacto - Gallego Cazaux',
    description: 'Estamos para ayudarte. Escribinos o llamanos.',
  },
};

export default function Page() {
  return <ContactoClient />;
}
