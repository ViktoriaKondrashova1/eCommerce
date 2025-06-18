import type { MenuItem } from '@/components/AppHeader/types'
import { ShoppingCartOutlined } from '@ant-design/icons'
import { Badge, Flex } from 'antd'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'
import { AppButton } from '@/components/AppButton'
import { HeaderUserBlock } from '@/components/AppHeader/app-header-auth/HeaderUserBlock'
import { HeaderMenu } from '@/components/AppHeader/HeaderMenu/HeaderMenu'
import { cartStore } from '@/entities/cart/model/cart.store.ts'
import { ROUTES } from '@/shared/constants.ts'

export const HeaderDesktopNav = observer(() => {
  const navigate = useNavigate()

  const menuItems: MenuItem[] = [
    { key: '/', label: 'MAIN' },
    { key: '/about', label: 'ABOUT' },
    { key: ROUTES.catalog.default, label: 'CATALOG' },
  ]

  return (
    <Flex>
      <HeaderMenu items={menuItems} />
      <Flex justify="space-between" align="center" gap={16}>
        <Badge showZero size="small" count={cartStore.cart?.totalLineItemQuantity ?? 0}>
          <AppButton color="default" variant="filled" icon={<ShoppingCartOutlined style={{ fontSize: '18px' }} />} onClick={() => navigate(ROUTES.cart)} />
        </Badge>
        <HeaderUserBlock />
      </Flex>
    </Flex>
  )
})
