'use client'

import { useState, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'

// DOM-only components — regular imports
import IntroScreen from '@/components/cinematic/IntroScreen'
import BrandScreen from '@/components/cinematic/BrandScreen'
import StoryArticle from '@/components/cinematic/StoryArticle'
import StoryVideo from '@/components/cinematic/StoryVideo'
import ChoiceScreen from '@/components/cinematic/ChoiceScreen'
import JournalBook from '@/components/cinematic/JournalBook'
import LetterEnvelope from '@/components/cinematic/LetterEnvelope'
import ProgressBar from '@/components/cinematic/ProgressBar'

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

export default function CinematicFlow() {
    const [step, setStep] = useState<FlowStep>('intro')

    // Derived: Canvas only mounts for pottery + rain
    const showCanvas = step === 'pottery' || step === 'rain'

    // Transition handlers — forward only
    const goToBrand = useCallback(() => setStep('brand'), [])
    const goToPottery = useCallback(() => setStep('pottery'), [])
    const goToRain = useCallback(() => setStep('rain'), [])
    const goToStory = useCallback(() => setStep('story'), [])
    const goToVideo = useCallback(() => setStep('video'), [])
    const goToChoice = useCallback(() => setStep('choice'), [])
    const goToFinalScreen = useCallback((choice: 'journal' | 'letter') => {
        setStep(choice)
    }, [])

    return (
        <div className="relative min-h-screen">
            {/* Progress bar */}
            <ProgressBar current={STEP_PROGRESS[step]} total={TOTAL_STEPS} />

            {/* ================= WebGL Layer ================= */}
            {/* Only mounted for pottery + rain. Unmounts completely after rain. */}
            {showCanvas && (
                <>
                    {/* 1. LỚP NỀN: BÌNH GỐM (Luôn hiện ở cả màn pottery và màn rain) */}
                    <div className="fixed inset-0 z-10">
                        <PotteryViewer
                            isTransitioning={step === 'rain'} // Truyền trạng thái để ẩn UI
                            onExplore={goToRain}
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
                        <StoryArticle key="story" onNext={goToVideo} />
                    )}
                    {step === 'video' && (
                        <StoryVideo key="video" onNext={goToChoice} />
                    )}
                    {step === 'choice' && (
                        <ChoiceScreen key="choice" onChoice={goToFinalScreen} />
                    )}
                    {step === 'journal' && (
                        <JournalBook key="journal" />
                    )}
                    {step === 'letter' && (
                        <LetterEnvelope key="letter" />
                    )}
                </AnimatePresence>
            )}
        </div>
    )
}
