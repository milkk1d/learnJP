// Agrega romaji Hepburn a cada frase del banco de escucha (src/content/listening/tatoeba.json).
// Usa kuromoji (analizador morfológico) para separar palabras y reconocer partículas.
// Uso: node scripts/add_romaji.ts
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { tokensToRomaji, type Token } from '../src/core/romaji.ts';
import { parseFurigana } from '../src/core/furigana.ts';

const require = createRequire(import.meta.url);
const kuromoji = require('kuromoji');
const root = path.dirname(path.dirname(new URL(import.meta.url).pathname));
const file = path.join(root, 'src/content/listening/tatoeba.json');
const dicPath = path.join(root, 'node_modules/kuromoji/dict');

kuromoji.builder({ dicPath }).build((err: Error | null, tokenizer: any) => {
  if (err) throw err;
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  for (const it of data.items) {
    // Lecturas de Tatoeba por carácter (más confiables para kanji ambiguos como 行った).
    // Los tramos sin kanji se separan por carácter para poder cortarlos en cualquier palabra.
    const segs = (it.reading ? parseFurigana(it.reading) : []).flatMap((sg) => (sg.ruby ? [sg] : [...sg.text].map((c) => ({ text: c }))));
    const charSeg: number[] = [];
    segs.forEach((sg, i) => [...sg.text].forEach(() => charSeg.push(i)));
    const aligned = segs.length > 0 && segs.map((x) => x.text).join('') === it.jp;
    let pos = 0;
    const tokens: Token[] = tokenizer.tokenize(it.jp).map((t: any) => {
      const len = [...t.surface_form].length;
      let reading = t.reading;
      if (aligned) {
        const ids = [...new Set(charSeg.slice(pos, pos + len))];
        const start = charSeg.indexOf(ids[0]);
        const end = charSeg.lastIndexOf(ids[ids.length - 1]) + 1;
        // Solo si la palabra cubre segmentos completos (no corta un bloque de kanji a la mitad).
        if (start === pos && end === pos + len) reading = ids.map((i) => segs[i].ruby ?? segs[i].text).join('');
      }
      pos += len;
      return { surface: t.surface_form, reading, pos: t.pos, posDetail1: t.pos_detail_1 };
    });
    it.romaji = tokensToRomaji(tokens);
  }
  data.romajiNote = 'Romaji Hepburn generado automáticamente con kuromoji; puede tener errores puntuales.';
  fs.writeFileSync(file, JSON.stringify(data, null, 0).replace(/\},\{/g, '},\n{'));
  console.log(`romaji agregado a ${data.items.length} frases`);
});
