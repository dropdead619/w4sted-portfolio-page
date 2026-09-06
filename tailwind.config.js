/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './composables/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'rgb(var(--bg) / <alpha-value>)',
        'bg-elev': 'rgb(var(--bg-elev) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        line: 'rgb(var(--line) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        'accent-2': 'rgb(var(--accent-2) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['Inter Tight', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        serif: ['Instrument Serif', 'ui-serif', 'Georgia', 'serif'],
      },
      fontSize: {
        // Fluid display sizes so the editorial headlines scale with the viewport.
        'display-sm': ['clamp(2.25rem, 6vw, 3.75rem)', { lineHeight: '0.92' }],
        'display-md': ['clamp(3rem, 9vw, 6rem)', { lineHeight: '0.9' }],
        'display-lg': ['clamp(3rem, 10.5vw, 9.5rem)', { lineHeight: '0.86' }],
      },
      transitionTimingFunction: {
        expo: 'cubic-bezier(0.16, 1, 0.3, 1)',
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      zIndex: {
        cursor: '9999',
        preloader: '9998',
        header: '100',
      },
    },
  },
  plugins: [],
}
