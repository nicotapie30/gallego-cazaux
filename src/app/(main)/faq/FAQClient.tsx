"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Send, Home, Users, Trophy } from '@/lib/icons';
import type { FAQ } from '@/lib/types';

const TABS = [
  { value: 'all', label: 'Todas' },
  { value: 'compra', label: 'Compra' },
  { value: 'alquiler', label: 'Alquiler' },
  { value: 'general', label: 'General' },
];

function WhatsAppIcon() {
  return (
    <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.162-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.493.099-.198.05-.371-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function FAQItem({ question, answer, isOpen, onToggle }: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      className="bg-white rounded-xl border overflow-hidden"
      animate={{ borderColor: isOpen ? 'rgba(1,143,51,0.35)' : 'rgba(226,232,240,1)' }}
      transition={{ duration: 0.2 }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer"
        aria-expanded={isOpen}
      >
        <span className={`font-outfit font-semibold text-base leading-snug transition-colors duration-200 ${isOpen ? 'text-primary' : 'text-secondary'}`}>
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25, ease: [0, 0, 0.2, 1] }}
          className="shrink-0"
        >
          <ChevronDown className={`w-5 h-5 transition-colors duration-200 ${isOpen ? 'text-primary' : 'text-muted'}`} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0, 0, 0.2, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div className="px-6 pb-5 text-gray text-sm leading-relaxed border-t border-border pt-4">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

const stats = [
  { icon: Home,   value: '500+', label: 'Operaciones realizadas' },
  { icon: Users,  value: '24hs', label: 'Tiempo de respuesta' },
  { icon: Trophy, value: '20+',  label: 'Años de trayectoria' },
];

export default function FAQClient({ faqs }: { faqs: FAQ[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeTab, setActiveTab] = useState('all');

  const counts: Record<string, number> = {
    all:      faqs.length,
    compra:   faqs.filter(f => f.category === 'compra').length,
    alquiler: faqs.filter(f => f.category === 'alquiler').length,
    general:  faqs.filter(f => f.category === 'general').length,
  };

  const filtered = activeTab === 'all' ? faqs : faqs.filter(f => f.category === activeTab);

  const toggle = (index: number) => setOpenIndex(prev => prev === index ? null : index);

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
            <span className="text-white/70">Preguntas frecuentes</span>
          </div>
          <h1 className="font-outfit text-4xl md:text-5xl font-bold text-white mb-3">
            Preguntas frecuentes
          </h1>
          <p className="text-white/55 text-lg">
            Respondemos las dudas más comunes sobre operaciones inmobiliarias
          </p>
        </div>
      </div>

      {/* Stats strip */}
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 divide-x divide-border">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex flex-col items-center justify-center gap-2 py-6 text-center">
                <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-outfit font-bold text-secondary text-2xl leading-none mb-0.5">{value}</p>
                  <p className="text-muted text-xs">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(1,143,51,0.14) 1.5px, transparent 1.5px)',
            backgroundSize: '28px 28px',
            opacity: 0.45,
          }}
        />

        {/* Category tabs */}
        <div className="relative flex gap-2 flex-wrap mb-8">
          {TABS.map(tab => {
            const isActive = activeTab === tab.value;
            return (
              <motion.button
                key={tab.value}
                onClick={() => { setActiveTab(tab.value); setOpenIndex(null); }}
                className={`relative flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium cursor-pointer ${
                  isActive ? 'text-white' : 'text-gray bg-white border border-border'
                }`}
                whileHover={isActive ? {} : { y: -2, boxShadow: '0 4px 12px rgba(1,143,51,0.12)', borderColor: 'rgba(1,143,51,0.4)', color: '#018f33' }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.18, ease: [0, 0, 0.2, 1] }}
              >
                {isActive && (
                  <motion.div
                    layoutId="faq-tab"
                    className="absolute inset-0 bg-primary rounded-lg"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative">{tab.label}</span>
                <span className={`relative text-xs font-semibold px-1.5 py-0.5 rounded-full ${
                  isActive ? 'bg-white/20 text-white' : 'bg-background-alt text-muted'
                }`}>
                  {counts[tab.value]}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* FAQ list */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0, 0, 0.2, 1] }}
            className="relative space-y-3"
          >
            {filtered.map((faq, index) => (
              <FAQItem
                key={faq.question}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onToggle={() => toggle(index)}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* CTA */}
        <div className="mt-10 p-8 bg-white rounded-xl border border-border text-center">
          <h3 className="font-outfit font-semibold text-secondary text-lg mb-2">
            ¿Tenés otra pregunta?
          </h3>
          <p className="text-muted text-sm mb-6">
            No dudes en contactarnos. Estamos para ayudarte.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="https://wa.me/542954272138?text=Hola%2C%20tengo%20una%20consulta."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:shadow-sm transition-all duration-200"
            >
              <WhatsAppIcon />
              WhatsApp
            </a>
            <Link
              href="/contacto"
              className="group w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 border border-border bg-white text-gray text-sm font-medium rounded-lg hover:border-primary hover:text-primary hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"
            >
              <Send className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              Formulario de contacto
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
