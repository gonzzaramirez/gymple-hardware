# Qué se probó y qué no

**Revisión favorable como maqueta y taller didáctico.** No es aprobación de un equipo físico, soldadura real ni instalación.

## Alcance

La entrada es un proyecto Vite + React con JSX/ESM locales. Esta revisión **sí ejecutó el build de producción** y lo sirvió con las cabeceras de `_headers`.

## Verificado sobre el bundle de producción

- `npm run verify`: 12 tests PASS, build Vite 8.3.5 y control de `dist` PASS.
- Build: 32 módulos; `dist/index.html` 1,6 kB (0,7 gzip), CSS 26,4 kB (6,1 gzip), JS 323 kB (106 gzip). Una sola pareja de bundles con hash.
- `dist/` contiene el entry hasheado, `robots.txt`, `_headers`, las tres guías y las capturas. Sin referencias a `/src/` ni a `node_modules`.
- Navegador real sobre el bundle servido con CSP y cabeceras de producción: **consola limpia** y 0 pedidos externos.
- Ciclo completo con 11111111 + Enter: liberación, apertura de mentira, espera, retorno y cierre. Enter repetido no encola otro ciclo. 22222222 no libera.
- Numpad por clic y por teclado (8 dígitos, Retroceso, Escape, Enter). Pausa/continuación y reinicio. Con la vista Partes activa, el teclado no altera la entrada.
- Fallas: corte de 12 V, sin control, relé pegado, botón de salida y restablecimiento. Una falla corta el ciclo.
- 17 piezas con inspector completo; 9 piezas de la puerta interactivas; separación 0–100 %.
- 33 pasos × 3 gestos: todos dibujan contenido visible, sin `NaN` ni readouts vacíos. Velocidad 0,5×/1×/1,5× validada.
- Movimiento reducido: aparecen pasos explícitos; cuatro clics llevan el ciclo de `released` a `complete`.
- Teclado: flechas/Home/End cambian de pestaña y el foco acompaña a la pestaña activa.
- Celular de 390 px: sin scroll horizontal; tarjetas de piezas y tutorial ajustadas al viewBox.
- Temas claro y oscuro sobre el bundle; el tema no reinicia el modelo.
- Lighthouse sobre el bundle con `_headers`: **Accesibilidad 100, Best Practices 100, SEO 100**.
- Líneas de textura de la figura principal: 0 extremos flotantes con `scripts/lines.mjs`.
- `_headers`: CSP (`default-src 'self'`, sin `unsafe-eval`), `nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy`, `Permissions-Policy`, caché inmutable de `/assets/*` y charset UTF-8 para las guías.
- Tests de contenido: cada pieza dibujada tiene entrada en el catálogo, los cuatro grupos cubren todas las piezas y el texto no usa vocabulario de España.

## El dibujo y las escenas

La revisión previa inspeccionó el ciclo de 17 cuadros, la soldadura a 4× y 72 comprobaciones de extremos de líneas. En esta revisión la puerta y la caja se rediseñaron como prototipo impreso; el banco y la soldadura se conservan. Se revalidó la figura nueva y las 33 escenas en el bundle. No es una auditoría 3D completa de volúmenes/colisiones en todos los ángulos.

## Límites

No se probó un teléfono físico, Firefox, Safari ni lector de pantalla. No se midió FPS/GPU en hardware de gama baja. No hubo ensayos eléctricos, térmicos, mecánicos, de salida/obstáculos/RF ni certificación.

Mecanismo y energía de apertura/retorno por definir. Las piezas son candidatas; faltan fichas/modelos, conexiones, niveles y masas, dimensionamiento, protecciones y revisión presencial antes de permitir bloqueo. El transformador de referencia no es una compra aprobada. Ninguna animación ni SIN MEDIR aprueba retención, continuidad o seguridad.

## Capturas

[Flujo](capturas/flujo.png) · [Piezas](capturas/partes.png) · [Tutorial](capturas/tutorial.png) · [Soldadura 4× de geometría conservada](capturas/soldadura-detalle.png).
