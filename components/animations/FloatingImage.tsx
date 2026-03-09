'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface FloatingImageProps {
    src: string
    alt: string
    width?: number
    height?: number
    className?: string
    glowing?: boolean
}

export default function FloatingImage({
    src,
    alt,
    width = 240,
    height = 320,
    className = '',
    glowing = true,
}: FloatingImageProps) {
    return (
        <div className="relative flex items-center justify-center">
            {/* Soft glow behind */}
            {glowing && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                        className="rounded-full"
                        style={{
                            width: width * 0.8,
                            height: width * 0.8,
                            background: 'radial-gradient(circle, rgba(154, 52, 18, 0.15) 0%, transparent 70%)',
                        }}
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 0.8, 0.5],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    />
                </div>
            )}

            {/* Floating product */}
            <motion.div
                animate={{
                    y: [0, -12, 0],
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
                className={className}
            >
                <Image
                    src={src}
                    alt={alt}
                    width={width}
                    height={height}
                    className="product-glow object-contain"
                    priority
                />
            </motion.div>
        </div>
    )
}
