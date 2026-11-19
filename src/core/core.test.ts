import { describe, expect, it } from 'vitest';
import { ALL_KANA, HIRAGANA, KATAKANA, KANA_ROWS, rowCells, toKatakana, lookalikesOf } from '../content/kana';
import { buildChoices, isCorrectRomaji, normalizeRomaji } from './answers';
import { gradeFrom, mastery, newCard, review, Rating, State, retrievability } from './srs';
import { daysUntil, dayKey, streak, weekStart } from './dates';
import { computeDashboard } from './metrics';
import { pickNextItem } from './kanaSession';
import { SECTIONS } from '../content/sections';

function seeded(seed = 1) {
  return () => {
    seed = (seed * 1103515245 + 12345) % 2 ** 31;
    return seed / 2 ** 31;
  };
}

const DAY = 86_400_000;
const find = (kana: string) => ALL_KANA.find((k) => k.kana === kana)!;

describe('contenido kana', () => {
  it('104 por sistema: 46 básicos + 25 dakuten + 33 yōon', () => {
    expect(HIRAGANA).toHaveLength(104);
    expect(KATAKANA).toHaveLength(104);
    expect(HIRAGANA.filter((k) => k.group === 'basic')).toHaveLength(46);
    expect(HIRAGANA.filter((k) => k.group === 'dakuten')).toHaveLength(25);
    expect(HIRAGANA.filter((k) => k.group === 'yoon')).toHaveLength(33);
  });

  it('convierte a katakana correctamente', () => {
    expect(toKatakana('しゃ')).toBe('シャ');
    expect(toKatakana('を')).toBe('ヲ');
    expect(toKatakana('ぢ')).toBe('ヂ');
    expect(toKatakana('カメラ')).toBe('カメラ');
  });

  it('ids únicos y romaji en minúsculas', () => {
    expect(new Set(ALL_KANA.map((k) => k.id)).size).toBe(ALL_KANA.length);
    for (const k of ALL_KANA) {
      expect(k.accepted[0]).toBe(k.romaji);
      for (const r of k.accepted) expect(r).toMatch(/^[a-z]+$/);
    }
  });

  it('las filas conservan su ancho', () => {
    for (const r of KANA_ROWS) expect(rowCells(r.id, 'hiragana')).toHaveLength(r.group === 'yoon' ? 3 : 5);
  });

  it('los pares parecidos son simétricos', () => {
    expect(lookalikesOf('シ')).toContain('ツ');
    expect(lookalikesOf('ツ')).toContain('シ');
  });
});

describe('corrección de respuestas', () => {
  it('acepta variantes Hepburn/Kunrei y normaliza', () => {
    expect(isCorrectRomaji('SHI', find('し'))).toBe(true);
    expect(isCorrectRomaji('si', find('し'))).toBe(true);
    expect(isCorrectRomaji(' tsu ', find('ツ'))).toBe(true);
    expect(isCorrectRomaji('o', find('を'))).toBe(true);
    expect(isCorrectRomaji('ka', find('き'))).toBe(false);
    expect(isCorrectRomaji('', find('あ'))).toBe(false);
    expect(normalizeRomaji('Tōkyō')).toBe('toukyou');
  });

  it('las opciones incluyen la respuesta y no repiten lecturas', () => {
    const rng = seeded(3);
    for (const answer of ALL_KANA) {
      const choices = buildChoices(answer, ALL_KANA, { rng });
      expect(choices).toHaveLength(4);
      expect(choices).toContain(answer);
      const readings = choices.flatMap((c) => c.accepted);
      expect(new Set(readings).size).toBe(readings.length);
    }
  });

  it('prioriza caracteres parecidos como distractores', () => {
    const shi = find('シ');
    const preferred = ALL_KANA.filter((k) => lookalikesOf('シ').includes(k.kana));
    const choices = buildChoices(shi, KATAKANA, { preferred, rng: seeded(5) });
    expect(choices.map((c) => c.kana)).toContain('ツ');
  });
});

describe('FSRS', () => {
  it('gradúa sin autoevaluación', () => {
    expect(gradeFrom(false, 1000)).toBe(Rating.Again);
    expect(gradeFrom(true, 1000)).toBe(Rating.Good);
    expect(gradeFrom(true, 9000)).toBe(Rating.Hard);
  });

  it('registra aciertos, errores, fechas e historial', () => {
    const t0 = Date.UTC(2026, 10, 20);
    let c = newCard('kana:hiragana:あ', 'kana', 'reconocer', t0);
    expect(mastery(c)).toBe('nuevo');
    c = review(c, Rating.Good, t0);
    expect(c.lastReview).toBe(t0);
    expect(c.learnedAt).toBe(t0);
    expect(c.correct).toBe(1);
    expect(c.due).toBeGreaterThan(t0);
    expect(mastery(c)).toBe('aprendiendo');
    c = review(c, Rating.Again, t0 + 60_000);
    expect(c.wrong).toBe(1);
    expect(c.history).toEqual([true, false]);
    expect(c.learnedAt).toBe(t0);
  });

  it('llega a "dominado" solo con repasos espaciados correctos', () => {
    let t = Date.UTC(2026, 10, 20);
    let c = newCard('kana:hiragana:か', 'kana', 'reconocer', t);
    // Muchos aciertos el mismo día no bastan.
    for (let i = 0; i < 5; i++) c = review(c, Rating.Good, (t += 60_000));
    expect(mastery(c)).not.toBe('dominado');
    // Repasos cuando vencen, varios días después.
    for (let i = 0; i < 6; i++) {
      t = Math.max(t + 60_000, c.due);
      c = review(c, Rating.Good, t);
    }
    expect(c.fsrs.state).toBe(State.Review);
    expect(c.fsrs.stability).toBeGreaterThanOrEqual(7);
    expect(mastery(c)).toBe('dominado');
    expect(retrievability(c, t)).toBeGreaterThan(0.9);
  });

  it('sobrevive a fechas serializadas como texto (importación JSON)', () => {
    const t = Date.UTC(2026, 10, 20);
    const c = review(newCard('x', 'kana', 'reconocer', t), Rating.Good, t);
    const roundTrip = JSON.parse(JSON.stringify(c));
    expect(() => review(roundTrip, Rating.Good, t + DAY)).not.toThrow();
    expect(retrievability(roundTrip, t + DAY)).toBeGreaterThan(0);
  });
});

