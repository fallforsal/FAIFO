'use client'

import { motion } from 'framer-motion'
import { POTTERY_EASE } from '@/lib/animation-config'

interface SoundWaveProps {
    /** Color of the rings — defaults to terracotta */
    color?: string
    /** Number of concentric rings */
    rings?: number
    /** Size of the container in px */
    size?: number
}

export default function SoundWave({
    color = 'rgba(154, 52, 18, 0.4)',
    rings = 4,
    size = 200,
}: SoundWaveProps) {
    return (
        <div
            className="relative flex items-center justify-center"
            style={{ width: size, height: size }}
        >
            {Array.from({ length: rings }).map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full border"
                    style={{
                        width: size * 0.4,
                        height: size * 0.4,
                        borderColor: color,
                    }}
                    animate={{
                        scale: [0.8, 2.5],
                        opacity: [0.5, 0],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: POTTERY_EASE,
                        delay: i * 0.7,
                    }}
                />
            ))}
            {/* Center dot */}
            <motion.div
                className="absolute rounded-full"
                style={{
                    width: 8,
                    height: 8,
                    backgroundColor: color,
                }}
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.8, 1, 0.8],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />
        </div>
    )
}
