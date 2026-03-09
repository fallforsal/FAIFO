'use client'

import { useEffect, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import { motion } from 'framer-motion'
import * as THREE from 'three'
import MaterialReveal from '@/components/animations/MaterialReveal'

useGLTF.preload('/model/faifo-pottery.glb')

interface PotteryViewerProps {
    onExplore: () => void
}

function PotteryModel() {
    const { scene } = useGLTF('/model/faifo-pottery.glb')

    useEffect(() => {
        const box = new THREE.Box3().setFromObject(scene)
        const center = box.getCenter(new THREE.Vector3())
        scene.position.sub(center)

        const size = box.getSize(new THREE.Vector3())
        const maxDim = Math.max(size.x, size.y, size.z)
        const scale = 2.2 / maxDim
        scene.scale.setScalar(scale)

        scene.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.castShadow = false
                child.receiveShadow = false
            }
        })

        return () => {
            scene.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                    child.geometry.dispose()
                    const mats = Array.isArray(child.material) ? child.material : [child.material]
                    mats.forEach((m) => {
                        Object.values(m).forEach((v) => {
                            if (v instanceof THREE.Texture) v.dispose()
                        })
                        m.dispose()
                    })
                }
            })
        }
    }, [scene])

    // @ts-ignore
    return <primitive object={scene} />
}

export default function PotteryViewer({ onExplore }: PotteryViewerProps) {
    return (
        <div className="relative w-full h-screen" style={{ backgroundColor: '#F5F0E6' }}>
            <Canvas
                dpr={[1, 1.5]}
                gl={{
                    antialias: true,
                    alpha: false,
                    powerPreference: 'high-performance',
                    preserveDrawingBuffer: true,
                }}
                camera={{ position: [0, 0.5, 4], fov: 45 }}
                style={{ background: '#F5F0E6' }}
            >
                <Suspense fallback={null}>
                    <PotteryModel />
                </Suspense>

                {/* @ts-ignore */}
                <ambientLight intensity={0.7} color="#fff5e6" />
                {/* @ts-ignore */}
                <pointLight position={[4, 5, 4]} intensity={1.0} color="#ffeedd" />
                {/* @ts-ignore */}
                <pointLight position={[-3, -1, 3]} intensity={0.4} color="#e8ddd4" />

                <OrbitControls
                    enableDamping
                    dampingFactor={0.08}
                    enablePan={false}
                    minDistance={2.5}
                    maxDistance={6}
                    minPolarAngle={Math.PI / 6}
                    maxPolarAngle={Math.PI / 1.5}
                />
            </Canvas>

            {/* Overlay — pointer-events-none so Canvas stays interactive */}
            <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6 z-20">
                <div className="text-center mt-4">
                    <MaterialReveal delay={0.5}>
                        <h2 className="font-serif text-2xl text-stone-800 drop-shadow-sm">
                            Bình Gốm Faifo
                        </h2>
                    </MaterialReveal>
                </div>

                <div className="pointer-events-auto">
                    <MaterialReveal delay={1.0}>
                        <div className="bg-white/70 backdrop-blur-md rounded-2xl p-5 border border-stone-200/50 mb-4">
                            <div className="space-y-2 text-sm text-stone-600">
                                <p>🏺 <span className="text-stone-800">Chất liệu:</span> Đất sét truyền thống, nung thủ công</p>
                                <p>🤲 Hoàn toàn làm tay — không có hai chiếc giống nhau</p>
                                <p>🌿 <span className="text-stone-800">Kích thước / màu men:</span> Tùy chiếc</p>
                            </div>
                        </div>
                    </MaterialReveal>

                    <MaterialReveal delay={1.4}>
                        <motion.button
                            whileTap={{ scale: 0.97 }}
                            onClick={onExplore}
                            className="w-full py-4 rounded-xl bg-faifo-terracotta/90 text-white text-sm tracking-wide transition-colors duration-500 hover:bg-faifo-terracotta shadow-lg"
                        >
                            Khám phá câu chuyện
                        </motion.button>
                    </MaterialReveal>
                </div>
            </div>
        </div>
    )
}
