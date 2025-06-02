import type { MenuItem } from '@/components/AppHeader/types'
import { ShoppingCartOutlined } from '@ant-design/icons'
import { HeaderMenu } from '@/components/AppHeader/HeaderMenu/HeaderMenu'
import { ROUTES } from '@/shared/constants.ts'

export function HeaderDesktopNav() {
  const menuItems: MenuItem[] = [
    { key: ROUTES.main, label: 'MAIN' },
    { key: '/about', label: 'ABOUT' },
    { key: ROUTES.catalog.default, label: 'CATALOG' },
    { key: '/login', label: 'LOG IN', color: 'primary' },
    { key: '/register', label: 'SIGN UP', color: 'primary' },
    { key: '/cart', icon: <ShoppingCartOutlined style={{ fontSize: '18px' }} /> },
  ]

  return <HeaderMenu items={menuItems} />
}
