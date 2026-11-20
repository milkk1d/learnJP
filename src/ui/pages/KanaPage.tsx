import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../db/db';
import { recordAnswer } from '../../db/repo';
import { KANA_GROUPS, KANA_ROWS, kanaFor, lookalikesOf, rowCells, type KanaItem, type Script } from '../../content/kana';
import { buildChoices, isCorrectRomaji, normalizeRomaji } from '../../core/answers';
import { pickNextItem } from '../../core/kanaSession';
import { mastery, type Mastery, type Skill, type SrsCard } from '../../core/srs';
import { tts } from '../../speech/tts';
import { useSettings, useStudyTimer } from '../hooks';
import { PageHeader, Segmented } from '../components/ui';
import { VoiceWarning } from '../components/VoiceWarning';

const MASTERY_BAR: Record<Mastery, string> = {
  nuevo: 'bg-line',
  aprendiendo: 'bg-warn',
  consolidando: 'bg-info',
  dominado: 'bg-good',
};

const INTRO: Record<Script, { jp: string; text: string }> = {
  hiragana: {
    jp: 'ひらがな',
    text: 'Se usa para palabras japonesas, partículas (は, を, に…) y terminaciones de verbos. Es lo primero que se aprende: con él puedes escribir cualquier palabra japonesa.',
  },
  katakana: {
    jp: 'カタカナ',
    text: 'Se usa sobre todo para palabras extranjeras (カメラ kamera, コーヒー kōhī), nombres de marcas y énfasis. En tiendas de cámaras, juegos y relojes lo vas a leer todo el tiempo.',
  },
};

type Mode = 'kana-choice' | 'kana-typed' | 'romaji-choice' | 'audio-choice';

const MODES: { id: Mode; title: string; sub: string; skill: Skill }[] = [
  { id: 'kana-choice', title: 'Kana → romaji', sub: 'Lee y elige entre 4', skill: 'reconocer' },
  { id: 'kana-typed', title: 'Kana → escribir', sub: 'Lee y escribe el romaji', skill: 'reconocer' },
  { id: 'romaji-choice', title: 'Romaji → kana', sub: 'Recuerda la forma', skill: 'producir' },
  { id: 'audio-choice', title: 'Audio → kana', sub: 'Escucha y elige', skill: 'escuchar' },
];

const SESSION_LENGTH = 20;

function loadPrefs(script: Script) {
  try {
    const raw = JSON.parse(localStorage.getItem(`nq:kana:${script}`) || '{}');
    return { rows: (raw.rows as string[]) ?? ['a'], mode: (raw.mode as Mode) ?? 'kana-choice', maxNew: (raw.maxNew as number) ?? 5 };
  } catch {
    return { rows: ['a'], mode: 'kana-choice' as Mode, maxNew: 5 };
  }
}

function savePrefs(script: Script, prefs: { rows: string[]; mode: Mode; maxNew: number }) {
  try {
    localStorage.setItem(`nq:kana:${script}`, JSON.stringify(prefs));
  } catch {
    /* sin almacenamiento: no pasa nada */
  }
}

