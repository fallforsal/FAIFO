'use client'

import { motion } from 'framer-motion'
import MaterialReveal from '@/components/animations/MaterialReveal'
import { POTTERY_EASE } from '@/lib/animation-config'

interface ChoiceScreenProps {
    onChoice: (choice: 'journal' | 'letter') => void
}

export default function ChoiceScreen({ onChoice }: ChoiceScreenProps) {
    return (
        <motion.div
            key="choice"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3, ease: 'easeOut' } }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="screen-container"
            style={{ willChange: 'opacity, transform' }}
        >
            <MaterialReveal delay={0.2} className="text-center mb-10">
                <h2 className="font-serif text-xl text-stone-800 mb-3">
                    Bạn muốn làm gì tiếp theo?
                </h2>
                <p className="text-sm text-stone-600">
                    Chọn một hành trình cho chiếc gốm của bạn
                </p>
            </MaterialReveal>

            <div className="w-full space-y-5 max-w-xs">
                {/* Option A: Cho Mình — Journal */}
                <MaterialReveal delay={0.4}>
                    <motion.button
                        whileTap={{ scale: 0.96, rotateX: 2 }}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => onChoice('journal')}
                        className="w-full rounded-2xl p-6 text-left bg-gradient-to-br from-faifo-terracotta/15 to-faifo-terracotta/5 border border-faifo-terracotta/30 transition-all duration-500 hover:border-faifo-terracotta/50"
                    >
                        <div className="flex items-start gap-4">
                            <span className="text-3xl mt-1">📖</span>
                            <div>
                                <p className="font-serif text-lg text-stone-800 mb-1">
                                    Cho Mình
                                </p>
                                <p className="text-xs text-stone-600 leading-relaxed">
                                    Viết nhật ký cá nhân — lưu giữ ký ức của riêng bạn cùng chiếc gốm này.
                                </p>
                            </div>
                        </div>
                    </motion.button>
                </MaterialReveal>

                {/* Option B: Cho Bạn — Letter */}
                <MaterialReveal delay={0.6}>
                    <motion.button
                        whileTap={{ scale: 0.96, rotateX: 2 }}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => onChoice('letter')}
                        className="w-full rounded-2xl p-6 text-left bg-gradient-to-br from-stone-200/60 to-stone-300/30 border border-stone-300/50 transition-all duration-500 hover:border-stone-400/50"
                    >
                        <div className="flex items-start gap-4">
                            <span className="text-3xl mt-1">💌</span>
                            <div>
                                <p className="font-serif text-lg text-stone-800 mb-1">
                                    Cho Bạn
                                </p>
                                <p className="text-xs text-stone-600 leading-relaxed">
                                    Gửi lời chúc cho một người đặc biệt — kèm theo câu chuyện của Chuyện Trong Tay.
                                </p>
                            </div>
                        </div>
                    </motion.button>
                </MaterialReveal>
            </div>

            {/* Footer */}
            <MaterialReveal delay={0.8} className="mt-12">
                <p className="text-[10px] text-stone-700 text-center">
                    CHUYỆN TRONG TAY · Handcrafted in Hội An
                </p>
            </MaterialReveal>
        </motion.div >
    )
}
