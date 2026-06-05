import type { Metadata } from 'next';
import FAQClient from './FAQClient';

export const metadata: Metadata = {
  title: 'Preguntas Frecuentes - Gallego Cazaux',
  description: 'Respondemos las dudas más comunes sobre compra, venta y alquiler de propiedades en Santa Rosa, La Pampa.',
  openGraph: {
    title: 'Preguntas Frecuentes - Gallego Cazaux',
    description: 'Todo lo que necesitás saber sobre operaciones inmobiliarias en La Pampa.',
    type: 'website',
  },
};

export default function Page() {
  return <FAQClient />;
}
