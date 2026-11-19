// Base de datos local (IndexedDB vía Dexie). Todo queda en el dispositivo.

import Dexie, { type Table } from 'dexie';
import type { SrsCard, ItemKind, Skill } from '../core/srs';

export interface ItineraryStop {
  id: string;
  place: string;
  from: string; // YYYY-MM-DD
  to: string; // YYYY-MM-DD
  notes: string;
}

export interface Profile {
  id: 'me';
  createdAt: number;
  name: string;
  tripStart: string; // YYYY-MM-DD
  tripEnd: string;
  travelers: number;
  dailyMinutes: number;
  studyDaysPerWeek: number;
  itinerary: ItineraryStop[];
  diagnosticDone: boolean;
}

export interface Settings {
  id: 'app';
  theme: 'system' | 'light' | 'dark';
  showRomaji: boolean;
  showFurigana: boolean;
  showTranslation: boolean;
  voiceURI: string | null;
  speechRate: number;
  autoSpeak: boolean;
  achievements: boolean;
  micConsent: boolean;
}

export interface ReviewLog {
  id?: number;
  cardId: string;
  itemId: string;
  kind: ItemKind;
  skill: Skill;
  correct: boolean;
  rating: number;
  responseMs: number;
  ts: number;
  day: string;
  /** Lo que respondió la persona, para analizar errores. */
  given?: string;
}

export interface StudySession {
  id?: number;
  day: string;
  start: number;
  end: number;
  seconds: number;
  activity: string;
}

/** Error etiquetado: "confusión シ/ツ", "vocal larga", "partícula は/が"... */
export interface Mistake {
  id?: number;
  itemId: string;
  tag: string;
  detail: string;
  ts: number;
}

export interface LessonProgress {
  lessonId: string;
  status: 'en_curso' | 'completada' | 'repasar';
  bestScore: number;
  attempts: number;
  updatedAt: number;
}

export interface Favorite {
  id: string; // itemId o frase
  jp: string;
  reading: string;
  romaji: string;
  es: string;
  addedAt: number;
}

export interface DictionaryEntry {
  id?: number;
  jp: string;
  reading: string;
  romaji: string;
  es: string;
  notes: string;
  createdAt: number;
}

export interface Conversation {
  id?: number;
  scenarioId: string;
  startedAt: number;
  endedAt: number | null;
  turns: { speaker: 'npc' | 'me'; text: string; ts: number }[];
  summary: string;
}

export class NihongoDB extends Dexie {
  profile!: Table<Profile, string>;
  settings!: Table<Settings, string>;
  cards!: Table<SrsCard, string>;
  reviews!: Table<ReviewLog, number>;
  sessions!: Table<StudySession, number>;
  mistakes!: Table<Mistake, number>;
  lessons!: Table<LessonProgress, string>;
  favorites!: Table<Favorite, string>;
  dictionary!: Table<DictionaryEntry, number>;
  conversations!: Table<Conversation, number>;

  constructor(name = 'nihongo-quest') {
    super(name);
    this.version(1).stores({
      profile: 'id',
      settings: 'id',
      cards: 'id, itemId, kind, skill, due',
      reviews: '++id, cardId, itemId, kind, skill, day, ts',
      sessions: '++id, day, activity',
      mistakes: '++id, itemId, tag, ts',
      lessons: 'lessonId, status',
      favorites: 'id, addedAt',
      dictionary: '++id, jp, createdAt',
      conversations: '++id, scenarioId, startedAt',
    });
  }
}

export const db = new NihongoDB();

export const TABLES = [
  'profile',
  'settings',
  'cards',
  'reviews',
  'sessions',
  'mistakes',
  'lessons',
  'favorites',
  'dictionary',
  'conversations',
] as const;

export const DEFAULT_PROFILE: Profile = {
  id: 'me',
  createdAt: 0,
  name: '',
  // Marcador editable: el viaje es en mayo–junio de 2027.
  tripStart: '2027-05-15',
  tripEnd: '2027-06-05',
  travelers: 2,
  dailyMinutes: 30,
  studyDaysPerWeek: 6,
  itinerary: [
    { id: 'tokyo', place: 'Tokio (Shinagawa, Akihabara, Shinjuku, Shibuya, Asakusa)', from: '', to: '', notes: '' },
    { id: 'shizuoka', place: 'Shizuoka, Yaizu y alrededores del Fuji', from: '', to: '', notes: '' },
    { id: 'kanazawa', place: 'Kanazawa', from: '', to: '', notes: '' },
    { id: 'takayama', place: 'Takayama', from: '', to: '', notes: '' },
    { id: 'kyoto', place: 'Kioto', from: '', to: '', notes: '' },
    { id: 'kumano', place: 'Kumano Hongu Taisha', from: '', to: '', notes: '' },
    { id: 'osaka', place: 'Osaka', from: '', to: '', notes: '' },
    { id: 'nara', place: 'Nara', from: '', to: '', notes: '' },
  ],
  diagnosticDone: false,
};

export const DEFAULT_SETTINGS: Settings = {
  id: 'app',
  theme: 'system',
  showRomaji: true,
  showFurigana: true,
  showTranslation: true,
  voiceURI: null,
  speechRate: 0.85,
  autoSpeak: true,
  achievements: true,
  micConsent: false,
};
