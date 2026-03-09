'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MaterialReveal from '@/components/animations/MaterialReveal'
import SoundWave from '@/components/animations/SoundWave'
import InteractiveLogo from '@/components/animations/InteractiveLogo'
import ProgressBar from '@/components/cinematic/ProgressBar'
import { POTTERY_EASE } from '@/lib/animation-config'

const TOTAL_SCREENS = 4

// Placeholder data (in production, comes from NFC/Supabase)
const GIFT_DATA = {
    senderName: 'Minh',
    receiverName: 'Hà',
    message: 'Gửi bạn chiếc gốm này như một lời nhắn nhỏ — rằng dù ở đâu, luôn có ai đó nhớ đến bạn. Hội An rất đẹp, và mình ước bạn cũng được thấy.',
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

interface FlowB1Props {
    onBack: () => void
}

export default function FlowB1({ onBack }: FlowB1Props) {
    const [screen, setScreen] = useState(1)

    const next = () => {
        if (screen < TOTAL_SCREENS) setScreen((s) => s + 1)
    }

    return (
        <div className="relative">
            <ProgressBar current={screen} total={TOTAL_SCREENS} />

            <AnimatePresence mode="wait">
                {/* Screen 1: Welcome with soundwave */}
                {screen === 1 && (
                    <motion.div
                        key="b1-1"
                        variants={pageVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={pageTransition}
                        className="screen-container bg-faifo-dark"
                        onClick={next}
                    >
                        <MaterialReveal delay={0.3} className="mb-6">
                            <SoundWave size={140} rings={3} />
                        </MaterialReveal>

                        <MaterialReveal delay={0.8} className="text-center max-w-xs">
                            <p className="text-base text-stone-300 leading-relaxed">
                                Xin chào, Mình là{' '}
                                <span className="font-serif text-stone-200 italic">Chuyện trong tay</span>.
                            </p>
                        </MaterialReveal>

                        <MaterialReveal delay={1.4} className="text-center max-w-xs mt-4">
                            <p className="text-sm text-stone-400 leading-relaxed">
                                <span className="text-faifo-terracotta font-semibold">{GIFT_DATA.senderName}</span>
                                {' '}vừa nhờ chúng mình gửi đến bạn một món quà đặc biệt từ Hội An.
                            </p>
                        </MaterialReveal>

                        <MaterialReveal delay={2.0} className="text-center max-w-xs mt-6">
                            <p className="text-xs text-stone-500 leading-relaxed">
                                Hãy nhấn vào logo bên dưới 2 lần để xem món quà đó là gì nhé.
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
                        key="b1-2"
                        variants={pageVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={pageTransition}
                    >
                        <InteractiveLogo onExpand={next} />
                    </motion.div>
                )}

                {/* Screen 3: Gift Backstory */}
                {screen === 3 && (
                    <motion.div
                        key="b1-3"
                        variants={pageVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={pageTransition}
                        className="screen-container bg-faifo-stone"
                        onClick={next}
                    >
                        <MaterialReveal delay={0.5} className="text-center max-w-xs">
                            <h2 className="font-serif text-xl text-stone-200 mb-6">
                                Câu chuyện phía sau món quà này
                            </h2>
                        </MaterialReveal>

                        <MaterialReveal delay={1.0} className="text-center max-w-xs">
                            <p className="text-sm text-stone-400 leading-loose">
                                Ngày xưa, nơi đây còn có tên{' '}
                                <span className="text-faifo-terracotta font-serif italic">Faifo</span>
                                {' '} — một thương cảng sầm uất, nơi gốm sứ từ khắp nơi đổ về.
                            </p>
                        </MaterialReveal>

                        <MaterialReveal delay={1.6} className="text-center max-w-xs mt-4">
                            <p className="text-sm text-stone-400 leading-loose">
                                Mỗi chiếc gốm ở đây đều được nặn bằng tay, bởi những nghệ nhân đã gắn bó với đất sét qua nhiều thế hệ.
                                Không ai vội vàng. Không ai giống ai.
                            </p>
                        </MaterialReveal>

                        <MaterialReveal delay={2.2} className="text-center max-w-xs mt-6">
                            <p className="text-base text-stone-300 font-serif italic">
                                Chiếc này — là của bạn.
                            </p>
                        </MaterialReveal>
                    </motion.div>
                )}

                {/* Screen 4: Personal Message */}
                {screen === 4 && (
                    <motion.div
                        key="b1-4"
                        variants={pageVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={pageTransition}
                        className="screen-container bg-faifo-dark"
                    >
                        <MaterialReveal delay={0.5} className="text-center">
                            <span className="text-3xl">💌</span>
                        </MaterialReveal>

                        <MaterialReveal delay={1.0} className="text-center max-w-xs mt-6">
                            <p className="text-lg font-serif text-stone-200 mb-6">
                                Gửi {GIFT_DATA.receiverName}
                            </p>
                        </MaterialReveal>

                        <MaterialReveal delay={1.6} className="text-center max-w-xs">
                            <p className="text-sm text-stone-400 leading-loose italic">
                                &ldquo;{GIFT_DATA.message}&rdquo;
                            </p>
                        </MaterialReveal>

                        <MaterialReveal delay={2.4} className="text-center mt-8">
                            <p className="text-sm text-stone-400">
                                Với tất cả tình cảm,
                            </p>
                            <p className="font-serif text-faifo-terracotta text-lg mt-1">
                                {GIFT_DATA.senderName}
                            </p>
                        </MaterialReveal>

                        {/* Small logo */}
                        <MaterialReveal delay={3.0} className="mt-12">
                            <div className="w-12 h-12 rounded-full border border-stone-800 flex items-center justify-center">
                                <span className="font-serif text-xs text-stone-600">CTT</span>
                            </div>
                        </MaterialReveal>

                        <MaterialReveal delay={3.5} className="mt-6">
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
