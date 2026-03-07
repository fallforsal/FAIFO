'use client'

import { motion } from 'framer-motion'
import { Play } from 'lucide-react'

interface Step7Props {
  onNext: () => void
  onBack: () => void
}

export default function Step7Video({ onNext, onBack }: Step7Props) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-900 p-4">
      {/* Progress dots */}
      <motion.div
        className="absolute top-8 left-0 right-0 flex justify-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`h-1 rounded-full ${i < 7 ? 'w-6 bg-white/60' : 'w-6 bg-white/20'}`}
          />
        ))}
      </motion.div>

      {/* Video player container */}
      <motion.div
        className="w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl flex items-center justify-center group"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Video placeholder */}
        <div className="relative w-full h-full bg-gradient-to-br from-gray-800 to-black flex items-center justify-center">
          {/* Placeholder thumbnail - can replace with actual video */}
          <div className="absolute inset-0 bg-cover bg-center opacity-30" 
            style={{
              backgroundImage: `linear-gradient(135deg, #1f2937 0%, #111827 100%)`
            }}
          />
          
          {/* Play button */}
          <motion.button
            className="relative z-10 w-20 h-20 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Play className="w-8 h-8 text-white fill-white ml-1" />
          </motion.button>

          {/* Text overlay */}
          <motion.div
            className="absolute inset-0 flex items-end justify-start p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="text-white">
              <h3 className="font-serif text-2xl mb-2">Ly gốm Faifo</h3>
              <p className="font-sans text-sm italic text-white/80">
                Chúng tôi không chỉ làm gốm<br />
                Chúng tôi lưu giữ ký ức.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Navigation */}
      <motion.div
        className="mt-12 flex gap-8 items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <button
          onClick={onBack}
          className="text-white/60 hover:text-white transition-colors"
          aria-label="Back"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        
        <button
          onClick={onNext}
          className="text-white/60 hover:text-white transition-colors"
          aria-label="Next"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </motion.div>
    </div>
  )
}
