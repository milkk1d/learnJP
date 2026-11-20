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

import { kanaToRomaji, tokensToRomaji } from './romaji';

describe('romaji Hepburn', () => {
  it('convierte kana con vocales largas, っ y ん', () => {
    expect(kanaToRomaji('トウキョウ')).toBe('tōkyō');
    expect(kanaToRomaji('ガッコウ')).toBe('gakkō');
    expect(kanaToRomaji('チョット')).toBe('chotto');
    expect(kanaToRomaji('マッチャ')).toBe('matcha');
    expect(kanaToRomaji('コーヒー')).toBe('kōhī');
    expect(kanaToRomaji('センセイ')).toBe('sensei');
    expect(kanaToRomaji('フンイキ')).toBe("fun'iki");
    expect(kanaToRomaji('シンカンセン')).toBe('shinkansen');
    expect(kanaToRomaji('おもう', { isVerb: true })).toBe('omou');
  });

  it('lee las partículas は, を, へ como wa, o, e', () => {
    const t = (surface: string, reading: string, pos: string, posDetail1 = '') => ({ surface, reading, pos, posDetail1 });
    expect(
      tokensToRomaji([
        t('すみません', 'スミマセン', '感動詞'),
        t('、', '、', '記号'),
        t('駅', 'エキ', '名詞'),
        t('は', 'ハ', '助詞', '係助詞'),
        t('どこ', 'ドコ', '名詞'),
        t('です', 'デス', '助動詞'),
        t('か', 'カ', '助詞', '副助詞／並立助詞／終助詞'),
        t('。', '。', '記号'),
      ]),
    ).toBe('Sumimasen, eki wa doko desu ka.');
    expect(tokensToRomaji([t('水', 'ミズ', '名詞'), t('を', 'ヲ', '助詞', '格助詞'), t('ください', 'クダサイ', '動詞', '非自立')])).toBe('Mizu o kudasai');
  });

  it('une っ entre palabras y los auxiliares al verbo', () => {
    const t = (surface: string, reading: string, pos: string, posDetail1 = '') => ({ surface, reading, pos, posDetail1 });
    expect(tokensToRomaji([t('分かっ', 'ワカッ', '動詞'), t('て', 'テ', '助詞', '接続助詞'), t('ます', 'マス', '助動詞')])).toBe('Wakattemasu');
    expect(tokensToRomaji([t('行き', 'イキ', '動詞'), t('まし', 'マシ', '助動詞'), t('た', 'タ', '助動詞')])).toBe('Ikimashita');
  });
});
