/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  prefix: 'tw-',
  // Enable dark mode based on the 'dark' class
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Semantic color names mapped to CSS variables
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
        success: 'var(--color-success)',

        // Base colors for text, background, cards, and borders
        background: 'var(--color-background)',
        card: 'var(--color-card)',
        text: 'var(--color-text)',
        muted: 'var(--color-muted)',
        border: 'var(--color-border)',
      },
    },
  },
  plugins: [],
};
