## ADDED Requirements

### Requirement: Hero copy entra con stagger orquestado
El hero SHALL usar FM `variants` con `staggerChildren` para coordinar la entrada del copy: badge → h1 (por palabra) → párrafo → botones → stats panel. Cada elemento hija hereda el timing sin `animationDelay` inline.

#### Scenario: Entrada inicial completa
- **WHEN** la página carga y el hero es visible
- **THEN** el badge aparece primero, luego cada palabra del h1 sube desde `y: 20` con `opacity: 0 → 1`, seguido del párrafo, los botones y el stats panel, con un `staggerChildren` de 0.07s entre palabras y 0.15s entre bloques

#### Scenario: No re-animar en re-renders
- **WHEN** el componente re-renderiza sin desmontar
- **THEN** las animaciones de entrada NO se disparan de nuevo (usar `initial` solo en primer mount)

### Requirement: Imagen entra con spring
La imagen del hero SHALL entrar desde `scale: 1.08, opacity: 0` a estado final usando `type: "spring", stiffness: 80, damping: 18`, comenzando 200ms después que el copy.

#### Scenario: Entrada imagen
- **WHEN** la página carga
- **THEN** la imagen escala suavemente hacia su tamaño final con spring, sin rebote excesivo visible

### Requirement: Floating card entra con spring retardado
La floating card SHALL entrar desde `y: 40, opacity: 0` a `y: 0, opacity: 1` con `type: "spring"`, 300ms después de la imagen.

#### Scenario: Entrada floating card
- **WHEN** la página carga
- **THEN** la card sube desde abajo con spring 300ms después que la imagen comienza su entrada

### Requirement: Stats panel con stagger propio
El stats panel SHALL animar cada uno de sus 3 stats con entrada escalonada: `y: 16 → 0`, `opacity: 0 → 1`, con `staggerChildren: 0.1s`.

#### Scenario: Stats entran escalonados
- **WHEN** el stats panel es visible por primera vez
- **THEN** el primer stat aparece, luego 100ms el segundo, luego 100ms el tercero
