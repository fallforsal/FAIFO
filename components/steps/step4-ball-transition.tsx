'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'

interface Step4Props {
  onNext: () => void
  onBack: () => void
}

export default function Step4BallTransition({ onNext }: Step4Props) {
  // Auto advance after animation completes
  useEffect(() => {
    const timer = setTimeout(onNext, 3000)
    return () => clearTimeout(timer)
  }, [onNext])

  return (
    <div className="w-full h-full flex items-center justify-center bg-ceramic-beige overflow-hidden relative">
      {/* Progress dots */}
      <motion.div
        className="absolute top-8 left-0 right-0 flex justify-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`h-1 rounded-full ${i < 4 ? 'w-6 bg-gray-600' : 'w-6 bg-gray-300'}`}
          />
        ))}
      </motion.div>

      {/* Small vase that will be covered */}
      <motion.div
        className="absolute"
        initial={{ scale: 1, opacity: 1 }}
        animate={{ scale: 0.6, opacity: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <svg
          viewBox="0 0 300 400"
          className="w-32 h-48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 80 80 Q 70 120 70 180 Q 70 260 100 320 Q 150 360 200 360 Q 250 360 280 320 Q 310 260 310 180 Q 310 120 300 80 Z"
            fill="#722620"
            opacity="0.5"
          />
        </svg>
      </motion.div>

      {/* Gray ball rolling in from right */}
      <motion.div
        className="absolute w-20 h-20 bg-gray-400 rounded-full shadow-lg"
        initial={{ x: 400, y: 0, opacity: 0 }}
        animate={{ 
          x: 0, 
          y: 0,
          opacity: 1,
          scale: 1
        }}
        transition={{ 
          duration: 0.8,
          ease: 'easeInOut'
        }}
      />

      {/* Expanding circle that covers screen */}
      <motion.div
        className="absolute w-20 h-20 bg-gray-400 rounded-full"
        initial={{ scale: 0, x: 0, y: 0 }}
        animate={{ 
          scale: 80,
          x: 0,
          y: 0
        }}
        transition={{ 
          delay: 1,
          duration: 1.2,
          ease: 'easeInOut'
        }}
      />

      {/* Content that fades in during expansion */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center text-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <div className="text-white">
          <p className="font-sans text-lg">Tiếp tục khám phá...</p>
        </div>
      </motion.div>
    </div>
  )
}
