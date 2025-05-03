import type { FC } from 'react'
import { appMoto, appName } from '@/shared/constants'
import { Space } from 'antd'
import { AppText } from '../AppText/AppText'
import { AppTitle } from '../AppTitle/AppTitle'
import './HeroSection.scss'

export const HeroSection: FC = () => {
  return (
    <div
      className="hero-section"
    >
      <Space direction="vertical" size="large">
        <AppTitle level={1}>{appName}</AppTitle>
        <AppText>{appMoto}</AppText>
      </Space>
    </div>
  )
}
