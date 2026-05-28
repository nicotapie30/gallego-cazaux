## ADDED Requirements

### Requirement: Parallax suave en imagen al scrollear
La imagen del hero SHALL moverse verticalmente con `useTransform` vinculado a `useScroll`, desplazándose `−60px` al llegar al fondo del viewport del hero, creando efecto parallax leve.

#### Scenario: Imagen sube al scrollear
- **WHEN** el usuario scrollea hacia abajo dentro del rango del hero
- **THEN** la imagen se desplaza hacia arriba suavemente con un factor de parallax de ~0.15 (60px de movimiento por 400px de scroll)

### Requirement: Scroll indicator animado
El hero SHALL mostrar un scroll indicator (chevron doble o línea pulsante) centrado en la parte inferior, que desaparece cuando el usuario scrollea más de 80px.

#### Scenario: Indicador visible en top
- **WHEN** `scrollY < 80px`
- **THEN** el scroll indicator es visible con `opacity: 1` y animación de bounce continua

#### Scenario: Indicador desaparece al scrollear
- **WHEN** `scrollY >= 80px`
- **THEN** el scroll indicator hace fade out con `opacity: 0`, `transition: 300ms`
