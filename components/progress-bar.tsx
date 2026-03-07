'use client'

import { motion } from 'framer-motion'

interface ProgressBarProps {
  currentStep: number
  totalSteps: number
}

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  return (
    <div className="w-full bg-ceramic-light px-6 py-4 sm:px-8">
      <div className="flex gap-2 sm:gap-3">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <motion.div
            key={index}
            className="flex-1 h-1 bg-ceramic-gray rounded-full overflow-hidden"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="h-full bg-ceramic-brown"
              initial={{ width: 0 }}
              animate={{ width: index < currentStep ? '100%' : index === currentStep - 1 ? '100%' : '0%' }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
