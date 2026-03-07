'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ProgressBar } from './progress-bar'
import Step1Greeting from './steps/step1-greeting'
import Step2Vase from './steps/step2-vase'
import Step3FaifoThanks from './steps/step3-faifo-thanks'
import Step4BallTransition from './steps/step4-ball-transition'
import Step5CupWater from './steps/step5-cup-water'
import Step6ArtisanZoom from './steps/step6-artisan-zoom'
import Step7Video from './steps/step7-video'
import Step8Choice from './steps/step8-choice'

const TOTAL_STEPS = 8

export function StoryContainer() {
  const [currentStep, setCurrentStep] = useState(1)

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1Greeting onNext={handleNext} />
      case 2:
        return <Step2Vase onNext={handleNext} onBack={handleBack} />
      case 3:
        return <Step3FaifoThanks onNext={handleNext} onBack={handleBack} />
      case 4:
        return <Step4BallTransition onNext={handleNext} onBack={handleBack} />
      case 5:
        return <Step5CupWater onNext={handleNext} onBack={handleBack} />
      case 6:
        return <Step6ArtisanZoom onNext={handleNext} onBack={handleBack} />
      case 7:
        return <Step7Video onNext={handleNext} onBack={handleBack} />
      case 8:
        return <Step8Choice onBack={handleBack} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-ceramic-beige flex flex-col">
      <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 flex items-center justify-center w-full"
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
