'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface Step6Props {
  onNext: () => void
  onBack: () => void
}

export default function Step6ArtisanZoom({ onNext }: Step6Props) {
  // Auto advance after animation completes
  useEffect(() => {
    const timer = setTimeout(onNext, 4500)
    return () => clearTimeout(timer)
  }, [onNext])

  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-900 overflow-hidden relative">
      {/* Progress dots - light color for dark background */}
      <motion.div
        className="absolute top-8 left-0 right-0 flex justify-center gap-3 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`h-1 rounded-full ${i < 6 ? 'w-6 bg-white/60' : 'w-6 bg-white/20'}`}
          />
        ))}
      </motion.div>

      {/* Artisan photo placeholder with zoom */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        initial={{ scale: 1 }}
        animate={{ scale: 1.5 }}
        transition={{ 
          delay: 0.5,
          duration: 3,
          ease: 'easeInOut'
        }}
      >
        {/* Placeholder for artisan image - using gradient */}
        <div className="w-full h-full bg-gradient-to-b from-gray-700 via-gray-800 to-gray-900 flex items-center justify-center">
          {/* Artisan silhouette placeholder */}
          <motion.div
            className="relative w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(135deg, #1f2937 0%, #111827 100%)`
            }}
          >
            {/* Simple artisan work representation */}
            <div className="absolute inset-0 flex items-center justify-center opacity-40">
              <div className="text-white/30 text-center">
                <p className="font-serif text-2xl">Craftsman at Work</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Dark overlay that builds */}
      <motion.div
        className="absolute inset-0 bg-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 2, duration: 1.5 }}
      />

      {/* Text overlay */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center px-6 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.8 }}
      >
        <div className="text-center text-white">
          <p className="font-sans text-lg">Nhân chứng lịch sử...</p>
        </div>
      </motion.div>
    </div>
  )
}
