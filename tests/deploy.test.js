import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const exists = (path) => existsSync(new URL(`../${path}`, import.meta.url));

test('deployment files exist and carry the production headers', () => {
  assert.ok(exists('public/robots.txt'));
  assert.ok(exists('public/_headers'));
  const robots = read('public/robots.txt');
  assert.match(robots, /^User-agent: \*$/m);
  assert.match(robots, /^Allow: \/$/m);
  const headers = read('public/_headers');
  assert.match(headers, /Content-Security-Policy: .*default-src 'self'/);
  assert.match(headers, /X-Content-Type-Options: nosniff/);
  assert.match(headers, /X-Frame-Options: DENY/);
  assert.match(headers, /\/assets\/\*\n {2}Cache-Control: public, max-age=31536000, immutable/);
  assert.match(headers, /\/revision04-electrica\.md\n {2}Content-Type: text\/plain; charset=utf-8/);
});

test('every guide linked from the UI is shipped in public/', () => {
  const help = read('src/components/TechnicalHelp.jsx');
  const links = [...help.matchAll(/href="([^"#:]+\.md)"/g)].map((match) => match[1]);
  assert.ok(links.length >= 3, 'expected the three technical guides');
  for (const link of links) assert.ok(exists(`public/${link}`), `missing public/${link}`);
});

test('the production document declares language, description and social metadata', () => {
  const html = read('index.html');
  assert.match(html, /<html lang="es-AR">/);
  assert.match(html, /<meta name="description" content="[^"]{40,}"/);
  assert.match(html, /<meta property="og:title"/);
  assert.match(html, /<meta property="og:image" content="\/capturas\/flujo\.png"/);
  assert.match(html, /<link rel="icon" href="\/demo-icon\.svg"/);
});
