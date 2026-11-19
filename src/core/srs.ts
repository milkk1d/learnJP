// Repetición espaciada con FSRS (Free Spaced Repetition Scheduler, implementación ts-fsrs).
// Documentación del algoritmo: https://github.com/open-spaced-repetition/fsrs4anki/wiki
//
// Cada tarjeta = (ítem, habilidad). Reconocer una palabra y producirla se siguen por separado.

import { createEmptyCard, fsrs, generatorParameters, Rating, State, type Card, type Grade } from 'ts-fsrs';

export type Skill = 'reconocer' | 'producir' | 'escuchar' | 'hablar';
export type ItemKind = 'kana' | 'vocab' | 'kanji' | 'grammar' | 'phrase';

export interface SrsCard {
  /** `${itemId}|${skill}` */
  id: string;
  itemId: string;
  kind: ItemKind;
  skill: Skill;
  fsrs: Card;
  /** Fecha de aprendizaje: primera vez que se respondió. */
  learnedAt: number;
  lastReview: number | null;
  due: number;
  correct: number;
  wrong: number;
  /** Últimos resultados (true = acierto), más reciente al final; máx. 20. */
  history: boolean[];
}

export const scheduler = fsrs(generatorParameters({ enable_fuzz: true, request_retention: 0.9 }));

export function cardId(itemId: string, skill: Skill): string {
  return `${itemId}|${skill}`;
}

export function newCard(itemId: string, kind: ItemKind, skill: Skill, now = Date.now()): SrsCard {
  const card = createEmptyCard(new Date(now));
  return {
    id: cardId(itemId, skill),
    itemId,
    kind,
    skill,
    fsrs: card,
    learnedAt: now,
    lastReview: null,
    due: card.due.getTime(),
    correct: 0,
    wrong: 0,
    history: [],
  };
}

/**
 * Traduce un resultado objetivo a una calificación FSRS.
 * No pedimos autoevaluación: fallo = Again; acierto lento = Hard; acierto = Good.
 * "Easy" queda reservado para cuando la persona lo marque explícitamente.
 */
export function gradeFrom(correct: boolean, responseMs: number, slowMs = 6000): Grade {
  if (!correct) return Rating.Again;
  return responseMs > slowMs ? Rating.Hard : Rating.Good;
}

export function review(card: SrsCard, grade: Grade, now = Date.now()): SrsCard {
  const { card: next } = scheduler.next(reviveCard(card.fsrs), new Date(now), grade);
  const correct = grade !== Rating.Again;
  return {
    ...card,
    fsrs: next,
    learnedAt: card.lastReview == null ? now : card.learnedAt,
    lastReview: now,
    due: next.due.getTime(),
    correct: card.correct + (correct ? 1 : 0),
    wrong: card.wrong + (correct ? 0 : 1),
    history: [...card.history, correct].slice(-20),
  };
}

/** IndexedDB guarda las fechas como Date, pero un JSON importado las trae como texto. */
export function reviveCard(c: Card): Card {
  return {
    ...c,
    due: new Date(c.due),
    last_review: c.last_review ? new Date(c.last_review) : undefined,
  };
}

/** Probabilidad estimada (0–1) de recordar el ítem ahora mismo. */
export function retrievability(card: SrsCard, now = Date.now()): number {
  if (card.lastReview == null) return 0;
  return scheduler.get_retrievability(reviveCard(card.fsrs), new Date(now), false) as number;
}

export type Mastery = 'nuevo' | 'aprendiendo' | 'consolidando' | 'dominado';

/**
 * Criterio explícito de dominio:
 * - dominado: en estado Review, estabilidad ≥ 7 días (FSRS estima 90% de recuerdo a 7+ días)
 *   y los 3 últimos intentos correctos.
 * - consolidando: en Review pero sin cumplir lo anterior.
 * - aprendiendo: respondido al menos una vez.
 */
export function mastery(card: SrsCard | undefined): Mastery {
  if (!card || card.lastReview == null) return 'nuevo';
  const last3 = card.history.slice(-3);
  if (card.fsrs.state === State.Review && card.fsrs.stability >= 7 && last3.length === 3 && last3.every(Boolean)) {
    return 'dominado';
  }
  if (card.fsrs.state === State.Review) return 'consolidando';
  return 'aprendiendo';
}

export function difficultyLabel(card: SrsCard): string {
  if (card.lastReview == null) return '—';
  const d = card.fsrs.difficulty;
  if (d < 4) return 'fácil';
  if (d < 7) return 'media';
  return 'difícil';
}

export { Rating, State };
