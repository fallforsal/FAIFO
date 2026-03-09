'use client'

import { useState, useCallback } from 'react'

export interface UseStepNavigationReturn {
  currentStep: number
  progress: number
  isFirstStep: boolean
  isLastStep: boolean
  nextStep: () => void
  prevStep: () => void
  goToStep: (step: number) => void
  reset: () => void
}

export function useStepNavigation(
  initialStep: number = 1,
  totalSteps: number = 6
): UseStepNavigationReturn {
  const [currentStep, setCurrentStep] = useState(initialStep)

  const progress = (currentStep / totalSteps) * 100

  const isFirstStep = currentStep === 1
  const isLastStep = currentStep === totalSteps

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => {
      if (prev >= totalSteps) return prev
      return prev + 1
    })
  }, [totalSteps])

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => {
      if (prev <= 1) return prev
      return prev - 1
    })
  }, [])

  const goToStep = useCallback((step: number) => {
    if (step >= 1 && step <= totalSteps) {
      setCurrentStep(step)
    }
  }, [totalSteps])

  const reset = useCallback(() => {
    setCurrentStep(initialStep)
  }, [initialStep])

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
