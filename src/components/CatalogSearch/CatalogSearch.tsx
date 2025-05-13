import type { FC } from 'react'
import { Flex, Input } from 'antd'
import { AppTitle } from '../AppTitle/AppTitle'

export const CatalogSearch: FC = () => {
  return (
    <Flex gap="small" align="center" style={{ minWidth: 'fit-content' }}>
      <AppTitle level={5} style={{ margin: '0', wordBreak: 'normal' }}>Search:</AppTitle>
      <Input.Search />
    </Flex>
  )
}
