'use client'

import { cn } from "@/lib/utils"

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'primary' | 'secondary' | 'white'
  className?: string
  label?: string
  fullscreen?: boolean
}

const sizeClasses = {
  sm: 'w-4 h-4 border-2',
  md: 'w-8 h-8 border-2',
  lg: 'w-12 h-12 border-3',
  xl: 'w-16 h-16 border-4'
}

const variantClasses = {
  primary: 'border-suede-900/20 border-t-suede-900',
  secondary: 'border-suede-200 border-t-suede-600',
  white: 'border-white/30 border-t-white'
}

export function LoadingSpinner({
  size = 'md',
  variant = 'primary',
  className,
  label,
  fullscreen = false
}: LoadingSpinnerProps) {
  const spinner = (
    <div
      className={cn(
        'animate-spin rounded-full',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      role="status"
      aria-label={label || 'Loading'}
    />
  )

  if (fullscreen) {
    return (
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm"
        role="alert"
        aria-busy="true"
      >
        <div className="flex flex-col items-center gap-4">
          {spinner}
          {label && (
            <p className="text-sm font-medium text-suede-900 animate-pulse">
              {label}
            </p>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-3" role="status">
      {spinner}
      {label && (
        <span className="text-sm text-suede-600 font-medium">
          {label}
        </span>
      )}
    </div>
  )
}

// Skeleton wrapper for content loading
export function SkeletonLoader({
  className,
  children
}: {
  className?: string
  children?: React.ReactNode
}) {
  return (
    <div className={cn('animate-pulse bg-suede-100 rounded', className)}>
      {children}
    </div>
  )
}

// Page loader with SUEDE branding
export function PageLoader() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-suede-50">
      <div className="relative">
        <LoadingSpinner size="xl" variant="primary" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-bold text-suede-900">S</span>
        </div>
      </div>
      <p className="mt-6 text-suede-600 font-medium tracking-wide">
        Loading SUEDE...
      </p>
    </div>
  )
}

// Button loader (inline)
export function ButtonLoader({ className }: { className?: string }) {
  return (
    <LoadingSpinner 
      size="sm" 
      variant="white" 
      className={cn('mr-2', className)} 
    />
  )
}