import type { FC } from 'react'
import type { BaseComponent } from '@/shared/types/common.types'
import { Divider, Flex, Grid, Layout } from 'antd'
import { observer } from 'mobx-react-lite'
import { HeaderDesktopNav } from '@/components/AppHeader/app-header-auth/HeaderDesktopNav'
import { HeaderMobileNav } from '@/components/AppHeader/app-header-auth/HeaderMobileNav'
import { AppHeaderTitle } from '@/components/AppHeader/AppHeaderTitle'
import './../AppHeader.scss'

interface Props extends BaseComponent {}
const { Header } = Layout
const { useBreakpoint } = Grid

export const AppHeaderAuth: FC<Props> = observer(({ testId = 'header', ...rest }) => {
  const screens = useBreakpoint()

  return (
    <Header data-testid={testId} {...rest} className="header" style={{ paddingLeft: screens.xs ? '1rem' : '50px', paddingRight: screens.xs ? '1rem' : '50px' }}>

      <Flex justify="space-between" align="center" style={{ height: '100%' }}>
        <AppHeaderTitle />
        {screens.md ? <HeaderDesktopNav /> : <HeaderMobileNav />}
      </Flex>

      <Divider style={{ margin: '0' }} />
    </Header>
  )
})
