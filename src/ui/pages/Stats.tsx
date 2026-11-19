import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../db/db';
import { dayKey, parseDay } from '../../core/dates';
import { difficultyLabel } from '../../core/srs';
import { ALL_KANA } from '../../content/kana';
import { PageHeader, Stat } from '../components/ui';

const DAYS = 14;

function labelFor(itemId: string): string {
  if (itemId.startsWith('tatoeba:')) return `frase #${itemId.slice(8)}`;
  return ALL_KANA.find((k) => k.id === itemId)?.kana ?? itemId;
}

export function Stats() {
  const sessions = useLiveQuery(() => db.sessions.toArray(), []);
  const reviews = useLiveQuery(() => db.reviews.toArray(), []);
  const mistakes = useLiveQuery(() => db.mistakes.toArray(), []);
  const cards = useLiveQuery(() => db.cards.toArray(), []);
  if (!sessions || !reviews || !mistakes || !cards) return <div className="text-muted">Cargando…</div>;

  const days = Array.from({ length: DAYS }, (_, i) => dayKey(Date.now() - (DAYS - 1 - i) * 86_400_000));
  const perDay = days.map((d) => ({
    day: d,
    minutes: Math.round(sessions.filter((s) => s.day === d).reduce((a, s) => a + s.seconds, 0) / 60),
    answers: reviews.filter((r) => r.day === d).length,
    correct: reviews.filter((r) => r.day === d && r.correct).length,
  }));
  const maxMin = Math.max(10, ...perDay.map((d) => d.minutes));

  const tagCounts = new Map<string, number>();
  for (const m of mistakes) tagCounts.set(m.tag, (tagCounts.get(m.tag) ?? 0) + 1);
  const topTags = [...tagCounts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10);

  const hardest = cards
    .filter((c) => c.wrong > 0)
    .sort((a, b) => b.wrong / (b.correct + b.wrong) - a.wrong / (a.correct + a.wrong) || b.wrong - a.wrong)
    .slice(0, 12);

  const total = reviews.length;
  const correct = reviews.filter((r) => r.correct).length;

  return (
    <>
      <PageHeader title="Estadísticas" jp="とうけい" subtitle="Todo sale de lo que registraste en este dispositivo." />

      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Respuestas" value={total} />
        <Stat label="Aciertos" value={total ? `${Math.round((correct / total) * 100)}%` : '—'} />
        <Stat label="Ítems en seguimiento" value={new Set(cards.map((c) => c.itemId)).size} />
        <Stat label="Errores registrados" value={mistakes.length} />
      </div>

      <section className="card mb-6 p-5">
        <div className="label mb-4">Minutos por día (últimos {DAYS})</div>
        <div className="flex h-40 items-end gap-1.5">
          {perDay.map((d) => (
            <div key={d.day} className="flex h-full flex-1 flex-col items-center justify-end gap-1" title={`${d.day}: ${d.minutes} min, ${d.answers} respuestas`}>
              <span className="text-[10px] font-bold tabular-nums text-muted">{d.minutes || ''}</span>
              <div className="w-full rounded-t-md bg-accent" style={{ height: `${(d.minutes / maxMin) * 100}%`, minHeight: d.minutes ? 3 : 0 }} />
              <div className="h-px w-full bg-line" />
              <span className="text-[10px] text-muted">{parseDay(d.day).getDate()}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="grid gap-6 md:grid-cols-2">
        <section className="card p-5">
          <div className="label mb-1">Tus patrones de error</div>
          <p className="mb-3 text-sm text-muted">Agrupados por tipo. Se usarán para generar ejercicios dirigidos (hito 6).</p>
          {topTags.length ? (
            <ul className="divide-y divide-line">
              {topTags.map(([tag, n]) => (
                <li key={tag} className="flex items-center justify-between py-2">
                  <span className="font-jp font-medium">{tag}</span>
                  <span className="font-bold tabular-nums text-bad">×{n}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted">Aún no hay errores registrados.</p>
          )}
        </section>

        <section className="card p-5">
          <div className="label mb-3">Ítems más difíciles</div>
          {hardest.length ? (
            <table className="w-full text-sm">
              <thead className="text-left text-muted">
                <tr>
                  <th className="pb-2 font-semibold">Ítem</th>
                  <th className="pb-2 font-semibold">Habilidad</th>
                  <th className="pb-2 text-right font-semibold">✓/✗</th>
                  <th className="pb-2 text-right font-semibold">Dificultad</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {hardest.map((c) => (
                  <tr key={c.id}>
                    <td className="py-1.5 font-kana text-lg font-bold">{labelFor(c.itemId)}</td>
                    <td className="py-1.5">{c.skill}</td>
                    <td className="py-1.5 text-right tabular-nums">
                      {c.correct}/{c.wrong}
                    </td>
                    <td className="py-1.5 text-right">{difficultyLabel(c)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-sm text-muted">Sin datos todavía.</p>
          )}
        </section>
      </div>
    </>
  );
}
