# Gymple — Vite + React

Laboratorio visual Anatomy: **tres vistas**, numpad de PC frontal, ciclo ilustrativo del portillo, 17 partes y tutorial de 33 acciones. No es un control de acceso validado ni una demostración de identidad real. El mecanismo físico de apertura/retorno sigue por definir.

## Estado

Versión **1.0.0**, lista para presentar como demostración local. El build de producción se ejecuta y se verifica; ver [Verificación](#verificación).

## Desarrollo

Node **24.11.0** probado (Vite requiere 20.19+/22.12+; este proyecto declara 22.12+). Dependencias exactas en package-lock.json: Vite 8.3.5, React/ReactDOM 19.3.1 y plugin React 6.1.2.

```sh
npm ci
npm run dev
```

Abrí http://127.0.0.1:5173 y probá 11111111 + Enter. 22222222 deniega; ningún otro número autoriza. No ingreses DNI reales. La app no guarda ni transmite la entrada ni controla equipos. Los checks guardan solo comprensión didáctica.

## Verificación

```sh
npm run verify   # tests + build + control del contenido de dist
```

`verify` falla si falta el HTML de producción, si quedó una referencia a `/src/`, si un asset referenciado no existe, si no se copiaron las guías/robots/headers o si el bundle se sale del presupuesto.

Prueba del build servido:

```sh
npm run build
npm run preview   # http://127.0.0.1:4173
```

## Estructura

- `src/App.jsx`: estado React de vistas/tema y ciclo de vida.
- `src/components/`: UI JSX de flujo, catálogo, tutorial y ayuda; listas/opciones renderizadas por React.
- `src/lab/`: modelos puros, contenido y control de animación. El motor escribe SVG/readouts/propiedades de sus controles mediante una frontera imperativa con limpieza explícita; no provoca renders React por frame.
- `src/anatomy/`: geometría local licenciada, módulos ESM sin CDN.
- `public/`: guías, capturas, `robots.txt` y `_headers`; Vite los copia a `dist/`.
- `tests/`: modelos, configuración y contrato de despliegue, sin ejecutar build.
- `scripts/verify-build.mjs`: control del contenido de `dist`.

StrictMode está activo: el efecto dispone rAF, observers, listeners y handlers antes de montarse otra vez. Vite DEV usa peticiones de módulos y WebSocket HMR locales; eso no es un servidor de validación de DNI.

## Producción / Cloudflare Pages

El build se ejecutó y se validó sobre el bundle servido, no solo sobre DEV. `dist/` es la única carpeta que se publica.

| Campo | Valor |
|---|---|
| Framework | Vite |
| Production branch | main |
| Root directory | `/` (raíz de este repositorio) |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node | 24.11.0, declarado en `.node-version` |

Pasos:

1. `npm ci && npm run verify`.
2. Conectar el repositorio en Cloudflare Pages con la tabla de arriba, o subir el build con `npx wrangler pages deploy dist --project-name gymple-hardware`.
3. Comprobar la URL de preview: las tres vistas, el ciclo completo, el tutorial y el cambio de tema.

`public/_headers` define CSP, cabeceras de seguridad, caché inmutable para `/assets/*` y `text/plain; charset=utf-8` para las guías Markdown. `public/robots.txt` permite la indexación. La app tiene tres vistas en una sola página y no usa router de cliente, así que no necesita reglas de rewrite.

Nunca publicar `node_modules`, `src/` ni el repositorio como si fuera el bundle final.

[Guía oficial Vite](https://vite.dev/guide/) · [React createRoot](https://react.dev/reference/react-dom/client/createRoot) · [React StrictMode](https://react.dev/reference/react/StrictMode) · [Cloudflare Pages](https://developers.cloudflare.com/pages/framework-guides/deploy-a-react-site/).

## Guías y límites

[Uso](public/guia-uso.md) · [Electricidad, soldadura y fuentes](public/revision04-electrica.md) · [Verificación y límites](public/QA.md).

Sin backend, firmware, DNI reales, secretos ni historial interno. La fuente de referencia y la soldadura didáctica no aprueban montaje, seguridad ni egress. Recursos Anatomy conservan [su licencia](src/anatomy/LICENSE.txt); no se asigna otra licencia al proyecto.
