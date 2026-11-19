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
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'ja-JP';
    u.rate = opts.rate ?? 0.85;
    const all = speechSynthesis.getVoices();
    const voice = (opts.voiceId && all.find((v) => v.voiceURI === opts.voiceId)) || all.find((v) => JA.test(v.lang));
    if (voice) u.voice = voice;
    return new Promise((resolve) => {
      u.onend = () => {
        opts.onEnd?.();
        resolve();
      };
      u.onerror = () => resolve();
      speechSynthesis.speak(u);
    });
  }

  stop(): void {
    if (this.isSupported()) speechSynthesis.cancel();
  }
}

export const tts: TtsProvider = new WebSpeechTts();
