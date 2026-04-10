export default function Loading(): React.ReactElement {
  return (
    <main className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-light border-t-primary" />
        <p className="font-body text-sm text-muted">Loading...</p>
      </div>
    </main>
  )
}
