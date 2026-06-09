import type { Metadata } from 'next';
import ContactoClient from './ContactoClient';

export const metadata: Metadata = {
  title: 'Contacto - Gallego Cazaux',
  description: 'Contactate con Gallego Cazaux Negocios Inmobiliarios. Pellegrini 594, Santa Rosa, La Pampa. Tel: (2954) 272138.',
  openGraph: {
    title: 'Contacto - Gallego Cazaux',
    description: 'Estamos para ayudarte. Escribinos o llamanos.',
    type: 'website',
  },
};

export default function Page() {
  return <ContactoClient />;
}
