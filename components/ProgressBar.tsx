'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/cn'

interface ProgressBarProps {
  currentStep: number
  totalSteps?: number
  className?: string
}

export function ProgressBar({
  currentStep,
  totalSteps = 6,
  className,
}: ProgressBarProps) {
  const segments = Array.from({ length: totalSteps }, (_, i) => i + 1)
  const progress = (currentStep / totalSteps) * 100

  return (
    <div className={cn('w-full bg-ceramic-white', className)}>
      {/* Container for segment indicators */}
      <div className="flex gap-2 px-6 py-4 justify-between items-center">
        {segments.map((step) => (
          <div
            key={step}
            className={cn(
              'flex-1 h-1 rounded-full transition-colors duration-300',
              step <= currentStep
                ? 'bg-ceramic-brown'
                : 'bg-ceramic-gray'
            )}
            aria-label={`Step ${step}`}
            role="progressbar"
            aria-valuenow={currentStep}
            aria-valuemin={1}
            aria-valuemax={totalSteps}
          />
        ))}
      </div>

      {/* Animated progress line underneath */}
      <motion.div
        className="h-0.5 bg-gradient-to-r from-ceramic-brown to-ceramic-blue"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
    </div>
  )
}
