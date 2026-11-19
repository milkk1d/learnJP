import { GROUPS, SCRIPTS, ROW_INFO, ALL_ITEMS, itemsFor, rowCells } from './kana.js';
import { update, mastery, pickNext, isCorrect, buildChoices } from './srs.js';

// ---------- Estado guardado ----------

const STORAGE_KEY = 'learnjp:v1';
const DEFAULT_SETTINGS = {
  view: 'tablas',
  tableScript: 'hiragana',
  quizScript: 'hiragana',
  rows: ['a', 'k'],
  mode: 'kana-choice',
  autoSpeak: true,
};

function load() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    return { stats: raw.stats || {}, settings: { ...DEFAULT_SETTINGS, ...(raw.settings || {}) } };
  } catch {
    return { stats: {}, settings: { ...DEFAULT_SETTINGS } };
  }
}

const state = load();

function save() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Sin almacenamiento (modo privado): la app sigue funcionando sin guardar.
  }
}

// ---------- Utilidades ----------

const $ = (sel) => document.querySelector(sel);

function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'class') node.className = v;
    else if (k === 'text') node.textContent = v;
    else if (k.startsWith('on')) node.addEventListener(k.slice(2), v);
    else if (v !== false && v != null) node.setAttribute(k, v === true ? '' : v);
  }
  for (const child of [].concat(children)) if (child) node.append(child);
  return node;
}

let toastTimer;
function toast(message) {
  const t = $('#toast');
  t.textContent = message;
  t.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => (t.hidden = true), 4000);
}

// ---------- Voz (Web Speech API) ----------

const speech = {
  voice: null,
  warned: false,
  supported: 'speechSynthesis' in window,
  init() {
    if (!this.supported) return;
    const pick = () => {
      const voices = speechSynthesis.getVoices();
      this.voice = voices.find((v) => /^ja([-_]|$)/i.test(v.lang)) || null;
      this.loaded = voices.length > 0;
    };
    pick();
    speechSynthesis.addEventListener?.('voiceschanged', pick);
  },
  say(text) {
    if (!this.supported) {
      this.warnOnce('Este navegador no puede pronunciar texto.');
      return;
    }
    if (this.loaded && !this.voice) {
      this.warnOnce('No encontré una voz japonesa en este dispositivo. Puedes instalarla en los ajustes de idioma o voz del sistema.');
    }
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'ja-JP';
    if (this.voice) u.voice = this.voice;
    u.rate = 0.8;
    speechSynthesis.speak(u);
  },
  warnOnce(msg) {
    if (this.warned) return;
    this.warned = true;
    toast(msg);
  },
};

// ---------- Navegación ----------

function showView(view) {
  state.settings.view = view;
  save();
  for (const tab of document.querySelectorAll('[role="tab"]')) {
    const active = tab.dataset.view === view;
    tab.setAttribute('aria-selected', active);
    tab.tabIndex = active ? 0 : -1;
  }
  for (const panel of document.querySelectorAll('.view')) {
    panel.hidden = panel.id !== `view-${view}`;
  }
  if (view === 'tablas') renderTables();
  if (view === 'progreso') renderProgress();
  if (view === 'practicar') renderSetup();
}

// ---------- Controles segmentados ----------

function segmented(container, options, value, onChange) {
  container.replaceChildren(
    ...options.map((opt) =>
      el('button', {
        role: 'radio',
        'aria-checked': opt.id === value,
        class: opt.id === value ? 'on' : '',
        onclick: () => onChange(opt.id),
      }, [el('span', { class: 'jp', text: opt.native }), el('span', { class: 'seg-label', text: opt.label })]),
    ),
  );
}

// ---------- Tablas ----------

function kanaCell(item, onTap) {
  if (!item) return el('div', { class: 'cell empty', 'aria-hidden': 'true' });
  const level = mastery(state.stats[item.id]);
  return el('button', {
    class: `cell m${level}`,
    'aria-label': `${item.kana}, ${item.romaji}`,
    onclick: (e) => {
      onTap(item);
      const b = e.currentTarget;
      b.classList.remove('pulse');
      void b.offsetWidth;
      b.classList.add('pulse');
    },
  }, [el('span', { class: 'jp kana', text: item.kana }), el('span', { class: 'romaji', text: item.romaji })]);
}

