# Currículo Nihongo Quest

Currículo desde cero hasta una base aproximada de **JLPT N5**, con una introducción selectiva a **N4**, orientado a la autonomía comunicativa durante el viaje a Japón (mayo–junio 2027).

Aprobar el JLPT y poder conversar no son lo mismo. Por eso el currículo tiene un eje de **gramática y vocabulario** (lo que mide el JLPT) y otro de **comunicación**: escuchar respuestas reales, pedir aclaraciones, reformular y salir del paso. Los dos se evalúan por separado.

---

## 0. Cómo leer este documento

### Estados del contenido

Cada módulo, y cada ítem de contenido cuando hace falta, tiene uno de estos estados:

| Estado | Significa |
|---|---|
| `planificado` | Está diseñado en este documento, pero todavía no está en la app. |
| `pendiente de validación` | Ya está escrito en la app, pero aún no pasa el control de calidad lingüística (sección 9). También se usa para datos prácticos que cambian con el tiempo (reglas de tax-free, normas de equipaje, etc.). |
| `implementado` | Está en la app, pasó el control de calidad y tiene ejercicios y evaluación funcionando. |

Hoy (noviembre 2026) todo está `planificado`, salvo el reconocimiento de hiragana y katakana, que ya existe en el prototipo v1 de learnJP. Esa parte se marca `implementado (prototipo v1, se migra en hito 2)`.

### Convenciones

- **IDs estables:** `F<fase>-M<módulo>`, por ejemplo `F2-M08`. Los escenarios del modo Japón real usan `E01`–`E10`. Estos IDs se usan en la app, en el calendario y en el seguimiento de errores.
- **Romaji:** Hepburn modificado. Se usan macrones en las vocales largas cuando es la forma estándar (*Tōkyō*, *kūkō*, *arigatō*). La app también acepta las variantes `ou`, `oo` y `uu` al escribir (`toukyou`, `tookyoo`), y `n'` antes de vocal (`kon'nichiwa`).
- **Horas:** son estimaciones de estudio nuevo y práctica guiada del módulo. No incluyen los repasos SRS, que el calendario presupuesta aparte (unos 8–12 min diarios).
- **Criterio de dominio:** un módulo se considera dominado cuando se cumple su criterio explícito, no cuando se terminan sus pantallas. La app no desbloquea un módulo si sus prerrequisitos no están dominados, aunque permite revisarlo en modo vista previa.

### Carga total estimada

| Fase | Módulos | Horas estimadas |
|---|---|---|
| F0 · Diagnóstico | 1 | 0,5 |
| F1 · Fundamentos | 9 | 14 |
| F2 · Construcción del idioma | 13 | 27,5 (4 opcionales) |
| F3 · Japonés para viajar | 13 | 20,5 |
| F4 · Conversaciones reales | 5 | 7 |
| F5 · Inmersión cultural | 5 | 2,5 |
| F6 · Simulación integral | 6 | 8 |
| **Total** | **52** | **≈ 80 h** (+ ≈ 20–25 h de repasos SRS) |

Con 30 minutos diarios, 6 días por semana, hay unas 75 horas hasta mayo. **El currículo completo no cabe solo en la base**: necesita algunas sesiones largas opcionales (por ejemplo, una de 45–60 min el fin de semana) o recortar lo marcado como opcional. El calendario (`04-calendario.md`) define qué se recorta primero.

### Orden real: las fases se intercalan

Las fases están numeradas por tema, no por orden de estudio. En la práctica:

- **F1 va primero y completa:** sin kana y sin pronunciación, todo lo demás se apoya en romaji y después cuesta mucho soltarlo.
- **F2 y F3 se intercalan desde el mes 2:** cada punto gramatical se practica de inmediato en una situación del viaje (por ejemplo, la partícula で con "pagar con tarjeta" o "ir en tren"). Así se recuerda mejor, porque tiene un uso concreto, y se llega a mayo con situaciones practicadas muchas veces y no solo en las últimas semanas.
- **F4 y F5 se reparten:** las estrategias de aclaración (F4-M01) entran apenas haya diálogos, y las notas culturales (F5) aparecen dentro de cada módulo de F3. Los módulos F4/F5 consolidan y evalúan lo que se fue viendo.
- **F6 cierra:** las simulaciones integrales ocupan las últimas 3–4 semanas, que no traen contenido nuevo.

Además, desde la primera semana se aprenden **frases fijas de supervivencia** como bloques completos (すみません, これをください, いくらですか), antes de entender su gramática. La gramática llega después y explica algo que ya se usa.

---

## 1. Fase 0 — Diagnóstico inicial

### F0-M01 · Evaluación diagnóstica
- **Estado:** `planificado`
- **Objetivo:** Saber desde dónde partes, para no repetir lo que ya sabes ni saltarte lo que falta.
- **Contenidos:** test adaptativo corto con:
  - Reconocimiento de hiragana y de katakana (muestra de 20 cada uno).
  - Frases de cortesía conocidas (10).
  - Números escuchados (5 precios).
  - Comprensión de 3 frases simples escuchadas.
  - Autoevaluación de situaciones del viaje (escala 1–4).
- **Prerrequisitos:** ninguno.
- **Evaluación y dominio:** no se aprueba ni se reprueba. Si aciertas ≥ 90 % en un bloque, se marcan como dominados los módulos de ese bloque y pasan a repaso SRS. En cualquier otro caso empiezas en F1-M01.
- **Horas:** 0,5 h.

---

## 2. Fase 1 — Fundamentos

Meta de la fase: leer hiragana y katakana sin romaji, pronunciar moras, vocales largas y consonantes dobles de forma distinguible, saludar y presentarte, y manejar números, precios, horas y fechas.

### F1-M01 · Los sonidos del japonés
- **Estado:** `planificado`
- **Objetivo:** Puedo pronunciar las 5 vocales y distinguir sílabas de moras al escuchar palabras simples.
- **Contenidos:**
  - Las 5 vocales: comparación con el español, la う sin redondear los labios.
  - La mora como unidad de ritmo (にほん = に・ほ・ん, 3 moras).
  - Ritmo parejo: cada mora dura más o menos lo mismo.
  - La ら行 (sonido entre r y l, más parecido a la "r" simple de "pero").
  - Sonidos sin equivalente exacto: つ (tsu) y ふ (fu, sin morder el labio).
- **Prerrequisitos:** F0-M01.
- **Evaluación y dominio:** contar moras de 15 palabras escuchadas (≥ 80 %) e imitar 10 palabras con shadowing. La imitación solo la puedes autoevaluar tú comparando tu grabación con el modelo, porque la app no mide pronunciación fonética.
- **Horas:** 1 h.

### F1-M02 · Hiragana básico (46)
- **Estado:**
  - Reconocimiento: `implementado (prototipo v1, se migra en hito 2)`.
  - Lectura en voz alta, escritura y lectura de palabras: `planificado`.
- **Objetivo:** Puedo leer en voz alta palabras escritas en hiragana básico y escribir su romaji.
- **Contenidos:**
  - Filas あ a ん, en bloques de 2–3 filas por sesión.
  - Pares que se confunden: ぬ/め, わ/れ/ね, さ/ち, る/ろ, は/ほ, い/こ.
  - Lectura de palabras reales desde el día 1 (あさ, いえ, さかな, ねこ, えき).
- **Prerrequisitos:** F1-M01.
- **Evaluación y dominio:** ≥ 95 % de reconocimiento en 46 ítems, en orden aleatorio, con un tiempo medio de respuesta de ≤ 3 s, y lectura correcta de 20 palabras nuevas.
- **Horas:** 3 h.

### F1-M03 · Hiragana completo: dakuten, combinados, っ y vocales largas
- **Estado:**
  - Reconocimiento de dakuten y combinados: `implementado (prototipo v1, se migra en hito 2)`.
  - っ, vocales largas y lectura de palabras: `planificado`.
- **Objetivo:** Puedo leer cualquier palabra en hiragana, incluidas las que tienen consonante doble y vocal larga.
- **Contenidos:**
  - Dakuten y handakuten (が, ぱ).
  - Combinados (きゃ, しゅ, ちょ).
  - っ pequeña: pausa de una mora (きて *kite* "ven" / きって *kitte* "sello").
  - Vocales largas:
    - おばさん *obasan* (tía, señora) / おばあさん *obāsan* (abuela, señora mayor).
    - En hiragana, la "o" larga casi siempre se escribe con う: とうきょう *Tōkyō*.
    - La "e" larga casi siempre se escribe con い: せんせい *sensei*, que se pronuncia con e larga.
  - じ/ぢ y ず/づ suenan igual. ぢ y づ son raras (aparecen, por ejemplo, en つづく, はなぢ).
- **Prerrequisitos:** F1-M02.
- **Evaluación y dominio:** ≥ 90 % en un dictado de 20 palabras con っ y vocales largas, y ≥ 90 % en discriminación auditiva de pares mínimos.
- **Horas:** 1,5 h.

### F1-M04 · Katakana y cuándo se usa
- **Estado:**
  - Reconocimiento de katakana básico, dakuten y combinados: `implementado (prototipo v1, se migra en hito 2)`.
  - Katakana extendido, ー y uso: `planificado`.
- **Objetivo:** Puedo leer nombres de productos, marcas y carteles en katakana, y sé por qué una palabra se escribe en katakana y no en hiragana.
- **Contenidos:**
  - Los 46 básicos, con dakuten y combinados.
  - Pares críticos: シ/ツ, ソ/ン, ク/ケ/タ, ウ/ワ/フ, ル/レ, ア/マ, ヌ/ス.
  - ー como alargador de vocal (カメラ, コーヒー, ビール).
  - Combinaciones extendidas para préstamos: ティ, ディ, ファ, フィ, フェ, フォ, ウィ, ウェ, ウォ, ヴ, チェ, シェ, ジェ.
  - **Cuándo se usa katakana:**
    - Préstamos de otros idiomas (ホテル, カメラ, チケット).
    - Nombres extranjeros (チリ, マリア, カルロス).
    - Marcas (ソニー, セイコー, ニンテンドー).
    - Onomatopeyas y énfasis en carteles.
  - Las palabras japonesas nativas no se escriben en katakana. Una palabra como すし aparece a veces como スシ en menús para turistas, pero eso es una elección de estilo, no la regla.
  - La pronunciación del préstamo es japonesa (マクドナルド *Makudonarudo*), y conviene aprenderla así para que te entiendan.
- **Prerrequisitos:** F1-M03.
- **Evaluación y dominio:**
  - ≥ 95 % de reconocimiento de katakana.
  - Lectura de 20 préstamos del viaje en ≤ 60 s en total.
  - ≥ 90 % en el ejercicio "¿hiragana o katakana?" con 15 palabras.
