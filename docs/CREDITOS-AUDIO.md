# Créditos y licencias de audio

Nihongo Quest es un proyecto educativo **no comercial**. Usa grabaciones libres de otras personas, siempre con su autor y licencia.

## Tatoeba — frases con audio de hablantes nativos

- **Fuente:** [tatoeba.org](https://tatoeba.org), exportaciones públicas en [downloads.tatoeba.org](https://downloads.tatoeba.org/exports/).
- **Criterio de selección (automático):** solo audios cuyo autor declara japonés **nativo** (nivel 5 en su perfil de Tatoeba) y con licencia que permite reutilizarlos. Los audios sin licencia declarada (incluidos los importados de Common Voice dentro de Tatoeba) **no** se usan.
- **Voces incluidas:**

| Voz (usuario de Tatoeba) | Licencia del audio |
|---|---|
| Mizu | [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) |
| huizi99 | [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) |
| fal | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

- **Textos de las frases:** [CC BY 2.0 FR](https://creativecommons.org/licenses/by/2.0/fr/), de sus autores en Tatoeba. Cada frase enlaza a su página (`tatoeba.org/sentences/show/<id>`), donde figura el autor.
- **Traducciones al español/inglés:** de voluntarios de Tatoeba (CC BY 2.0 FR). **No revisadas** por Nihongo Quest; algunas usan español de España.
- **Lecturas (furigana):** transcripciones automáticas de Tatoeba; pueden tener errores puntuales.
- **Romaji:** generado por Nihongo Quest (`scripts/add_romaji.ts`) con el analizador kuromoji y las lecturas de Tatoeba; Hepburn modificado con macrones y partículas は/を/へ como wa/o/e. Automático: puede tener errores puntuales.
- **Cambios:** los MP3 se distribuyen sin modificar. La app permite reproducirlos más lento (cambio de velocidad en el navegador, no del archivo).
- **Regenerar:** `npm run content:audio` (archivos en `public/audio/tatoeba/`, índice en `src/content/listening/tatoeba.json`).

## Fuentes evaluadas y no usadas (por ahora)

| Fuente | Motivo |
|---|---|
| Wikimedia Commons / Lingua Libre (palabras grabadas por nativos, CC BY-SA) | Su API rechaza las consultas desde la nube donde se construye la app (límite de tasa). El script puede ejecutarse desde un PC en el futuro. |
| Mozilla Common Voice (CC0) | Sus términos prohíben volver a publicar el dataset; además son lecturas de frases sin traducción. |
| Packs de kana sin licencia declarada | No se pueden redistribuir con seguridad. |

## Voz sintética

Cuando no hay grabación nativa (por ejemplo, los kana sueltos), se usa la voz japonesa del dispositivo mediante la Web Speech API.
