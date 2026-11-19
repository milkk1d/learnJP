import { useEffect, useState, type ReactNode } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { SECTIONS, type Section } from '../content/sections';

const GROUPS: { title: string; ids: string[] }[] = [
  { title: 'Estudio', ids: ['inicio', 'curso', 'repaso', 'examenes'] },
  { title: 'Escritura', ids: ['hiragana', 'katakana', 'kanji'] },
  { title: 'Idioma', ids: ['vocabulario', 'gramatica', 'escucha', 'pronunciacion'] },
  { title: 'Práctica real', ids: ['conversaciones', 'teleprompter', 'simulador'] },
  { title: 'Tú', ids: ['estadisticas', 'configuracion'] },
];

const MOBILE_TABS = ['inicio', 'hiragana', 'katakana', 'estadisticas'];

const byId = (id: string) => SECTIONS.find((s) => s.id === id)!;

function NavItem({ s, onClick }: { s: Section; onClick?: () => void }) {
  return (
    <NavLink
      to={s.path}
      end={s.path === '/'}
      onClick={onClick}
      className={({ isActive }) =>
        `group flex items-center gap-3 rounded-xl px-3 py-2 text-[15px] font-semibold transition ${
          isActive ? 'bg-surface text-ink shadow-soft' : 'text-muted hover:text-ink'
        }`
      }
    >
      {({ isActive }) => (
        <>
          <span
            className={`grid h-7 w-7 place-items-center rounded-lg font-jp text-[15px] font-bold ${
              isActive ? 'bg-accent text-accent-ink' : 'bg-sunken text-ink'
            }`}
          >
            {s.glyph}
          </span>
          <span className="flex-1 truncate">{s.label}</span>
          {s.status === 'planificado' && <span className="h-1.5 w-1.5 rounded-full bg-line" title="Planificado" />}
        </>
      )}
    </NavLink>
  );
}

function Brand() {
  return (
    <div className="flex items-center gap-2.5">
      <span className="grid h-9 w-9 place-items-center rounded-[10px] bg-accent font-jp text-lg font-bold text-white">日</span>
      <div className="leading-tight">
        <div className="font-extrabold tracking-tight">Nihongo Quest</div>
        <div className="font-jp text-[11px] text-muted">にほんご・クエスト</div>
      </div>
    </div>
  );
}

function FullNav({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav aria-label="Secciones" className="space-y-5">
      {GROUPS.map((g) => (
        <div key={g.title}>
          <div className="label mb-1.5 px-3">{g.title}</div>
          <div className="space-y-0.5">
            {g.ids.map((id) => (
              <NavItem key={id} s={byId(id)} onClick={onNavigate} />
            ))}
          </div>
        </div>
      ))}
    </nav>
  );
}

export function Shell({ children }: { children: ReactNode }) {
  const [moreOpen, setMoreOpen] = useState(false);
  const location = useLocation();
  useEffect(() => {
    setMoreOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-dvh lg:grid lg:grid-cols-[260px_1fr]">
      {/* Barra lateral (escritorio) */}
      <aside className="sticky top-0 hidden h-dvh overflow-y-auto border-r border-line px-3 py-5 lg:block">
        <div className="mb-6 px-3">
          <Brand />
        </div>
        <FullNav />
      </aside>

      {/* Cabecera (móvil) */}
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-line bg-bg/85 px-4 pb-2.5 pt-[max(10px,env(safe-area-inset-top))] backdrop-blur lg:hidden">
        <Brand />
      </header>

      <main className="mx-auto w-full max-w-4xl px-4 pb-[calc(96px+env(safe-area-inset-bottom))] pt-6 lg:px-8 lg:pb-12 lg:pt-10">
        {children}
      </main>

      {/* Barra inferior (móvil) */}
      <nav
        aria-label="Navegación principal"
        className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-line bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden"
      >
        {MOBILE_TABS.map((id) => {
          const s = byId(id);
          return (
            <NavLink
              key={id}
              to={s.path}
              end={s.path === '/'}
              className={({ isActive }) => `flex flex-col items-center gap-0.5 py-2 text-[11px] font-bold ${isActive ? 'text-accent' : 'text-muted'}`}
            >
              <span className="font-jp text-xl leading-none">{s.glyph}</span>
              {s.label}
            </NavLink>
          );
        })}
        <button
          onClick={() => setMoreOpen(true)}
          className="flex flex-col items-center gap-0.5 py-2 text-[11px] font-bold text-muted"
          aria-haspopup="dialog"
          aria-expanded={moreOpen}
        >
          <span className="text-xl leading-none">⋯</span>
          Más
        </button>
      </nav>

      {moreOpen && (
        <div className="fixed inset-0 z-40 lg:hidden" role="dialog" aria-modal="true" aria-label="Todas las secciones">
          <button className="absolute inset-0 bg-black/40" aria-label="Cerrar" onClick={() => setMoreOpen(false)} />
          <div className="absolute inset-x-0 bottom-0 max-h-[85dvh] overflow-y-auto rounded-t-3xl bg-bg px-3 pb-[calc(20px+env(safe-area-inset-bottom))] pt-3">
            <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-line" />
            <FullNav onNavigate={() => setMoreOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
