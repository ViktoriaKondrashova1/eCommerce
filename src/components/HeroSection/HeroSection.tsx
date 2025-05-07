import type { BaseComponent } from '@/shared/types/common.types'
import type { FC } from 'react'
import { appMoto, appName } from '@/shared/constants'
import { Grid, Space } from 'antd'
import { AppText } from '../AppText/AppText'
import { AppTitle } from '../AppTitle/AppTitle'
import './HeroSection.scss'

interface Props extends BaseComponent {}

const { useBreakpoint } = Grid

export const HeroSection: FC<Props> = ({ testId = 'hero-section' }) => {
  const screens = useBreakpoint()

  return (
    <div
      data-testid={testId}
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
