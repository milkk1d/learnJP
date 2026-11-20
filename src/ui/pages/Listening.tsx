import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../db/db';
import { recordAnswer } from '../../db/repo';
import { loadListening, TOPICS, type ListeningItem, type Topic } from '../../content/listening';
import { kanaReading } from '../../core/furigana';
import { shuffle } from '../../core/answers';
import { pickNextItem } from '../../core/kanaSession';
import type { SrsCard } from '../../core/srs';
import { playNative, stopNative } from '../../speech/nativeAudio';
import { useSettings, useStudyTimer } from '../hooks';
import { Furigana } from '../components/Furigana';
import { PageHeader, Segmented } from '../components/ui';

type Len = 'corta' | 'media' | 'todas';
const ROUND = 10;

function useListening() {
  const [items, setItems] = useState<ListeningItem[] | null>(null);
  const [error, setError] = useState('');
  useEffect(() => {
    loadListening().then(setItems, () => setError('No se pudo cargar el banco de audios.'));
  }, []);
  return { items, error };
}

function filterItems(items: ListeningItem[], len: Len, topic: Topic | null, needEs: boolean) {
  return items.filter(
    (it) =>
      (len === 'todas' || it.length === len || (len === 'media' && it.length === 'corta')) &&
      (!topic || it.topics.includes(topic)) &&
      (!needEs || it.es.length > 0),
  );
}

function Attribution({ it }: { it: ListeningItem }) {
  return (
    <a href={it.sourceUrl} target="_blank" rel="noreferrer" className="text-[11px] text-muted underline-offset-2 hover:underline">
      Voz nativa: {it.voice} · {it.license} · Tatoeba #{it.id}
    </a>
  );
}

function PlayButtons({ url, onError }: { url: string; onError: (m: string) => void }) {
  const play = (rate: number) => playNative(url, rate).catch((e: Error) => onError(e.message));
  return (
    <div className="flex gap-1.5">
      <button className="btn-primary px-3 py-2 text-sm" onClick={() => play(1)} aria-label="Reproducir">
        ▶ Normal
      </button>
      <button className="btn-ghost px-3 py-2 text-sm" onClick={() => play(0.75)} aria-label="Reproducir más lento">
        🐢 Lento
      </button>
    </div>
  );
}

export function Listening() {
  const [params, setParams] = useSearchParams();
  const tab = params.get('explorar') ? 'explorar' : 'practicar';
  const { items, error } = useListening();
  useEffect(() => stopNative, []);

  return (
    <>
      <PageHeader
        title="Comprensión auditiva"
        jp="ききとり"
        subtitle="Frases grabadas por japoneses nativos. Primero escucha sin leer; el texto aparece después."
        actions={
          <Segmented
            label="Vista"
            value={tab}
            onChange={(t) => setParams(t === 'explorar' ? { explorar: '1' } : {}, { replace: true })}
            options={[
              { id: 'practicar', label: 'Practicar' },
              { id: 'explorar', label: 'Explorar' },
            ]}
          />
        }
      />
      {error && <p className="card p-4 text-bad">{error}</p>}
      {!items && !error && <p className="text-muted">Cargando audios…</p>}
      {items && (tab === 'practicar' ? <Practice items={items} /> : <Explore items={items} />)}
      <p className="mt-8 text-xs text-muted">
        Audios y frases de <a className="underline" href="https://tatoeba.org" target="_blank" rel="noreferrer">Tatoeba</a>, grabados por usuarios que declaran japonés
        nativo, con licencias CC BY / CC BY-NC. Las traducciones son de voluntarios de Tatoeba y no están revisadas por Nihongo Quest; los temas se detectan
        automáticamente. Las lecturas (furigana) y el romaji son automáticos y pueden tener errores puntuales. El romaji se puede apagar en Configuración.
      </p>
    </>
  );
}

// ---------------- Explorar ----------------

