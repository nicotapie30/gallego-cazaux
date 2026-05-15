'use client'

import { useState, useEffect } from 'react'

const testimonials = [
  {
    quote: 'Vendimos la casa en menos de un mes. El trato fue excelente, siempre disponibles y muy profesionales. Los recomiendo sin dudarlo.',
    name: 'Marcos Rodríguez',
    detail: 'Venta en Santa Rosa',
    initials: 'MR',
  },
  {
    quote: 'Me ayudaron a encontrar el departamento perfecto para mi hija. Muy pacientes, nunca nos apuraron. Una atención distinta a todo.',
    name: 'Graciela Funes',
    detail: 'Compra en el centro',
    initials: 'GF',
  },
  {
    quote: 'Alquilé mi local a través de ellas y el proceso fue rápido y transparente. Sin sorpresas, sin vueltas. Muy recomendables.',
    name: 'Diego Mansilla',
    detail: 'Alquiler comercial',
    initials: 'DM',
  },
  {
    quote: 'Compramos nuestra primera casa con Gallego Cazaux. Nos explicaron todo, nos acompañaron en cada paso. Fue una experiencia increíble.',
    name: 'Lucía y Tomás Pereyra',
    detail: 'Primera vivienda',
    initials: 'LP',
  },
  {
    quote: 'Ya es la tercera operación que hacemos con ellas. La confianza que generan es única. En Santa Rosa, son las mejores.',
    name: 'Roberto Sánchez',
    detail: 'Inversor inmobiliario',
    initials: 'RS',
  },
]

export function TestimonialCarousel() {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>
    const interval = setInterval(() => {
      setVisible(false)
      timeoutId = setTimeout(() => {
        setIndex(i => (i + 1) % testimonials.length)
        setVisible(true)
      }, 350)
    }, 4500)
    return () => {
      clearInterval(interval)
      clearTimeout(timeoutId)
    }
  }, [])

  const t = testimonials[index]

  return (
    <div
      className="rounded-2xl p-8"
      style={{
        background: 'rgba(255,255,255,0.08)',
        border: '1px solid rgba(255,255,255,0.15)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <div
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(8px)',
          transition: 'opacity 0.35s ease, transform 0.35s ease',
        }}
      >
        <div className="text-white/25 text-6xl font-serif leading-none mb-4">"</div>
        <p className="text-white text-lg leading-relaxed mb-6">{t.quote}</p>
        <div className="flex items-center gap-4 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.12)' }}>
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center font-outfit font-bold text-white text-sm shrink-0"
            style={{ background: 'rgba(255,255,255,0.15)' }}
          >
            {t.initials}
          </div>
          <div>
            <p className="text-white font-semibold text-sm">{t.name}</p>
            <p className="text-white/50 text-xs mt-0.5">Cliente — {t.detail}</p>
          </div>
        </div>
      </div>

      {/* Dots */}
      <div className="flex items-center gap-1.5 mt-6 justify-end">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => { setVisible(false); setTimeout(() => { setIndex(i); setVisible(true) }, 350) }}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === index ? '20px' : '6px',
              height: '6px',
              background: i === index ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.25)',
            }}
            aria-label={`Testimonio ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
