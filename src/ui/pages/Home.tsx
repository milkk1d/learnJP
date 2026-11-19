import { Link } from 'react-router-dom';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../db/db';
import { computeDashboard } from '../../core/metrics';
import { HIRAGANA, KATAKANA } from '../../content/kana';
import { SECTIONS } from '../../content/sections';
import { formatDayEs } from '../../core/dates';
import { useProfile } from '../hooks';
import { Bar, Stat, StatusPill } from '../components/ui';

const PHASES = [
  { n: 1, title: 'Fundamentos', detail: 'Pronunciación, kana, saludos, números y precios', status: 'parcial' as const },
  { n: 2, title: 'Construcción del idioma', detail: 'Partículas, verbos, adjetivos, forma ます y て', status: 'planificado' as const },
  { n: 3, title: 'Japonés para viajar', detail: 'Aeropuerto, trenes, hotel, comida, compras', status: 'planificado' as const },
  { n: 4, title: 'Conversaciones reales', detail: 'Velocidad natural, imprevistos, pedir aclaraciones', status: 'planificado' as const },
  { n: 5, title: 'Inmersión cultural', detail: 'Etiqueta, cortesía, templos, transporte', status: 'planificado' as const },
  { n: 6, title: 'Simulación del viaje', detail: 'Tu itinerario, día por día', status: 'planificado' as const },
];

function greeting(): string {
  const h = new Date().getHours();
  if (h < 11) return 'おはようございます';
  if (h < 18) return 'こんにちは';
  return 'こんばんは';
}

