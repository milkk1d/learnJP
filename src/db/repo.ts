// Operaciones sobre la base de datos. La UI llama a estas funciones, nunca a Dexie directamente.

import { db, DEFAULT_PROFILE, DEFAULT_SETTINGS, TABLES, type NihongoDB, type Profile, type Settings } from './db';
import { cardId, gradeFrom, newCard, review, type ItemKind, type Skill, type SrsCard } from '../core/srs';
import { dayKey } from '../core/dates';

export async function ensureDefaults(database: NihongoDB = db): Promise<void> {
  await database.transaction('rw', database.profile, database.settings, async () => {
    if (!(await database.profile.get('me'))) {
      await database.profile.put({ ...DEFAULT_PROFILE, createdAt: Date.now() });
    }
    if (!(await database.settings.get('app'))) {
      await database.settings.put({ ...DEFAULT_SETTINGS });
    }
  });
}

export async function updateProfile(patch: Partial<Profile>, database: NihongoDB = db) {
  await database.profile.update('me', patch);
}

export async function updateSettings(patch: Partial<Settings>, database: NihongoDB = db) {
  await database.settings.update('app', patch);
}

export interface AnswerInput {
  itemId: string;
  kind: ItemKind;
  skill: Skill;
  correct: boolean;
  responseMs: number;
  given?: string;
  /** Etiqueta de error para el seguimiento de patrones (p. ej. "confusión シ/ツ"). */
  mistakeTag?: string;
  now?: number;
}

/** Registra una respuesta: actualiza la tarjeta FSRS, el historial y, si falló, el error. */
export async function recordAnswer(input: AnswerInput, database: NihongoDB = db): Promise<SrsCard> {
  const now = input.now ?? Date.now();
  const id = cardId(input.itemId, input.skill);
  const grade = gradeFrom(input.correct, input.responseMs);
  return database.transaction('rw', database.cards, database.reviews, database.mistakes, async () => {
    const existing = (await database.cards.get(id)) ?? newCard(input.itemId, input.kind, input.skill, now);
    const updated = review(existing, grade, now);
    await database.cards.put(updated);
    await database.reviews.add({
      cardId: id,
      itemId: input.itemId,
      kind: input.kind,
      skill: input.skill,
      correct: input.correct,
      rating: grade,
      responseMs: input.responseMs,
      ts: now,
      day: dayKey(now),
      given: input.given,
    });
    if (!input.correct && input.mistakeTag) {
      await database.mistakes.add({ itemId: input.itemId, tag: input.mistakeTag, detail: input.given ?? '', ts: now });
    }
    return updated;
  });
}

/** Suma tiempo de estudio al bloque del día y actividad (agrupa en sesiones de hasta 30 min de pausa). */
export async function addStudyTime(activity: string, seconds: number, now = Date.now(), database: NihongoDB = db) {
  if (seconds <= 0) return;
  const day = dayKey(now);
  await database.transaction('rw', database.sessions, async () => {
    const last = await database.sessions.where('day').equals(day).filter((s) => s.activity === activity).last();
    if (last && now - last.end < 30 * 60_000) {
      await database.sessions.update(last.id!, { end: now, seconds: last.seconds + seconds });
    } else {
      await database.sessions.add({ day, activity, start: now - seconds * 1000, end: now, seconds });
    }
  });
}

// ---------- Exportar / importar ----------

export interface Backup {
  app: 'nihongo-quest';
  version: 1;
  exportedAt: string;
  data: Record<string, unknown[]>;
}

export async function exportAll(database: NihongoDB = db): Promise<Backup> {
  const data: Record<string, unknown[]> = {};
  for (const name of TABLES) data[name] = await database.table(name).toArray();
  return { app: 'nihongo-quest', version: 1, exportedAt: new Date().toISOString(), data };
}

export function validateBackup(value: unknown): Backup {
  const b = value as Backup;
  if (!b || b.app !== 'nihongo-quest' || b.version !== 1 || typeof b.data !== 'object') {
    throw new Error('El archivo no es un respaldo de Nihongo Quest.');
  }
  for (const name of Object.keys(b.data)) {
    if (!(TABLES as readonly string[]).includes(name)) throw new Error(`Tabla desconocida en el respaldo: ${name}`);
    if (!Array.isArray(b.data[name])) throw new Error(`Formato inválido en la tabla ${name}.`);
  }
  return b;
}

/** Reemplaza todos los datos locales por los del respaldo (en una sola transacción). */
export async function importAll(value: unknown, database: NihongoDB = db): Promise<void> {
  const backup = validateBackup(value);
  const tables = TABLES.map((n) => database.table(n));
  await database.transaction('rw', tables, async () => {
    for (const name of TABLES) {
      const t = database.table(name);
      await t.clear();
      const rows = backup.data[name] ?? [];
      if (rows.length) await t.bulkPut(rows);
    }
  });
  await ensureDefaults(database);
}

export async function resetAll(database: NihongoDB = db): Promise<void> {
  await database.transaction('rw', TABLES.map((n) => database.table(n)), async () => {
    for (const name of TABLES) await database.table(name).clear();
  });
  await ensureDefaults(database);
}
