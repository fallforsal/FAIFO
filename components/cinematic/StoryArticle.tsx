'use client'

import { motion } from 'framer-motion'
import MaterialReveal from '@/components/animations/MaterialReveal'
import { POTTERY_EASE } from '@/lib/animation-config'

interface StoryArticleProps {
    onNext: () => void
    storyText?: string
}

export default function StoryArticle({ onNext, storyText }: StoryArticleProps) {
    // Tách dòng văn bản dựa trên ký tự xuống dòng (\n)
    const formattedParagraphs = storyText
        ? storyText.split('\n').filter(paragraph => paragraph.trim() !== '')
        : [
            "Mỗi đường nét là một quyết định của đôi bàn tay — không có máy móc, không có khuôn mẫu.",
            "Chúng tôi không chỉ làm gốm. Chúng tôi lưu giữ ký ức.",
            "Mỗi chiếc gốm mang theo hơi thở của đất, của lửa, và của người đã nặn nên nó."
        ]

    return (
        <motion.div
            key="story"
            exit={{ opacity: 0 }}
            className="screen-container bg-[#F5F0E6] min-h-screen w-full relative z-10"
            style={{ justifyContent: 'flex-start', paddingTop: '3rem', willChange: 'opacity, transform' }}
        >
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, ease: POTTERY_EASE }}
                className="w-full flex flex-col items-center px-6 md:px-12"
            >
                {/* --- HEADER KHÔNG ĐỔI --- */}
                <MaterialReveal delay={0.3} className="text-center w-full max-w-lg mt-8">
                    <p className="text-xs text-faifo-terracotta tracking-[0.3em] uppercase mb-4">
                        Câu chuyện
                    </p>
                    <h2 className="font-serif text-3xl md:text-4xl text-stone-800 leading-tight text-balance">
                        Ra đời từ cảm hứng của người thợ gốm Hội An
                    </h2>
                </MaterialReveal>

                {/* Decorative divider */}
                <MaterialReveal delay={0.6} className="my-10">
                    <div className="flex items-center gap-4">
                        <div className="h-px w-16 bg-faifo-terracotta/30" />
                        <div className="w-1.5 h-1.5 rounded-full bg-faifo-terracotta/50" />
                        <div className="h-px w-16 bg-faifo-terracotta/30" />
                    </div>
                </MaterialReveal>

                {/* --- NỘI DUNG TYPOGRAPHY TỐI GIẢN --- */}
                <div className="max-w-md w-full text-center">
                    <MaterialReveal delay={0.9}>
                        <div className="space-y-6">
                            {formattedParagraphs.map((paragraph, index) => (
                                <p
                                    key={index}
                                    className={`text-base leading-loose text-stone-600 ${index === formattedParagraphs.length - 1 ? 'italic font-serif text-stone-700' : ''
                                        }`}
                                >
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    </MaterialReveal>
                </div>

                {/* --- NÚT TIẾP TỤC ĐƯỢC GIÃN XUỐNG DƯỚI --- */}
                <MaterialReveal delay={1.5} className="mt-16 mb-12">
                    <motion.button
                        whileTap={{ scale: 0.97 }}
                        onClick={onNext}
                        className="group flex items-center justify-center gap-3 text-sm tracking-widest uppercase text-faifo-terracotta/70 hover:text-faifo-terracotta transition-colors duration-500"
                    >
                        <span>Tiếp tục</span>
                        <motion.span
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            className="text-lg opacity-70 group-hover:opacity-100"
                        >
                            →
                        </motion.span>
                    </motion.button>
                </MaterialReveal>

            </motion.div>
        </motion.div>
    )
}