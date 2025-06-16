import type { Tuple } from '@/shared/types/tuple.ts'
import { useEffect, useState } from 'react'

export function useRange({ defaultMin, defaultMax, onChange, shouldUpdate }: { defaultMin: number, defaultMax: number, onChange: (value: Tuple) => void, shouldUpdate: boolean }): {
  valueRange: Tuple
  handleChangeRange: (index: 0 | 1, value: number | null) => void
  handleSliderChange: (value: number[]) => void
} {
  const [valueRange, setValueRange] = useState<Tuple>([defaultMin, defaultMax])

  useEffect(() => {
    if (shouldUpdate) {
      setValueRange([defaultMin, defaultMax])
    }
  }, [shouldUpdate])

  const handleChangeRange = (index: 0 | 1, value: number | null): void => {
    if (value !== null) {
      const newRange: Tuple = [...valueRange]
      newRange[index] = value
      setValueRange(() => newRange)
      onChange(newRange)
    }
  }

  const handleSliderChange = (value: number[]): void => {
    if (value.length === 2) {
      setValueRange([value[0], value[1]])
      onChange([value[0], value[1]])
    }
  }

  return {
    valueRange,
    handleChangeRange,
    handleSliderChange,
  }
}
