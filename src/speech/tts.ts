// Síntesis de voz con proveedores intercambiables.
// Hoy existe un proveedor: Web Speech API (voz del sistema, gratis, sin enviar datos a terceros
// en la mayoría de los sistemas; en algunos navegadores la voz "online" usa un servicio externo).

export interface VoiceInfo {
  id: string;
  name: string;
  lang: string;
  local: boolean;
}

export interface SpeakOptions {
  rate?: number;
  voiceId?: string | null;
  onEnd?: () => void;
}

export interface TtsProvider {
  readonly id: string;
  readonly label: string;
  isSupported(): boolean;
  voices(): Promise<VoiceInfo[]>;
  speak(text: string, opts?: SpeakOptions): Promise<void>;
  stop(): void;
}

const JA = /^ja([-_]|$)/i;

export class WebSpeechTts implements TtsProvider {
  readonly id = 'webspeech';
  readonly label = 'Voz del sistema (Web Speech)';

  isSupported(): boolean {
    return typeof window !== 'undefined' && 'speechSynthesis' in window;
  }

  voices(): Promise<VoiceInfo[]> {
    if (!this.isSupported()) return Promise.resolve([]);
    const map = () =>
      speechSynthesis
        .getVoices()
        .filter((v) => JA.test(v.lang))
        .map((v) => ({ id: v.voiceURI, name: v.name, lang: v.lang, local: v.localService }));
    const now = map();
    if (now.length) return Promise.resolve(now);
    // Algunos navegadores cargan las voces de forma asíncrona.
    return new Promise((resolve) => {
      const done = () => resolve(map());
      speechSynthesis.addEventListener('voiceschanged', done, { once: true });
      setTimeout(done, 1500);
    });
  }

  async speak(text: string, opts: SpeakOptions = {}): Promise<void> {
    if (!this.isSupported()) throw new Error('Este navegador no puede pronunciar texto.');
    const synth = window.speechSynthesis;
    // Chrome descarta la frase si se cancela y se habla en el mismo instante: solo cancela si hay algo sonando.
    if (synth.speaking || synth.pending) {
      synth.cancel();
      await new Promise((r) => setTimeout(r, 60));
    }
    if (synth.paused) synth.resume();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'ja-JP';
    u.rate = opts.rate ?? 0.85;
    const all = synth.getVoices();
    const voice = (opts.voiceId && all.find((v) => v.voiceURI === opts.voiceId)) || all.find((v) => JA.test(v.lang));
    if (voice) u.voice = voice;
    // Referencia viva: si el objeto se recolecta, Chrome no avisa cuando termina.
    activeUtterance = u;
    return new Promise((resolve, reject) => {
      let started = false;
      const watchdog = setTimeout(() => {
        // Si en 2,5 s no empezó a hablar, el navegador lo bloqueó (típico en iPhone sin toque previo).
        if (!started && !synth.speaking) {
          ttsStatus.lastError = 'bloqueado';
          notify();
          reject(new Error('El navegador no dejó reproducir la voz. Toca el botón de audio.'));
        }
      }, 2500);
      u.onstart = () => {
        started = true;
        ttsStatus.lastError = null;
        ttsStatus.worked = true;
        notify();
      };
      u.onend = () => {
        clearTimeout(watchdog);
        if (activeUtterance === u) activeUtterance = null;
        opts.onEnd?.();
        resolve();
      };
      u.onerror = (e) => {
        clearTimeout(watchdog);
        const err = (e as SpeechSynthesisErrorEvent).error;
        if (err === 'interrupted' || err === 'canceled') return resolve();
        ttsStatus.lastError = err === 'not-allowed' ? 'bloqueado' : err;
        notify();
        reject(new Error(err === 'not-allowed' ? 'El navegador no dejó reproducir la voz. Toca el botón de audio.' : `Error de voz: ${err}`));
      };
      synth.speak(u);
    });
  }

  stop(): void {
    activeUtterance = null;
    if (this.isSupported()) speechSynthesis.cancel();
  }
}

let activeUtterance: SpeechSynthesisUtterance | null = null;

/** Estado observable de la voz, para mostrar avisos útiles en la interfaz. */
export const ttsStatus: { unlocked: boolean; worked: boolean; lastError: string | null } = {
  unlocked: false,
  worked: false,
  lastError: null,
};
const listeners = new Set<() => void>();
function notify() {
  listeners.forEach((l) => l());
}
export function onTtsStatus(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

/**
 * iPhone/iPad (y algunos Android) solo permiten hablar tras un toque del usuario.
 * En el primer toque reproducimos una frase vacía en silencio: eso "desbloquea" la voz
 * para el resto de la sesión, incluidos los audios que suenan solos al pasar de pregunta.
 */
export function installSpeechUnlock() {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  const unlock = () => {
    if (ttsStatus.unlocked) return;
    ttsStatus.unlocked = true;
    try {
      const u = new SpeechSynthesisUtterance(' ');
      u.volume = 0;
      u.lang = 'ja-JP';
      window.speechSynthesis.speak(u);
      void window.speechSynthesis.getVoices();
    } catch {
      /* sin voz: no pasa nada */
    }
    ['pointerdown', 'touchend', 'keydown'].forEach((ev) => window.removeEventListener(ev, unlock, true));
  };
  ['pointerdown', 'touchend', 'keydown'].forEach((ev) => window.addEventListener(ev, unlock, true));
}

export const tts: TtsProvider = new WebSpeechTts();
