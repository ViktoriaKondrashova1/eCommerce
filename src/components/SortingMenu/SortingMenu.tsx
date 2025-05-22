import type { MenuProps } from 'antd'
import type { FC } from 'react'
import type { BaseComponent } from '@/shared/types/common.types'
import { Menu } from 'antd'
import './SortingMenu.scss'

type MenuItem = Required<MenuProps>['items'][number]

interface Props extends BaseComponent {
  items: MenuItem[]
}

export const SortingMenu: FC<Props> = ({ testId = 'sorting-menu', items }) => {
  return (
    <Menu
      data-testid={testId}
      // onClick={onClick}
      mode="inline"
      items={items}
      style={{ border: 'none' }}
      className="sorting-menu"
    />
  )
}
