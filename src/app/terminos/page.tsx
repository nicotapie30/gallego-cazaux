import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Términos y Condiciones - Gallego Cazaux',
  description: 'Términos y condiciones de uso del sitio web Gallego Cazaux Negocios Inmobiliarios.',
};

const sections = [
  {
    title: '1. Aceptación de términos',
    content: 'Al acceder y utilizar este sitio web, usted acepta y se compromete a cumplir con los presentes términos y condiciones. Si no está de acuerdo con alguno de estos términos, por favor no utilice este sitio.',
  },
  {
    title: '2. Uso del sitio',
    content: 'Este sitio web tiene carácter meramente informativo y no constituye oferta comercial. Las propiedades mostradas pueden no estar disponibles en el momento de la consulta. Los datos, imágenes y descripciones son orientativos y pueden variar sin previo aviso.',
  },
  {
    title: '3. Propiedad intelectual',
    content: 'Todo el contenido de este sitio, incluyendo pero no limitándose a textos, imágenes, gráficos y logotipos, es propiedad de Gallego Cazaux Negocios Inmobiliarios o sus respectivos titulares. Está prohibida la reproducción, distribución o modificación sin autorización previa y por escrito.',
  },
  {
    title: '4. Limitación de responsabilidad',
    content: 'Gallego Cazaux no garantiza la exactitud, completitud o actualidad de la información publicada en este sitio. El usuario es responsable de verificar la información directamente con la inmobiliaria antes de tomar cualquier decisión.',
  },
  {
    title: '5. Links a terceros',
    content: 'Este sitio puede contener enlaces a sitios web de terceros. Gallego Cazaux no tiene control sobre el contenido de dichos sitios y no se hace responsable de los mismos.',
  },
  {
    title: '6. Privacidad',
    content: 'El tratamiento de los datos personales de los usuarios se rige por la Política de Privacidad de Gallego Cazaux, disponible en este mismo sitio.',
  },
  {
    title: '7. Modificaciones',
    content: 'Gallego Cazaux se reserva el derecho de modificar estos términos y condiciones en cualquier momento. Las modificaciones entrarán en vigor desde su publicación en el sitio.',
  },
  {
    title: '8. Contacto',
    content: 'Para consultas sobre estos términos y condiciones, puede contactarnos a través de nuestro formulario de contacto o por teléfono al (2954) 272138.',
  },
];

export default function TerminosPage() {
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
            <span className="text-white/70">Términos y Condiciones</span>
          </div>
          <h1 className="font-outfit text-4xl md:text-5xl font-bold text-white mb-3">
            Términos y Condiciones
          </h1>
          <p className="text-white/55 text-lg">
            Condiciones de uso del sitio web
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl border border-border p-8 md:p-10">

          <p className="text-xs text-muted mb-8 pb-6 border-b border-border">
            Última actualización: Mayo 2026
          </p>

          <div className="space-y-8">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="font-outfit text-base font-semibold text-secondary mb-3">
                  {section.title}
                </h2>
                <p className="text-gray text-sm leading-relaxed">
                  {section.content}
                </p>
              </section>
            ))}
          </div>

          <div className="mt-10 pt-8 border-t border-border flex flex-wrap gap-4 items-center justify-between">
            <Link
              href="/contacto"
              className="text-sm text-primary font-medium hover:underline"
            >
              Contactarnos →
            </Link>
            <Link
              href="/privacidad"
              className="text-sm text-muted hover:text-gray transition-colors"
            >
              Política de Privacidad
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
