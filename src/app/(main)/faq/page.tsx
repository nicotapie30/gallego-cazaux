import type { Metadata } from 'next';
import { ogBase } from '@/lib/seo';
import type { FAQ } from '@/lib/types';
import { getFAQ } from '@/lib/sanity';
import FAQClient from './FAQClient';
import { faqPageSchema } from '@/lib/schema';
import { safeJsonLd } from '@/lib/safe-json-ld';

export const revalidate = 86400;

export const metadata: Metadata = {
  title: 'Preguntas Frecuentes - Gallego Cazaux',
  description: 'Respondemos las dudas más comunes sobre compra, venta y alquiler de propiedades en Santa Rosa, La Pampa.',
  alternates: { canonical: '/faq' },
  openGraph: {
    ...ogBase('/faq'),
    title: 'Preguntas Frecuentes - Gallego Cazaux',
    description: 'Todo lo que necesitás saber sobre operaciones inmobiliarias en La Pampa.',
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
