import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Política de Privacidad - Gallego Cazaux',
  description: 'Política de privacidad y tratamiento de datos personales de Gallego Cazaux Negocios Inmobiliarios.',
};

const sections = [
  {
    title: '1. Introducción',
    content: 'En Gallego Cazaux Negocios Inmobiliarios respetamos su privacidad y nos comprometemos a proteger sus datos personales. Esta política explica cómo recopilamos, usamos, divulgamos y protegemos su información.',
  },
  {
    title: '2. Datos que recopilamos',
    content: 'Podemos recopilar los siguientes datos personales:',
    list: [
      'Nombre y apellido',
      'Dirección de correo electrónico',
      'Número de teléfono',
      'Información de contacto que usted nos proporcione',
      'Datos de navegación y cookies',
    ],
  },
  {
    title: '3. Uso de sus datos',
    content: 'Utilizamos sus datos personales para:',
    list: [
      'Responder a sus consultas y solicitudes de información',
      'Enviarle información sobre propiedades y servicios',
      'Mejorar nuestra atención y servicios',
      'Cumplir con obligaciones legales',
    ],
  },
  {
    title: '4. Protección de datos',
    content: 'Implementamos medidas de seguridad técnicas y organizativas para proteger sus datos personales contra acceso no autorizado, modificación, divulgación o destrucción. Sus datos se almacenan en servidores seguros y el acceso está limitado a personal autorizado.',
  },
  {
    title: '5. Compartir datos',
    content: 'No vendemos ni alquilamos sus datos personales a terceros. Solo compartimos su información cuando es necesario para prestarle nuestros servicios o cuando la ley lo requiera.',
  },
  {
    title: '6. Cookies',
    content: 'Este sitio utiliza cookies para mejorar la experiencia del usuario. Las cookies son pequeños archivos de texto que se almacenan en su dispositivo. Puede configurar su navegador para rechazarlas o recibir un aviso antes de aceptarlas.',
  },
  {
    title: '7. Sus derechos',
    content: 'Usted tiene derecho a:',
    list: [
      'Acceder a sus datos personales',
      'Rectificar datos inexactos',
      'Solicitar la eliminación de sus datos',
      'Oponerse al tratamiento de sus datos',
      'Solicitar la portabilidad de sus datos',
    ],
  },
  {
    title: '8. Contacto',
    content: 'Si tiene preguntas sobre esta política o desea ejercer sus derechos, puede contactarnos a través de nuestro formulario de contacto o por teléfono al (2954) 272138.',
  },
  {
    title: '9. Cambios en la política',
    content: 'Esta política de privacidad puede modificarse periódicamente. Cualquier cambio será publicado en esta página con la fecha de actualización correspondiente.',
  },
];

export default function PrivacidadPage() {
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
            <span className="text-white/70">Política de Privacidad</span>
          </div>
          <h1 className="font-outfit text-4xl md:text-5xl font-bold text-white mb-3">
            Política de Privacidad
          </h1>
          <p className="text-white/55 text-lg">
            Protección de sus datos personales
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
                {section.list && (
                  <ul className="mt-3 space-y-1.5">
                    {section.list.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-gray text-sm">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
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
              href="/terminos"
              className="text-sm text-muted hover:text-gray transition-colors"
            >
              Términos y Condiciones
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
