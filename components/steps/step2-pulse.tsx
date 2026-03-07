'use client'

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { VasePulse } from '../vase-pulse'
import { PageTransition } from '../page-transition'

interface Step2Props {
  onNext: () => void
  onBack: () => void
}

export default function Step2Pulse({ onNext, onBack }: Step2Props) {
  return (
    <PageTransition>
      <div className="w-full max-w-2xl flex flex-col items-center justify-center space-y-8">
        {/* Vase with pulse animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <VasePulse />
        </motion.div>

        {/* Title */}
        <motion.h2
          className="font-serif text-4xl sm:text-5xl font-bold text-ceramic-dark text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          Storytellers of Faifo
        </motion.h2>

        {/* Scroll indicator */}
        <motion.div
          className="flex flex-col items-center gap-2 mt-8"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-sm text-ceramic-dark/60">Cuộn xuống</span>
          <ChevronDown size={24} className="text-ceramic-brown" />
        </motion.div>

        {/* Navigation */}
        <motion.div
          className="flex gap-4 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <button
            onClick={onBack}
            className="px-6 py-2 text-ceramic-dark/60 hover:text-ceramic-dark transition-colors"
          >
            Quay lại
          </button>
          <button
            onClick={onNext}
            className="px-6 py-2 bg-ceramic-brown text-white rounded-lg hover:bg-ceramic-brown/90 transition-colors"
          >
            Tiếp theo
          </button>
        </motion.div>
      </div>
    </PageTransition>
  )
}
