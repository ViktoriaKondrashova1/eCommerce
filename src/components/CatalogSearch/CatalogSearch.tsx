import type { FC } from 'react'
import { Flex, Input } from 'antd'
import { AppTitle } from '../AppTitle/AppTitle'

interface Props {
  onChange: (value: string) => void
}

export const CatalogSearch: FC<Props> = ({ onChange }) => {
  return (
    <Flex gap="small" align="center" style={{ minWidth: 'fit-content' }}>
      <AppTitle level={5} style={{ margin: '0', wordBreak: 'normal' }}>Search:</AppTitle>
      <Input.Search onChange={e => onChange(e.target.value)} />
    </Flex>
  )
}
