import type { FC } from 'react'
import { Flex, InputNumber, Slider, Space } from 'antd'
import { useState } from 'react'
import { AppTitle } from '../AppTitle/AppTitle'

export const PriceRangeFilter: FC = () => {
  const minBeerPrice = 4.56 // пофетчить данные
  const maxBeerPrice = 8.76 // пофетчить данные

  const [priceRange, setPriceRange] = useState<number[]>([minBeerPrice, maxBeerPrice])

  const handleMinChange = (value: number | null) => {
    if (value !== null) {
      setPriceRange([value, priceRange[1]])
    }
  }

  const handleMaxChange = (value: number | null) => {
    if (value !== null) {
      setPriceRange([priceRange[0], value])
    }
  }

  const handleSliderChange = (value: number[]) => {
    setPriceRange(value)
  }

  return (
    <div style={{ padding: '16px 0' }}>
      <AppTitle level={5}>Price, $</AppTitle>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Flex gap="small">
          <InputNumber
            style={{ width: '100%' }}
            prefix="$"
            min={minBeerPrice}
            max={priceRange[1]}
            value={priceRange[0]}
            onChange={handleMinChange}
          />
          <InputNumber
            style={{ width: '100%' }}
            prefix="$"
            max={maxBeerPrice}
            min={priceRange[0]}
            value={priceRange[1]}
            onChange={handleMaxChange}
          />
        </Flex>
        <Slider
          range
          min={minBeerPrice}
          max={maxBeerPrice}
          step={1}
          value={priceRange}
          onChange={handleSliderChange}
          tooltip={{ formatter: value => `$${value}` }}
        />
      </Space>
    </div>
  )
}
