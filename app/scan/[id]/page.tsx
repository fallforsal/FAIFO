'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { fetchScanData } from '@/lib/queries'
import type { ScanPageData } from '@/lib/types'
import dynamic from 'next/dynamic'
import MaterialReveal from '@/components/animations/MaterialReveal'
import { useGLTF } from '@react-three/drei'

// Lazy-load CinematicFlow
const CinematicFlow = dynamic(
    () => import('@/components/cinematic/CinematicFlow'),
    { ssr: false }
)

type PageState = 'loading' | 'not-found' | 'ready'

export default function ScanPage() {
    const params = useParams<{ id: string }>()
    const chipId = params?.id

    const [pageState, setPageState] = useState<PageState>('loading')
    const [data, setData] = useState<ScanPageData | null>(null)

    useEffect(() => {
        if (!chipId) {
            setPageState('not-found')
            return
        }

        let cancelled = false

        async function loadData() {
            const result = await fetchScanData(chipId as string)

            if (cancelled) return

            if (result) {
                // KÍCH HOẠT PRELOAD NGAY LẬP TỨC KHI CÓ DATA
                if (result.product?.model_3d_url) {
                    try {
                        useGLTF.preload(result.product.model_3d_url)
                    } catch (e) {
                        console.error("Preload failed", e)
                    }
                }

                setData(result)
                setPageState('ready')
            } else {
                setPageState('not-found')
            }
        }

        loadData()
        return () => { cancelled = true }
    }, [chipId])

    return (
        <>
            {/* 1. Kỹ thuật Preload tầng Browser */}
            {data?.product?.model_3d_url && (
                <link
                    rel="preload"
                    href={data.product.model_3d_url}
                    as="fetch"
                    crossOrigin="anonymous"
                />
            )}

            {/* 2. Màn hình Loading (trong lúc này file .glb đang được tải ngầm) */}
            {pageState === 'loading' && (
                <div
                    className="fixed inset-0 flex flex-col items-center justify-center"
                    style={{ backgroundColor: '#F5F0E6' }}
                >
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div
                            className="w-64 h-64 rounded-full opacity-20"
                            style={{
                                background:
                                    'radial-gradient(circle, rgba(154, 52, 18, 0.3) 0%, transparent 70%)',
                            }}
                        />
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, ease: 'easeInOut' }}
                        className="text-center relative z-10"
                    >
                        <p className="text-xl text-stone-800 font-serif mb-4">
                            Xin Chào.
                        </p>
                        <motion.p
                            className="text-sm text-stone-500"
                            animate={{ opacity: [0.3, 0.7, 0.3] }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        >
                            Đang chuẩn bị câu chuyện...
                        </motion.p>
                    </motion.div>
                </div>
            )}

            {/* 3. Màn hình Not Found */}
            {pageState === 'not-found' && (
                <div
                    className="fixed inset-0 flex flex-col items-center justify-center px-8"
                    style={{ backgroundColor: '#F5F0E6' }}
                >
                    <MaterialReveal delay={0.2} className="text-center">
                        <p className="text-4xl mb-4">🏺</p>
                        <h1 className="font-serif text-2xl text-stone-800 mb-3">
                            Không tìm thấy
                        </h1>
                        <p className="text-sm text-stone-600 leading-relaxed max-w-[280px]">
                            Chiếc gốm này chưa được kích hoạt hoặc mã NFC không hợp lệ.
                        </p>
                    </MaterialReveal>
                </div>
            )}

            {/* 4. Vào Flow chính */}
            {pageState === 'ready' && data && (
                <CinematicFlow initialData={data} />
            )}
        </>
    )
}