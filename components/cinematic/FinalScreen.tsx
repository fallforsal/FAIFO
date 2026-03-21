'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import MaterialReveal from '@/components/animations/MaterialReveal'

export default function FinalScreen() {
    return (
        <motion.div
            key="final"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3, ease: 'easeOut' } }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="screen-container"
            style={{ willChange: 'opacity, transform' }}
        >
            {/* Ambient glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div
                    className="w-72 h-72 rounded-full opacity-15"
                    style={{
                        background:
                            'radial-gradient(circle, rgba(154, 52, 18, 0.35) 0%, transparent 70%)',
                    }}
                />
            </div>

            <MaterialReveal delay={0.3} className="text-center relative z-10">
                <span className="text-5xl mb-6 block">🏺</span>

                <h2 className="font-serif text-2xl text-stone-800 mb-4 leading-relaxed">
                    Cảm ơn bạn đã lưu giữ<br />
                    câu chuyện cùng CHUYỆN TRONG TAY
                </h2>

                <p className="text-sm text-stone-600 leading-relaxed max-w-[280px] mx-auto mb-10">
                    Ký ức của bạn giờ đã trở thành một phần
                    của chiếc gốm — mãi mãi.
                </p>

                <div className="w-16 h-px bg-faifo-terracotta/30 mx-auto mb-10" />

                <Link
                    href="/shop"
                    className="inline-block px-8 py-3 rounded-xl bg-faifo-terracotta/15 border border-faifo-terracotta/30 text-stone-700 text-sm transition-all duration-500 hover:bg-faifo-terracotta/25 hover:border-faifo-terracotta/50"
                >
                    Khám phá thêm các tác phẩm khác →
                </Link>
            </MaterialReveal>

            {/* Footer */}
            <MaterialReveal delay={0.6} className="mt-auto pt-12">
                <p className="text-[10px] text-stone-500 text-center tracking-wider">
                    CHUYỆN TRONG TAY · Handcrafted in Hội An
                </p>
            </MaterialReveal>
        </motion.div>
    )
}
