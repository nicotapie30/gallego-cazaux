import type { Metadata, Viewport } from "next";
import { Outfit, DM_Sans, JetBrains_Mono } from "next/font/google";
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
  openGraph: {
    title: "Gallego Cazaux - Negocios Inmobiliarios",
    description: "Inmobiliaria en Santa Rosa, La Pampa. Venta y alquiler de propiedades.",
    type: "website",
    images: [{ url: '/equipo-opt.webp', width: 1200, height: 630, alt: 'Gallego Cazaux Negocios Inmobiliarios' }],
  },
  icons: {
    icon: "/assets/icons/favicon.ico",
    apple: "/assets/icons/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" data-scroll-behavior="smooth" className={`${outfit.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen flex flex-col bg-white text-gray font-sans antialiased">
        {children}
        <Toaster position="bottom-right" richColors />
        <SpeedInsights />
      </body>
    </html>
  );
}
