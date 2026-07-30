import { ViewTransition } from "react";
import { Toaster } from 'sonner';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import ScrollToTop from "@/components/ScrollToTop";
import { localBusinessSchema } from "@/lib/schema";
import { safeJsonLd } from "@/lib/safe-json-ld";
import { getCities, getPropertyTypesInUse } from "@/lib/sanity";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Para los links del footer a las landings de tipo y ciudad
  const [cities, types] = await Promise.all([getCities(), getPropertyTypesInUse()]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(localBusinessSchema()) }}
      />
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <ViewTransition name="page">
          {children}
        </ViewTransition>
      </main>
      <Footer cities={cities} types={types} />
      <WhatsAppFAB />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: { fontFamily: 'var(--font-dm-sans)' },
        }}
      />
    </>
  );
}
