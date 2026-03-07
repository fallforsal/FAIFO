'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

interface Step8Props {
  onBack: () => void
}

export default function Step8Choice({ onBack }: Step8Props) {
  const handleDiary = () => {
    // Route to diary writing
    console.log('Navigate to diary writing')
  }

  const handleWish = () => {
    // Route to wish writing
    console.log('Navigate to wish writing')
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-ceramic-beige px-4">
      <motion.div
        className="flex flex-col items-center justify-center space-y-12 max-w-2xl w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Progress dots */}
        <motion.div
          className="flex gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`h-1 rounded-full ${i < 6 ? 'w-6 bg-gray-600' : 'w-6 bg-gray-300'}`}
            />
          ))}
        </motion.div>

        {/* Title */}
        <motion.h2
          className="font-serif text-5xl font-normal text-black text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          Bạn muốn
        </motion.h2>

        {/* Two choice cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          {/* Diary choice */}
          <motion.button
            onClick={handleDiary}
            className="p-8 bg-white rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow"
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="font-serif text-2xl font-normal text-black mb-2">
              Viết nhật kí
            </h3>
            <p className="font-sans text-sm text-black/60 italic">
              (cho bản thân)
            </p>
            <motion.div
              className="mt-4 flex justify-center"
              whileHover={{ x: 5 }}
            >
              <ArrowRight size={20} className="text-black/60" strokeWidth={1.5} />
            </motion.div>
          </motion.button>

          {/* Wish choice */}
          <motion.button
            onClick={handleWish}
            className="p-8 bg-white rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow"
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="font-serif text-2xl font-normal text-black mb-2">
              Viết lời chúc
            </h3>
            <p className="font-sans text-sm text-black/60 italic">
              (tặng bạn bè)
            </p>
            <motion.div
              className="mt-4 flex justify-center"
              whileHover={{ x: 5 }}
            >
              <ArrowRight size={20} className="text-black/60" strokeWidth={1.5} />
            </motion.div>
          </motion.button>
        </motion.div>

        {/* Back button */}
        <motion.button
          onClick={onBack}
          className="mt-8 text-black/60 hover:text-black transition-colors text-sm italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          whileTap={{ scale: 0.95 }}
        >
          Bỏ qua
        </motion.button>
      </motion.div>
    </div>
  )
}
