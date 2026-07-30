/** Imagen OG por defecto.
 *  Next NO hereda `openGraph.images` del layout cuando una página define su
 *  propio `openGraph`: hay que repetirla en cada una o el link compartido por
 *  WhatsApp/Instagram sale sin preview. */
export const OG_IMAGE = {
  url: '/assets/og-portada.webp',
  width: 1200,
  height: 630,
  alt: 'Gallego Cazaux Negocios Inmobiliarios',
} as const;

/**
 * Arma la meta description a partir del texto libre que se carga en Sanity.
 * Las descripciones vienen con emojis decorativos (✨ 📐 🏠) que quedan mal en
 * el SERP, y un slice a pelo cortaba palabras por la mitad.
 */
export function metaDescription(text: string | undefined | null, maxLen = 155): string {
  if (!text) return '';

  const clean = text
    .replace(/\p{Extended_Pictographic}/gu, '') // emojis
    .replace(/[\u{FE0F}\u{200D}]/gu, '')        // selectores de variación y ZWJ que quedan sueltos
    .replace(/\s+/g, ' ')
    .trim();

  if (clean.length <= maxLen) return clean;

  // Cortar en el último espacio para no partir una palabra
  const cut = clean.slice(0, maxLen);
  const lastSpace = cut.lastIndexOf(' ');
  const base = lastSpace > maxLen * 0.6 ? cut.slice(0, lastSpace) : cut;
  return base.replace(/[\s.,;:—-]+$/, '') + '…';
}
