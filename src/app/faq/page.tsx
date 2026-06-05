import type { Metadata } from 'next';
import FAQClient from './FAQClient';
import { faqs } from '@/lib/faq-data';
import { faqPageSchema } from '@/lib/schema';

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
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema(faqs)) }}
      />
      <FAQClient />
    </>
  );
}
