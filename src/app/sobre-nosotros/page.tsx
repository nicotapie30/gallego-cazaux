"use client";

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useInView, animate } from 'framer-motion';
import { MapPin, Phone, Mail, Trophy, Users, Home, Star } from '@/lib/icons';
import { SiInstagram } from '@/lib/icons/brands';
import { AnimateIn } from '@/components/AnimateIn';

function CountUp({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, to, {
      duration: 1.8,
      ease: 'easeOut',
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return controls.stop;
  }, [isInView, to]);

  return <span ref={ref}>{value}{suffix}</span>;
}

const stats = [
  { icon: Trophy, value: 20,  suffix: '+',  label: 'Años de trayectoria' },
  { icon: Home,   value: 500, suffix: '+',  label: 'Operaciones realizadas' },
  { icon: Users,  value: 7,   suffix: 'K+', label: 'Seguidores en Instagram' },
  { icon: Star,   value: 24,  suffix: 'hs', label: 'Tiempo de respuesta' },
];

const team = [
  { name: 'Carlos Gallego',   role: 'Fundador & Director',           image: 'https://picsum.photos/seed/man1/400/500' },
  { name: 'María Cazaux',     role: 'Socia Directora',               image: 'https://picsum.photos/seed/woman1/400/500' },
  { name: 'Lucas Fernández',  role: 'Agente Inmobiliario',           image: 'https://picsum.photos/seed/man2/400/500' },
  { name: 'Sofía Morales',    role: 'Administración & Alquileres',   image: 'https://picsum.photos/seed/woman2/400/500' },
];

const values = [
  {
    number: '01',
    title: 'Honestidad',
    description: 'Transparencia en cada operación. Te decimos la verdad siempre, aunque no sea lo que querés escuchar. Es la base de cada relación que construimos.',
  },
  {
    number: '02',
    title: 'Compromiso',
    description: 'Tu problema es nuestro problema. Te acompañamos en cada paso del proceso, desde la primera consulta hasta el cierre de la operación.',
  },
  {
    number: '03',
    title: 'Profesionalismo',
    description: 'Formación constante y conocimiento profundo del mercado local. Sabemos lo que vale cada metro cuadrado en Santa Rosa y La Pampa.',
  },
];

