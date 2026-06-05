export const faqs = [
  {
    question: '¿Qué documentos necesito para comprar una propiedad?',
    answer: 'Para comprar una propiedad generalmente necesitás: DNI o pasaporte, comprobante de ingresos, Constancia de CUIL/CUIT, y en caso de financiamiento, pre-aprobación crediticia. También necesitarás un abogado inmobiliario para verificar la situación legal de la propiedad.',
    category: 'compra',
  },
  {
    question: '¿Ofrecen financiamiento para la compra de propiedades?',
    answer: 'Como inmobiliaria, no ofrecemos financiamiento directo. Sin embargo, trabajamos con bancos y entidades financieras que pueden ayudarte a obtener créditos hipotecarios. Te acompañamos en todo el proceso y te conectamos con las mejores opciones del mercado.',
    category: 'compra',
  },
  {
    question: '¿Cuánto tiempo lleva cerrar una operación de venta?',
    answer: 'El tiempo varía según la complejidad de la operación, pero generalmente el proceso completo (desde que se firma el boleto hasta la escritura) lleva entre 30 y 60 días hábiles. Esto incluye la preparación de documentación, la firma del boleto y la escrituración definitiva.',
    category: 'compra',
  },
  {
    question: '¿Cómo funciona el alquiler de propiedades?',
    answer: 'El proceso de alquiler incluye: visita a la propiedad, negociación de condiciones (precio, duración, garantías), firma del contrato de alquiler, y entrega de las llaves. Generalmente se requiere depósito de garantía (equivalente a un mes de alquiler) y adelanto del primer mes.',
    category: 'alquiler',
  },
  {
    question: '¿Qué incluye el servicio de administración de alquileres?',
    answer: 'Nuestro servicio de administración incluye: cobranza de alquileres, seguimiento de pagos, coordinación de reparaciones y mantenimiento, supervisión del estado de la propiedad, y comunicación con los inquilinos. Gestionamos todo para que vos solo cobres.',
    category: 'alquiler',
  },
  {
    question: '¿Cuánto dura el proceso de tasación de una propiedad?',
    answer: 'El proceso de tasación generalmente toma entre 3 y 7 días hábiles, dependiendo del tipo de propiedad y la complejidad del caso. La tasación incluye análisis de mercado, comparación con propiedades similares y evaluación del estado de la propiedad.',
    category: 'general',
  },
  {
    question: '¿Qué costos adicionales tiene una operación inmobiliaria?',
    answer: 'Los costos adicionales incluyen: honorarios del martillero/inmobiliaria (generalmente 3-5% del valor de venta), gastos de escritura (impuestos, honorarios notariales, registro), y en caso de financiamiento, costos de gestoría y seguro de vida.',
    category: 'general',
  },
  {
    question: '¿Realizan tasaciones gratuitas?',
    answer: 'Sí, realizamos tasaciones gratuitas y sin compromiso para propiedades en Santa Rosa y La Pampa. Nuestro equipo de expertos evalúa tu propiedad y te ofrece una estimación de mercado ajustada a las condiciones actuales.',
    category: 'general',
  },
];

export type FAQ = typeof faqs[number];
