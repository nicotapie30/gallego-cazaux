import Link from 'next/link';

/** Encabezado propio de cada landing (ciudad, tipo, operación) */
export type PropiedadesHeading = { title: string; subtitle: string; crumb: string };

/**
 * Server Component a propósito: el listado vive dentro de un <Suspense> con
 * useSearchParams, así que Next prerenderiza solo el fallback y nada de eso
 * llega al HTML. Manteniendo el encabezado acá, cada landing conserva su H1 y
 * su copy en el HTML estático en vez de compartir uno genérico pintado por JS.
 */
export default function PropiedadesHeader({ heading }: { heading?: PropiedadesHeading }) {
  return (
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
          {heading ? (
            <>
              <Link href="/propiedades" className="hover:text-white/80 transition-colors">Propiedades</Link>
              <span>/</span>
              <span className="text-white/70">{heading.crumb}</span>
            </>
          ) : (
            <span className="text-white/70">Propiedades</span>
          )}
        </div>
        <h1 className="font-outfit text-4xl md:text-5xl font-bold text-white mb-3">
          {heading?.title ?? 'Nuestras Propiedades'}
        </h1>
        <p className="text-white/55 text-lg">
          {heading?.subtitle ?? 'Encontrá tu próximo hogar en Santa Rosa y La Pampa'}
        </p>
      </div>
    </div>
  );
}