export function KanaPage({ script }: { script: Script }) {
  const [params, setParams] = useSearchParams();
  const tab = params.get('practicar') ? 'practicar' : 'tabla';
  const setTab = (t: 'tabla' | 'practicar') => setParams(t === 'practicar' ? { practicar: '1' } : {}, { replace: true });
  const settings = useSettings();
  const cards = useLiveQuery(() => db.cards.where('kind').equals('kana').toArray(), []);
  const recognize = useMemo(() => {
    const m = new Map<string, SrsCard>();
    for (const c of cards ?? []) if (c.skill === 'reconocer') m.set(c.itemId, c);
    return m;
  }, [cards]);

  const say = useCallback(
    (text: string) => void tts.speak(text, { rate: settings.speechRate, voiceId: settings.voiceURI }).catch(() => undefined),
    [settings.speechRate, settings.voiceURI],
  );

  return (
    <>
      <PageHeader
        title={script === 'hiragana' ? 'Hiragana' : 'Katakana'}
        jp={INTRO[script].jp}
        subtitle={INTRO[script].text}
        actions={
          <Segmented
            label="Vista"
            value={tab}
            onChange={setTab}
            options={[
              { id: 'tabla', label: 'Tabla' },
              { id: 'practicar', label: 'Practicar' },
            ]}
          />
        }
      />
      <VoiceWarning />
      {tab === 'tabla' ? (
        <KanaTable script={script} cards={recognize} onTap={say} />
      ) : (
        <Practice key={script} script={script} cards={cards ?? []} say={say} autoSpeak={settings.autoSpeak} showRomaji={settings.showRomaji} />
      )}
    </>
  );
}

// ---------------- Tabla ----------------

function KanaTable({ script, cards, onTap }: { script: Script; cards: Map<string, SrsCard>; onTap: (t: string) => void }) {
  const [pulse, setPulse] = useState<string | null>(null);
  return (
    <div className="space-y-7">
      {KANA_GROUPS.map((g) => (
        <section key={g.id}>
          <h2 className="label mb-2.5">{g.label}</h2>
          <div className={`grid gap-2 ${g.columns === 5 ? 'grid-cols-5' : 'grid-cols-3'}`}>
            {KANA_ROWS.filter((r) => r.group === g.id).flatMap((r) =>
              rowCells(r.id, script).map((it, i) =>
                it ? (
                  <button
                    key={it.id}
                    onClick={() => {
                      onTap(it.kana);
                      setPulse(it.id);
                    }}
                    onAnimationEnd={() => setPulse(null)}
                    aria-label={`${it.kana}, ${it.romaji}`}
                    className={`relative flex flex-col items-center justify-center overflow-hidden rounded-xl border border-line bg-surface p-1 transition hover:border-accent ${
                      g.columns === 5 ? 'aspect-square' : 'aspect-[5/3]'
                    } ${pulse === it.id ? 'animate-pop bg-accent-soft' : ''}`}
                  >
                    <span className="font-kana text-[clamp(22px,7.5vw,40px)] font-bold leading-tight">{it.kana}</span>
                    <span className="text-[13px] font-semibold text-muted">{it.romaji}</span>
                    <span className={`absolute inset-x-[22%] bottom-1.5 h-[3px] rounded-full ${MASTERY_BAR[mastery(cards.get(it.id))]}`} />
                  </button>
                ) : (
                  <div key={`${r.id}-${i}`} aria-hidden className="rounded-xl border border-dashed border-line opacity-40" />
                ),
              ),
            )}
          </div>
        </section>
      ))}
      <Legend />
      <p className="text-sm text-muted">
        Toca un carácter para escucharlo. Si no suena, revisa en Configuración que tu dispositivo tenga una voz japonesa.
      </p>
    </div>
  );
}

function Legend() {
  const items: [Mastery, string][] = [
    ['nuevo', 'Nuevo'],
    ['aprendiendo', 'Aprendiendo'],
    ['consolidando', 'Consolidando'],
    ['dominado', 'Dominado'],
  ];
  return (
    <div className="flex flex-wrap gap-4 text-[13px] text-muted">
      {items.map(([m, label]) => (
        <span key={m} className="inline-flex items-center gap-1.5">
          <i className={`inline-block h-2.5 w-2.5 rounded-sm ${MASTERY_BAR[m]}`} />
          {label}
        </span>
      ))}
    </div>
  );
}

// ---------------- Práctica ----------------

interface Question {
  item: KanaItem;
  choices: KanaItem[];
  shownAt: number;
  reason: string;
}

interface Result {
  item: KanaItem;
  correct: boolean;
  given: string;
}

