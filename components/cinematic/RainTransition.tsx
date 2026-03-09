'use client'

import { useRef, useCallback, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
// Đảm bảo import đúng đường dẫn shader của bạn
import { rainVertexShader, rainFragmentShader } from '@/lib/shaders/rainTransition'

interface RainTransitionProps {
    onComplete: () => void
}

// 1. COMPONENT CON (Chứa Mesh, Shader và logic thời gian)
function RainQuad({ onComplete }: RainTransitionProps) {
    const meshRef = useRef<THREE.Mesh>(null)
    const completedRef = useRef(false)

    // Khởi tạo Uniforms cho Shader
    const uniforms = useRef({
        iTime: { value: 0.0 },
        iResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        fadeProgress: { value: 0.0 }
    })

    // Vòng lặp Frame
    useFrame((state) => {
        if (completedRef.current) return

        const elapsed = state.clock.getElapsedTime();
        uniforms.current.iTime.value = elapsed;

        // Bắt đầu làm đục kính sương mù sau 4.5 giây
        if (elapsed > 0.5) {
            uniforms.current.fadeProgress.value = Math.min((elapsed - 0.5) / 4.5, 1.0);
        }

        // Kết thúc và chuyển cảnh ở giây thứ 6.0
        if (elapsed > 6.0) {
            completedRef.current = true;
            onComplete();
        }
    })

    return (
        <mesh ref={meshRef}>
            <planeGeometry args={[2, 2]} />
            <shaderMaterial
                transparent={true} // Bật trong suốt
                vertexShader={rainVertexShader}
                fragmentShader={rainFragmentShader}
                uniforms={uniforms.current}
            />
        </mesh>
    )
}

// 2. COMPONENT CHA (Render Canvas đè lên trên)
export default function RainTransition({ onComplete }: RainTransitionProps) {
    const [isActive, setIsActive] = useState(true)

    const handleComplete = useCallback(() => {
        setIsActive(false)
        setTimeout(onComplete, 100)
    }, [onComplete])

    if (!isActive) return null

    return (
        <div className="fixed inset-0 z-[100] pointer-events-none" style={{ backgroundColor: 'transparent' }}>
            <Canvas
                gl={{ alpha: true, antialias: false }} // Bật alpha cho Canvas
                orthographic
                camera={{ zoom: 1, position: [0, 0, 1], left: -1, right: 1, top: 1, bottom: -1, near: 0.1, far: 10 }}
            >
                <RainQuad onComplete={handleComplete} />
            </Canvas>
        </div>
    )
}