'use client'

import { useState, useEffect } from 'react'
import { Star } from '@/lib/icons'
import GoogleLogo from './GoogleLogo'

/** Ficha del negocio en Google Maps, con el panel de reseñas abierto (!1b1). */
const GOOGLE_MAPS_URL =
  'https://www.google.com/maps/place/Gallego+Cazaux+Negocios+Inmobiliarios/@-36.6229446,-64.2952316,17z/data=!4m8!3m7!1s0x95c2cde83e3b00dd:0xa0731a4c91397b24!8m2!3d-36.6229489!4d-64.2926567!9m1!1b1!16s%2Fg%2F11gmfknbk0'

/** Snapshot manual del 6/8/2026. No hay API detrás: la Places API de Google
 *  restringe cachear el contenido de las reseñas, y para cuatro citas que
 *  cambian una vez por año no se justifica la dependencia. Al actualizarlas,
 *  actualizar también RATING y REVIEW_COUNT. */
const RATING = '5,0'
const REVIEW_COUNT = 43

/** Reseñas reales de la ficha de Google Maps. Nombre + inicial del apellido:
 *  en Maps son públicos, pero es dato personal de terceros.
 *
 *  Transcritas sin corregir ortografía ni reescribir. De Solange, Sabino y
 *  Javi se tomó un fragmento contiguo del original; en Sabino se normalizaron
 *  además los `..` a comas. Si se agregan nuevas, respetar el criterio: el
 *  problema que esto vino a resolver es que las anteriores eran inventadas.
 *
 *  Mantenerlas entre 15 y 25 palabras. Las cuatro se apilan en la misma celda
 *  y la card mide siempre lo de la más larga, así que una cita el doble de
 *  larga que el resto deja un hueco visible cuando rotan las cortas — y a
 *  320px de ancho desborda. */
