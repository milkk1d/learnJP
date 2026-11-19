// Datos de hiragana y katakana.
// Cada fila tiene celdas [kana, romaji, alternativas?]. `null` deja un hueco
// en la tabla (por ejemplo la fila de "ya" no tiene "yi" ni "ye").
// El katakana se genera desde el hiragana: en Unicode están a 0x60 de distancia.

export const GROUPS = [
  { id: 'basic', label: 'Básicos', columns: 5 },
  { id: 'dakuten', label: 'Dakuten (が, ぱ…)', columns: 5 },
  { id: 'yoon', label: 'Combinados', columns: 3 },
];

const ROWS = [
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

export const SCRIPTS = [
  { id: 'hiragana', label: 'Hiragana', native: 'ひらがな' },
  { id: 'katakana', label: 'Katakana', native: 'カタカナ' },
];

/** Convierte hiragana a katakana (desplazamiento Unicode de 0x60). */
export function toKatakana(text) {
  return [...text]
    .map((ch) => {
      const code = ch.codePointAt(0);
      return code >= 0x3041 && code <= 0x3096 ? String.fromCodePoint(code + 0x60) : ch;
    })
    .join('');
}

/** Nombre corto de una fila, para los botones de selección ("a", "ka", "kya"...). */
function rowLabel(row) {
  const first = row.cells.find(Boolean);
  return first[1];
}

/** Filas con su etiqueta, para dibujar tablas y selectores. */
export const ROW_INFO = ROWS.map((row) => ({ id: row.id, group: row.group, label: rowLabel(row) }));

/**
 * Todos los caracteres de un sistema de escritura.
 * Devuelve objetos { id, kana, romaji, accepted, row, group, script }.
 */
export function itemsFor(script) {
  const items = [];
  for (const row of ROWS) {
    for (const cell of row.cells) {
      if (!cell) continue;
      const [hira, romaji, alts = []] = cell;
      const kana = script === 'katakana' ? toKatakana(hira) : hira;
      items.push({
        id: `${script}:${kana}`,
        kana,
        romaji,
        accepted: [romaji, ...alts],
        row: row.id,
        group: row.group,
        script,
      });
    }
  }
  return items;
}

/** Celdas de una fila (con huecos `null`) ya convertidas al sistema pedido. */
export function rowCells(rowId, script) {
  const row = ROWS.find((r) => r.id === rowId);
  const all = itemsFor(script);
  return row.cells.map((cell) => {
    if (!cell) return null;
    const kana = script === 'katakana' ? toKatakana(cell[0]) : cell[0];
    return all.find((it) => it.kana === kana);
  });
}

export const ALL_ITEMS = [...itemsFor('hiragana'), ...itemsFor('katakana')];
