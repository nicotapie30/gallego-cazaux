"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { MapPin, Phone, Mail, Send, Clock } from '@/lib/icons';
import { SiInstagram } from '@/lib/icons/brands';

const TOPICS = [
  { value: 'compra',   label: 'Compra' },
  { value: 'venta',    label: 'Venta' },
  { value: 'alquiler', label: 'Alquiler' },
  { value: 'tasacion', label: 'Tasación' },
  { value: 'consulta', label: 'Consulta general' },
];

const CONTACT_ITEMS = [
  {
    icon: MapPin,
    label: 'Dirección',
    value: 'Pellegrini 594, Santa Rosa, La Pampa',
    href: 'https://maps.google.com/?q=Pellegrini+594+Santa+Rosa+La+Pampa',
  },
  {
    icon: Phone,
    label: 'Teléfono',
    value: '(2954) 272138',
    href: 'tel:2954272138',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'info@gallegocazaux.com',
    href: 'mailto:info@gallegocazaux.com',
  },
];

function WhatsAppIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={`${className} shrink-0`} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.162-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.493.099-.198.05-.371-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const INPUT_CLASS =
  'w-full px-4 py-2.5 border border-border rounded-lg text-gray text-sm bg-white ' +
  'focus:outline-none focus:border-primary transition-colors duration-150 placeholder:text-muted';

