import type { BaseComponent } from '@/shared/types/common.types.ts'
import type { Tuple } from '@/shared/types/tuple.ts'
import type { FC } from 'react'

import { Flex, InputNumber, Slider, Space } from 'antd'
import { AppTitle } from '../../../../components/AppTitle/AppTitle.tsx'
import { useRange } from './useRange.ts'

interface Props extends BaseComponent {
  title: string
  icon: string
  minValue: number
  maxValue: number
  onChange: (value: Tuple) => void
  shouldUpdate: boolean
}

export const RangeFilter: FC<Props> = ({ testId = 'range-filter', title, icon, minValue, maxValue, onChange, shouldUpdate }) => {
  const isPrice = icon === '$'

  const { valueRange, handleChangeRange, handleSliderChange } = useRange({
    defaultMin: minValue,
    defaultMax: maxValue,
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
