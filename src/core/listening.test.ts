import { describe, expect, it } from 'vitest';
import { baseText, kanaReading, parseFurigana } from './furigana';
import { detectTopics, enrich, lengthOf } from '../content/listening';

describe('furigana (formato Tatoeba)', () => {
  it('reparte la lectura por carácter cuando corresponde', () => {
    expect(parseFurigana('[手伝|て|つだ]ってください')).toEqual([
      { text: '手', ruby: 'て' },
      { text: '伝', ruby: 'つだ' },
      { text: 'ってください' },
    ]);
  });

  it('usa una sola lectura para todo el bloque si no calza por carácter', () => {
    expect(parseFurigana('[今日|きょう]は')).toEqual([{ text: '今日', ruby: 'きょう' }, { text: 'は' }]);
  });

  it('reconstruye el texto original y la lectura en kana', () => {
    const m = '[冷蔵庫|れい|ぞう|こ]の[中|なか]';
    expect(baseText(m)).toBe('冷蔵庫の中');
    expect(kanaReading(m)).toBe('れいぞうこのなか');
  });

  it('texto sin kanji queda igual', () => {
    expect(parseFurigana('ありがとう')).toEqual([{ text: 'ありがとう' }]);
  });
});

describe('banco de escucha', () => {
  it('detecta temas y largo', () => {
    expect(detectTopics('駅はどこですか。')).toContain('transporte');
    expect(detectTopics('これはいくらですか。')).toContain('compras');
    expect(lengthOf('はい。')).toBe('corta');
    expect(lengthOf('冷蔵庫の中の物は、何でも御自由に召し上がってください。')).toBe('larga');
  });

  it('arma rutas de audio relativas y enlace a la fuente', () => {
    const it = enrich(
      { id: '77081', jp: 'x', reading: '', es: [], en: [], audioId: '12194', voice: 'Mizu', license: 'CC BY-NC 4.0', attribution: '' },
      './',
    );
    expect(it.audioUrl).toBe('./audio/tatoeba/12194.mp3');
    expect(it.itemId).toBe('tatoeba:77081');
    expect(it.sourceUrl).toContain('tatoeba.org');
  });
});
