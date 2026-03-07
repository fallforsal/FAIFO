'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'

interface Step5Props {
  onNext: () => void
  onBack: () => void
}

export default function Step5CupWater({ onNext }: Step5Props) {
  // Auto advance after animation completes
  useEffect(() => {
    const timer = setTimeout(onNext, 5000)
    return () => clearTimeout(timer)
  }, [onNext])

  return (
    <div className="w-full h-full flex items-center justify-center bg-white overflow-hidden relative">
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
            className={`h-1 rounded-full ${i < 5 ? 'w-6 bg-gray-600' : 'w-6 bg-gray-300'}`}
          />
        ))}
      </motion.div>

      {/* Cup container */}
      <div className="relative w-64 h-96 flex items-center justify-center">
        {/* Cup SVG */}
        <svg
          viewBox="0 0 200 300"
          className="w-40 h-56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Cup body */}
          <path
            d="M 50 80 L 40 200 Q 40 240 80 260 L 120 260 Q 160 240 160 200 L 150 80 Z"
            fill="none"
            stroke="#999999"
            strokeWidth="3"
          />
          {/* Cup handle */}
          <path
            d="M 155 120 Q 185 120 185 170 Q 185 210 155 210"
            fill="none"
            stroke="#999999"
            strokeWidth="3"
          />
        </svg>

        {/* Water filling inside cup */}
        <motion.div
          className="absolute bottom-12 left-12 right-12 bg-cyan-400 rounded-b-3xl"
          initial={{ height: '0%' }}
          animate={{ height: '60%' }}
          transition={{ 
            delay: 0.5,
            duration: 2,
            ease: 'easeInOut'
          }}
        />

        {/* Falling water droplet */}
        <motion.div
          className="absolute w-6 h-6 bg-cyan-300 rounded-full"
          initial={{ y: -80, x: 0, opacity: 1 }}
          animate={{ y: 60, opacity: 0 }}
          transition={{ 
            duration: 0.8,
            ease: 'easeIn'
          }}
        />

        {/* Overflowing water that fills screen */}
        <motion.div
          className="absolute inset-0 bg-cyan-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ 
            delay: 2.5,
            duration: 1.5,
            ease: 'easeInOut'
          }}
        />
      </div>

      {/* Text overlay during water fill */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.2, duration: 0.6 }}
      >
        <p className="font-sans text-white/80 text-center px-6">
          Nước đầy và chảy tràn...
        </p>
      </motion.div>
    </div>
  )
}
