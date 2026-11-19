import test from 'node:test';
import assert from 'node:assert/strict';
import { itemsFor, toKatakana, ROW_INFO, rowCells, ALL_ITEMS } from '../js/kana.js';

test('hay 104 caracteres por sistema (46 básicos + 25 dakuten + 33 combinados)', () => {
  assert.equal(itemsFor('hiragana').length, 104);
  assert.equal(itemsFor('katakana').length, 104);
  const basic = itemsFor('hiragana').filter((it) => it.group === 'basic');
  assert.equal(basic.length, 46);
});

test('la conversión a katakana es correcta', () => {
  assert.equal(toKatakana('あいうえお'), 'アイウエオ');
  assert.equal(toKatakana('しゃ'), 'シャ');
  assert.equal(toKatakana('ん'), 'ン');
  assert.equal(toKatakana('を'), 'ヲ');
  assert.equal(toKatakana('ぢ'), 'ヂ');
});

test('los ids y caracteres no se repiten', () => {
  const ids = ALL_ITEMS.map((it) => it.id);
  assert.equal(new Set(ids).size, ids.length);
  const hira = itemsFor('hiragana').map((it) => it.kana);
  assert.equal(new Set(hira).size, hira.length);
});

test('el romaji principal siempre está entre las respuestas aceptadas', () => {
  for (const it of ALL_ITEMS) {
    assert.equal(it.accepted[0], it.romaji);
    for (const r of it.accepted) assert.match(r, /^[a-z]+$/);
  }
});

test('cada fila conserva su ancho de tabla', () => {
  for (const row of ROW_INFO) {
    const width = rowCells(row.id, 'hiragana').length;
    assert.equal(width, row.group === 'yoon' ? 3 : 5, `fila ${row.id}`);
  }
});
