## Why

El hero actual usa `animate-fade-up` CSS con delays estáticos — funcional pero predecible. No hay animación en los blobs, la floating card no tiene entrada propia, y el parallax scroll está ausente. Para una inmobiliaria premium, el primer scroll es la impresión más importante.

## What Changes

- Reemplazar `animate-fade-up` CSS por orquestación Framer Motion con `staggerChildren` en el copy (badge → h1 palabra a palabra → párrafo → botones → stats)
- Animar blobs de fondo con loop suave (`y`, `scale`, `opacity`) para dar profundidad sin distraer
- Entrada de la imagen: spring desde `scale(1.08) + opacity 0` a estado final, con la floating card saliendo 200ms después con `y: 40 → 0`
- Parallax suave en scroll: imagen sube levemente (`useScroll + useTransform`), blobs rotan lentamente
- Scroll indicator animado (chevron bouncing) en la parte inferior del hero
- Stats panel: cada stat con entrada independiente escalonada

## Capabilities

### New Capabilities
- `hero-entrance-orchestration`: Secuencia FM de entrada del hero — stagger copy, imagen, floating card
- `hero-scroll-parallax`: Parallax leve con `useScroll + useTransform` en imagen y blobs
- `hero-ambient-animations`: Blobs animados en loop (breathe / drift)

### Modified Capabilities
<!-- ninguna — solo mejoras de animación, sin cambios de estructura ni datos -->

## Impact

- `src/app/page.tsx`: Hero section rewrite (animaciones, no estructura de datos)
- Sin dependencias nuevas — Framer Motion ya instalado
- `"use client"` ya presente en page.tsx
- No afecta `/propiedades`, `/contacto` ni otras rutas