function Practice({
  script,
  cards,
  say,
  autoSpeak,
  showRomaji,
}: {
  script: Script;
  cards: SrsCard[];
  say: (t: string) => void;
  autoSpeak: boolean;
  showRomaji: boolean;
}) {
  const [prefs, setPrefs] = useState(() => loadPrefs(script));
  const [running, setRunning] = useState(false);
  const [results, setResults] = useState<Result[] | null>(null);
  const all = kanaFor(script);
  const selected = all.filter((it) => prefs.rows.includes(it.row));
  const update = (p: Partial<typeof prefs>) => {
    const next = { ...prefs, ...p };
    setPrefs(next);
    savePrefs(script, next);
  };

  const mode = MODES.find((m) => m.id === prefs.mode)!;
  const skillCards = useMemo(() => {
    const m = new Map<string, SrsCard>();
    for (const c of cards) if (c.skill === mode.skill) m.set(c.itemId, c);
    return m;
  }, [cards, mode.skill]);
  const dueInSelection = selected.filter((it) => {
    const c = skillCards.get(it.id);
    return c && c.lastReview != null && c.due <= Date.now();
  }).length;
  const dueElsewhere = all.filter((it) => {
    const c = skillCards.get(it.id);
    return !prefs.rows.includes(it.row) && c && c.lastReview != null && c.due <= Date.now();
  });

  if (running) {
    return (
      <Quiz
        items={selected}
        pool={all}
        mode={mode}
        skillCards={skillCards}
        maxNew={prefs.maxNew}
        say={say}
        autoSpeak={autoSpeak}
        showRomaji={showRomaji}
        onFinish={(r) => {
          setRunning(false);
          setResults(r);
        }}
      />
    );
  }

  if (results) {
    return <Summary results={results} onAgain={() => { setResults(null); setRunning(true); }} onClose={() => setResults(null)} />;
  }

  return (
    <div className="card space-y-6 p-5">
      <div>
        <div className="label mb-2">Filas</div>
        <div className="space-y-3">
          {KANA_GROUPS.map((g) => (
            <div key={g.id}>
              <div className="mb-1.5 text-[13px] font-semibold text-muted">{g.label}</div>
              <div className="flex flex-wrap gap-1.5">
                {KANA_ROWS.filter((r) => r.group === g.id).map((r) => {
                  const on = prefs.rows.includes(r.id);
                  const first = rowCells(r.id, script).find(Boolean)!;
                  return (
                    <button
                      key={r.id}
                      aria-pressed={on}
                      onClick={() => update({ rows: on ? prefs.rows.filter((x) => x !== r.id) : [...prefs.rows, r.id] })}
                      className={`chip ${on ? 'chip-on' : ''}`}
                    >
                      <span className={`font-kana text-base ${on ? '' : 'text-ink'}`}>{first.kana}</span>
                      {r.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 flex gap-4 text-sm font-bold text-accent">
          <button onClick={() => update({ rows: KANA_ROWS.filter((r) => r.group === 'basic').map((r) => r.id) })}>Básicos</button>
          <button onClick={() => update({ rows: KANA_ROWS.map((r) => r.id) })}>Todo</button>
          <button onClick={() => update({ rows: [] })}>Ninguna</button>
        </div>
        {dueElsewhere.length > 0 && (
          <p className="mt-3 rounded-xl bg-accent-soft px-3 py-2 text-sm">
            Tienes {dueElsewhere.length} repaso{dueElsewhere.length > 1 ? 's' : ''} vencido{dueElsewhere.length > 1 ? 's' : ''} en filas no seleccionadas.{' '}
            <button
              className="font-bold text-accent underline"
              onClick={() => update({ rows: [...new Set([...prefs.rows, ...dueElsewhere.map((it) => it.row)])] })}
            >
              Agregarlas
            </button>
          </p>
        )}
      </div>

      <div>
        <div className="label mb-2">Modo</div>
        <div className="grid grid-cols-2 gap-2">
          {MODES.map((m) => (
            <button
              key={m.id}
              role="radio"
              aria-checked={m.id === prefs.mode}
              onClick={() => update({ mode: m.id })}
              className={`rounded-xl border p-3 text-left transition ${m.id === prefs.mode ? 'border-accent bg-accent-soft ring-1 ring-accent' : 'border-line bg-surface'}`}
            >
              <div className="font-bold">{m.title}</div>
              <div className="text-[13px] text-muted">{m.sub}</div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="label mb-2">Kana nuevos por sesión</div>
        <Segmented
          label="Kana nuevos por sesión"
          value={String(prefs.maxNew)}
          onChange={(v) => update({ maxNew: Number(v) })}
          options={['3', '5', '8', '12'].map((n) => ({ id: n, label: n }))}
        />
        <p className="mt-2 text-sm text-muted">Pocos nuevos y bien repasados rinden más que muchos a medias.</p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
        <p className="text-sm text-muted">
          {selected.length ? `${selected.length} caracteres · ${dueInSelection} por repasar · ${SESSION_LENGTH} preguntas` : 'Elige al menos una fila.'}
        </p>
        <button className="btn-primary" disabled={!selected.length} onClick={() => setRunning(true)}>
          Empezar
        </button>
      </div>
    </div>
  );
}

function mistakeTag(item: KanaItem, chosen: KanaItem | null, given: string, skill: Skill): string {
  const twin = chosen ?? kanaFor(item.script).find((k) => k.accepted.includes(normalizeRomaji(given)));
  if (twin && lookalikesOf(item.kana).includes(twin.kana)) {
    return `confusión ${[item.kana, twin.kana].sort().join('/')}`;
  }
  if (skill === 'escuchar' && twin) return `oído ${[item.romaji, twin.romaji].sort().join('/')}`;
  return `${skill === 'producir' ? 'forma' : skill === 'escuchar' ? 'oído' : 'lectura'} ${item.kana}`;
}

function Quiz({
  items,
  pool,
  mode,
  skillCards,
  maxNew,
  say,
  autoSpeak,
  showRomaji,
  onFinish,
}: {
  items: KanaItem[];
  pool: KanaItem[];
  mode: (typeof MODES)[number];
  skillCards: Map<string, SrsCard>;
  maxNew: number;
  say: (t: string) => void;
  autoSpeak: boolean;
  showRomaji: boolean;
  onFinish: (r: Result[]) => void;
}) {
  const [q, setQ] = useState<Question | null>(null);
  const [answered, setAnswered] = useState<{ correct: boolean; chosen: KanaItem | null; given: string } | null>(null);
  const [typed, setTyped] = useState('');
  const results = useRef<Result[]>([]);
  const newCount = useRef(0);
  const lastId = useRef<string | null>(null);
  const timer = useRef<number>();
  const cardsRef = useRef(skillCards);
  cardsRef.current = skillCards;
  const inputRef = useRef<HTMLInputElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  useStudyTimer('kana');

  const next = useCallback(() => {
    window.clearTimeout(timer.current);
    if (results.current.length >= SESSION_LENGTH) {
      onFinish(results.current);
      return;
    }
    const { item, reason } = pickNextItem(items, cardsRef.current, { lastId: lastId.current, newIntroduced: newCount.current, maxNew });
    if (reason === 'nuevo') newCount.current++;
    lastId.current = item.id;
    const choices = buildChoices(item, items.length >= 6 ? items : pool, {
      preferred: pool.filter((k) => lookalikesOf(item.kana).includes(k.kana)),
    });
    setQ({ item, choices, shownAt: Date.now(), reason });
    setAnswered(null);
    setTyped('');
    if (mode.id === 'audio-choice') say(item.kana);
  }, [items, pool, maxNew, mode.id, say, onFinish]);

  useEffect(() => {
    next();
    return () => window.clearTimeout(timer.current);
    // Solo al montar.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!q) return;
    if (mode.id === 'kana-typed') inputRef.current?.focus();
  }, [q, mode.id]);

  const answer = (correct: boolean, chosen: KanaItem | null, given: string) => {
    if (!q || answered) return;
    setAnswered({ correct, chosen, given });
    results.current.push({ item: q.item, correct, given });
    void recordAnswer({
      itemId: q.item.id,
      kind: 'kana',
      skill: mode.skill,
      correct,
      responseMs: Date.now() - q.shownAt,
      given,
      mistakeTag: correct ? undefined : mistakeTag(q.item, chosen, given, mode.skill),
    });
    if (autoSpeak && mode.id !== 'audio-choice') say(q.item.kana);
    // En "audio → kana" el siguiente audio debe nacer de un toque (iPhone bloquea la voz sin toque).
    if (correct && mode.id !== 'audio-choice') timer.current = window.setTimeout(next, 1000);
    else window.setTimeout(() => nextRef.current?.focus(), 0);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (answered && e.key === 'Enter' && (e.target as HTMLElement).tagName !== 'BUTTON') {
        e.preventDefault();
        next();
      } else if (!answered && q && /^[1-4]$/.test(e.key) && (e.target as HTMLElement).tagName !== 'INPUT') {
        const c = q.choices[Number(e.key) - 1];
        if (c) answer(c.id === q.item.id, c, c.romaji);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  if (!q) return null;
  const { item } = q;
  const ok = results.current.filter((r) => r.correct).length;
  const promptIsKana = mode.id === 'kana-choice' || mode.id === 'kana-typed';
  const optionsAreKana = mode.id === 'romaji-choice' || mode.id === 'audio-choice';

  return (
    <div>
      <div className="mb-3 flex items-center justify-between text-sm font-bold text-muted">
        <button className="text-accent" onClick={() => onFinish(results.current)}>
          ← Terminar
        </button>
        <span className="tabular-nums">
          {results.current.length}/{SESSION_LENGTH} · {ok} aciertos
        </span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-sunken">
        <div className="h-full bg-accent transition-[width]" style={{ width: `${(results.current.length / SESSION_LENGTH) * 100}%` }} />
      </div>

      <div
        className={`card mt-4 p-5 text-center transition-colors ${answered ? (answered.correct ? 'border-good' : 'border-bad') : ''}`}
      >
        <div className="text-sm font-semibold text-muted">
          {q.reason === 'nuevo' && <span className="mr-2 rounded-full bg-accent-soft px-2 py-0.5 text-xs font-extrabold text-accent">NUEVO</span>}
          {promptIsKana ? '¿Cómo se lee?' : mode.id === 'audio-choice' ? '¿Qué escuchaste?' : `¿Cuál es en ${item.script}?`}
        </div>

        <button
          onClick={() => say(item.kana)}
          aria-label="Escuchar"
          className={`mx-auto my-4 block min-h-[1.2em] leading-tight ${
            promptIsKana ? 'font-kana text-[clamp(88px,28vw,140px)] font-bold' : 'text-[clamp(56px,18vw,96px)] font-extrabold'
          }`}
        >
          {promptIsKana ? item.kana : mode.id === 'audio-choice' ? <span aria-hidden>🔊</span> : item.romaji}
        </button>

        {q.reason === 'nuevo' && !answered && promptIsKana && showRomaji && (
          <p className="-mt-2 mb-4 text-sm text-muted">
            Pista: se lee <b>{item.romaji}</b>. Tócalo para escucharlo.
          </p>
        )}

        {mode.id === 'kana-typed' ? (
          <form
            className="flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              if (!typed.trim() || answered) return;
              answer(isCorrectRomaji(typed, item), null, typed.trim());
            }}
          >
            <input
              ref={inputRef}
              value={typed}
              onChange={(e) => setTyped(e.target.value)}
              disabled={!!answered}
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
              placeholder="romaji"
              aria-label="Respuesta en romaji"
              className="input text-center text-xl font-bold"
            />
            <button className="btn-primary" type="submit" disabled={!!answered}>
              OK
            </button>
          </form>
        ) : (
          <div className="grid grid-cols-2 gap-2.5">
            {q.choices.map((c, i) => {
              const isAnswer = c.id === item.id;
              const isChosen = answered?.chosen?.id === c.id;
              const state = answered ? (isAnswer ? 'border-good bg-good-soft text-good' : isChosen ? 'border-bad bg-bad-soft text-bad' : 'opacity-50') : '';
              return (
                <button
                  key={c.id}
                  disabled={!!answered}
                  onClick={() => answer(isAnswer, c, optionsAreKana ? c.kana : c.romaji)}
                  className={`relative rounded-2xl border border-line bg-sunken px-2 py-3.5 font-extrabold transition active:scale-[0.97] ${
                    optionsAreKana ? 'font-kana text-[32px] font-bold' : 'text-[22px]'
                  } ${state}`}
                >
                  <span className="absolute left-2.5 top-1.5 hidden font-ui text-[11px] text-muted [@media(hover:hover)]:block">{i + 1}</span>
                  {optionsAreKana ? c.kana : c.romaji}
                </button>
              );
            })}
          </div>
        )}

        <div aria-live="assertive" className={`mt-4 min-h-[1.5em] text-lg font-extrabold ${answered?.correct ? 'text-good' : 'text-bad'}`}>
          {answered &&
            (answered.correct
              ? `Correcto: ${item.kana} = ${item.romaji}`
              : `${answered.given ? `Respondiste «${answered.given}». ` : ''}Es ${item.kana} = ${item.accepted.join(' / ')}`)}
        </div>
        {answered && (!answered.correct || mode.id === 'audio-choice') && (
          <>
            {!answered.correct && lookalikesOf(item.kana).length > 0 && (
              <p className="mt-1 text-sm text-muted">
                Ojo: {item.kana} se parece a {lookalikesOf(item.kana).join(', ')}. Fíjate en la diferencia antes de seguir.
              </p>
            )}
            <button ref={nextRef} className="btn-primary mt-3 w-full" onClick={next}>
              Siguiente
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function Summary({ results, onAgain, onClose }: { results: Result[]; onAgain: () => void; onClose: () => void }) {
  const ok = results.filter((r) => r.correct).length;
  const failed = [...new Map(results.filter((r) => !r.correct).map((r) => [r.item.id, r.item])).values()];
  return (
    <div className="card p-6">
      <div className="label">Resumen de la sesión</div>
      <div className="mt-2 text-4xl font-extrabold tabular-nums">
        {ok}/{results.length}
      </div>
      <p className="mt-1 text-muted">
        {results.length === 0
          ? 'No respondiste ninguna pregunta.'
          : ok === results.length
            ? 'Sin errores. Los volverás a ver cuando el algoritmo estime que estás por olvidarlos.'
            : 'Los que fallaste vuelven pronto: FSRS los programa para dentro de minutos.'}
      </p>
      {failed.length > 0 && (
        <>
          <div className="label mb-2 mt-5">Para reforzar</div>
          <div className="flex flex-wrap gap-2">
            {failed.map((it) => (
              <span key={it.id} className="rounded-xl bg-bad-soft px-3 py-1.5 text-bad">
                <span className="font-kana text-xl font-bold">{it.kana}</span> <span className="text-sm font-bold">{it.romaji}</span>
              </span>
            ))}
          </div>
        </>
      )}
      <div className="mt-6 flex flex-wrap gap-2">
        <button className="btn-primary" onClick={onAgain}>
          Otra ronda
        </button>
        <button className="btn-ghost" onClick={onClose}>
          Cambiar filas o modo
        </button>
      </div>
    </div>
  );
}
