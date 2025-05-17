import { useState } from 'react'
import { steps } from '@/components/RegisterForm/steps/steps-constructor'

export function useSteps() {
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [percentStep, setPercentStep] = useState<number>(0)

  const moveNext = () => {
    setCurrentStep(prev => prev + 1)
    setPercentStep(prev => prev + 100 / steps.length)
  }

  const movePrev = () => {
    setCurrentStep(prev => prev - 1)
    setPercentStep(prev => prev - 100 / steps.length)
  }

  return { steps, currentStep, percentStep, moveNext, movePrev }
}
