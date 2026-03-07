'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ProgressBar } from './progress-bar'
import { PageTransition } from './page-transition'
import Step1Greeting from './steps/step1-greeting'
import Step2Pulse from './steps/step2-pulse'
import Step3Product from './steps/step3-product'
import Step4Video from './steps/step4-video'
import Step5Choice from './steps/step5-choice'

const TOTAL_STEPS = 5

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
        return <Step2Pulse onNext={handleNext} onBack={handleBack} />
      case 3:
        return <Step3Product onNext={handleNext} onBack={handleBack} />
      case 4:
        return <Step4Video onNext={handleNext} onBack={handleBack} />
      case 5:
        return <Step5Choice onBack={handleBack} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-ceramic-light flex flex-col">
      <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="flex-1 flex items-center justify-center px-4 py-8 sm:px-6"
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
