'use client'

import { motion } from 'framer-motion'
import MaterialReveal from '@/components/animations/MaterialReveal'

interface IntroScreenProps {
    onNext: () => void
}

export default function IntroScreen({ onNext }: IntroScreenProps) {
    return (
        <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3, ease: 'easeOut' } }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="screen-container cursor-pointer"
            style={{ willChange: 'opacity, transform' }}
            onClick={onNext}
        >
            {/* Subtle ambient glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div
                    className="w-64 h-64 rounded-full opacity-20"
                    style={{
                        background: 'radial-gradient(circle, rgba(154, 52, 18, 0.3) 0%, transparent 70%)',
                    }}
                />
            </div>

            <MaterialReveal delay={0.2} className="text-center max-w-xs relative z-10">
                <p className="text-xl text-stone-800 leading-relaxed font-serif">
                    Xin Chào.
                </p>
            </MaterialReveal>

            <MaterialReveal delay={0.4} className="text-center max-w-xs mt-6 relative z-10">
                <p className="text-base text-stone-600 leading-relaxed">
                    Bạn vừa chạm vào một mảnh ký ức của Hội An.
                </p>
            </MaterialReveal>

            <MaterialReveal delay={0.6} className="mt-10 relative z-10">
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
