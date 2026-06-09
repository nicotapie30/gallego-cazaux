import type { Metadata } from 'next';
import type { FAQ } from '@/lib/types';
import { getFAQ } from '@/lib/sanity';
import FAQClient from './FAQClient';
import { faqPageSchema } from '@/lib/schema';
import { safeJsonLd } from '@/lib/safe-json-ld';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Preguntas Frecuentes - Gallego Cazaux',
  description: 'Respondemos las dudas más comunes sobre compra, venta y alquiler de propiedades en Santa Rosa, La Pampa.',
  openGraph: {
    title: 'Preguntas Frecuentes - Gallego Cazaux',
    description: 'Todo lo que necesitás saber sobre operaciones inmobiliarias en La Pampa.',
    type: 'website',
  },
};

export default async function Page() {
  const faqs: FAQ[] = await getFAQ();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(faqPageSchema(faqs)) }}
      />
      <FAQClient faqs={faqs} />
    </>
  );
}