export default function SobreNosotrosPage() {
  return (
    <div className="min-h-screen bg-background-alt">

      {/* Header */}
      <div className="bg-secondary relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="flex items-center gap-2 text-white/40 text-sm mb-4">
            <Link href="/" className="hover:text-white/80 transition-colors">Inicio</Link>
            <span>/</span>
            <span className="text-white/70">Nosotros</span>
          </div>
          <h1 className="font-outfit text-4xl md:text-5xl font-bold text-white mb-3">
            Quiénes somos
          </h1>
          <p className="text-white/55 text-lg">
            Más de 20 años acompañando familias e inversores en La Pampa
          </p>
        </div>
      </div>

      {/* Historia */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Image */}
            <AnimateIn direction="left">
              <motion.div
                className="relative rounded-3xl overflow-hidden"
                style={{ height: 'clamp(320px, 70vw, 600px)' }}
                initial="rest"
                whileHover="hover"
                animate="rest"
              >
                <motion.img
                  src="/assets/gallegocazaux-local.webp"
                  alt="Oficina Gallego Cazaux"
                  className="w-full h-full object-cover object-top"
                  variants={{ rest: { scale: 1.05 }, hover: { scale: 1.1 } }}
                  transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] }}
                />
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'linear-gradient(to top, rgba(1,143,51,0.15), rgba(1,143,51,0.02))' }}
                  variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
                  transition={{ duration: 0.4 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 via-transparent to-transparent" />
                <div
                  className="absolute bottom-6 left-6 right-6 rounded-2xl p-4"
                  style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.12)' }}
                >
                  <p className="text-white/50 text-xs uppercase tracking-widest mb-0.5">Pellegrini 594 · Santa Rosa</p>
                  <p className="text-white font-outfit font-bold text-base">Abriendo puertas desde 2003</p>
                </div>
              </motion.div>
            </AnimateIn>

            {/* Copy */}
            <AnimateIn direction="right">
              <p className="text-primary font-medium text-sm uppercase tracking-widest mb-4">Nuestra historia</p>
              <h2 className="font-outfit text-3xl md:text-4xl font-bold text-secondary leading-tight mb-6 text-balance">
                Una empresa familiar con raíces en La Pampa.
              </h2>
              <div className="space-y-4 text-gray text-base leading-relaxed">
                <p>
                  Gallego Cazaux Negocios Inmobiliarios nació en 2003 como un proyecto familiar con una convicción simple: que el mercado inmobiliario de Santa Rosa merecía una inmobiliaria que priorizara las personas por encima de las comisiones.
                </p>
                <p>
                  Dos décadas después, seguimos siendo la misma empresa de siempre — pero con más experiencia, más red de contactos y más herramientas para ayudarte a tomar la mejor decisión de tu vida.
                </p>
                <p>
                  Cada operación que cerramos lleva el nombre de una familia que confió en nosotros. Eso es lo que nos mueve.
                </p>
              </div>
            </AnimateIn>

          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-secondary relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="grid grid-cols-2 md:grid-cols-4 rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              backdropFilter: 'blur(12px)',
            }}
          >
            {stats.map(({ icon: Icon, value, suffix, label }, i) => (
              <motion.div
                key={label}
                className={`relative overflow-hidden flex flex-col items-center justify-center gap-3 px-4 py-8 md:px-6 md:py-10 cursor-default ${[
                  '',
                  'border-l',
                  'border-t md:border-t-0 md:border-l',
                  'border-l border-t md:border-t-0',
                ][i]}`}
                style={{ borderColor: 'rgba(255,255,255,0.06)' }}
                initial="rest"
                whileHover="hover"
                animate="rest"
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                {/* Radial glow — bottom center expanding up */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'radial-gradient(ellipse 120% 80% at 50% 130%, rgba(255,255,255,0.08) 0%, transparent 70%)' }}
                  variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />
                <motion.div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  variants={{
                    rest: { boxShadow: '0 0 0px 0px rgba(1,143,51,0)', background: 'rgba(1,143,51,0.25)', border: '1px solid rgba(1,143,51,0.3)' },
                    hover: { boxShadow: '0 0 18px 3px rgba(1,143,51,0.3)', background: 'rgba(1,143,51,0.45)', border: '1px solid rgba(255,255,255,0.2)' },
                  }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                >
                  <Icon className="w-5 h-5 text-primary" />
                </motion.div>
                <div className="text-center">
                  <p className="font-outfit font-bold text-white text-3xl leading-none mb-1">
                    <CountUp to={value} suffix={suffix} />
                  </p>
                  <motion.p
                    className="text-xs"
                    variants={{
                      rest: { color: 'rgba(255,255,255,0.45)' },
                      hover: { color: 'rgba(255,255,255,0.8)' },
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {label}
                  </motion.p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipo */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn className="text-center mb-14">
            <p className="text-primary font-medium text-sm uppercase tracking-widest mb-3">El equipo</p>
            <h2 className="font-outfit text-4xl font-bold text-secondary">
              Las personas detrás<br />de cada operación
            </h2>
          </AnimateIn>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <AnimateIn key={member.name} delay={i * 80}>
                <motion.div
                  className="group"
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                >
                  {/* Photo */}
                  <motion.div
                    className="relative rounded-2xl overflow-hidden mb-4"
                    style={{ aspectRatio: '3/4' }}
                    variants={{
                      rest: { boxShadow: '0 2px 8px rgba(0,0,0,0.08)' },
                      hover: { boxShadow: '0 20px 40px rgba(1,143,51,0.15), 0 8px 16px rgba(0,0,0,0.1)' },
                    }}
                    transition={{ duration: 0.28, ease: [0, 0, 0.2, 1] }}
                  >
                    <motion.img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      variants={{ rest: { scale: 1 }, hover: { scale: 1.06 } }}
                      transition={{ duration: 0.4, ease: [0, 0, 0.2, 1] }}
                    />
                    <motion.div
                      className="absolute inset-0"
                      style={{ background: 'linear-gradient(to top, rgba(1,143,51,0.4) 0%, transparent 50%)' }}
                      variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>

                  {/* Info */}
                  <div className="px-1">
                    <motion.h3
                      className="font-outfit font-bold text-secondary text-base leading-tight mb-0.5"
                      variants={{ rest: { color: '#05103d' }, hover: { color: '#018f33' } }}
                      transition={{ duration: 0.2 }}
                    >
                      {member.name}
                    </motion.h3>
                    <p className="text-muted text-sm">{member.role}</p>
                  </div>
                </motion.div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-20 bg-secondary relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn className="mb-14">
            <p className="text-primary font-medium text-sm uppercase tracking-widest mb-3">Lo que nos guía</p>
            <h2 className="font-outfit text-4xl font-bold text-white">Nuestros valores</h2>
          </AnimateIn>

          <div className="space-y-1">
            {values.map((v, i) => (
              <AnimateIn key={v.title} delay={i * 100}>
                <motion.div
                  className="relative flex gap-4 md:gap-10 items-center rounded-2xl px-4 md:px-8 py-6 md:py-10 cursor-default overflow-hidden"
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                  variants={{
                    rest: { backgroundColor: 'rgba(255,255,255,0)' },
                    hover: { backgroundColor: 'rgba(255,255,255,0.05)' },
                  }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                >
                  {/* Left border accent */}
                  <motion.div
                    className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full"
                    variants={{ rest: { backgroundColor: 'rgba(1,143,51,0.2)', scaleY: 0.4, opacity: 0.4 }, hover: { backgroundColor: '#018f33', scaleY: 1, opacity: 1 } }}
                    transition={{ duration: 0.25 }}
                  />

                  {/* Ghost number */}
                  <div className="absolute right-8 top-1/2 -translate-y-1/2 font-outfit font-bold text-[7rem] leading-none select-none pointer-events-none text-white/[0.04] tabular-nums">
                    {v.number}
                  </div>

                  {/* Inline number */}
                  <motion.span
                    className="font-outfit font-bold text-3xl md:text-5xl leading-none shrink-0 w-10 md:w-16 tabular-nums"
                    variants={{ rest: { color: 'rgba(255,255,255,0.12)' }, hover: { color: '#018f33' } }}
                    transition={{ duration: 0.25 }}
                  >
                    {v.number}
                  </motion.span>

                  {/* Content */}
                  <div>
                    <motion.h3
                      className="font-outfit font-bold text-2xl mb-2"
                      variants={{ rest: { color: 'rgba(255,255,255,0.9)' }, hover: { color: '#ffffff' } }}
                      transition={{ duration: 0.25 }}
                    >
                      {v.title}
                    </motion.h3>
                    <p className="text-white/45 text-sm leading-relaxed max-w-lg">{v.description}</p>
                  </div>
                </motion.div>
                {i < values.length - 1 && (
                  <div className="h-px mx-8" style={{ background: 'rgba(255,255,255,0.06)' }} />
                )}
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Ubicación */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn className="mb-8">
            <p className="text-primary font-medium text-sm uppercase tracking-widest mb-3">Dónde encontrarnos</p>
            <h2 className="font-outfit text-4xl font-bold text-secondary">Visitanos</h2>
          </AnimateIn>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Contact info */}
            <div className="lg:col-span-1 space-y-4">
              {[
                { icon: MapPin, label: 'Dirección',  value: 'Pellegrini 594, Santa Rosa, La Pampa', href: 'https://maps.google.com/?q=Pellegrini+594+Santa+Rosa+La+Pampa' },
                { icon: Phone,  label: 'Teléfono',   value: '(2954) 272138',                         href: 'tel:2954272138' },
                { icon: Mail,   label: 'Email',       value: 'info@gallegocazaux.com',                href: 'mailto:info@gallegocazaux.com' },
              ].map(({ icon: Icon, label, value, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-5 rounded-xl border border-border bg-background-alt group"
                  whileHover={{ y: -3, boxShadow: '0 8px 24px rgba(1,143,51,0.1)', borderColor: 'rgba(1,143,51,0.35)' }}
                  transition={{ duration: 0.2, ease: [0, 0, 0.2, 1] }}
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/8 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted uppercase tracking-wide mb-0.5">{label}</p>
                    <p className="text-secondary text-sm font-medium group-hover:text-primary transition-colors duration-200">{value}</p>
                  </div>
                </motion.a>
              ))}

              <motion.a
                href="https://www.instagram.com/gallegocazauxnegocios/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-5 rounded-xl border border-border bg-background-alt group"
                whileHover={{ y: -3, boxShadow: '0 8px 24px rgba(1,143,51,0.1)', borderColor: 'rgba(1,143,51,0.35)' }}
                transition={{ duration: 0.2, ease: [0, 0, 0.2, 1] }}
              >
                <div className="w-9 h-9 rounded-lg bg-primary/8 flex items-center justify-center shrink-0">
                  <SiInstagram className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted uppercase tracking-wide mb-0.5">Instagram</p>
                  <p className="text-secondary text-sm font-medium group-hover:text-primary transition-colors duration-200">@gallegocazauxnegocios</p>
                </div>
              </motion.a>

              <div className="p-5 rounded-xl border border-border bg-background-alt">
                <p className="text-xs text-muted uppercase tracking-wide mb-1">Horario de atención</p>
                <p className="text-secondary text-sm font-medium">Lunes a Viernes</p>
                <p className="text-gray text-sm">9:30–13:00 / 16:30–20:00 hs</p>
              </div>
            </div>

            {/* Map card */}
            <div className="lg:col-span-2 rounded-2xl overflow-hidden border border-border flex flex-col">
              {/* Card header */}
              <div className="flex items-center justify-between gap-4 px-5 py-4 bg-secondary">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'rgba(1,143,51,0.3)', border: '1px solid rgba(1,143,51,0.4)' }}>
                    <MapPin className="w-4 h-4 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-white font-outfit font-semibold text-sm leading-none mb-0.5">Gallego Cazaux</p>
                    <p className="text-white/45 text-xs truncate">Pellegrini 594, Santa Rosa, La Pampa</p>
                  </div>
                </div>
                <a
                  href="https://maps.google.com/?q=Pellegrini+594+Santa+Rosa+La+Pampa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white/70 hover:text-white border border-white/15 hover:border-white/30 transition-colors duration-200 shrink-0"
                >
                  Abrir en Maps
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>

              {/* Map */}
              <div className="flex-1 min-h-[320px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3196.0!2d-64.2895!3d-36.6167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sPellegrini+594%2C+Santa+Rosa%2C+La+Pampa!5e0!3m2!1ses!2sar!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0, display: 'block', minHeight: '320px' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación Gallego Cazaux"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
