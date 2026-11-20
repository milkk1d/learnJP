// Banco de escucha con audio de hablantes nativos (Tatoeba).
// Se carga bajo demanda para no inflar el inicio de la app.
// Estado de validación: audio y texto de autores nativos; traducciones de voluntarios
// de Tatoeba NO revisadas por Nihongo Quest. Los temas se detectan automáticamente.

export interface NativeSentence {
  id: string;
  jp: string;
  reading: string;
  /** Romaji Hepburn generado automáticamente (scripts/add_romaji.ts). */
  romaji?: string;
  es: string[];
  en: string[];
  audioId: string;
  voice: string;
  license: string;
  attribution: string;
}

export interface ListeningItem extends NativeSentence {
  itemId: string;
  audioUrl: string;
  sourceUrl: string;
  topics: Topic[];
  length: 'corta' | 'media' | 'larga';
}

export type Topic = 'cortesía' | 'transporte' | 'compras' | 'comida' | 'hotel' | 'salud' | 'tiempo' | 'personas';

const TOPIC_RULES: [Topic, RegExp][] = [
  ['cortesía', /すみません|ありがとう|お願い|ください|下さい|ごめん|どうぞ|こんにちは|おはよう|こんばんは|失礼/],
  ['transporte', /駅|電車|列車|バス|タクシー|切符|乗|降り|空港|飛行機|道|地図|右|左|まっすぐ|新幹線|地下鉄|駐車/],
  ['compras', /買|円|いくら|店|高い|安い|売|払|お金|値段|カメラ|時計/],
  ['comida', /食べ|飲|水|ご飯|料理|レストラン|お茶|茶|コーヒー|おいし|美味|肉|魚|野菜|朝ご飯|昼ご飯|晩ご飯|パン|ビール/],
  ['hotel', /ホテル|部屋|予約|泊/],
  ['salud', /病院|薬|痛|医者|病気|熱|風邪|けが|怪我|救急|警察|助けて/],
  ['tiempo', /時|今日|明日|昨日|曜日|朝|夜|分|週|月|年|天気|雨|雪/],
  ['personas', /私|僕|彼|友達|家族|名前|日本人|先生|学生/],
];

export const TOPICS: Topic[] = TOPIC_RULES.map(([t]) => t);

export function detectTopics(jp: string): Topic[] {
  return TOPIC_RULES.filter(([, re]) => re.test(jp)).map(([t]) => t);
}

export function lengthOf(jp: string): ListeningItem['length'] {
  const n = [...jp.replace(/[。、！？!?「」]/g, '')].length;
  return n <= 8 ? 'corta' : n <= 16 ? 'media' : 'larga';
}

export function enrich(s: NativeSentence, base = import.meta.env?.BASE_URL ?? './'): ListeningItem {
  return {
    ...s,
    itemId: `tatoeba:${s.id}`,
    audioUrl: `${base}audio/tatoeba/${s.audioId}.mp3`,
    sourceUrl: `https://tatoeba.org/es/sentences/show/${s.id}`,
    topics: detectTopics(s.jp),
    length: lengthOf(s.jp),
  };
}

let cache: Promise<ListeningItem[]> | null = null;

export function loadListening(): Promise<ListeningItem[]> {
  cache ??= import('./tatoeba.json').then((m) => (m.default.items as NativeSentence[]).map((s) => enrich(s)));
  return cache;
}

export function findListening(items: ListeningItem[], itemId: string) {
  return items.find((it) => it.itemId === itemId);
}