function renderTables() {
  const script = state.settings.tableScript;
  segmented($('[data-bind="tableScript"]'), SCRIPTS, script, (id) => {
    state.settings.tableScript = id;
    save();
    renderTables();
  });

  const out = [];
  for (const group of GROUPS) {
    const grid = el('div', { class: `grid cols-${group.columns}` });
    for (const row of ROW_INFO.filter((r) => r.group === group.id)) {
      for (const item of rowCells(row.id, script)) {
        grid.append(kanaCell(item, (it) => speech.say(it.kana)));
      }
    }
    out.push(el('section', { class: 'table-group' }, [el('h2', { text: group.label }), grid]));
  }
  $('#tables').replaceChildren(...out);
}

// ---------- Práctica: configuración ----------

const QUIZ_SCRIPTS = [...SCRIPTS, { id: 'ambos', label: 'Ambos', native: 'あア' }];
const MODES = [
  { id: 'kana-choice', title: 'Kana → romaji', sub: 'Elige entre 4 opciones' },
  { id: 'kana-typed', title: 'Kana → romaji', sub: 'Escribe la respuesta' },
  { id: 'romaji-choice', title: 'Romaji → kana', sub: 'Elige el carácter' },
];

function scriptsFor(choice) {
  return choice === 'ambos' ? ['hiragana', 'katakana'] : [choice];
}

function quizItems() {
  const scripts = scriptsFor(state.settings.quizScript);
  return ALL_ITEMS.filter((it) => scripts.includes(it.script) && state.settings.rows.includes(it.row));
}

function renderSetup() {
  const s = state.settings;
  segmented($('[data-bind="quizScript"]'), QUIZ_SCRIPTS, s.quizScript, (id) => {
    s.quizScript = id;
    save();
    renderSetup();
  });

  const sample = s.quizScript === 'katakana' ? 'katakana' : 'hiragana';
  const picker = $('#row-picker');
  picker.replaceChildren(
    ...GROUPS.map((group) =>
      el('div', { class: 'row-group' }, [
        el('div', { class: 'row-group-label muted', text: group.label }),
        el('div', { class: 'chips' },
          ROW_INFO.filter((r) => r.group === group.id).map((row) => {
            const on = s.rows.includes(row.id);
            const first = rowCells(row.id, sample).find(Boolean);
            return el('button', {
              class: `chip${on ? ' on' : ''}`,
              'aria-pressed': on,
              onclick: () => {
                s.rows = on ? s.rows.filter((r) => r !== row.id) : [...s.rows, row.id];
                save();
                renderSetup();
              },
            }, [el('span', { class: 'jp', text: first.kana }), el('span', { text: row.label })]);
          }),
        ),
      ]),
    ),
  );

  $('#modes').replaceChildren(
    ...MODES.map((m) =>
      el('button', {
        role: 'radio',
        'aria-checked': m.id === s.mode,
        class: `mode${m.id === s.mode ? ' on' : ''}`,
        onclick: () => {
          s.mode = m.id;
          save();
          renderSetup();
        },
      }, [el('strong', { text: m.title }), el('span', { text: m.sub })]),
    ),
  );

  $('#auto-speak').checked = s.autoSpeak;
  const n = quizItems().length;
  $('#setup-count').textContent = n
    ? `${n} caracteres en esta práctica.`
    : 'Elige al menos una fila para empezar.';
  $('#start').disabled = n === 0;
}

function selectRows(which) {
  const s = state.settings;
  if (which === 'all') s.rows = ROW_INFO.map((r) => r.id);
  else if (which === 'none') s.rows = [];
  else s.rows = ROW_INFO.filter((r) => r.group === which).map((r) => r.id);
  save();
  renderSetup();
}

// ---------- Práctica: preguntas ----------

