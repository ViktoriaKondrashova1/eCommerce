import type { FC } from 'react'
import type { BaseComponent } from '@/shared/types/common.types'
import { Flex, InputNumber, Slider, Space } from 'antd'
import { useEffect, useState } from 'react'

import { AppTitle } from '../AppTitle/AppTitle'

type Tuple = [number, number]

interface Props extends BaseComponent {
  title: string
  icon: string
  minValue: number
  maxValue: number
  onChange: (value: Tuple) => void
  shouldUpdate: boolean
  initialValue: number[] | []
}

function useRange({ defaultMin, defaultMax, onChange, shouldUpdate }: { defaultMin: number, defaultMax: number, onChange: (value: Tuple) => void, shouldUpdate: boolean }): {
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

export const RangeFilter: FC<Props> = ({ testId = 'range-filter', title, icon, minValue, maxValue, initialValue, onChange, shouldUpdate }) => {
  const isPrice = icon === '$'

  const { valueRange, handleChangeRange, handleSliderChange } = useRange({
    defaultMin: initialValue?.[0] ?? minValue,
    defaultMax: initialValue?.[1] ?? maxValue,
    onChange,
    shouldUpdate,
  })

  return (
    <div style={{ padding: '16px 0' }} data-testid={testId}>
      <AppTitle level={5}>{title}</AppTitle>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Flex gap="small">
          <InputNumber
            style={{ width: '100%' }}
            prefix={isPrice ? icon : undefined}
            suffix={isPrice ? undefined : icon}
            min={minValue}
            max={valueRange[1]}
            value={valueRange[0]}
            onChange={value => handleChangeRange(0, value)}
          />
          <InputNumber
            style={{ width: '100%' }}
            prefix={isPrice ? icon : undefined}
            suffix={isPrice ? undefined : icon}
            max={maxValue}
            min={valueRange[0]}
            value={valueRange[1]}
            onChange={value => handleChangeRange(1, value)}
          />
        </Flex>
        <Slider
          range
          min={minValue}
          max={maxValue}
          step={1}
          value={valueRange}
          onChange={handleSliderChange}
          tooltip={{ formatter: value => isPrice ? `${icon}${value}` : `${value}${icon}` }}
        />
      </Space>
    </div>
  )
}
