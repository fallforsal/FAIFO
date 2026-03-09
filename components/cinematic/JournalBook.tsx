'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MaterialReveal from '@/components/animations/MaterialReveal'
import { POTTERY_EASE } from '@/lib/animation-config'

export default function JournalBook() {
    const [isOpen, setIsOpen] = useState(false)
    const [currentPage, setCurrentPage] = useState(0)
    const [entry, setEntry] = useState('')

    return (
        <motion.div
            key="journal"
            initial={{ opacity: 0, filter: 'blur(8px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, filter: 'blur(6px)' }}
            transition={{ duration: 0.9, ease: POTTERY_EASE }}
            className="screen-container bg-faifo-stone"
        >
            <MaterialReveal delay={0.3} className="text-center mb-6">
                <p className="text-xs text-faifo-terracotta tracking-[0.3em] uppercase mb-2">
                    Nhật ký
                </p>
                <h2 className="font-serif text-xl text-stone-200">
                    Ký ức của riêng bạn
                </h2>
            </MaterialReveal>

            {/* Book container with CSS 3D */}
            <MaterialReveal delay={0.6} className="w-full max-w-sm">
                <div className="book-perspective flex justify-center">
                    <div className="relative" style={{ width: 300, height: 400 }}>
                        {/* Book back */}
                        <div
                            className="absolute inset-0 rounded-r-lg shadow-2xl"
                            style={{
                                background: 'linear-gradient(135deg, #292019 0%, #1a1310 100%)',
                                border: '1px solid rgba(154, 52, 18, 0.2)',
                            }}
                        />

                        {/* Book pages (visible when open) */}
                        <AnimatePresence>
                            {isOpen && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.6, duration: 0.5 }}
                                    className="absolute inset-0 rounded-r-lg overflow-hidden"
                                    style={{
                                        background: 'linear-gradient(135deg, #f5f0e8 0%, #ede7dd 100%)',
                                        margin: '4px 4px 4px 8px',
                                    }}
                                >
                                    {/* Notebook lines */}
                                    <div className="notebook-lines h-full p-6 pt-8">
                                        <AnimatePresence mode="wait">
                                            {currentPage === 0 && (
                                                <motion.div
                                                    key="page-0"
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -20 }}
                                                    transition={{ duration: 0.5, ease: POTTERY_EASE }}
                                                >
                                                    {/* Date */}
                                                    <p className="text-xs text-stone-400 mb-6 font-handwriting text-lg">
                                                        {new Date().toLocaleDateString('vi-VN', {
                                                            day: '2-digit', month: 'long', year: 'numeric'
                                                        })}
                                                    </p>

                                                    {/* Journal entry area */}
                                                    <textarea
                                                        value={entry}
                                                        onChange={(e) => setEntry(e.target.value)}
                                                        placeholder="Viết ký ức của bạn ở đây..."
                                                        className="w-full h-56 bg-transparent text-stone-700 font-handwriting text-lg leading-[32px] resize-none focus:outline-none placeholder:text-stone-300/60"
                                                        style={{ lineHeight: '32px' }}
                                                    />
                                                </motion.div>
                                            )}

                                            {currentPage === 1 && (
                                                <motion.div
                                                    key="page-1"
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -20 }}
                                                    transition={{ duration: 0.5, ease: POTTERY_EASE }}
                                                    className="flex flex-col items-center justify-center h-full"
                                                >
                                                    <p className="text-4xl mb-4">📖</p>
                                                    <p className="font-handwriting text-xl text-stone-600 text-center">
                                                        Ký ức đã được lưu giữ
                                                    </p>
                                                    <p className="text-xs text-stone-400 mt-4 text-center">
                                                        Câu chuyện của bạn giờ đã là<br />
                                                        một phần của chiếc gốm này.
                                                    </p>

                                                    <div className="mt-8 flex items-center gap-2">
                                                        <div className="w-8 h-8 rounded-full border border-stone-300 flex items-center justify-center">
                                                            <span className="font-serif text-[8px] text-stone-400">SoF</span>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Book cover — animates open */}
                        <motion.div
                            className="absolute inset-0 rounded-r-lg cursor-pointer book-cover"
                            style={{
                                background: 'linear-gradient(135deg, #3d2a1e 0%, #251a12 50%, #1a120e 100%)',
                                border: '1px solid rgba(154, 52, 18, 0.3)',
                                transformOrigin: 'left center',
                            }}
                            animate={{
                                rotateY: isOpen ? -160 : 0,
                            }}
                            transition={{ duration: 1.2, ease: POTTERY_EASE }}
                            onClick={() => {
                                if (!isOpen) setIsOpen(true)
                            }}
                        >
                            {/* Cover content */}
                            {!isOpen && (
                                <div className="flex flex-col items-center justify-center h-full gap-4">
                                    <div className="w-16 h-px bg-faifo-terracotta/30" />
                                    <span className="font-serif text-lg text-stone-300/80 tracking-wide">
                                        Nhật Ký
                                    </span>
                                    <span className="text-xs text-stone-500/60 tracking-[0.2em]">
                                        FAIFO
                                    </span>
                                    <div className="w-16 h-px bg-faifo-terracotta/30" />

                                    <motion.p
                                        className="text-xs text-stone-500 mt-6"
                                        animate={{ opacity: [0.3, 0.7, 0.3] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                                    >
                                        Nhấn để mở sổ
                                    </motion.p>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </MaterialReveal>

            {/* Bottom controls — only when book is open */}
            {isOpen && currentPage === 0 && (
                <MaterialReveal delay={0.8} className="mt-6">
                    <motion.button
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setCurrentPage(1)}
                        className="px-8 py-3 rounded-xl bg-faifo-terracotta/20 border border-faifo-terracotta/40 text-stone-200 text-sm transition-colors duration-500 hover:bg-faifo-terracotta/30"
                    >
                        Lưu ký ức ✨
                    </motion.button>
                </MaterialReveal>
            )}
        </motion.div>
    )
}
