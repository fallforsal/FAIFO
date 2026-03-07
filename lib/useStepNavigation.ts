'use client'

import { useState, useCallback } from 'react'

export const TOTAL_STEPS = 6

export type Step = 1 | 2 | 3 | 4 | 5 | 6

export interface UseStepNavigationReturn {
  currentStep: Step
  progress: number
  isFirstStep: boolean
  isLastStep: boolean
  nextStep: () => void
  prevStep: () => void
  goToStep: (step: Step) => void
  reset: () => void
}

export function useStepNavigation(initialStep: Step = 1): UseStepNavigationReturn {
  const [currentStep, setCurrentStep] = useState<Step>(initialStep)

  const progress = (currentStep / TOTAL_STEPS) * 100

  const isFirstStep = currentStep === 1
  const isLastStep = currentStep === TOTAL_STEPS

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => {
      if (prev === TOTAL_STEPS) return prev
      return (prev + 1) as Step
    })
  }, [])

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => {
      if (prev === 1) return prev
      return (prev - 1) as Step
    })
  }, [])

  const goToStep = useCallback((step: Step) => {
    if (step >= 1 && step <= TOTAL_STEPS) {
      setCurrentStep(step)
    }
  }, [])

  const reset = useCallback(() => {
    setCurrentStep(1)
  }, [])

  return {
    currentStep,
    progress,
    isFirstStep,
    isLastStep,
    nextStep,
    prevStep,
    goToStep,
    reset,
  }
}
