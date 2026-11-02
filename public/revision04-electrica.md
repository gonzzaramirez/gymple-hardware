# Guía eléctrica del prototipo

**Esto describe una caja y una cerradura, no una puerta instalada.** El ciclo automático no demuestra un mecanismo real. Ningún paso de esta guía habilita bloquear una puerta de verdad.

## La idea en una frase

Una caja impresa en 3D guarda la ESP32, el relé, el conversor y las borneras; afuera lleva la cerradura electromagnética. **Un solo transformador de 12 V alimenta todo**: el imán y el conversor que baja a 5 V. El numpad USB es la única entrada.

## La puerta

El imán de 12 V **traba** la armadura cuando la puerta está cerrada. No la abre. Abrir y cerrar a mano es parte del ciclo. Para una puerta real falta definir el resorte o el cierre, la fuerza, el recorrido y la salida.

La bisagra es de herrería, no impresa: la define el metalista con el peso real de la puerta. Si el eje queda chico, se vence con el uso.

## Un transformador, dos ramas

- **Rama del imán:** 12 V → fusible → contacto del relé → botón de salida → bobina del imán. El botón de salida corta la alimentación sin pasar por la ESP32.
- **Rama de la electrónica:** 12 V → fusible → conversor → 5 V → ESP32 y relé.

Usá un transformador **certificado, cerrado y de 12 V**. No lo abras, no le cambies el cable ni le pongas otra fuente “porque había”. Calculá los amperes con el imán y la electrónica andando; el pico del imán no es el consumo de reposo.

Referencia documental, no compra aprobada: [Mean Well GST25A](https://www.meanwell.com/Upload/PDF/GST25A/GST25A-SPEC.PDF) (familia de 12 V). No identifica tu transformador ni prueba que alcance para este conjunto.

## La caja impresa

La caja es la estructura: sostiene las placas y la cerradura. Dejá lugar para los conectores, la ventilación y el cable del transformador. La tapa va con tornillos, no a presión.

La ESP32 va sobre una base de borneras. **No sueldes cables directo a los pines** si podés usar borneras. Los GPIO son de 3,3 V: mandan señal al módulo de relé, no alimentan la bobina del imán.

## El relé y el imán

El relé de 5 V separa la señal de la ESP32 de los 12 V del imán. Mirá la ficha del módulo: algunos ya traen optoacoplador y otros no. La entrada tiene que aceptar 3,3 V.

El imán es inductivo: poné un **diodo en paralelo con la bobina**, con el cátodo al positivo. Sin diodo, el corte mete un pico que puede matar el relé o la ESP32.

El botón de salida va **en serie con la alimentación del imán**, no después del relé. En una puerta real es obligatorio y tiene que cortar aunque la ESP32 esté colgada.

## Los 5 V

El conversor tiene que entregar 5 V estables con la ESP32 y el relé conectados. Ajustalo **sin carga primero**, medí, y recién después conectá la placa. Si calienta o baja de 4,8 V, cambiá el módulo.

Nunca conectes 12 V a la ESP32, a un GPIO ni a la línea de 3,3 V.

## El numpad

El numpad es USB y va a la **compu**, no a un GPIO. La app lee los dígitos y decide; la ESP32 recibe la orden por el sistema que todavía falta definir. No inventes un cable del USB a la placa.

## Medir antes de creer

- Multímetro en **V continua**. Punta negra en COM, roja en V.
- Primero el transformador solo: 12 V.
- Después el conversor solo: 5 V.
- Recién con los dos valores bien, conectá la ESP32.
- No midas 220 V. No midas con la puerta armada ni con el imán conectado.

Referencias: [Fluke, medir tensión DC](https://www.fluke.com/en-ie/learn/blog/digital-multimeters/how-to-measure-dc-voltage-with-a-digital-multimeter) · [Espressif, ESP32](https://www.espressif.com/sites/default/files/documentation/esp32_datasheet_en.pdf) · [Omron, relés](https://www.ia.omron.com/product/cautions/36/safety_precautions.html).

## Soldadura (opcional)

Si soldás, practicá con retazos sueltos y desenchufados. Gafas, extracción y soporte para el soldador. No estañes el extremo que va a apretar un borne de tornillo: para eso va una ficha crimpeada. No inhales vapores ni toques la punta.

## Antes de decir “está listo”

- El transformador es el correcto y está cerrado.
- El fusible coincide con el consumo real.
- El diodo del imán está puesto.
- El botón de salida corta el imán sin la ESP32.
- La puerta cierra, el imán traba y la armadura no roza.
- Alguien que sepa revisó las conexiones y la salida.

Si falta cualquiera de estos puntos, no es una puerta: es una demo para mirar.
