# 2. Arquitectura pedagógica y técnica

## 2.1 Arquitectura pedagógica

**Principio:** la app es un tutor, no un visor de palabras. Cada actividad pide una respuesta antes de mostrar la solución, registra el resultado y decide qué viene después.

```
 Contenido revisado ──► Lección (objetivo comunicativo, 14 pasos)
                             │
                             ▼
             Ejercicios activos (reconocer · producir · escuchar · hablar)
                             │  cada respuesta
                             ▼
     Registro (tarjeta FSRS por ítem×habilidad, historial, error etiquetado)
            │                                   │
            ▼                                   ▼
   Repaso espaciado (qué y cuándo)     Patrones de error (シ/ツ, は/が, vocal larga…)
            │                                   │
            └──────────► Siguiente sesión ◄─────┘
                      (repasos vencidos → refuerzo de errores → contenido nuevo)
```

- **Unidad de seguimiento:** `(ítem, habilidad)`. Reconocer あ y escribir あ son tarjetas distintas; entender 駅 al oído y decirlo también.
- **Habilidades:** `reconocer` (leer/entender), `producir` (recordar la forma o decirla/escribirla), `escuchar`, `hablar`.
- **Criterio de dominio (explícito):** una tarjeta está *dominada* cuando FSRS la tiene en estado Review con estabilidad ≥ 7 días y los 3 últimos intentos fueron correctos. Un módulo se aprueba con los umbrales definidos en el currículo (p. ej. ≥ 85 % en su evaluación), no por haber visto sus pantallas.
- **Orden de cada sesión:** repasos vencidos → ejercicios dirigidos a errores frecuentes → contenido nuevo (con tope). Si falta tiempo, se recorta lo nuevo, nunca los repasos.
- **Tutor humano-IA:** las conversaciones abiertas se hacen con Claude en el chat; la app guarda contenido, progreso y diálogos guiados. Se puede enchufar un proveedor de IA más adelante (interfaz prevista en el hito 5).

### Técnicas y por qué

Resumen; la versión completa está en el currículo (sección 11).

| Técnica | Por qué se usa | Dónde |
|---|---|---|
| Recuperación activa | Intentar recordar fortalece más la memoria que releer. | Todos los ejercicios preguntan antes de mostrar. |
| Repetición espaciada (FSRS) | Repasar justo antes de olvidar ahorra tiempo frente a repasar todo. | Tarjetas por ítem×habilidad. |
| Práctica intercalada | Mezclar tipos de ítems obliga a discriminar (シ vs ツ), no solo a repetir. | Distractores parecidos, repaso mixto. |
| Escucha graduada | El cuello de botella del viaje es entender respuestas rápidas. | Lento → natural, respuestas del personal. |
| Shadowing | Ayuda con ritmo y moras; no reemplaza la retroalimentación. | Teleprompter modo D. |
| Retroalimentación correctiva | Corregir lo importante, sin interrumpir todo. | Modo profesor / inmersión. |
| Simulaciones | Transferir lo aprendido al contexto real. | Escenarios del itinerario. |

Ningún método es universalmente el mejor; la combinación se ajusta según tus errores reales.

## 2.2 Arquitectura técnica

### Decisiones (19 nov 2026)

| Decisión | Elección | Por qué |
|---|---|---|
| Plataforma | PWA (app web instalable) | Usable en iPhone y PC, sin conexión, gratis. |
| Frontend | React 18 + TypeScript + Vite + Tailwind CSS | Mantenible, tipado, rápido de compilar; Tailwind con tokens de diseño propios (modo claro/oscuro). |
| Persistencia | IndexedDB vía Dexie | Funciona sin servidor y sin conexión en el teléfono. Respaldo JSON para mover datos entre equipos. |
| Backend | **Ninguno por ahora** | No hace falta: no hay IA por API (decisión del usuario) y los datos son locales. Se agregaría FastAPI + SQLite solo si se suma IA por API (para proteger la clave) o transcripción Whisper local. |
| SRS | FSRS (librería `ts-fsrs`, MIT) | Algoritmo documentado y abierto; usado por Anki. |
| Publicación | GitHub Pages (repo público) vía GitHub Actions | Gratis. Solo se publica código y contenido, nunca datos del estudiante. |
| Router | HashRouter | Funciona en GitHub Pages sin configurar redirecciones. |

