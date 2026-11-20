import { useEffect, useState } from 'react';
import { onTtsStatus, ttsStatus } from '../../speech/tts';

/** Aviso visible cuando la voz del dispositivo no sonó, con pasos concretos para arreglarlo. */
export function VoiceWarning() {
  const [, force] = useState(0);
  useEffect(() => {
    const off = onTtsStatus(() => force((n) => n + 1));
    return () => {
      off();
    };
  }, []);
  if (!ttsStatus.lastError) return null;
  return (
    <div role="alert" className="mb-4 rounded-2xl border border-bad bg-bad-soft p-4 text-sm">
      <p className="font-bold text-bad">No se escuchó la voz.</p>
      <ul className="mt-1.5 list-disc space-y-1 pl-5">
        <li>
          Toca el botón de audio (🔊 o el carácter grande): algunos teléfonos solo dejan hablar justo después de un toque.
        </li>
        <li>Sube el volumen y, en iPhone, revisa que el interruptor lateral no esté en silencio.</li>
        <li>
          Revisa que tengas una voz japonesa: iPhone → Ajustes → Accesibilidad → Contenido leído → Voces → Japonés. En Configuración de la app está el botón
          "Probar".
        </li>
      </ul>
    </div>
  );
}
