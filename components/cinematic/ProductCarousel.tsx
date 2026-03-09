'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, PanInfo } from 'framer-motion'
import FloatingImage from '@/components/animations/FloatingImage'
import MaterialReveal from '@/components/animations/MaterialReveal'
import { POTTERY_EASE } from '@/lib/animation-config'

const products = [
    {
        id: 'gom',
        image: '/Gom.png',
        name: 'Gốm Hội An',
        details: [
            { label: 'Chất liệu', value: 'Đất sét Thanh Hà' },
            { label: 'Hoàn thiện', value: 'Hoàn toàn làm tay' },
        ],
    },
    {
        id: 'luhuong',
        image: '/Luhuong.png',
        name: 'Lư Hương',
        details: [
            { label: 'Chất liệu', value: 'Đất sét Thanh Hà' },
            { label: 'Hoàn thiện', value: 'Hoàn toàn làm tay' },
        ],
    },
]

export default function ProductCarousel() {
    const [current, setCurrent] = useState(0)
    const constraintsRef = useRef(null)

    const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        const threshold = 50
        if (info.offset.x < -threshold && current < products.length - 1) {
            setCurrent(current + 1)
        } else if (info.offset.x > threshold && current > 0) {
            setCurrent(current - 1)
        }
    }

    const product = products[current]

    return (
        <div className="w-full flex flex-col items-center gap-6">
            {/* Carousel viewport */}
            <div
                ref={constraintsRef}
                className="relative w-full overflow-hidden"
                style={{ minHeight: 320 }}
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={product.id}
                        initial={{ opacity: 0, x: 60 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -60 }}
                        transition={{ duration: 0.7, ease: POTTERY_EASE }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.2}
                        onDragEnd={handleDragEnd}
                        className="flex flex-col items-center cursor-grab active:cursor-grabbing"
                    >
                        <FloatingImage
                            src={product.image}
                            alt={product.name}
                            width={200}
                            height={260}
                        />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Product details */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={product.id + '-details'}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5, ease: POTTERY_EASE }}
                    className="text-center space-y-3"
                >
                    <h3 className="font-serif text-xl text-stone-200">{product.name}</h3>
                    <div className="space-y-1">
                        {product.details.map((detail) => (
                            <p key={detail.label} className="text-sm text-stone-500">
                                <span className="text-faifo-terracotta">{detail.label}:</span>{' '}
                                {detail.value}
                            </p>
                        ))}
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Dot indicators */}
            <div className="flex items-center gap-2">
                {products.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrent(idx)}
                        className={`w-2 h-2 rounded-full transition-all duration-500 ${idx === current
                                ? 'bg-faifo-terracotta w-6'
                                : 'bg-stone-600'
                            }`}
                        aria-label={`Product ${idx + 1}`}
                    />
                ))}
            </div>
        </div>
    )
}
