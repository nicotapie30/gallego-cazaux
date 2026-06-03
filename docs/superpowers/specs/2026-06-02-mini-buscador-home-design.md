# Mini Buscador Home — Design Spec

## Objetivo
Agregar un strip de búsqueda rápida en la home que reduzca la fricción para encontrar propiedades, sin duplicar el panel de filtros completo de /propiedades.

## Ubicación
Entre el hero y la sección "Propiedades Destacadas". Card flotante centrada con sombra, visualmente separada de ambas secciones.

## Campos
- **Operación**: toggle pills — Venta / Alquiler (vacío = todas)
- **Tipo**: select — Todos / Casa / Depto. / PH / Terreno / Local
- **CTA**: botón "Ver propiedades →" (bg-primary)

## Comportamiento
- Al hacer click en CTA: navega a `/propiedades?operation=X&type=Y`
- Params vacíos se omiten de la URL
- `/propiedades` lee `useSearchParams` para inicializar `useState` de filtros al montar

## Cambios requeridos
1. `src/app/page.tsx` — nuevo componente `QuickSearch` inline
2. `src/app/propiedades/page.tsx` — leer `operation` y `type` de searchParams al init

## Estilo
- Card blanca, `rounded-2xl`, `shadow-lg`, `max-w-2xl mx-auto`
- Padding `px-6 py-5`
- Separador vertical entre campos
- Mobile: stack vertical
