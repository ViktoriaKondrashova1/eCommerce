import type { FC } from 'react'
import { appMoto, appName } from '@/shared/constants'
import { Grid, Space } from 'antd'
import { AppText } from '../AppText/AppText'
import { AppTitle } from '../AppTitle/AppTitle'
import './HeroSection.scss'

const { useBreakpoint } = Grid

export const HeroSection: FC = () => {
  const screens = useBreakpoint()

  return (
    <div
      className="hero-section"
    >
      <Space
        direction="vertical"
        size="large"
      >
        <AppTitle level={screens.xs ? 2 : 1}>{appName}</AppTitle>
        <AppText>{appMoto}</AppText>
      </Space>
    </div>
  )
}