- **Horas:** 3 h.

### F1-M05 · Saludos, cortesía y frases de supervivencia
- **Estado:** `planificado`
- **Objetivo:** Puedo saludar, agradecer, disculparme y llamar la atención de alguien con la formalidad adecuada.
- **Contenidos:**
  - おはようございます *ohayō gozaimasu*.
  - こんにちは *konnichiwa*: se escribe は y se lee *wa*.
  - こんばんは *konbanwa*.
  - ありがとうございます *arigatō gozaimasu*.
  - すみません *sumimasen*: disculpe / perdón / gracias por la molestia.
  - はい *hai*.
  - いいえ *iie*: "no" rotundo. En la práctica se suaviza con いいえ、大丈夫です.
  - 大丈夫です *daijōbu desu*: está bien / no, gracias.
  - お願いします *onegai shimasu*.
  - Frases bloque:
    - これをください *kore o kudasai*.
    - いくらですか *ikura desu ka*.
    - 〜はどこですか *… wa doko desu ka*.
  - Nota de pronunciación: la "u" final de です y ます casi no suena (*des*, *mas*).
- **Prerrequisitos:** F1-M01. Se aprende en paralelo con F1-M02, al principio en romaji y hiragana a la vez.
- **Evaluación y dominio:**
  - ≥ 90 % al elegir la expresión correcta en 15 situaciones.
  - Producción oral de las 8 frases clave sin apoyo de texto.
  - Comprensión auditiva de las mismas frases a velocidad normal.
- **Horas:** 1 h.

### F1-M06 · Presentarte
- **Estado:** `planificado`
- **Objetivo:** Puedo decir mi nombre, que soy de Chile, que viajo con otra persona y que estoy aprendiendo japonés.
- **Contenidos:**
  - はじめまして *hajimemashite*.
  - 〇〇です *… desu* (tu nombre en katakana; en la app se configura).
  - チリから来ました *Chiri kara kimashita*.
  - 日本語を勉強しています *nihongo o benkyō shite imasu*, aprendida como bloque.
  - よろしくお願いします *yoroshiku onegai shimasu*.
  - 二人で旅行しています *futari de ryokō shite imasu*.
  - Responder お名前は? *o-namae wa?*
- **Prerrequisitos:** F1-M05.
- **Evaluación y dominio:** presentarte en ≤ 30 s ante un personaje del diálogo guiado, y responder 3 preguntas de seguimiento elegidas al azar entre 6.
- **Horas:** 1 h.

### F1-M07 · Números y precios
- **Estado:** `planificado`
- **Objetivo:** Puedo entender y decir precios hasta ¥99.999, incluidos los que escucho en caja.
- **Contenidos:**
  - 0–10, con las lecturas alternativas 4 = よん/し, 7 = なな/しち y 9 = きゅう/く.
  - Decenas, 百, 千 y 万.
  - Cambios fonéticos:
    - 300 さんびゃく, 600 ろっぴゃく, 800 はっぴゃく.
    - 3000 さんぜん, 8000 はっせん.
  - 10.000 = 一万 *ichiman*. Ojo: no se dice "diez mil", y es el error típico de hispanohablantes.
  - 円 *en* (no "yen").
  - Frases de caja: 〜円になります, 〜円です, 〜円のお返しです.
- **Prerrequisitos:** F1-M02.
- **Evaluación y dominio:**
  - Dictado de 20 precios escuchados, con ≥ 90 % de aciertos.
  - Decir 10 precios escritos con ≥ 90 % correctos según el reconocimiento de voz. Cuando el reconocimiento falle, vale la autoevaluación con el modelo.
- **Horas:** 1,5 h.

### F1-M08 · Horas, fechas y días
- **Estado:** `planificado`
- **Objetivo:** Puedo entender horarios de trenes y de atención, y decir fechas de reserva.
- **Contenidos:**
  - 〜時 *ji*, con 4時 *yoji*, 7時 *shichiji* y 9時 *kuji*.
  - 〜分 *fun/pun*: 1分 *ippun*, 3分 *sanpun*, 10分 *juppun*.
  - 半 *han*, 午前/午後 *gozen/gogo*.
  - Formato de 24 h en horarios.
  - Días de la semana (〜曜日).
  - Meses (〜月 *gatsu*, con 4月 *shigatsu*, 7月 *shichigatsu* y 9月 *kugatsu*).
  - Días del mes, con las lecturas irregulares de 1–10, 14, 20 y 24: ついたち, ふつか, みっか, よっか, いつか, むいか, なのか, ようか, ここのか, とおか, じゅうよっか, はつか, にじゅうよっか.
  - Prioridad: reconocer las fechas al escucharlas. Producir los días irregulares es secundario.
- **Prerrequisitos:** F1-M07.
- **Evaluación y dominio:** ≥ 85 % en un dictado de 15 horas y fechas, y leer 5 horarios de un panel de estación (simulado).
- **Horas:** 1,5 h.

### F1-M09 · Introducción al acento tonal
- **Estado:** `planificado`
- **Objetivo:** Sé que el japonés tiene acento de altura (alto/bajo) y no de intensidad, y lo reconozco en pares conocidos.
- **Contenidos:**
  - Altura frente a intensidad: no "golpear" las sílabas como en español.
  - Pares de ejemplo en el habla de Tokio:
    - 雨 *ame* (lluvia, alto-bajo) / 飴 *ame* (caramelo, bajo-alto).
    - 箸 *hashi* (palillos, alto-bajo) / 橋 *hashi* (puente, bajo-alto).
  - Por qué no es prioritario para el viaje: el contexto casi siempre desambigua.
  - Variación regional: Kansai (Kioto, Osaka, Nara) tiene otro patrón. Vas a oírlo distinto y es normal.
- **Prerrequisitos:** F1-M03.
- **Evaluación y dominio:** discriminar 10 pares escuchados con ≥ 70 %. Este módulo es de sensibilización, no de dominio estricto.
- **Horas:** 0,5 h.

---

## 3. Fase 2 — Construcción del idioma

Meta de la fase: construir oraciones propias, no solo repetir frases. Cubre toda la gramática N5 y una selección de N4 útil para el viaje.

### F2-M01 · です, demostrativos y の
- **Estado:** `planificado`
- **Objetivo:** Puedo identificar objetos y decir de quién son o qué son.
- **Contenidos:**
  - A は B です / じゃないです / でした / じゃなかったです.
  - これ/それ/あれ/どれ, この/その/あの/どの + sustantivo.
  - ここ/そこ/あそこ/どこ y sus versiones corteses こちら/そちら/あちら/どちら.
  - の de posesión y de clasificación (私のかばん, 日本のカメラ).
  - Ejemplos:
    - これは何ですか。*Kore wa nan desu ka.*
    - それは私のです。*Sore wa watashi no desu.*
- **Prerrequisitos:** F1-M04, F1-M05.
- **Evaluación y dominio:** ≥ 85 % en un ejercicio de construcción de 15 frases y comprensión auditiva de 10 preguntas con これ/それ/あれ.
- **Horas:** 1,5 h.

### F2-M02 · Preguntas, negación e introducción a は y が
- **Estado:** `planificado`
- **Objetivo:** Puedo hacer preguntas de sí/no y con interrogativos, y entender respuestas negativas.
- **Contenidos:**
  - か al final.
  - Interrogativos: 何 *nani/nan*, だれ, どこ, いつ, いくら, いくつ, どう, どれ, どの, どんな, どうして.
  - Respuestas はい、そうです / いいえ、ちがいます.
  - は como tema ("en cuanto a…") y が como sujeto que aporta información nueva. Se ve primero en usos fijos: 〜が好きです, 〜がわかります, 〜があります, y en preguntas con interrogativo como sujeto (だれが…?, どれが…?).
  - Aviso honesto: la diferencia completa entre は y が se aprende con mucha exposición. Aquí se enseñan los patrones de mayor rendimiento y la app registra cada vez que los confundes.
- **Prerrequisitos:** F2-M01.
- **Evaluación y dominio:** ≥ 85 % al elegir は/が en 20 frases de patrones enseñados, y formular 5 preguntas útiles del viaje de forma oral.
- **Horas:** 1,5 h.

### F2-M03 · Verbos en forma ます
- **Estado:** `planificado`
- **Objetivo:** Puedo decir qué hago, hice, no hago o no hice, con verbos de viaje.
- **Contenidos:**
  - ます / ません / ました / ませんでした.
  - Grupos de verbos (う, る e irregulares する/来る), solo para reconocerlos por ahora.
  - Unos 30 verbos esenciales: 行く, 来る, 帰る, 乗る, 降りる, 買う, 食べる, 飲む, 見る, 待つ, 使う, 払う, 探す, 分かる, ある, いる, する, 予約する, など.
  - Pronunciación: la "u" final de ます casi no suena.
- **Prerrequisitos:** F2-M02.
- **Evaluación y dominio:** conjugar 30 verbos en las 4 formas con ≥ 90 %, y producir oralmente 5 frases sobre tu itinerario. Ejemplo: 明日、京都に行きます。*Ashita, Kyōto ni ikimasu.*
- **Horas:** 2,5 h.

### F2-M04 · Partículas を, に, で, へ, と, も, から, まで
- **Estado:** `planificado`
- **Objetivo:** Puedo decir adónde voy, en qué, con quién, dónde hago algo y desde/hasta dónde.
- **Contenidos:**
  - Lecturas especiales: を se lee *o* y へ como partícula se lee *e*.
  - を: objeto directo.
  - に:
    - Destino.
    - Hora exacta (3時に).
    - Lugar de existencia (se profundiza en F2-M05).
  - で:
    - Lugar de la acción.
    - Medio (電車で, カードで).
  - へ: dirección.
  - と: "con" (友だちと).
  - も: "también".
  - から/まで: desde/hasta.
  - Ejemplos:
    - カードで払えますか。*Kādo de haraemasu ka.* (Es forma potencial, que se aprende aquí como bloque y se explica en F2-M13.)
    - 品川から京都まで新幹線で行きます。*Shinagawa kara Kyōto made shinkansen de ikimasu.*
- **Prerrequisitos:** F2-M03.
- **Evaluación y dominio:** ≥ 85 % en completar partículas en 25 frases, ≥ 80 % en comprensión auditiva de 10 instrucciones con partículas, y construir 5 frases propias.
- **Horas:** 2,5 h.

