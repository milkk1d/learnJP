import type { ReactNode } from 'react';

export function PageHeader({ title, jp, subtitle, actions }: { title: string; jp?: string; subtitle?: string; actions?: ReactNode }) {
  return (
    <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div className="min-w-0">
        {jp && <div className="font-jp text-sm font-medium tracking-widest text-accent">{jp}</div>}
        <h1 className="text-[28px] font-extrabold leading-tight tracking-tight">{title}</h1>
        {subtitle && <p className="mt-1 max-w-prose text-muted">{subtitle}</p>}
      </div>
      {actions}
    </header>
  );
}

export function Stat({ label, value, hint, tone }: { label: string; value: ReactNode; hint?: ReactNode; tone?: 'muted' }) {
  return (
    <div className="card p-4">
      <div className="text-[13px] font-semibold text-muted">{label}</div>
      <div className={`mt-1 text-2xl font-extrabold tabular-nums ${tone === 'muted' ? 'text-muted' : ''}`}>{value}</div>
      {hint && <div className="mt-0.5 text-xs text-muted">{hint}</div>}
    </div>
  );
}

export function Bar({ value, max, className = '' }: { value: number; max: number; className?: string }) {
  const pct = max > 0 ? Math.min(100, (value / max) * 100) : 0;
  return (
    <div className={`h-2 overflow-hidden rounded-full bg-sunken ${className}`} role="progressbar" aria-valuemin={0} aria-valuemax={max} aria-valuenow={value}>
      <div className="h-full rounded-full bg-good transition-[width] duration-500" style={{ width: `${pct}%` }} />
    </div>
  );
}

export function Segmented<T extends string>({
  value,
  options,
  onChange,
  label,
}: {
  value: T;
  options: { id: T; label: ReactNode }[];
  onChange: (v: T) => void;
  label: string;
}) {
  return (
    <div role="radiogroup" aria-label={label} className="inline-flex gap-0.5 rounded-xl bg-sunken p-[3px]">
      {options.map((o) => (
        <button
          key={o.id}
          role="radio"
          aria-checked={o.id === value}
          onClick={() => onChange(o.id)}
          className={`rounded-[9px] px-3 py-1.5 text-sm font-bold transition ${o.id === value ? 'bg-surface text-ink shadow-soft' : 'text-muted'}`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function StatusPill({ status }: { status: 'implementado' | 'parcial' | 'planificado' }) {
  const style =
    status === 'implementado' ? 'bg-good-soft text-good' : status === 'parcial' ? 'bg-accent-soft text-accent' : 'bg-sunken text-muted';
  return <span className={`rounded-full px-2 py-0.5 text-[11px] font-extrabold uppercase tracking-wide ${style}`}>{status}</span>;
}

export function Toggle({ checked, onChange, label, hint }: { checked: boolean; onChange: (v: boolean) => void; label: string; hint?: string }) {
  return (
    <label className="flex cursor-pointer items-start justify-between gap-4 py-2.5">
      <span>
        <span className="block font-semibold">{label}</span>
        {hint && <span className="block text-sm text-muted">{hint}</span>}
      </span>
      <input type="checkbox" className="peer sr-only" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span
        aria-hidden
        className="relative mt-1 h-6 w-10 shrink-0 rounded-full bg-sunken ring-1 ring-line transition after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-surface after:shadow after:transition peer-checked:bg-accent peer-checked:after:translate-x-4 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-accent"
      />
    </label>
  );
}
