'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MaterialReveal from '@/components/animations/MaterialReveal'
import SoundWave from '@/components/animations/SoundWave'
import FloatingImage from '@/components/animations/FloatingImage'
import InteractiveLogo from '@/components/animations/InteractiveLogo'
import ProgressBar from '@/components/cinematic/ProgressBar'
import { POTTERY_EASE } from '@/lib/animation-config'

const TOTAL_SCREENS = 4

// Placeholder diary data
const DIARY_DATA = {
    date: '08 tháng 3, 2026',
    content: 'Hôm nay mình đến Hội An lần đầu. Phố cổ buổi sáng yên bình lạ thường. Mình ghé qua một xưởng gốm nhỏ, nơi một bác nghệ nhân đã nặn gốm hơn 40 năm. Bác bảo mỗi chiếc bát là một lời chào. Mình mang về chiếc gốm này, như mang về một phần ký ức.',
}

const pageVariants = {
    initial: { opacity: 0, filter: 'blur(8px)' },
    animate: { opacity: 1, filter: 'blur(0px)' },
    exit: { opacity: 0, filter: 'blur(6px)' },
}

const pageTransition = {
    duration: 0.9,
    ease: POTTERY_EASE,
}

interface FlowB2Props {
    onBack: () => void
}

export default function FlowB2({ onBack }: FlowB2Props) {
    const [screen, setScreen] = useState(1)

    const next = () => {
        if (screen < TOTAL_SCREENS) setScreen((s) => s + 1)
    }

    return (
        <div className="relative">
            <ProgressBar current={screen} total={TOTAL_SCREENS} />

            <AnimatePresence mode="wait">
                {/* Screen 1: Welcome Back */}
                {screen === 1 && (
                    <motion.div
                        key="b2-1"
                        variants={pageVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={pageTransition}
                        className="screen-container"
                        onClick={next}
                    >
                        <MaterialReveal delay={0.3} className="mb-6">
                            <SoundWave size={140} rings={3} />
                        </MaterialReveal>

                        <MaterialReveal delay={0.8} className="text-center max-w-xs">
                            <p className="text-base text-stone-800 leading-relaxed">
                                Chào mừng bạn quay trở lại.
                            </p>
                        </MaterialReveal>

                        <MaterialReveal delay={1.4} className="text-center max-w-xs mt-4">
                            <p className="text-sm text-stone-600 leading-relaxed">
                                Ký ức của bạn tại{' '}
                                <span className="text-faifo-terracotta font-serif italic">Faifo</span>
                                {' '}vẫn luôn được lưu giữ cẩn thận ở đây.
                            </p>
                        </MaterialReveal>

                        <MaterialReveal delay={2.0} className="text-center max-w-xs mt-6">
                            <p className="text-xs text-stone-600 leading-relaxed">
                                Nhấn vào logo 2 lần để mở lại trang nhật ký của mình.
                            </p>
                        </MaterialReveal>

                        <MaterialReveal delay={2.5} className="mt-6">
                            <p className="text-xs text-stone-600 animate-pulse">Nhấn để tiếp tục</p>
                        </MaterialReveal>
                    </motion.div>
                )}

                {/* Screen 2: Interactive Logo (double-tap) */}
                {screen === 2 && (
                    <motion.div
                        key="b2-2"
                        variants={pageVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={pageTransition}
                    >
                        <InteractiveLogo
                            onExpand={next}
                            instruction="Nhấn 2 lần để mở nhật ký"
                        />
                    </motion.div>
                )}

                {/* Screen 3: The Artifact - floating product */}
                {screen === 3 && (
                    <motion.div
                        key="b2-3"
                        variants={pageVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={pageTransition}
                        className="screen-container"
                        onClick={next}
                    >
                        <MaterialReveal delay={0.3} className="mb-4">
                            <FloatingImage
                                src="/Gom.png"
                                alt="Chiếc gốm của bạn"
                                width={200}
                                height={260}
                                glowing
                            />
                        </MaterialReveal>

                        <MaterialReveal delay={1.0} className="text-center max-w-xs mt-4">
                            <h2 className="font-serif text-lg text-stone-800 mb-3">
                                Mảnh ghép thời gian của riêng bạn
                            </h2>
                            <p className="text-sm text-stone-600">
                                Duy nhất và không thể sao chép.
                            </p>
                        </MaterialReveal>
                    </motion.div>
                )}

                {/* Screen 4: Diary Entry */}
                {screen === 4 && (
                    <motion.div
                        key="b2-4"
                        variants={pageVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={pageTransition}
                        className="screen-container"
                    >
                        <MaterialReveal delay={0.5} className="text-center">
                            <span className="text-3xl">📖</span>
                        </MaterialReveal>

                        <MaterialReveal delay={1.0} className="text-center max-w-xs mt-6">
                            <p className="text-sm text-stone-600 mb-4">
                                Nhật ký ngày {DIARY_DATA.date}
                            </p>
                        </MaterialReveal>

                        {/* Typewriter-like slow reveal for diary content */}
                        <MaterialReveal delay={1.8} duration={2.0} className="max-w-xs">
                            <motion.p
                                className="text-sm text-stone-800 leading-loose text-center italic"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 3, ease: POTTERY_EASE }}
                            >
                                &ldquo;{DIARY_DATA.content}&rdquo;
                            </motion.p>
                        </MaterialReveal>

                        {/* Small logo */}
                        <MaterialReveal delay={3.5} className="mt-12">
                            <div className="w-12 h-12 rounded-full border border-stone-300 flex items-center justify-center">
                                <span className="font-serif text-xs text-stone-600">CTT</span>
                            </div>
                        </MaterialReveal>

                        <MaterialReveal delay={4.0} className="mt-6">
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
