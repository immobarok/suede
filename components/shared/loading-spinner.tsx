'use client'

import { cn } from '@/lib/utils'
import { motion, type Variants } from 'framer-motion'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'primary' | 'secondary' | 'white'
  className?: string
  label?: string
  fullscreen?: boolean
}

const sizeMap = {
  sm: { box: 20, stroke: 2.5, radius: 8 },
  md: { box: 40, stroke: 3, radius: 16 },
  lg: { box: 60, stroke: 4, radius: 24 },
  xl: { box: 80, stroke: 5, radius: 32 },
}

const variantColors = {
  primary: 'stroke-primary',
  secondary: 'stroke-muted-foreground',
  white: 'stroke-white',
}

export function LoadingSpinner({
  size = 'md',
  variant = 'primary',
  className,
  label,
  fullscreen = false
}: LoadingSpinnerProps) {
  const config = sizeMap[size]

  const spinner = (
    <div className={cn("relative flex items-center justify-center", className)}>
      <motion.div
        animate={{ 
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.6, 0.3] 
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className={cn(
          "absolute rounded-full blur-2xl opacity-30 bg-current",
          size === 'sm' ? 'h-4 w-4' : size === 'md' ? 'h-8 w-8' : size === 'lg' ? 'h-12 w-12' : 'h-16 w-16'
        )}
      />
      <svg
        width={config.box}
        height={config.box}
        viewBox={`0 0 ${config.box} ${config.box}`}
        className="transform-gpu"
      >
        <circle
          cx={config.box / 2}
          cy={config.box / 2}
          r={config.radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={config.stroke}
          className="opacity-10"
        />
        
        <motion.circle
          cx={config.box / 2}
          cy={config.box / 2}
          r={config.radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={config.stroke}
          strokeLinecap="round"
          className={cn("transition-colors duration-500", variantColors[variant])}
          initial={{ pathLength: 0, rotate: 0 }}
          animate={{ 
            pathLength: [0.1, 0.4, 0.1],
            rotate: 360 
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.circle
          cx={config.box / 2}
          cy={config.box / 2}
          r={config.radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={config.stroke + 1}
          strokeDasharray={`1 ${config.radius * 6}`}
          strokeLinecap="round"
          className={cn("opacity-80", variantColors[variant])}
          animate={{ rotate: 360 }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </svg>
    </div>
  )

  if (fullscreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/90">
        <motion.div
          className="flex flex-col items-center gap-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          {spinner}
          {label && (
            <motion.p
              className="text-sm font-bold tracking-[0.2em] uppercase text-foreground/60"
              animate={{ opacity: [0.4, 1, 0.4], letterSpacing: ["0.2em", "0.25em", "0.2em"] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              {label}
            </motion.p>
          )}
        </motion.div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-3">
      {spinner}
      {label && <span className="text-xs font-semibold text-muted-foreground">{label}</span>}
    </div>
  )
}

export function PageLoader() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background overflow-hidden">
      <div className="relative scale-150">
        <LoadingSpinner size="xl" variant="primary" />
        
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.span 
            className="text-lg font-black text-foreground tracking-tighter"
            animate={{ 
              scale: [1, 1.1, 1],
              filter: ["blur(0px)", "blur(1px)", "blur(0px)"]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            S
          </motion.span>
        </motion.div>
      </div>

      <motion.div
        className="mt-12 overflow-hidden h-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          animate={{ y: [0, -24, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center"
        >
          <span className="text-sm font-bold tracking-widest text-primary/80">LOADING SUEDE</span>
          <span className="text-sm font-bold tracking-widest text-slate-400">PLEASE WAIT</span>
        </motion.div>
      </motion.div>
    </div>
  )
}

export function ButtonLoader({ className }: { className?: string }) {
  return <LoadingSpinner size="sm" variant="white" className={cn("mr-2", className)} />
}

export function SkeletonLoader({ className, children }: { className?: string; children?: React.ReactNode }) {
  return (
    <div className={cn('relative overflow-hidden rounded', className)}>
      <motion.div
        className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent"
        animate={{ x: ['-100%', '100%'] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
      />
      {children}
    </div>
  )
}