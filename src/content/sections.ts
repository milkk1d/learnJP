// Mapa de secciones de la plataforma y su estado real de implementación.
// "implementado" solo cuando la sección funciona de verdad; el resto se muestra como planificado.

export type SectionStatus = 'implementado' | 'parcial' | 'planificado';

export interface Section {
  id: string;
  path: string;
  label: string;
  glyph: string;
  hito: number;
  status: SectionStatus;
  summary: string;
  /** Qué incluirá (para secciones aún no construidas). */
  plan?: string[];
}

export const SECTIONS: Section[] = [
  { id: 'inicio', path: '/', label: 'Inicio', glyph: '家', hito: 1, status: 'implementado', summary: 'Tu día de estudio, progreso real y cuenta regresiva al viaje.' },
  {
    id: 'curso', path: '/curso', label: 'Mi curso', glyph: '道', hito: 2, status: 'planificado',
    summary: 'Las 6 fases del curso con lecciones, prerrequisitos y criterios de dominio.',
    plan: ['Mapa de fases y módulos con estado y prerrequisitos', 'Lecciones de 14 pasos que se adaptan a 5–60 min', 'Desbloqueo por dominio, no por pantallas vistas', 'Evaluación diagnóstica inicial'],
  },
  { id: 'hiragana', path: '/hiragana', label: 'Hiragana', glyph: 'あ', hito: 2, status: 'implementado', summary: 'Tabla con audio y práctica con repetición espaciada FSRS.' },
  { id: 'katakana', path: '/katakana', label: 'Katakana', glyph: 'ア', hito: 2, status: 'implementado', summary: 'Tabla con audio y práctica con repetición espaciada FSRS.' },
  {
    id: 'kanji', path: '/kanji', label: 'Kanji', glyph: '字', hito: 2, status: 'planificado',
    summary: '~100 kanji útiles para el viaje, enseñados dentro de palabras.',
    plan: ['Kanji de estaciones, carteles, precios y menús (駅, 出口, 円, 税込…)', 'Lecturas en contexto con furigana activable', 'Reconocimiento y lectura como habilidades separadas'],
  },
  {
    id: 'vocabulario', path: '/vocabulario', label: 'Vocabulario', glyph: '語', hito: 2, status: 'planificado',
    summary: 'Fichas completas: escritura, lectura, romaji, uso, formalidad y ejemplo.',
    plan: ['Fichas de 10 campos revisadas a mano', 'Diccionario personal y favoritos', 'Reconocer ≠ producir: seguimiento separado'],
  },
  {
    id: 'gramatica', path: '/gramatica', label: 'Gramática', glyph: '文', hito: 2, status: 'planificado',
    summary: 'Partículas, forma ます, forma て, adjetivos y más, con ejercicios.',
    plan: ['Explicaciones cortas en español chileno', 'Construcción de frases con piezas', 'Errores típicos de hispanohablantes'],
  },
  {
    id: 'conversaciones', path: '/conversaciones', label: 'Conversaciones', glyph: '話', hito: 5, status: 'planificado',
    summary: 'Diálogos ramificados con personajes: mesero, vendedor, recepcionista…',
    plan: ['Diálogos guiados con decisiones y respuestas naturales', 'Modo profesor y modo inmersión', 'Situaciones donde no te entienden y debes reformular', 'Historial de conversaciones'],
  },
  {
    id: 'teleprompter', path: '/teleprompter', label: 'Teleprompter', glyph: '読', hito: 3, status: 'planificado',
    summary: 'Lectura guiada, shadowing, memorización y grabación (modos A–G).',
    plan: ['Furigana, romaji y traducción activables', 'Velocidad, tamaño, pausa, repetición y pantalla completa', 'Controles táctiles y atajos de teclado'],
  },
  {
    id: 'pronunciacion', path: '/pronunciacion', label: 'Pronunciación', glyph: '声', hito: 4, status: 'planificado',
    summary: 'Grabación, comparación con el modelo y ejercicios correctivos.',
    plan: ['Moras, vocales largas, っ y ん', 'Grabar y comparar duración con el modelo', 'Reconocimiento de voz con aviso de sus límites (sin porcentajes inventados)'],
  },
  {
    id: 'escucha', path: '/escucha', label: 'Escucha', glyph: '耳', hito: 4, status: 'parcial',
    summary: 'Frases reales grabadas por japoneses nativos: escucha, entiende y repite.',
    plan: ['Hecho: práctica "¿qué escuchaste?" y explorador con audio nativo (Tatoeba)', 'Pendiente: dictados de números, precios y andenes', 'Pendiente: velocidad graduada y respuestas del personal en contexto'],
  },
  {
    id: 'simulador', path: '/simulador', label: 'Simulador de viaje', glyph: '旅', hito: 7, status: 'planificado',
    summary: 'Tu itinerario convertido en escenarios: aeropuerto, Shinagawa, cámaras usadas…',
    plan: ['10 escenarios del modo Japón real', 'Imprevistos y variaciones', 'Evaluación final y nota cultural por escenario'],
  },
  {
    id: 'repaso', path: '/repaso', label: 'Repaso inteligente', glyph: '復', hito: 6, status: 'planificado',
    summary: 'Una sola cola con todo lo que vence hoy (hoy: los kana se repasan desde su sección).',
    plan: ['Cola única FSRS de vocabulario, kanji, gramática y frases', 'Práctica intercalada', 'Ejercicios generados desde tus errores reales'],
  },
  {
    id: 'examenes', path: '/examenes', label: 'Exámenes', glyph: '試', hito: 6, status: 'planificado',
    summary: 'Diagnóstico, pruebas por módulo y pruebas mensuales.',
    plan: ['Lectura, escucha, escritura y gramática por separado', 'Criterios de dominio explícitos', 'Patrones de error y ejercicios dirigidos'],
  },
  { id: 'estadisticas', path: '/estadisticas', label: 'Estadísticas', glyph: '計', hito: 1, status: 'implementado', summary: 'Historial diario y tus errores más frecuentes.' },
  { id: 'configuracion', path: '/configuracion', label: 'Configuración', glyph: '設', hito: 1, status: 'implementado', summary: 'Viaje, itinerario, visualización, voz y respaldo de datos.' },
];

export const sectionById = (id: string) => SECTIONS.find((s) => s.id === id)!;
