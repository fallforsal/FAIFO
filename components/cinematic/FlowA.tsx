'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MaterialReveal from '@/components/animations/MaterialReveal'
import SoundWave from '@/components/animations/SoundWave'
import ProductCarousel from '@/components/cinematic/ProductCarousel'
import CinematicButton from '@/components/cinematic/CinematicButton'
import ProgressBar from '@/components/cinematic/ProgressBar'
import { POTTERY_EASE } from '@/lib/animation-config'

const TOTAL_SCREENS = 6

const pageVariants = {
    initial: { opacity: 0, filter: 'blur(8px)' },
    animate: { opacity: 1, filter: 'blur(0px)' },
    exit: { opacity: 0, filter: 'blur(6px)' },
}

const pageTransition = {
    duration: 0.9,
    ease: POTTERY_EASE,
}

interface FlowAProps {
    onComplete: (choice: 'diary' | 'gift') => void
    onBack: () => void
}

export default function FlowA({ onComplete, onBack }: FlowAProps) {
    const [screen, setScreen] = useState(1)

    const next = useCallback(() => {
        if (screen < TOTAL_SCREENS) setScreen((s) => s + 1)
    }, [screen])

    // Auto-advance for cinematic screens (1, 2, 4)
    useEffect(() => {
        if (screen === 1) {
            const t = setTimeout(next, 3500)
            return () => clearTimeout(t)
        }
    }, [screen, next])

    return (
        <div className="relative">
            <ProgressBar current={screen} total={TOTAL_SCREENS} />

            <AnimatePresence mode="wait">
                {screen === 1 && (
                    <motion.div
                        key="a1"
                        variants={pageVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={pageTransition}
                        className="screen-container"
                        onClick={next}
                    >
                        <MaterialReveal delay={0.5} className="text-center max-w-xs">
                            <p className="text-lg text-stone-800 leading-relaxed font-serif">
                                Xin Chào.
                            </p>
                        </MaterialReveal>
                        <MaterialReveal delay={1.5} className="text-center max-w-xs mt-4">
                            <p className="text-base text-stone-600 leading-relaxed">
                                Bạn vừa chạm vào một mảnh ký ức của Hội An.
                            </p>
                        </MaterialReveal>
                        <MaterialReveal delay={2.8} className="mt-8">
                            <p className="text-xs text-stone-600 animate-pulse">Nhấn để tiếp tục</p>
                        </MaterialReveal>
                    </motion.div>
                )}

                {screen === 2 && (
                    <motion.div
                        key="a2"
                        variants={pageVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={pageTransition}
                        className="screen-container"
                        onClick={next}
                    >
                        <MaterialReveal delay={0.3} className="text-center mb-8">
                            <h1 className="font-serif text-3xl text-stone-800 tracking-tight">
                                Chuyện trong tay
                            </h1>
                        </MaterialReveal>

                        <MaterialReveal delay={0.8}>
                            <SoundWave size={180} rings={4} />
                        </MaterialReveal>

                        <MaterialReveal delay={1.4} className="text-center max-w-xs mt-8">
                            <p className="text-sm text-stone-600 leading-relaxed">
                                Cảm ơn bạn đã tin tưởng và chọn mang về một phần của{' '}
                                <span className="text-faifo-terracotta font-serif italic">Faifo</span>
                                {' '} — tên cũ của Hội An...
                            </p>
                        </MaterialReveal>
                    </motion.div>
                )}

                {screen === 3 && (
                    <motion.div
                        key="a3"
                        variants={pageVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={pageTransition}
                        className="screen-container"
                    >
                        <MaterialReveal delay={0.3} className="text-center mb-6">
                            <h2 className="font-serif text-xl text-stone-800">
                                Bạn đang cầm trên tay —
                            </h2>
                        </MaterialReveal>

                        <MaterialReveal delay={0.7} className="w-full">
                            <ProductCarousel />
                        </MaterialReveal>

                        <MaterialReveal delay={1.2} className="text-center max-w-xs mt-6">
                            <p className="text-sm text-stone-600 italic leading-relaxed font-serif">
                                &ldquo;Chiếc gốm này không chỉ là vật dụng.
                                <br />
                                Đó là một người kể chuyện.&rdquo;
                            </p>
                        </MaterialReveal>

                        <MaterialReveal delay={1.6} className="mt-6">
                            <button
                                onClick={next}
                                className="text-xs text-faifo-terracotta/60 hover:text-faifo-terracotta transition-colors duration-500"
                            >
                                Tiếp tục →
                            </button>
                        </MaterialReveal>
                    </motion.div>
                )}

                {screen === 4 && (
                    <motion.div
                        key="a4"
                        variants={pageVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={pageTransition}
                        className="screen-container"
                        onClick={next}
                    >
                        {/* Artisan hands placeholder — cinematic dark panel */}
                        <MaterialReveal delay={0.2} className="w-full mb-8">
                            <div className="w-full h-48 rounded-2xl bg-gradient-to-b from-stone-200/60 to-stone-300/50 flex items-center justify-center border border-stone-300/50 overflow-hidden">
                                <motion.div
                                    className="text-center"
                                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                                >
                                    <p className="text-4xl mb-2">🤲</p>
                                    <p className="text-xs text-stone-600">Đôi bàn tay nghệ nhân</p>
                                </motion.div>
                            </div>
                        </MaterialReveal>

                        <MaterialReveal delay={0.6} className="text-center max-w-xs">
                            <p className="text-base text-stone-800 leading-loose">
                                Ra đời từ đất sét...
                            </p>
                        </MaterialReveal>

                        <MaterialReveal delay={1.2} className="text-center max-w-xs mt-4">
                            <p className="text-sm text-stone-600 leading-relaxed">
                                Mỗi đường nét là quyết định của đôi bàn tay.
                                Không có chiếc nào giống chiếc nào — giống như không có ai giống ai.
                            </p>
                        </MaterialReveal>
                    </motion.div>
                )}

                {screen === 5 && (
                    <motion.div
                        key="a5"
                        variants={pageVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={pageTransition}
                        className="screen-container"
                        onClick={next}
                    >
                        <MaterialReveal delay={0.3} className="text-center mb-6">
                            <h2 className="font-serif text-xl text-stone-800">
                                🎬 Từ đất đến tay bạn
                            </h2>
                        </MaterialReveal>

                        {/* Video placeholder */}
                        <MaterialReveal delay={0.7} className="w-full">
                            <div className="w-full aspect-[9/16] max-h-[50vh] rounded-2xl bg-gradient-to-b from-stone-200/60 to-stone-300/50 border border-stone-300/50 flex flex-col items-center justify-center overflow-hidden relative">
                                {/* Play button */}
                                <motion.div
                                    className="w-16 h-16 rounded-full bg-faifo-terracotta/20 border border-faifo-terracotta/30 flex items-center justify-center"
                                    animate={{
                                        scale: [1, 1.1, 1],
                                        borderColor: ['rgba(154,52,18,0.3)', 'rgba(154,52,18,0.6)', 'rgba(154,52,18,0.3)'],
                                    }}
                                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                                >
                                    <span className="text-faifo-terracotta text-xl ml-1">▶</span>
                                </motion.div>
                                <p className="text-xs text-stone-600 mt-4">Video sẽ được cập nhật</p>
                            </div>
                        </MaterialReveal>

                        <MaterialReveal delay={1.2} className="text-center max-w-xs mt-6">
                            <p className="text-sm text-stone-600 leading-relaxed italic font-serif">
                                Mỗi chiếc gốm là một câu chuyện đang chờ được kể tiếp — bởi chính bạn.
                            </p>
                        </MaterialReveal>
                    </motion.div>
                )}

                {screen === 6 && (
                    <motion.div
                        key="a6"
                        variants={pageVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={pageTransition}
                        className="screen-container"
                    >
                        <MaterialReveal delay={0.3} className="text-center mb-10">
                            <h2 className="font-serif text-xl text-stone-800 mb-3">
                                Bạn muốn làm gì tiếp theo?
                            </h2>
                            <p className="text-sm text-stone-600">
                                Chọn một hành trình cho chiếc gốm của bạn
                            </p>
                        </MaterialReveal>

                        <div className="w-full space-y-4 max-w-xs">
                            <CinematicButton
                                variant="primary"
                                delay={0.6}
                                onClick={() => onComplete('diary')}
                            >
                                📖 Viết nhật ký cho bản thân
                            </CinematicButton>

                            <CinematicButton
                                variant="secondary"
                                delay={0.8}
                                onClick={() => onComplete('gift')}
                            >
                                💌 Gửi lời chúc cho một người bạn
                            </CinematicButton>
                        </div>

                        <MaterialReveal delay={1.2} className="mt-10">
                            <button
                                onClick={onBack}
                                className="text-xs text-stone-600 hover:text-stone-400 transition-colors duration-500"
                            >
                                ← Quay về menu
                            </button>
                        </MaterialReveal>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
