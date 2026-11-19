import test from 'node:test';
import assert from 'node:assert/strict';
import { itemsFor, ALL_ITEMS } from '../js/kana.js';
import { update, mastery, pickNext, isCorrect, normalize, buildChoices, emptyStat } from '../js/srs.js';

const hira = itemsFor('hiragana');
const find = (kana) => ALL_ITEMS.find((it) => it.kana === kana);

function seeded(seed = 1) {
  return () => {
    seed = (seed * 1103515245 + 12345) % 2 ** 31;
    return seed / 2 ** 31;
  };
}

test('acertar sube de caja y fallar baja dos', () => {
  let s = emptyStat();
  for (let i = 0; i < 4; i++) s = update(s, true, 1);
  assert.equal(s.box, 4);
  assert.equal(mastery(s), 3);
  s = update(s, false, 2);
  assert.equal(s.box, 2);
  assert.equal(s.seen, 5);
  assert.equal(s.correct, 4);
  for (let i = 0; i < 10; i++) s = update(s, true);
  assert.equal(s.box, 5);
});

test('un carácter nunca visto es "nuevo"', () => {
  assert.equal(mastery(undefined), 0);
  assert.equal(mastery(update(emptyStat(), false)), 1);
});

test('las respuestas escritas aceptan variantes de romanización', () => {
  assert.ok(isCorrect('shi', find('し')));
  assert.ok(isCorrect('SI', find('し')));
  assert.ok(isCorrect(' tsu ', find('つ')));
  assert.ok(isCorrect('fu', find('フ')));
  assert.ok(isCorrect('hu', find('ふ')));
  assert.ok(isCorrect('o', find('を')));
  assert.ok(!isCorrect('ka', find('き')));
  assert.ok(!isCorrect('', find('あ')));
  assert.equal(normalize('Ká!'), 'ka');
});

test('pickNext no repite el último y prefiere lo menos dominado', () => {
  const items = hira.filter((it) => it.row === 'a');
  const stats = {};
  for (const it of items.slice(1)) stats[it.id] = { box: 5, seen: 10, correct: 10, last: 0 };
  const rng = seeded(7);
  let weak = 0;
  for (let i = 0; i < 400; i++) {
    const it = pickNext(items, stats, null, rng);
    if (it.id === items[0].id) weak++;
  }
  assert.ok(weak > 300, `el débil salió ${weak} de 400`);
  for (let i = 0; i < 50; i++) {
    assert.notEqual(pickNext(items, stats, items[0].id, rng).id, items[0].id);
  }
});

test('las opciones incluyen la respuesta y no tienen dos con la misma lectura', () => {
  const rng = seeded(3);
  for (const answer of ALL_ITEMS) {
    const choices = buildChoices(answer, ALL_ITEMS, 4, rng);
    assert.equal(choices.length, 4);
    assert.ok(choices.includes(answer));
    const readings = choices.flatMap((c) => c.accepted);
    assert.equal(new Set(readings).size, readings.length, `opciones de ${answer.kana}`);
  }
});

test('じ y ぢ nunca aparecen juntas como opciones', () => {
  const rng = seeded(11);
  const ji = find('じ');
  const dakuten = hira.filter((it) => it.group === 'dakuten');
  for (let i = 0; i < 100; i++) {
    const kana = buildChoices(ji, dakuten, 4, rng).map((c) => c.kana);
    assert.ok(!kana.includes('ぢ'));
  }
});
