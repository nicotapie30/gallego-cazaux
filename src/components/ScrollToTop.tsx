"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollToTop() {
  const pathname = usePathname();
  useEffect(() => {
    // instant (no smooth): el scroll-behavior:smooth global es para anchors.
    // Si bajara animado de >60px a 0, el header re-activaría `scrolled` a mitad
    // de camino → bloom blanco al volver a la home.
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}
