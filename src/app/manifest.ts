import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Gallego Cazaux - Negocios Inmobiliarios',
    short_name: 'Gallego Cazaux',
    description: 'Inmobiliaria en Santa Rosa, La Pampa. Venta, alquiler y tasación de propiedades.',
    start_url: '/',
    display: 'standalone',
    theme_color: '#018f33',
    background_color: '#ffffff',
    icons: [
      { src: '/assets/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/assets/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      // Android recorta los íconos a círculo/squircle: esta versión trae el arte
      // dentro del 80% central para que no se coma el pin
      { src: '/assets/icons/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
