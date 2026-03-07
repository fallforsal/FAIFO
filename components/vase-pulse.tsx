'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export function VasePulse() {
  const [isAnimating, setIsAnimating] = useState(true)

  useEffect(() => {
    setIsAnimating(true)
  }, [])

  return (
    <div className="relative w-64 h-64 mx-auto flex items-center justify-center">
      {/* Pulse ripples */}
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className="absolute inset-0 rounded-full border-2 border-ceramic-blue"
          initial={{ scale: 0.8, opacity: 0.6 }}
          animate={
            isAnimating
              ? {
                  scale: [0.8, 1.2],
                  opacity: [0.6, 0],
                }
              : {}
          }
          transition={{
            duration: 2.5,
            delay: index * 0.4,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      ))}

      {/* Central vase silhouette */}
      <motion.svg
        viewBox="0 0 100 140"
        className="w-32 h-44 relative z-10 drop-shadow-lg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <defs>
          <linearGradient id="vaseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#722620" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#5a1f1a" stopOpacity="1" />
          </linearGradient>
        </defs>

        {/* Vase body - wider bulbous base */}
        <ellipse cx="50" cy="95" rx="28" ry="35" fill="url(#vaseGradient)" />

        {/* Vase neck */}
        <path
          d="M 35 65 Q 35 55 40 50 Q 40 45 50 42 Q 60 45 60 50 Q 65 55 65 65 Z"
          fill="url(#vaseGradient)"
        />

        {/* Vase rim/opening */}
        <ellipse cx="50" cy="40" rx="15" ry="8" fill="#8b3b2e" opacity="0.8" />
        <ellipse cx="50" cy="38" rx="14" ry="6" fill="#a04d35" />
      </motion.svg>

      {/* Subtle glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full bg-ceramic-blue/10 blur-xl"
        animate={
          isAnimating
            ? {
                opacity: [0.3, 0.1, 0.3],
              }
            : {}
        }
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  )
}
