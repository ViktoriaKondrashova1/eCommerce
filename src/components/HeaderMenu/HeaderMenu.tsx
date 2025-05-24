import type { MenuProps } from 'antd'
import type { ItemType } from 'antd/es/menu/interface'
import type { FC } from 'react'
import type { BaseComponent } from '@/shared/types/common.types'
import { Grid, Menu } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import { customerStore } from '@/entities/customer/model/customer.store'
import './HeaderMenu.scss'

interface Props extends MenuProps, BaseComponent {
  items: ItemType[]
}

const { useBreakpoint } = Grid

export const HeaderMenu: FC<Props> = ({ testId = 'header-menu', items, ...rest }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const screens = useBreakpoint()

  const handleMenuClick = (info: { key: string }): void => {
    if (info.key === '/logout') {
      customerStore.logout()
      navigate('/')
    }
    else {
      navigate(info.key)
    }
  }

  const mobMenu = [
    {
      key: 'menu',
      label: 'Menu',
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
      style={{
        background: 'inherit',
        whiteSpace: 'nowrap',
        border: 'none',
        ...(!screens.md ? { paddingLeft: 0 } : {}),
      }}
      className="header-menu"
      data-testid={testId}
      {...rest}
    />
  )
}
