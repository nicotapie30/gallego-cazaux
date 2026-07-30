import type { ImageLoaderProps } from 'next/image';

/**
 * Sirve las imágenes directo desde el CDN de Sanity en vez de pasarlas por el
 * optimizador de Next. Sanity ya transforma y cachea en su CDN, así que el
 * segundo paso solo agregaba un hop (Vercel tenía que bajarse el original
 * entero, decodificarlo y reencodearlo) sin aportar nada.
 *
 * Next sigue haciendo lo suyo: srcSet, sizes, lazy loading y reserva de espacio.
 */
export function sanityImageLoader({ src, width, quality }: ImageLoaderProps): string {
  const url = new URL(src);
  url.searchParams.set('w', String(width));
  url.searchParams.set('q', String(quality ?? 75));
  url.searchParams.set('auto', 'format'); // AVIF/WebP según el navegador
  url.searchParams.set('fit', 'max');     // nunca agrandar más allá del original
  return url.toString();
}
