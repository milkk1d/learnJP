// Reproducción de grabaciones reales (archivos MP3 incluidos en la app).

let current: HTMLAudioElement | null = null;

export function playNative(url: string, rate = 1): Promise<void> {
  stopNative();
  if (typeof speechSynthesis !== 'undefined') speechSynthesis.cancel();
  const audio = new Audio(url);
  audio.playbackRate = rate;
  // Mantiene el tono al cambiar velocidad (Safari usa el prefijo webkit).
  (audio as HTMLAudioElement & { preservesPitch?: boolean; webkitPreservesPitch?: boolean }).preservesPitch = true;
  (audio as HTMLAudioElement & { webkitPreservesPitch?: boolean }).webkitPreservesPitch = true;
  current = audio;
  return new Promise((resolve, reject) => {
    audio.onended = () => resolve();
    audio.onerror = () => reject(new Error('No se pudo reproducir el audio.'));
    audio.play().catch(reject);
  });
}

export function stopNative() {
  if (current) {
    current.pause();
    current = null;
  }
}
