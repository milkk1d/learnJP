import { useEffect, useRef } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db, DEFAULT_PROFILE, DEFAULT_SETTINGS } from '../db/db';
import { addStudyTime } from '../db/repo';

export function useSettings() {
  return useLiveQuery(() => db.settings.get('app'), []) ?? DEFAULT_SETTINGS;
}

export function useProfile() {
  return useLiveQuery(() => db.profile.get('me'), []) ?? DEFAULT_PROFILE;
}

/**
 * Cuenta tiempo de estudio real: solo mientras la pestaña está visible y hubo
 * interacción en los últimos 90 s. Guarda cada 15 s y al salir.
 */
export function useStudyTimer(activity: string, enabled = true) {
  const pending = useRef(0);
  const lastInput = useRef(Date.now());

  useEffect(() => {
    if (!enabled) return;
    const mark = () => (lastInput.current = Date.now());
    const events = ['pointerdown', 'keydown', 'touchstart', 'scroll'];
    events.forEach((e) => window.addEventListener(e, mark, { passive: true }));

    const flush = () => {
      const secs = pending.current;
      pending.current = 0;
      if (secs > 0) void addStudyTime(activity, secs);
    };
    const tick = setInterval(() => {
      if (document.visibilityState === 'visible' && Date.now() - lastInput.current < 90_000) pending.current += 1;
    }, 1000);
    const saver = setInterval(flush, 15_000);
    const onHide = () => document.visibilityState === 'hidden' && flush();
    document.addEventListener('visibilitychange', onHide);

    return () => {
      events.forEach((e) => window.removeEventListener(e, mark));
      clearInterval(tick);
      clearInterval(saver);
      document.removeEventListener('visibilitychange', onHide);
      flush();
    };
  }, [activity, enabled]);
}

/** Aplica el tema elegido en <html data-theme>. */
export function useTheme() {
  const { theme } = useSettings();
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'system') root.removeAttribute('data-theme');
    else root.setAttribute('data-theme', theme);
  }, [theme]);
}
