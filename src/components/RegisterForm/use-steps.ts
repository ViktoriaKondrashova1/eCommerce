import { useState } from 'react'
import { steps } from '@/components/RegisterForm/steps/steps-constructor'

export function useSteps() {
  const [currentStep, setCurrentStep] = useState<number>(0)

  const moveNext = () => {
    setCurrentStep(prev => prev + 1)
  }

  const movePrev = () => {
    setCurrentStep(prev => prev - 1)
  }

  return { steps, currentStep, moveNext, movePrev }
}
