// Métricas del dashboard calculadas SOLO desde datos registrados. Nada se estima ni se inventa.

import { mastery, type SrsCard } from './srs';
import { daysUntil, streak, weekStart, dayKey } from './dates';

export interface MetricInputs {
  cards: SrsCard[];
  sessions: { day: string; seconds: number }[];
  reviews: { day: string; skill: string; correct: boolean }[];
  tripStart: string;
  dailyMinutes: number;
  studyDaysPerWeek: number;
  hiraganaTotal: number;
  katakanaTotal: number;
  now?: number;
}

export interface Dashboard {
  daysStudied: number;
  streak: number;
  minutesTotal: number;
  minutesThisWeek: number;
  weeklyGoalMinutes: number;
  dueNow: number;
  daysToTrip: number;
  hiragana: { mastered: number; seen: number; total: number };
  katakana: { mastered: number; seen: number; total: number };
  byKind: Record<string, { seen: number; mastered: number }>;
  listening: { answers: number; accuracy: number | null };
  speaking: { answers: number; accuracy: number | null };
  reviewsToday: number;
  accuracy7d: number | null;
}

function uniqueItems(cards: SrsCard[], pred: (c: SrsCard) => boolean): number {
  return new Set(cards.filter(pred).map((c) => c.itemId)).size;
}

function accuracy(list: { correct: boolean }[]): number | null {
  if (!list.length) return null;
  return Math.round((list.filter((r) => r.correct).length / list.length) * 100);
}

export function computeDashboard(i: MetricInputs): Dashboard {
  const now = i.now ?? Date.now();
  const days = new Set(i.sessions.filter((s) => s.seconds > 0).map((s) => s.day));
  const thisWeek = weekStart(now);
  const today = dayKey(now);
  const sevenDaysAgo = dayKey(now - 6 * 86_400_000);

  const kanaStats = (script: 'hiragana' | 'katakana', total: number) => {
    const cards = i.cards.filter((c) => c.kind === 'kana' && c.itemId.startsWith(`kana:${script}:`));
    // Un kana está dominado cuando su tarjeta de reconocimiento cumple el criterio de dominio.
    return {
      mastered: uniqueItems(cards, (c) => c.skill === 'reconocer' && mastery(c) === 'dominado'),
      seen: uniqueItems(cards, (c) => c.lastReview != null),
      total,
    };
  };

  const byKind: Dashboard['byKind'] = {};
  for (const kind of ['vocab', 'kanji', 'grammar', 'phrase']) {
    const cards = i.cards.filter((c) => c.kind === kind);
    byKind[kind] = {
      seen: uniqueItems(cards, (c) => c.lastReview != null),
      mastered: uniqueItems(cards, (c) => mastery(c) === 'dominado'),
    };
  }

  const listen = i.reviews.filter((r) => r.skill === 'escuchar');
  const speak = i.reviews.filter((r) => r.skill === 'hablar');

  return {
    daysStudied: days.size,
    streak: streak(days, now),
    minutesTotal: Math.round(i.sessions.reduce((a, s) => a + s.seconds, 0) / 60),
    minutesThisWeek: Math.round(i.sessions.filter((s) => s.day >= thisWeek).reduce((a, s) => a + s.seconds, 0) / 60),
    weeklyGoalMinutes: i.dailyMinutes * i.studyDaysPerWeek,
    dueNow: i.cards.filter((c) => c.lastReview != null && c.due <= now).length,
    daysToTrip: daysUntil(i.tripStart, now),
    hiragana: kanaStats('hiragana', i.hiraganaTotal),
    katakana: kanaStats('katakana', i.katakanaTotal),
    byKind,
    listening: { answers: listen.length, accuracy: accuracy(listen) },
    speaking: { answers: speak.length, accuracy: accuracy(speak) },
    reviewsToday: i.reviews.filter((r) => r.day === today).length,
    accuracy7d: accuracy(i.reviews.filter((r) => r.day >= sevenDaysAgo)),
  };
}
