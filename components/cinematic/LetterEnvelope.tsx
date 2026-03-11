'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MaterialReveal from '@/components/animations/MaterialReveal'
import { POTTERY_EASE } from '@/lib/animation-config'

export default function LetterEnvelope() {
    const [isOpen, setIsOpen] = useState(false)
    const [letterRevealed, setLetterRevealed] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    const [recipientName, setRecipientName] = useState('')
    const [senderName, setSenderName] = useState('')
    const [message, setMessage] = useState('')

    const handleOpen = () => {
        setIsOpen(true)
        setTimeout(() => setLetterRevealed(true), 800)
    }

    const handleSubmit = () => {
        if (recipientName && senderName && message) {
            setSubmitted(true)
        }
    }

    return (
        <motion.div
            key="letter"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3, ease: 'easeOut' } }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="screen-container"
            style={{ willChange: 'opacity, transform' }}
        >
            <MaterialReveal delay={0.2} className="text-center mb-6">
                <p className="text-xs text-faifo-terracotta tracking-[0.3em] uppercase mb-2">
                    Lá thư
                </p>
                <h2 className="font-serif text-xl text-stone-800">
                    Gửi lời chúc đến một người bạn
                </h2>
            </MaterialReveal>

            {/* Envelope container */}
            <MaterialReveal delay={0.4} className="w-full max-w-sm">
                <div className="envelope-perspective flex justify-center">
                    <div className="relative" style={{ width: 300, minHeight: submitted ? 200 : isOpen ? 480 : 220 }}>

                        {/* Envelope body */}
                        <div
                            className="absolute top-0 left-0 right-0 rounded-xl overflow-hidden"
                            style={{
                                height: 220,
                                background: 'linear-gradient(135deg, #d4c4a8 0%, #c2b090 50%, #b5a080 100%)',
                                boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                            }}
                        >
                            {/* Envelope inner pattern */}
                            <div
                                className="absolute inset-3 rounded-lg"
                                style={{
                                    background: 'repeating-linear-gradient(135deg, transparent, transparent 10px, rgba(154,52,18,0.05) 10px, rgba(154,52,18,0.05) 20px)',
                                }}
                            />

                            {/* Stamp */}
                            <div className="absolute top-4 right-4 w-12 h-14 rounded-sm border-2 border-dashed border-stone-500/30 flex items-center justify-center">
                                <span className="text-[10px] text-stone-500/60">FAIFO</span>
                            </div>

                            {/* Center content on envelope */}
                            {!isOpen && (
                                <div className="flex flex-col items-center justify-center h-full relative z-10">
                                    <span className="text-3xl mb-2">💌</span>
                                    <motion.p
                                        className="text-xs text-stone-600"
                                        animate={{ opacity: [0.4, 0.8, 0.4] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                                    >
                                        Nhấn để mở thư
                                    </motion.p>
                                </div>
                            )}
                        </div>

                        {/* Envelope flap — CSS 3D */}
                        <motion.div
                            className="absolute top-0 left-0 right-0 cursor-pointer envelope-flap"
                            style={{
                                height: 110,
                                clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
                                background: 'linear-gradient(180deg, #c2b090 0%, #b5a080 100%)',
                                transformOrigin: 'top center',
                                zIndex: isOpen ? 0 : 10,
                            }}
                            animate={{
                                rotateX: isOpen ? 180 : 0,
                            }}
                            transition={{ duration: 0.8, ease: POTTERY_EASE }}
                            onClick={handleOpen}
                        />

                        {/* Letter paper — slides out */}
                        <AnimatePresence>
                            {letterRevealed && !submitted && (
                                <motion.div
                                    initial={{ y: 0, opacity: 0 }}
                                    animate={{ y: 200, opacity: 1 }}
                                    transition={{ duration: 0.8, ease: POTTERY_EASE }}
                                    className="absolute left-3 right-3"
                                    style={{ top: 20, zIndex: 5 }}
                                >
                                    <div className="letter-paper rounded-lg p-5">
                                        <div className="letter-lines">
                                            {/* Recipient */}
                                            <div className="mb-4">
                                                <label className="text-xs text-stone-400 block mb-1">Gửi đến</label>
                                                <input
                                                    type="text"
                                                    value={recipientName}
                                                    onChange={(e) => setRecipientName(e.target.value)}
                                                    placeholder="Tên người nhận"
                                                    className="w-full bg-transparent text-stone-700 font-handwriting text-lg border-b border-stone-300/30 pb-1 focus:outline-none focus:border-faifo-terracotta/50 placeholder:text-stone-300/50"
                                                />
                                            </div>

                                            {/* Message */}
                                            <div className="mb-4">
                                                <label className="text-xs text-stone-400 block mb-1">Lời nhắn</label>
                                                <textarea
                                                    value={message}
                                                    onChange={(e) => setMessage(e.target.value)}
                                                    placeholder="Viết lời chúc tại đây..."
                                                    rows={4}
                                                    className="w-full bg-transparent text-stone-700 font-handwriting text-lg leading-7 resize-none focus:outline-none placeholder:text-stone-300/50"
                                                />
                                            </div>

                                            {/* Sender */}
                                            <div className="mb-2">
                                                <label className="text-xs text-stone-400 block mb-1">Từ</label>
                                                <input
                                                    type="text"
                                                    value={senderName}
                                                    onChange={(e) => setSenderName(e.target.value)}
                                                    placeholder="Tên bạn"
                                                    className="w-full bg-transparent text-stone-700 font-handwriting text-lg border-b border-stone-300/30 pb-1 focus:outline-none focus:border-faifo-terracotta/50 placeholder:text-stone-300/50"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {submitted && (
                                <motion.div
                                    key="submitted"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.8, ease: POTTERY_EASE }}
                                    className="absolute left-3 right-3"
                                    style={{ top: 240, zIndex: 5 }}
                                >
                                    <div className="text-center py-6">
                                        <span className="text-4xl">✉️</span>
                                        <p className="font-handwriting text-xl text-stone-800 mt-4">
                                            Lá thư đã được gửi đi
                                        </p>
                                        <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                                            Lời chúc của bạn giờ đã đồng hành<br />
                                            cùng chiếc gốm từ Faifo.
                                        </p>
                                        <div className="mt-6 flex items-center justify-center gap-2">
                                            <div className="w-8 h-8 rounded-full border border-stone-300 flex items-center justify-center">
                                                <span className="font-serif text-[8px] text-stone-600">SoF</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </MaterialReveal>

            {/* Submit button */}
            {
                letterRevealed && !submitted && (
                    <MaterialReveal delay={0.4} className="mt-6">
                        <motion.button
                            whileTap={{ scale: 0.97 }}
                            onClick={handleSubmit}
                            className="px-8 py-3 rounded-xl bg-faifo-terracotta/20 border border-faifo-terracotta/40 text-stone-800 text-sm transition-colors duration-500 hover:bg-faifo-terracotta/30"
                        >
                            Gửi lời chúc ✨
                        </motion.button>
                    </MaterialReveal>
                )
            }
        </motion.div >
    )
}