function Explore({ items }: { items: ListeningItem[] }) {
  const settings = useSettings();
  const [len, setLen] = useState<Len>('corta');
  const [topic, setTopic] = useState<Topic | null>(null);
  const [onlyEs, setOnlyEs] = useState(true);
  const [limit, setLimit] = useState(20);
  const [msg, setMsg] = useState('');
  const list = useMemo(() => filterItems(items, len, topic, onlyEs), [items, len, topic, onlyEs]);
  useStudyTimer('escucha');

  return (
    <div>
      <Filters len={len} setLen={setLen} topic={topic} setTopic={setTopic} />
      <label className="mb-4 flex items-center gap-2 text-sm font-semibold">
        <input type="checkbox" checked={onlyEs} onChange={(e) => setOnlyEs(e.target.checked)} className="h-4 w-4 accent-[rgb(var(--accent))]" />
        Solo frases con traducción al español
      </label>
      <p className="mb-3 text-sm text-muted">{list.length} frases</p>
      {msg && <p className="mb-3 rounded-xl bg-bad-soft px-3 py-2 text-sm text-bad">{msg}</p>}
      <ul className="space-y-3">
        {list.slice(0, limit).map((it) => (
          <li key={it.id} className="card p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <Furigana markup={it.reading} fallback={it.jp} show={settings.showFurigana} className="text-xl leading-[2.1]" />
                {it.reading && <div className="font-jp text-sm text-muted">{kanaReading(it.reading)}</div>}
                {settings.showRomaji && it.romaji && <div className="mt-0.5 font-semibold italic text-ink/80">{it.romaji}</div>}
                {settings.showTranslation && <div className="mt-1">{it.es[0] ?? <span className="text-muted">{it.en[0]} (inglés)</span>}</div>}
              </div>
              <PlayButtons url={it.audioUrl} onError={setMsg} />
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              {it.topics.map((t) => (
                <span key={t} className="rounded-full bg-sunken px-2 py-0.5 text-[11px] font-bold text-muted">
                  {t}
                </span>
              ))}
              <Attribution it={it} />
            </div>
          </li>
        ))}
      </ul>
      {limit < list.length && (
        <button className="btn-ghost mt-4 w-full" onClick={() => setLimit(limit + 20)}>
          Ver más
        </button>
      )}
    </div>
  );
}