### F2-M05 · Existencia y ubicación
- **Estado:** `planificado`
- **Objetivo:** Puedo preguntar si hay algo y dónde está, y entender la respuesta con posiciones.
- **Contenidos:**
  - あります (cosas) / います (personas y animales).
  - 〜に〜があります / 〜は〜にあります.
  - Posiciones: 上, 下, 前, 後ろ, 中, 外, 隣, 近く, 右, 左, 間, 向かい.
  - Respuestas reales:
    - あちらにございます *achira ni gozaimasu* (forma de servicio de あります).
    - 二階です *nikai desu*.
  - Ejemplo: トイレはどこにありますか。*Toire wa doko ni arimasu ka.*
- **Prerrequisitos:** F2-M04.
- **Evaluación y dominio:** comprender 10 respuestas de ubicación escuchadas (≥ 80 %) y señalar en un plano simulado.
- **Horas:** 1,5 h.

### F2-M06 · Adjetivos い y な
- **Estado:** `planificado`
- **Objetivo:** Puedo describir objetos, comida y lugares, y entender descripciones del estado de un producto.
- **Contenidos:**
  - Presente, negativo, pasado y negativo pasado:
    - 高い → 高くない → 高かった → 高くなかった.
    - きれい → きれいじゃない → きれいでした.
  - いい es irregular: よくない, よかった.
  - Uso ante sustantivos (安いカメラ, 静かなホテル).
  - Unión con くて/で.
  - Unos 40 adjetivos del viaje: 高い, 安い, 大きい, 小さい, 新しい, 古い, おいしい, 辛い, 甘い, 熱い, 冷たい, 近い, 遠い, 便利, 有名, きれい, 大丈夫, など.
- **Prerrequisitos:** F2-M03.
- **Evaluación y dominio:** ≥ 85 % en conjugación (40 ítems) y describir oralmente 3 objetos o lugares con 2 adjetivos cada uno.
- **Horas:** 2 h.

### F2-M07 · Contadores
- **Estado:** `planificado`
- **Objetivo:** Puedo pedir cantidades correctas de entradas, personas, objetos y billetes.
- **Contenidos:**
  - Contadores:
    - つ (genérico, hasta 10).
    - 人: 一人 *hitori*, 二人 *futari*, 三人 *sannin*.
    - 名 en boca del personal (何名様ですか).
    - 枚 (entradas, billetes, objetos planos).
    - 個.
    - 本 (*hon/bon/pon*).
    - 杯.
    - 回.
    - 階 (*kai*; 3階 *sangai*).
    - 番線 (andén).
    - 号車 (vagón).
    - 泊 (noches de hotel: 一泊 *ippaku*, 二泊 *nihaku*).
  - Patrón: sustantivo + を + cantidad (チケットを二枚ください).
- **Prerrequisitos:** F1-M07, F2-M04.
- **Evaluación y dominio:** ≥ 85 % al elegir el contador en 20 situaciones, ≥ 85 % en un dictado de 10 cantidades, y 5 pedidos orales.
- **Horas:** 1,5 h.

### F2-M08 · Forma て
- **Estado:** `planificado`
- **Objetivo:** Puedo pedir cosas con cortesía, pedir permiso y entender prohibiciones e instrucciones.
- **Contenidos:**
  - Formación de la forma て por grupo de verbo (行く → 行って es irregular).
  - 〜てください.
  - 〜てもいいですか.
  - 〜てはいけません: reconocerla en carteles y en instrucciones.
  - 〜ています: acción en curso y estado (知っています, 持っています).
  - 〜てから.
  - Encadenar acciones.
  - 〜ないでください.
  - Ejemplos:
    - 写真を撮ってもいいですか。*Shashin o totte mo ii desu ka.*
    - ここで写真を撮らないでください。*Koko de shashin o toranaide kudasai.* (Probablemente la escucharás o la leerás.)
- **Prerrequisitos:** F2-M03, F2-M04.
- **Evaluación y dominio:**
  - Formar la forma て de 30 verbos con ≥ 85 %.
  - Comprender 10 instrucciones escuchadas con ≥ 80 %.
  - 5 peticiones orales en contexto.
- **Horas:** 3 h.

### F2-M09 · Deseos, invitaciones y propuestas
- **Estado:** `planificado`
- **Objetivo:** Puedo decir qué quiero hacer o tener, y proponer o aceptar planes con mi acompañante o con alguien local.
- **Contenidos:**
  - 〜たいです.
  - 〜がほしいです.
  - 〜ませんか / 〜ましょう / 〜ましょうか (ofrecimiento del personal: お持ちしましょうか).
  - 〜に行きます (finalidad: カメラを買いに行きます).
  - Matiz cultural: 〜たいです dicho a un vendedor suena a deseo propio. Para pedir algo es más natural 〜をお願いします o 〜たいんですが (se ve en F2-M13).
- **Prerrequisitos:** F2-M03.
- **Evaluación y dominio:** ≥ 85 % en transformación de 20 frases y un diálogo guiado de planificar un día.
- **Horas:** 1,5 h.

### F2-M10 · Formas simples: diccionario, ない y た
- **Estado:** `planificado`
- **Objetivo:** Reconozco las formas simples de los verbos cuando las escucho o las leo, y las uso en estructuras fijas.
- **Contenidos:**
  - Forma diccionario, ない y た.
  - Las formas simples aparecen en estas estructuras:
    - 〜前に, 〜たあとで.
    - 〜たり〜たりします.
    - 〜ことができます.
    - 〜とき.
    - 〜でしょう.
  - Reconocimiento de habla informal básica (行く?, 大丈夫?, うん, ううん).
- **Prerrequisitos:** F2-M08.
- **Evaluación y dominio:** convertir entre forma ます y forma simple con ≥ 85 % (30 ítems), y reconocer al oído 10 frases informales con ≥ 75 %.
- **Horas:** 2 h.

### F2-M11 · Kanji I: números, tiempo y personas (36 kanji)
- **Estado:** `planificado`
- **Objetivo:** Reconozco en contexto los kanji de precios, horarios y datos personales.
- **Contenidos:** bloques A, B y H de la lista de kanji (sección 6.3). Se enseñan siempre en palabras (時間, 午前, 毎日, 名前), nunca aislados.
- **Prerrequisitos:** F1-M08, F2-M01.
- **Evaluación y dominio:** ≥ 85 % al leer 40 palabras con estos kanji en contexto (precio, horario, formulario). Escribirlos a mano no se exige.
- **Horas:** 2 h.

### F2-M12 · Comparar, dar razones y contrastar
- **Estado:** `planificado`
- **Objetivo:** Puedo comparar dos productos u opciones, explicar por qué elijo uno y poner una objeción suave.
- **Contenidos:**
  - A は B より〜.
  - A と B とどちらが〜ですか.
  - 〜のほうが.
  - 〜で一番〜.
  - 〜から (porque).
  - 〜が / 〜けど (pero), incluido su uso para suavizar el final de una frase:
    - ちょっと高いんですけど…
    - 予約したんですが…
- **Prerrequisitos:** F2-M06.
- **Evaluación y dominio:** comparar oralmente 2 cámaras o relojes con 3 criterios, y ≥ 85 % en un ejercicio de 15 ítems.
- **Horas:** 1,5 h.

### F2-M13 · N4 selectivo para el viaje *(opcional antes del viaje)*
- **Estado:** `planificado`
- **Objetivo:** Puedo explicar una situación, pedir con más cortesía y entender avisos condicionales.
- **Contenidos**, priorizados por utilidad en el viaje:
  1. 〜んです / 〜んですが para explicar o introducir un problema. Ejemplo: 予約したんですが、確認してもらえますか。*Yoyaku shita n desu ga, kakunin shite moraemasu ka.*
  2. 〜てもらえますか / 〜ていただけますか (peticiones más corteses).
  3. Potencial: 使えますか, 入れますか, 払えますか.
  4. 〜たことがあります.
  5. 〜たら / 〜と (condicional y "cuando"). Ejemplo: このボタンを押すと、ドアが開きます。
  6. 〜なければなりません / 〜なくてもいいです.
  7. 〜てみる (試してみてもいいですか).
  8. 〜と思います, 〜かもしれません.
  9. 〜ほうがいいです.
  10. 〜そうです (apariencia).
  11. 〜つもりです.
  12. Keigo de servicio, solo para reconocerlo:
      - ございます, でございます.
      - お〜ください (お待ちください).
      - 〜になります (en caja).
      - かしこまりました.
- **Prerrequisitos:** F2-M08, F2-M10.
- **Evaluación y dominio:** reconocer los 12 patrones en 24 frases escuchadas o leídas (≥ 80 %), y producir los patrones 1–3 oralmente en 6 situaciones.
- **Horas:** 4 h (opcional; los puntos 1–3 se adelantan dentro de F3 como bloques).

---

## 4. Fase 3 — Japonés para viajar

Cada módulo incluye las frases que **tú dices** y las que **probablemente escucharás**, que suelen ser más rápidas y más corteses que las de un libro. La comprensión de estas respuestas se evalúa aparte.

### F3-M01 · Aeropuerto: inmigración, aduana y salida
- **Estado:** `planificado`
- **Objetivo:** Puedo responder preguntas básicas de inmigración y aduana, y encontrar el transporte a la ciudad.
- **Contenidos:**
  - Lo que puedes escuchar:
    - 観光ですか。*Kankō desu ka.* ¿Turismo?
    - 何日間滞在しますか。*Nan-nichikan taizai shimasu ka.*
    - どこに泊まりますか。
    - 申告するものはありますか。*Shinkoku suru mono wa arimasu ka.*
    - パスポートを見せてください。
  - Lo que dices:
    - 観光です。
    - 二週間です。
    - 品川のホテルです。
    - ありません。
  - Carteles:
    - 入国審査 (inmigración).
    - 税関 (aduana).
    - 到着 (llegadas).
    - 出発 (salidas).
    - 乗り場 (lugar de embarque, por ejemplo de buses).
  - Nota práctica `pendiente de validación`: verificar los trámites vigentes (Visit Japan Web, formularios digitales). En la práctica muchos funcionarios no hacen preguntas o las hacen en inglés.
- **Prerrequisitos:** F1-M06, F1-M08.
- **Evaluación y dominio:** escenario E01 versión ligera, respondiendo 5 de 5 preguntas sin bloquearte y entendiendo al menos 4 de 5 a velocidad normal.
- **Horas:** 1 h.

