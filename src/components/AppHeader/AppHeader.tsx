import type { ItemType } from 'antd/es/menu/interface'
import type { FC } from 'react'
import type { BaseComponent } from '@/shared/types/common.types'
import { LogoutOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons'
import { Divider, Flex, Grid, Layout } from 'antd'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'
import { customerStore } from '@/entities/customer/model/customer.store'
import { appName } from '@/shared/constants'
import { AppTitle } from '../AppTitle/AppTitle'
import { HeaderMenu } from '../HeaderMenu/HeaderMenu'
import './AppHeader.scss'

const HeaderTitle = ({ onClick }: { onClick: () => void }) => <AppTitle style={{ margin: 0, cursor: 'pointer' }} onClick={onClick}>{appName}</AppTitle>

interface Props extends BaseComponent {}
const { Header } = Layout
const { useBreakpoint } = Grid

export const AppHeader: FC<Props> = observer(({ testId = 'header', ...rest }) => {
  const screens = useBreakpoint()
  const navigate = useNavigate()

  const isAuthenticated = customerStore.isAuth // временное значение

  const menuItems: ItemType[] = [
    { key: '/', label: 'MAIN' },
    { key: '/about', label: 'ABOUT' },
    { key: '/catalog/1', label: 'CATALOG' },
  ]

  const authMenuItems: ItemType[] = [
    { key: '/cart', icon: <ShoppingCartOutlined /> },
    { key: '/profile', icon: <UserOutlined /> },
    { key: '/logout', icon: <LogoutOutlined /> },
  ]

  const unauthMenuItems: ItemType[] = [
    { key: '/cart', icon: <ShoppingCartOutlined /> },
    { key: '/login', label: 'LOG IN' },
    { key: '/register', label: 'SIGN UP' },
  ]

  const mobMenuItems = isAuthenticated ? [...menuItems, ...authMenuItems] : [...menuItems, ...unauthMenuItems]

  return (
    <Header data-testid={testId} {...rest} className="header" style={{ paddingLeft: screens.xs ? '1rem' : '50px', paddingRight: screens.xs ? '1rem' : '50px' }}>
      <Flex justify="space-between" align="center" style={{ height: '100%' }}>
        {!screens.md
          ? (
              <>
                <HeaderMenu items={mobMenuItems} />
                <HeaderTitle onClick={() => navigate('/')} />
              </>
            )

          : (
              <>
                <HeaderMenu items={menuItems} />
                <HeaderTitle onClick={() => navigate('/')} />
                <HeaderMenu items={isAuthenticated ? authMenuItems : unauthMenuItems} />
              </>
            )}
      </Flex>
      <Divider style={{ margin: '0' }} />
    </Header>
  )
})
