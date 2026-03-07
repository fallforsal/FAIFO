'use client'

import { motion } from 'framer-motion'

interface Step3Props {
  onNext: () => void
  onBack: () => void
}

export default function Step3FaifoThanks({ onNext }: Step3Props) {
  return (
    <div className="w-full h-full flex items-center justify-center bg-ceramic-beige px-4">
      <motion.div
        className="flex flex-col items-center justify-center space-y-8 max-w-md"
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
              className={`h-1 rounded-full ${i < 3 ? 'w-6 bg-gray-600' : 'w-6 bg-gray-300'}`}
            />
          ))}
        </motion.div>

        {/* Shrinking vase animation */}
        <motion.div
          className="flex items-center justify-center"
          initial={{ scale: 1 }}
          animate={{ scale: 0.6 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <svg
            viewBox="0 0 300 400"
            className="w-40 h-56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M 80 80 Q 70 120 70 180 Q 70 260 100 320 Q 150 360 200 360 Q 250 360 280 320 Q 310 260 310 180 Q 310 120 300 80 Z"
              fill="#722620"
            />
            <rect x="110" y="40" width="80" height="50" fill="#722620" />
            <ellipse cx="150" cy="40" rx="45" ry="15" fill="#722620" opacity="0.8" />
          </svg>
        </motion.div>

        {/* FAIFO text that appears */}
        <motion.div
          className="text-center space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <h2 className="font-serif text-4xl font-normal text-black">FAIFO</h2>
          
          <p className="font-sans text-sm text-black/80 leading-relaxed max-w-xs">
            Cảm ơn bạn đã tin tưởng và chọn mang về một phần của Faifo - tên cũ của Hội An, nơi những câu chuyện chưa bao giờ thôi được kể.
          </p>
        </motion.div>

        {/* Next button */}
        <motion.button
          onClick={onNext}
          className="mt-8 text-black/60 hover:text-black transition-colors"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </motion.button>
      </motion.div>
    </div>
  )
}
