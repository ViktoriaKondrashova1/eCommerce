import type { FC } from 'react'
import type { BaseComponent } from '@/shared/types/common.types.ts'
import { Grid, Space } from 'antd'
import { AppText } from '../../../components/AppText/AppText.tsx'
import { AppTitle } from '../../../components/AppTitle/AppTitle.tsx'
import './HeroSection.scss'

interface Props extends BaseComponent {
  appName: string
}

const { useBreakpoint } = Grid

export const HeroSection: FC<Props> = ({ testId = 'hero-section', appName }) => {
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
        <AppText>Beer You Should Drink</AppText>
      </Space>
    </div>
  )
}
