'use client'

import { motion } from 'framer-motion'
import MaterialReveal from '@/components/animations/MaterialReveal'
import { POTTERY_EASE } from '@/lib/animation-config'

interface StoryArticleProps {
    onNext: () => void
}

export default function StoryArticle({ onNext }: StoryArticleProps) {
    return (
        <motion.div
            key="story"
            initial={{ opacity: 0, filter: 'blur(8px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, filter: 'blur(6px)' }}
            transition={{ duration: 1.5, ease: POTTERY_EASE }}
            className="screen-container bg-faifo-stone"
            style={{ justifyContent: 'flex-start', paddingTop: '3rem' }}
        >
            {/* Title */}
            <MaterialReveal delay={0.3} className="text-center mb-8 w-full max-w-sm">
                <p className="text-xs text-faifo-terracotta tracking-[0.3em] uppercase mb-3">
                    Câu chuyện
                </p>
                <h2 className="font-serif text-2xl text-stone-100 leading-snug text-balance">
                    Ra đời từ cảm hứng của người thợ gốm Hội An
                </h2>
            </MaterialReveal>

            {/* Decorative divider */}
            <MaterialReveal delay={0.6} className="mb-8">
                <div className="flex items-center gap-3">
                    <div className="h-px w-12 bg-faifo-terracotta/30" />
                    <div className="w-1.5 h-1.5 rounded-full bg-faifo-terracotta/50" />
                    <div className="h-px w-12 bg-faifo-terracotta/30" />
                </div>
            </MaterialReveal>

            {/* Article content */}
            <div className="max-w-sm space-y-6 text-center">
                <MaterialReveal delay={0.9}>
                    <p className="text-sm text-stone-300 leading-loose">
                        Mỗi đường nét là một quyết định của đôi bàn tay —
                        không có máy móc, không có khuôn mẫu.
                    </p>
                </MaterialReveal>

                {/* Image placeholder — artisan workshop */}
                <MaterialReveal delay={1.2} className="w-full">
                    <div className="w-full h-44 rounded-2xl bg-gradient-to-b from-stone-800/60 to-faifo-dark/80 border border-stone-800/30 flex items-center justify-center overflow-hidden">
                        <motion.div
                            className="text-center"
                            animate={{ opacity: [0.3, 0.6, 0.3] }}
                            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                        >
                            <p className="text-4xl mb-2">🏺</p>
                            <p className="text-xs text-stone-600">Xưởng gốm truyền thống</p>
                        </motion.div>
                    </div>
                </MaterialReveal>

                <MaterialReveal delay={1.5}>
                    <p className="text-sm text-stone-300 leading-loose">
                        Chúng tôi không chỉ làm gốm.
                        <br />
                        <span className="text-stone-200 font-serif italic">
                            Chúng tôi lưu giữ ký ức.
                        </span>
                    </p>
                </MaterialReveal>

                {/* Image placeholder — artisan hands */}
                <MaterialReveal delay={1.8} className="w-full">
                    <div className="w-full h-36 rounded-2xl bg-gradient-to-b from-stone-800/40 to-faifo-dark/60 border border-stone-800/30 flex items-center justify-center overflow-hidden">
                        <motion.div
                            className="text-center"
                            animate={{ opacity: [0.3, 0.6, 0.3] }}
                            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                        >
                            <p className="text-4xl mb-2">🤲</p>
                            <p className="text-xs text-stone-600">Đôi bàn tay nghệ nhân</p>
                        </motion.div>
                    </div>
                </MaterialReveal>

                <MaterialReveal delay={2.1}>
                    <p className="text-sm text-stone-400 leading-loose italic font-serif">
                        "Mỗi chiếc gốm mang theo hơi thở của đất, của lửa,
                        và của người đã nặn nên nó."
                    </p>
                </MaterialReveal>
            </div>

            {/* Continue button */}
            <MaterialReveal delay={2.5} className="mt-8">
                <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={onNext}
                    className="text-sm text-faifo-terracotta/70 hover:text-faifo-terracotta transition-colors duration-500"
                >
                    Tiếp tục →
                </motion.button>
            </MaterialReveal>
        </motion.div>
    )
}
