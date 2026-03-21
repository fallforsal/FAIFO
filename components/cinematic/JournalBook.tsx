'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MaterialReveal from '@/components/animations/MaterialReveal'
import { POTTERY_EASE } from '@/lib/animation-config'
import { saveInteraction } from '@/app/actions/interaction'
import type { Interaction } from '@/lib/types'

interface JournalBookProps {
    chipId?: string
    interactions?: Interaction[]
    onSaveComplete?: () => void
}

export default function JournalBook({ chipId, interactions = [], onSaveComplete }: JournalBookProps) {
    const [isOpen, setIsOpen] = useState(false)
    // viewPage: từ 0 đến interactions.length. Trang cuối (bằng length) là trang để viết mới.
    const [viewPage, setViewPage] = useState(0)
    const [entry, setEntry] = useState('')
    const [isSaving, setIsSaving] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const totalPages = interactions.length + 1
    const isNewPage = viewPage === interactions.length
    const currentPastEntry = !isNewPage ? interactions[viewPage] : null

    const handleSave = async () => {
        if (!chipId) return

        // Nếu người dùng KHÔNG viết gì: Gấp sổ, không gọi API để tránh rác DB, đi tiếp flow
        if (!entry.trim()) {
            setIsSuccess(true)
            setTimeout(() => onSaveComplete?.(), 2000)
            return
        }

        // Nếu CÓ viết nội dung: Tiến hành lưu DB
        setIsSaving(true)
        const result = await saveInteraction(chipId, 'DIARY_ENTRY', entry)
        setIsSaving(false)

        if (result.success) {
            setIsSuccess(true)
            setTimeout(() => onSaveComplete?.(), 2000)
        } else {
            console.error('[JournalBook] save failed:', result.error)
            // Có thể thêm toast notification báo lỗi ở đây sau
        }
    }

    const next_page = () => setViewPage(p => Math.min(totalPages - 1, p + 1))
    const prev_page = () => setViewPage(p => Math.max(0, p - 1))

    return (
        <motion.div
            key="journal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3, ease: 'easeOut' } }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="screen-container"
            style={{ willChange: 'opacity, transform' }}
        >
            <MaterialReveal delay={0.2} className="text-center mb-6">
                <p className="text-xs text-faifo-terracotta tracking-[0.3em] uppercase mb-2">
                    Nhật ký
                </p>
                <h2 className="font-serif text-xl text-stone-800">
                    Ký ức của riêng bạn
                </h2>
            </MaterialReveal>

            {/* Book container with CSS 3D */}
            <MaterialReveal delay={0.4} className="w-full max-w-sm">
                <div className="book-perspective flex justify-center">
                    <div className="relative" style={{ width: 300, height: 420 }}>
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
                                    className="absolute inset-0 rounded-r-lg overflow-hidden flex flex-col"
                                    style={{
                                        background: 'linear-gradient(135deg, #f5f0e8 0%, #ede7dd 100%)',
                                        margin: '4px 4px 4px 8px',
                                    }}
                                >
                                    <div className="notebook-lines flex-1 p-6 pt-8 flex flex-col relative">
                                        <AnimatePresence mode="wait">
                                            {isSuccess ? (
                                                <motion.div
                                                    key="success-screen"
                                                    initial={{ opacity: 0, scale: 0.9 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    className="flex flex-col items-center justify-center h-full"
                                                >
                                                    <p className="text-4xl mb-4">📖</p>
                                                    <p className="font-handwriting text-xl text-stone-600 text-center">
                                                        Sổ đã được cất giữ
                                                    </p>
                                                    <p className="text-xs text-stone-400 mt-4 text-center">
                                                        Câu chuyện của bạn giờ đã là<br />
                                                        một phần của chiếc gốm này.
                                                    </p>
                                                </motion.div>
                                            ) : (
                                                <motion.div
                                                    key={`page-${viewPage}`}
                                                    initial={{ opacity: 0, x: 10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -10 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="flex flex-col h-full"
                                                >
                                                    {/* Date */}
                                                    <p className="text-xs text-stone-400 mb-4 font-handwriting text-lg">
                                                        {isNewPage
                                                            ? new Date().toLocaleDateString('vi-VN', { day: '2-digit', month: 'long', year: 'numeric' })
                                                            : new Date(currentPastEntry?.created_at || '').toLocaleDateString('vi-VN', { day: '2-digit', month: 'long', year: 'numeric' })
                                                        }
                                                    </p>

                                                    {/* Content Area */}
                                                    {isNewPage ? (
                                                        <textarea
                                                            value={entry}
                                                            onChange={(e) => setEntry(e.target.value)}
                                                            placeholder="Viết ký ức mới của bạn ở đây..."
                                                            className="w-full flex-1 bg-transparent text-stone-700 font-handwriting text-lg leading-[32px] resize-none focus:outline-none placeholder:text-stone-300/60"
                                                            style={{ lineHeight: '32px' }}
                                                        />
                                                    ) : (
                                                        <div
                                                            className="w-full flex-1 text-stone-700 font-handwriting text-lg leading-[32px] overflow-y-auto pr-2 custom-scrollbar"
                                                            style={{ lineHeight: '32px', whiteSpace: 'pre-wrap' }}
                                                        >
                                                            {currentPastEntry?.content}
                                                        </div>
                                                    )}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        {/* Pagination Controls - Ẩn đi khi đang ở màn hình Success */}
                                        {!isSuccess && (
                                            <div className="absolute bottom-4 left-0 right-0 px-6 flex justify-between items-center text-stone-400">
                                                <button
                                                    onClick={prev_page}
                                                    disabled={viewPage === 0}
                                                    className="text-xs disabled:opacity-30 hover:text-faifo-terracotta transition-colors px-2 py-1"
                                                >
                                                    {viewPage > 0 ? '← Trước' : ''}
                                                </button>
                                                <span className="text-[10px] tracking-widest font-sans">
                                                    {viewPage + 1} / {totalPages}
                                                </span>
                                                <button
                                                    onClick={next_page}
                                                    disabled={viewPage === totalPages - 1}
                                                    className="text-xs disabled:opacity-30 hover:text-faifo-terracotta transition-colors px-2 py-1"
                                                >
                                                    {viewPage < totalPages - 1 ? 'Sau →' : ''}
                                                </button>
                                            </div>
                                        )}
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
                                    <span className="font-serif text-lg text-stone-700 tracking-wide">
                                        Nhật Ký
                                    </span>
                                    <span className="text-xs text-stone-500/60 tracking-[0.2em]">
                                        Chuyện Trong Tay
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

            {/* Bottom controls — only when book is open on the NEW page */}
            {isOpen && isNewPage && !isSuccess && (
                <MaterialReveal delay={0.6} className="mt-6 flex justify-center">
                    <motion.button
                        whileTap={{ scale: 0.97 }}
                        onClick={handleSave}
                        disabled={isSaving}
                        className="px-8 py-3 rounded-xl bg-faifo-terracotta/20 border border-faifo-terracotta/40 text-stone-800 text-sm transition-colors duration-500 hover:bg-faifo-terracotta/30 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSaving
                            ? 'Đang xử lý...'
                            : entry.trim() ? 'Lưu ký ức ✨' : 'Gấp sổ lại 📖'}
                    </motion.button>
                </MaterialReveal>
            )}

            {/* Bottom controls — When reading PAST pages (Optionally add a button to jump to new page) */}
            {isOpen && !isNewPage && !isSuccess && (
                <MaterialReveal delay={0.2} className="mt-6 flex justify-center">
                    <motion.button
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setViewPage(totalPages - 1)}
                        className="px-6 py-2 rounded-xl bg-stone-200 border border-stone-300 text-stone-600 text-xs transition-colors duration-500 hover:bg-stone-300"
                    >
                        Viết trang mới ✏️
                    </motion.button>
                </MaterialReveal>
            )}
        </motion.div>
    )
}