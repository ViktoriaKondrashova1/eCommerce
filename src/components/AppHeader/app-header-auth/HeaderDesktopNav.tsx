import type { MenuItem } from '@/components/AppHeader/types'
import { ShoppingCartOutlined } from '@ant-design/icons'
import { Flex } from 'antd'
import { AppButton } from '@/components/AppButton'
import { HeaderUserBlock } from '@/components/AppHeader/app-header-auth/HeaderUserBlock'
import { HeaderMenu } from '@/components/AppHeader/HeaderMenu/HeaderMenu'

export function HeaderDesktopNav() {
  const menuItems: MenuItem[] = [
    { key: '/', label: 'MAIN' },
    { key: '/about', label: 'ABOUT' },
    { key: '/catalog', label: 'CATALOG' },
  ]

  return (
    <Flex>
      <HeaderMenu items={menuItems} />
      {/* cart */}
      <Flex justify="space-between" align="center" gap={16}>
        <AppButton color="default" variant="text" icon={<ShoppingCartOutlined style={{ fontSize: '18px' }} />}>
          CART
        </AppButton>

        <HeaderUserBlock />
      </Flex>
    </Flex>
  )
}
