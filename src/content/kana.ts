// Contenido: hiragana y katakana.
// Cada fila tiene celdas [kana, romaji Hepburn, variantes aceptadas?]. `null` deja
// un hueco en la tabla (la fila "ya" no tiene "yi" ni "ye").
// El katakana se genera desde el hiragana: en Unicode están a 0x60 de distancia.
// Estado de validación: revisado (tabla estándar gojūon + dakuten + yōon).

export type Script = 'hiragana' | 'katakana';
export type KanaGroup = 'basic' | 'dakuten' | 'yoon';

export interface KanaItem {
  /** Identificador estable: "kana:hiragana:か". */
  id: string;
  kana: string;
  romaji: string;
  accepted: string[];
  row: string;
  group: KanaGroup;
  script: Script;
}

export const KANA_GROUPS: { id: KanaGroup; label: string; columns: number }[] = [
  { id: 'basic', label: 'Básicos', columns: 5 },
  { id: 'dakuten', label: 'Dakuten y handakuten', columns: 5 },
  { id: 'yoon', label: 'Combinados (yōon)', columns: 3 },
];

type Cell = [string, string, string[]?] | null;

const ROWS: { id: string; group: KanaGroup; cells: Cell[] }[] = [
  { id: 'a', group: 'basic', cells: [['あ', 'a'], ['い', 'i'], ['う', 'u'], ['え', 'e'], ['お', 'o']] },
  { id: 'k', group: 'basic', cells: [['か', 'ka'], ['き', 'ki'], ['く', 'ku'], ['け', 'ke'], ['こ', 'ko']] },
  { id: 's', group: 'basic', cells: [['さ', 'sa'], ['し', 'shi', ['si']], ['す', 'su'], ['せ', 'se'], ['そ', 'so']] },
  { id: 't', group: 'basic', cells: [['た', 'ta'], ['ち', 'chi', ['ti']], ['つ', 'tsu', ['tu']], ['て', 'te'], ['と', 'to']] },
  { id: 'n', group: 'basic', cells: [['な', 'na'], ['に', 'ni'], ['ぬ', 'nu'], ['ね', 'ne'], ['の', 'no']] },
  { id: 'h', group: 'basic', cells: [['は', 'ha'], ['ひ', 'hi'], ['ふ', 'fu', ['hu']], ['へ', 'he'], ['ほ', 'ho']] },
  { id: 'm', group: 'basic', cells: [['ま', 'ma'], ['み', 'mi'], ['む', 'mu'], ['め', 'me'], ['も', 'mo']] },
  { id: 'y', group: 'basic', cells: [['や', 'ya'], null, ['ゆ', 'yu'], null, ['よ', 'yo']] },
  { id: 'r', group: 'basic', cells: [['ら', 'ra'], ['り', 'ri'], ['る', 'ru'], ['れ', 're'], ['ろ', 'ro']] },
  { id: 'w', group: 'basic', cells: [['わ', 'wa'], null, null, null, ['を', 'wo', ['o']]] },
  { id: 'nn', group: 'basic', cells: [['ん', 'n', ['nn']], null, null, null, null] },

  { id: 'g', group: 'dakuten', cells: [['が', 'ga'], ['ぎ', 'gi'], ['ぐ', 'gu'], ['げ', 'ge'], ['ご', 'go']] },
  { id: 'z', group: 'dakuten', cells: [['ざ', 'za'], ['じ', 'ji', ['zi']], ['ず', 'zu'], ['ぜ', 'ze'], ['ぞ', 'zo']] },
  { id: 'd', group: 'dakuten', cells: [['だ', 'da'], ['ぢ', 'ji', ['di']], ['づ', 'zu', ['du']], ['で', 'de'], ['ど', 'do']] },
  { id: 'b', group: 'dakuten', cells: [['ば', 'ba'], ['び', 'bi'], ['ぶ', 'bu'], ['べ', 'be'], ['ぼ', 'bo']] },
  { id: 'p', group: 'dakuten', cells: [['ぱ', 'pa'], ['ぴ', 'pi'], ['ぷ', 'pu'], ['ぺ', 'pe'], ['ぽ', 'po']] },

  { id: 'ky', group: 'yoon', cells: [['きゃ', 'kya'], ['きゅ', 'kyu'], ['きょ', 'kyo']] },
  { id: 'sh', group: 'yoon', cells: [['しゃ', 'sha', ['sya']], ['しゅ', 'shu', ['syu']], ['しょ', 'sho', ['syo']]] },
  { id: 'ch', group: 'yoon', cells: [['ちゃ', 'cha', ['tya', 'cya']], ['ちゅ', 'chu', ['tyu', 'cyu']], ['ちょ', 'cho', ['tyo', 'cyo']]] },
  { id: 'ny', group: 'yoon', cells: [['にゃ', 'nya'], ['にゅ', 'nyu'], ['にょ', 'nyo']] },
  { id: 'hy', group: 'yoon', cells: [['ひゃ', 'hya'], ['ひゅ', 'hyu'], ['ひょ', 'hyo']] },
  { id: 'my', group: 'yoon', cells: [['みゃ', 'mya'], ['みゅ', 'myu'], ['みょ', 'myo']] },
  { id: 'ry', group: 'yoon', cells: [['りゃ', 'rya'], ['りゅ', 'ryu'], ['りょ', 'ryo']] },
  { id: 'gy', group: 'yoon', cells: [['ぎゃ', 'gya'], ['ぎゅ', 'gyu'], ['ぎょ', 'gyo']] },
  { id: 'j', group: 'yoon', cells: [['じゃ', 'ja', ['zya', 'jya']], ['じゅ', 'ju', ['zyu', 'jyu']], ['じょ', 'jo', ['zyo', 'jyo']]] },
  { id: 'by', group: 'yoon', cells: [['びゃ', 'bya'], ['びゅ', 'byu'], ['びょ', 'byo']] },
  { id: 'py', group: 'yoon', cells: [['ぴゃ', 'pya'], ['ぴゅ', 'pyu'], ['ぴょ', 'pyo']] },
];

