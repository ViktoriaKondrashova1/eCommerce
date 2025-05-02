import type { BaseComponent } from '@/shared/types/common.types'
import type { ItemType } from 'antd/es/menu/interface'
import type { FC } from 'react'
import { appName } from '@/shared/constants'
import { LogoutOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons'
import { Divider, Flex, Layout } from 'antd'
import { AppHeaderMenu } from '../AppHeaderMenu/AppHeaderMenu'
import { AppTitle } from '../AppTitle/AppTitle'
import './AppHeader.scss'

interface Props extends BaseComponent {}

const { Header } = Layout

export const AppHeader: FC<Props> = ({ testId = 'header', ...rest }) => {
  const isAuthenticated = false // временное значение

  const menuItems: ItemType[] = [
    { key: '/', label: 'MAIN' },
    { key: '/about', label: 'ABOUT' },
    { key: '/catalog', label: 'CATALOG' },
  ]

  const authMenuItems: ItemType[] = [
    { key: '/cart', icon: <ShoppingCartOutlined /> },
    { key: '/profile', icon: <UserOutlined /> },
    { key: '/login', icon: <LogoutOutlined /> },
  ]

  const unauthMenuItems: ItemType[] = [
    { key: '/cart', icon: <ShoppingCartOutlined /> },
    { key: '/login', label: 'LOG IN' },
    { key: '/register', label: 'SIGN UP' },
  ]

  return (
    <Header data-testid={testId} {...rest} className="header">
      <Flex justify="space-between" align="center">
        <AppHeaderMenu items={menuItems} />
        <AppTitle style={{ margin: 0 }}>{appName}</AppTitle>
        <AppHeaderMenu items={isAuthenticated ? authMenuItems : unauthMenuItems} />
      </Flex>
      <Divider />
    </Header>
  )
}
