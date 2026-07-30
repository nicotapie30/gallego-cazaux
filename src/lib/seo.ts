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
