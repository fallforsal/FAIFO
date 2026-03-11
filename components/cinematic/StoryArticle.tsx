'use client'

import { motion } from 'framer-motion'
import MaterialReveal from '@/components/animations/MaterialReveal'
import { POTTERY_EASE } from '@/lib/animation-config'

interface StoryArticleProps {
    onNext: () => void
}

export default function StoryArticle({ onNext }: StoryArticleProps) {
    return (
        // 1. LỚP VỎ (SOLID CONTAINER): Đổ màu kem ngay lập tức để đỡ màn mưa, không tàng hình!
        <motion.div
            key="story"
            exit={{ opacity: 0 }} // Chỉ mờ đi khi chuyển qua màn Video
            className="screen-container bg-[#F5F0E6] min-h-screen w-full relative z-10" // Ép màu nền #F5F0E6
            style={{ justifyContent: 'flex-start', paddingTop: '3rem', willChange: 'opacity, transform' }}
        >

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, ease: POTTERY_EASE }}
                className="w-full flex flex-col items-center"
            >
                {/* Title */}
                <MaterialReveal delay={0.3} className="text-center mb-8 w-full max-w-sm">
                    <p className="text-xs text-faifo-terracotta tracking-[0.3em] uppercase mb-3">
                        Câu chuyện
                    </p>
                    <h2 className="font-serif text-2xl text-stone-800 leading-snug text-balance">
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
                        <p className="text-sm text-stone-600 leading-loose">
                            Mỗi đường nét là một quyết định của đôi bàn tay —
                            không có máy móc, không có khuôn mẫu.
                        </p>
                    </MaterialReveal>

                    {/* Image placeholder — artisan workshop */}
                    <MaterialReveal delay={1.2} className="w-full">
                        <div className="w-full h-44 rounded-2xl bg-gradient-to-b from-stone-200/60 to-stone-300/50 border border-stone-300/50 flex flex-col items-center justify-center overflow-hidden">
                            {/* Bỏ motion.div bọc ngoài, chỉ animate nội dung icon để tránh lỗi lặp lại key="story" */}
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
                        <p className="text-sm text-stone-600 leading-loose">
                            Chúng tôi không chỉ làm gốm.
                            <br />
                            <span className="text-stone-700 font-serif italic">
                                Chúng tôi lưu giữ ký ức.
                            </span>
                        </p>
                    </MaterialReveal>

                    {/* Image placeholder — artisan hands */}
                    <MaterialReveal delay={1.8} className="w-full">
                        <div className="w-full h-36 rounded-2xl bg-gradient-to-b from-stone-200/60 to-stone-300/50 border border-stone-300/50 flex flex-col items-center justify-center overflow-hidden">
                            {/* Bỏ motion.div bọc ngoài, chỉ animate nội dung icon */}
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
                        <p className="text-sm text-stone-600 leading-loose italic font-serif">
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
        </motion.div>
    )
}