import test from 'node:test';
import assert from 'node:assert/strict';
import { PortilloArt as A } from '../src/lab/portillo-geometry.js';
import { GympleContent as C } from '../src/lab/gymple-content.js';

test('every drawn part has a catalog entry', () => {
  const ids = new Set();
  for (const item of A.gate(0, 0)) ids.add(item.part);
  for (const item of A.electronics(1)) ids.add(item.part);
  for (const id of ids) assert.ok(C.parts[id], `missing catalog entry for ${id}`);
});

test('the five groups cover every part exactly once', () => {
  const grouped = new Set();
  for (const group of C.groups) {
    assert.ok(group.id && group.name, 'group needs id and name');
    for (const [id, part] of Object.entries(C.parts)) {
      if (part.group !== group.id) continue;
      assert.ok(!grouped.has(id), `${id} appears in two groups`);
      grouped.add(id);
    }
  }
  assert.equal(grouped.size, Object.keys(C.parts).length);
});

test('copy avoids Spain vocabulary and keeps the MVP story', () => {
  const text = JSON.stringify(C);
  assert.doesNotMatch(text, /\bportillo\b|\bmóvil\b|\bordenador\b|\bcajón\b|\bmando\b/i);
  assert.match(text, /caja impresa/i);
  assert.match(text, /un solo cargador para todo/i);
  assert.match(text, /un cable corto/i);
  assert.match(text, /la hace herrería/i);
  assert.equal(C.groups.length, 5);
  assert.equal(Object.keys(C.parts).length, 18);
  assert.ok(!('lessons' in C), 'no hay tutorial por pasos: lo reemplaza el conjunto explosionado');
  for (const id of ['jamb', 'magnet', 'source', 'exit']) assert.ok(C.parts[id], `falta la pieza ${id}`);
});
