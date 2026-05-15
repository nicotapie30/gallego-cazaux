import type { Metadata } from "next";
import { Outfit, DM_Sans, JetBrains_Mono } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Gallego Cazaux - Negocios Inmobiliarios",
  description: "Inmobiliaria en Santa Rosa, La Pampa. Venta y alquiler de propiedades. Encontrá tu hogar ideal con nosotros.",
  keywords: ["inmobiliaria", "propiedades", "venta", "alquiler", "Santa Rosa", "La Pampa", "casa", "departamento"],
  openGraph: {
    title: "Gallego Cazaux - Negocios Inmobiliarios",
    description: "Inmobiliaria en Santa Rosa, La Pampa. Venta y alquiler de propiedades.",
    type: "website",
  },
  icons: {
    icon: "/assets/icons/favicon.ico",
    apple: "/assets/icons/apple-icon.png",
  },
};

import { ViewTransition } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFAB from "@/components/WhatsAppFAB";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${outfit.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen flex flex-col bg-white text-gray font-sans antialiased">
        <Header />
        <main className="flex-1">
          <ViewTransition name="page">
            {children}
          </ViewTransition>
        </main>
        <Footer />
        <WhatsAppFAB />
      </body>
    </html>
  );
}