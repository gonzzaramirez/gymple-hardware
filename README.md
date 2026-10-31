# Gymple — Vite + React

Laboratorio visual Anatomy: **tres vistas**, numpadPCfrontal, ciclo ilustrativo del portillo,17partes y tutorial de33acciones. No es un control de acceso validado ni una demostración de identidad real. El mecanismo físico de apertura/retorno sigue por definir.

## Desarrollo

Node **24.11.0** probado (Vite requiere20.19+/22.12+; este proyecto declara22.12+). Dependencias exactas en package-lock.json: Vite8.3.5, React/ReactDOM19.3.1 y pluginReact6.1.2.

```sh
npm ci
npm run dev
npm test
```

Abrí http://127.0.0.1:5173 y probá11111111+Enter.22222222 deniega; ningún otro número autoriza. No ingreses DNI reales. La app no guarda ni transmite la entrada ni controla equipos. Los checks guardan solo comprensión didáctica.

## Estructura

- src/App.jsx: estadoReact de vistas/tema y ciclo de vida.
- src/components/: UI JSX real de flujo, catálogo, tutorial y ayuda; listas/opciones renderizadas por React.
- src/lab/: modelos puros, contenido y control de animación. El motor escribe SVG/readouts/propiedades de sus controles mediante una fronteraimperativa con limpieza explícita; no provoca rendersReact por frame.
- src/anatomy/: geometría local licenciada, módulosESM sin CDN.
- public/: guías públicas y capturas; Vite las sirve/copiará con rutas raíz.
- tests/: modelos y configuración, sin ejecutarbuild.

StrictMode está activo: el efecto dispone rAF, observers, listeners y handlers antes de montarse otra vez. ViteDEV usa peticiones de módulos yWebSocketHMR locales; eso no es un servidor de validaciónDNI.

## Producción / Cloudflare Pages

**No se ejecutó build** por la instrucción del proyecto “Never build after changes”. Sí se verificaron configuración, tests y navegador con servidorViteDEV. La salida de producción y el despliegue NO están validados.

Configuración prevista cuando se autorice la cuentaCloudflare:

| Campo | Valor |
|---|---|
| Framework | Vite |
| Production branch | main |
| Root directory | / (raíz del repositorio; campo vacío enUI) |
| Build command | npm run build |
| Build output directory | dist |
| Node |24.11.0, declarado en .node-version |

El script build está configurado para generar dist, pero queda **sin ejecutar** en esta entrega. No hay proyectoCloudflare, dominio, cuenta ni despliegue creados. Nunca publicar node_modules ni la fuente como si fuera el bundlefinal.

[Guía oficialVite](https://vite.dev/guide/) · [React createRoot](https://react.dev/reference/react-dom/client/createRoot) · [React StrictMode](https://react.dev/reference/react/StrictMode) · [CloudflareReact](https://developers.cloudflare.com/pages/framework-guides/deploy-a-react-site/).

## Guías y límites

[Uso](public/guia-uso.md) · [Electricidad, soldadura y fuentes](public/revision04-electrica.md) · [Verificación y límites](public/QA.md).

La versión anterior se publicó erróneamente como HTMLestático. Esta revisión lo reemplaza por un proyectoVite+React real. El ZIPestático viejo se retiró de la entrega actual; sigue accesible en la historiaGit, no se presenta como bundleVite. El fuenteVite no funciona abriendo index.html por file://: requiere servidorDEV o una salida de producción compilada. No se generó un ZIP/dist por la prohibición de build.

Sin backend, firmware, DNI reales, secretos ni historial interno. La fuente de referencia y la soldadura didáctica no aprueban montaje, seguridad ni egress. RecursosAnatomy conservan [su licencia](src/anatomy/LICENSE.txt); no se asigna otra licencia al proyecto.
