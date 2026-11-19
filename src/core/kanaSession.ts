// Selección de la siguiente pregunta en una práctica de kana.
// Prioridad: 1) tarjetas vencidas (las más atrasadas primero), 2) kana nuevos
// en orden de la tabla, con un tope por sesión, 3) las de menor recuerdo estimado.

import { retrievability, type SrsCard } from './srs';

export interface PickOptions {
  now?: number;
  lastId?: string | null;
  newIntroduced: number;
  maxNew: number;
  rng?: () => number;
}

export function pickNextItem<T extends { id: string }>(
  items: T[],
  cardsByItem: Map<string, SrsCard>,
  { now = Date.now(), lastId = null, newIntroduced, maxNew, rng = Math.random }: PickOptions,
): { item: T; reason: 'vencido' | 'nuevo' | 'refuerzo' } {
  const pool = items.length > 1 ? items.filter((it) => it.id !== lastId) : items;

  const due = pool
    .map((it) => ({ it, card: cardsByItem.get(it.id) }))
    .filter((x) => x.card && x.card.lastReview != null && x.card.due <= now)
    .sort((a, b) => a.card!.due - b.card!.due);
  if (due.length) {
    // Un poco de azar entre las 3 más atrasadas para no hacer la práctica predecible.
    const top = due.slice(0, 3);
    return { item: top[Math.floor(rng() * top.length)].it, reason: 'vencido' };
  }

  if (newIntroduced < maxNew) {
    const fresh = pool.find((it) => !cardsByItem.get(it.id)?.lastReview);
    if (fresh) return { item: fresh, reason: 'nuevo' };
  }

  const seen = pool
    .map((it) => ({ it, r: cardsByItem.get(it.id) ? retrievability(cardsByItem.get(it.id)!, now) : 1 }))
    .sort((a, b) => a.r - b.r);
  const top = seen.slice(0, Math.min(4, seen.length));
  return { item: top[Math.floor(rng() * top.length)].it, reason: 'refuerzo' };
}
