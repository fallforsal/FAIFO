'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

interface Step1Props {
  onNext: () => void
}

export default function Step1Greeting({ onNext }: Step1Props) {
  return (
    <div className="w-full h-full flex items-center justify-center bg-ceramic-beige px-4">
      <motion.div
        className="w-full max-w-sm flex flex-col items-center justify-center space-y-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Progress indicator dots - visual only */}
        <motion.div
          className="flex gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-6 h-1 bg-gray-300 rounded-full" />
          ))}
        </motion.div>

        {/* Main content */}
        <div className="text-center space-y-8">
          {/* Title */}
          <motion.h1
            className="font-serif text-7xl font-normal text-black"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Hello
          </motion.h1>

          {/* Subtext */}
          <motion.p
            className="text-base text-black/80 leading-relaxed font-sans"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Bạn vừa chạm vào một mảnh ký ức của Hội An.
          </motion.p>
        </div>

        {/* Button */}
        <motion.button
          onClick={onNext}
          className="inline-flex items-center gap-2 text-black/60 hover:text-black font-italic transition-colors mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          whileHover={{ x: 5 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="italic">Tiếp theo</span>
          <ArrowRight size={20} strokeWidth={1.5} />
        </motion.button>
      </motion.div>
    </div>
  )
}
