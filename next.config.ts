import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === 'development';

const securityHeaders = [
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      // unsafe-eval solo en dev — React lo necesita para reconstruir stack traces
      `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''}`,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https://cdn.sanity.io",
      "media-src 'self' blob: https://cdn.sanity.io",
      "frame-src https://www.google.com https://maps.google.com",
      "connect-src 'self' https://*.sanity.io https://cdn.sanity.io",
      "font-src 'self' data: https://fonts.gstatic.com",
    ].join('; '),
  },
];

const nextConfig: NextConfig = {
  experimental: {
    viewTransition: true,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      { protocol: 'https', hostname: 'picsum.photos' },
    ],
  },
  async headers() {
    return [
      {
        // Aplicar a todas las rutas excepto /studio (Studio tiene sus propios requerimientos de CSP)
        source: '/((?!studio).*)',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
