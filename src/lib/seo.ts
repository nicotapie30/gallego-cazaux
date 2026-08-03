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

export const SITE_NAME = 'Gallego Cazaux Negocios Inmobiliarios';

/**
 * Campos de `openGraph` que Next NO hereda del layout cuando la página define
 * el suyo — el mismo problema que documenta OG_IMAGE arriba, pero también para
 * `url`, `siteName` y `locale`.
 *
 * `url` sale del mismo path que el canonical. Va acá y no en el layout porque
 * un og:url global haría que todas las páginas se declaren como la home.
 *
 * Se spreadea PRIMERO para que la página pueda pisar `images` o `type`:
 *   openGraph: { ...ogBase('/faq'), title, description }
 */
export function ogBase(path: string) {
  return {
    url: path,
    siteName: SITE_NAME,
    locale: 'es_AR',
    type: 'website' as const,
    images: [OG_IMAGE],
  };
}

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
