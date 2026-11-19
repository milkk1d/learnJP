# Nihongo Quest 日本語

Tutor personal de japonés para hispanohablantes, pensado para preparar un viaje a Japón (mayo–junio 2027) y dejar una base sólida para seguir estudiando.

App web instalable (PWA): funciona en iPhone y PC, sin conexión y sin cuentas. Tu progreso se guarda solo en tu dispositivo.

## Qué funciona hoy

| Sección | Estado |
|---|---|
| Inicio: dashboard con métricas reales, cuenta regresiva y meta semanal | ✅ |
| Hiragana y katakana: tablas con audio y práctica en 4 modos con repetición espaciada FSRS | ✅ |
| Estadísticas: minutos por día, patrones de error, ítems difíciles | ✅ |
| Configuración: viaje, itinerario editable, romaji/furigana/traducción, voz, tema, respaldo | ✅ |
| Mi curso, kanji, vocabulario, gramática, teleprompter, pronunciación, escucha, conversaciones, simulador, repaso, exámenes | ⬜ planificado (cada sección dice en qué hito llega) |

El plan completo está en [`docs/`](docs):

1. [Diagnóstico de necesidades](docs/01-diagnostico.md)
2. [Arquitectura pedagógica y técnica](docs/02-arquitectura.md)
3. [Currículo completo](docs/03-curriculo.md)
4. [Calendario de estudio](docs/04-calendario.md)
5. [Hitos y criterios de aceptación](docs/05-hitos.md)
6. [Bitácora y pendientes](docs/PROGRESO.md)

## Ejecutar en tu PC

Requiere Node.js 20 o superior.

```bash
npm install
npm run dev        # abre http://localhost:5173
npm test           # pruebas automatizadas
npm run build      # versión de producción en dist/
npm run preview    # sirve dist/ localmente
```

## Usar en el iPhone

1. Abre la URL publicada en Safari (ver "Publicar").
2. Compartir → **Agregar a pantalla de inicio**. Se abre como app y funciona sin conexión.
3. Para la voz: Ajustes → Accesibilidad → Contenido leído → Voces → Japonés (descarga una voz).

Para pasar tu progreso entre iPhone y PC: Configuración → Exportar progreso, y en el otro equipo Importar progreso.

## Publicar (GitHub Pages)

El repo incluye `.github/workflows/deploy.yml`, que compila y publica en cada push a `main`.

1. El repositorio debe ser **público** (GitHub Pages gratis no publica repos privados).
2. Settings → Pages → Source: **GitHub Actions**.
3. La app queda en `https://<usuario>.github.io/learnJP/`.

## Tecnología

React 18 · TypeScript · Vite · Tailwind CSS · Dexie (IndexedDB) · ts-fsrs · vite-plugin-pwa · Vitest. Sin backend: ver la justificación en la [arquitectura](docs/02-arquitectura.md).

## Limitaciones conocidas

- La voz depende de las voces japonesas instaladas en tu dispositivo.
- El reconocimiento de voz (hito 4) no es una evaluación fonética: sus límites están documentados en la arquitectura.
- El progreso no se sincroniza solo entre dispositivos; se usa exportar/importar.

## Licencia

Código bajo MIT ([LICENSE](LICENSE)).
