/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx,html}'],
  theme: {
    extend: {
      colors: {
        //#region Legacy tokens (kept for backward compat during rework)
        primary: '#050816',
        secondary: '#aaa6c3',
        tertiary: '#151030',
        'black-100': '#100d25',
        'black-200': '#090325',
        'white-100': '#f3f3f3',
        //#endregion

        //#region Theme-aware tokens (reference CSS vars — work in both themes)
        theme: {
          bg:      'var(--color-bg)',
          surface: 'var(--color-surface)',
          surface2: 'var(--color-surface-2)',
          border:  'var(--color-border)',
          text:    'var(--color-text)',
          muted:   'var(--color-text-muted)',
          accent:  'var(--color-accent)',
          glow:    'var(--color-glow)',
        },
        //#endregion
      },
      boxShadow: {
        card: '0px 35px 120px -15px #211e35',
        'glow-accent': '0 0 24px rgba(var(--color-glow-rgb), 0.45)',
      },
      screens: {
        xs: '450px',
      },
    },
  },
  plugins: [],
};
