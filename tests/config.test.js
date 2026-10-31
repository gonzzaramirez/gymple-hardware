import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import config from '../vite.config.js';

test('Vite React configuration targets dist', () => {
  const pkg=JSON.parse(readFileSync(new URL('../package.json',import.meta.url)));
  assert.equal(pkg.scripts.dev,'vite');
  assert.equal(pkg.scripts.build,'vite build');
  assert.equal(config.build.outDir,'dist');
  assert.equal(config.base,'/');
  assert.ok(config.plugins.flat().some(p=>p.name.includes('react')));
  assert.ok(pkg.dependencies.react && pkg.dependencies['react-dom']);
});

test('entry is a real JSX module, not classic-script static HTML', () => {
  const entry=readFileSync(new URL('../index.html',import.meta.url),'utf8');
  assert.match(entry,/type="module" src="\/src\/main.jsx"/);
  assert.doesNotMatch(entry,/<section|script defer|cdn/i);
  const app=readFileSync(new URL('../src/App.jsx',import.meta.url),'utf8');
  assert.match(app,/<FlowView/);
  assert.match(app,/<PartsView/);
  assert.match(app,/<TutorialView/);
  assert.doesNotMatch(app,/dangerouslySetInnerHTML/);
});