describe('fechas', () => {
  it('cuenta días hasta el viaje', () => {
    expect(daysUntil('2027-05-15', new Date(2026, 10, 19, 23, 0))).toBe(177);
    expect(daysUntil('2020-01-01', new Date(2026, 10, 19))).toBe(0);
  });

  it('semana empieza el lunes', () => {
    expect(weekStart(new Date(2026, 10, 19))).toBe('2026-11-16');
    expect(weekStart(new Date(2026, 10, 22))).toBe('2026-11-16');
    expect(weekStart(new Date(2026, 10, 23))).toBe('2026-11-23');
  });

  it('racha termina hoy o ayer', () => {
    const now = new Date(2026, 10, 19);
    const d = (n: number) => dayKey(new Date(2026, 10, 19 - n));
    expect(streak(new Set([d(0), d(1), d(2)]), now)).toBe(3);
    expect(streak(new Set([d(1), d(2)]), now)).toBe(2);
    expect(streak(new Set([d(2)]), now)).toBe(0);
  });
});

describe('dashboard', () => {
  it('sin datos muestra ceros, no inventa', () => {
    const d = computeDashboard({
      cards: [],
      sessions: [],
      reviews: [],
      tripStart: '2027-05-15',
      dailyMinutes: 30,
      studyDaysPerWeek: 6,
      hiraganaTotal: 104,
      katakanaTotal: 104,
      now: new Date(2026, 10, 19).getTime(),
    });
    expect(d.daysStudied).toBe(0);
    expect(d.minutesTotal).toBe(0);
    expect(d.hiragana).toEqual({ mastered: 0, seen: 0, total: 104 });
    expect(d.listening.accuracy).toBeNull();
    expect(d.accuracy7d).toBeNull();
    expect(d.weeklyGoalMinutes).toBe(180);
  });

  it('cuenta vencidos, minutos y vistos desde los registros', () => {
    const now = new Date(2026, 10, 19, 12).getTime();
    const c = review(newCard('kana:hiragana:あ', 'kana', 'reconocer', now - 3 * DAY), Rating.Good, now - 3 * DAY);
    const d = computeDashboard({
      cards: [c, newCard('kana:katakana:ア', 'kana', 'reconocer', now)],
      sessions: [
        { day: dayKey(now), seconds: 600 },
        { day: dayKey(now - DAY), seconds: 300 },
      ],
      reviews: [
        { day: dayKey(now), skill: 'reconocer', correct: true },
        { day: dayKey(now), skill: 'reconocer', correct: false },
      ],
      tripStart: '2027-05-15',
      dailyMinutes: 30,
      studyDaysPerWeek: 6,
      hiraganaTotal: 104,
      katakanaTotal: 104,
      now,
    });
    expect(d.dueNow).toBe(1);
    expect(d.minutesTotal).toBe(15);
    expect(d.daysStudied).toBe(2);
    expect(d.streak).toBe(2);
    expect(d.hiragana.seen).toBe(1);
    expect(d.katakana.seen).toBe(0);
    expect(d.accuracy7d).toBe(50);
  });
});

describe('selección de la siguiente pregunta', () => {
  const items = HIRAGANA.filter((k) => k.row === 'a' || k.row === 'k');

  it('primero los vencidos, luego nuevos con tope', () => {
    const now = Date.UTC(2026, 10, 20);
    const due = review(newCard(items[7].id, 'kana', 'reconocer', now - 5 * DAY), Rating.Good, now - 5 * DAY);
    const cards = new Map([[items[7].id, due]]);
    expect(pickNextItem(items, cards, { now, newIntroduced: 0, maxNew: 5, rng: seeded() }).item.id).toBe(items[7].id);

    const empty = new Map();
    const first = pickNextItem(items, empty, { now, newIntroduced: 0, maxNew: 5 });
    expect(first.reason).toBe('nuevo');
    expect(first.item.kana).toBe('あ');
    expect(pickNextItem(items, empty, { now, newIntroduced: 5, maxNew: 5, rng: seeded() }).reason).toBe('refuerzo');
  });

  it('no repite el último mostrado', () => {
    const now = Date.UTC(2026, 10, 20);
    for (let i = 0; i < 30; i++) {
      expect(pickNextItem(items, new Map(), { now, lastId: items[0].id, newIntroduced: 9, maxNew: 5, rng: seeded(i + 1) }).item.id).not.toBe(items[0].id);
    }
  });
});

describe('secciones', () => {
  it('las 16 secciones pedidas existen con rutas únicas', () => {
    expect(SECTIONS).toHaveLength(16);
    expect(new Set(SECTIONS.map((s) => s.path)).size).toBe(16);
    for (const s of SECTIONS.filter((x) => x.status === 'planificado')) expect(s.plan?.length).toBeGreaterThan(0);
  });
});