### Capas y carpetas

```
src/
  content/   Contenido educativo (datos puros, versionados y revisados): kana, secciones…
  core/      Lógica pedagógica pura y testeada: FSRS, corrección, selección de preguntas, métricas, fechas
  db/        Esquema IndexedDB y operaciones (registrar respuesta, tiempo, respaldo)
  speech/    Proveedores de voz intercambiables (TTS hoy; STT en hito 4)
  ui/        Componentes y páginas React
docs/        Diagnóstico, arquitectura, currículo, calendario, hitos y bitácora
legacy/      Prototipo v1 (HTML/JS) conservado como referencia
```

Regla: `ui` usa `db` y `core`; `core` no conoce React ni IndexedDB; `content` no tiene lógica.

### Modelo de datos (IndexedDB)

| Tabla | Contenido |
|---|---|
| `profile` | Fechas del viaje, itinerario editable, minutos diarios, días por semana, diagnóstico hecho. |
| `settings` | Tema, romaji/furigana/traducción, voz y velocidad, consentimiento de micrófono. |
| `cards` | Una por ítem×habilidad: estado FSRS, fecha de aprendizaje, último repaso, próximo repaso, aciertos, errores, historial (últimos 20). |
| `reviews` | Cada respuesta: resultado, calificación FSRS, tiempo de respuesta, qué respondiste. |
| `sessions` | Tiempo de estudio activo por día y actividad. |
| `mistakes` | Errores etiquetados (`confusión シ/ツ`, `lectura え`, `oído su/tsu`…). |
| `lessons` | Progreso por lección (hito 2). |
| `favorites`, `dictionary` | Frases favoritas y diccionario personal (hito 2). |
| `conversations` | Historial de diálogos (hito 5). |

La calificación FSRS sale de datos objetivos: fallo = *Again*, acierto lento (> 6 s) = *Hard*, acierto = *Good*. No se pide autoevaluación para no inflar el progreso.

### Voz: opciones evaluadas y límites

**Síntesis (TTS)** — elegido: Web Speech API (voz del sistema).
- iPhone/macOS traen voces japonesas de buena calidad; en Windows y Android depende de lo instalado. La app detecta si no hay voz japonesa y explica cómo instalarla.
- Alternativas documentadas, intercambiables por la interfaz `TtsProvider`: ElevenLabs (mejor calidad, de pago; descartado por ahora), VOICEVOX (motor japonés gratuito que corre en el PC; revisar la licencia de cada voz), servicios en la nube (Google/Azure).
- Límite: el acento tonal de la voz del sistema puede no ser natural en palabras sueltas.

**Reconocimiento (STT)** — se implementa en el hito 4 con interfaz `SttProvider`.
- Web Speech API `SpeechRecognition` (Chrome, Edge, Safari): gratis, pero **envía el audio a servidores de Google o Apple**. Se pedirá consentimiento explícito antes de usarlo.
- Whisper local (whisper.cpp / faster-whisper en el PC): privado, requiere backend local; opción futura.
- **Límites importantes:** un reconocedor de voz intenta adivinar la frase más probable, así que *corrige* errores de pronunciación en vez de detectarlos. Sirve para detectar omisiones o palabras no reconocidas, no para evaluar fonética. El acento tonal no se evalúa. La app no mostrará porcentajes de pronunciación inventados; solo comparaciones medibles (texto reconocido vs. esperado, duración frente al modelo, forma del tono como gráfico orientativo).

### Privacidad

- Todo el progreso vive en el dispositivo. No hay cuentas ni servidor.
- Las grabaciones (hito 4) se quedan en el dispositivo salvo que actives explícitamente un reconocedor en la nube.
- No hay claves de API en el repo. Si se suma IA por API, la clave irá en un backend local o solo en tu dispositivo, nunca en el código.

### Pruebas

- `npm test` (Vitest): contenido kana, corrección de respuestas, FSRS y criterio de dominio, fechas, métricas del dashboard, selección de preguntas, base de datos (con `fake-indexeddb`), respaldo exportar/importar.
- Verificación en navegador (Playwright) de cada hito: flujos completos en móvil y escritorio, sin errores de consola ni desbordes de ancho.
