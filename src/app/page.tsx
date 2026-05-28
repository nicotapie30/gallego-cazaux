"use client";

import Link from 'next/link';
import { ArrowRight, MapPin, Bed, Bath, Ruler, Home as HomeIcon, TrendingUp, Key, FileText, Trophy, Users } from '@/lib/icons';
import type { Property } from '@/lib/types';
import { AnimateIn } from '@/components/AnimateIn';
import { TestimonialCarousel } from '@/components/TestimonialCarousel';
import { motion, AnimatePresence, useInView, animate, useScroll, useTransform, useMotionValueEvent, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

function CountUp({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const controls = animate(0, to, {
      duration: 1.8,
      ease: 'easeOut',
      onUpdate: (v) => setValue(Math.round(v)),
    })
    return controls.stop
  }, [isInView, to])

  return <span ref={ref}>{value}{suffix}</span>
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.162-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.493.099-.198.05-.371-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const mockProperties: Property[] = [
  {
    _id: '1',
    title: 'Casa en Moreno al 500',
    slug: { current: 'casa-moreno-500' },
    operation: 'venta',
    propertyType: 'casa',
    price: 85000,
    currency: 'USD',
    address: 'Moreno al 500',
    city: 'Santa Rosa',
    province: 'La Pampa',
    description: 'Excelente oportunidad con gran potencial de inversión en zona residencial.',
    features: { bedrooms: 2, bathrooms: 1, coveredArea: 80, totalArea: 150, garage: true },
    images: [{ asset: { url: 'https://picsum.photos/seed/prop1/800/1000' } }],
    isFeatured: true,
    status: 'disponible',
    publishedAt: '2024-01-15',
  },
  {
    _id: '2',
    title: 'Casa en Bouchard al 200',
    slug: { current: 'casa-bouchard-200' },
    operation: 'venta',
    propertyType: 'casa',
    price: 115000,
    currency: 'USD',
    address: 'Bouchard al 200',
    city: 'Santa Rosa',
    province: 'La Pampa',
    description: 'Hermosa casa con piscina, jardín y garage para dos autos.',
    features: { bedrooms: 3, bathrooms: 2, coveredArea: 198, totalArea: 338, garage: true },
    images: [{ asset: { url: 'https://picsum.photos/seed/prop2/800/600' } }],
    isFeatured: true,
    status: 'disponible',
    publishedAt: '2024-01-10',
  },
  {
    _id: '3',
    title: 'Departamento en el centro',
    slug: { current: 'departamento-marcelo-alvear' },
    operation: 'venta',
    propertyType: 'departamento',
    price: 75000,
    currency: 'USD',
    address: 'Marcelo T. de Alvear 446',
    city: 'Santa Rosa',
    province: 'La Pampa',
    description: 'Departamento en pleno centro, luminoso y bien ubicado.',
    features: { bedrooms: 1, bathrooms: 1, coveredArea: 43, totalArea: 55, garage: true },
    images: [{ asset: { url: 'https://picsum.photos/seed/prop3/800/600' } }],
    isFeatured: false,
    status: 'disponible',
    publishedAt: '2024-01-05',
  },
  {
    _id: '4',
    title: 'Terreno en Avenida Uruguay',
    slug: { current: 'terreno-avenida-uruguay' },
    operation: 'venta',
    propertyType: 'terreno',
    price: 42000,
    currency: 'USD',
    address: 'Av. Uruguay al 800',
    city: 'Santa Rosa',
    province: 'La Pampa',
    description: 'Terreno en esquina, excelente ubicación para construir.',
    features: { bedrooms: 0, bathrooms: 0, coveredArea: 0, totalArea: 400, garage: false },
    images: [{ asset: { url: 'https://picsum.photos/seed/prop4/800/600' } }],
    isFeatured: false,
    status: 'disponible',
    publishedAt: '2024-01-03',
  },
  {
    _id: '5',
    title: 'Casa en Perón al 1200',
    slug: { current: 'casa-peron-1200' },
    operation: 'alquiler',
    propertyType: 'casa',
    price: 180000,
    currency: 'ARS',
    address: 'Perón al 1200',
    city: 'Santa Rosa',
    province: 'La Pampa',
    description: 'Casa amplia para alquiler, zona tranquila con patio y garage.',
    features: { bedrooms: 3, bathrooms: 1, coveredArea: 120, totalArea: 220, garage: true },
    images: [{ asset: { url: 'https://picsum.photos/seed/prop5/800/600' } }],
    isFeatured: false,
    status: 'disponible',
    publishedAt: '2024-01-01',
  },
];

function formatPrice(price: number, currency: string) {
  return currency === 'USD'
    ? `US$ ${price.toLocaleString('es-AR')}`
    : `$ ${price.toLocaleString('es-AR')}`;
}

const TYPE_LABEL: Record<string, string> = {
  casa: 'Casa', departamento: 'Depto.', ph: 'PH', terreno: 'Terreno', local: 'Local',
};

function FeaturedCard({ property }: { property: Property }) {
  const imageUrl = property.images?.[0]?.asset?.url;
  return (
    <motion.div
      className="h-full rounded-2xl overflow-hidden transition-shadow duration-300"
      style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.2)' }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.28, ease: [0, 0, 0.2, 1] }}
    >
    <Link
      href={`/propiedades/${property.slug.current}`}
      className="relative rounded-2xl overflow-hidden bg-secondary block h-full group"
    >
      <div className="relative h-full min-h-[420px] overflow-hidden">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/30 to-transparent" />

        <div className="absolute top-5 left-5 flex gap-2">
          <span className="bg-primary text-white text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-wide">
            {property.operation === 'venta' ? 'Venta' : 'Alquiler'}
          </span>
          {TYPE_LABEL[property.propertyType] && (
            <span className="bg-white text-secondary text-xs font-semibold px-3 py-1.5 rounded-full">
              {TYPE_LABEL[property.propertyType]}
            </span>
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <p className="text-white/60 text-sm mb-1">{property.address}, {property.city}</p>
          <h3 className="font-outfit font-bold text-white text-xl mb-3 leading-tight">{property.title}</h3>
          <div className="flex items-center justify-between">
            <span className="font-outfit font-bold text-primary text-xl">{formatPrice(property.price, property.currency)}</span>
            <div className="flex items-center gap-3 text-white/70 text-sm">
              {!!property.features.bedrooms && (
                <span className="flex items-center gap-1"><Bed className="w-4 h-4" />{property.features.bedrooms}</span>
              )}
              {!!property.features.bathrooms && (
                <span className="flex items-center gap-1"><Bath className="w-4 h-4" />{property.features.bathrooms}</span>
              )}
              {!!property.features.coveredArea && (
                <span className="flex items-center gap-1"><Ruler className="w-4 h-4" />{property.features.coveredArea}m²</span>
              )}
              {!property.features.coveredArea && !!property.features.totalArea && (
                <span className="flex items-center gap-1"><Ruler className="w-4 h-4" />{property.features.totalArea}m²</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
    </motion.div>
  );
}

function MediumCard({ property }: { property: Property }) {
  const imageUrl = property.images?.[0]?.asset?.url;
  return (
    <motion.div
      className="rounded-2xl overflow-hidden bg-white border border-border transition-shadow duration-300 hover:shadow-lg hover:border-primary/25"
      whileHover={{ y: -6 }}
      transition={{ duration: 0.28, ease: [0, 0, 0.2, 1] }}
    >
      <Link href={`/propiedades/${property.slug.current}`} className="block group">
        <div className="relative aspect-[4/3] overflow-hidden">
          {imageUrl && (
            <img
              src={imageUrl}
              alt={property.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute top-3 left-3 flex gap-1.5">
            <span className="bg-primary text-white text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase">
              {property.operation === 'venta' ? 'Venta' : 'Alquiler'}
            </span>
            {TYPE_LABEL[property.propertyType] && (
              <span className="bg-white text-secondary text-[10px] font-semibold px-2.5 py-1 rounded-full">
                {TYPE_LABEL[property.propertyType]}
              </span>
            )}
          </div>
          <span className="absolute bottom-3 right-3 font-outfit font-bold text-white text-base drop-shadow-lg">
            {formatPrice(property.price, property.currency)}
          </span>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-secondary text-sm leading-snug mb-1">{property.title}</h3>
          <p className="text-muted text-xs mb-3">{property.address}, {property.city}</p>
          <div className="flex items-center gap-3 text-muted text-xs pt-3 border-t border-border">
            {!!property.features.bedrooms && (
              <span className="flex items-center gap-1"><Bed className="w-3.5 h-3.5" />{property.features.bedrooms} dorm.</span>
            )}
            {!!property.features.bathrooms && (
              <span className="flex items-center gap-1"><Bath className="w-3.5 h-3.5" />{property.features.bathrooms} baños</span>
            )}
            {!!property.features.coveredArea && (
              <span className="flex items-center gap-1"><Ruler className="w-3.5 h-3.5" />{property.features.coveredArea} m²</span>
            )}
            {!property.features.coveredArea && !!property.features.totalArea && (
              <span className="flex items-center gap-1"><Ruler className="w-3.5 h-3.5" />{property.features.totalArea} m²</span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function HorizontalCard({ property }: { property: Property }) {
  const imageUrl = property.images?.[0]?.asset?.url;
  return (
    <motion.div
      className="rounded-2xl overflow-hidden bg-white border border-border transition-shadow duration-300 hover:shadow-lg hover:border-primary/25"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.28, ease: [0, 0, 0.2, 1] }}
    >
      <Link href={`/propiedades/${property.slug.current}`} className="flex flex-col md:flex-row w-full group">
        <div className="relative w-full md:w-36 md:shrink-0 overflow-hidden aspect-[16/9] md:aspect-auto">
          {imageUrl && (
            <img
              src={imageUrl}
              alt={property.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          )}
          <span className="absolute top-2.5 left-2.5 bg-primary text-white text-[9px] font-semibold px-2 py-0.5 rounded-full uppercase">
            {property.operation === 'venta' ? 'Venta' : 'Alquiler'}
          </span>
        </div>
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <p className="font-outfit font-bold text-primary text-base">{formatPrice(property.price, property.currency)}</p>
              {TYPE_LABEL[property.propertyType] && (
                <span className="text-[9px] font-semibold text-secondary bg-secondary/8 px-2 py-0.5 rounded-full">
                  {TYPE_LABEL[property.propertyType]}
                </span>
              )}
            </div>
            <h3 className="font-semibold text-secondary text-sm leading-snug mb-1">{property.title}</h3>
            <p className="text-muted text-xs">{property.address}, {property.city}</p>
          </div>
          <div className="flex items-center gap-3 text-muted text-xs mt-3 pt-3 border-t border-border">
            {!!property.features.bedrooms && (
              <span className="flex items-center gap-1"><Bed className="w-3.5 h-3.5" />{property.features.bedrooms} dorm.</span>
            )}
            {!!property.features.bathrooms && (
              <span className="flex items-center gap-1"><Bath className="w-3.5 h-3.5" />{property.features.bathrooms} baños</span>
            )}
            {(property.features.coveredArea || property.features.totalArea) && (
              <span className="flex items-center gap-1">
                <Ruler className="w-3.5 h-3.5" />
                {property.features.coveredArea || property.features.totalArea} m²
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

const services = [
  {
    icon: HomeIcon,
    title: 'Compra',
    description: 'Te acompañamos a encontrar la propiedad ideal según tu presupuesto y necesidades en Santa Rosa y La Pampa.',
  },
  {
    icon: TrendingUp,
    title: 'Venta',
    description: 'Vendemos tu propiedad al mejor precio, con estrategia de difusión y seguimiento personalizado en cada paso.',
  },
  {
    icon: Key,
    title: 'Alquiler',
    description: 'Gestionamos el alquiler de tu inmueble de inicio a fin: inquilinos, contratos y cobranzas.',
  },
  {
    icon: FileText,
    title: 'Tasación',
    description: 'Valuamos tu inmueble con criterio de mercado local para que tomés las mejores decisiones.',
  },
];

const differentials = [
  {
    icon: Trophy,
    title: '20+ años en el mercado',
    description: 'Décadas de experiencia nos dan el conocimiento y la red de contactos que ningún portal puede reemplazar.',
  },
  {
    icon: MapPin,
    title: 'Especialistas en Santa Rosa',
    description: 'Conocemos cada barrio, cada zona, cada oportunidad — antes de que aparezca en el mercado.',
  },
  {
    icon: Users,
    title: 'Atención sin intermediarios',
    description: 'Hablás directamente con quien maneja tu operación. Sin call centers ni burocracia.',
  },
];

function WhyUsSection() {
  return (
    <section className="py-14 md:py-24 bg-secondary overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

          {/* Left: image with scroll parallax + hover */}
          <AnimateIn direction="left">
            <motion.div
              className="relative rounded-3xl overflow-hidden"
              style={{ height: 'clamp(220px, 45vw, 500px)' }}
              initial="rest"
              whileHover="hover"
              animate="rest"
            >
              <motion.img
                src="https://picsum.photos/id/1029/600/700"
                alt="Equipo Gallego Cazaux"
                className="w-full h-full object-cover"
                style={{}}
                variants={{
                  rest: { scale: 1.4 },
                  hover: { scale: 1.48 },
                }}
                transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] }}
              />
              {/* Hover green tint */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(to top, rgba(1,143,51,0.35), rgba(1,143,51,0.08))' }}
                variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/85 via-secondary/20 to-transparent" />
              <div
                className="absolute bottom-6 left-6 right-6 rounded-2xl p-5"
                style={{ background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.12)' }}
              >
                <p className="text-white/50 text-xs uppercase tracking-widest mb-1">Pellegrini 594 · Santa Rosa</p>
                <p className="text-white font-outfit font-bold text-lg leading-snug">Abriendo puertas desde 2003</p>
              </div>
            </motion.div>
          </AnimateIn>

          {/* Right: heading + differentials */}
          <div>
            <AnimateIn direction="right">
              <p className="text-primary font-medium text-sm uppercase tracking-widest mb-4">Por qué elegirnos</p>
              <h2 className="font-outfit text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4 text-balance">
                Conocemos Santa Rosa mejor que nadie.
              </h2>
              <p className="text-gray-400 text-base leading-relaxed mb-6 md:mb-10">
                Somos la inmobiliaria de referencia en La Pampa. Cada barrio, cada zona, cada oportunidad — antes de que aparezca en el mercado.
              </p>
            </AnimateIn>

            <div>
              {differentials.map((d, i) => (
                <AnimateIn key={d.title} delay={i * 80} direction="right">
                  <motion.div
                    className="flex gap-5 -mx-3 px-3 rounded-xl"
                    style={{
                      paddingTop: '1.75rem',
                      paddingBottom: '1.75rem',
                      borderBottom: i === differentials.length - 1 ? 'none' : '1px solid rgba(255,255,255,0.1)',
                    }}
                    initial="rest"
                    whileHover="hover"
                    animate="rest"
                    variants={{
                      rest: { backgroundColor: 'rgba(0,0,0,0)' },
                      hover: { backgroundColor: 'rgba(1,143,51,0.07)' },
                    }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                  >
                    <motion.div
                      className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                      variants={{
                        rest: { scale: 1, backgroundColor: 'rgba(1,143,51,0.15)' },
                        hover: { scale: 1.12, backgroundColor: 'rgba(1,143,51,0.28)' },
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <d.icon className="w-5 h-5 text-primary" />
                    </motion.div>
                    <div>
                      <motion.h3
                        className="font-outfit font-bold text-lg mb-1"
                        variants={{
                          rest: { color: 'rgb(255,255,255)' },
                          hover: { color: 'rgb(134,239,172)' },
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        {d.title}
                      </motion.h3>
                      <motion.p
                        className="text-sm leading-relaxed"
                        variants={{
                          rest: { color: 'rgb(156,163,175)' },
                          hover: { color: 'rgb(209,213,219)' },
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        {d.description}
                      </motion.p>
                    </div>
                  </motion.div>
                </AnimateIn>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

// ── Hero animation variants ───────────────────────────────────
const EASE_OUT_QUART: [number, number, number, number] = [0.23, 1, 0.32, 1]

const heroCopyVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const heroItemVariants = {
  hidden: { y: 24, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: EASE_OUT_QUART } },
}

const heroH1Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
}

const heroWordVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.45, ease: EASE_OUT_QUART } },
}


const heroSlides = [
  { image: 'https://picsum.photos/seed/realestate/800/1000', label: 'Destacado', title: 'Casa en Moreno al 500', price: 'US$ 85.000', bed: 2, bath: 1, area: 80 },
  { image: 'https://picsum.photos/seed/house2/800/1000', label: 'En venta', title: 'Casa en Bouchard al 200', price: 'US$ 115.000', bed: 3, bath: 2, area: 198 },
  { image: 'https://picsum.photos/seed/house3/800/1000', label: 'Oportunidad', title: 'Dpto. en el centro', price: 'US$ 75.000', bed: 1, bath: 1, area: 43 },
  { image: 'https://picsum.photos/seed/house4/800/1000', label: 'En alquiler', title: 'Casa en Perón al 1200', price: '$ 180.000', bed: 3, bath: 1, area: 120 },
  { image: 'https://picsum.photos/seed/house5/800/1000', label: 'En venta', title: 'Terreno en Av. Uruguay', price: 'US$ 42.000', bed: null, bath: null, area: 400 },
]

function ScrollIndicator() {
  const { scrollY } = useScroll()
  const [visible, setVisible] = useState(true)

  useMotionValueEvent(scrollY, 'change', (v) => {
    setVisible(v < 80)
  })

  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none"
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        className="flex flex-col items-center gap-0.5"
      >
        <svg width="20" height="11" viewBox="0 0 20 11" fill="none">
          <path d="M1 1L10 10L19 1" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <svg width="20" height="11" viewBox="0 0 20 11" fill="none" className="-mt-1">
          <path d="M1 1L10 10L19 1" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.div>
    </motion.div>
  )
}

export default function Home() {
  const heroRef = useRef<HTMLElement>(null)
  const shouldReduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const imageParallaxY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [0, -60])
  const blob1ParallaxY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [0, 20])

  const [heroImageIndex, setHeroImageIndex] = useState(0)
  const heroPausedRef = useRef(false)

  useEffect(() => {
    const interval = setInterval(() => {
      if (!heroPausedRef.current) {
        setHeroImageIndex((i) => (i + 1) % heroSlides.length)
      }
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div>

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section ref={heroRef} className="grain relative min-h-[calc(100dvh-5rem)] flex items-center overflow-hidden" style={{ background: 'linear-gradient(135deg, #04122e 0%, #05103d 40%, #061240 65%, #020b28 100%)' }}>
        {/* Blob 1: large green ambient — top right, breathes + parallax */}
        <motion.div
          className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 w-[700px] h-[700px] rounded-full blur-[120px] pointer-events-none"
          style={{ background: 'rgba(1,143,51,0.18)', y: blob1ParallaxY }}
          animate={shouldReduceMotion ? undefined : { scale: [1, 1.12, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Blob 2: blue-tinted depth — bottom left, drifts */}
        <motion.div
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full blur-[80px] pointer-events-none"
          style={{ background: 'rgba(1,4,25,0.70)' }}
          animate={shouldReduceMotion ? undefined : { x: [0, 15, 0], y: [0, -10, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Blob 3: small warm accent — center, floats */}
        <motion.div
          className="absolute top-1/3 left-1/3 w-72 h-72 rounded-full blur-[80px] pointer-events-none"
          style={{ background: 'rgba(1,143,51,0.10)' }}
          animate={shouldReduceMotion ? undefined : { scale: [1, 1.08, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 w-full" style={{ paddingBottom: 'calc(5rem + env(safe-area-inset-bottom, 0px))' }}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">

            {/* Left: copy — FM orchestrated entrance */}
            <motion.div
              className="lg:col-span-7"
              variants={heroCopyVariants}
              initial={shouldReduceMotion ? false : 'hidden'}
              animate="visible"
            >
              {/* Badge */}
              <motion.div
                variants={heroItemVariants}
                className="inline-flex items-center gap-2 text-primary text-sm font-medium bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-full mb-8"
              >
                <MapPin className="w-3.5 h-3.5" />
                Santa Rosa, La Pampa
              </motion.div>

              {/* H1 — word by word stagger */}
              <motion.h1
                variants={heroH1Variants}
                className="font-outfit text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-6"
              >
                {['Tu', 'inversión'].map((word) => (
                  <motion.span key={word} variants={heroWordVariants} className="inline-block mr-[0.25em]">{word}</motion.span>
                ))}
                <br />
                <motion.span variants={heroWordVariants} className="inline-block mr-[0.25em] text-primary">segura</motion.span>
                <motion.span variants={heroWordVariants} className="inline-block mr-[0.25em]">en</motion.span>
                <br />
                {['La', 'Pampa.'].map((word) => (
                  <motion.span key={word} variants={heroWordVariants} className="inline-block mr-[0.25em]">{word}</motion.span>
                ))}
              </motion.h1>

              {/* Paragraph */}
              <motion.p
                variants={heroItemVariants}
                className="text-gray-400 text-lg mb-6 md:mb-10 max-w-md leading-relaxed"
              >
                Más de 20 años acompañando familias e inversores en Santa Rosa. Comprá, vendé o alquilá con confianza.
              </motion.p>

              {/* Buttons */}
              <motion.div
                variants={heroItemVariants}
                className="flex flex-col sm:flex-row gap-3"
              >
                <Link
                  href="/propiedades"
                  className="group inline-flex justify-center items-center gap-2 px-5 py-3.5 md:px-7 md:py-4 bg-primary text-white font-semibold rounded-xl hover:bg-primary-hover transition-colors text-sm md:text-base shadow-lg shadow-primary/30"
                >
                  Ver propiedades
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
                <a
                  href="https://wa.me/542954272138"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex justify-center items-center gap-2 px-5 py-3.5 md:px-7 md:py-4 bg-white/[0.06] border border-white/20 text-white font-semibold rounded-xl hover:bg-white/15 hover:border-white/40 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 text-sm md:text-base backdrop-blur-sm"
                >
                  <WhatsAppIcon className="w-5 h-5" />
                  WhatsApp
                </a>
              </motion.div>

              {/* Stats — glassmorphism panel, entra como unidad */}
              <motion.div
                variants={heroItemVariants}
                className="mt-6 md:mt-12 grid grid-cols-3 rounded-2xl overflow-hidden"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <div className="px-3 py-3 md:px-6 md:py-5">
                  <div className="font-outfit text-xl md:text-3xl font-bold text-white"><CountUp to={20} suffix="+" /></div>
                  <div className="text-[10px] md:text-xs text-gray-500 mt-0.5 leading-tight">Años de<br className="md:hidden" /> experiencia</div>
                </div>
                <div className="px-3 py-3 md:px-6 md:py-5" style={{ borderLeft: '1px solid rgba(255,255,255,0.06)', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="font-outfit text-xl md:text-3xl font-bold text-white"><CountUp to={500} suffix="+" /></div>
                  <div className="text-[10px] md:text-xs text-gray-500 mt-0.5 leading-tight">Operaciones<br className="md:hidden" /> realizadas</div>
                </div>
                <div className="px-3 py-3 md:px-6 md:py-5">
                  <div className="font-outfit text-xl md:text-3xl font-bold text-primary"><CountUp to={7} suffix="K+" /></div>
                  <div className="text-[10px] md:text-xs text-gray-500 mt-0.5 leading-tight">Seguidores<br className="md:hidden" /> Instagram</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right: image — spring entrance + parallax + float loop */}
            <motion.div
              className="lg:col-span-5 relative hidden lg:block"
              style={{ y: imageParallaxY }}
              initial={shouldReduceMotion ? false : { scale: 1.08, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 80, damping: 18, delay: 0.2 }}
            >
              <motion.div
                className="relative rounded-3xl overflow-hidden aspect-[4/5]"
                style={{ boxShadow: '0 0 100px rgba(1,143,51,0.28), 0 0 0 1px rgba(1,143,51,0.35), 0 30px 60px rgba(0,0,0,0.6)' }}
                animate={shouldReduceMotion ? undefined : { y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                onMouseEnter={() => { heroPausedRef.current = true }}
                onMouseLeave={() => { heroPausedRef.current = false }}
              >
                <AnimatePresence mode="sync" initial={false}>
                  <motion.img
                    key={heroImageIndex}
                    src={heroSlides[heroImageIndex].image}
                    alt="Propiedad en Santa Rosa, La Pampa"
                    className="absolute inset-0 w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, ease: 'easeInOut' }}
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/70 via-secondary/10 to-transparent" />

                {/* Floating card — spring entrance + content crossfade */}
                <motion.div
                  className="absolute bottom-6 left-5 right-5 rounded-2xl p-4 overflow-hidden"
                  style={{
                    background: 'rgba(255,255,255,0.92)',
                    backdropFilter: 'blur(16px)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                  }}
                  initial={shouldReduceMotion ? false : { y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.5 }}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={heroImageIndex}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="text-xs text-muted uppercase tracking-widest font-medium mb-0.5">{heroSlides[heroImageIndex].label}</p>
                          <p className="font-outfit font-bold text-secondary text-sm leading-tight">{heroSlides[heroImageIndex].title}</p>
                        </div>
                        <p className="font-outfit font-bold text-primary text-base">{heroSlides[heroImageIndex].price}</p>
                      </div>
                      <div className="flex items-center gap-3 pt-3 border-t border-border text-xs text-muted">
                        {heroSlides[heroImageIndex].bed && (
                          <span className="flex items-center gap-1"><Bed className="w-3.5 h-3.5" />{heroSlides[heroImageIndex].bed} dorm.</span>
                        )}
                        {heroSlides[heroImageIndex].bath && (
                          <span className="flex items-center gap-1"><Bath className="w-3.5 h-3.5" />{heroSlides[heroImageIndex].bath} baño{heroSlides[heroImageIndex].bath !== 1 ? 's' : ''}</span>
                        )}
                        <span className="flex items-center gap-1"><Ruler className="w-3.5 h-3.5" />{heroSlides[heroImageIndex].area} m²</span>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            </motion.div>

          </div>
        </div>

        {/* Scroll indicator */}
        <ScrollIndicator />
      </section>

      {/* ── PROPIEDADES DESTACADAS ────────────────────────────────── */}
      <section className="relative py-24 overflow-hidden" style={{ background: '#f4f6f9' }}>

        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(1,143,51,0.14) 1.5px, transparent 1.5px)',
            backgroundSize: '28px 28px',
          }}
        />

        {/* Radial glow — top center */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(1,143,51,0.10) 0%, transparent 70%)',
          }}
        />

        {/* Corner glows */}
        <div className="absolute -top-16 -right-16 w-96 h-96 rounded-full blur-[100px] pointer-events-none" style={{ background: 'rgba(1,143,51,0.09)' }} />
        <div className="absolute -bottom-16 -left-16 w-80 h-80 rounded-full blur-[90px] pointer-events-none" style={{ background: 'rgba(5,16,61,0.07)' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section header */}
          <AnimateIn className="mb-12">
            <div className="pl-5 border-l-2 border-primary">
              <p className="text-primary font-medium text-sm uppercase tracking-widest mb-2">En venta y alquiler</p>
              <h2 className="font-outfit text-4xl md:text-5xl font-bold text-secondary">Propiedades<br />destacadas</h2>
            </div>
          </AnimateIn>

          {/* Bento grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:grid-rows-[auto_auto]">

            {/* Featured — tall, spans 2 rows on desktop */}
            <AnimateIn className="md:row-span-2 h-full">
              <FeaturedCard property={mockProperties[0]} />
            </AnimateIn>

            {/* Medium cards — top row */}
            <AnimateIn delay={100}>
              <MediumCard property={mockProperties[1]} />
            </AnimateIn>
            <AnimateIn delay={180}>
              <MediumCard property={mockProperties[2]} />
            </AnimateIn>

            {/* Horizontal card */}
            <AnimateIn delay={120}>
              <HorizontalCard property={mockProperties[3]} />
            </AnimateIn>

            {/* Ver todas — CTA card */}
            <AnimateIn delay={200}>
              <motion.div
                className="h-full rounded-2xl overflow-hidden bg-secondary"
                initial="rest"
                whileHover="hover"
                animate="rest"
                variants={{
                  rest: { boxShadow: '0 1px 3px rgba(0,0,0,0.12)' },
                  hover: { boxShadow: '0 20px 40px rgba(5,16,61,0.25), 0 0 0 1px rgba(1,143,51,0.3)' },
                }}
                transition={{ duration: 0.28, ease: [0, 0, 0.2, 1] }}
              >
                <Link href="/propiedades" className="flex h-full min-h-[116px] flex-col justify-between p-6">
                  <p className="text-white/40 text-xs uppercase tracking-widest">Explorar</p>
                  <div className="flex items-end justify-between">
                    <p className="font-outfit font-bold text-white text-xl leading-snug">
                      Ver todas las<br />propiedades
                    </p>
                    <motion.div
                      variants={{ rest: { x: 0 }, hover: { x: 4 } }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowRight className="w-6 h-6 text-primary mb-0.5" />
                    </motion.div>
                  </div>
                </Link>
              </motion.div>
            </AnimateIn>

          </div>
        </div>
      </section>

      {/* ── SERVICIOS ────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">

            <AnimateIn className="lg:col-span-2" direction="left">
              <p className="text-primary font-medium text-sm uppercase tracking-widest mb-3">Lo que hacemos</p>
              <h2 className="font-outfit text-4xl md:text-5xl font-bold text-secondary leading-tight mb-5">
                Todo lo que<br />necesitás en<br />una sola oficina.
              </h2>
              <p className="text-muted text-base leading-relaxed">
                Compra, venta, alquiler o tasación — con el respaldo de más de 20 años en el mercado pampeano.
              </p>
            </AnimateIn>

            <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {services.map((service, i) => (
                <AnimateIn key={service.title} delay={i * 70}>
                  <motion.div
                    className="p-6 rounded-2xl border h-full cursor-default"
                    style={{ background: '#f8fafc', borderColor: 'rgba(226,232,240,1)' }}
                    initial="rest"
                    whileHover="hover"
                    animate="rest"
                    variants={{
                      rest: {
                        y: 0,
                        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                        borderColor: 'rgba(226,232,240,1)',
                      },
                      hover: {
                        y: -8,
                        boxShadow: '0 24px 48px rgba(1,143,51,0.1), 0 8px 24px rgba(0,0,0,0.06), 0 0 0 1px rgba(1,143,51,0.2)',
                        borderColor: 'rgba(1,143,51,0.25)',
                      },
                    }}
                    transition={{ duration: 0.3, ease: [0, 0, 0.2, 1] }}
                  >
                    <motion.div
                      className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                      variants={{
                        rest: { scale: 1, backgroundColor: 'rgba(1,143,51,0.08)' },
                        hover: { scale: 1.15, backgroundColor: '#018f33' },
                      }}
                      transition={{ duration: 0.25, ease: [0, 0, 0.2, 1] }}
                    >
                      <motion.span
                        variants={{
                          rest: { color: '#018f33' },
                          hover: { color: '#ffffff' },
                        }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center justify-center"
                      >
                        <service.icon className="w-5 h-5" />
                      </motion.span>
                    </motion.div>
                    <motion.h3
                      className="font-outfit font-bold text-lg mb-2"
                      variants={{
                        rest: { color: '#05103d' },
                        hover: { color: '#018f33' },
                      }}
                      transition={{ duration: 0.25 }}
                    >
                      {service.title}
                    </motion.h3>
                    <p className="text-muted text-sm leading-relaxed">{service.description}</p>
                  </motion.div>
                </AnimateIn>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── POR QUÉ ELEGIRNOS ────────────────────────────────────── */}
      <WhyUsSection />

      {/* ── CTA FINAL ────────────────────────────────────────────── */}
      <section className="relative py-16 overflow-hidden" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #ffffff 50%, #f0fdf4 100%)' }}>
        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(1,143,51,0.14) 1.5px, transparent 1.5px)', backgroundSize: '28px 28px' }}
        />
        {/* Radial glow — top center */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(1,143,51,0.10) 0%, transparent 70%)' }}
        />
        {/* Corner glows */}
        <div className="absolute -top-16 -right-16 w-96 h-96 rounded-full blur-[100px] pointer-events-none" style={{ background: 'rgba(1,143,51,0.09)' }} />
        <div className="absolute -bottom-16 -left-16 w-80 h-80 rounded-full blur-[90px] pointer-events-none" style={{ background: 'rgba(5,16,61,0.07)' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <div
              className="grain relative rounded-3xl px-6 py-10 md:px-16 md:py-20 overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #018f33 0%, #016d28 60%, #014d1d 100%)' }}
            >
              {/* Decorative rings */}
              <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full pointer-events-none" style={{ border: '1px solid rgba(255,255,255,0.08)' }} />
              <div className="absolute -top-8 -right-8 w-56 h-56 rounded-full pointer-events-none" style={{ border: '1px solid rgba(255,255,255,0.06)' }} />
              <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full pointer-events-none" style={{ border: '1px solid rgba(255,255,255,0.05)' }} />
              {/* Inner light glow */}
              <div className="absolute top-0 right-1/4 w-96 h-64 rounded-full blur-[80px] pointer-events-none" style={{ background: 'rgba(255,255,255,0.07)' }} />

              <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">

                {/* Left: copy */}
                <div>
                  <p className="text-white/50 font-medium text-xs uppercase tracking-widest mb-3">¿Listo para el próximo paso?</p>
                  <h2 className="font-outfit text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4 md:mb-6">
                    Más de 500 familias encontraron su lugar.{' '}
                    <span className="text-white/55">La próxima podés ser vos.</span>
                  </h2>
                  <p className="text-white/70 text-base md:text-lg leading-relaxed mb-6 md:mb-10">
                    Dos décadas en Santa Rosa nos enseñaron que detrás de cada operación hay una historia. Contanos la tuya y te ayudamos a dar el siguiente paso.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href="https://wa.me/542954272138"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex justify-center items-center gap-3 px-6 py-3.5 sm:px-8 sm:py-4 bg-white text-primary font-semibold rounded-xl text-sm sm:text-base whitespace-nowrap transition-shadow duration-200 hover:shadow-xl"
                    >
                      <WhatsAppIcon className="w-5 h-5 shrink-0" />
                      Hablemos sin compromiso
                    </a>
                    <Link
                      href="/propiedades"
                      className="group inline-flex justify-center items-center gap-2 px-6 py-3.5 sm:px-8 sm:py-4 text-white/75 hover:text-white font-semibold rounded-xl border border-white/20 hover:border-white/40 transition-colors text-sm sm:text-base whitespace-nowrap"
                    >
                      Ver propiedades
                      <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>

                {/* Right: testimonial carousel */}
                <TestimonialCarousel />

              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

    </div>
  );
}

