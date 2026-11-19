import 'fake-indexeddb/auto';
import { beforeEach, describe, expect, it } from 'vitest';
import { NihongoDB } from './db';
import { addStudyTime, ensureDefaults, exportAll, importAll, recordAnswer, resetAll, updateProfile } from './repo';

let db: NihongoDB;
let n = 0;

beforeEach(async () => {
  db = new NihongoDB(`test-${n++}`);
  await ensureDefaults(db);
});

describe('base de datos local', () => {
  it('crea perfil y ajustes por defecto una sola vez', async () => {
    await updateProfile({ dailyMinutes: 45 }, db);
    await ensureDefaults(db);
    expect((await db.profile.get('me'))!.dailyMinutes).toBe(45);
    expect((await db.settings.get('app'))!.showRomaji).toBe(true);
    expect((await db.profile.get('me'))!.itinerary.length).toBeGreaterThanOrEqual(8);
  });

  it('registra respuestas con tarjeta, historial y error etiquetado', async () => {
    const t = Date.UTC(2026, 10, 20);
    await recordAnswer({ itemId: 'kana:katakana:シ', kind: 'kana', skill: 'reconocer', correct: false, responseMs: 1500, given: 'tsu', mistakeTag: 'confusión シ/ツ', now: t }, db);
    await recordAnswer({ itemId: 'kana:katakana:シ', kind: 'kana', skill: 'reconocer', correct: true, responseMs: 1500, now: t + 60_000 }, db);
    const card = (await db.cards.get('kana:katakana:シ|reconocer'))!;
    expect(card.correct).toBe(1);
    expect(card.wrong).toBe(1);
    expect(card.learnedAt).toBe(t);
    expect(card.lastReview).toBe(t + 60_000);
    expect(await db.reviews.count()).toBe(2);
    expect((await db.mistakes.toArray()).map((m) => m.tag)).toEqual(['confusión シ/ツ']);
  });

  it('reconocer y producir se siguen por separado', async () => {
    await recordAnswer({ itemId: 'kana:hiragana:あ', kind: 'kana', skill: 'reconocer', correct: true, responseMs: 900 }, db);
    await recordAnswer({ itemId: 'kana:hiragana:あ', kind: 'kana', skill: 'producir', correct: false, responseMs: 900 }, db);
    expect(await db.cards.count()).toBe(2);
  });

  it('agrupa el tiempo de estudio por día y actividad', async () => {
    const t = new Date(2026, 10, 20, 10).getTime();
    await addStudyTime('kana', 15, t, db);
    await addStudyTime('kana', 15, t + 20_000, db);
    await addStudyTime('kana', 15, t + 3 * 3600_000, db);
    const s = await db.sessions.toArray();
    expect(s).toHaveLength(2);
    expect(s[0].seconds).toBe(30);
  });

  it('exporta e importa sin perder datos (iPhone ↔ PC)', async () => {
    await recordAnswer({ itemId: 'kana:hiragana:か', kind: 'kana', skill: 'reconocer', correct: true, responseMs: 900 }, db);
    await updateProfile({ tripStart: '2027-05-20' }, db);
    const backup = JSON.parse(JSON.stringify(await exportAll(db)));

    const other = new NihongoDB(`test-other-${n++}`);
    await ensureDefaults(other);
    await importAll(backup, other);
    expect((await other.profile.get('me'))!.tripStart).toBe('2027-05-20');
    expect(await other.cards.count()).toBe(1);
    // La tarjeta importada sigue funcionando con FSRS.
    await recordAnswer({ itemId: 'kana:hiragana:か', kind: 'kana', skill: 'reconocer', correct: true, responseMs: 900 }, other);
    expect((await other.cards.get('kana:hiragana:か|reconocer'))!.correct).toBe(2);
  });

  it('rechaza archivos que no son respaldos', async () => {
    await expect(importAll({ hola: 1 }, db)).rejects.toThrow(/respaldo/);
    await expect(importAll({ app: 'nihongo-quest', version: 1, data: { hackeo: [] } }, db)).rejects.toThrow(/desconocida/);
  });

  it('borrar todo deja la app en estado inicial', async () => {
    await recordAnswer({ itemId: 'kana:hiragana:か', kind: 'kana', skill: 'reconocer', correct: true, responseMs: 900 }, db);
    await resetAll(db);
    expect(await db.cards.count()).toBe(0);
    expect(await db.profile.get('me')).toBeTruthy();
  });
});
