import type { FC } from 'react'
import type { BaseComponent } from '@/shared/types/common.types'
import { Pagination } from 'antd'

interface Props extends BaseComponent {
  total: number | undefined
  pageLimit: number
  current: number
  onChange: (page: number) => void
}

export const CatalogPagination: FC<Props> = ({ testId = 'pagination', total, pageLimit, current, onChange }) => {
  return (
    <Pagination data-testid={testId} current={current} total={total} hideOnSinglePage pageSize={pageLimit} onChange={onChange} />
  )
}
