import test from 'node:test';
import assert from 'node:assert/strict';
import { GympleFlow as F } from '../src/lab/gymple-flow.js';
import { GympleContent as C } from '../src/lab/gymple-content.js';

test('exact fixtures, duplicate Enter and complete illustrative cycle', () => {
  const state=F.create();
  F.fill(state,'allow');
  assert.equal(F.submit(state),true);
  assert.equal(F.submit(state),false);
  let sawPoweredOpen=false;
  for(let i=0;i<900;i++) {
    F.tick(state,1/30);
    if(state.angle>0) {
      assert.equal(F.electrical(state).retained,false);
      sawPoweredOpen ||= F.electrical(state).magnet===true;
    }
  }
  assert.equal(sawPoweredOpen,true);
  assert.equal(state.phase,'complete');
  assert.equal(state.angle,0);
  assert.equal(F.electrical(state).retained,true);
});

test('deny and arbitrary eight digits never release', () => {
  for(const input of ['22222222','12345678']) {
    const state=F.create();
    for(const digit of input) F.edit(state,digit);
    F.submit(state);
    for(let i=0;i<900;i++) F.tick(state,1/30);
    assert.equal(state.angle,0);
    assert.equal(F.electrical(state).magnet,true);
    assert.notEqual(state.phase,'released');
  }
});

test('pause and fault cancel motion without queued actuation', () => {
  const state=F.create();F.fill(state,'allow');F.submit(state);
  for(let i=0;i<60;i++)F.tick(state,1/30);
  state.paused=true;
  const angle=state.angle;
  for(let i=0;i<100;i++)F.tick(state,1/30);
  assert.equal(state.angle,angle);
  F.fault(state,'power');
  for(let i=0;i<900;i++)F.tick(state,1/30);
  assert.equal(state.angle,angle);
  assert.equal(state.phase,'fault');
  assert.equal(F.electrical(state).magnet,false);
});

test('current content is 17 parts and 33 lessons; measurement before connections', () => {
  assert.equal(Object.keys(C.parts).length,17);
  assert.equal(C.lessons.length,33);
  assert.ok(C.lessons.findIndex(l=>l.scene==='probe')<C.lessons.findIndex(l=>l.scene==='route'));
  assert.ok(C.lessons.some(l=>l.scene==='solder-tip'));
});
