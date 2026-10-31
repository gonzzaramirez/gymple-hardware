# Revisión04 — qué muestra y qué falta verificar

**La web es una demostración, no un equipo validado.** El ciclo automático no identifica un mecanismo físicamente construido. Ningún gesto didáctico habilita bloqueo real.

## Movimiento: no hay bisagra milagrosa

[El fabricante dormakaba explica](https://www.dormakaba.com/gb-en/offering/products/door-hardware/door-closers) que un cierrapuertas almacena energía cuando se abre y la libera para cerrar (sección “What are door closers?”). Esto NO acredita autoapertura. Un resorte que abre tendría que recuperar su energía para repetir; el imán no hace ese trabajo.

[ASSA ABLOY describe un operador automático separado](https://shop.assaabloy.com/entrance-systems/distribution/en/assa-abloy-sw60) con funciones de apertura/cierre. Sirve para distinguir funciones, **no como selección de ese producto para este portillo**. Apertura, retorno, control de fuerzas, obstáculos, salida y aporte de energía siguen por diseñar/revisar presencialmente. Por eso no dibujamos un motor o una bisagra con prestaciones inventadas.

En la maqueta: sin energía en el imán→movimiento deseado de apertura→energía puede volver con hoja abierta SIN CONTACTO→retorno ilustrativo→retención ideal al alinear. No hay sensor de posición, medición de retención ni garantía de liberación.

## Una fuente no es una tensión

Arquitectura candidata:

- Adaptador **externo, cerrado, aislado,12VDC**→distribución/protecciones dimensionadas.
- Rama imán: contactos adecuados a cargaDC +liberación independiente. COM–NC es hipótesis, no borne identificado.
- Rama control: DC–DC propuesto hacia tensión admisible por placa/shield; **5Vsolo si sus fichas lo admiten**. Alimentación de relé y niveles/driver/opto/masas dependen del módulo.

No poner12V enGPIO ni asumir que una entrada marcada5V acepta12V. Una señalGPIO3,3V no es la fuente de una bobina.

### Referencia de fuente, no aprobación de compra

[MEAN WELL GST25A, ficha primaria2026-04-03](https://www.meanwell.com/Upload/PDF/GST25A/GST25A-SPEC.PDF): **GST25A12-P1J,12V,2,08A** según tabla. Es una candidata documental de adaptador externo, NO la identificación de la fuente que tenés ni prueba de suficiencia del sistema. No se reproducen marcas de conformidad ni se deduce cumplimiento local del conjunto. Conector/polaridad, condiciones, cableado, protección por ramas y derating requieren revisión; no se abre ni interviene el adaptador.

Presupuesto a completar con valores verificados:

`Ientrada12V = Iimán + Pcontrol/(12V × ηDC–DC) + otras cargas12V`

No se suman corrientes de diferentes tensiones como si fueran la misma rama. Faltan consumo/picos/duty de cerradura, consumo máximo control/relé/terminal, eficiencia del buck, temperatura, caída de cable y reservas justificadas. Los300mA/12V citados para BPNET280 son aportados, no nominal corroborado ni medición. Un futuro actuador de apertura cambia por completo este presupuesto y NO está incluido. Por eso no se declara capacidad suficiente, fusible, TVS, diodo ni capacitor concreto.

### Fuentes de electrónica

- [Espressif, ESP32 datasheet](https://www.espressif.com/sites/default/files/documentation/esp32_datasheet_en.pdf): límites y niveles del chip; no identifica la placa/shield poseídos.
- [Espressif, DevKitC user guide](https://docs.espressif.com/projects/esp-dev-kits/en/latest/esp32/esp32-devkitc/user_guide.html): alternativas de alimentación mutuamente excluyentes en esa placa de referencia. No unirUSB y alimentación externa por suposición.
- [Omron, precauciones de relés](https://www.ia.omron.com/product/cautions/36/safety_precautions.html): carga/contactos reales y efectos de supresión sobre tiempo de liberación. No extrapolar el ratingAC de un relé a su cargaDC inductiva.
- [Fluke, mediciónDC](https://www.fluke.com/en-ie/learn/blog/digital-multimeters/how-to-measure-dc-voltage-with-a-digital-multimeter): COM y entradaV para tensión, noA/mA. Usar manual del instrumento. El tutorial permanece **SIN MEDIR**; no inventa un resultado aprobatorio.

## Qué se suelda y qué no

Se practica solo sobre un cupón separado sin alimentación; no sobre equipos conectados ni conductores de red. El soporte mantiene la pieza inmóvil. Preparación, consumible/flux, limpieza, temperatura y tiempos siguen las fichas reales del material/herramienta; no se inventan grados o segundos. Ventilación/extracción, ojos protegidos, manos fuera de la punta y soporte estable para el soldador son parte de la preparación. No se comprueba temperatura con los dedos.

Calentar la unión, aportar donde corresponde, retirar aporte, retirar punta, enfriar inmóvil e inspeccionar antes de aislar. Un dibujo brillante no prueba mojado, continuidad, resistencia mecánica ni ausencia de puentes. No usar el soldador para quemar aislación.

- [Weller, transferencia de calor/productividad](https://www.weller-tools.com/us/en/productivity).
- [Weller, manual de equipo y precauciones](https://www.weller-tools.com/sites/default/files/products/documents/WEL_WQB%204000SOPS_1.2.8_GB_2025.pdf): referencia de seguridad, no identifica el soldador del usuario.
- [Phoenix Contact, problemas del estañado bajo terminal de tornillo](https://assets.phoenixcontact.com/file/be20e58a-773f-4be9-a3f9-43ed9b1dc431/media/original?Problem_with_tinning_wires.pdf=): no sustituir terminación/crimp adecuado por soldadura bajo presión del tornillo.

Bornes se atornillan según fabricante; punteras se crimpan si el borne las admite. Soldadura no es requisito de una solución con borneras. El numpadPCUSB requiere host/interfaz y alimentación por determinar: no se conecta directamente aGPIO ni se infiereUSBhost de la presencia de un conectorUSB.

## Antes del piloto

Obtener fotos legibles de ambas caras/modelos/pines de ESP32, shield, relé y fuente; ficha original de cerradura y herrajes; esquema revisado de fuente/buck/ramas/liberación/protecciones; identificar terminal e interfaz. Revisar bastidor, anclajes, recorrido/alineación, energía del movimiento, riesgos de atrapamiento/obstáculo, salida cotidiana/independiente yRF en hierro con profesional. Probar liberación independiente ANTES de permitir bloqueo. No asumir municipio, norma aplicable ni conformidad legal.

Esta publicación contiene únicamente la revisión vigente de la demostración. Los antecedentes del proyecto no son planos de montaje aprobados.
