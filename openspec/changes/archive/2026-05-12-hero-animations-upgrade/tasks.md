## 1. Limpieza CSS → FM

- [x] 1.1 Quitar clases `animate-fade-up` y `animate-fade-in` del hero (`src/app/page.tsx` líneas ~488–562)
- [x] 1.2 Quitar todos los `animationDelay` inline del hero
- [x] 1.3 Verificar que `@midudev/tailwind-animations` no se rompa en otras secciones (solo se usaba en el hero con estas clases)

## 2. Blobs animados

- [x] 2.1 Convertir los 3 `<div>` de blobs en `<motion.div>` con `animate` loop (`scale`, `y`/`x`, solo transform + opacity)
- [x] 2.2 Asignar duraciones distintas a cada blob (8s / 10s / 6s) para evitar sincronía

## 3. Orquestación del copy

- [x] 3.1 Crear `motion.div` container con `variants` de orquestación (`staggerChildren: 0.15`, `delayChildren: 0.1`)
- [x] 3.2 Envolver badge, párrafo, botones y stats panel en `motion.div` con variante `item` (`y: 20 → 0`, `opacity: 0 → 1`)
- [x] 3.3 Dividir el h1 en spans por palabra y aplicar `staggerChildren: 0.07` para la animación palabra a palabra
- [x] 3.4 Convertir stats panel en container FM con `staggerChildren: 0.1` — cada stat es un `motion.div`

## 4. Imagen y floating card

- [x] 4.1 Reemplazar entrada de imagen: spring desde `scale: 1.08, opacity: 0` con `stiffness: 80, damping: 18`, delay 0.2s
- [x] 4.2 Mantener el float loop existente (`y: [0, -10, 0]`) — combinarlo con la entrada en el mismo `motion.div`
- [x] 4.3 Dar entrada propia a la floating card: `y: 40 → 0, opacity: 0 → 1`, spring, delay 0.35s

## 5. Parallax scroll

- [x] 5.1 Agregar `ref` a la `<section>` del hero y usar `useScroll({ target: ref, offset: ["start start", "end start"] })`
- [x] 5.2 Crear `useTransform(scrollYProgress, [0, 1], [0, -60])` para la imagen y aplicarlo como `style={{ y: imageParallax }}`
- [x] 5.3 Aplicar parallax inverso suave (`+20px`) al blob 1 para reforzar profundidad

## 6. Scroll indicator

- [x] 6.1 Crear componente `<ScrollIndicator />` inline en el hero — chevron doble animado con bounce loop
- [x] 6.2 Usar `useMotionValueEvent(scrollY, "change", ...)` para hacer fade out cuando `scrollY >= 80`
- [x] 6.3 Posicionar en `absolute bottom-8 left-1/2 -translate-x-1/2`

## 7. QA

- [x] 7.1 Correr `npm run build` — sin errores TypeScript
- [x] 7.2 Verificar en mobile (< 768px): imagen oculta (`hidden lg:block`), solo copy anima — confirmar que no hay layout shift
- [x] 7.3 Revisar `prefers-reduced-motion`: envolver todas las animaciones con `motion.div` que tenga `variants` reducibles, o usar `useReducedMotion()`
- [x] 7.4 Confirmar que el float loop de imagen y los blobs no causan paint continuo (DevTools → Performance → sin layout)
