// Repaso espaciado sencillo (tipo Leitner) y corrección de respuestas.
// Cada carácter tiene una "caja" de 0 a 5: acertar sube una caja, fallar baja dos.
// Los caracteres en cajas bajas (o nunca vistos) aparecen más seguido.

export const MAX_BOX = 5;
export const MASTERED_BOX = 4;

export function emptyStat() {
  return { box: 0, seen: 0, correct: 0, last: 0 };
}

/** Nueva estadística tras responder. No modifica la original. */
export function update(stat, correct, now = Date.now()) {
  const s = { ...emptyStat(), ...stat };
  return {
    box: correct ? Math.min(MAX_BOX, s.box + 1) : Math.max(0, s.box - 2),
    seen: s.seen + 1,
    correct: s.correct + (correct ? 1 : 0),
    last: now,
  };
}

/** 0 = nuevo, 1 = aprendiendo, 2 = casi, 3 = dominado. */
export function mastery(stat) {
  if (!stat || stat.seen === 0) return 0;
  if (stat.box >= MASTERED_BOX) return 3;
  if (stat.box >= 2) return 2;
  return 1;
}

function weight(stat) {
  if (!stat || stat.seen === 0) return 30;
  return (MAX_BOX + 1 - stat.box) ** 2;
}

/**
 * Elige el siguiente carácter, favoreciendo los menos dominados.
 * Evita repetir el último mostrado si hay alternativa.
 */
export function pickNext(items, stats, lastId = null, rng = Math.random) {
  const pool = items.length > 1 ? items.filter((it) => it.id !== lastId) : items;
  const weights = pool.map((it) => weight(stats[it.id]));
  const total = weights.reduce((a, b) => a + b, 0);
  let r = rng() * total;
  for (let i = 0; i < pool.length; i++) {
    r -= weights[i];
    if (r < 0) return pool[i];
  }
  return pool[pool.length - 1];
}

/** Normaliza lo que escribe la persona: minúsculas, sin espacios ni tildes. */
export function normalize(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z]/g, '');
}

export function isCorrect(input, item) {
  const answer = normalize(input);
  return answer.length > 0 && item.accepted.includes(answer);
}

/** Dos caracteres se confunden si comparten alguna lectura (じ/ぢ, ず/づ, お/を). */
function sameSound(a, b) {
  return a.accepted.some((r) => b.accepted.includes(r));
}

function shuffle(list, rng) {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Opciones para una pregunta de selección: la correcta más `count - 1` distractores.
 * Prefiere distractores del mismo sistema de escritura y grupo, y nunca incluye
 * uno que suene igual que la respuesta.
 */
export function buildChoices(answer, pool, count = 4, rng = Math.random) {
  const candidates = pool.filter((it) => it.id !== answer.id && !sameSound(it, answer));
  const near = candidates.filter((it) => it.script === answer.script && it.group === answer.group);
  const far = candidates.filter((it) => !near.includes(it));
  const picked = [];
  for (const it of [...shuffle(near, rng), ...shuffle(far, rng)]) {
    if (picked.length >= count - 1) break;
    if (picked.some((p) => sameSound(p, it) || p.kana === it.kana)) continue;
    picked.push(it);
  }
  return shuffle([answer, ...picked], rng);
}