export default function ContactoClient() {
  const [topic, setTopic] = useState('consulta');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, topic }),
      });
      if (res.ok) {
        toast.success('¡Mensaje enviado!', { description: 'Te respondemos en menos de 24 horas.' });
        setFormData({ name: '', email: '', phone: '', message: '' });
        setTopic('consulta');
      } else {
        toast.error('No se pudo enviar', { description: 'Intentá de nuevo o escribinos por WhatsApp.' });
      }
    } catch {
      toast.error('No se pudo enviar', { description: 'Intentá de nuevo o escribinos por WhatsApp.' });
    } finally {
      setLoading(false);
    }
  };

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
            <span className="text-white/70">Contacto</span>
          </div>
          <h1 className="font-outfit text-4xl md:text-5xl font-bold text-white mb-3">
            Contacto
          </h1>
          <p className="text-white/55 text-lg">
            Estamos para ayudarte. Escribinos o llamanos.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">

          {/* Left: dark info card */}
          <div className="lg:col-span-2 h-full">
            <div className="bg-secondary rounded-2xl overflow-hidden relative h-full">
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                }}
              />
              <div className="relative p-5 md:p-8 flex flex-col gap-6 md:gap-7">

                {/* Trust signal */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/15 border border-primary/25 text-primary text-xs font-medium self-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  Respondemos en menos de 24hs
                </div>

                {/* WhatsApp CTA */}
                <a
                  href="https://wa.me/542954272138?text=Hola%2C%20me%20gustar%C3%ADa%20hacer%20una%20consulta."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 w-full px-5 py-3.5 bg-primary text-white font-semibold text-sm rounded-xl hover:bg-primary/90 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:shadow-sm transition-all duration-200"
                >
                  <WhatsAppIcon />
                  Escribinos por WhatsApp
                </a>

                {/* Divider */}
                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-white/10" />
                  <span className="text-white/30 text-xs">o contactanos por</span>
                  <div className="h-px flex-1 bg-white/10" />
                </div>

                {/* Contact items */}
                <div className="space-y-1">
                  {CONTACT_ITEMS.map(({ icon: Icon, label, value, href }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start gap-3.5 p-3 rounded-xl hover:bg-white/5 transition-colors duration-150"
                    >
                      <div className="w-9 h-9 rounded-lg bg-white/8 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors duration-150">
                        <Icon className="w-4 h-4 text-white/50 group-hover:text-primary transition-colors duration-150" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-white/35 text-xs mb-0.5">{label}</p>
                        <p className="text-white/80 text-sm font-medium group-hover:text-white transition-colors duration-150 truncate">
                          {value}
                        </p>
                      </div>
                    </a>
                  ))}

                  <a
                    href="https://www.instagram.com/gallegocazauxnegocios/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-3.5 p-3 rounded-xl hover:bg-white/5 transition-colors duration-150"
                  >
                    <div className="w-9 h-9 rounded-lg bg-white/8 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors duration-150">
                      <SiInstagram className="w-4 h-4 text-white/50 group-hover:text-primary transition-colors duration-150" />
                    </div>
                    <div>
                      <p className="text-white/35 text-xs mb-0.5">Instagram</p>
                      <p className="text-white/80 text-sm font-medium group-hover:text-white transition-colors duration-150">
                        @gallegocazauxnegocios
                      </p>
                    </div>
                  </a>

                  <div className="flex items-start gap-3.5 p-3">
                    <div className="w-9 h-9 rounded-lg bg-white/8 flex items-center justify-center shrink-0">
                      <Clock className="w-4 h-4 text-white/50" />
                    </div>
                    <div>
                      <p className="text-white/35 text-xs mb-0.5">Horario de atención</p>
                      <p className="text-white/80 text-sm font-medium">Lunes a Viernes</p>
                      <p className="text-white/50 text-xs">9:30–13:00 / 16:30–20:00 hs</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Right: form card */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl border border-border overflow-hidden">
              <div className="p-5 md:p-8">
                    <h2 className="font-outfit text-xl font-semibold text-secondary mb-1">
                      Envianos un mensaje
                    </h2>
                    <p className="text-muted text-sm mb-7">
                      Completá el formulario y te respondemos a la brevedad.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-5">

                      {/* Topic selector */}
                      <div>
                        <p className="block text-sm font-medium text-gray mb-2">Motivo de consulta</p>
                        <div className="flex flex-wrap gap-2">
                          {TOPICS.map(t => (
                            <button
                              key={t.value}
                              type="button"
                              onClick={() => setTopic(t.value)}
                              className={`px-4 py-1.5 rounded-lg text-sm font-medium cursor-pointer transition-all duration-150 ${
                                topic === t.value
                                  ? 'bg-secondary text-white'
                                  : 'text-gray border border-border bg-white hover:border-secondary/40 hover:text-secondary'
                              }`}
                            >
                              {t.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Name */}
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray mb-1.5">
                          Nombre completo *
                        </label>
                        <input
                          type="text"
                          id="name"
                          required
                          value={formData.name}
                          onChange={e => setFormData({ ...formData, name: e.target.value })}
                          className={INPUT_CLASS}
                          placeholder="Tu nombre"
                        />
                      </div>

                      {/* Email + Phone */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray mb-1.5">
                            Email *
                          </label>
                          <input
                            type="email"
                            id="email"
                            required
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                            className={INPUT_CLASS}
                            placeholder="tu@email.com"
                          />
                        </div>
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray mb-1.5">
                            Teléfono
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            value={formData.phone}
                            onChange={e => setFormData({ ...formData, phone: e.target.value })}
                            className={INPUT_CLASS}
                            placeholder="(2954) xxx xxx"
                          />
                        </div>
                      </div>

                      {/* Message */}
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray mb-1.5">
                          Mensaje *
                        </label>
                        <textarea
                          id="message"
                          required
                          rows={5}
                          value={formData.message}
                          onChange={e => setFormData({ ...formData, message: e.target.value })}
                          className={`${INPUT_CLASS} resize-none`}
                          placeholder="¿En qué podemos ayudarte?"
                        />
                      </div>

                      {/* Submit */}
                      <motion.button
                        type="submit"
                        disabled={loading}
                        className="group w-full flex items-center justify-center gap-2 px-4 py-3 bg-secondary text-white font-semibold text-sm rounded-xl hover:bg-secondary/90 transition-colors disabled:opacity-60 cursor-pointer"
                        whileTap={{ scale: 0.98 }}
                      >
                        {loading ? (
                          <>
                            <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            Enviando...
                          </>
                        ) : (
                          <>
                            Enviar mensaje
                            <Send className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </>
                        )}
                      </motion.button>

                    </form>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Mapa */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="rounded-2xl overflow-hidden border border-border flex flex-col">
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
          <div className="min-h-[460px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3196.0!2d-64.2895!3d-36.6167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sPellegrini+594%2C+Santa+Rosa%2C+La+Pampa!5e0!3m2!1ses!2sar!4v1"
              width="100%"
              height="100%"
              style={{ border: 0, display: 'block', minHeight: '460px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación Gallego Cazaux"
            />
          </div>
        </div>
      </div>

    </div>
  );
}
