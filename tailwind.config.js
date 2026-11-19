/** @type {import('tailwindcss').Config} */
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        bg: token('bg'),
        surface: token('surface'),
        sunken: token('sunken'),
        ink: token('ink'),
        muted: token('muted'),
        line: token('line'),
        accent: token('accent'),
        'accent-ink': token('accent-ink'),
        'accent-soft': token('accent-soft'),
        good: token('good'),
        'good-soft': token('good-soft'),
        bad: token('bad'),
        'bad-soft': token('bad-soft'),
        warn: token('warn'),
        info: token('info'),
      },
      fontFamily: {
        ui: ['"Nunito Sans"', 'system-ui', '-apple-system', '"Segoe UI"', 'sans-serif'],
        jp: ['"Noto Sans JP"', '"Hiragino Sans"', '"Yu Gothic"', 'sans-serif'],
        kana: ['"Zen Maru Gothic"', '"Hiragino Maru Gothic ProN"', '"Noto Sans JP"', 'sans-serif'],
      },
      borderRadius: { xl2: '1.25rem' },
      boxShadow: {
        soft: '0 1px 2px rgb(var(--shadow) / 0.06), 0 8px 24px rgb(var(--shadow) / 0.07)',
      },
    },
  },
  plugins: [],
};
