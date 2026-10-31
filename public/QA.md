# Verificación — migración Vite + React

**Revisión visual/técnica independiente favorable como maqueta y taller didáctico.** No es aprobación de un equipo físico, soldadura real ni instalación.

## Alcance de esta revisión

La entrada actual es un proyectoVite+React con JSX/ESM locales. Se verifican tests y navegador contra ViteDEV, no un bundle de producción. **Build no ejecutado** por instrucción expresa; no se valida dist ni despliegueCloudflare. La revisión visual/técnica de la geometría conservada se describe abajo.

## Verificado ahora en ViteDEV

- npm test:6tests PASS sobre modelos, fixtures, pausa/falla,17partes/33lecciones y configuraciónViteReact. El test de configuración NO ejecuta un build.
- Navegador real en http://127.0.0.1:5173/: numpad8clics yEnter físico, dobleEnter, pausa/tabs/continuación, ciclo ilustrativo completo y denegado sin liberar.
-17selecciones de partes y33acciones×3poses: representaciones presentes, IDsúnicos y progreso finito.
- Velocidad inicial1× y1,5×: se corrigió una regresión real de conversiónJSX, que generabaNaN por defaultValue indebido enoption. Reprobado favorablemente.
- StrictMode instrumentado:6observerscreados/3desconectados/3activos; listeners del primer montaje retirados; sinrAFpendiente en reposo ni traspausa.
- Reactposee navegación, tema, JSX y listas; motorAnatomy con ciclo devida explícito actualiza SVG/readouts/propiedades de controles sinrenderReactporframe.
- PNGdesktop/móvil390/clarooscuro y reducedmotion revisados independientemente: sin regresiones visuales relevantes. Teclado/tabspause y tema no reinician el modelo.
- Almacenamiento bloqueado funciona; el guardado normal solo escribe33booleanos didácticos en su revisión, conserva4namespacesprevios y no guardaDNI.
- Escenarios observados:0requests externos,0fetch,0XHR y1WebSocketLOCAL deViteHMR. El tráficoESM/HMRlocal es esperado; no hay APIservidorDNI niCDN.
- Consola limpia. No se generó dist ni ZIPdeproducción, no se ejecutó npm run build y no se desplegóCloudflare.

## Geometría conservada, verificada antes de migrar

La revisión previa inspeccionó ciclo17cuadros, soldadura4× y72comprobaciones de extremos de líneas, después de corregir solape/película longitudinal y regla. Esas comprobaciones NO son un audit3D completo ni un build de esta revisiónVite. Se conservan los modelos y escenas, y se volvió a revisar la apariencia enDEV.

## Límites

No se probó el bundle de producción ni el despliegueCloudflare. No se ejecutó auditoría3D completa de volúmenes/colisiones/apoyos en todos los ángulos. No se midióFPS/GPU ni se probó teléfono físico, Firefox/Safari o lector de pantalla. No hubo ensayos eléctricos, térmicos, mecánicos, de salida/obstáculos/RF ni certificación.

Mecanismo y energía de apertura/retorno por definir. Los componentes son candidatos; faltan fichas/modelos, circuito/pinout, niveles y masas, dimensionamiento, protecciones y revisión presencial antes de permitir bloqueo. El adaptador de referencia no es una compra aprobada. Ninguna animación niSINMEDIR aprueba retención, continuidad o seguridad.

## Capturas

[FlujoDEV](capturas/flujo.png) · [PartesDEV](capturas/partes.png) · [TutorialDEV](capturas/tutorial.png) · [Soldadura4× de geometría conservada](capturas/soldadura-detalle.png) · [Ciclo de geometría conservada](capturas/ciclo.png).
