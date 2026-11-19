# Bitácora del proyecto

Para retomar el desarrollo en otra sesión: leer este archivo, luego [05-hitos.md](05-hitos.md).

## Estado actual (19 nov 2026)

- **Hito 1 completado.** App React/TS PWA con IndexedDB, dashboard real, 16 secciones, configuración, estadísticas, respaldo.
- **Hito 2 en curso.** Kana completo (tablas + práctica FSRS en 4 modos). Siguiente: diagnóstico, motor de lecciones y primeras lecciones (F1-M01, F1-M05, F1-M07).
- Documentos: diagnóstico, arquitectura, currículo (52 módulos), calendario (25 semanas), hitos.

## Decisiones del usuario

| Fecha | Decisión |
|---|---|
| 19 nov 2026 | Estudiará en iPhone y PC → PWA offline con respaldo exportable. |
| 19 nov 2026 | Repo público + GitHub Pages para publicar (el usuario debe cambiar la visibilidad). |
| 19 nov 2026 | Diálogos guiados en la app + conversaciones abiertas con Claude en el chat (sin API por ahora). |
| 19 nov 2026 | Solo voz del sistema (sin ElevenLabs). |
| 19 nov 2026 | Usar todos los audios gratuitos que se encuentren → Tatoeba (nativos, CC BY/BY-NC). |

## Registro de funcionalidades pendientes

| Funcionalidad | Hito | Nota |
|---|---|---|
| Evaluación diagnóstica | 2 | Define nivel y punto de partida. |
| Motor de lecciones 14 pasos + duración adaptable | 2 | |
| Vocabulario con fichas de 10 campos | 2 | Contenido revisado con la checklist del currículo. |
| Kanji en contexto | 2 | Primer bloque: estación y carteles. |
| Diccionario personal y favoritos | 2 | Tablas ya creadas en la BD. |
| Exportación a Anki | 2 | TSV importable en Anki. |
| Teclado japonés (entrada IME) en ejercicios | 2–3 | Aceptar respuestas en kana además de romaji. |
| Teleprompter A–G | 3 | |
| Grabación, comparación, STT | 4 | Consentimiento explícito; sin puntajes inventados. |
| Dictados y velocidad graduada | 4 | La práctica de escucha con audio nativo ya existe. |
| Audio nativo de palabras (Lingua Libre/Commons) | 4 | La API de Commons rechaza consultas desde la nube; ejecutar el script desde un PC. |
| Revisar traducciones de Tatoeba usadas en ejercicios | 4 | Hoy marcadas como no revisadas. |
| Diálogos ramificados | 5 | |
| Cola de repaso unificada, exámenes, logros | 6 | |
| Simulaciones del viaje | 7 | |
| Recalcular calendario dentro de la app | 6 | Hoy las reglas están en `04-calendario.md`. |

## Puntos de contenido pendientes de validación

Ver sección 13.3 de [03-curriculo.md](03-curriculo.md): tax-free (cambio de sistema anunciado para nov 2026), Visit Japan Web, Suica en iPhone/Welcome Suica, equipaje grande en Tōkaidō Shinkansen, bloqueo regional de consolas, tarjeta de memoria de la Sony T700, ritual en santuarios, lado de la escalera mecánica, pago en buses.

## Sesiones

### 19 nov 2026
- Creado repo `learnJP` con prototipo v1 de kana (movido a `legacy/`).
- Construido hito 1 y la parte de kana del hito 2. 27 pruebas automáticas pasan; recorrido en navegador móvil y escritorio sin errores.
- Primera clase en el chat: diagnóstico y sonidos del japonés (F0/F1-M01).
- Agregada sección Escucha con 693 frases de japoneses nativos (Tatoeba): práctica con FSRS y explorador. Créditos en docs/CREDITOS-AUDIO.md.
