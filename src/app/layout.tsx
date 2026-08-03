import type { Metadata, Viewport } from "next";
import { Outfit, DM_Sans, JetBrains_Mono } from "next/font/google";
import { OG_IMAGE, SITE_NAME } from "@/lib/seo";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "sonner";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  // Barra del navegador en mobile — mismo azul que el footer y los títulos
  themeColor: "#05103d",
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL
    ?? (process.env.VERCEL_PROJECT_PRODUCTION_URL
        ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
        : 'http://localhost:3000')
  ),
  title: "Gallego Cazaux - Negocios Inmobiliarios",
  description: "Inmobiliaria en Santa Rosa, La Pampa. Venta y alquiler de propiedades. Encontrá tu hogar ideal con nosotros.",
  keywords: ["inmobiliaria", "propiedades", "venta", "alquiler", "Santa Rosa", "La Pampa", "casa", "departamento"],
  // Sin `url` acá a propósito: es global y haría que toda página que no defina
  // su propio openGraph se declare como la home. El og:url va por página, con
  // ogBase(path). Esto queda de red para cualquier página futura que lo olvide.
  openGraph: {
    title: "Gallego Cazaux - Negocios Inmobiliarios",
    description: "Inmobiliaria en Santa Rosa, La Pampa. Venta y alquiler de propiedades.",
    type: "website",
    siteName: SITE_NAME,
    locale: 'es_AR',
    images: [OG_IMAGE],
  },
  // Los íconos salen de app/favicon.ico, app/icon.png y app/apple-icon.png —
  // Next los detecta y les pone hash de cache automáticamente

  // Verificación de Google Search Console por meta tag. Se setea
  // GOOGLE_SITE_VERIFICATION en Vercel con el código que da Google; si no está,
  // no se emite ninguna etiqueta.
  ...(process.env.GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } }
    : {}),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" data-scroll-behavior="smooth" className={`${outfit.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}>
      <head>
        {/* Las imágenes de propiedades se sirven desde el CDN de Sanity — adelantamos el handshake */}
        <link rel="preconnect" href="https://cdn.sanity.io" />
        <link rel="alternate" type="text/plain" href="/llms.txt" />
      </head>
      <body className="min-h-screen flex flex-col bg-white text-gray font-sans antialiased">
        {children}
        <Toaster position="bottom-right" richColors />
        <SpeedInsights />
      </body>
    </html>
  );
}
