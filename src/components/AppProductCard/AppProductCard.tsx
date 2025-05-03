import type { BaseComponent } from '@/shared/types/common.types'
import type { FC } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { Card, Flex, Tooltip } from 'antd'
import Meta from 'antd/es/card/Meta'
import { AppButton } from '../AppButton'
import { AppTitle } from '../AppTitle/AppTitle'

interface Props extends BaseComponent {
  title: string
  imageUrl: string
  price: string
  category: string
}

export const AppProductCard: FC<Props> = ({ testId = 'product-card', title, imageUrl, price, category, ...rest }) => {
  return (
    <Card
      data-testid={testId}
      hoverable
      cover={(
        <img
          alt={title}
          src={imageUrl}
          style={{
            width: '100%',
            height: 350,
            objectFit: 'cover',
          }}
        />
      )}
      style={{
        width: 300,
      }}
      {...rest}
    >
      <Meta
        title={<AppTitle level={4}>{title}</AppTitle>}
        description={(
          <>
            <div style={{ fontSize: 16 }}>{category}</div>
            <Flex justify="space-between" align="center">
              <div style={{ fontWeight: 'bold', marginTop: 8, fontSize: 20 }}>{price}</div>
              <Tooltip title="Add to Cart">
                <AppButton type="primary" shape="circle" icon={<PlusOutlined />} />
              </Tooltip>
            </Flex>
          </>
        )}
      />
    </Card>
  )
}