/** Convierte hiragana a katakana (desplazamiento Unicode de 0x60). */
export function toKatakana(text: string): string {
  return [...text]
    .map((ch) => {
      const code = ch.codePointAt(0)!;
      return code >= 0x3041 && code <= 0x3096 ? String.fromCodePoint(code + 0x60) : ch;
    })
    .join('');
}

function build(script: Script): KanaItem[] {
  const items: KanaItem[] = [];
  for (const row of ROWS) {
    for (const cell of row.cells) {
      if (!cell) continue;
      const [hira, romaji, alts = []] = cell;
      const kana = script === 'katakana' ? toKatakana(hira) : hira;
      items.push({ id: `kana:${script}:${kana}`, kana, romaji, accepted: [romaji, ...alts], row: row.id, group: row.group, script });
    }
  }
  return items;
}

export const HIRAGANA = build('hiragana');
export const KATAKANA = build('katakana');
export const ALL_KANA = [...HIRAGANA, ...KATAKANA];

export function kanaFor(script: Script): KanaItem[] {
  return script === 'hiragana' ? HIRAGANA : KATAKANA;
}

export const KANA_ROWS = ROWS.map((r) => ({
  id: r.id,
  group: r.group,
  label: r.cells.find(Boolean)![1],
}));

/** Celdas de una fila (con huecos `null`) en el sistema pedido. */
export function rowCells(rowId: string, script: Script): (KanaItem | null)[] {
  const row = ROWS.find((r) => r.id === rowId)!;
  const list = kanaFor(script);
  return row.cells.map((cell) => {
    if (!cell) return null;
    const kana = script === 'katakana' ? toKatakana(cell[0]) : cell[0];
    return list.find((it) => it.kana === kana) ?? null;
  });
}

/**
 * Pares que se confunden visualmente con frecuencia. Se usan como distractores
 * preferentes y para etiquetar errores ("confundes シ y ツ").
 */
export const LOOKALIKES: [string, string][] = [
  ['シ', 'ツ'], ['ソ', 'ン'], ['ク', 'ケ'], ['ヌ', 'ス'], ['チ', 'テ'], ['ワ', 'ウ'], ['コ', 'ユ'], ['ナ', 'メ'],
  ['シ', 'ミ'], ['ツ', 'ソ'], ['シ', 'ン'],
  ['さ', 'き'], ['さ', 'ち'], ['ぬ', 'め'], ['ね', 'れ'], ['れ', 'わ'], ['る', 'ろ'], ['は', 'ほ'], ['い', 'り'],
  ['あ', 'お'], ['こ', 'に'], ['う', 'ら'], ['た', 'な'], ['け', 'は'],
];

export function lookalikesOf(kana: string): string[] {
  return LOOKALIKES.flatMap(([a, b]) => (a === kana ? [b] : b === kana ? [a] : []));
}
