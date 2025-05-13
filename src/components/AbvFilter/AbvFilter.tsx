import type { FC } from 'react'
import { Slider } from 'antd'
import { useState } from 'react'
import { AppTitle } from '../AppTitle/AppTitle'

export const AbvFilter: FC = () => {
  const minBeerAbv = 4.56 // пофетчить данные
  const maxBeerAbv = 8.76 // пофетчить данные

  const [abvRange, setAbvRange] = useState<number[]>([minBeerAbv, maxBeerAbv])

  const handleSliderChange = (value: number[]) => {
    setAbvRange(value)
  }

  return (
    <div style={{ padding: '16px 0' }}>
      <AppTitle level={5}>ABV, %</AppTitle>
      <Slider
        range
        min={minBeerAbv}
        max={maxBeerAbv}
        step={1}
        value={abvRange}
        onChange={handleSliderChange}
        tooltip={{ formatter: value => `${value}%` }}
      />
    </div>
  )
}