const quiz = {
  items: [],
  current: null,
  lastId: null,
  answered: false,
  ok: 0,
  total: 0,
  streak: 0,
  timer: null,
};

function startQuiz() {
  quiz.items = quizItems();
  if (!quiz.items.length) return;
  Object.assign(quiz, { ok: 0, total: 0, streak: 0, lastId: null });
  $('#setup').hidden = true;
  $('#quiz').hidden = false;
  $('#keys-hint').hidden = matchMedia('(hover: none)').matches || state.settings.mode === 'kana-typed';
  updateScore();
  nextQuestion();
}

function stopQuiz() {
  clearTimeout(quiz.timer);
  $('#quiz').hidden = true;
  $('#setup').hidden = false;
  renderSetup();
}

function updateScore() {
  $('#score-ok').textContent = quiz.ok;
  $('#score-total').textContent = quiz.total;
  $('#streak').textContent = quiz.streak;
}

function scriptName(id) {
  return SCRIPTS.find((s) => s.id === id).label.toLowerCase();
}

function nextQuestion() {
  clearTimeout(quiz.timer);
  const item = pickNext(quiz.items, state.stats, quiz.lastId);
  quiz.current = item;
  quiz.lastId = item.id;
  quiz.answered = false;

  const mode = state.settings.mode;
  const prompt = $('#prompt');
  const romajiPrompt = mode === 'romaji-choice';
  prompt.textContent = romajiPrompt ? item.romaji : item.kana;
  prompt.className = `prompt ${romajiPrompt ? 'latin' : 'jp'}`;
  $('#prompt-hint').textContent = romajiPrompt
    ? `¿Cuál es en ${scriptName(item.script)}?`
    : '¿Cómo se lee?';

  $('#feedback').textContent = '';
  $('#feedback').className = 'feedback';
  $('#next').hidden = true;
  $('#card').classList.remove('right', 'wrong');

  const typed = mode === 'kana-typed';
  $('#typed').hidden = !typed;
  $('#choices').hidden = typed;

  if (typed) {
    const input = $('#typed-input');
    input.value = '';
    input.disabled = false;
    input.focus();
  } else {
    let choices = buildChoices(item, quiz.items);
    if (choices.length < 4) {
      const pool = ALL_ITEMS.filter((it) => scriptsFor(state.settings.quizScript).includes(it.script));
      choices = buildChoices(item, pool);
    }
    $('#choices').replaceChildren(
      ...choices.map((c, i) =>
        el('button', {
          class: `choice ${romajiPrompt ? 'jp' : 'latin'}`,
          'data-id': c.id,
          onclick: () => answer(c.id === item.id, c),
        }, [el('span', { class: 'key', text: String(i + 1), 'aria-hidden': 'true' }), el('span', { text: romajiPrompt ? c.kana : c.romaji })]),
      ),
    );
  }
}

function answer(correct, chosen = null, typedText = '') {
  if (quiz.answered) return;
  quiz.answered = true;
  const item = quiz.current;

  state.stats[item.id] = update(state.stats[item.id], correct);
  save();
  quiz.total++;
  if (correct) {
    quiz.ok++;
    quiz.streak++;
  } else {
    quiz.streak = 0;
  }
  updateScore();

  for (const b of document.querySelectorAll('#choices .choice')) {
    b.disabled = true;
    if (b.dataset.id === item.id) b.classList.add('ok');
    else if (chosen && b.dataset.id === chosen.id) b.classList.add('bad');
  }
  $('#typed-input').disabled = true;

  const fb = $('#feedback');
  const pair = `${item.kana} = ${item.accepted.join(' / ')}`;
  if (correct) {
    fb.textContent = `¡Bien! ${pair}`;
  } else if (typedText) {
    fb.textContent = `Escribiste «${typedText}». Era ${pair}`;
  } else {
    fb.textContent = `Era ${pair}`;
  }
  fb.className = `feedback ${correct ? 'good' : 'bad'}`;
  $('#card').classList.add(correct ? 'right' : 'wrong');

  if (state.settings.autoSpeak) speech.say(item.kana);

  if (correct) {
    quiz.timer = setTimeout(nextQuestion, 1100);
  } else {
    $('#next').hidden = false;
    $('#next').focus();
  }
}

