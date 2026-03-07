import { LoadingSpinner } from '@/components/shared/loading-spinner'

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <LoadingSpinner className="mb-6" />
      <h1 className="text-3xl font-bold tracking-tight">About</h1>
      <p className="mt-4 text-muted-foreground">Learn more about SUEDE.</p>
    </main>
  )
}
