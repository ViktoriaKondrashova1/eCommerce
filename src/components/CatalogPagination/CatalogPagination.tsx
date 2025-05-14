import type { FC } from 'react'
import { Pagination } from 'antd'

interface Props {
  total: number | undefined
  pageLimit: number
  current: number
  onChange: (page: number) => void
}

export const CatalogPagination: FC<Props> = ({ total, pageLimit, current, onChange }) => {
  return (
    <Pagination current={current} total={total} hideOnSinglePage pageSize={pageLimit} onChange={onChange} />
  )
}