export function Home() {
  const profile = useProfile();
  const cards = useLiveQuery(() => db.cards.toArray(), []);
  const sessions = useLiveQuery(() => db.sessions.toArray(), []);
  const reviews = useLiveQuery(() => db.reviews.toArray(), []);

  if (!cards || !sessions || !reviews) return <div className="text-muted">Cargando…</div>;

  const d = computeDashboard({
    cards,
    sessions,
    reviews,
    tripStart: profile.tripStart,
    dailyMinutes: profile.dailyMinutes,
    studyDaysPerWeek: profile.studyDaysPerWeek,
    hiraganaTotal: HIRAGANA.length,
    katakanaTotal: KATAKANA.length,
  });
  const fresh = cards.length === 0;
  const dueKana = cards.find((c) => c.kind === 'kana' && c.lastReview != null && c.due <= Date.now());
  const practicePath = dueKana?.itemId.startsWith('kana:katakana:') ? '/katakana?practicar=1' : '/hiragana?practicar=1';
  const pctWeek = d.weeklyGoalMinutes ? Math.min(100, Math.round((d.minutesThisWeek / d.weeklyGoalMinutes) * 100)) : 0;
  const nextStep = d.dueNow > 0 ? 'Tienes repasos vencidos: hazlos antes de ver contenido nuevo.' : fresh ? 'Empieza con la primera fila de hiragana: あいうえお.' : 'Sigue con hiragana: agrega una fila nueva cuando la anterior esté consolidándose.';

  return (
    <>
      {/* Encabezado + cuenta regresiva */}
      <section className="relative mb-6 overflow-hidden rounded-3xl bg-accent px-6 py-6 text-white shadow-soft">
        <div aria-hidden className="pointer-events-none absolute -right-6 -top-10 select-none font-jp text-[180px] font-bold leading-none text-white/10">
          旅
        </div>
        <div className="font-jp text-sm font-medium opacity-90">{greeting()}</div>
        <div className="mt-3 flex flex-wrap items-end gap-x-6 gap-y-2">
          <div>
            <div className="text-[56px] font-extrabold leading-none tabular-nums">{d.daysToTrip}</div>
            <div className="mt-1 font-semibold opacity-90">días para Japón</div>
          </div>
          <div className="pb-1 text-sm opacity-90">
            Salida estimada: {formatDayEs(profile.tripStart)}
            <br />
            <Link to="/configuracion" className="font-bold underline underline-offset-2">
              Editar fechas e itinerario
            </Link>
          </div>
        </div>
      </section>

      {/* Hoy */}
      <section className="card mb-6 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="label">Hoy</div>
            <p className="mt-1 text-[17px] font-semibold">{nextStep}</p>
          </div>
          <Link to={practicePath} className="btn-primary">
            {d.dueNow > 0 ? `Repasar (${d.dueNow})` : 'Practicar'}
          </Link>
        </div>
        <div className="mt-5">
          <div className="mb-1.5 flex justify-between text-sm font-semibold">
            <span>Meta semanal</span>
            <span className="tabular-nums text-muted">
              {d.minutesThisWeek} / {d.weeklyGoalMinutes} min · {pctWeek}%
            </span>
          </div>
          <Bar value={d.minutesThisWeek} max={d.weeklyGoalMinutes} />
        </div>
      </section>

      {/* Nivel */}
      <section className="mb-6 rounded-2xl border border-dashed border-line p-4 text-sm">
        <span className="font-bold">Nivel actual: </span>
        {profile.diagnosticDone ? 'según tu evaluación' : 'sin evaluar.'}{' '}
        <span className="text-muted">
          La evaluación diagnóstica llega con "Mi curso" (hito 2). Mientras tanto te considero principiante absoluto.
        </span>
      </section>

      {/* Métricas reales */}
      <div className="label mb-2">Tu progreso (solo datos registrados)</div>
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <Stat label="Días estudiados" value={d.daysStudied} hint={d.streak ? `racha de ${d.streak} día${d.streak > 1 ? 's' : ''}` : 'sin racha activa'} />
        <Stat label="Minutos acumulados" value={d.minutesTotal} hint="solo tiempo activo" />
        <Stat label="Repasos pendientes" value={d.dueNow} hint={`${d.reviewsToday} respuestas hoy`} />
        <Stat
          label="Hiragana dominado"
          value={`${d.hiragana.mastered}/${d.hiragana.total}`}
          hint={`${d.hiragana.seen} vistos`}
        />
        <Stat
          label="Katakana dominado"
          value={`${d.katakana.mastered}/${d.katakana.total}`}
          hint={`${d.katakana.seen} vistos`}
        />
        <Stat label="Aciertos (7 días)" value={d.accuracy7d == null ? '—' : `${d.accuracy7d}%`} tone={d.accuracy7d == null ? 'muted' : undefined} />
        <Stat label="Vocabulario" value={d.byKind.vocab.seen} hint="disponible en hito 2" tone="muted" />
        <Stat label="Kanji" value={d.byKind.kanji.seen} hint="disponible en hito 2" tone="muted" />
        <Stat label="Gramática" value={d.byKind.grammar.seen} hint="disponible en hito 2" tone="muted" />
        <Stat label="Comprensión auditiva" value={d.listening.answers ? `${d.listening.accuracy}%` : 'sin datos'} hint="hito 4" tone="muted" />
        <Stat label="Práctica oral" value={d.speaking.answers ? d.speaking.answers : 'sin datos'} hint="hito 4" tone="muted" />
      </div>
      <p className="-mt-3 mb-8 text-xs text-muted">
        "Dominado" = FSRS estima que lo recordarás al menos 7 días y acertaste las 3 últimas veces.
      </p>

      {/* Ruta del curso */}
      <div className="label mb-2">Ruta del curso</div>
      <ol className="card mb-8 divide-y divide-line">
        {PHASES.map((p) => (
          <li key={p.n} className="flex items-center gap-4 px-5 py-3.5">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-sunken font-extrabold">{p.n}</span>
            <div className="min-w-0 flex-1">
              <div className="font-bold">{p.title}</div>
              <div className="truncate text-sm text-muted">{p.detail}</div>
            </div>
            <StatusPill status={p.status} />
          </li>
        ))}
      </ol>

      <div className="label mb-2">Secciones disponibles hoy</div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {SECTIONS.filter((s) => s.status !== 'planificado' && s.id !== 'inicio').map((s) => (
          <Link key={s.id} to={s.path} className="card flex min-w-0 items-center gap-4 p-4 transition hover:border-accent">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-sunken font-jp text-xl font-bold">{s.glyph}</span>
            <div className="min-w-0">
              <div className="font-bold">{s.label}</div>
              <div className="truncate text-sm text-muted">{s.summary}</div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
