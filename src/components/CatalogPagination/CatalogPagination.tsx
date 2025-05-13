import type { FC } from 'react'
import { Pagination } from 'antd'

export const CatalogPagination: FC = () => {
  const totalProducts = 38 // фетчить данные
  const pageLimit = 20 // фетчить данные

  return (
    <Pagination defaultCurrent={1} total={totalProducts} hideOnSinglePage pageSize={pageLimit} />
  )
}
