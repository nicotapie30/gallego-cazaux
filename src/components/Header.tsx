"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const navigation = [
  { name: 'Inicio', href: '/' },
  { name: 'Propiedades', href: '/propiedades' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Nosotros', href: '/sobre-nosotros' },
  { name: 'Contacto', href: '/contacto' },
];

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.162-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.493.099-.198.05-.371-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const isHome = pathname === '/';
  const isTransparent = isHome && !scrolled;

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(href + '/');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`
      ${isHome ? 'fixed left-0 right-0 w-full' : 'sticky'}
      top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300
      ${isTransparent ? 'bg-transparent shadow-none' : 'bg-white/70 backdrop-blur-md shadow-sm'}
    `}>
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div className="flex h-20 items-center justify-between">
          {/* Logo — container fijo, cross-fade por opacity */}
          <Link href="/" className="flex-none relative" style={{ width: 64, height: 64 }}>
            <Image
              src="/assets/images/gallego-cazaux-logo-white.webp"
              alt="Gallego Cazaux"
              fill
              className={`object-contain transition-opacity duration-300 ${isTransparent ? 'opacity-100' : 'opacity-0'}`}
            />
            <Image
              src="/assets/images/gallego-cazaux-logo.webp"
              alt=""
              aria-hidden="true"
              fill
              className={`object-contain transition-opacity duration-300 ${isTransparent ? 'opacity-0' : 'opacity-100'}`}
            />
          </Link>

          {/* Desktop: Nav + WhatsApp */}
          <div className="hidden md:flex items-center gap-4">
            <ul className="flex items-center h-20 gap-1">
              {navigation.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.name} className="relative h-full flex items-center">
                    <Link
                      href={item.href}
                      className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 group ${
                        isTransparent
                          ? active ? 'text-white' : 'text-white/80 hover:text-white'
                          : active ? 'text-primary' : 'text-gray hover:text-primary'
                      }`}
                    >
                      {item.name}
                      <span className={`absolute inset-x-3 bottom-1.5 h-0.5 origin-left transition-transform duration-300 ease-out ${
                        isTransparent ? 'bg-white' : 'bg-primary'
                      } ${active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className={`h-8 w-px transition-colors duration-300 ${isTransparent ? 'bg-white/30' : 'bg-gray-200'}`} />

            <a
              href="https://wa.me/542954272138"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 ${
                isTransparent
                  ? 'border border-white/80 text-white hover:bg-white/10 active:shadow-sm'
                  : 'border border-transparent bg-primary text-white hover:bg-primary/90 hover:shadow-lg active:shadow-sm'
              }`}
            >
              <WhatsAppIcon className="w-4 h-4" />
              WhatsApp
            </a>
          </div>

          {/* Mobile: hamburger → X morphing */}
          <button
            type="button"
            className={`md:hidden p-2 transition-colors duration-300 ${isTransparent ? 'text-white' : 'text-gray hover:text-primary'}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`block w-full h-0.5 bg-current rounded-full transition-all duration-200 origin-center ${mobileMenuOpen ? 'translate-y-[9px] rotate-45' : ''}`} />
              <span className={`block w-full h-0.5 bg-current rounded-full transition-all duration-200 ${mobileMenuOpen ? 'opacity-0 scale-x-0' : ''}`} />
              <span className={`block w-full h-0.5 bg-current rounded-full transition-all duration-200 origin-center ${mobileMenuOpen ? '-translate-y-[9px] -rotate-45' : ''}`} />
            </div>
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              <motion.div
                className="fixed inset-0 bg-black/40 z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setMobileMenuOpen(false)}
              />
              <motion.div
                className="absolute top-full left-0 right-0 bg-white border-t border-border shadow-xl z-50 overflow-hidden"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: [0.25, 1, 0.5, 1] }}
              >
                <div className="px-4 py-3 space-y-0.5">
                  {navigation.map((item, i) => {
                    const active = isActive(item.href);
                    return (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.18, delay: i * 0.04, ease: [0.25, 1, 0.5, 1] }}
                      >
                        <Link
                          href={item.href}
                          className={`block px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                            active
                              ? 'text-primary bg-primary/6'
                              : 'text-gray hover:text-primary hover:bg-background-alt'
                          }`}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      </motion.div>
                    );
                  })}
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.18, delay: navigation.length * 0.04, ease: [0.25, 1, 0.5, 1] }}
                    className="pt-2 pb-1"
                  >
                    <a
                      href="https://wa.me/542954272138"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-4 py-3 text-base font-medium bg-primary text-white rounded-lg"
                    >
                      <WhatsAppIcon className="w-5 h-5" />
                      WhatsApp
                    </a>
                  </motion.div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
