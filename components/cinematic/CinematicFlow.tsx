'use client'

import { useState, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import type { ScanPageData } from '@/lib/types'

// ProgressBar — always visible, static import
import ProgressBar from '@/components/cinematic/ProgressBar'

// DOM screen components — lazy loaded for code splitting
const IntroScreen = dynamic(() => import('@/components/cinematic/IntroScreen'))
const BrandScreen = dynamic(() => import('@/components/cinematic/BrandScreen'))
const StoryArticle = dynamic(() => import('@/components/cinematic/StoryArticle'))
const StoryVideo = dynamic(() => import('@/components/cinematic/StoryVideo'))
const ChoiceScreen = dynamic(() => import('@/components/cinematic/ChoiceScreen'))
const JournalBook = dynamic(() => import('@/components/cinematic/JournalBook'))
const LetterEnvelope = dynamic(() => import('@/components/cinematic/LetterEnvelope'))

// WebGL components — lazy loaded, SSR disabled
const PotteryViewer = dynamic(
    () => import('@/components/cinematic/PotteryViewer'),
    { ssr: false }
)

const RainTransition = dynamic(
    () => import('@/components/cinematic/RainTransition'),
    { ssr: false }
)

/**
 * State machine for the cinematic flow.
 *
 * intro → brand → pottery → rain → story → video → choice → journal|letter
 *
 * Canvas only exists for pottery + rain.
 * After rain completes, showCanvas = false → Canvas unmounts → GPU freed.
 * State only moves forward (no back-navigation to WebGL states).
 *
 * Conditional flow after video:
 *   AVAILABLE    → choice (user picks journal or letter)
 *   WISH_LOCKED  → letter (skip choice)
 *   DIARY_LOCKED → journal (skip choice)
 */

type FlowStep =
    | 'intro'
    | 'brand'
    | 'pottery'
    | 'rain'
    | 'story'
    | 'video'
    | 'choice'
    | 'journal'
    | 'letter'

// Map steps to progress bar position (1-based)
const STEP_PROGRESS: Record<FlowStep, number> = {
    intro: 1,
    brand: 2,
    pottery: 3,
    rain: 3,
    story: 4,
    video: 5,
    choice: 6,
    journal: 7,
    letter: 7,
}

const TOTAL_STEPS = 7

interface CinematicFlowProps {
    initialData: ScanPageData
}

export default function CinematicFlow({ initialData }: CinematicFlowProps) {
    const { chip, product, interactions } = initialData
    const [step, setStep] = useState<FlowStep>('intro')

    // Derived: Canvas only mounts for pottery + rain
    const showCanvas = step === 'pottery' || step === 'rain'

    // Transition handlers — forward only
    const goToBrand = useCallback(() => setStep('brand'), [])
    const goToPottery = useCallback(() => setStep('pottery'), [])
    const goToRain = useCallback(() => setStep('rain'), [])
    const goToStory = useCallback(() => setStep('story'), [])
    const goToVideo = useCallback(() => setStep('video'), [])

    // After video: conditional routing based on chip status
    const goToPostVideo = useCallback(() => {
        switch (chip.status) {
            case 'WISH_LOCKED':
                setStep('letter')
                break
            case 'DIARY_LOCKED':
                setStep('journal')
                break
            case 'AVAILABLE':
            default:
                setStep('choice')
                break
        }
    }, [chip.status])

    const goToFinalScreen = useCallback((choice: 'journal' | 'letter') => {
        setStep(choice)
    }, [])

    return (
        <div className="relative min-h-screen" style={{ backgroundColor: '#F5F0E6' }}>
            {/* Progress bar */}
            <ProgressBar current={STEP_PROGRESS[step]} total={TOTAL_STEPS} />

            {/* ================= WebGL Layer ================= */}
            {/* Only mounted for pottery + rain. Unmounts completely after rain. */}
            {showCanvas && (
                <>
                    {/* 1. LỚP NỀN: BÌNH GỐM (Luôn hiện ở cả màn pottery và màn rain) */}
                    <div className="fixed inset-0 z-10">
                        <PotteryViewer
                            isTransitioning={step === 'rain'}
                            onExplore={goToRain}
                            modelUrl={product.model_3d_url ?? undefined}
                            productName={product.name}
                            description={product.description ?? undefined}
                        />
                    </div>

                    {/* 2. LỚP KÍNH MƯA: Chỉ hiện lên đè vào khi bắt đầu mưa */}
                    {step === 'rain' && (
                        <div className="fixed inset-0 z-50 pointer-events-none">
                            <RainTransition onComplete={goToStory} />
                        </div>
                    )}
                </>
            )}

            {/* ================= DOM Layer ================= */}
            {/* All non-WebGL screens */}
            {!showCanvas && (
                <AnimatePresence mode="wait">
                    {step === 'intro' && (
                        <IntroScreen key="intro" onNext={goToBrand} />
                    )}
                    {step === 'brand' && (
                        <BrandScreen key="brand" onNext={goToPottery} />
                    )}
                    {step === 'story' && (
                        <StoryArticle
                            key="story"
                            onNext={goToVideo}
                            storyText={product.story_text ?? undefined}
                        />
                    )}
                    {step === 'video' && (
                        <StoryVideo
                            key="video"
                            onNext={goToPostVideo}
                            videoUrl={product.video_url ?? undefined}
                        />
                    )}
                    {step === 'choice' && (
                        <ChoiceScreen key="choice" onChoice={goToFinalScreen} />
                    )}
                    {step === 'journal' && (
                        <JournalBook
                            key="journal"
                            chipId={chip.id}
                            interactions={interactions}
                        />
                    )}
                    {step === 'letter' && (
                        <LetterEnvelope
                            key="letter"
                            chipId={chip.id}
                            interactions={interactions}
                        />
                    )}
                </AnimatePresence>
            )}
        </div>
    )
}
