import type { MenuProps } from 'antd'
import type { CSSProperties, FC } from 'react'
import type { MenuItem } from '@/components/AppHeader/types'
import type { BaseComponent } from '@/shared/types/common.types'
import { Flex } from 'antd'
import { useNavigate } from 'react-router-dom'
import { AppButton } from '@/components/AppButton'
import { customerStore } from '@/entities/customer/model/customer.store'

interface Props extends MenuProps, BaseComponent {
  items: MenuItem[]
  align?: 'column' | 'row'
  itemStyles?: CSSProperties
  onItemClick?: () => void
}

export const HeaderMenu: FC<Props> = ({ testId = 'header-menu', items, align = 'row', itemStyles, onItemClick }) => {
  const navigate = useNavigate()

  const handleMenuClick = (info: { key: string }): void => {
    if (info.key === '/logout') {
      customerStore.logout()
      navigate('/')
      onItemClick?.()
    }
    else {
      navigate(info.key)
      onItemClick?.()
    }
  }

  return (
    <Flex data-testid={testId} justify="space-between" align="center" vertical={align === 'column'}>
      {items.map((menuItem) => {
        if (menuItem?.label === undefined && menuItem.icon !== undefined) {
          return (
            <AppButton
              style={{ ...itemStyles }}
              key={menuItem?.key}
              color={menuItem.color || 'default'}
              variant="text"
              icon={menuItem.icon}
              onClick={() => handleMenuClick(menuItem)}
            />
          )
        }

        return (
          <AppButton
            style={{ ...itemStyles }}
            key={menuItem?.key}
            color={menuItem.color || 'default'}
            variant="text"
            icon={menuItem.icon}
            onClick={() => handleMenuClick(menuItem)}
          >
            {menuItem.label}
          </AppButton>
        )
      })}
    </Flex>
  )
}
