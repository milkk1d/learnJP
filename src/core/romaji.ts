// Conversión a romaji Hepburn (modificado) a partir de lecturas en katakana.
// Se usa en el script de contenido junto con un analizador morfológico (kuromoji),
// que indica qué palabras son partículas: は→wa, へ→e, を→o.
// Reglas: vocales largas con macrón (おう/おお→ō, うう→ū, ー), えい se mantiene "ei",
// っ dobla la consonante (っち→tchi), ん antes de vocal o y → n'.

const BASE: Record<string, string> = {
  ア: 'a', イ: 'i', ウ: 'u', エ: 'e', オ: 'o',
  カ: 'ka', キ: 'ki', ク: 'ku', ケ: 'ke', コ: 'ko',
  サ: 'sa', シ: 'shi', ス: 'su', セ: 'se', ソ: 'so',
  タ: 'ta', チ: 'chi', ツ: 'tsu', テ: 'te', ト: 'to',
  ナ: 'na', ニ: 'ni', ヌ: 'nu', ネ: 'ne', ノ: 'no',
  ハ: 'ha', ヒ: 'hi', フ: 'fu', ヘ: 'he', ホ: 'ho',
  マ: 'ma', ミ: 'mi', ム: 'mu', メ: 'me', モ: 'mo',
  ヤ: 'ya', ユ: 'yu', ヨ: 'yo',
  ラ: 'ra', リ: 'ri', ル: 'ru', レ: 're', ロ: 'ro',
  ワ: 'wa', ヰ: 'i', ヱ: 'e', ヲ: 'o', ン: 'n',
  ガ: 'ga', ギ: 'gi', グ: 'gu', ゲ: 'ge', ゴ: 'go',
  ザ: 'za', ジ: 'ji', ズ: 'zu', ゼ: 'ze', ゾ: 'zo',
  ダ: 'da', ヂ: 'ji', ヅ: 'zu', デ: 'de', ド: 'do',
  バ: 'ba', ビ: 'bi', ブ: 'bu', ベ: 'be', ボ: 'bo',
  パ: 'pa', ピ: 'pi', プ: 'pu', ペ: 'pe', ポ: 'po',
  ヴ: 'vu', ァ: 'a', ィ: 'i', ゥ: 'u', ェ: 'e', ォ: 'o', ヮ: 'wa',
};

const DIGRAPHS: Record<string, string> = {
  キャ: 'kya', キュ: 'kyu', キョ: 'kyo', シャ: 'sha', シュ: 'shu', ショ: 'sho', シェ: 'she',
  チャ: 'cha', チュ: 'chu', チョ: 'cho', チェ: 'che', ニャ: 'nya', ニュ: 'nyu', ニョ: 'nyo',
  ヒャ: 'hya', ヒュ: 'hyu', ヒョ: 'hyo', ミャ: 'mya', ミュ: 'myu', ミョ: 'myo',
  リャ: 'rya', リュ: 'ryu', リョ: 'ryo', ギャ: 'gya', ギュ: 'gyu', ギョ: 'gyo',
  ジャ: 'ja', ジュ: 'ju', ジョ: 'jo', ジェ: 'je', ヂャ: 'ja', ヂュ: 'ju', ヂョ: 'jo',
  ビャ: 'bya', ビュ: 'byu', ビョ: 'byo', ピャ: 'pya', ピュ: 'pyu', ピョ: 'pyo',
  ファ: 'fa', フィ: 'fi', フェ: 'fe', フォ: 'fo', ティ: 'ti', ディ: 'di', トゥ: 'tu', ドゥ: 'du',
  ウィ: 'wi', ウェ: 'we', ウォ: 'wo', ヴァ: 'va', ヴィ: 'vi', ヴェ: 've', ヴォ: 'vo', デュ: 'dyu', テュ: 'tyu',
};

const MACRON: Record<string, string> = { a: 'ā', i: 'ī', u: 'ū', e: 'ē', o: 'ō' };

/** Hiragana → katakana para poder usar una sola tabla. */
function toKata(s: string): string {
  return [...s].map((c) => {
    const n = c.codePointAt(0)!;
    return n >= 0x3041 && n <= 0x3096 ? String.fromCodePoint(n + 0x60) : c;
  }).join('');
}

/**
 * Convierte una lectura (katakana o hiragana) en romaji.
 * `isVerb`: en verbos la う final no alarga la vocal (思う = omou, no omō).
 */
