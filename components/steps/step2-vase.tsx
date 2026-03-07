'use client'

import { motion } from 'framer-motion'

interface Step2Props {
  onNext: () => void
  onBack: () => void
}

export default function Step2Vase({ onNext }: Step2Props) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-ceramic-beige px-4">
      <motion.div
        className="flex flex-col items-center justify-center space-y-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Progress dots */}
        <motion.div
          className="flex gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`h-1 rounded-full ${i < 2 ? 'w-6 bg-gray-600' : 'w-6 bg-gray-300'}`}
            />
          ))}
        </motion.div>

        {/* Large brown vase */}
        <motion.div
          className="flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <svg
            viewBox="0 0 300 400"
            className="w-48 h-64 sm:w-56 sm:h-80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Vase body - brown ceramic */}
            <path
              d="M 80 80 Q 70 120 70 180 Q 70 260 100 320 Q 150 360 200 360 Q 250 360 280 320 Q 310 260 310 180 Q 310 120 300 80 Z"
              fill="#722620"
            />
            {/* Vase neck */}
            <rect x="110" y="40" width="80" height="50" fill="#722620" />
            {/* Opening */}
            <ellipse cx="150" cy="40" rx="45" ry="15" fill="#722620" opacity="0.8" />
          </svg>
        </motion.div>

        {/* Tap text in center of vase */}
        <motion.div
          className="relative -mt-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-white text-lg font-light tracking-wide">Tap</p>
        </motion.div>

        {/* Next button */}
        <motion.button
          onClick={onNext}
          className="mt-12 text-black/60 hover:text-black transition-colors"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </motion.button>
      </motion.div>
    </div>
  )
}