### F3-M02 · Trenes y metro I: billetes, IC y andenes
- **Estado:** `planificado`
- **Objetivo:** Puedo comprar o cargar un billete, encontrar el andén correcto y salir por la salida correcta.
- **Contenidos:**
  - Tarjetas IC (Suica, PASMO, ICOCA): チャージ, 残高 *zandaka* (saldo).
  - 切符 *kippu*, 改札 *kaisatsu*, 〜番線 *-bansen*, 〜方面 *-hōmen* (en dirección a), 〜行き *-yuki*, 出口 / 〜口 (北口, 東口).
  - Frases:
    - 〜に行きたいんですが、何番線ですか。
    - この電車は品川に止まりますか。*Kono densha wa Shinagawa ni tomarimasu ka.*
  - Problemas:
    - Lo que dices: 改札を通れません (no puedo pasar el torniquete).
    - Lo que te pueden decir: 残高が足りません / 精算機で精算してください.
  - Coin lockers: コインロッカーはどこですか。
  - Nota práctica `pendiente de validación`: disponibilidad de tarjetas físicas para turistas (Welcome Suica) y Suica en el iPhone (Apple Wallet).
- **Prerrequisitos:** F2-M04, F1-M08.
- **Evaluación y dominio:** escenario E02 versión ligera, más comprender 3 de 4 preguntas sobre un panel de salidas simulado.
- **Horas:** 1,5 h.

### F3-M03 · Trenes II: transbordos, shinkansen, expresos limitados y anuncios
- **Estado:** `planificado`
- **Objetivo:** Puedo reservar asientos en shinkansen o en un expreso limitado, hacer transbordos y entender los anuncios clave.
- **Contenidos:**
  - Tipos de asiento: 指定席 *shiteiseki* (reservado) / 自由席 *jiyūseki* (no reservado) / グリーン車.
  - Tipos de tren: 各駅停車 / 普通 / 快速 / 急行 / 特急 (orden aproximado de rapidez).
  - 乗り換え *norikae* (transbordo).
  - 終電 *shūden* (último tren).
  - Comprar asientos: 京都までの指定席を二人分お願いします。*Kyōto made no shiteiseki o futaribun onegai shimasu.*
  - Anuncios, solo para reconocerlos:
    - まもなく、2番線に電車が参ります。
    - 黄色い線の内側までお下がりください。
    - 次は品川、品川です。
    - お出口は右側です。
  - Notas prácticas `pendiente de validación`:
    - Reserva de espacio para equipaje grande en el Tōkaidō Shinkansen (特大荷物スペース).
    - Periodos en que los Nozomi son solo con reserva.
    - Conveniencia del JR Pass según el itinerario final.
- **Prerrequisitos:** F3-M02, F2-M07.
- **Evaluación y dominio:**
  - Comprender 8 de 10 anuncios grabados con TTS a velocidad 1,0.
  - Comprar asientos en un diálogo guiado con 2 variaciones (no quedan asientos juntos, cambio de horario).
- **Horas:** 2 h.

### F3-M04 · Buses y taxis
- **Estado:** `planificado`
- **Objetivo:** Puedo tomar un bus local (por ejemplo, en Takayama, Kioto o Kumano) y un taxi dando una dirección.
- **Contenidos:**
  - Buses:
    - 整理券 *seiriken* (ticket numerado al subir).
    - 運賃 *unchin* (tarifa).
    - 両替 *ryōgae* (cambio de monedas en el bus).
    - Subir por atrás y pagar al bajar: el sistema varía según la ciudad, así que hay que mirar el cartel.
    - 次、止まります (al tocar el botón).
    - このバスは〜に行きますか。
  - Taxis:
    - La puerta se abre sola.
    - 〜までお願いします。
    - この住所までお願いします (mostrando el teléfono).
    - ここで止めてください。
    - カードで払えますか。
- **Prerrequisitos:** F3-M02.
- **Evaluación y dominio:** escenario E07 versión ligera y diálogo de taxi con 2 variaciones.
- **Horas:** 1 h.

### F3-M05 · Hotel: check-in, check-out y problemas con la reserva
- **Estado:** `planificado`
- **Objetivo:** Puedo hacer check-in y check-out, preguntar por servicios y resolver un problema con la reserva.
- **Contenidos:**
  - チェックインをお願いします。
  - 予約した〜です。
  - Lo que puedes escuchar:
    - パスポートをお願いします。
    - こちらにご記入ください。
    - 朝食は7時からです。
  - Preguntas útiles:
    - 荷物を預かってもらえますか。
    - Wi-Fiのパスワードは何ですか。
    - 荷物を送りたいんですが (宅急便 *takkyūbin*, envío de maletas).
  - Problemas (N4 adelantado como bloque):
    - 予約したんですが、確認してもらえますか。
    - 部屋を変えてもらえますか。
    - エアコンが動きません。
  - Ryokan: ver F5-M04.
- **Prerrequisitos:** F2-M08, F2-M07.
- **Evaluación y dominio:** escenario E08 completo con al menos 1 variación inesperada resuelta sin cambiar a inglés.
- **Horas:** 1,5 h.

### F3-M06 · Restaurantes: pedir, modificar, alérgenos y pagar
- **Estado:** `planificado`
- **Objetivo:** Puedo entrar, pedir, modificar un pedido, preguntar por ingredientes y alérgenos, y pagar.
- **Contenidos:**
  - Lo que escuchas al entrar:
    - いらっしゃいませ。
    - 何名様ですか。*Nanmei-sama desu ka.*
    - お煙草は吸われますか (menos común hoy).
  - Lo que respondes: 二人です。
  - Pedir:
    - これをお願いします。
    - おすすめは何ですか。
  - Modificar:
    - 〜抜きでお願いします (sin 〜). Ejemplo: わさび抜きでお願いします.
    - 大盛り (porción grande).
  - Alérgenos:
    - 卵アレルギーがあります。*Tamago arerugī ga arimasu.*
    - これに卵は入っていますか。*Kore ni tamago wa haitte imasu ka.*
    - Otros: 小麦, 乳 (lácteos), えび, かに, そば, 落花生 (maní).
  - Lo que te pueden decir: ご注文はお決まりですか, 少々お待ちください, 以上でよろしいですか.
  - Pagar:
    - お会計お願いします。
    - 別々に払えますか。
    - En muchos locales se paga en caja, no en la mesa.
  - 食券 (máquina de tickets en ramen o gyūdon).
- **Prerrequisitos:** F2-M04, F1-M07.
- **Evaluación y dominio:**
  - Escenario E04 completo.
  - Identificar 8 de 10 alérgenos en etiquetas de menú simuladas.
  - Formular oralmente una restricción alimentaria propia sin texto.
- **Horas:** 2 h.

### F3-M07 · Compras generales, konbini y tax-free
- **Estado:** `planificado`
- **Objetivo:** Puedo comprar en konbini y tiendas grandes, entender las preguntas de caja y pedir tax-free.
- **Contenidos:**
  - Preguntas de caja, solo para reconocerlas:
    - 袋はご利用ですか / 袋はいりますか。
    - ポイントカードはお持ちですか。
    - お弁当温めますか。
    - お箸はお付けしますか。
    - お支払いは?
  - Respuestas:
    - はい、お願いします。
    - いいえ、大丈夫です。
    - カードで。
  - Etiquetas de precio: 税込 *zeikomi* (con impuesto) / 税抜 *zeinuki* (sin impuesto).
  - Tax-free:
    - 免税 *menzei*.
    - 免税できますか。*Menzei dekimasu ka.*
    - Pasaporte obligatorio.
  - ATM: los cajeros de 7-Eleven (セブン銀行) suelen aceptar tarjetas extranjeras.
  - Nota práctica `pendiente de validación`: Japón anunció un cambio al **sistema de reembolso** del tax-free (se paga el impuesto y se devuelve al salir del país), previsto desde noviembre de 2026. Antes de viajar hay que **verificar la regla vigente**: monto mínimo (antes ¥5.000 sin impuesto por tienda y día), procedimiento y requisitos.
- **Prerrequisitos:** F2-M07, F1-M07.
- **Evaluación y dominio:** responder correctamente 8 de 10 preguntas de caja escuchadas a velocidad natural, y simular una compra con tax-free.
- **Horas:** 1,5 h.

### F3-M08 · Compras de segunda mano: cámaras, Nintendo y relojes
- **Estado:** `planificado`
- **Objetivo:** Puedo preguntar por el estado, los accesorios, el funcionamiento y la garantía de un producto usado, pedir probarlo y entender las etiquetas.
- **Contenidos:**
  - Etiquetas y vocabulario comunes:
    - 中古 *chūko* (usado) / 新品 *shinpin* (nuevo).
    - 状態 *jōtai* (estado).
    - 傷 *kizu* (rayón).
    - 動作確認済み *dōsa kakunin-zumi* (funcionamiento verificado).
    - ジャンク / ジャンク品: se vende tal cual, sin garantía de que funcione. Es clave para no llevarse sorpresas.
    - 付属品 *fuzokuhin* (accesorios).
    - 箱あり/箱なし.
    - 説明書 *setsumeisho* (manual).
    - 保証 *hoshō* (garantía), 保証期間, 保証書.
    - 本体 *hontai* (el aparato en sí, sin accesorios).
  - **Cámara Sony Cyber-shot DSC-T700:**
    - Vocabulario: バッテリー, 充電器 *jūdenki*, タッチパネル, レンズ, 液晶 *ekishō*.
    - Frases:
      - バッテリーと充電器は付いていますか。*Batterī to jūdenki wa tsuite imasu ka.*
      - 動作確認してもいいですか / 試してみてもいいですか。
      - 写真を一枚撮ってみてもいいですか。
    - Nota técnica `pendiente de validación`: este modelo usa tarjetas **Memory Stick Duo/PRO Duo** (メモリースティック), no SD. Conviene preguntar si incluye una.
  - **Nintendo (consolas, juegos y accesorios):**
    - Vocabulario: ソフト (juego), 本体, コントローラー, 日本版.
    - Frase: 箱と説明書はありますか。
    - Nota `pendiente de validación`: algunas consolas antiguas (por ejemplo, la familia 3DS) tienen bloqueo regional, y un juego japonés puede no funcionar en una consola de otra región. Switch en general no tiene bloqueo regional de juegos. Hay que verificarlo por modelo antes de comprar.
  - **Relojes Seiko usados:**
    - Vocabulario:
      - 自動巻き *jidōmaki* (automático) / クォーツ.
      - 電池交換 *denchi kōkan*.
      - ベルト / バンド.
      - 防水 *bōsui*.
      - オーバーホール (mantención completa).
    - Frase: いつオーバーホールしましたか。
  - **Descuentos, con norma cultural:**
    - En cadenas de segunda mano (por ejemplo Hard Off, Book Off, 2nd Street) y en tiendas grandes, el precio es fijo y regatear no es habitual.
    - En tiendas independientes pequeñas o en mercados de pulgas (フリーマーケット, 骨董市) a veces se acepta una pregunta cortés: 少し安くなりませんか。*Sukoshi yasuku narimasen ka.*
    - Si la respuesta es que no, se acepta sin insistir.
