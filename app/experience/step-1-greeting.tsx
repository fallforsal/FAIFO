'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { VietnameseText } from '@/components/VietnameseText'

interface Step1GreetingProps {
  onNext: () => void
}

export function Step1Greeting({ onNext }: Step1GreetingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="min-h-screen flex flex-col items-center justify-center px-6 py-8 bg-ceramic-light"
    >
      {/* Content Container */}
      <div className="flex flex-col items-center justify-center gap-8 max-w-md">
        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="font-serif text-6xl md:text-7xl font-bold text-ceramic-dark text-center leading-tight"
        >
          Hello
        </motion.h1>

        {/* Subtext */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center"
        >
          <VietnameseText variant="body" className="text-ceramic-dark/80">
            Bạn vừa chạm vào một mảnh ký ức của Hội An.
          </VietnameseText>
        </motion.div>

        {/* Next Button */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={onNext}
          className="mt-6 flex items-center gap-3 px-6 py-3 bg-ceramic-brown text-ceramic-white rounded-full font-sans font-semibold transition-all duration-300 hover:shadow-lg active:shadow-md"
          aria-label="Tiếp theo - Next"
        >
          <span>Tiếp theo</span>
          <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
        </motion.button>
      </div>

      {/* Decorative element */}
      <motion.div
        className="absolute bottom-8 left-6 right-6 h-1 bg-ceramic-gray rounded-full"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        style={{ originX: 0 }}
      />
    </motion.div>
  )
}
