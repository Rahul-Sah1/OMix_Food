/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // ── Light mode palette (bold, high-contrast) ──────────────────
        linen:  '#FFFFFF',          // page background — pure white
        mint:   '#eaf6ee',          // light green section bg (light mode only)
        sand:   { DEFAULT: '#F5F0E8', dark: '#EDE7DB' }, // warm section alt
        forest: {
          DEFAULT: '#14532D',       // deep bold green
          light:   '#166534',
          dark:    '#0F3D22',
          muted:   '#22C55E',       // for glow/accents
        },
        amber: {
          DEFAULT: '#D97706',       // vivid bold amber
          light:   '#F59E0B',
          dark:    '#B45309',
          pale:    '#FEF3C7',
        },
        ink: {
          DEFAULT: '#0C0B09',       // near-black — maximum contrast
          light:   '#2D2B26',
          muted:   '#6B6860',
        },
        // ── Dark mode palette ─────────────────────────────────────────
        night:  {
          DEFAULT: '#0C0B09',       // darkest bg
          card:    '#181612',       // card surface
          section: '#131109',       // alternate section bg
          border:  'rgba(255,255,255,0.07)',
        },
        snow:   '#F4F0E8',          // warm white text in dark mode
      },

      fontFamily: {
        display: ['"Fraunces"', 'Georgia', 'serif'],     // ALL headings
        sans:    ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'], // ALL body
      },

      fontSize: {
        'hero':   ['clamp(3.2rem,7vw,5.5rem)', { lineHeight: '1.02', letterSpacing: '-0.03em' }],
        'h2':     ['clamp(2.2rem,5vw,3.8rem)', { lineHeight: '1.06', letterSpacing: '-0.025em' }],
        'h3':     ['clamp(1.5rem,3vw,2.2rem)', { lineHeight: '1.1',  letterSpacing: '-0.015em' }],
      },

      backgroundImage: {
        'forest-gradient': 'linear-gradient(135deg, #0F3D22 0%, #14532D 100%)',
        'amber-gradient':  'linear-gradient(135deg, #B45309 0%, #D97706 60%, #F59E0B 100%)',
        'dark-gradient':   'linear-gradient(135deg, #0C0B09 0%, #181612 100%)',
        'hero-light':      'linear-gradient(160deg, #FFFFFF 0%, #eaf6ee 100%)',
      },

      boxShadow: {
        'amber':    '0 4px 24px -4px rgba(217,119,6,0.40)',
        'amber-lg': '0 8px 40px -4px rgba(217,119,6,0.50)',
        'forest':   '0 4px 24px -4px rgba(20,83,45,0.35)',
        'forest-lg':'0 8px 40px -4px rgba(20,83,45,0.45)',
        'card':     '0 2px 16px -2px rgba(12,11,9,0.06)',
        'card-lg':  '0 8px 32px -4px rgba(12,11,9,0.12)',
        'card-dark':'0 2px 16px -2px rgba(0,0,0,0.40)',
        'glow-amber':'0 0 40px rgba(217,119,6,0.25)',
      },

      animation: {
        'float':      'float 7s ease-in-out infinite',
        'float-slow': 'float 11s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%':     { transform: 'translateY(-14px)' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
