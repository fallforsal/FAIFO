'use client'

import { useState, useCallback, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import type { ScanPageData } from '@/lib/types'
import { useGLTF } from '@react-three/drei'

import ProgressBar from '@/components/cinematic/ProgressBar'

const IntroScreen = dynamic(() => import('@/components/cinematic/IntroScreen'))
const BrandScreen = dynamic(() => import('@/components/cinematic/BrandScreen'))
const StoryArticle = dynamic(() => import('@/components/cinematic/StoryArticle'))
const StoryVideo = dynamic(() => import('@/components/cinematic/StoryVideo'))
const ChoiceScreen = dynamic(() => import('@/components/cinematic/ChoiceScreen'))
const JournalBook = dynamic(() => import('@/components/cinematic/JournalBook'))
const LetterEnvelope = dynamic(() => import('@/components/cinematic/LetterEnvelope'))
const FinalScreen = dynamic(() => import('@/components/cinematic/FinalScreen'))

const PotteryViewer = dynamic(
    () => import('@/components/cinematic/PotteryViewer'),
    { ssr: false }
)

const RainTransition = dynamic(
    () => import('@/components/cinematic/RainTransition'),
    { ssr: false }
)

type FlowStep = 'intro' | 'brand' | 'pottery' | 'rain' | 'story' | 'video' | 'choice' | 'journal' | 'letter' | 'final'

const STEP_PROGRESS: Record<FlowStep, number> = {
    intro: 1, brand: 2, pottery: 3, rain: 3, story: 4, video: 5, choice: 6, journal: 7, letter: 7, final: 8,
}
const TOTAL_STEPS = 8

interface CinematicFlowProps {
    initialData: ScanPageData
}

export default function CinematicFlow({ initialData }: CinematicFlowProps) {
    const { chip, product, interactions } = initialData
    const [step, setStep] = useState<FlowStep>('intro')

    // TẢI NGẦM TRONG LÚC CHẠY CINEMATIC
    useEffect(() => {
        if (product.model_3d_url) {
            useGLTF.preload(product.model_3d_url)
        }
    }, [product.model_3d_url])

    const showCanvas = step === 'pottery' || step === 'rain'

    const goToBrand = useCallback(() => setStep('brand'), [])
    const goToPottery = useCallback(() => setStep('pottery'), [])
    const goToRain = useCallback(() => setStep('rain'), [])
    const goToStory = useCallback(() => setStep('story'), [])
    const goToVideo = useCallback(() => setStep('video'), [])

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

    const handleSaveComplete = useCallback(() => {
        setStep('final')
    }, [])

    return (
        <div className="relative min-h-screen" style={{ backgroundColor: '#F5F0E6' }}>
            <ProgressBar current={STEP_PROGRESS[step]} total={TOTAL_STEPS} />

            {showCanvas && (
                <>
                    <div className="fixed inset-0 z-10">
                        <PotteryViewer
                            isTransitioning={step === 'rain'}
                            onExplore={goToRain}
                            modelUrl={product.model_3d_url ?? undefined}
                            productName={product.name}
                            description={product.description ?? undefined}
                        />
                    </div>

                    {step === 'rain' && (
                        <div className="fixed inset-0 z-50 pointer-events-none">
                            <RainTransition onComplete={goToStory} />
                        </div>
                    )}
                </>
            )}

            {!showCanvas && (
                <AnimatePresence mode="wait">
                    {step === 'intro' && <IntroScreen key="intro" onNext={goToBrand} />}
                    {step === 'brand' && <BrandScreen key="brand" onNext={goToPottery} />}
                    {step === 'story' && <StoryArticle key="story" onNext={goToVideo} storyText={product.story_text ?? undefined} />}
                    {step === 'video' && <StoryVideo key="video" onNext={goToPostVideo} videoUrl={product.video_url ?? undefined} />}
                    {step === 'choice' && <ChoiceScreen key="choice" onChoice={goToFinalScreen} />}
                    {step === 'journal' && <JournalBook key="journal" chipId={chip.id} interactions={interactions} onSaveComplete={handleSaveComplete} />}
                    {step === 'letter' && <LetterEnvelope key="letter" chipId={chip.id} interactions={interactions} onSaveComplete={handleSaveComplete} isReadOnly={chip.status === 'WISH_LOCKED'} />}
                    {step === 'final' && <FinalScreen key="final" />}
                </AnimatePresence>
            )}
        </div>
    )
}