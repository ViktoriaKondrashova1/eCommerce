import type { BaseComponent } from '@/shared/types/common.types'
import type { MenuProps } from 'antd'
import type { ItemType } from 'antd/es/menu/interface'
import type { FC } from 'react'
import { MenuOutlined } from '@ant-design/icons'
import { Grid, Menu } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'

interface Props extends MenuProps, BaseComponent {
  items: ItemType[]
}

const { useBreakpoint } = Grid

export const HeaderMenu: FC<Props> = ({ testId = 'header-menu', items, ...rest }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const screens = useBreakpoint()

  const handleMenuClick = (info: { key: string }): void => {
    navigate(info.key)
  }

  const mobMenu = [
    {
      key: 'menu',
      icon: <MenuOutlined />,
      children: items,
    },
  ]

  return (
    <Menu
      mode={!screens.md ? 'vertical' : 'horizontal'}
      items={!screens.md ? mobMenu : items}
      defaultSelectedKeys={['/']}
      selectedKeys={[location.pathname]}
      onClick={handleMenuClick}
      style={{ background: 'inherit', whiteSpace: 'nowrap', border: 'none' }}
      data-testid={testId}
      {...rest}
    />
  )
}
