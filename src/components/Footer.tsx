"use client";

import Link from 'next/link';
import { MapPin, Phone, Mail } from '@/lib/icons';
import { SiInstagram } from '@/lib/icons/brands';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-white border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 md:py-12">

        {/* Brand — full width en mobile */}
        <div className="mb-8 lg:hidden">
          <img src="/assets/images/gallego-cazaux-logo-white.webp" alt="Gallego Cazaux" className="h-12 w-auto mb-3" />
          <p className="text-gray-400 text-sm mb-4 leading-relaxed">
            Tu partner de confianza en Santa Rosa, La Pampa.
          </p>
          <div className="flex items-center gap-3">
            <a href="https://www.instagram.com/gallegocazauxnegocios/" target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center text-white hover:bg-primary transition-colors duration-200">
              <SiInstagram className="w-4 h-4" />
            </a>
            <a href="https://wa.me/542954272138" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg">
              <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.162-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.493.099-.198.05-.371-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Escribinos
            </a>
          </div>
        </div>

        {/* Links + Contact — 2 cols en mobile, full grid en desktop */}
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-5 lg:gap-10">

          {/* Brand — solo desktop */}
          <div className="hidden lg:block lg:col-span-2">
            <img src="/assets/images/gallego-cazaux-logo-white.webp" alt="Gallego Cazaux" className="h-16 w-auto mb-4" />
            <p className="text-gray-400 text-base mb-5 max-w-sm leading-relaxed">
              Negocios Inmobiliarios. Tu partner de confianza en Santa Rosa, La Pampa.
              Encontrá tu próximo hogar con nosotras.
            </p>
            <div className="flex items-center gap-3">
              <a href="https://www.instagram.com/gallegocazauxnegocios/" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-white hover:bg-primary hover:scale-110 transition-all duration-200">
                <SiInstagram className="w-4.5 h-4.5" />
              </a>
              <a href="https://wa.me/542954272138" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-hover transition-colors duration-200">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.162-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.493.099-.198.05-.371-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Escribinos
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-outfit font-semibold text-white text-sm md:text-base mb-3 md:mb-5">Enlaces</h3>
            <ul className="space-y-2 md:space-y-3">
              {[
                { href: '/propiedades', label: 'Propiedades' },
                { href: '/faq', label: 'Preguntas Frecuentes' },
                { href: '/sobre-nosotros', label: 'Nosotros' },
                { href: '/contacto', label: 'Contacto' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="relative text-gray-400 hover:text-white text-xs md:text-sm transition-colors duration-200 group">
                    {link.label}
                    <span className="absolute inset-x-0 -bottom-0.5 h-px bg-primary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-2">
            <h3 className="font-outfit font-semibold text-white text-sm md:text-base mb-3 md:mb-5">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                <div>
                  <p className="text-white text-xs md:text-sm font-medium">Pellegrini 594</p>
                  <p className="text-gray-500 text-xs mt-0.5">Santa Rosa, La Pampa</p>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <svg className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-white text-xs md:text-sm font-medium">Lunes a Viernes</p>
                  <p className="text-gray-500 text-xs mt-0.5">9:30–13:00 / 16:30–20:00 hs</p>
                </div>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <a href="tel:2954272138" className="text-gray-400 hover:text-white text-xs md:text-sm transition-colors">
                  (2954) 272138
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <a href="mailto:info@gallegocazaux.com" className="text-gray-400 hover:text-white text-xs md:text-sm transition-colors truncate min-w-0">
                  info@gallegocazaux.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-10 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-xs select-none">
              © {currentYear} Gallego Cazaux. Todos los derechos reservados.
            </p>
            <div className="flex gap-6 pr-16 md:pr-0">
              <Link href="/terminos" className="text-gray-500 hover:text-white text-xs transition-colors whitespace-nowrap">
                Términos y Condiciones
              </Link>
              <Link href="/privacidad" className="text-gray-500 hover:text-white text-xs transition-colors whitespace-nowrap">
                Privacidad
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
