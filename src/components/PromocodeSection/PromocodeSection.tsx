import type { FC } from 'react'
import { promocode, promocodeText } from '@/shared/constants'
import { App as AntApp, Card, Space } from 'antd'
import { AppButton } from '../AppButton'
import { AppText } from '../AppText/AppText'
import { AppTitle } from '../AppTitle/AppTitle'

export const PromocodeSection: FC = () => {
  const { message } = AntApp.useApp()

  const copyPromocode = (): void => {
    navigator.clipboard.writeText(promocode).then(() => {
      message.success('Promocode has been copied!')
    }).catch((err) => {
      console.error('Failed to copy:', err)
    })
  }

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
          <AppButton type="primary" onClick={copyPromocode}>Copy Code</AppButton>
        </Space>
      </Space>
    </Card>
  )
}
