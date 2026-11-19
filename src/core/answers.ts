// Corrección de respuestas y construcción de opciones para ejercicios.

export interface Answerable {
  id: string;
  accepted: string[];
}

/** Minúsculas, sin tildes, sin espacios ni signos. Convierte macrones (ō → ou). */
export function normalizeRomaji(text: string): string {
  return text
    .toLowerCase()
    .replace(/ā/g, 'aa')
    .replace(/ī/g, 'ii')
    .replace(/ū/g, 'uu')
    .replace(/ē/g, 'ee')
    .replace(/ō/g, 'ou')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z]/g, '');
}

export function isCorrectRomaji(input: string, item: Answerable): boolean {
  const answer = normalizeRomaji(input);
  return answer.length > 0 && item.accepted.some((a) => normalizeRomaji(a) === answer);
}

/** Dos ítems se confunden si comparten alguna lectura (じ/ぢ, ず/づ, お/を). */
export function sameSound(a: Answerable, b: Answerable): boolean {
  return a.accepted.some((r) => b.accepted.includes(r));
}

export function shuffle<T>(list: T[], rng: () => number = Math.random): T[] {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Opciones de selección múltiple: la correcta + `count - 1` distractores.
 * `preferred` (p. ej. caracteres parecidos) va primero; nunca se incluye un
 * distractor que suene igual a la respuesta ni dos que suenen igual entre sí.
 */
export function buildChoices<T extends Answerable>(
  answer: T,
  pool: T[],
  { count = 4, preferred = [] as T[], rng = Math.random }: { count?: number; preferred?: T[]; rng?: () => number } = {},
): T[] {
  const ok = (it: T) => it.id !== answer.id && !sameSound(it, answer);
  const ordered = [...shuffle(preferred.filter(ok), rng), ...shuffle(pool.filter(ok), rng)];
  const picked: T[] = [];
  for (const it of ordered) {
    if (picked.length >= count - 1) break;
    if (picked.some((p) => p.id === it.id || sameSound(p, it))) continue;
    picked.push(it);
  }
  return shuffle([answer, ...picked], rng);
}
