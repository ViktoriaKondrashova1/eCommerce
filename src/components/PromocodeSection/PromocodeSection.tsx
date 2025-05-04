import type { FC } from 'react'
import { promocode, promocodeText } from '@/shared/constants'
import { Card, Space } from 'antd'
import { AppButton } from '../AppButton'
import { AppText } from '../AppText/AppText'
import { AppTitle } from '../AppTitle/AppTitle'

export const PromocodeSection: FC = () => {
  return (
    <Card
      style={{
        background: '#E84B1A',
        textAlign: 'center',
        padding: '15px',
      }}
    >
      <Space direction="vertical" size="small">
        <AppTitle level={4}>{promocodeText}</AppTitle>
        <Space>
          <AppText strong style={{ fontSize: 18, backgroundColor: 'white', padding: '4px 10px', borderRadius: 4 }}>
            {promocode}
          </AppText>
          <AppButton type="primary">Copy Code</AppButton>
        </Space>
      </Space>
    </Card>
  )
}
