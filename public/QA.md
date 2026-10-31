# Verificación — Vite + React 1.0.0

**Revisión visual/técnica favorable como maqueta y taller didáctico.** No es aprobación de un equipo físico, soldadura real ni instalación.

## Alcance

La entrada es un proyecto Vite + React con JSX/ESM locales. Esta revisión **sí ejecutó el build de producción** y lo sirvió con las cabeceras de `_headers`; no se limita a Vite DEV.

## Verificado sobre el bundle de producción

- `npm run verify`: 9 tests PASS, build Vite 8.3.5 y control de `dist` PASS.
- Build: 32 módulos; `dist/index.html` 1,44 kB (0,69 gzip), CSS 26,4 kB (6,07 gzip), JS 332,9 kB (110,06 gzip). Una sola pareja de bundles con hash.
- `dist/` contiene el entry hasheado, `robots.txt`, `_headers`, las tres guías y las cinco capturas. Sin referencias a `/src/` ni a `node_modules`.
- Navegador real sobre el bundle servido con CSP y cabeceras de producción: **consola limpia** (0 errores, 0 warnings) y 0 pedidos externos.
- Ciclo completo con 11111111 + Enter: liberación, apertura ilustrativa, espera, retorno y alineación. Enter repetido no encola otro ciclo. 22222222 deniega sin liberar.
- Numpad por clic y por teclado (8 dígitos, Retroceso, Escape, Enter). Pausa/continuación y reinicio. Con la vista Partes activa, el teclado no altera la entrada.
- Fallas: corte de 12 V, sin control, contacto pegado, liberación independiente y restablecimiento. Una falla cancela el ciclo.
- 17 selecciones de partes con inspector completo; 9 piezas mecánicas interactivas; despiece 0–100 %.
- 33 acciones × 3 poses: todas dibujan contenido visible, sin `NaN` ni readouts vacíos. Velocidad 0,5×/1×/1,5× validada.
- Movimiento reducido: aparecen poses explícitas; cuatro pasos llevan el ciclo de `released` a `complete`.
- Teclado: flechas/Home/End cambian de pestaña y el foco acompaña a la pestaña activa.
- Móvil 390 px: sin scroll horizontal; tarjetas de partes y tutorial ajustadas al viewBox (sin bandas verticales forzadas).
- Temas claro y oscuro sobre el bundle; el tema no reinicia el modelo.
- Lighthouse sobre el bundle con `_headers`: **Accesibilidad 100, Best Practices 100, SEO 100**.
- Líneas de textura de la figura principal: 0 extremos flotantes con `scripts/lines.mjs`.
- `_headers`: CSP (`default-src 'self'`, sin `unsafe-eval`), `nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy`, `Permissions-Policy`, caché inmutable de `/assets/*` y charset UTF-8 para las guías.

## Geometría conservada

La revisión previa inspeccionó el ciclo de 17 cuadros, soldadura a 4× y 72 comprobaciones de extremos de líneas. Esas comprobaciones se conservan; esta revisión revalidó la figura principal y las 33 escenas en el bundle. No constituyen una auditoría 3D completa de volúmenes/colisiones en todos los ángulos.

## Límites

No se probó un teléfono físico, Firefox, Safari ni lector de pantalla. No se midió FPS/GPU en hardware de gama baja. No hubo ensayos eléctricos, térmicos, mecánicos, de salida/obstáculos/RF ni certificación.

Mecanismo y energía de apertura/retorno por definir. Los componentes son candidatos; faltan fichas/modelos, circuito/pinout, niveles y masas, dimensionamiento, protecciones y revisión presencial antes de permitir bloqueo. El adaptador de referencia no es una compra aprobada. Ninguna animación ni SIN MEDIR aprueba retención, continuidad o seguridad.

## Capturas

[Flujo](capturas/flujo.png) · [Partes](capturas/partes.png) · [Tutorial](capturas/tutorial.png) · [Soldadura 4× de geometría conservada](capturas/soldadura-detalle.png) · [Ciclo de geometría conservada](capturas/ciclo.png).
