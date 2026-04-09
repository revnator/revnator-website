/** @type {import('tailwindcss').Config} */
const config = {
  theme: {
    extend: {
      /* Colors defined in globals.css @theme inline block (Tailwind v4 native) */
      fontFamily: {
        heading: ['var(--font-jakarta)', 'system-ui', 'sans-serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-dm-mono)', 'monospace'],
      },
      fontSize: {
        'hero': ['52px', { lineHeight: '1.12', letterSpacing: '-0.02em' }],
        'h1': ['40px', { lineHeight: '48px', letterSpacing: '-0.02em' }],
        'h2': ['32px', { lineHeight: '40px', letterSpacing: '-0.01em' }],
        'h3': ['24px', { lineHeight: '32px' }],
        'h4': ['20px', { lineHeight: '28px' }],
      },
      maxWidth: {
        'container': '1280px',
        'prose-narrow': '720px',
        'prose-wide': '860px',
      },
      typography: {
        DEFAULT: {
          css: [
            {
              '--tw-prose-body': '#2D2640',
              '--tw-prose-headings': '#130F1E',
              h1: {
                fontWeight: 'normal',
                marginBottom: '0.25em',
                fontFamily: 'var(--font-jakarta), system-ui, sans-serif',
              },
              h2: {
                fontFamily: 'var(--font-jakarta), system-ui, sans-serif',
              },
              h3: {
                fontFamily: 'var(--font-jakarta), system-ui, sans-serif',
              },
              h4: {
                fontFamily: 'var(--font-jakarta), system-ui, sans-serif',
              },
            },
          ],
        },
        base: {
          css: [
            {
              h1: {
                fontSize: '2.5rem',
              },
              h2: {
                fontSize: '1.25rem',
                fontWeight: 600,
              },
            },
          ],
        },
        md: {
          css: [
            {
              h1: {
                fontSize: '3.5rem',
              },
              h2: {
                fontSize: '1.5rem',
              },
            },
          ],
        },
      },
    },
  },
}

export default config
