import { ViewTransition } from "react";
import { Toaster } from 'sonner';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import ScrollToTop from "@/components/ScrollToTop";
import { localBusinessSchema } from "@/lib/schema";
import { safeJsonLd } from "@/lib/safe-json-ld";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
      <Footer />
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
