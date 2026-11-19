// Fechas locales en formato YYYY-MM-DD (sin depender de la zona UTC).

export function dayKey(ts: number | Date = Date.now()): string {
  const d = new Date(ts);
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${m}-${day}`;
}

export function parseDay(key: string): Date {
  const [y, m, d] = key.split('-').map(Number);
  return new Date(y, m - 1, d);
}

/** Días completos entre hoy y la fecha (0 si ya pasó). */
export function daysUntil(key: string, now: number | Date = Date.now()): number {
  const today = parseDay(dayKey(now)).getTime();
  const target = parseDay(key).getTime();
  return Math.max(0, Math.round((target - today) / 86_400_000));
}

/** Lunes de la semana de la fecha dada, como YYYY-MM-DD. */
export function weekStart(ts: number | Date = Date.now()): string {
  const d = parseDay(dayKey(ts));
  const offset = (d.getDay() + 6) % 7;
  d.setDate(d.getDate() - offset);
  return dayKey(d);
}

/** Racha de días consecutivos con estudio que termina hoy o ayer. */
export function streak(days: Set<string>, now: number | Date = Date.now()): number {
  const d = parseDay(dayKey(now));
  if (!days.has(dayKey(d))) d.setDate(d.getDate() - 1);
  let n = 0;
  while (days.has(dayKey(d))) {
    n++;
    d.setDate(d.getDate() - 1);
  }
  return n;
}

export function formatDayEs(key: string): string {
  return parseDay(key).toLocaleDateString('es-CL', { day: 'numeric', month: 'long', year: 'numeric' });
}
