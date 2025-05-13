import type { BaseComponent } from '@/shared/types/common.types'
import type { MenuProps } from 'antd'
import type { FC } from 'react'
import { Flex } from 'antd'
import { Backdrop } from '../Backdrop/Backdrop'
import { SortingMenu } from '../SortingMenu/SortingMenu'

const sortByPriceItems: MenuProps['items'] = [
  {
    type: 'group',
    label: 'Sorting',
    children: [
      { key: '1', label: 'Price: high - low' },
      { key: '2', label: 'Price: low - high' },
    ],
  },
]

export const CatalogSidebar: FC<BaseComponent> = ({ testId = 'catalog-sidebar' }) => {
  return (
    <Backdrop>
      <Flex vertical data-testid={testId} style={{ width: 200 }}>
        <SortingMenu items={sortByPriceItems} />
      </Flex>
    </Backdrop>
  )
}