- **Prerrequisitos:** F2-M08, F2-M12, F3-M07.
- **Evaluación y dominio:**
  - Escenarios E03 y E05 completos.
  - Interpretar 10 etiquetas de producto usado (≥ 90 %, en especial ジャンク y 動作確認済み).
  - Producir oralmente las 5 preguntas clave sobre estado y accesorios.
- **Horas:** 2,5 h.

### F3-M09 · Direcciones y cómo pedir ayuda si te pierdes
- **Estado:** `planificado`
- **Objetivo:** Puedo preguntar cómo llegar y entender indicaciones simples con gestos y puntos de referencia.
- **Contenidos:**
  - Frases:
    - 〜への行き方を教えてください。
    - 〜はこの近くですか。
    - 歩いて何分ですか。
    - 道に迷いました。*Michi ni mayoimashita.*
    - 地図で教えてもらえますか。
  - Indicaciones que puedes escuchar:
    - まっすぐ行って、二つ目の信号を右に曲がってください。
    - 〜の隣です。
    - 交番 *kōban* (puesto de policía) como recurso.
- **Prerrequisitos:** F2-M05, F2-M08.
- **Evaluación y dominio:** seguir 6 de 8 indicaciones escuchadas en un mapa simulado.
- **Horas:** 1 h.

### F3-M10 · Turismo: entradas, templos, teleféricos, parques temáticos y bicicletas
- **Estado:** `planificado`
- **Objetivo:** Puedo comprar entradas, entender restricciones y arrendar una bicicleta preguntando por rutas y condiciones.
- **Contenidos:**
  - Entradas:
    - 大人二枚お願いします。*Otona nimai onegai shimasu.*
    - 大人/子ども/小人.
    - 拝観料 *haikanryō* (entrada a un templo).
    - 入場料, 営業時間, 最終入場, 休館日.
  - Teleférico: ロープウェイ, 往復 *ōfuku* / 片道 *katamichi*.
  - Parques temáticos:
    - 身長制限 (restricción de estatura).
    - 待ち時間.
    - 整理券.
    - 手荷物 (equipaje de mano).
  - Arriendo de bicicletas:
    - レンタサイクル, 電動自転車 (eléctrica).
    - 自転車を借りたいんですが。
    - サイズ, ヘルメット, 鍵.
    - 何時までに返却しますか。
    - 乗り捨てできますか (devolver en otro punto).
    - おすすめのルートはありますか。
    - 駐輪場.
  - Nota cultural: en Japón la bicicleta circula por la izquierda.
- **Prerrequisitos:** F2-M07, F2-M08, F3-M09.
- **Evaluación y dominio:** escenarios E06 y E09 completos.
- **Horas:** 1,5 h.

### F3-M11 · Salud y emergencias
- **Estado:** `planificado`
- **Objetivo:** Puedo pedir ayuda, explicar un síntoma simple, comprar un medicamento básico y reportar la pérdida de algo.
- **Contenidos:**
  - Emergencias:
    - 助けてください。*Tasukete kudasai.*
    - 救急車を呼んでください。*Kyūkyūsha o yonde kudasai.*
    - 警察 (110), 救急・消防 (119).
  - Salud:
    - ここが痛いです。*Koko ga itai desu.*
    - 熱があります。
    - 気分が悪いです。
    - 病院 / 薬局 *yakkyoku* / ドラッグストア.
    - 頭痛薬はありますか。
    - 風邪薬 *kazegusuri*.
  - Pérdida de objetos:
    - 財布をなくしました。
    - 電車に傘を忘れました。
    - 忘れ物センター.
  - Sismo:
    - 地震 *jishin*.
    - 緊急地震速報 *kinkyū jishin sokuhō* (alerta en el teléfono).
    - 避難所はどこですか。
  - Nota práctica `pendiente de validación`: la app Safety Tips de la JNTO como recurso oficial en varios idiomas.
- **Prerrequisitos:** F2-M05, F2-M08.
- **Evaluación y dominio:** escenario E10 completo, más producción oral sin texto de las 4 frases de emergencia en ≤ 10 s cada una.
- **Horas:** 1,5 h.

### F3-M12 · Kanji II: lugar, transporte y señalética (45 kanji)
- **Estado:** `planificado`
- **Objetivo:** Reconozco los kanji de estaciones, salidas, avisos y prohibiciones sin depender del inglés.
- **Contenidos:** bloques C, D y E de la sección 6.3, siempre en palabras (出口, 北口, 乗り場, 禁止, 非常口, 押す, 引く).
- **Prerrequisitos:** F2-M11, F3-M02.
- **Evaluación y dominio:** ≥ 90 % al interpretar 30 carteles simulados. Elegir la acción correcta cuenta más que dar la lectura.
- **Horas:** 2 h.

### F3-M13 · Kanji III: tiendas, comida y turismo (26 kanji)
- **Estado:** `planificado`
- **Objetivo:** Reconozco los kanji de menús, etiquetas de precio y lugares turísticos.
- **Contenidos:** bloques F y G de la sección 6.3 (中古, 品切れ, 割引, 免税, 定食, 神社, 公園, 〜寺).
- **Prerrequisitos:** F2-M11.
- **Evaluación y dominio:** ≥ 85 % en la lectura de 30 etiquetas o menús simulados.
- **Horas:** 1,5 h.

---

## 5. Fase 4 — Conversaciones reales

### F4-M01 · Pedir aclaraciones y reparar la conversación
- **Estado:** `planificado`
- **Objetivo:** Cuando no entiendo, sé pedir que repitan, que hablen más lento o que expliquen, sin bloquearme.
- **Contenidos:**
  - もう一度お願いします。*Mō ichido onegai shimasu.*
  - ゆっくりお願いします。*Yukkuri onegai shimasu.*
  - 「〜」ってどういう意味ですか。*"…" tte dō iu imi desu ka.*
  - 英語で大丈夫ですか。*Eigo de daijōbu desu ka.*
  - 書いてもらえますか。
  - すみません、よくわかりません。
  - Repetir la palabra clave con tono de pregunta (〜ですか?).
  - Usar el teléfono para mostrar texto.
- **Prerrequisitos:** F1-M05. Se introduce temprano y se usa en todos los diálogos siguientes.
- **Evaluación y dominio:** en 5 diálogos donde el personaje habla rápido o usa una palabra desconocida, pedir la aclaración adecuada en ≥ 4.
- **Horas:** 1 h.

### F4-M02 · Escuchar al personal a velocidad natural
- **Estado:** `planificado`
- **Objetivo:** Entiendo las frases de servicio más frecuentes cuando se dicen rápido y en keigo.
- **Contenidos:**
  - Unas 30 frases de servicio, solo para reconocerlas:
    - いらっしゃいませ.
    - 少々お待ちください.
    - かしこまりました.
    - 〜でよろしいですか.
    - 〜円のお返しです.
    - 申し訳ございません.
    - ただいま満席です.
    - こちらへどうぞ.
  - Escalera de escucha L1→L4 (sección 7.1).
- **Prerrequisitos:** F3-M06, F3-M07.
- **Evaluación y dominio:** ≥ 85 % de comprensión de 30 frases a velocidad natural (L3), sin texto.
- **Horas:** 2 h.

### F4-M03 · Preguntas inesperadas y reformulación
- **Estado:** `planificado`
- **Objetivo:** Puedo responder algo que no esperaba y reformular cuando no me entienden.
- **Contenidos:**
  - Estrategias de reformulación:
    - Palabra más simple.
    - Préstamo en katakana.
    - Describir en vez de nombrar (por ejemplo, "la cosa para cargar" → 充電するもの).
    - Gestos y teléfono.
  - Diálogos guiados con ramas donde el personaje "no entiende" tu primera respuesta.
- **Prerrequisitos:** F4-M01, F2-M08.
- **Evaluación y dominio:** completar 4 de 5 diálogos con ramas de malentendido sin cambiar al inglés.
- **Horas:** 1 h.

### F4-M04 · Conversación social sencilla
- **Estado:** `planificado`
- **Objetivo:** Puedo mantener 2–3 minutos de conversación cortés con alguien local (de dónde soy, qué hago, qué me gustó de Japón).
- **Contenidos:**
  - Preguntas que te harán:
    - どこから来ましたか。
    - 日本は初めてですか。
    - 日本語が上手ですね。
  - Respuesta modesta: いえいえ、まだまだです。
  - Hablar de Chile, del trabajo, de comida y de gustos (〜が好きです).
  - Opiniones simples (〜と思います).
- **Prerrequisitos:** F1-M06, F2-M06, F2-M09.
- **Evaluación y dominio:** conversación conmigo en el chat (modo tutor) de 3 minutos con ≥ 6 turnos propios. Se evalúa con una rúbrica de comprensión, adecuación y recuperación.
- **Horas:** 1,5 h.

### F4-M05 · Registro formal e informal
- **Estado:** `planificado`
- **Objetivo:** Distingo el habla formal de la informal y sé cuál usar (para un turista, casi siempre です/ます).
- **Contenidos:**
  - Formas simples en conversación (行く?, いいよ, そうだね).
  - Partículas finales ね y よ.
  - Contracciones comunes (〜ちゃう, 〜てる).
  - Cuándo responder en informal: casi nunca, salvo que la otra persona lo proponga.
- **Prerrequisitos:** F2-M10.
- **Evaluación y dominio:** clasificar 20 frases escuchadas como formal o informal (≥ 85 %) y dar su equivalente formal.
- **Horas:** 1,5 h.

---

## 6. Fase 5 — Inmersión cultural

Las notas culturales aparecen dentro de cada módulo de F3. Estos módulos las consolidan y las evalúan con preguntas de situación.

### F5-M01 · Etiqueta en espacios públicos y transporte
- **Estado:** `planificado`
- **Objetivo:** Sé comportarme en la calle y en el transporte sin incomodar.
- **Contenidos:**
  - Silencio y no hablar por teléfono en el tren.
  - Hacer fila.
  - Escaleras mecánicas: en Tokio suele quedarse a la izquierda y en Osaka a la derecha, aunque las estaciones piden no caminar en ellas.
  - Basura:
    - Hay pocos basureros públicos y lo normal es llevar la basura contigo.
    - Clasificación: 燃えるゴミ, 燃えないゴミ, ペットボトル, 缶・びん.
  - No comer caminando en muchos lugares.
  - Sacarse los zapatos: 靴を脱いでください.
- **Prerrequisitos:** F3-M02.
- **Evaluación y dominio:** ≥ 85 % en 15 preguntas de situación.
- **Horas:** 0,5 h.

