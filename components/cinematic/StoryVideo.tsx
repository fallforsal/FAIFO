'use client'

import { motion } from 'framer-motion'
import MaterialReveal from '@/components/animations/MaterialReveal'
import { POTTERY_EASE } from '@/lib/animation-config'

interface StoryVideoProps {
    onNext: () => void
    videoUrl?: string
}

const videoScenes = [
    { emoji: '🌅', label: 'Sông Thu Bồn buổi sáng' },
    { emoji: '🏺', label: 'Nặn đất thành hình' },
    { emoji: '🔥', label: 'Lửa nung đất thành gốm' },
    { emoji: '🏘️', label: 'Phố cổ Hội An' },
]

export default function StoryVideo({ onNext, videoUrl }: StoryVideoProps) {
    return (
        <motion.div
            key="video"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3, ease: 'easeOut' } }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="screen-container"
            style={{ willChange: 'opacity, transform' }}
        >
            {/* Title */}
            <MaterialReveal delay={0.2} className="text-center mb-6">
                <h2 className="font-serif text-xl text-stone-800">
                    🎬 Từ đất đến tay bạn
                </h2>
            </MaterialReveal>

            {/* Video — real player or placeholder */}
            <MaterialReveal delay={0.4} className="w-full max-w-sm">
                {videoUrl ? (
                    <div className="w-full aspect-[9/16] max-h-[50vh] rounded-2xl overflow-hidden border border-stone-300/50">
                        <video
                            src={videoUrl}
                            controls
                            playsInline
                            preload="metadata"
                            className="w-full h-full object-cover"
                        />
                    </div>
                ) : (
                    <div className="w-full aspect-[9/16] max-h-[50vh] rounded-2xl bg-gradient-to-b from-stone-200/60 to-stone-300/50 border border-stone-300/50 flex flex-col items-center justify-center overflow-hidden relative">
                        {/* Animated scene indicators */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            {videoScenes.map((scene, i) => (
                                <motion.div
                                    key={i}
                                    className="flex flex-col items-center gap-1"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: [0.3, 0.7, 0.3] }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: 'easeInOut',
                                        delay: i * 0.5,
                                    }}
                                >
                                    <span className="text-2xl">{scene.emoji}</span>
                                    <span className="text-[10px] text-stone-600 text-center">
                                        {scene.label}
                                    </span>
                                </motion.div>
                            ))}
                        </div>

                        {/* Play button */}
                        <motion.div
                            className="w-16 h-16 rounded-full bg-faifo-terracotta/20 border border-faifo-terracotta/30 flex items-center justify-center"
                            animate={{
                                scale: [1, 1.1, 1],
                                borderColor: [
                                    'rgba(154,52,18,0.3)',
                                    'rgba(154,52,18,0.6)',
                                    'rgba(154,52,18,0.3)',
                                ],
                            }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                        >
                            <span className="text-faifo-terracotta text-xl ml-1">▶</span>
                        </motion.div>

                        <p className="text-xs text-stone-600 mt-4">
                            Video sẽ được cập nhật
                        </p>
                    </div>
                )}
            </MaterialReveal>

            {/* End quote */}
            <MaterialReveal delay={0.6} className="text-center max-w-xs mt-6">
                <p className="text-sm text-stone-600 leading-relaxed italic font-serif">
                    "Mỗi chiếc gốm là một câu chuyện đang chờ được kể tiếp — bởi chính bạn."
                </p>
                <p className="text-xs text-stone-600 mt-3">
                    — CHUYỆN TRONG TAY —
                </p>
            </MaterialReveal>

            {/* Continue */}
            <MaterialReveal delay={0.8} className="mt-6">
                <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={onNext}
                    className="text-sm text-faifo-terracotta/70 hover:text-faifo-terracotta transition-colors duration-500"
                >
                    Tiếp tục →
                </motion.button>
            </MaterialReveal>
        </motion.div >
    )
}
