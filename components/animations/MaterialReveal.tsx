'use client'

import { motion } from 'framer-motion'
import { materialReveal, transitions } from '@/lib/animation-config'
import { ReactNode } from 'react'

interface MaterialRevealProps {
    children: ReactNode
    delay?: number
    duration?: number
    className?: string
}

export default function MaterialReveal({
    children,
    delay = 0,
    duration = 1.2,
    className = '',
}: MaterialRevealProps) {
    return (
        <motion.div
            initial={materialReveal.initial}
            animate={materialReveal.animate}
            exit={materialReveal.exit}
            transition={{
                ...transitions.slowReveal,
                duration,
                delay,
            }}
            className={className}
        >
            {children}
        </motion.div>
    )
}
