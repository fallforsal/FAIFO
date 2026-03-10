'use client'

import { useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import MaterialReveal from '@/components/animations/MaterialReveal'
import SoundWave from '@/components/animations/SoundWave'

interface BrandScreenProps {
    onNext: () => void
}

export default function BrandScreen({ onNext }: BrandScreenProps) {
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    const handleAdvance = useCallback(() => {
        if (timerRef.current) clearTimeout(timerRef.current)
        onNext()
    }, [onNext])

    useEffect(() => {
        timerRef.current = setTimeout(handleAdvance, 5000)
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current)
        }
    }, [handleAdvance])

    return (
        <motion.div
            key="brand"
            initial={{ opacity: 0, filter: 'blur(8px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, filter: 'blur(6px)' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="screen-container cursor-pointer"
            onClick={handleAdvance}
        >
            {/* Soundwave ripple behind logo */}
            <MaterialReveal delay={0.3} className="mb-6">
                <SoundWave size={180} rings={4} />
            </MaterialReveal>

            {/* Brand name */}
            <MaterialReveal delay={0.6} className="text-center mb-2">
                <h1 className="font-serif text-3xl text-stone-800 tracking-tight">
                    Storytellers of Faifo
                </h1>
            </MaterialReveal>

            <MaterialReveal delay={0.9} className="text-center mb-1">
                <p className="text-xs text-stone-600 tracking-[0.25em] uppercase">
                    Hội An · Việt Nam
                </p>
            </MaterialReveal>

            {/* Brand description */}
            <MaterialReveal delay={1.5} className="text-center max-w-xs mt-8">
                <p className="text-sm text-stone-600 leading-relaxed">
                    Cảm ơn bạn đã tin tưởng và chọn mang về một phần của{' '}
                    <span className="text-faifo-terracotta font-serif italic">Faifo</span>
                    {' '}— tên cũ của Hội An, nơi những câu chuyện chưa bao giờ thôi được kể.
                </p>
            </MaterialReveal>

            <MaterialReveal delay={3.0} className="mt-8">
                <motion.p
                    className="text-xs text-stone-600"
                    animate={{ opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                    Nhấn để tiếp tục
                </motion.p>
            </MaterialReveal>
        </motion.div>
    )
}
