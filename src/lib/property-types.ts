/** Tipos de propiedad con sus etiquetas — fuente única para las landings
 *  /propiedades/tipo/[tipo] y el sitemap */
export const PROPERTY_TYPES: Record<string, { label: string; plural: string }> = {
  casa:         { label: 'Casa',         plural: 'Casas' },
  departamento: { label: 'Departamento', plural: 'Departamentos' },
  ph:           { label: 'PH',           plural: 'PHs' },
  terreno:      { label: 'Terreno',      plural: 'Terrenos' },
  local:        { label: 'Local',        plural: 'Locales' },
};
