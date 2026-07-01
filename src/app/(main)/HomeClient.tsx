"use client";

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MapPin, Bed, Bath, Ruler, Home as HomeIcon, TrendingUp, Key, FileText, Trophy, Users } from '@/lib/icons';
import type { Property } from '@/lib/types';
import { urlFor } from '@/lib/sanity';
import { AnimateIn } from '@/components/AnimateIn';
import { TestimonialCarousel } from '@/components/TestimonialCarousel';
import Select from '@/components/ui/Select';
import { motion, AnimatePresence, useInView, animate, useScroll, useTransform, useMotionValueEvent, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

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

function formatPrice(price: number | null | undefined, currency: string, priceOnRequest?: boolean) {
  if (priceOnRequest || price == null || price === 0) return 'Consultar precio';
  return currency === 'USD'
    ? `US$ ${price.toLocaleString('es-AR')}`
    : `$ ${price.toLocaleString('es-AR')}`;
}

const TYPE_LABEL: Record<string, string> = {
  casa: 'Casa', departamento: 'Depto.', ph: 'PH', terreno: 'Terreno', local: 'Local',
};

function FeaturedCard({ property }: { property: Property }) {
  const firstImage = property.images?.[0];
  const imageUrl = firstImage ? urlFor(firstImage).width(800).url() : undefined;
  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      animate="rest"
      variants={{
        rest: { y: 0, boxShadow: '0 4px 16px rgba(0,0,0,0.2)' },
        hover: { y: -8, boxShadow: '0 16px 40px rgba(0,0,0,0.32)' },
      }}
      transition={{ duration: 0.28, ease: [0, 0, 0.2, 1] }}
      className="h-full rounded-2xl overflow-hidden"
    >
    <Link
      href={`/propiedades/${property.slug.current}`}
      className="relative rounded-2xl overflow-hidden bg-secondary block h-full"
    >
      <div className="relative h-full min-h-[420px] overflow-hidden">
        {imageUrl && (
          <MotionImage
            src={imageUrl}
            alt={property.title}
            fill
            className="object-cover"
            variants={{ rest: { scale: 1 }, hover: { scale: 1.06 } }}
            transition={{ duration: 0.4, ease: [0, 0, 0.2, 1] }}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
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
            {(property.priceOnRequest || property.price == null || property.price === 0) ? (
              <span className="inline-flex items-center bg-white/15 backdrop-blur-sm border border-white/30 text-white font-outfit font-semibold text-sm px-4 py-1.5 rounded-full">
                Consultar precio
              </span>
            ) : (
              <span className="font-outfit font-bold text-primary text-xl">{formatPrice(property.price, property.currency)}</span>
            )}
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
  const firstImage = property.images?.[0];
  const imageUrl = firstImage ? urlFor(firstImage).width(600).url() : undefined;
  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      animate="rest"
      variants={{
        rest: { y: 0, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' },
        hover: { y: -6, boxShadow: '0 12px 28px rgba(0,0,0,0.12)' },
      }}
      transition={{ duration: 0.28, ease: [0, 0, 0.2, 1] }}
      className="rounded-2xl overflow-hidden bg-white border border-border hover:border-primary/25 transition-colors duration-300"
    >
      <Link href={`/propiedades/${property.slug.current}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden">
          {imageUrl && (
            <MotionImage
              src={imageUrl}
              alt={property.title}
              fill
              className="object-cover"
              variants={{ rest: { scale: 1 }, hover: { scale: 1.06 } }}
              transition={{ duration: 0.4, ease: [0, 0, 0.2, 1] }}
              sizes="(max-width: 640px) calc(100vw - 2rem), (max-width: 1024px) calc(50vw - 3rem), 380px"
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
          <span className="absolute bottom-3 right-3 font-outfit font-semibold text-white text-sm bg-black/55 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full">
            {formatPrice(property.price, property.currency, property.priceOnRequest)}
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
  const firstImage = property.images?.[0];
  const imageUrl = firstImage ? urlFor(firstImage).width(600).url() : undefined;
  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      animate="rest"
      variants={{
        rest: { y: 0, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' },
        hover: { y: -5, boxShadow: '0 10px 24px rgba(0,0,0,0.12)' },
      }}
      transition={{ duration: 0.28, ease: [0, 0, 0.2, 1] }}
      className="rounded-2xl overflow-hidden bg-white border border-border hover:border-primary/25 transition-colors duration-300"
    >
      <Link href={`/propiedades/${property.slug.current}`} className="flex flex-col md:flex-row w-full">
        <div className="relative w-full md:w-36 md:shrink-0 overflow-hidden aspect-[16/9] md:aspect-auto">
          {imageUrl && (
            <MotionImage
              src={imageUrl}
              alt={property.title}
              fill
              className="object-cover"
              variants={{ rest: { scale: 1 }, hover: { scale: 1.06 } }}
              transition={{ duration: 0.4, ease: [0, 0, 0.2, 1] }}
              sizes="(max-width: 768px) calc(100vw - 2rem), 144px"
            />
          )}
          <span className="absolute top-2.5 left-2.5 bg-primary text-white text-[9px] font-semibold px-2 py-0.5 rounded-full uppercase">
            {property.operation === 'venta' ? 'Venta' : 'Alquiler'}
          </span>
        </div>
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              {(property.priceOnRequest || property.price == null || property.price === 0) ? (
                <p className="font-outfit font-semibold text-secondary text-sm">Consultar precio</p>
              ) : (
                <p className="font-outfit font-bold text-primary text-base">{formatPrice(property.price, property.currency)}</p>
              )}
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

const OPERATION_OPTS = [
  { value: 'venta', label: 'Venta' },
  { value: 'alquiler', label: 'Alquiler' },
];

const TYPE_OPTS = [
  { value: '', label: 'Todos los tipos' },
  { value: 'casa', label: 'Casa' },
  { value: 'departamento', label: 'Departamento' },
  { value: 'ph', label: 'PH' },
  { value: 'terreno', label: 'Terreno' },
  { value: 'local', label: 'Local' },
];

function QuickSearch() {
  const router = useRouter();
  const [operation, setOperation] = useState('');
  const [type, setType] = useState('');

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (operation) params.set('operation', operation);
    if (type) params.set('type', type);
    router.push(`/propiedades${params.toString() ? `?${params}` : ''}`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 px-6 py-5 3xl:px-7 3xl:py-6">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 3xl:gap-4">
          {/* Operación — pills */}
          <div className="flex gap-2">
            {OPERATION_OPTS.map(opt => (
              <button
                key={opt.value}
                onClick={() => setOperation(operation === opt.value ? '' : opt.value)}
                className={`px-4 py-2 3xl:px-5 3xl:py-2.5 rounded-lg text-sm 3xl:text-base font-medium transition-all duration-200 ${
                  operation === opt.value
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="hidden sm:block w-px h-8 3xl:h-9 bg-gray-200 mx-1" />

          {/* Tipo — select */}
          <Select
            value={type}
            onChange={setType}
            options={TYPE_OPTS}
            className="flex-1"
            buttonClassName="flex items-center justify-between gap-2 w-full px-4 py-2 3xl:px-5 3xl:py-2.5 rounded-lg text-sm 3xl:text-base bg-gray-100 text-gray-700 border-none outline-none cursor-pointer hover:bg-gray-200 transition-colors duration-200 focus:outline-none select-none"
          />

          {/* CTA */}
          <button
            onClick={handleSearch}
            className="group flex items-center justify-center gap-2 px-6 py-2.5 3xl:px-7 3xl:py-3 bg-primary text-white text-sm 3xl:text-base font-semibold rounded-lg hover:bg-primary/90 transition-colors duration-200 whitespace-nowrap shadow-sm cursor-pointer"
          >
            Ver propiedades
            <ArrowRight className="w-4 h-4 3xl:w-5 3xl:h-5 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
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
              <MotionImage
                src="/santa-rosa-opt.webp"
                alt="Santa Rosa, La Pampa"
                fill
                className="object-cover"
                variants={{
                  rest: { scale: 1.4 },
                  hover: { scale: 1.48 },
                }}
                transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] }}
                sizes="(max-width: 1024px) 100vw, 50vw"
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
                <p className="text-white/40 text-xs mt-1.5">Lun–Vie · 9:30–13:00 / 16:30–20:00</p>
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

const MotionImage = motion.create(Image);

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

export default function HomeClient({ featuredProperties }: { featuredProperties: Property[] }) {
  const heroRef = useRef<HTMLElement>(null)
  const shouldReduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const blob1ParallaxY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [0, 20])

  return (
    <div>

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-[100dvh] sm:min-h-[max(100dvh,860px)] flex items-center">
        {/* Background layer — overflow clipped acá para que los blobs no se filtren. bg-[#04122e] queda como fallback de seguridad, no como capa activa: la foto cubre inset-0 (todo el alto real de la sección), ya que con los crops art-directed (mobile 9:16 vs desktop panorámica) el zoom extra por contenido alto ya no es un problema de nitidez */}
        <div className="absolute inset-0 overflow-hidden bg-[#04122e]">
          {/* Dos crops distintos (art direction): el original es panorámico (1.5:1) y forzaba un zoom de ~3x contra un viewport portrait — se veía borrosa sin importar la resolución. portada-4x-mobile.webp es un recorte 9:16 pre-cropeado del mismo original. Switch por orientación (no por ancho): una tablet en portrait tiene el mismo problema de aspect ratio que un celular, así que también usa el crop mobile; landscape (tablet o desktop) usa la panorámica completa */}
          <Image src="/assets/portada-4x-mobile.webp" alt="" fill priority quality={90} className="object-cover object-center landscape:hidden" sizes="100vw" style={{ filter: 'contrast(1.15) saturate(1.1)' }} />
          <Image src="/assets/portada-4x.webp" alt="" fill priority quality={90} className="hidden landscape:block object-cover object-center" sizes="100vw" style={{ filter: 'contrast(1.15) saturate(1.1)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(4,18,46,0.75) 0%, rgba(5,16,61,0.70) 35%, rgba(6,18,64,0.50) 58%, rgba(2,11,40,0.35) 78%, rgba(2,11,40,0.28) 100%)' }} />
          <motion.div
            className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 w-[700px] h-[700px] rounded-full blur-[120px] pointer-events-none"
            style={{ background: 'rgba(1,143,51,0.18)', y: blob1ParallaxY, willChange: 'transform' }}
            animate={shouldReduceMotion ? undefined : { scale: [1, 1.12, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full blur-[80px] pointer-events-none"
            style={{ background: 'rgba(1,4,25,0.70)', willChange: 'transform' }}
            animate={shouldReduceMotion ? undefined : { x: [0, 15, 0], y: [0, -10, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute top-1/3 left-1/3 w-72 h-72 rounded-full blur-[80px] pointer-events-none"
            style={{ background: 'rgba(1,143,51,0.10)', willChange: 'transform' }}
            animate={shouldReduceMotion ? undefined : { scale: [1, 1.08, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-28 w-full" style={{ paddingBottom: 'calc(8rem + env(safe-area-inset-bottom, 0px))' }}>
          <div className="grid grid-cols-1 gap-8 items-center">

            {/* Copy — FM orchestrated entrance */}
            <motion.div
              className="max-w-3xl 3xl:max-w-4xl"
              variants={heroCopyVariants}
              initial={shouldReduceMotion ? false : 'hidden'}
              animate="visible"
            >
              {/* H1 — word by word stagger */}
              <motion.h1
                variants={heroH1Variants}
                className="font-outfit text-5xl md:text-6xl lg:text-7xl 3xl:text-8xl font-bold text-white leading-[1.05] mb-6"
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
                className="text-gray-400 text-lg 3xl:text-xl mb-6 md:mb-10 max-w-md 3xl:max-w-lg leading-relaxed"
              >
                Más de 20 años acompañando familias e inversores en Santa Rosa. Comprá, vendé o alquilá con confianza.
              </motion.p>

              {/* Buttons */}
              <motion.div
                variants={heroItemVariants}
                className="flex flex-col sm:flex-row gap-3"
              >
                <a
                  href="https://wa.me/542954272138"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex justify-center items-center gap-2 px-5 py-3.5 md:px-7 md:py-4 3xl:px-8 3xl:py-5 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 text-sm md:text-base 3xl:text-lg shadow-lg shadow-primary/30"
                >
                  <WhatsAppIcon className="w-5 h-5 3xl:w-6 3xl:h-6" />
                  WhatsApp
                </a>
                <Link
                  href="/propiedades"
                  className="group inline-flex justify-center items-center gap-2 px-5 py-3.5 md:px-7 md:py-4 3xl:px-8 3xl:py-5 bg-white/[0.06] border border-white/20 text-white font-semibold rounded-xl hover:bg-white/15 hover:border-white/40 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 text-sm md:text-base 3xl:text-lg backdrop-blur-sm"
                >
                  Explorar
                  <ArrowRight className="w-4 h-4 3xl:w-5 3xl:h-5 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
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
                <div className="px-3 py-3 md:px-6 md:py-5 3xl:px-7 3xl:py-6">
                  <div className="font-outfit text-xl md:text-3xl 3xl:text-4xl font-bold text-white"><CountUp to={20} suffix="+" /></div>
                  <div className="text-[10px] md:text-xs 3xl:text-sm text-gray-500 mt-0.5 leading-tight">Años de<br className="md:hidden" /> experiencia</div>
                </div>
                <div className="px-3 py-3 md:px-6 md:py-5 3xl:px-7 3xl:py-6" style={{ borderLeft: '1px solid rgba(255,255,255,0.06)', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="font-outfit text-xl md:text-3xl 3xl:text-4xl font-bold text-white"><CountUp to={500} suffix="+" /></div>
                  <div className="text-[10px] md:text-xs 3xl:text-sm text-gray-500 mt-0.5 leading-tight">Operaciones<br className="md:hidden" /> realizadas</div>
                </div>
                <div className="px-3 py-3 md:px-6 md:py-5 3xl:px-7 3xl:py-6">
                  <div className="font-outfit text-xl md:text-3xl 3xl:text-4xl font-bold text-white"><CountUp to={7} suffix="K+" /></div>
                  <div className="text-[10px] md:text-xs 3xl:text-sm text-gray-500 mt-0.5 leading-tight">Seguidores<br className="md:hidden" /> Instagram</div>
                </div>
              </motion.div>

              {/* Mobile: buscador en flujo, debajo de stats */}
              <div className="mt-6 sm:hidden">
                <QuickSearch />
              </div>
            </motion.div>

          </div>
        </div>

        {/* Desktop: buscador absoluto solapando borde inferior del hero */}
        <div className="hidden sm:block absolute bottom-14 3xl:bottom-16 left-0 right-0 z-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl 3xl:max-w-4xl mx-auto">
            <QuickSearch />
          </div>
        </div>

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
            {featuredProperties[0] && (
              <AnimateIn className="md:row-span-2 h-full">
                <FeaturedCard property={featuredProperties[0]} />
              </AnimateIn>
            )}

            {/* Medium cards — top row */}
            {featuredProperties[1] && (
              <AnimateIn delay={100}>
                <MediumCard property={featuredProperties[1]} />
              </AnimateIn>
            )}
            {featuredProperties[2] && (
              <AnimateIn delay={180}>
                <MediumCard property={featuredProperties[2]} />
              </AnimateIn>
            )}

            {/* Horizontal card */}
            {featuredProperties[3] && (
              <AnimateIn delay={120}>
                <HorizontalCard property={featuredProperties[3]} />
              </AnimateIn>
            )}

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
                    className="relative overflow-hidden p-6 rounded-2xl border h-full cursor-default"
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
                    {/* Número decorativo de paso */}
                    <motion.span
                      variants={{ rest: { opacity: 0.07 }, hover: { opacity: 0.14 } }}
                      transition={{ duration: 0.3 }}
                      className="absolute -top-4 -right-2 font-outfit font-bold leading-none select-none pointer-events-none text-secondary"
                      style={{ fontSize: '7.5rem' }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </motion.span>

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

