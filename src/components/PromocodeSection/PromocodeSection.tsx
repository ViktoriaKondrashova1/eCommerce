import type { FC } from 'react'
import type { BaseComponent } from '@/shared/types/common.types'
import { App as AntApp, Card, Flex, Grid, Space } from 'antd'
import { AppButton } from '../AppButton'
import { AppText } from '../AppText/AppText'
import { AppTitle } from '../AppTitle/AppTitle'

interface Props extends BaseComponent {
  promocode: string
  promocodeText: string
}

const { useBreakpoint } = Grid

export const PromocodeSection: FC<Props> = ({ testId = 'promocode', promocode, promocodeText }) => {
  const { message } = AntApp.useApp()
  const screens = useBreakpoint()

  const copyPromocode = (): void => {
    navigator.clipboard.writeText(promocode).then(() => {
      message.success('Promocode has been copied')
    }).catch((err) => {
      console.error('Failed to copy:', err)
    })
  }

  return (
    <Card
      data-testid={testId}
      style={{
        background: '#E84B1A',
        textAlign: 'center',
        padding: '15px',
      }}
    >
      <Space direction="vertical" size="small">
        <AppTitle level={4}>{promocodeText}</AppTitle>
        <Flex vertical={!screens.md} gap="small" justify="center">
          <AppText strong style={{ fontSize: 18, backgroundColor: 'white', padding: '4px 10px', borderRadius: 4 }}>
            {promocode}
          </AppText>
          <AppButton type="primary" onClick={copyPromocode} style={{ height: 'auto' }}>Copy Code</AppButton>
        </Flex>
      </Space>
    </Card>
  )
}
