'use client'

import { motion } from 'framer-motion'
import { PageTransition } from '../page-transition'

interface Step3Props {
  onNext: () => void
  onBack: () => void
}

const attributes = [
  { label: 'Kích thước', value: '8cm Ø / 9cm Cao' },
  { label: 'Màu men', value: 'Tự nhiên / Xanh ngọc' },
  { label: 'Dòng sản phẩm', value: 'Ly gốm Faifo' },
]

export default function Step3Product({ onNext, onBack }: Step3Props) {
  return (
    <PageTransition>
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 sm:p-8 space-y-6">
          {/* Header */}
          <div className="space-y-2">
            <motion.p
              className="text-sm text-ceramic-dark/60 uppercase tracking-wider"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              Bạn đang trên tay
            </motion.p>
            <motion.h2
              className="font-serif text-4xl sm:text-5xl font-bold text-ceramic-dark"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Ly gốm Faifo
            </motion.h2>
          </div>

          {/* Product image placeholder */}
          <motion.div
            className="h-64 sm:h-80 bg-gradient-to-br from-ceramic-blue/20 to-ceramic-brown/20 rounded-lg flex items-center justify-center overflow-hidden relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <svg viewBox="0 0 100 140" className="w-24 h-32 sm:w-32 sm:h-40 opacity-70">
              <defs>
                <linearGradient id="productGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2A4B7C" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#722620" stopOpacity="0.6" />
                </linearGradient>
              </defs>
              <ellipse cx="50" cy="95" rx="28" ry="35" fill="url(#productGradient)" />
              <path
                d="M 35 65 Q 35 55 40 50 Q 40 45 50 42 Q 60 45 60 50 Q 65 55 65 65 Z"
                fill="url(#productGradient)"
              />
              <ellipse cx="50" cy="40" rx="15" ry="8" fill="url(#productGradient)" opacity="0.8" />
            </svg>
          </motion.div>

          {/* Description */}
          <motion.div
            className="space-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <p className="text-ceramic-dark/80 leading-relaxed">
              Dát sét truyền thống, nụng thủ công Hoàn toàn làm tay — không có hai chiếc giống nhau
            </p>
          </motion.div>

          {/* Attributes */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-ceramic-gray"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            {attributes.map((attr, index) => (
              <motion.div
                key={attr.label}
                className="space-y-1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <p className="text-xs text-ceramic-dark/60 uppercase tracking-wider">
                  {attr.label}
                </p>
                <p className="text-ceramic-dark font-medium">{attr.value}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Tagline */}
          <motion.div
            className="pt-4 space-y-1 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.7 }}
          >
            <p className="text-ceramic-dark/70 italic">Chúng tôi không chỉ làm gốm</p>
            <p className="text-ceramic-dark/70 italic">Chúng tôi lưu giữ ký ức.</p>
          </motion.div>

          {/* Navigation */}
          <motion.div
            className="flex gap-4 pt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.8 }}
          >
            <button
              onClick={onBack}
              className="flex-1 px-4 py-2 text-ceramic-dark/60 hover:text-ceramic-dark transition-colors"
            >
              Quay lại
            </button>
            <button
              onClick={onNext}
              className="flex-1 px-4 py-2 bg-ceramic-brown text-white rounded-lg hover:bg-ceramic-brown/90 transition-colors"
            >
              Tiếp theo
            </button>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}
