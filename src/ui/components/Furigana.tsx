import { parseFurigana } from '../../core/furigana';

/** Muestra texto japonés con furigana opcional sobre los kanji. */
export function Furigana({ markup, fallback, show, className = '' }: { markup: string; fallback: string; show: boolean; className?: string }) {
  if (!markup) return <span className={`font-jp ${className}`}>{fallback}</span>;
  const segs = parseFurigana(markup);
  return (
    <span className={`font-jp ${className}`} lang="ja">
      {segs.map((s, i) =>
        s.ruby && show ? (
          <ruby key={i}>
            {s.text}
            <rt>{s.ruby}</rt>
          </ruby>
        ) : (
          <span key={i}>{s.text}</span>
        ),
      )}
    </span>
  );
}
