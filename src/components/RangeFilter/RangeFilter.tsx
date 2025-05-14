import type { BaseComponent } from '@/shared/types/common.types'
import type { FC } from 'react'
import { Flex, InputNumber, Slider, Space } from 'antd'
import { useState } from 'react'
import { AppTitle } from '../AppTitle/AppTitle'

interface Props extends BaseComponent {
  isPrice: boolean
  minValue: number
  maxValue: number
}

export const RangeFilter: FC<Props> = ({ testId = 'range-filter', isPrice, minValue, maxValue }) => {
  const icon = isPrice ? '$' : '%'
  const title = isPrice ? 'Price, $' : 'ABV, %'

  const [valueRange, setValueRange] = useState<number[]>([minValue, maxValue])

  const handleMinChange = (value: number | null): void => {
    if (value !== null) {
      setValueRange([value, valueRange[1]])
    }
  }

  const handleMaxChange = (value: number | null): void => {
    if (value !== null) {
      setValueRange([valueRange[0], value])
    }
  }

  const handleSliderChange = (value: number[]): void => {
    setValueRange(value)
  }

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
            onChange={handleMinChange}
          />
          <InputNumber
            style={{ width: '100%' }}
            prefix={isPrice ? icon : undefined}
            suffix={isPrice ? undefined : icon}
            max={maxValue}
            min={valueRange[0]}
            value={valueRange[1]}
            onChange={handleMaxChange}
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