// ---------- Progreso ----------

function renderProgress() {
  const blocks = SCRIPTS.map((script) => {
    const items = itemsFor(script.id);
    const stats = items.map((it) => state.stats[it.id]).filter(Boolean);
    const mastered = items.filter((it) => mastery(state.stats[it.id]) === 3).length;
    const seen = stats.length;
    const answers = stats.reduce((a, s) => a + s.seen, 0);
    const right = stats.reduce((a, s) => a + s.correct, 0);
    const accuracy = answers ? Math.round((right / answers) * 100) : null;

    const tiles = items.map((it) =>
      el('button', {
        class: `tile m${mastery(state.stats[it.id])} jp`,
        title: `${it.kana} · ${it.romaji}`,
        'aria-label': `${it.kana}, ${it.romaji}`,
        text: it.kana,
        onclick: () => speech.say(it.kana),
      }),
    );

    return el('section', { class: 'panel progress-block' }, [
      el('div', { class: 'progress-head' }, [
        el('h2', {}, [el('span', { class: 'jp', text: script.native }), ` ${script.label}`]),
        el('div', { class: 'stats' }, [
          stat(`${mastered}/${items.length}`, 'dominados'),
          stat(String(seen), 'vistos'),
          stat(accuracy == null ? '—' : `${accuracy}%`, 'aciertos'),
        ]),
      ]),
      el('div', { class: 'bar', role: 'progressbar', 'aria-valuemin': 0, 'aria-valuemax': items.length, 'aria-valuenow': mastered },
        el('div', { style: `width:${(mastered / items.length) * 100}%` })),
      el('div', { class: 'tiles' }, tiles),
    ]);
  });
  $('#progress').replaceChildren(...blocks);
}

function stat(value, label) {
  return el('div', { class: 'stat' }, [el('strong', { text: value }), el('span', { class: 'muted', text: label })]);
}

// ---------- Eventos ----------

function bind() {
  const tabs = [...document.querySelectorAll('[role="tab"]')];
  for (const tab of tabs) {
    tab.addEventListener('click', () => showView(tab.dataset.view));
    tab.addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      const i = tabs.indexOf(tab) + (e.key === 'ArrowRight' ? 1 : -1);
      const target = tabs[(i + tabs.length) % tabs.length];
      target.focus();
      showView(target.dataset.view);
    });
  }

  for (const b of document.querySelectorAll('[data-rows]')) {
    b.addEventListener('click', () => selectRows(b.dataset.rows));
  }
  $('#auto-speak').addEventListener('change', (e) => {
    state.settings.autoSpeak = e.target.checked;
    save();
  });
  $('#start').addEventListener('click', startQuiz);
  $('#stop').addEventListener('click', stopQuiz);
  $('#next').addEventListener('click', nextQuestion);
  $('#prompt').addEventListener('click', () => quiz.current && speech.say(quiz.current.kana));

  $('#typed').addEventListener('submit', (e) => {
    e.preventDefault();
    const text = $('#typed-input').value.trim();
    if (!text || quiz.answered) return;
    answer(isCorrect(text, quiz.current), null, text);
  });

  document.addEventListener('keydown', (e) => {
    if ($('#quiz').hidden) return;
    if (quiz.answered && e.key === 'Enter' && e.target.id !== 'next') {
      e.preventDefault();
      nextQuestion();
      return;
    }
    if (!quiz.answered && /^[1-4]$/.test(e.key) && e.target.tagName !== 'INPUT') {
      document.querySelectorAll('#choices .choice')[Number(e.key) - 1]?.click();
    }
  });

  $('#reset').addEventListener('click', () => {
    if (!confirm('¿Borrar todo tu progreso? No se puede deshacer.')) return;
    state.stats = {};
    save();
    renderProgress();
    toast('Progreso borrado.');
  });
}

speech.init();
bind();
showView(state.settings.view);