### F5-M02 · Restaurantes y comida
- **Estado:** `planificado`
- **Objetivo:** Sé las normas básicas de mesa y de pago.
- **Contenidos:**
  - いただきます / ごちそうさまでした.
  - おしぼり.
  - Palillos: no clavarlos en el arroz ni pasar comida de palillo a palillo.
  - No se deja propina. Dejar dinero puede causar confusión, y te pueden perseguir para devolverlo.
  - Pagar en caja.
  - Sorber fideos es aceptable.
- **Prerrequisitos:** F3-M06.
- **Evaluación y dominio:** ≥ 85 % en 12 preguntas de situación.
- **Horas:** 0,5 h.

### F5-M03 · Templos y santuarios
- **Estado:** `planificado`
- **Objetivo:** Distingo un templo budista (寺 *tera/-ji*) de un santuario sintoísta (神社 *jinja*) y sé cómo comportarme en cada uno.
- **Contenidos:**
  - 鳥居 *torii*: no pasar por el centro.
  - 手水舎 *temizuya/chōzuya*: purificación de manos y boca.
  - お賽銭 *osaisen* (ofrenda).
  - En la mayoría de los santuarios: 二礼二拍手一礼 (dos reverencias, dos aplausos, una reverencia). Hay excepciones, así que conviene mirar el cartel.
  - En templos no se aplaude.
  - 御朱印 *goshuin* (sello caligráfico): 御朱印をお願いします.
  - Fotos: atención a los carteles de 撮影禁止.
  - Kumano Hongu Taisha y el Kumano Kodō como contexto de peregrinación.
- **Prerrequisitos:** F3-M10.
- **Evaluación y dominio:** ≥ 85 % en 12 preguntas de situación.
- **Horas:** 0,5 h.

### F5-M04 · Onsen, ryokan y alojamiento tradicional
- **Estado:** `planificado`
- **Objetivo:** Sé usar un onsen y comportarme en un ryokan.
- **Contenidos:**
  - Lavarse antes de entrar al agua.
  - La toalla pequeña no se mete al agua.
  - Tatuajes: pueden estar restringidos. タトゥーがあっても入れますか。
  - Yukata: el lado izquierdo va encima del derecho.
  - Zapatillas de baño.
  - Horarios de cena y desayuno.
- **Prerrequisitos:** F3-M05.
- **Evaluación y dominio:** ≥ 85 % en 10 preguntas de situación.
- **Horas:** 0,5 h.

### F5-M05 · Comunicación no verbal y errores frecuentes
- **Estado:** `planificado`
- **Objetivo:** Interpreto gestos comunes y evito los errores típicos de turistas.
- **Contenidos:**
  - Reverencias según la situación (para un turista basta con una inclinación leve).
  - Señalarse la nariz para decir "¿yo?".
  - Cruzar los brazos en X: no se puede / no hay.
  - Mano abanicando frente a la cara: "no, no".
  - "No" indirecto: ちょっと… o 難しいですね suelen significar que no.
  - Hablar fuerte en público y comer en el tren local como errores típicos.
- **Prerrequisitos:** F4-M01.
- **Evaluación y dominio:** ≥ 85 % en 12 preguntas, incluyendo interpretar 4 respuestas indirectas como "no".
- **Horas:** 0,5 h.

---

## 7. Fase 6 — Simulación integral del viaje

Cada simulación encadena escenarios con **decisiones**, **problemas inesperados** y **evaluación final**. El itinerario es editable en la app, y si cambias ciudades, las simulaciones se reordenan.

### F6-M01 · Simulación Tokio (llegada y compras)
- **Estado:** `planificado`
- **Escenarios:** E01 aeropuerto → E02 Shinagawa → E03 cámara usada (Akihabara) → E05 reloj Seiko (Shinjuku o Shibuya) → paseo por Asakusa (templo Sensō-ji, F5-M03).
- **Prerrequisitos:** F3-M01, F3-M02, F3-M08.
- **Evaluación y dominio:** completar la cadena con ≤ 2 peticiones de cambio a inglés y ≥ 80 % de comprensión de las intervenciones del personal.
- **Horas:** 1,5 h.

### F6-M02 · Simulación Shizuoka y monte Fuji
- **Estado:** `planificado`
- **Escenarios:**
  - Transbordo Tokio → Shizuoka (F3-M03).
  - E06 arriendo de bicicleta en Yaizu.
  - Restaurante de mariscos en el puerto de Yaizu.
  - Teleférico o mirador del Fuji.
  - E09 parque temático (por ejemplo, Fuji-Q Highland; editable).
- **Prerrequisitos:** F3-M03, F3-M10.
- **Evaluación y dominio:** igual que F6-M01, más resolver un imprevisto (por ejemplo, no quedan bicicletas eléctricas).
- **Horas:** 1,5 h.

### F6-M03 · Simulación Alpes japoneses: Kanazawa y Takayama
- **Estado:** `planificado`
- **Escenarios:**
  - E07: expreso limitado hacia Takayama (por ejemplo, el Hida) con reserva de asiento y conexión de bus.
  - Mercado matinal.
  - Ryokan con onsen (F5-M04).
  - Kanazawa: entradas a un jardín o museo.
- **Prerrequisitos:** F3-M03, F3-M04, F5-M04.
- **Evaluación y dominio:** igual que F6-M01, más interpretar un cambio de andén anunciado.
- **Horas:** 1,5 h.

### F6-M04 · Simulación Kansai: Kioto, Nara, Osaka y Kumano
- **Estado:** `planificado`
- **Escenarios:**
  - E08: problema de reserva en un hotel de Kioto.
  - Templos y santuarios (F5-M03).
  - Nara: parque y templo.
  - E04: restaurante en Osaka con alérgenos.
  - Bus a Kumano Hongu Taisha.
  - E09 alternativo: Universal Studios Japan (editable).
- **Prerrequisitos:** F3-M05, F3-M06, F5-M03.
- **Evaluación y dominio:** igual que F6-M01.
- **Horas:** 1,5 h.

### F6-M05 · Simulación sorpresa
- **Estado:** `planificado`
- **Contenido:** situaciones aleatorias de la tabla 8.2 (objeto perdido, sismo, farmacia, tren cancelado, tarjeta rechazada…) con vocabulario no visto, para entrenar la reparación.
- **Prerrequisitos:** F4-M03, F3-M11.
- **Evaluación y dominio:** resolver 4 de 5 situaciones con estrategias de F4.
- **Horas:** 1 h.

### F6-M06 · Evaluación final de preparación
- **Estado:** `planificado`
- **Contenido:** batería completa:
  - Lectura de kana y kanji en contexto.
  - Escucha L3–L4.
  - Producción oral de frases clave.
  - 3 escenarios al azar.
  - Conversación libre conmigo.
- **Prerrequisitos:** F6-M01 a F6-M04.
- **Evaluación y dominio:** informe por habilidad con las metas de salida del calendario. No hay nota global.
- **Horas:** 1 h.

---

## 8. Modo Japón real

### 8.1 Los 10 escenarios

Cada escenario incluye:
- Vocabulario previo.
- Expresiones esenciales.
- Diálogo modelo.
- Audio (TTS).
- Teleprompter.
- Práctica de respuesta.
- Diálogo guiado con ramas.
- Variaciones inesperadas.
- Evaluación.
- Nota cultural.

La **versión ligera** aparece al terminar el módulo de F3 correspondiente. La **versión completa** se hace dentro de F6.

| ID | Escenario | Lugar del itinerario | Módulos base | Versión ligera | Versión completa | Variaciones inesperadas (ejemplos) |
|---|---|---|---|---|---|---|
| E01 | Aeropuerto de Tokio: inmigración, aduana y transporte | Narita o Haneda | F3-M01, F3-M02 | tras F3-M01 | F6-M01 | Te preguntan la dirección del hotel; la máquina de billetes no acepta tu tarjeta |
| E02 | Encontrar el tren correcto | Estación Shinagawa | F3-M02, F3-M03 | tras F3-M02 | F6-M01 | Cambio de andén anunciado; el tren no para en tu estación (rápido) |
| E03 | Comprar una Sony Cyber-shot T700 usada | Akihabara | F3-M08 | tras F3-M08 | F6-M01 | No incluye cargador; es ジャンク; no hay Memory Stick |
| E04 | Pedir comida en un restaurante | Osaka | F3-M06 | tras F3-M06 | F6-M04 | El plato lleva un alérgeno; solo se paga en efectivo; hay que usar 食券 |
| E05 | Reloj Seiko usado: estado, precio y accesorios | Shinjuku o Shibuya | F3-M08, F2-M12 | tras F3-M08 | F6-M01 | No tiene caja; la garantía es solo de la tienda; preguntar por la última mantención |
| E06 | Arrendar una bicicleta y preguntar rutas | Shizuoka (Yaizu) | F3-M10, F3-M09 | tras F3-M10 | F6-M02 | No hay tu talla; hay que devolverla antes de las 17:00; la ruta está cerrada |
| E07 | Llegar a Takayama: expreso limitado y bus | Takayama (vía Nagoya o Toyama) | F3-M03, F3-M04 | tras F3-M04 | F6-M03 | Solo quedan asientos separados; el bus sale de otro andén |
| E08 | Problema con la reserva de hotel | Kioto | F3-M05, F2-M13 (1–2) | tras F3-M05 | F6-M04 | No encuentran la reserva; cama individual en vez de doble; check-in a las 15:00 |
| E09 | Entradas y reglas en un parque temático | Fuji-Q Highland o USJ (editable) | F3-M10, F2-M08 | tras F3-M10 | F6-M02 / F6-M04 | Restricción de estatura; atracción cerrada; tickets con hora (整理券) |
| E10 | Emergencia: pedir ayuda y explicar | Cualquier ciudad | F3-M11, F4-M01 | tras F3-M11 | F6-M05 | Pérdida de pasaporte o billetera; malestar de tu acompañante; alerta de sismo |

**Ejemplo de lo que probablemente escucharás (E03, tienda de cámaras):**

| Japonés | Romaji | Español |
|---|---|---|
| いらっしゃいませ。 | Irasshaimase. | Bienvenido. |
| こちらは動作確認済みです。 | Kochira wa dōsa kakunin-zumi desu. | Este tiene el funcionamiento verificado. |
| 充電器は付いていないんですよ。 | Jūdenki wa tsuite inai n desu yo. | Es que no trae cargador. |
| 保証は一か月です。 | Hoshō wa ikkagetsu desu. | La garantía es de un mes. |
| こちらはジャンク品なので、返品はできません。 | Kochira wa jankuhin na node, henpin wa dekimasen. | Como es un artículo "junk", no se aceptan devoluciones. |

### 8.2 Situaciones que no anticipaste

