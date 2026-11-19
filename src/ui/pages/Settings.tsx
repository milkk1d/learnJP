import { useEffect, useRef, useState } from 'react';
import { exportAll, importAll, resetAll, updateProfile, updateSettings } from '../../db/repo';
import type { ItineraryStop } from '../../db/db';
import { tts, type VoiceInfo } from '../../speech/tts';
import { useProfile, useSettings } from '../hooks';
import { PageHeader, Segmented, Toggle } from '../components/ui';

function Section({ title, children, hint }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <section className="card mb-5 p-5">
      <h2 className="text-lg font-extrabold">{title}</h2>
      {hint && <p className="mb-2 text-sm text-muted">{hint}</p>}
      <div className="mt-2">{children}</div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-semibold text-muted">{label}</span>
      {children}
    </label>
  );
}

export function Settings() {
  const profile = useProfile();
  const settings = useSettings();
  const [voices, setVoices] = useState<VoiceInfo[] | null>(null);
  const [message, setMessage] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    void tts.voices().then(setVoices);
  }, []);

  const setStop = (id: string, patch: Partial<ItineraryStop>) =>
    updateProfile({ itinerary: profile.itinerary.map((s) => (s.id === id ? { ...s, ...patch } : s)) });

  const download = async () => {
    const data = await exportAll();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `nihongo-quest-respaldo-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
    setMessage('Respaldo descargado.');
  };

  const upload = async (file: File) => {
    try {
      const json = JSON.parse(await file.text());
      if (!confirm('Esto reemplazará todo el progreso de este dispositivo por el del archivo. ¿Continuar?')) return;
      await importAll(json);
      setMessage('Progreso importado correctamente.');
    } catch (e) {
      setMessage(e instanceof Error ? e.message : 'No se pudo importar el archivo.');
    }
  };

  return (
    <>
      <PageHeader title="Configuración" jp="せってい" />

      <Section title="Viaje" hint="La cuenta regresiva y el calendario usan estas fechas. Puedes cambiarlas cuando quieras.">
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Salida a Japón">
            <input type="date" className="input" value={profile.tripStart} onChange={(e) => e.target.value && updateProfile({ tripStart: e.target.value })} />
          </Field>
          <Field label="Regreso">
            <input type="date" className="input" value={profile.tripEnd} onChange={(e) => e.target.value && updateProfile({ tripEnd: e.target.value })} />
          </Field>
          <Field label="Minutos de estudio por día">
            <input
              type="number"
              min={5}
              max={180}
              step={5}
              className="input"
              value={profile.dailyMinutes}
              onChange={(e) => updateProfile({ dailyMinutes: Math.max(5, Number(e.target.value) || 30) })}
            />
          </Field>
          <Field label="Días de estudio por semana">
            <input
              type="number"
              min={1}
              max={7}
              className="input"
              value={profile.studyDaysPerWeek}
              onChange={(e) => updateProfile({ studyDaysPerWeek: Math.min(7, Math.max(1, Number(e.target.value) || 6)) })}
            />
          </Field>
        </div>
      </Section>

      <Section title="Itinerario" hint="Se usará para ordenar las simulaciones de viaje. Agrega, borra o cambia destinos.">
        <ul className="space-y-3">
          {profile.itinerary.map((s) => (
            <li key={s.id} className="rounded-xl border border-line p-3">
              <div className="flex gap-2">
                <input className="input font-semibold" value={s.place} aria-label="Destino" onChange={(e) => setStop(s.id, { place: e.target.value })} />
                <button
                  className="btn-ghost px-3"
                  aria-label={`Quitar ${s.place}`}
                  onClick={() => updateProfile({ itinerary: profile.itinerary.filter((x) => x.id !== s.id) })}
                >
                  ✕
                </button>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <input type="date" className="input" aria-label="Desde" value={s.from} onChange={(e) => setStop(s.id, { from: e.target.value })} />
                <input type="date" className="input" aria-label="Hasta" value={s.to} onChange={(e) => setStop(s.id, { to: e.target.value })} />
              </div>
              <input className="input mt-2" placeholder="Notas (hotel, actividades…)" value={s.notes} onChange={(e) => setStop(s.id, { notes: e.target.value })} />
            </li>
          ))}
        </ul>
        <button
          className="btn-ghost mt-3"
          onClick={() => updateProfile({ itinerary: [...profile.itinerary, { id: crypto.randomUUID(), place: 'Nuevo destino', from: '', to: '', notes: '' }] })}
        >
          + Agregar destino
        </button>
      </Section>

      <Section title="Visualización" hint="Al principio conviene ver romaji; la idea es ir apagándolo.">
        <div className="mb-3">
          <Segmented
            label="Tema"
            value={settings.theme}
            onChange={(v) => updateSettings({ theme: v })}
            options={[
              { id: 'system', label: 'Sistema' },
              { id: 'light', label: 'Claro' },
              { id: 'dark', label: 'Oscuro' },
            ]}
          />
        </div>
        <div className="divide-y divide-line">
          <Toggle checked={settings.showRomaji} onChange={(v) => updateSettings({ showRomaji: v })} label="Mostrar romaji" hint="Pistas en romaji para kana nuevos y en las fichas." />
          <Toggle checked={settings.showFurigana} onChange={(v) => updateSettings({ showFurigana: v })} label="Mostrar furigana" hint="Lectura en hiragana encima de los kanji." />
          <Toggle checked={settings.showTranslation} onChange={(v) => updateSettings({ showTranslation: v })} label="Mostrar traducciones" hint="Apágalas para entrenar comprensión." />
          <Toggle checked={settings.achievements} onChange={(v) => updateSettings({ achievements: v })} label="Logros" hint="Opcional. Llegan con el hito 6." />
        </div>
      </Section>

      <Section title="Voz" hint="Se usa la voz japonesa de tu dispositivo. Es gratis y no requiere cuenta.">
        {voices === null ? (
          <p className="text-muted">Buscando voces…</p>
        ) : voices.length === 0 ? (
          <div className="rounded-xl bg-accent-soft p-3 text-sm">
            <p className="font-bold">No encontré una voz japonesa en este dispositivo.</p>
            <ul className="mt-1 list-disc pl-5">
              <li>iPhone: Ajustes → Accesibilidad → Contenido leído → Voces → Japonés.</li>
              <li>Windows: Configuración → Hora e idioma → Voz → Agregar voces → Japonés.</li>
              <li>Android: Ajustes → Idioma → Salida de texto a voz → datos de japonés.</li>
            </ul>
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Voz japonesa">
              <select className="input" value={settings.voiceURI ?? ''} onChange={(e) => updateSettings({ voiceURI: e.target.value || null })}>
                <option value="">Automática</option>
                {voices.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.name} {v.local ? '' : '(en línea)'}
                  </option>
                ))}
              </select>
            </Field>
            <Field label={`Velocidad: ${settings.speechRate.toFixed(2)}×`}>
              <input
                type="range"
                min={0.5}
                max={1.2}
                step={0.05}
                value={settings.speechRate}
                onChange={(e) => updateSettings({ speechRate: Number(e.target.value) })}
                className="w-full accent-[rgb(var(--accent))]"
              />
            </Field>
          </div>
        )}
        <div className="mt-3 flex flex-wrap gap-2">
          <button className="btn-ghost" onClick={() => void tts.speak('すみません、駅はどこですか。', { rate: settings.speechRate, voiceId: settings.voiceURI }).catch(() => setMessage('Este navegador no puede pronunciar texto.'))}>
            Probar: すみません、駅はどこですか。
          </button>
        </div>
        <div className="divide-y divide-line">
          <Toggle checked={settings.autoSpeak} onChange={(v) => updateSettings({ autoSpeak: v })} label="Pronunciar al responder" />
        </div>
      </Section>

      <Section title="Tus datos" hint="Todo se guarda solo en este dispositivo. Exporta un respaldo para pasarlo al otro (iPhone ↔ PC).">
        <div className="flex flex-wrap gap-2">
          <button className="btn-primary" onClick={download}>
            Exportar progreso
          </button>
          <button className="btn-ghost" onClick={() => fileRef.current?.click()}>
            Importar progreso
          </button>
          <input ref={fileRef} type="file" accept="application/json,.json" hidden onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])} />
          <button
            className="btn-ghost text-bad"
            onClick={async () => {
              if (!confirm('¿Borrar TODO tu progreso de este dispositivo? No se puede deshacer.')) return;
              await resetAll();
              setMessage('Progreso borrado.');
            }}
          >
            Borrar todo
          </button>
        </div>
        <p className="mt-3 text-sm text-muted">Exportación a Anki: llega con el vocabulario (hito 2), para que exporte fichas completas y no solo kana.</p>
        {message && (
          <p role="status" className="mt-3 rounded-xl bg-sunken px-3 py-2 text-sm font-semibold">
            {message}
          </p>
        )}
      </Section>
    </>
  );
}
