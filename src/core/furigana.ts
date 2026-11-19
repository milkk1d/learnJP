// Lecturas en formato de Tatoeba: "[漢字|かん|じ]を[読|よ]む".
// Cada bloque [base|r1|r2…] tiene una lectura por carácter de la base, o una sola para todo el bloque.

export interface RubySegment {
  text: string;
  ruby?: string;
}

const BLOCK = /\[([^\]|]+)((?:\|[^\]|]*)+)\]/g;

export function parseFurigana(markup: string): RubySegment[] {
  const out: RubySegment[] = [];
  let last = 0;
  for (const m of markup.matchAll(BLOCK)) {
    if (m.index! > last) out.push({ text: markup.slice(last, m.index) });
    const base = m[1];
    const readings = m[2].slice(1).split('|');
    const chars = [...base];
    if (readings.length === chars.length && readings.every((r) => r.length > 0)) {
      chars.forEach((c, i) => out.push({ text: c, ruby: readings[i] }));
    } else {
      out.push({ text: base, ruby: readings.join('') });
    }
    last = m.index! + m[0].length;
  }
  if (last < markup.length) out.push({ text: markup.slice(last) });
  return out;
}

/** Lectura completa en kana (para mostrar sin kanji). */
export function kanaReading(markup: string): string {
  return parseFurigana(markup)
    .map((s) => s.ruby ?? s.text)
    .join('');
}

/** Texto base sin lecturas (debe coincidir con la frase original). */
export function baseText(markup: string): string {
  return parseFurigana(markup)
    .map((s) => s.text)
    .join('');
}
