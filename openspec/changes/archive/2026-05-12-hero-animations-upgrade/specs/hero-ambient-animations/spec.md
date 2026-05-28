## ADDED Requirements

### Requirement: Blobs de fondo animan en loop suave
Los 3 blobs del hero SHALL animar continuamente usando FM `animate` con loop infinito, usando solo `transform` (translate/scale) + `opacity`. Nunca `width`, `height`, ni propiedades que fuerzan layout.

#### Scenario: Blob 1 (verde top-right) respira
- **WHEN** el hero está montado
- **THEN** blob 1 pulsa `scale: [1, 1.12, 1]` y deriva `y: [0, -20, 0]` en un loop de 8s con `ease: "easeInOut"`

#### Scenario: Blob 2 (azul bottom-left) deriva
- **WHEN** el hero está montado
- **THEN** blob 2 se desplaza `x: [0, 15, 0]` y `y: [0, -10, 0]` en loop de 10s con offset de fase para no sincronizar con blob 1

#### Scenario: Blob 3 (verde center) flota
- **WHEN** el hero está montado
- **THEN** blob 3 pulsa `scale: [1, 1.08, 1]` en loop de 6s asincrónico con los otros blobs

#### Scenario: Sin jank de paint
- **WHEN** los blobs animan
- **THEN** solo `transform` y `opacity` son animados — sin repaint de layout