const testimonials = [
  {
    quote: 'Fui propietaria e inquilina, en ambas situaciones demostraron verdadero compromiso, respeto e interés. ¡Gracias, Ana!',
    name: 'Solange D.',
    initials: 'SD',
  },
  {
    quote: 'Excelente lugar! La atención y dedicación es de primera. Estoy muy agradecida de la predisposición tanto de Ana como de Nati. Totalmente recomendable.',
    name: 'Elena G.',
    initials: 'EG',
  },
  {
    quote: '…nos encontramos con Ana y Naty, con quienes hicimos un negocio brindándonos todo su conocimiento y confiabilidad, de la cual quedamos más que satisfechos.',
    name: 'Sabino N.',
    initials: 'SN',
  },
  {
    quote: 'Personas super amables, profesionales y siempre la mejor atención. Llegamos y nos facilitaron todo. No duden en contactarlos!',
    name: 'Javi M.',
    initials: 'JM',
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

  return (
    <div
      // p-6 hasta sm: con p-8 fijo el padding se come 64px del ancho y en los
      // celulares más angostos el badge no entra
      className="rounded-2xl p-6 sm:p-8"
      style={{
        background: 'rgba(255,255,255,0.08)',
        border: '1px solid rgba(255,255,255,0.15)',
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* La calificación es el activo más fuerte y es verificable: el badge
          linkea a la ficha para que cualquiera lo confirme.
          min-h-[44px] por touch target, no por diseño.
          Hasta 380px se centra: alineado a la izquierda deja un hueco a la
          derecha que se lee como error de maquetado. Necesita `flex w-fit`,
          con `inline-flex` el mx-auto no centra nada.
          Nada de `max-w-full` acá: el contenido es nowrap y no puede achicarse,
          así que capar el ancho no encoge el pill — hace que el texto se salga
          del fondo redondeado. El pill tiene que medir lo que mide su contenido. */}
      <a
        href={GOOGLE_MAPS_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${RATING} de 5 estrellas en ${REVIEW_COUNT} reseñas de Google. Abre la ficha en Google Maps`}
        className="flex w-fit items-center gap-2.5 min-h-[44px] mb-6 mx-auto min-[370px]:mx-0 pl-3 pr-4 rounded-full border border-white/15 bg-white/10 hover:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
      >
        <GoogleLogo className="w-4 h-4 shrink-0" />
        <span className="text-white font-semibold text-sm leading-none">{RATING}</span>
        {/* Medido en el DOM: el pill mide 222,5px y el ancho disponible es
            (viewport − 128) de padding acumulado — 32 de la section, 48 del
            wrapper `grain` y 48 de esta card. O sea que entra recién a partir
            de 350px de viewport; abajo de eso desborda y lo corta el
            overflow-hidden del `grain`.
            Se ocultan las estrellas y no el número: ocupan 64px contra 61, son
            decorativas (repiten el "5,0") y la cantidad de reseñas es el dato
            que no está en ningún otro lado. Sigue en el aria-label. */}
        <span className="hidden min-[370px]:flex items-center gap-px" aria-hidden="true">
          {Array.from({ length: 5 }, (_, i) => (
            <Star key={i} className="w-3 h-3 fill-[#FBBC04] stroke-[#FBBC04]" />
          ))}
        </span>
        {/* nowrap: sin esto "43 reseñas" parte en dos líneas en los anchos más
            angostos y el pill deja de leerse como una sola pieza */}
        <span className="text-white/60 text-xs leading-none whitespace-nowrap">{REVIEW_COUNT} reseñas</span>
      </a>

      {/* Los testimonios apilados en la misma celda: la caja mide siempre lo
          del más largo. Si se renderizara solo el activo, la altura saltaría
          40px en cada rotación según cuántas líneas ocupe la cita. */}
      <div className="grid">
        {testimonials.map((t, i) => {
          const isActive = i === index && visible
          return (
            <div
              key={t.name}
              className="col-start-1 row-start-1 flex flex-col"
              aria-hidden={i !== index}
              style={{
                opacity: isActive ? 1 : 0,
                transform: isActive ? 'translateY(0)' : 'translateY(8px)',
                transition: 'opacity 0.35s ease, transform 0.35s ease',
                pointerEvents: i === index ? 'auto' : 'none',
              }}
            >
              <div className="text-white/25 text-6xl font-serif leading-none mb-4" aria-hidden="true">&ldquo;</div>
              <p className="text-white text-lg leading-relaxed mb-6">{t.quote}</p>
              {/* mt-auto: el bloque del autor queda pegado abajo, así el
                  divisor no salta entre citas de distinto largo.
                  truncate + min-w-0: nombre y detalle siempre en una línea, así
                  el bloque mide igual en cualquier ancho. Si wrapean, el divisor
                  se mueve hasta 20px al rotar (pasaba a 320 y 360px). */}
              <div className="flex items-center gap-4 pt-6 mt-auto" style={{ borderTop: '1px solid rgba(255,255,255,0.12)' }}>
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center font-outfit font-bold text-white text-sm shrink-0"
                  style={{ background: 'rgba(255,255,255,0.15)' }}
                >
                  {t.initials}
                </div>
                <div className="min-w-0">
                  <p className="text-white font-semibold text-sm truncate">{t.name}</p>
                  <p className="text-white/50 text-xs mt-0.5 truncate">Reseña de Google</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Dots */}
      <div className="flex items-center mt-6 justify-end">
        {testimonials.map((_, i) => (
          // El punto mide 6px, pero el botón se estira a 44px de alto para que
          // sea tocable en mobile sin cambiar el diseño
          <button
            key={i}
            onClick={() => { setVisible(false); setTimeout(() => { setIndex(i); setVisible(true) }, 350) }}
            className="flex items-center justify-center h-11 px-1 -my-3 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded-full"
            aria-label={`Testimonio ${i + 1}`}
            aria-current={i === index}
          >
            <span
              className="block rounded-full transition-all duration-300"
              style={{
                width: i === index ? '20px' : '6px',
                height: '6px',
                background: i === index ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.25)',
              }}
            />
          </button>
        ))}
      </div>
    </div>
  )
}
