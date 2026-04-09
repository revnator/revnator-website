/** @type {import('tailwindcss').Config} */
const config = {
  theme: {
    extend: {
      colors: {
        rev: {
          primary: 'var(--rev-primary)',
          'primary-dark': 'var(--rev-primary-dark)',
          accent: 'var(--rev-accent)',
          light: 'var(--rev-light)',
          dark: 'var(--rev-dark)',
          background: 'var(--rev-background)',
          white: 'var(--rev-white)',
          muted: 'var(--rev-muted)',
          'body-text': 'var(--rev-body-text)',
          error: 'var(--rev-error)',
          warning: 'var(--rev-warning)',
        },
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'Plus Jakarta Sans', 'sans-serif'],
        body: ['var(--font-body)', 'Inter', 'sans-serif'],
        code: ['var(--font-code)', 'DM Mono', 'monospace'],
      },
      typography: {
        DEFAULT: {
          css: [
            {
              '--tw-prose-body': 'var(--rev-body-text)',
              '--tw-prose-headings': 'var(--rev-dark)',
              h1: {
                fontWeight: 'normal',
                marginBottom: '0.25em',
                fontFamily: 'var(--font-heading)',
              },
              h2: {
                fontFamily: 'var(--font-heading)',
              },
              h3: {
                fontFamily: 'var(--font-heading)',
              },
              h4: {
                fontFamily: 'var(--font-heading)',
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
