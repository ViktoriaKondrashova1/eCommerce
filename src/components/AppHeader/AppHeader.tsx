import type { ItemType } from 'antd/es/menu/interface'
import type { FC } from 'react'
import { appName } from '@/shared/constants'
import { Divider, Flex, Layout } from 'antd'
import { AppTitle } from '../AppTitle/AppTitle'
import { LogoutOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons'
import { AppHeaderMenu } from '../AppHeaderMenu/AppHeaderMenu'
import './AppHeader.scss'

const { Header } = Layout

export const AppHeader: FC = () => {
  const isAuthenticated = false; //временное значение

  const menuItems: ItemType[] = [
    { key: '/', label: 'MAIN' },
    { key: '/about', label: 'ABOUT' },
    { key: '/catalog', label: 'CATALOG' },
  ]

  const authMenuItems: ItemType[] = [
    { key: '/cart', icon: <ShoppingCartOutlined style={{fontSize: '18px'}} />},
    { key: '/profile', icon: <UserOutlined style={{fontSize: '18px'}} /> },
    { key: '/login', icon: <LogoutOutlined style={{fontSize: '18px'}} /> },
  ]

  const unauthMenuItems: ItemType[] = [
    { key: '/cart', icon: <ShoppingCartOutlined style={{fontSize: '18px'}} /> },
    { key: '/login', label: "LOG IN" },
    { key: '/register', label: "SIGN UP" },
  ]

  return (
    <Header className="header">
      <Flex justify="space-between" align="center">
        <AppHeaderMenu items={menuItems}/>
        <AppTitle style={{ margin: 0 }}>{appName}</AppTitle>
        <AppHeaderMenu items={isAuthenticated ? authMenuItems : unauthMenuItems}/>
      </Flex>
      <Divider style={{borderColor: "inherit"}}/>
    </Header>
  )
}