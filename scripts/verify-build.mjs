import { readFileSync, existsSync, statSync, readdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = resolve(root, 'dist');
const failures = [];

const check = (condition, message) => {
  if (!condition) failures.push(message);
};

const read = (path) => readFileSync(path, 'utf8');

// 1. The production entry must be the built Vite document, not a source file.
const indexPath = resolve(dist, 'index.html');
check(existsSync(indexPath), 'Missing dist/index.html. Run npm run build first.');
if (existsSync(indexPath)) {
  const html = read(indexPath);
  check(/<script[^>]+type="module"[^>]+src="\/assets\/[^"]+\.js"/.test(html), 'dist/index.html has no hashed module entry.');
  check(/<link[^>]+rel="stylesheet"[^>]+href="\/assets\/[^"]+\.css"/.test(html), 'dist/index.html has no hashed stylesheet.');
  check(!html.includes('/src/'), 'dist/index.html still references the source tree (/src/).');
  check(!html.includes('node_modules'), 'dist/index.html references node_modules.');
  check(html.includes('lang="es-AR"'), 'dist/index.html lost its es-AR language.');
}

// 2. Every local asset referenced by the document must exist and be non-empty.
const html = existsSync(indexPath) ? read(indexPath) : '';
const references = [...html.matchAll(/(?:src|href)="(\/[^"#?]+)"/g)].map((match) => match[1]);
for (const reference of new Set(references)) {
  const path = resolve(dist, `.${reference}`);
  check(existsSync(path), `Referenced asset is missing: ${reference}`);
  if (existsSync(path)) check(statSync(path).size > 0, `Referenced asset is empty: ${reference}`);
}

// 3. Public files that clients open from the UI must survive the build.
const required = [
  'demo-icon.svg',
  'robots.txt',
  '_headers',
  'guia-uso.md',
  'QA.md',
  'revision04-electrica.md',
  'capturas/flujo.png',
  'capturas/partes.png',
  'capturas/tutorial.png',
  'capturas/soldadura-detalle.png',
];
for (const file of required) {
  const path = resolve(dist, file);
  check(existsSync(path), `Missing public file in dist: ${file}`);
  if (existsSync(path)) check(statSync(path).size > 0, `Empty public file in dist: ${file}`);
}

// 4. Bound the shipped JavaScript and prove there is a single hashed bundle pair.
const assets = resolve(dist, 'assets');
if (existsSync(assets)) {
  const files = readdirSync(assets);
  const bundles = files.filter((file) => file.endsWith('.js'));
  const styles = files.filter((file) => file.endsWith('.css'));
  check(bundles.length === 1, `Expected one JS bundle, found ${bundles.length}.`);
  check(styles.length === 1, `Expected one CSS bundle, found ${styles.length}.`);
  for (const file of [...bundles, ...styles]) {
    const size = statSync(resolve(assets, file)).size;
    check(size < 600 * 1024, `Bundle is unexpectedly large: ${file} (${Math.round(size / 1024)} kB).`);
  }
}

if (failures.length) {
  console.error(`verify-build: ${failures.length} problem(s)`);
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}
console.log('verify-build: dist is complete (entry, hashed assets, public files, headers).');
