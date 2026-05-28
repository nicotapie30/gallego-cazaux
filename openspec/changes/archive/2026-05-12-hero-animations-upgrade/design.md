## Context

El hero de `src/app/page.tsx` (líneas 475–607) usa `@midudev/tailwind-animations` (`animate-fade-up`, `animate-fade-in`) con `animationDelay` inline. Framer Motion ya está instalado y se usa en el resto de la página. La sección es un Server Component que ya tiene `"use client"` a nivel de archivo.

Estado actual:
- Badge, h1, párrafo, botones, stats: `animate-fade-up` CSS sin coordinación
- Imagen: float loop FM (`y: [0, -10, 0]`)
- Blobs: estáticos, sin animación
- Floating card: sin entrada propia
- Sin parallax scroll
- Sin scroll indicator

## Goals / Non-Goals

**Goals:**
- Orquestación de entrada con FM `staggerChildren` — todo el copy entra coordinado
- Imagen + floating card con spring de entrada
- Blobs "respirando" en loop (drift lento)
- Parallax suave en scroll (imagen y blobs)
- Scroll indicator (chevron animado, desaparece al scrollear)
- Cada stat del panel con entrada escalonada propia

**Non-Goals:**
- Cambiar estructura HTML del hero o su copy
- Agregar nuevas dependencias (FM ya existe)
- Cambiar animaciones de otras secciones
- TypeScript strict mode breaks — no introducir `any`

## Decisions

**D1: FM `variants` + `staggerChildren` sobre CSS delays**
CSS delays hardcodeados son frágiles — al reordenar elementos el timing se rompe. FM `variants` con `staggerChildren` propagan el timing automáticamente y son interrumpibles.

_Alternativa descartada_: Mantener CSS + agregar FM solo a blobs y parallax (fragmentado, difícil mantener).

**D2: `useScroll + useTransform` para parallax, no GSAP ScrollTrigger**
FM ya está instalado y tiene soporte nativo de scroll. GSAP sería una dependencia nueva innecesaria para este nivel de complejidad.

_Alternativa descartada_: `transform: translateY` con JS event listener (no hardware-accelerated bajo carga).

**D3: Blobs animados con FM `animate` loop — no CSS keyframes**
FM permite controlar duración, easing y offsets individuales por blob. CSS `@keyframes` serían estáticos y no coordinables fácilmente.

**D4: Scroll indicator como componente separado dentro del hero**
Mantenible e independiente. Se monta/desmonta según `scrollY` con `useMotionValueEvent`.

**D5: No split text por caracteres**
La marca es inmobiliaria tradicional — splitting por letra queda nervioso. Se usa split por palabra (cada `<span>` = una palabra en h1).

## Risks / Trade-offs

- [Riesgo] `"use client"` ya en page.tsx — no hay riesgo de SSR para hooks FM.
- [Riesgo] Blobs en loop con FM pueden causar paint continuo → Mitigation: usar solo `transform` (translate/scale) + `opacity`, nunca `width`/`height`/`background-position`.
- [Trade-off] `staggerChildren` en h1 (por palabra) agrega ~6 spans extra al DOM. Impacto mínimo, aceptable.
- [Riesgo] `useScroll` necesita `ref` al container del hero → asegurarse de que el `ref` sea la `<section>` correcta, no el documento.

## Migration Plan

1. Quitar las clases `animate-fade-up` / `animate-fade-in` y los `animationDelay` inline del hero
2. Envolver copy en `motion.div` container con `variants` de orquestación
3. Reemplazar `<motion.div>` de imagen (float loop) por versión con entrada spring + float loop combinados
4. Agregar FM animate loop a los 3 blobs
5. Agregar `useScroll` + `useTransform` para parallax
6. Agregar `<ScrollIndicator />` al final del hero
7. Validar `tsc --noEmit` + revisar en mobile

Rollback: git revert del commit (cambio aislado, sin afectar otras secciones).
