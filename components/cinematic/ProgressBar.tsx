'use client'

import { motion } from 'framer-motion'
import { POTTERY_EASE } from '@/lib/animation-config'

interface ProgressBarProps {
    current: number
    total: number
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
    const progress = (current / total) * 100

    return (
        <div className="fixed top-0 left-0 right-0 z-40 h-[2px] bg-stone-800/50">
            <motion.div
                className="h-full bg-gradient-to-r from-faifo-terracotta/60 to-faifo-terracotta"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.8, ease: POTTERY_EASE }}
            />
        </div>
    )
}
