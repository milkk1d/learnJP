import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { ensureDefaults } from './db/repo';
import { installSpeechUnlock } from './speech/tts';
import './index.css';

// Pide al navegador que no borre los datos locales por falta de espacio (si lo permite).
void navigator.storage?.persist?.();
installSpeechUnlock();

ensureDefaults()
  .catch((e) => console.error('No se pudo iniciar la base de datos local', e))
  .finally(() => {
    createRoot(document.getElementById('root')!).render(
      <StrictMode>
        <App />
      </StrictMode>,
    );
  });