| Situación | Frase clave (dices / escuchas) | Módulo |
|---|---|---|
| Coin locker para el equipaje | コインロッカーはどこですか。/ 空いていません (no hay libres) | F3-M02 |
| Cargar la tarjeta IC | チャージはどこでできますか。 | F3-M02 |
| El torniquete no te deja salir | 改札を通れません。/ 精算機で精算してください。 | F3-M02 |
| Comprar en konbini y calentar comida | お弁当温めますか。→ はい、お願いします。 | F3-M07 |
| Sacar dinero | セブン銀行のATMはどこですか。 | F3-M07 |
| Shinkansen con reserva o sin reserva | 指定席 / 自由席 | F3-M03 |
| Reservar asientos en un expreso limitado | 〜までの指定席を二人分お願いします。 | F3-M03 |
| Último tren | 終電は何時ですか。 | F3-M03 |
| Enviar maletas al siguiente hotel | 荷物を送りたいんですが。 | F3-M05 |
| Pedir la clave de Wi-Fi | Wi-Fiのパスワードは何ですか。 | F3-M05 |
| Comprar ticket en máquina (ramen) | 食券を買ってください。(escuchas) | F3-M06 |
| Pagar por separado | 別々に払えますか。 | F3-M06 |
| Onsen con tatuajes | タトゥーがあっても入れますか。 | F5-M04 |
| Dónde botar la basura | ゴミ箱はありますか。 | F5-M01 |
| Sacarse los zapatos | 靴を脱いでください。(escuchas) | F5-M01 |
| No dejar propina | No se deja propina; si quieres agradecer: ごちそうさまでした | F5-M02 |
| Alerta de sismo | 緊急地震速報 (reconocer) / 避難所はどこですか。 | F3-M11 |
| Objeto perdido en el tren | 電車に傘を忘れました。 | F3-M11 |
| Farmacia | 頭痛薬はありますか。 | F3-M11 |
| Tarjeta rechazada | このカードは使えません。(escuchas) → 現金で払います。 | F3-M07 |
| Lugar lleno | ただいま満席です。(escuchas) / どのくらい待ちますか。 | F4-M02 |
| Viajar de a dos | 二人です。/ 二名様ですね。(escuchas) | F2-M07 |

---

## 9. Contenido transversal

### 9.1 Dominios de vocabulario (meta ≈ 720 palabras)

Cada palabra se registra con dos tarjetas independientes en el SRS: **reconocer** (japonés → significado, también al oído) y **producir** (español → japonés oral o escrito). La meta de producción es menor que la de reconocimiento.

| Dominio | Reconocer | Producir | Módulos principales |
|---|---|---|---|
| Cortesía y frases fijas | 60 | 45 | F1-M05, F4-M01 |
| Números, precios y tiempo | 70 | 50 | F1-M07, F1-M08 |
| Personas, presentación y vida social | 50 | 30 | F1-M06, F4-M04 |
| Verbos esenciales | 80 | 50 | F2-M03, F2-M08 |
| Adjetivos | 50 | 30 | F2-M06 |
| Transporte | 70 | 35 | F3-M02, F3-M03, F3-M04 |
| Alojamiento | 30 | 15 | F3-M05 |
| Comida y restaurante (incluye alérgenos) | 80 | 40 | F3-M06 |
| Compras y segunda mano | 70 | 35 | F3-M07, F3-M08 |
| Lugares, direcciones y turismo | 60 | 30 | F3-M09, F3-M10 |
| Salud y emergencias | 35 | 25 | F3-M11 |
| Lenguaje de servicio (keigo, solo reconocimiento) | 30 | 0 | F4-M02 |
| Palabras funcionales (interrogativos, demostrativos, conectores) | 35 | 30 | F2-M01, F2-M02 |
| **Total** | **≈ 720** | **≈ 415** | |

### 9.2 Gramática N5 completa (checklist)

| Punto | Módulo |
|---|---|
| です / じゃないです / でした / じゃなかったです | F2-M01 |
| これ・それ・あれ・どれ / この〜 / ここ〜 / こちら〜 | F2-M01 |
| の (posesión, clasificación) | F2-M01 |
| か, interrogativos, はい/いいえ | F2-M02 |
| は y が (patrones básicos), 〜が好き/わかる/ある/上手/できる | F2-M02 |
| ます / ません / ました / ませんでした | F2-M03 |
| を, に, で, へ, と, も, から, まで, や, より | F2-M04, F2-M12 |
| あります / います, 〜に〜があります, posiciones | F2-M05 |
| Adjetivos い y な (4 formas, ante sustantivos, くて/で) | F2-M06 |
| Contadores básicos | F2-M07 |
| Forma て: ください, てもいい, てはいけない, ている, てから, encadenar | F2-M08 |
| 〜ないでください | F2-M08 |
| 〜たい, 〜がほしい, 〜ませんか, 〜ましょう(か), 〜に行く (finalidad) | F2-M09 |
| Forma diccionario, ない, た; 〜前に, 〜たあとで, 〜たり〜たり, 〜ことができる, 〜とき, 〜でしょう | F2-M10 |
| 〜より, 〜のほうが, 〜で一番, どちら | F2-M12 |
| 〜から (razón), 〜が / けど (contraste) | F2-M12 |
| 〜くなる / 〜になる | F2-M06 |
| もう / まだ | F2-M03 |
| ね, よ | F4-M05 |

### 9.3 Kanji prioritarios para el viaje (107)

Se aprenden **en palabras y en contexto** (carteles, menús, horarios). La meta es reconocerlos y saber qué acción implican. Escribirlos a mano es opcional.

| Bloque | Kanji | Palabras de ejemplo (lectura) | Módulo |
|---|---|---|---|
| A · Números y dinero (16) | 一 二 三 四 五 六 七 八 九 十 百 千 万 円 税 込 | 千円 (せんえん), 一万円 (いちまんえん), 税込 (ぜいこみ) | F2-M11 |
| B · Tiempo (12) | 日 月 水 年 時 分 半 今 週 午 前 後 | 今日 (きょう), 毎週 (まいしゅう), 午前 (ごぜん), 午後 (ごご), 水曜日 (すいようび) | F2-M11 |
| H · Personas y salud (8) | 人 名 何 本 病 院 薬 医 | 名前 (なまえ), 病院 (びょういん), 薬 (くすり), 医者 (いしゃ), 日本 (にほん) | F2-M11 |
| C · Lugar y dirección (13) | 北 南 東 西 上 下 左 右 中 外 口 出 入 | 北口 (きたぐち), 出口 (でぐち), 入口 (いりぐち), 東京 (とうきょう) | F3-M12 |
| D · Transporte (19) | 駅 線 番 乗 降 車 電 改 札 急 特 行 発 着 席 空 港 新 京 | 改札 (かいさつ), 〜番線 (ばんせん), 乗り場 (のりば), 降りる (おりる), 特急 (とっきゅう), 〜行き (ゆき), 東京発 (とうきょうはつ), 指定席 (していせき), 空港 (くうこう), 新幹線 (しんかんせん) | F3-M12 |
| E · Señalética (13) | 禁 止 非 常 押 引 開 閉 男 女 料 無 手 | 禁止 (きんし), 非常口 (ひじょうぐち), 押す (おす), 引く (ひく), 無料 (むりょう), お手洗い (おてあらい) | F3-M12 |
| F · Tiendas y comida (17) | 店 売 買 安 高 古 品 割 免 食 飲 肉 魚 卵 茶 大 小 | 中古 (ちゅうこ), 品切れ (しなぎれ), 割引 (わりびき), 免税 (めんぜい), 定食 (ていしょく), 大人 (おとな) | F3-M13 |
| G · Turismo y lugares (9) | 寺 神 社 山 川 公 園 城 道 | 神社 (じんじゃ), 〜寺 (じ/でら), 公園 (こうえん), 〜城 (じょう), 富士山 (ふじさん) | F3-M13 |

Hay palabras que se enseñan completas aunque alguno de sus kanji no esté en la lista: 地下鉄, 乗り換え, 切符, 各駅停車, 自由席, 化粧室, 営業中, 準備中, 税抜, 危険, 注意. Se reconocen como palabra, sin estudiar cada kanji por separado.

### 9.4 N4 selectivo

Ver F2-M13. Fuera de esa lista, N4 queda para después del viaje.

---

## 10. Habilidades transversales

### 10.1 Escalera de comprensión auditiva

| Nivel | Qué escuchas | Apoyo | Se usa desde |
|---|---|---|---|
| L1 | Frases aisladas, TTS a 0,7× | Texto japonés + romaji visibles | F1 |
| L2 | Frases y microdiálogos a 1,0× | Texto japonés visible, sin romaji | F2 |
| L3 | Diálogos a 1,0× | Sin texto; transcripción al final | F3 |
| L4 | Diálogos a 1,1–1,2× con frases de servicio en keigo | Sin texto, una sola reproducción permitida | F4 |
| L5 | Diálogo con ramas imprevistas y vocabulario desconocido | Sin texto, hay que pedir aclaración | F4–F6 |

Limitación honesta: la app usa voces sintéticas del sistema, que son más claras y regulares que el habla real (no tienen ruido, superposición, acento de Kansai ni muletillas). Para cerrar esa brecha conviene sumar audio real de forma complementaria, por ejemplo videos de situaciones cotidianas en japonés y anuncios reales de estaciones. La app registra si haces escucha externa, pero no la evalúa.

### 10.2 Shadowing (protocolo)

1. Escuchar la frase 2 veces sin texto.
2. Leerla en el teleprompter (modo A o B).
3. Repetirla junto con el audio, con texto.
4. Repetirla junto con el audio, sin texto.
5. Grabarte y comparar tu grabación con el modelo.

En el paso 5, la app solo compara lo que puede medir con fiabilidad:
- Duración total.
- Pausas.
- Lo que el reconocedor de voz entendió frente al texto esperado.

No da un puntaje de pronunciación.

### 10.3 Dictado

- **Kana:** sílabas y palabras.
- **Números:** precios, andenes, horas, fechas. Es crítico para el viaje.
- **Frases:** completar huecos en diálogos escuchados.

Cada error de dictado se registra con su tipo (vocal larga, っ, contador, partícula) para el análisis de patrones.

### 10.4 Pronunciación (ruta)

