'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { PageTransition } from '../page-transition'

interface Step1Props {
  onNext: () => void
}

export default function Step1Greeting({ onNext }: Step1Props) {
  return (
    <PageTransition>
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 sm:p-10 text-center space-y-8">
        {/* Title */}
        <motion.h1
          className="font-serif text-5xl sm:text-6xl font-bold text-ceramic-dark"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Hello
        </motion.h1>

        {/* Subtext */}
        <motion.p
          className="text-base sm:text-lg text-ceramic-dark/80 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          Bạn vừa chạm vào một mảnh ký ức của Hội An.
        </motion.p>

        {/* Attribution */}
        <motion.p
          className="text-sm text-ceramic-dark/60 italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          Mỗi chiếc gốm là một chuyện có một ý ức của Hội An
        </motion.p>

        {/* Button */}
        <motion.button
          onClick={onNext}
          className="inline-flex items-center gap-2 text-ceramic-brown hover:text-ceramic-dark font-medium transition-colors"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          whileHover={{ x: 5 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>Tiếp theo</span>
          <ArrowRight size={20} />
        </motion.button>
      </div>
    </PageTransition>
  )
}
