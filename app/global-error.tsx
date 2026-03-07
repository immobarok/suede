'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Global error:', error)
  }, [error])

  return (
    <html>
      <body>
        <div className="min-h-screen bg-suede-50 flex items-center justify-center px-4">
          <div className="max-w-md w-full text-center">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-10 h-10 text-red-500" />
            </div>
            
            <h1 className="text-2xl font-bold text-suede-900 mb-2">
              Something went wrong
            </h1>
            
            <p className="text-suede-600 mb-6">
              We apologize for the inconvenience. Our team has been notified.
            </p>

            {error.digest && (
              <p className="text-xs text-suede-400 mb-6 font-mono">
                Error ID: {error.digest}
              </p>
            )}

            <div className="flex flex-col gap-3">
              <Button onClick={reset} className="gap-2">
                <RefreshCw className="w-4 h-4" />
                Try Again
              </Button>
              
              <Button asChild variant="outline">
                <Link href="/" className="gap-2">
                  <Home className="w-4 h-4" />
                  Go Home
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}