| Tema | Ejemplo | Módulo |
|---|---|---|
| Moras y ritmo parejo | にほん (3 moras), がっこう (4 moras) | F1-M01 |
| Vocales largas | おばさん / おばあさん, ビル / ビール | F1-M03 |
| Consonante doble っ | きて / きって, おと / おっと | F1-M03 |
| ん como mora completa; se asimila a [m] ante b, p y m | さんぽ, しんぶん | F1-M03 |
| Vocales ensordecidas (i, u entre consonantes sordas o al final) | です → *des*, します → *shimas*, すき → *ski* | F1-M05 |
| Lecturas especiales de partículas | は → *wa*, へ → *e*, を → *o* | F1-M05, F2-M04 |
| Préstamos con fonética japonesa | カメラ *kamera*, マクドナルド *Makudonarudo* | F1-M04 |
| Acento tonal (sensibilización) | 雨/飴, 箸/橋 | F1-M09 |
| Diferencias entre escritura y habla natural | です/ます sin "u"; contracciones 〜てる, 〜ちゃう | F1-M05, F4-M05 |

### 10.5 Estrategias de aclaración

Se introducen en F4-M01 y se exigen en todos los diálogos posteriores:

- もう一度お願いします。
- ゆっくりお願いします。
- 「〜」ってどういう意味ですか。
- 英語で大丈夫ですか。
- 書いてもらえますか。

---

## 11. Técnicas de aprendizaje y por qué

Ninguna técnica funciona siempre mejor que todas las demás. Estas se eligieron porque la investigación sobre aprendizaje y adquisición de segundas lenguas las respalda razonablemente para objetivos como el tuyo, y porque se pueden aplicar en sesiones cortas. Si tus datos muestran que algo no te funciona, se ajusta.

| Técnica | Por qué se usa | Cuidado con |
|---|---|---|
| **Recuperación activa** | Intentar recordar antes de ver la respuesta fortalece la memoria más que releer. Por eso casi todo ejercicio te pide responder primero. | Frustra si la dificultad es excesiva, así que se usan pistas graduales. |
| **Repetición espaciada (FSRS)** | Programa cada repaso cerca del momento en que lo ibas a olvidar. FSRS es un algoritmo documentado y abierto que estima la estabilidad y la dificultad de cada tarjeta. | Solo optimiza la memoria de ítems sueltos y no reemplaza la práctica en contexto. Si se acumulan repasos, se frena el contenido nuevo. |
| **Práctica intercalada** | Mezclar tipos de ejercicio o pares que se confunden (シ/ツ, は/が) obliga a discriminar, y eso mejora la transferencia. | Al principio parece más difícil y da sensación de avanzar menos. |
| **Escucha graduada** | Subir de velocidad y bajar el apoyo de texto paso a paso (L1→L5) prepara para respuestas reales. | El TTS no equivale al habla real, así que conviene complementar. |
| **Shadowing** | Imitar en tiempo real mejora el ritmo y la fluidez articulatoria y conecta sonido con texto. | La app no puede evaluar la fonética con precisión: la comparación es tuya, con ayuda de duración y transcripción. |
| **Producción oral** | Reconocer no es producir. Hay que practicar decir las cosas, no solo entenderlas. | El reconocimiento de voz falla con pronunciaciones aceptables y a veces acepta errores, así que se usa como indicio y no como juez. |
| **Aprendizaje contextual** | Las palabras y kanji se aprenden en frases y situaciones del viaje, y así se recuperan mejor cuando hacen falta. | Hay que repasar también fuera del contexto original para generalizar. |
| **Retroalimentación correctiva** | Corregir los errores importantes y explicar por qué evita que se fosilicen. | Corregirlo todo bloquea. En modo inmersión la corrección llega al final. |
| **Dictado** | Revela los errores de percepción (vocales largas, っ, números) que la lectura esconde. | Puede ser tedioso, por eso se hace en dosis cortas. |
| **Simulaciones** | Integran todas las habilidades bajo algo de presión, como en el viaje real. | Son guiadas y no reemplazan una conversación real. Por eso se complementan con conversación abierta en el chat. |
| **Repaso acumulativo** | Cada evaluación mensual incluye contenido de meses anteriores, para que no se pierda. | Exige reservar tiempo: el calendario lo protege. |

---

## 12. Estructura de cada clase

### 12.1 Plantilla de 14 pasos

1. **Objetivo comunicativo:** qué podrás hacer al terminar.
2. **Repaso inicial:** tarjetas SRS vencidas y errores recientes.
3. **Vocabulario nuevo:** fichas completas (sección 12.3).
4. **Explicación gramatical:** corta, con un ejemplo y sin listas largas.
5. **Ejemplos japoneses:** 3–5 frases del contexto del viaje.
6. **Pronunciación guiada:** foco en 1–2 rasgos.
7. **Teleprompter:** lectura en el modo según el nivel (A/B/C).
8. **Comprensión auditiva:** según la escalera L1–L5.
9. **Diálogo contextual:** guiado, con ramas.
10. **Construcción de frases:** ordenar, completar, transformar.
11. **Práctica oral:** shadowing, respuesta oral, grabación.
12. **Evaluación:** con el criterio del módulo.
13. **Retroalimentación:** errores por patrón y qué repasar.
14. **Programación de repasos:** el SRS agenda los ítems nuevos.

### 12.2 Cómo se adapta a la duración

| Paso | 5 min | 15 min | 30 min | 45 min | 60 min |
|---|---|---|---|---|---|
| 1 Objetivo | — | ✓ | ✓ | ✓ | ✓ |
| 2 Repaso inicial | ✓ (toda la sesión) | ✓ (4 min) | ✓ (8–10 min) | ✓ (10 min) | ✓ (12 min) |
| 3 Vocabulario | — | ✓ (4–6 ítems) | ✓ (8–10) | ✓ (10–12) | ✓ (12–15) |
| 4 Gramática | — | breve | ✓ | ✓ | ✓ |
| 5 Ejemplos | — | ✓ | ✓ | ✓ | ✓ |
| 6 Pronunciación | — | — | ✓ | ✓ | ✓ |
| 7 Teleprompter | — | ✓ | ✓ | ✓ | ✓ |
| 8 Comprensión auditiva | — | — | ✓ | ✓ | ✓ (ampliada + dictado) |
| 9 Diálogo | — | — | breve | ✓ | ✓ + escenario completo |
| 10 Construcción | — | ✓ | ✓ | ✓ | ✓ |
| 11 Práctica oral | — | breve | ✓ | ✓ | ✓ (grabación) |
| 12 Evaluación | mini | mini | ✓ | ✓ | ✓ + acumulativa |
| 13 Retroalimentación | ✓ | ✓ | ✓ | ✓ | ✓ |
| 14 Programación | ✓ | ✓ | ✓ | ✓ | ✓ |

La sesión de 5 minutos es solo de repaso, sin contenido nuevo. Si los repasos vencidos superan el tiempo de la sesión, la app pospone el contenido nuevo.

### 12.3 Ficha de palabra o frase

Cada ítem nuevo muestra lo que corresponda:

1. Escritura japonesa natural (con kanji si se usan normalmente).
2. Lectura en hiragana.
3. Katakana solo si la palabra se escribe así: no se convierte artificialmente.
4. Kanji y su lectura en esa palabra.
5. Romaji Hepburn.
6. Traducción al español.
7. Pronunciación (vocales largas, ensordecimiento, っ).
8. Contexto de uso.
9. Formalidad: casual, cortés o muy cortés (keigo).
10. Ejemplo real.

Ejemplo:

- **Japonés:** すみません
- **Romaji:** sumimasen
- **Español:** Disculpe / Perdón.
- **Pronunciación:** la "u" de *su* es suave y casi no suena; son 5 moras de igual duración (*su-mi-ma-se-n*).
- **Uso:** llamar la atención, disculparse, agradecer una molestia.
- **Formalidad:** cortés.
- **Ejemplo:** すみません、駅はどこですか。*Sumimasen, eki wa doko desu ka.* Disculpe, ¿dónde está la estación?

---

## 13. Control de calidad lingüística

### 13.1 Checklist por ítem

| Aspecto | Qué se verifica |
|---|---|
| Escritura | Que el kanji, el kana y la mezcla sean las habituales (no se pone kanji si normalmente se escribe en kana, como すみません o ください en peticiones). |
| Romaji | Hepburn correcto (shi, chi, tsu, fu, ji; ん = n; vocales largas con macrón donde corresponde), y que las variantes aceptadas estén definidas. |
| Furigana | Que la lectura corresponda a esa palabra (〜行き *yuki*, 一日 *tsuitachi/ichinichi* según el sentido). |
| Traducción | Que sea fiel y natural en español chileno neutro, y que diga el matiz cuando hay varios. |
| Naturalidad | Que un nativo lo diría así en esa situación. Se evitan las frases de libro que nadie usa. |
| Formalidad | Que la etiqueta sea correcta y adecuada para un turista hablando con personal. |
| Pronunciación | Notas de vocales largas, ensordecimiento, っ y lecturas especiales de partículas. |
| Contexto cultural | Que la nota sea precisa, sin generalizar. Si algo varía (por ciudad, local o reglamento), se dice. |

### 13.2 Reglas

- Todo contenido nuevo entra en la app como `pendiente de validación` y queda así hasta pasar la checklist.
- Los datos prácticos que cambian con el tiempo (tax-free, normas de equipaje, tarjetas IC, trámites de entrada) llevan además la etiqueta **"verificar vigente"** y una fecha de revisión.
- No se generan frases en masa. Cada lote es pequeño, revisado y vinculado a un módulo.
- Si se detecta un error en un ítem ya validado, vuelve a `pendiente de validación`, y su historial SRS se conserva.

### 13.3 Puntos ya marcados como pendientes de validación

| Punto | Motivo |
|---|---|
| Tax-free: sistema de reembolso y montos mínimos | Cambio de reglamento anunciado para noviembre de 2026. Hay que verificar la regla vigente antes del viaje. |
| Trámites de entrada (Visit Japan Web, formularios) | Cambian con frecuencia. |
| Tarjetas IC para turistas (Welcome Suica, Suica en iPhone) | La disponibilidad ha cambiado en años recientes. |
| Equipaje grande en el Tōkaidō Shinkansen y Nozomi solo con reserva en temporada alta | Hay que confirmar la norma vigente y si afecta a las fechas del viaje. |
| Bloqueo regional de consolas Nintendo por modelo | Hay que verificarlo por modelo antes de comprar. |
| Medio de almacenamiento de la Sony DSC-T700 (Memory Stick Duo/PRO Duo) | Hay que confirmarlo con la ficha técnica del modelo exacto. |
| Ritual 二礼二拍手一礼 | Es general en santuarios, pero hay excepciones locales. |
| Lado de la escalera mecánica (Tokio izquierda, Osaka derecha) | Es la costumbre extendida, aunque oficialmente se pide no caminar en ellas. |
| Sistema de pago en buses (subir atrás y pagar al bajar) | Varía según la ciudad y la empresa. |
