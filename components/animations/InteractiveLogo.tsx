'use client'

import { motion, useAnimation } from 'framer-motion'
import { useCallback, useRef } from 'react'
import { POTTERY_EASE } from '@/lib/animation-config'

interface InteractiveLogoProps {
    onExpand: () => void
    instruction?: string
}

export default function InteractiveLogo({
    onExpand,
    instruction = 'Nhấn 2 lần vào đây',
}: InteractiveLogoProps) {
    const controls = useAnimation()
    const tapCountRef = useRef(0)
    const tapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    const handleTap = useCallback(() => {
        tapCountRef.current += 1

        if (tapCountRef.current === 1) {
            // First tap — start timer
            tapTimerRef.current = setTimeout(() => {
                tapCountRef.current = 0
            }, 500)

            // Subtle pulse feedback
            controls.start({
                scale: [1, 1.08, 1],
                transition: { duration: 0.4, ease: POTTERY_EASE },
            })
        }

        if (tapCountRef.current === 2) {
            // Double tap! Expand to swallow screen
            if (tapTimerRef.current) clearTimeout(tapTimerRef.current)
            tapCountRef.current = 0

            controls.start({
                scale: 50,
                opacity: 0,
                transition: {
                    duration: 1.2,
                    ease: POTTERY_EASE,
                },
            }).then(() => {
                onExpand()
            })
        }
    }, [controls, onExpand])

    return (
        <div className="screen-container bg-faifo-dark">
            <motion.div
                className="flex flex-col items-center gap-8 cursor-pointer select-none"
                onClick={handleTap}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: POTTERY_EASE }}
            >
                {/* Glowing logo container */}
                <motion.div
                    animate={controls}
                    className="relative flex items-center justify-center"
                >
                    {/* Glow ring */}
                    <motion.div
                        className="absolute w-40 h-40 rounded-full"
                        style={{
                            background: 'radial-gradient(circle, rgba(154, 52, 18, 0.2) 0%, transparent 70%)',
                        }}
                        animate={{
                            scale: [1, 1.15, 1],
                            opacity: [0.5, 0.9, 0.5],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    />

                    {/* Logo text */}
                    <div className="relative z-10 w-28 h-28 rounded-full border border-faifo-terracotta/40 flex items-center justify-center cinematic-glow">
                        <span className="font-serif text-lg text-faifo-terracotta text-center leading-tight">
                            Chuyện<br />trong tay
                        </span>
                    </div>
                </motion.div>

                {/* Instruction */}
                <motion.p
                    className="text-sm text-stone-500 tracking-wide"
                    animate={{
                        opacity: [0.4, 0.8, 0.4],
                    }}
                    transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                >
                    {instruction}
                </motion.p>
            </motion.div>
        </div>
    )
}
