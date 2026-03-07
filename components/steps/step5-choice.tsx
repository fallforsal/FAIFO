'use client'

import { motion } from 'framer-motion'
import { BookOpen, Gift } from 'lucide-react'
import { PageTransition } from '../page-transition'

interface Step5Props {
  onBack: () => void
}

export default function Step5Choice({ onBack }: Step5Props) {
  return (
    <PageTransition>
      <div className="w-full max-w-2xl space-y-8">
        {/* Title */}
        <motion.div
          className="text-center space-y-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-ceramic-dark">
            Bạn muốn
          </h2>
        </motion.div>

        {/* Choice cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Card 1: Diary */}
          <motion.button
            className="group bg-white rounded-xl p-8 space-y-4 hover:shadow-xl transition-all text-left h-full"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              className="w-12 h-12 bg-ceramic-brown/10 rounded-lg flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
            >
              <BookOpen size={24} className="text-ceramic-brown" />
            </motion.div>

            <div className="space-y-2">
              <h3 className="font-serif text-2xl font-bold text-ceramic-dark">
                Viết nhật ký
              </h3>
              <p className="text-ceramic-dark/60 text-sm">
                cho bản thân
              </p>
            </div>

            <p className="text-ceramic-dark/70 text-sm leading-relaxed pt-4 border-t border-ceramic-gray">
              Lưu lại những khoảnh khắc quý giá và cảm xúc của bạn.
            </p>

            <motion.div
              className="pt-4 text-ceramic-brown font-medium text-sm group-hover:translate-x-1 transition-transform"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Bắt đầu →
            </motion.div>
          </motion.button>

          {/* Card 2: Wishes */}
          <motion.button
            className="group bg-white rounded-xl p-8 space-y-4 hover:shadow-xl transition-all text-left h-full"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              className="w-12 h-12 bg-ceramic-blue/10 rounded-lg flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
            >
              <Gift size={24} className="text-ceramic-blue" />
            </motion.div>

            <div className="space-y-2">
              <h3 className="font-serif text-2xl font-bold text-ceramic-dark">
                Viết lời chúc
              </h3>
              <p className="text-ceramic-dark/60 text-sm">
                tặng bạn bè
              </p>
            </div>

            <p className="text-ceramic-dark/70 text-sm leading-relaxed pt-4 border-t border-ceramic-gray">
              Chia sẻ lời chúc và yêu thương đến những người thân yêu.
            </p>

            <motion.div
              className="pt-4 text-ceramic-blue font-medium text-sm group-hover:translate-x-1 transition-transform"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Bắt đầu →
            </motion.div>
          </motion.button>
        </div>

        {/* Skip and back buttons */}
        <motion.div
          className="flex gap-4 justify-center pt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <button
            onClick={onBack}
            className="px-6 py-2 text-ceramic-dark/60 hover:text-ceramic-dark transition-colors"
          >
            Quay lại
          </button>
          <button className="px-6 py-2 text-ceramic-dark/60 hover:text-ceramic-dark transition-colors italic">
            Bỏ qua
          </button>
        </motion.div>
      </div>
    </PageTransition>
  )
}
