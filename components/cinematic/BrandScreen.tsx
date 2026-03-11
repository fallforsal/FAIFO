'use client'

import { useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import MaterialReveal from '@/components/animations/MaterialReveal'
import SoundWave from '@/components/animations/SoundWave'

interface BrandScreenProps {
    onNext: () => void
}

export default function BrandScreen({ onNext }: BrandScreenProps) {

    return (
        <motion.div
            key="brand"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3, ease: 'easeOut' } }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="screen-container cursor-pointer flex flex-col items-center justify-center px-8"
            style={{ willChange: 'opacity, transform' }}
            onClick={onNext}
        >
            {/* LOGO PLACEHOLDER & SOUNDWAVE */}
            <div className="relative flex items-center justify-center mb-12">
                <MaterialReveal delay={0.2}>
                    <SoundWave size={220} rings={3} />
                </MaterialReveal>

                {/* Khung Logo dự phòng */}
                <MaterialReveal delay={0.4} className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full border border-dashed border-stone-300 bg-stone-100/50 flex items-center justify-center overflow-hidden">
                        <span className="text-[10px] uppercase tracking-widest text-stone-400">Logo</span>
                        {/* Sau này có logo bạn chỉ cần thay <span> bằng tag <img />:
                            <img src="/path-to-logo.png" alt="Logo" className="w-full h-full object-contain" /> 
                        */}
                    </div>
                </MaterialReveal>
            </div>

            {/* Brand name */}
            <MaterialReveal delay={0.5} className="text-center mb-2">
                <h1 className="font-serif text-3xl text-stone-800 tracking-tight">
                    Chuyện Trong Tay
                </h1>
            </MaterialReveal>

            <MaterialReveal delay={0.6} className="text-center mb-8">
                <p className="text-[10px] text-stone-500 tracking-[0.4em] uppercase">
                    Hội An · Việt Nam
                </p>
            </MaterialReveal>

            {/* Brand description */}
            <MaterialReveal delay={0.8} className="text-center max-w-[280px]">
                <p className="text-sm text-stone-600 leading-relaxed font-light">
                    Cảm ơn bạn đã tin tưởng và chọn mang về một phần của{' '}
                    <span className="text-faifo-terracotta font-serif italic">Chuyện Trong Tay</span>
                    {' '}— nơi những câu chuyện về gốm chưa bao giờ thôi được kể qua từng hơi thở của lửa.
                </p>
            </MaterialReveal>

            {/* Interaction Hint */}
            <MaterialReveal delay={1.2} className="mt-16">
                <motion.p
                    className="text-[10px] text-stone-400 uppercase tracking-widest"
                    animate={{ opacity: [0.2, 0.5, 0.2] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                    Chạm để tiếp tục
                </motion.p>
            </MaterialReveal>
        </motion.div>
    )
}