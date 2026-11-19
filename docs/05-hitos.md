# 5. Hitos y criterios de aceptación

Un hito solo se marca **completado** cuando cada criterio se verificó (prueba automatizada o recorrido en navegador) y la evidencia queda anotada aquí.

| Hito | Contenido | Estado |
|---|---|---|
| 1 | App, base de datos, dashboard y navegación | ✅ completado (19 nov 2026) |
| 2 | Sistema de escritura y primeras lecciones | 🟡 en curso: kana listo; faltan lecciones, vocabulario, kanji, diagnóstico |
| 3 | Teleprompter completo (modos A–G) | ⬜ planificado |
| 4 | Audio, pronunciación y grabaciones | ⬜ planificado |
| 5 | Diálogos interactivos | ⬜ planificado |
| 6 | Repetición espaciada unificada y evaluaciones | ⬜ planificado (FSRS ya funciona para kana) |
| 7 | Simulaciones de viaje | ⬜ planificado |
| 8 | Ampliación del currículo, optimización y pruebas finales | ⬜ planificado |

## Hito 1 — App, base de datos, dashboard y navegación ✅

| # | Criterio | Evidencia |
|---|---|---|
| 1.1 | La app compila con TypeScript estricto y se construye para producción | `npm run build` sin errores |
| 1.2 | Las 16 secciones pedidas existen y son navegables en móvil (barra inferior + "Más") y escritorio (barra lateral) | Prueba `secciones`; recorrido Playwright |
| 1.3 | Las secciones no construidas dicen honestamente "planificado, hito N" (sin maquetas) | Recorrido: `/teleprompter` muestra "Se construye en el hito 3" |
| 1.4 | Base de datos local con perfil, ajustes, tarjetas, respuestas, sesiones, errores, lecciones, favoritos, diccionario y conversaciones | `src/db/db.ts`; pruebas `repo.test.ts` |
| 1.5 | El dashboard muestra solo métricas calculadas de registros (ceros sin datos) | Prueba "sin datos muestra ceros"; captura del dashboard vacío |
| 1.6 | Cuenta regresiva al viaje y fechas/itinerario editables | Configuración → Viaje e Itinerario |
| 1.7 | Tiempo de estudio = solo tiempo activo (pestaña visible + interacción en 90 s) | `useStudyTimer`; prueba de agrupación de sesiones |
| 1.8 | Persistencia entre sesiones y respaldo exportar/importar entre dispositivos | Recorrido: datos siguen tras recargar; prueba de ida y vuelta del respaldo |
| 1.9 | Responsive sin desborde horizontal a 375 px; modo claro y oscuro | Recorrido Playwright en 375/390 px y 1280 px |
| 1.10 | Instalable y usable sin conexión (PWA con service worker) | `dist/sw.js` y `manifest.webmanifest` generados |

## Hito 2 — Sistema de escritura y primeras lecciones 🟡

| # | Criterio | Estado |
|---|---|---|
| 2.1 | Tablas de hiragana y katakana completas (104 c/u) con audio | ✅ |
| 2.2 | Práctica de kana en 4 modos (leer y elegir, leer y escribir, romaji→kana, audio→kana) con FSRS por habilidad | ✅ |
| 2.3 | Errores etiquetados (confusión de caracteres parecidos, oído) visibles en Estadísticas | ✅ |
| 2.4 | Evaluación diagnóstica inicial (fase 0) que fija el punto de partida | ⬜ |
| 2.5 | Motor de lecciones de 14 pasos que se adapta a 5/15/30/45/60 min | ⬜ |
| 2.6 | Fichas de vocabulario de 10 campos, revisadas, con romaji/furigana/traducción activables | ⬜ |
| 2.7 | Lecciones F1-M01 (sonidos), F1-M05 (saludos y supervivencia), F1-M07 (números y precios) jugables | ⬜ |
| 2.8 | Kanji en contexto (primer bloque) y exportación a Anki | ⬜ |
| 2.9 | Lecciones de っ, vocales largas y lecturas especiales de partículas (は=wa, へ=e, を=o) | ⬜ |

## Hito 3 — Teleprompter

Criterios: modos A–G operativos; furigana/romaji/traducción activables; tamaño, velocidad, pausa, avanzar/retroceder, frase actual resaltada, repetición automática, pantalla completa, modo sin distracciones; atajos de teclado y gestos táctiles; velocidad de audio. Karaoke solo cuando haya alineación temporal fiable (con voz del sistema se usarán los eventos de límite de palabra si el navegador los entrega; si no, se indica).

## Hito 4 — Audio, pronunciación y grabaciones

Criterios: permiso de micrófono con explicación; grabar y reproducir; comparar duración con el modelo; reconocimiento de voz opcional con consentimiento y aviso de límites; ejercicios de moras, vocales largas, っ y ん; dictados. Sin puntajes de pronunciación inventados.

## Hito 5 — Diálogos interactivos

Criterios: diálogos ramificados por personaje con respuestas naturales del personal; modo profesor y modo inmersión; casos en que el personaje no entiende y hay que reformular; historial; evaluación al final. Interfaz preparada para un proveedor de IA opcional.

## Hito 6 — Repaso unificado y evaluaciones

Criterios: cola única FSRS para todos los tipos de ítem; práctica intercalada; ejercicios generados desde patrones de error; pruebas por módulo y mensuales con criterios de dominio; logros opcionales.

## Hito 7 — Simulaciones de viaje

Criterios: los 10 escenarios del modo Japón real, cada uno con vocabulario previo, expresiones, diálogo modelo, audio, teleprompter, práctica, conversación, variaciones inesperadas, evaluación y nota cultural; ordenados según el itinerario.

## Hito 8 — Ampliación y cierre

Criterios: currículo completo de fases 2–6 con contenido validado; rendimiento en iPhone; pruebas finales; documentación actualizada.
