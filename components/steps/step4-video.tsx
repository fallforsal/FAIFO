'use client'

import { motion } from 'framer-motion'
import { Play } from 'lucide-react'
import { PageTransition } from '../page-transition'

interface Step4Props {
  onNext: () => void
  onBack: () => void
}

export default function Step4Video({ onNext, onBack }: Step4Props) {
  return (
    <PageTransition>
      <div className="w-full max-w-3xl space-y-6">
        {/* Video player card */}
        <motion.div
          className="relative w-full bg-ceramic-dark rounded-xl overflow-hidden shadow-2xl aspect-video"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
        >
          {/* Video background placeholder */}
          <div className="w-full h-full bg-gradient-to-br from-ceramic-blue/30 to-ceramic-brown/30 flex items-center justify-center relative overflow-hidden">
            {/* Placeholder image effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-ceramic-dark/80 via-transparent to-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            />

            {/* Play button */}
            <motion.button
              className="relative z-10 w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play size={32} className="text-white fill-white ml-1" />
            </motion.button>

            {/* Text overlay */}
            <motion.div
              className="absolute inset-0 flex items-end p-6 sm:p-8 z-10 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              <div className="space-y-2">
                <p className="text-white text-xl sm:text-2xl font-serif font-bold">
                  Chúng tôi không chỉ làm gốm.
                </p>
                <p className="text-white/90 text-lg sm:text-xl font-serif italic">
                  Chúng tôi lưu giữ ký ức.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Story description */}
        <motion.div
          className="text-center space-y-3 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <p className="text-ceramic-dark/80 leading-relaxed">
            Xem câu chuyện của những nghệ nhân Hội An qua những chiếc gốm độc nhất.
          </p>
        </motion.div>

        {/* Navigation */}
        <motion.div
          className="flex gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.7 }}
        >
          <button
            onClick={onBack}
            className="flex-1 px-4 py-3 text-ceramic-dark/60 hover:text-ceramic-dark transition-colors rounded-lg border border-ceramic-gray hover:border-ceramic-brown"
          >
            Quay lại
          </button>
          <button
            onClick={onNext}
            className="flex-1 px-4 py-3 bg-ceramic-brown text-white rounded-lg hover:bg-ceramic-brown/90 transition-colors font-medium"
          >
            Tiếp theo
          </button>
        </motion.div>
      </div>
    </PageTransition>
  )
}