export function kanaToRomaji(reading: string, { isVerb = false }: { isVerb?: boolean } = {}): string {
  const k = [...toKata(reading)];
  // 1) sílabas
  const syl: { r: string; kana: string }[] = [];
  for (let i = 0; i < k.length; i++) {
    const two = k[i] + (k[i + 1] ?? '');
    if (DIGRAPHS[two]) {
      syl.push({ r: DIGRAPHS[two], kana: two });
      i++;
    } else if (k[i] === 'ッ' || k[i] === 'ー' || BASE[k[i]] !== undefined) {
      syl.push({ r: k[i] === 'ッ' ? 'ッ' : k[i] === 'ー' ? 'ー' : BASE[k[i]], kana: k[i] });
    } else {
      syl.push({ r: k[i], kana: k[i] }); // signos u otros caracteres
    }
  }
  // 2) vocales largas, sokuon y ん
  let out = '';
  for (let i = 0; i < syl.length; i++) {
    const s = syl[i];
    const next = syl[i + 1];
    if (s.r === 'ッ') {
      if (next && /^[a-z]/.test(next.r)) out += next.r.startsWith('ch') ? 't' : next.r[0];
      continue;
    }
    if (s.r === 'ー') {
      const last = out.slice(-1);
      if (MACRON[last]) out = out.slice(0, -1) + MACRON[last];
      continue;
    }
    if (s.kana === 'ン') {
      out += next && /^[aiueoy]/.test(next.r) ? "n'" : 'n';
      continue;
    }
    const v = s.r.slice(-1);
    // おう / おお → ō ; うう → ū (salvo la う final de un verbo)
    const longO = v === 'o' && (next?.kana === 'ウ' || next?.kana === 'オ');
    const longU = v === 'u' && next?.kana === 'ウ';
    if (next && (longO || longU)) {
      const nextIsFinal = i + 2 === syl.length;
      if (!(isVerb && nextIsFinal && next.kana === 'ウ')) {
        out += s.r.slice(0, -1) + MACRON[v];
        i++;
        continue;
      }
    }
    out += s.r;
  }
  return out;
}

export interface Token {
  surface: string;
  reading?: string;
  pos: string; // 品詞: 名詞, 動詞, 助詞, 助動詞, 形容詞, 記号…
  posDetail1?: string; // 格助詞, 係助詞, 接続助詞, 非自立, 接尾, 固有名詞…
}

const PUNCT: Record<string, string> = { '。': '.', '、': ',', '？': '?', '！': '!', '?': '?', '!': '!', '「': '"', '」': '"', '・': ' ', '…': '...', '〜': '~' };

/** Une tokens en romaji legible, separando palabras y partículas como en los libros de texto. */
export function tokensToRomaji(tokens: Token[]): string {
  let out = '';
  let prev: Token | null = null;
  let sokuon = false; // っ al final de la palabra anterior (分かっ|て → wakatte)
  for (const t of tokens) {
    if (t.pos === '記号' || PUNCT[t.surface]) {
      out += PUNCT[t.surface] ?? '';
      prev = t;
      sokuon = false;
      continue;
    }
    const kana = t.reading && t.reading !== '*' ? t.reading : /^[ぁ-ゖァ-ヺー]+$/.test(t.surface) ? t.surface : '';
    let r: string;
    if (t.pos === '助詞' && t.surface === 'は') r = 'wa';
    else if (t.pos === '助詞' && t.surface === 'へ') r = 'e';
    else if (t.pos === '助詞' && t.surface === 'を') r = 'o';
    else if (kana) r = kanaToRomaji(kana, { isVerb: t.pos === '動詞' });
    else r = t.surface; // números, letras latinas…

    if (sokuon && /^[bcdfghjkmnprstvwz]/.test(r)) r = (r.startsWith('ch') ? 't' : r[0]) + r;
    sokuon = /[ッっ]$/.test(kana);
    if (t.posDetail1 === '固有名詞') r = r.charAt(0).toUpperCase() + r.slice(1);

    const after = (...pos: string[]) => prev != null && pos.includes(prev.pos);
    const attach =
      prev != null &&
      prev.pos !== '記号' &&
      (after('接頭詞') ||
        (t.pos === '助動詞' && t.surface !== 'です' && (after('動詞', '形容詞', '助動詞') || (prev?.pos === '助詞' && prev.posDetail1 === '接続助詞'))) ||
        (t.pos === '助詞' && t.posDetail1 === '接続助詞' && after('動詞', '形容詞', '助動詞')) ||
        (t.pos === '動詞' && t.posDetail1 === '非自立' && after('動詞')) ||
        (t.posDetail1 === '接尾' && ['動詞', '名詞', '形容詞'].includes(t.pos)));
    if (attach && out.endsWith('n') && /^[aiueoy]/.test(r)) out += "'";
    out += out === '' || attach || /[\s"]$/.test(out) ? r : ` ${r}`;
    prev = t;
  }
  out = out.replace(/\s+([.,?!])/g, '$1').replace(/\s+/g, ' ').trim();
  return out.charAt(0).toUpperCase() + out.slice(1);
}
