'use client'

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}): React.ReactElement {
  return (
    <html lang="en">
      <body
        style={{
          fontFamily: 'system-ui, sans-serif',
          backgroundColor: '#F5F3FA',
          color: '#2D2640',
        }}
      >
        <main
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
          }}
        >
          <div style={{ textAlign: 'center', maxWidth: '400px' }}>
            <p style={{ fontSize: '48px', fontWeight: 800, color: '#e05555' }}>Error</p>
            <h1
              style={{ marginTop: '16px', fontSize: '24px', fontWeight: 700, color: '#130F1E' }}
            >
              Something went wrong
            </h1>
            <p style={{ marginTop: '16px', fontSize: '16px', color: '#9b8fad' }}>
              Please try again or contact support@revnator.com
            </p>
            <button
              onClick={reset}
              style={{
                marginTop: '32px',
                padding: '12px 24px',
                backgroundColor: '#6E33B1',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 600,
              }}
            >
              Try again
            </button>
          </div>
        </main>
      </body>
    </html>
  )
}
