# Usá la maqueta Gymple

1. Abrí la app con Vite: `npm run dev` y http://127.0.0.1:5173.
2. Poné **11111111** con el numpad o con el teclado y apretá **Enter**.
3. Mirá la liberación, la apertura de mentira, la espera y el retorno lento. El imán traba la puerta cuando vuelve a cerrar.

**El movimiento es de mentira: el mecanismo de apertura y retorno todavía no está definido.** Un relé no mueve la puerta. Un cierrapuertas no demuestra apertura automática. No hay motor, sensor de posición ni mecanismo elegido.

## Tres vistas

- **Flujo completo:** numpad de PC y ciclo de la puerta, sin servidor.
- **Todo lo que lleva la maqueta:** la caja impresa, la electrónica de adentro, la cerradura y los datos que faltan.
- **Armala desde cero:** 33 pasos, un solo transformador de 12 V y soldadura opcional.

El ejemplo **22222222** no entra; está en los detalles. Otros números no autorizan por longitud. **No pongas DNI reales.** No hay internet, backend, firmware, equipos conectados ni validación de identidad. La entrada vive en memoria: no se guarda, no va a la URL, no se exporta.

Pausá/continuá el ciclo con su botón. Cambiar de vista lo pausa. Si la tarjeta sale de pantalla o la pestaña se oculta, se frena el reloj. Enter repetido no encola otro ciclo. Con movimiento reducido se avanza por pasos. En el celular, confirmar el ejemplo lleva la vista a la puerta.

## La idea

Una caja impresa en 3D con toda la lógica adentro y la cerradura montada afuera. **Un solo transformador de 12 V** alimenta el imán y el conversor que baja a 5 V para la ESP32. El numpad USB es la única entrada. Nada más.

## Aprender no aprueba nada

Los checks guardan lo que entendiste, no lo que probaste. Si el navegador bloquea el guardado, la demo sigue andando. No se borran datos previos.

La soldadura se practica en retazos sueltos, sin alimentación ni equipo instalado. No estañes un cable para apretarlo bajo un tornillo. No intervengas la red ni abras el transformador. Las pantallas de medición quedan **SIN MEDIR**.

Antes de armar algo de verdad, leé [la guía eléctrica](revision04-electrica.md). Transformador, imán, relé, conversor, conexiones, protecciones, bisagra y botón de salida necesitan revisión de alguien que sepa. No hay cumplimiento legal declarado.

## Cómo se sirve

La app usa Vite + React. Para desarrollo: `npm ci` y `npm run dev`. No abre por `file://`. El servidor de desarrollo usa módulos/HMR locales; no valida DNI ni conecta equipos.

Para producción: `npm ci`, `npm run verify` y publicá `dist/` (Cloudflare Pages: build `npm run build`, salida `dist`, Node 24.11.0). El build y el bundle servido fueron verificados; las cabeceras están en `public/_headers`.
