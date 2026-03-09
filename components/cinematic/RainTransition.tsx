'use client'

import { useRef, useMemo, useCallback, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { rainVertexShader, rainFragmentShader } from '@/lib/shaders/rainTransition'

interface RainTransitionProps {
    onComplete: () => void
}

function RainQuad({ onComplete }: { onComplete: () => void }) {
    const meshRef = useRef<THREE.Mesh>(null)
    const startTimeRef = useRef(performance.now() / 1000);
    const completedRef = useRef(false)
    const { gl, size } = useThree()

    const pixelSize = useMemo(() => {
        const dpr = gl.getPixelRatio()
        return new THREE.Vector2(size.width * dpr, size.height * dpr)
    }, [gl, size.width, size.height])

    const uniforms = useRef({
        iTime: { value: 0.0 },
        iResolution: { value: new THREE.Vector2(pixelSize.x, pixelSize.y) },
        fadeProgress: { value: 0.0 },
    })

    useEffect(() => {
        startTimeRef.current = performance.now()
        console.log('RainQuad mounted, resolution:', pixelSize.x, 'x', pixelSize.y)
    }, [])

    useEffect(() => {
        uniforms.current.iResolution.value.set(pixelSize.x, pixelSize.y)
    }, [pixelSize])

    useFrame(() => {
        const elapsed = (performance.now() - startTimeRef.current) / 1000
        uniforms.current.iTime.value = elapsed

        if (elapsed > 3.0) {
            uniforms.current.fadeProgress.value = Math.min(elapsed - 3.0, 1.0)
        }

        if (elapsed > 4.0 && !completedRef.current) {
            completedRef.current = true
            console.log('RainQuad complete at', elapsed.toFixed(2), 's')
            onComplete()
        }
    })

    return (
        // @ts-ignore
        <mesh ref={meshRef}>
            {/* @ts-ignore */}
            <planeGeometry args={[2, 2]} />
            {/* @ts-ignore */}
            <shaderMaterial
                vertexShader={rainVertexShader}
                fragmentShader={rainFragmentShader}
                uniforms={uniforms.current}
                depthTest={false}
                depthWrite={false}
            />
        </mesh>
    )
}

export default function RainTransition({ onComplete }: RainTransitionProps) {
    const [isActive, setIsActive] = useState(true)

    useEffect(() => {
        console.log('RainTransition MOUNTED')
        return () => console.log('RainTransition UNMOUNTED')
    }, [])

    const handleComplete = useCallback(() => {
        console.log('RainTransition handleComplete')
        setIsActive(false)
        setTimeout(onComplete, 200)
    }, [onComplete])

    if (!isActive) return null

    return (
        <div className="fixed inset-0 z-[100] pointer-events-none" style={{ backgroundColor: 'transparent' }}>
            <Canvas
                gl={{ alpha: true }}
                orthographic
                camera={{
                    zoom: 1,
                    position: [0, 0, 1],
                    left: -1,
                    right: 1,
                    top: 1,
                    bottom: -1,
                    near: 0.1,
                    far: 10
                }}
            >
                <RainQuad onComplete={handleComplete} />
            </Canvas>
        </div>
    )
}
