# Usá la demo Gymple

1. Abrí la aplicación servida por Vite: npm run dev y http://127.0.0.1:5173.
2. Ingresá **11111111** con el numpad frontal o tu teclado y apretá **Enter**.
3. Observá liberación, apertura ilustrativa, espera y retorno lento. El imán retiene idealmente solo cuando la hoja vuelve a alinear.

**Movimiento ilustrativo; mecanismo de apertura/retorno por definir.** Un relé no mueve la hoja. Un cierrapuertas no demuestra apertura automática. No hay motor, sensor de posición ni mecanismo real seleccionado por esta web.

## Tres vistas

- **Flujo completo:** numpadPCfrontal y ciclo ilustrativo, sin servidor.
- **Todas las partes del producto:** función, alimentación/control, despiece conceptual y datos que faltan.
- **Tutorial: armado desde cero:**33acciones, alimentación de una sola fuente externa y práctica opcional de soldadura desenergizada.

El ejemplo **22222222** deniega sin liberar; está en los detalles secundarios. Otros números no autorizan por longitud. **No ingreses DNI reales.** No hay red, backend, firmware, equipos conectados ni validación de identidad. La entrada solo vive transitoriamente en memoria: no almacenamiento, URL, registros ni exportación.

Pausá/continuá el ciclo con su botón. Cambiar de vista lo pausa. Si la tarjeta completa sale de pantalla o el documento se oculta se detiene el reloj. Enter repetido no encola otro ciclo. Con movimiento reducido se avanza por poses explícitas. En móvil, confirmar el ejemplo lleva la vista al portillo.

## Aprender no aprueba una instalación

Los checks guardan comprensión didáctica en tu navegador, nunca ensayos ni aprobación física. Si el almacenamiento está bloqueado, la experiencia sigue funcionando. No se borran registros previos al abrir la demo.

La soldadura se practica en retazos independientes, sin alimentación ni equipo instalado. No se estaña un conductor para apretarlo bajo un tornillo. No intervenir red eléctrica ni abrir el adaptador. Las pantallas de medición permanecen **SIN MEDIR**.

Antes de intentar un piloto real leé [la guía técnica y sus pendientes](revision04-electrica.md). Fuente, buck, relé, shield, cerradura, interfazUSB, circuito, protecciones, mecanismos, herrajes,RF y salida requieren identificación y revisión presencial. No hay cumplimiento legal declarado.

## Cómo se sirve esta revisión

La aplicación actual usa Vite+React. Para desarrollo: npm ci y npm run dev. No abre por file://. El servidor de desarrollo usa módulos/HMR locales, no valida DNI ni conecta equipos. La futura versión de producción requiere npm run build y publicar dist; ese build no fue ejecutado por la restricción del proyecto. No hay despliegueCloudflare aún.
