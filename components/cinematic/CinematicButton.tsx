'use client'

import { motion } from 'framer-motion'
import { materialReveal, transitions } from '@/lib/animation-config'
import { ReactNode } from 'react'

interface CinematicButtonProps {
    children: ReactNode
    onClick?: () => void
    variant?: 'primary' | 'secondary'
    delay?: number
    className?: string
}

export default function CinematicButton({
    children,
    onClick,
    variant = 'primary',
    delay = 0,
    className = '',
}: CinematicButtonProps) {
    const isPrimary = variant === 'primary'

    return (
        <motion.button
            initial={materialReveal.initial}
            animate={materialReveal.animate}
            transition={{ ...transitions.mediumReveal, delay }}
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.02 }}
            onClick={onClick}
            className={`
        w-full px-6 py-4 rounded-xl font-sans text-sm tracking-wide
        transition-colors duration-500 text-center
        ${isPrimary
                    ? 'bg-faifo-terracotta/20 border border-faifo-terracotta/40 text-stone-200 hover:bg-faifo-terracotta/30'
                    : 'bg-stone-800/50 border border-stone-700/40 text-stone-400 hover:bg-stone-800/80 hover:text-stone-300'
                }
        ${className}
      `}
        >
            {children}
        </motion.button>
    )
}
