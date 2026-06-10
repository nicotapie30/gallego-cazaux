"use client";

import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Bed, Bath, Ruler, Car, Trees, MapPin, X, ChevronLeft, ChevronRight, Waves, Phone, Send, Share2 } from '@/lib/icons';
import { toast } from 'sonner';
import { AnimateIn } from '@/components/AnimateIn';
import PropertyCard from '@/components/PropertyCard';
import type { Property } from '@/lib/types';
import { urlFor } from '@/lib/sanity';

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.162-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.493.099-.198.05-.371-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const typeLabels: Record<string, string> = {
  casa: 'Casa',
  departamento: 'Departamento',
  ph: 'PH',
  terreno: 'Terreno',
  local: 'Local comercial',
  otro: 'Otro',
};

const statusConfig: Record<string, { label: string; className: string }> = {
  disponible: { label: 'Disponible', className: 'bg-green-100 text-green-700' },
  reservado: { label: 'Reservado', className: 'bg-yellow-100 text-yellow-700' },
  vendido: { label: 'Vendido', className: 'bg-red-100 text-red-700' },
};

interface Props {
  property: Property;
  similarProperties: Property[];
}

export default function PropertyDetailClient({ property, similarProperties }: Props) {
  const [currentImage, setCurrentImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  useLayoutEffect(() => { window.scrollTo(0, 0); }, []);

  type MediaItem =
    | { type: 'image'; src: string; thumbSrc: string; alt: string }
    | { type: 'video'; src: string; key: string };

  const mediaItems: MediaItem[] = [
    ...property.images.map((img) => ({
      type: 'image' as const,
      src: urlFor(img).width(1200).url(),
      thumbSrc: urlFor(img).width(200).height(150).url(),
      alt: img.alt ?? property.title,
    })),
    ...(property.videos ?? []).map((vid) => ({
      type: 'video' as const,
      src: vid.url,
      key: vid._key,
    })),
  ];

  const touchStartX = useRef(0);
  const isSwiping = useRef(false);
  const thumbsRef = useRef<HTMLDivElement>(null);
  const len = mediaItems.length;

  const scrollThumbs = (dir: 1 | -1) => {
    thumbsRef.current?.scrollBy({ left: dir * 200, behavior: 'smooth' });
  };

  const goNext = () => setCurrentImage((i) => (i + 1) % len);
  const goPrev = () => setCurrentImage((i) => (i - 1 + len) % len);

  useEffect(() => {
    const container = thumbsRef.current;
    if (!container) return;
    const thumb = container.children[currentImage] as HTMLElement;
    if (!thumb) return;
    const scrollLeft = thumb.offsetLeft - container.clientWidth / 2 + thumb.offsetWidth / 2;
    container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
  }, [currentImage]);

  const formatPrice = (price: number | null | undefined, currency: string, priceOnRequest?: boolean) => {
    if (priceOnRequest || price == null || price === 0) return 'Consultar precio';
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: currency || 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const waUrl = `https://wa.me/542954272138?text=${encodeURIComponent(
    `Hola! Me interesa la propiedad "${property.title}" en ${property.address}. ¿Me pueden dar más información?`
  )}`;

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: property.title, text: `${property.title} — ${property.address}, ${property.city}`, url });
        toast.success('¡Propiedad copiada!');
      } catch {}
    } else {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
      toast.success('¡Propiedad copiada!', { description: 'Ya podés compartir el link.' });
    }
  };

  useEffect(() => {
    if (!lightboxOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false);
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightboxOpen, len]);

  const operationLabel = property.operation === 'venta' ? 'Venta' : 'Alquiler';
  const operationColor = property.operation === 'venta' ? 'bg-primary text-white' : 'bg-blue-600 text-white';
  const status = statusConfig[property.status] ?? statusConfig.disponible;

  const mapQuery = encodeURIComponent(`${property.address}, ${property.city}, ${property.province}, Argentina`);
  const mapEmbedUrl = `https://maps.google.com/maps?q=${mapQuery}&output=embed&hl=es`;

  return (
    <div className="min-h-screen bg-gray-50 relative">

      {/* Header */}
      <div className="relative bg-secondary overflow-hidden">
        <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="flex items-center gap-2 text-white/40 text-sm mb-4">
            <Link href="/" className="hover:text-white/80 transition-colors">Inicio</Link>
            <span>/</span>
            <Link href="/propiedades" className="hover:text-white/80 transition-colors flex items-center gap-1.5">
              <ArrowLeft className="w-3.5 h-3.5" />
              Propiedades
            </Link>
            <span>/</span>
            <span className="text-white/70 line-clamp-1">{property.title}</span>
          </div>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h1 className="font-outfit text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-3 line-clamp-2">
                {property.title}
              </h1>
              <div className="flex items-center gap-2 min-w-0 overflow-hidden">
                <span className={`flex-shrink-0 px-2.5 py-1 text-xs font-semibold rounded-full ${operationColor}`}>
                  {operationLabel}
                </span>
                <span className="flex-shrink-0 text-white/40 text-sm">·</span>
                <span className="text-white/60 text-xs sm:text-sm flex items-center gap-1.5 min-w-0 truncate">
                  <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary flex-shrink-0" />
                  <span className="truncate">{property.address}, {property.city}</span>
                </span>
              </div>
            </div>

            {/* Share button */}
            <motion.button
              onClick={handleShare}
              whileTap={{ scale: 0.95 }}
              className="lg:hidden group flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/20 text-white/70 hover:text-white hover:border-white/40 hover:bg-white/10 transition-all duration-200 text-sm font-medium cursor-pointer"
              aria-label="Compartir propiedad"
            >
              <AnimatePresence mode="wait" initial={false}>
                {copied ? (
                  <motion.span key="check" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.15 }} className="flex items-center gap-2 text-green-400">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    <span className="hidden sm:inline">¡Copiada!</span>
                  </motion.span>
                ) : (
                  <motion.span key="share" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.15 }} className="flex items-center gap-2">
                    <Share2 className="w-4 h-4 transition-transform duration-200 group-hover:-rotate-12 group-hover:scale-110" />
                    <span className="hidden sm:inline">Compartir</span>
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Left column */}
          <div className="lg:col-span-8 space-y-6">

            {/* Gallery */}
            <div
              className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-background-alt cursor-zoom-in group/gallery"
              onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; isSwiping.current = false; }}
              onTouchEnd={(e) => {
                const diff = touchStartX.current - e.changedTouches[0].clientX;
                if (Math.abs(diff) > 50) { isSwiping.current = true; diff > 0 ? goNext() : goPrev(); }
              }}
              onClick={() => { if (isSwiping.current) { isSwiping.current = false; return; } setLightboxOpen(true); }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {mediaItems[currentImage]?.type === 'video' ? (
                  <motion.div key={`video-${currentImage}`} className="w-full h-full flex items-center justify-center bg-black cursor-zoom-in" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                    <video
                      src={(mediaItems[currentImage] as { type: 'video'; src: string; key: string }).src}
                      className="max-w-full max-h-full pointer-events-none"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <div className="flex items-center gap-2.5 px-5 py-3 rounded-full bg-black/50 backdrop-blur-md border border-white/25 text-white shadow-lg">
                        <svg className="w-5 h-5 translate-x-px flex-shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                        <span className="text-sm font-semibold tracking-wide">Ver video</span>
                      </div>
                    </div>
                  </motion.div>
                ) : mediaItems[currentImage]?.type === 'image' ? (
                  <motion.img
                    key={currentImage}
                    src={(mediaItems[currentImage] as { type: 'image'; src: string; thumbSrc: string; alt: string }).src}
                    alt={(mediaItems[currentImage] as { type: 'image'; src: string; thumbSrc: string; alt: string }).alt}
                    className="w-full h-full object-cover"
                    style={currentImage === 0 ? { viewTransitionName: `prop-img-${property._id}` } : undefined}
                    initial={currentImage === 0 ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  />
                ) : null}
              </AnimatePresence>

              {property.images.length > 1 && (
                <>
                  <button onClick={(e) => { e.stopPropagation(); goPrev(); }} className="hidden sm:block absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-black/40 backdrop-blur-sm text-white rounded-full opacity-100 md:opacity-0 md:group-hover/gallery:opacity-100 hover:bg-black/65 transition-all duration-200 cursor-pointer z-10" aria-label="Imagen anterior">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); goNext(); }} className="hidden sm:block absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-black/40 backdrop-blur-sm text-white rounded-full opacity-100 md:opacity-0 md:group-hover/gallery:opacity-100 hover:bg-black/65 transition-all duration-200 cursor-pointer z-10" aria-label="Siguiente imagen">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {len > 1 && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-[5px]">
                  {(() => {
                    const MAX = 7;
                    const half = Math.floor(MAX / 2);
                    const start = Math.max(0, Math.min(currentImage - half, len - MAX));
                    const count = Math.min(len, MAX);
                    return Array.from({ length: count }, (_, i) => {
                      const idx = start + i;
                      const pos = len <= MAX ? i : i; // position in window
                      const edgeDist = Math.min(pos, count - 1 - pos);
                      const isActive = idx === currentImage;
                      const size = len <= MAX ? 'md' : edgeDist === 0 ? 'xs' : edgeDist === 1 ? 'sm' : 'md';
                      return (
                        <button
                          key={idx}
                          onClick={(e) => { e.stopPropagation(); setCurrentImage(idx); }}
                          aria-label={`Imagen ${idx + 1}`}
                          className={`rounded-full transition-all duration-300 cursor-pointer flex-shrink-0 ${
                            isActive
                              ? 'bg-white w-5 h-1.5'
                              : size === 'xs'
                              ? 'bg-white/40 w-1 h-1'
                              : size === 'sm'
                              ? 'bg-white/55 w-1.5 h-1.5'
                              : 'bg-white/60 w-1.5 h-1.5 hover:bg-white/90'
                          }`}
                        />
                      );
                    });
                  })()}
                </div>
              )}

              <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-black/50 text-white text-xs rounded-full backdrop-blur-sm">
                {currentImage + 1} / {len}
              </div>
            </div>

            {/* Thumbnails */}
            {mediaItems.length > 1 && (
              <div className="flex items-center gap-2 mt-3">
                <button onClick={() => scrollThumbs(-1)} className="hidden md:flex flex-shrink-0 w-7 h-7 items-center justify-center bg-white border border-border rounded-full shadow-sm text-secondary hover:bg-secondary hover:text-white hover:border-secondary transition-all duration-200 cursor-pointer" aria-label="Anterior">
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <div className="relative flex-1 min-w-0">
                  <div ref={thumbsRef} className="flex gap-3 overflow-x-auto py-1 px-1 snap-x snap-mandatory md:snap-none" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    {mediaItems.map((item, idx) => (
                      <button key={idx} onClick={() => setCurrentImage(idx)} className={`relative flex-shrink-0 w-24 h-[72px] rounded-lg overflow-hidden transition-all duration-200 cursor-pointer ring-2 snap-start ${idx === currentImage ? 'ring-primary opacity-100' : 'ring-transparent opacity-55 hover:opacity-85 hover:ring-border'}`}>
                        {item.type === 'image' ? (
                          <img src={item.thumbSrc} alt={`Imagen ${idx + 1}`} className="w-full h-full object-cover" loading="lazy" />
                        ) : (
                          <div className="w-full h-full bg-black flex items-center justify-center">
                            <svg className="w-7 h-7 text-white/80" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                  <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background-alt to-transparent pointer-events-none md:hidden" />
                </div>
                <button onClick={() => scrollThumbs(1)} className="hidden md:flex flex-shrink-0 w-7 h-7 items-center justify-center bg-white border border-border rounded-full shadow-sm text-secondary hover:bg-secondary hover:text-white hover:border-secondary transition-all duration-200 cursor-pointer" aria-label="Siguiente">
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Info card */}
            <AnimateIn delay={100}>
              <div className="bg-white rounded-2xl border border-border p-6">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${operationColor}`}>{operationLabel}</span>
                  <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-gray-100 border border-gray-200 text-gray">{typeLabels[property.propertyType] ?? property.propertyType}</span>
                  <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${status.className}`}>{status.label}</span>
                </div>
                <h1 className="font-outfit text-2xl md:text-3xl font-bold text-secondary mb-2">{property.title}</h1>
                <div className="flex items-center gap-1.5 text-muted text-sm mb-6">
                  <MapPin className="w-4 h-4 flex-shrink-0 text-primary" />
                  {property.address}, {property.city}, {property.province}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-6 border-y border-border">
                  {property.features.bedrooms && (<div className="flex items-center gap-3"><div className="w-9 h-9 rounded-xl bg-primary/8 flex items-center justify-center flex-shrink-0"><Bed className="w-4.5 h-4.5 text-primary" /></div><div><p className="font-semibold text-secondary text-sm">{property.features.bedrooms}</p><p className="text-muted text-xs">Dormitorios</p></div></div>)}
                  {property.features.bathrooms && (<div className="flex items-center gap-3"><div className="w-9 h-9 rounded-xl bg-primary/8 flex items-center justify-center flex-shrink-0"><Bath className="w-4.5 h-4.5 text-primary" /></div><div><p className="font-semibold text-secondary text-sm">{property.features.bathrooms}</p><p className="text-muted text-xs">Baños</p></div></div>)}
                  {property.features.coveredArea && (<div className="flex items-center gap-3"><div className="w-9 h-9 rounded-xl bg-primary/8 flex items-center justify-center flex-shrink-0"><Ruler className="w-4.5 h-4.5 text-primary" /></div><div><p className="font-semibold text-secondary text-sm">{property.features.coveredArea} m²</p><p className="text-muted text-xs">Cubiertos</p></div></div>)}
                  {property.features.totalArea && (<div className="flex items-center gap-3"><div className="w-9 h-9 rounded-xl bg-primary/8 flex items-center justify-center flex-shrink-0"><Ruler className="w-4.5 h-4.5 text-primary" /></div><div><p className="font-semibold text-secondary text-sm">{property.features.totalArea} m²</p><p className="text-muted text-xs">Totales</p></div></div>)}
                  {property.features.garage && (<div className="flex items-center gap-3"><div className="w-9 h-9 rounded-xl bg-primary/8 flex items-center justify-center flex-shrink-0"><Car className="w-4.5 h-4.5 text-primary" /></div><div><p className="font-semibold text-secondary text-sm">Sí</p><p className="text-muted text-xs">Garage</p></div></div>)}
                  {property.features.pool && (<div className="flex items-center gap-3"><div className="w-9 h-9 rounded-xl bg-primary/8 flex items-center justify-center flex-shrink-0"><Waves className="w-4.5 h-4.5 text-primary" /></div><div><p className="font-semibold text-secondary text-sm">Sí</p><p className="text-muted text-xs">Piscina</p></div></div>)}
                  {property.features.garden && (<div className="flex items-center gap-3"><div className="w-9 h-9 rounded-xl bg-primary/8 flex items-center justify-center flex-shrink-0"><Trees className="w-4.5 h-4.5 text-primary" /></div><div><p className="font-semibold text-secondary text-sm">Sí</p><p className="text-muted text-xs">Jardín</p></div></div>)}
                </div>

                <div className="mt-6">
                  <h2 className="font-outfit font-semibold text-secondary mb-3">Descripción</h2>
                  <p className="text-muted text-sm leading-relaxed whitespace-pre-line">{property.description}</p>
                </div>

                {property.features.amenities && property.features.amenities.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-border">
                    <h2 className="font-outfit font-semibold text-secondary mb-4">Comodidades</h2>
                    <div className="flex flex-wrap gap-2">
                      {property.features.amenities.map((a, i) => (
                        <span key={i} className="px-3 py-1.5 bg-background-alt text-muted text-sm rounded-lg border border-border">{a}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </AnimateIn>
          </div>

          {/* Right sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-24">
              <AnimateIn delay={150} direction="right">
                <div className="bg-white rounded-2xl border border-border p-6">
                  <div className="mb-4">
                    <p className="text-muted text-xs font-medium uppercase tracking-wide mb-1">Precio de {operationLabel.toLowerCase()}</p>
                    {(property.priceOnRequest || !property.price) ? (
                      <p className="font-outfit font-bold text-secondary text-2xl">Consultar precio</p>
                    ) : (
                      <p className="font-outfit text-3xl font-bold text-primary">{formatPrice(property.price, property.currency)}</p>
                    )}
                    {property.priceNotes && (
                      <p className="text-muted text-sm mt-1">{property.priceNotes}</p>
                    )}
                  </div>

                  {(property.features.bedrooms || property.features.bathrooms || property.features.coveredArea) && (
                    <div className="flex flex-wrap gap-3 text-sm text-muted pb-5 border-b border-border mb-5">
                      {property.features.bedrooms && <span className="flex items-center gap-1.5"><Bed className="w-4 h-4 text-primary" />{property.features.bedrooms} dorm.</span>}
                      {property.features.bathrooms && <span className="flex items-center gap-1.5"><Bath className="w-4 h-4 text-primary" />{property.features.bathrooms} baños</span>}
                      {property.features.coveredArea && <span className="flex items-center gap-1.5"><Ruler className="w-4 h-4 text-primary" />{property.features.coveredArea} m²</span>}
                    </div>
                  )}

                  <div className="space-y-3 mb-5">
                    <motion.a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileTap={{ scale: 0.97 }}
                      className="flex items-center justify-center gap-2.5 w-full py-3.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/25 active:translate-y-0 active:shadow-sm transition-all duration-200 text-sm"
                    >
                      <WhatsAppIcon className="w-5 h-5" />
                      Consultar por WhatsApp
                    </motion.a>
                    <motion.a
                      href="tel:2954272138"
                      whileTap={{ scale: 0.97 }}
                      className="group flex items-center justify-center gap-2.5 w-full py-3.5 border border-border text-secondary font-medium rounded-xl hover:bg-background-alt hover:border-secondary/30 transition-all duration-200 text-sm"
                    >
                      <Phone className="w-4.5 h-4.5 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
                      (2954) 272138
                    </motion.a>
                    <motion.button
                      onClick={handleShare}
                      whileTap={{ scale: 0.98 }}
                      className="group flex items-center justify-center gap-2.5 w-full py-3.5 border border-border text-secondary font-medium rounded-xl hover:bg-background-alt transition-colors text-sm cursor-pointer overflow-hidden"
                    >
                      <AnimatePresence mode="wait" initial={false}>
                        {copied ? (
                          <motion.span key="check" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.15 }} className="flex items-center gap-2.5 text-primary">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                            ¡Propiedad copiada!
                          </motion.span>
                        ) : (
                          <motion.span key="share" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.15 }} className="flex items-center gap-2.5">
                            <Share2 className="w-4 h-4 transition-transform duration-200 group-hover:-rotate-12 group-hover:scale-110" />
                            Compartir propiedad
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  </div>

                  <div className="flex items-center gap-3 mb-5">
                    <div className="flex-1 h-px bg-border" />
                    <span className="text-xs text-muted">o envianos un mensaje</span>
                    <div className="flex-1 h-px bg-border" />
                  </div>

                  {formSubmitted ? (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center py-6">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                        <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      </div>
                      <p className="font-outfit font-semibold text-secondary mb-1">¡Mensaje enviado!</p>
                      <p className="text-muted text-sm">Nos contactamos a la brevedad.</p>
                    </motion.div>
                  ) : (
                    <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); setFormSubmitted(true); }}>
                      <input type="text" placeholder="Tu nombre" required className="w-full px-3 py-2.5 border border-border rounded-lg text-gray text-sm focus:outline-none focus:border-primary transition-colors duration-150" />
                      <input type="tel" placeholder="Tu teléfono" required className="w-full px-3 py-2.5 border border-border rounded-lg text-gray text-sm focus:outline-none focus:border-primary transition-colors duration-150" />
                      <textarea placeholder="Mensaje" rows={3} required className="w-full px-3 py-2.5 border border-border rounded-lg text-gray text-sm focus:outline-none focus:border-primary transition-colors duration-150 resize-none" defaultValue={`Hola, me interesa la propiedad en ${property.address}. ¿Pueden contactarme?`} />
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.97 }}
                        className="group w-full flex items-center justify-center gap-2 py-3 bg-secondary text-white font-medium rounded-lg hover:bg-secondary/85 hover:shadow-lg hover:shadow-secondary/20 transition-all duration-200 text-sm cursor-pointer"
                      >
                        Enviar mensaje
                        <Send className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                      </motion.button>
                    </form>
                  )}
                </div>
              </AnimateIn>
            </div>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <AnimateIn>
          <div className="rounded-2xl overflow-hidden border border-border">
            <div className="flex items-center justify-between gap-4 px-5 py-4 bg-secondary">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'rgba(1,143,51,0.3)', border: '1px solid rgba(1,143,51,0.4)' }}>
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-white font-outfit font-semibold text-sm leading-none mb-0.5">Ubicación</p>
                  <p className="text-white/45 text-xs truncate">{property.address}, {property.city}, {property.province}</p>
                </div>
              </div>
              <a href={`https://maps.google.com/?q=${mapQuery}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white/70 hover:text-white border border-white/15 hover:border-white/30 transition-colors duration-200 shrink-0">
                Abrir en Maps
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              </a>
            </div>
            <div className="h-72 md:h-96">
              <iframe src={mapEmbedUrl} width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title={`Ubicación: ${property.address}`} />
            </div>
          </div>
        </AnimateIn>
      </div>

      {/* Propiedades similares */}
      {similarProperties.length > 0 && (
        <section className="bg-background-alt py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimateIn>
              <div className="flex items-end justify-between mb-8">
                <div>
                  <p className="text-primary font-medium text-xs uppercase tracking-widest mb-1">Seguí explorando</p>
                  <h2 className="font-outfit text-2xl md:text-3xl font-bold text-secondary">Propiedades similares</h2>
                </div>
                <Link
                  href="/propiedades"
                  className="group hidden sm:flex items-center gap-1.5 text-sm text-muted hover:text-primary transition-colors duration-200 font-medium"
                >
                  Ver todas
                  <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </AnimateIn>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarProperties.map((p, i) => (
                <AnimateIn key={p._id} delay={i * 80} className="h-full">
                  <PropertyCard property={p} />
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div className="fixed inset-0 z-50 bg-black/92 flex items-center justify-center cursor-zoom-out" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} onClick={() => setLightboxOpen(false)} onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }} onTouchEnd={(e) => { const diff = touchStartX.current - e.changedTouches[0].clientX; if (Math.abs(diff) > 50) { diff > 0 ? goNext() : goPrev(); } }}>
            <button className="absolute top-4 right-4 p-2.5 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors z-10" onClick={() => setLightboxOpen(false)}><X className="w-6 h-6" /></button>
            {len > 1 && <button className="absolute left-4 p-2.5 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors z-10" onClick={(e) => { e.stopPropagation(); goPrev(); }}><ChevronLeft className="w-8 h-8" /></button>}
            <AnimatePresence mode="wait">
              {mediaItems[currentImage]?.type === 'video' ? (
                <motion.video key={`lb-video-${currentImage}`} src={(mediaItems[currentImage] as { type: 'video'; src: string; key: string }).src} controls autoPlay className="max-w-[90vw] max-h-[88vh] rounded-lg cursor-default" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} onClick={(e) => e.stopPropagation()} />
              ) : (
                <motion.img key={currentImage} src={(mediaItems[currentImage] as { type: 'image'; src: string })?.src} alt={`Imagen ${currentImage + 1}`} className="max-w-[90vw] max-h-[88vh] object-contain rounded-lg cursor-default" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} onClick={(e) => e.stopPropagation()} />
              )}
            </AnimatePresence>
            {len > 1 && <button className="absolute right-4 p-2.5 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors z-10" onClick={(e) => { e.stopPropagation(); goNext(); }}><ChevronRight className="w-8 h-8" /></button>}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/60 text-sm">{currentImage + 1} / {len}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
