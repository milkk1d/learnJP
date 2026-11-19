import { Link } from 'react-router-dom';
import type { Section } from '../../content/sections';
import { PageHeader, StatusPill } from '../components/ui';

/** Página honesta para secciones aún no construidas: dice qué hará y en qué hito. */
export function Planned({ section }: { section: Section }) {
  return (
    <>
      <PageHeader title={section.label} subtitle={section.summary} />
      <div className="card p-6">
        <div className="flex flex-wrap items-center gap-2">
          <StatusPill status={section.status} />
          <span className="text-sm font-semibold text-muted">Se construye en el hito {section.hito}</span>
        </div>
        <p className="mt-4 text-[15px]">
          Esta sección todavía no está disponible. No muestro una maqueta para no hacerte creer que funciona.
        </p>
        {section.plan && (
          <>
            <div className="label mb-2 mt-6">Qué incluirá</div>
            <ul className="space-y-2">
              {section.plan.map((p) => (
                <li key={p} className="flex gap-2.5">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </>
        )}
        <div className="mt-6 flex flex-wrap gap-2">
          <Link to="/hiragana" className="btn-primary">
            Practicar hiragana
          </Link>
          <Link to="/" className="btn-ghost">
            Volver al inicio
          </Link>
        </div>
      </div>
    </>
  );
}