function Filters({ len, setLen, topic, setTopic }: { len: Len; setLen: (l: Len) => void; topic: Topic | null; setTopic: (t: Topic | null) => void }) {
  return (
    <div className="mb-4 space-y-3">
      <Segmented
        label="Largo"
        value={len}
        onChange={setLen}
        options={[
          { id: 'corta', label: 'Cortas' },
          { id: 'media', label: 'Hasta medias' },
          { id: 'todas', label: 'Todas' },
        ]}
      />
      <div className="flex flex-wrap gap-1.5">
        <button className={`chip ${topic == null ? 'chip-on' : ''}`} onClick={() => setTopic(null)}>
          Todos los temas
        </button>
        {TOPICS.map((t) => (
          <button key={t} className={`chip ${topic === t ? 'chip-on' : ''}`} onClick={() => setTopic(topic === t ? null : t)}>
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}

// ---------------- Practicar ----------------

interface Result {
  it: ListeningItem;
  correct: boolean;
}

function Practice({ items }: { items: ListeningItem[] }) {
  const [len, setLen] = useState<Len>('corta');
  const [topic, setTopic] = useState<Topic | null>(null);
  const [running, setRunning] = useState(false);
  const [results, setResults] = useState<Result[] | null>(null);
  const pool = useMemo(() => filterItems(items, len, topic, true), [items, len, topic]);
  const allWithEs = useMemo(() => items.filter((i) => i.es.length > 0), [items]);

  if (running) {
    return (
      <Quiz
        pool={pool}
        distractors={allWithEs}
        onFinish={(r) => {
          setRunning(false);
          setResults(r);
        }}
      />
    );
  }
  if (results) {
    const ok = results.filter((r) => r.correct).length;
    return (
      <div className="card p-6">
        <div className="label">Resumen</div>
        <div className="mt-2 text-4xl font-extrabold tabular-nums">
          {ok}/{results.length}
        </div>
        <p className="mt-1 text-muted">Las frases que fallaste vuelven antes; las que entendiste se espacian.</p>
        <div className="mt-5 flex gap-2">
          <button className="btn-primary" onClick={() => { setResults(null); setRunning(true); }}>
            Otra ronda
          </button>
          <button className="btn-ghost" onClick={() => setResults(null)}>
            Cambiar filtros
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="card space-y-5 p-5">
      <div>
        <div className="label mb-2">Qué practicar</div>
        <Filters len={len} setLen={setLen} topic={topic} setTopic={setTopic} />
      </div>
      <div className="rounded-xl bg-sunken p-3 text-sm">
        <b>Cómo funciona:</b> escuchas una frase real (sin texto) y eliges qué significa. Puedes repetirla y bajarle la velocidad. Al responder ves el japonés, su
        lectura y la traducción. Al principio vas a entender poco: es normal. Se trata de acostumbrar el oído al ritmo.
      </div>
      <div className="flex items-center justify-between gap-3 border-t border-line pt-4">
        <p className="text-sm text-muted">{pool.length >= 4 ? `${pool.length} frases disponibles · ${ROUND} preguntas` : 'Muy pocas frases con estos filtros.'}</p>
        <button className="btn-primary" disabled={pool.length < 4} onClick={() => setRunning(true)}>
          Empezar
        </button>
      </div>
    </div>
  );
}

function Quiz({ pool, distractors, onFinish }: { pool: ListeningItem[]; distractors: ListeningItem[]; onFinish: (r: Result[]) => void }) {
  const settings = useSettings();
  const cards = useLiveQuery(() => db.cards.where('skill').equals('escuchar').toArray(), []);
  const cardsRef = useRef(new Map<string, SrsCard>());
  cardsRef.current = new Map((cards ?? []).map((c) => [c.itemId, c]));
  const [q, setQ] = useState<{ it: ListeningItem; options: ListeningItem[]; shownAt: number } | null>(null);
  const [answered, setAnswered] = useState<{ chosen: ListeningItem; correct: boolean } | null>(null);
  const [msg, setMsg] = useState('');
  const results = useRef<Result[]>([]);
  const lastId = useRef<string | null>(null);
  const newCount = useRef(0);
  useStudyTimer('escucha');

  const wrapped = useMemo(() => pool.map((it) => ({ id: it.itemId, it })), [pool]);

  const play = useCallback((it: ListeningItem, rate = 1) => playNative(it.audioUrl, rate).catch((e: Error) => setMsg(e.message)), []);

  const next = useCallback(() => {
    if (results.current.length >= ROUND) {
      stopNative();
      onFinish(results.current);
      return;
    }
    const { item, reason } = pickNextItem(wrapped, cardsRef.current, { lastId: lastId.current, newIntroduced: newCount.current, maxNew: ROUND });
    if (reason === 'nuevo') newCount.current++;
    lastId.current = item.id;
    const it = item.it;
    const others = shuffle(distractors.filter((d) => d.id !== it.id && d.es[0] !== it.es[0]));
    // Distractores de largo parecido para que no se adivine por la duración.
    const similar = others.filter((d) => d.length === it.length).slice(0, 3);
    const options = shuffle([it, ...(similar.length === 3 ? similar : others.slice(0, 3))]);
    setQ({ it, options, shownAt: Date.now() });
    setAnswered(null);
    setMsg('');
    void play(it);
  }, [wrapped, distractors, onFinish, play]);

  useEffect(() => {
    next();
    return () => stopNative();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!q) return null;
  const { it } = q;

  const choose = (opt: ListeningItem) => {
    if (answered) return;
    const correct = opt.id === it.id;
    setAnswered({ chosen: opt, correct });
    results.current.push({ it, correct });
    void recordAnswer({
      itemId: it.itemId,
      kind: 'phrase',
      skill: 'escuchar',
      correct,
      responseMs: Date.now() - q.shownAt,
      given: opt.es[0],
      mistakeTag: correct ? undefined : `escucha: ${it.topics[0] ?? 'general'} (${it.length})`,
    });
  };

  return (
    <div>
      <div className="mb-3 flex items-center justify-between text-sm font-bold text-muted">
        <button className="text-accent" onClick={() => { stopNative(); onFinish(results.current); }}>
          ← Terminar
        </button>
        <span className="tabular-nums">
          {results.current.length}/{ROUND}
        </span>
      </div>
      <div className="card p-5">
        <div className="text-center text-sm font-semibold text-muted">¿Qué significa lo que escuchaste?</div>
        <div className="my-5 flex justify-center gap-2">
          <button className="btn-primary text-lg" onClick={() => play(it)}>
            ▶ Escuchar
          </button>
          <button className="btn-ghost" onClick={() => play(it, 0.75)}>
            🐢 Más lento
          </button>
        </div>
        {msg && <p className="mb-3 rounded-xl bg-bad-soft px-3 py-2 text-sm text-bad">{msg}</p>}
        <div className="grid gap-2">
          {q.options.map((opt) => {
            const state = answered
              ? opt.id === it.id
                ? 'border-good bg-good-soft text-good'
                : opt.id === answered.chosen.id
                  ? 'border-bad bg-bad-soft text-bad'
                  : 'opacity-50'
              : '';
            return (
              <button
                key={opt.id}
                disabled={!!answered}
                onClick={() => choose(opt)}
                className={`rounded-xl border border-line bg-sunken px-4 py-3 text-left font-semibold transition active:scale-[0.99] ${state}`}
              >
                {opt.es[0]}
              </button>
            );
          })}
        </div>
        {answered && (
          <div className="mt-5 rounded-xl border border-line p-4">
            <div className={`mb-2 font-extrabold ${answered.correct ? 'text-good' : 'text-bad'}`}>{answered.correct ? 'Bien entendido.' : 'Esta vez no.'}</div>
            <Furigana markup={it.reading} fallback={it.jp} show={settings.showFurigana} className="text-xl leading-[2.1]" />
            {it.reading && <div className="font-jp text-sm text-muted">{kanaReading(it.reading)}</div>}
            {settings.showRomaji && it.romaji && <div className="mt-1 font-semibold italic text-ink/80">{it.romaji}</div>}
            <div className="mt-1">{it.es[0]}</div>
            {!answered.correct && <p className="mt-2 text-sm text-muted">Escúchala de nuevo leyendo el texto: fíjate qué parte no reconociste.</p>}
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
              <Attribution it={it} />
              <div className="flex gap-2">
                <button className="btn-ghost text-sm" onClick={() => play(it)}>
                  ▶ Otra vez
                </button>
                <button className="btn-primary text-sm" onClick={next}>
                  Siguiente
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
