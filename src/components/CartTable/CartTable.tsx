/* eslint-disable react-hooks-extra/no-direct-set-state-in-use-effect */
import type { TableColumnsType } from 'antd'
import type { FC } from 'react'
import type { CartDataType } from '@/entities/cart/model/cart.types'
import { DeleteOutlined } from '@ant-design/icons'
import { Popconfirm, Table } from 'antd'
import { useEffect, useState } from 'react'
import { isNullable } from '@/shared/types/is-nullable'

interface Props {
  tableData: CartDataType[] | null
}

export const CartTable: FC<Props> = ({ tableData }) => {
  const [dataSource, setDataSource] = useState<CartDataType[] | null>(tableData)

  const handleDelete = (key: React.Key): void => {
    if (!isNullable(dataSource)) {
      const newData = dataSource.filter(item => item.key !== key)
      setDataSource(newData)
    }
  }

  useEffect(() => {
    setDataSource(tableData)
  }, [tableData])

  const columns: TableColumnsType<CartDataType> = [
    { title: 'Product', key: 'product', render: (_, record) => record.product },
    { title: 'Price', dataIndex: 'price', key: 'price' },
    { title: 'Quantity', key: 'quantity', render: (_, record) => record.quantity },
    { title: 'Subtotal', dataIndex: 'subtotal', key: 'subtotal' },
    {
      key: 'delete',
      render: (_, record) =>
        !isNullable(dataSource) && dataSource.length >= 1
          ? (
              <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
                <DeleteOutlined />
              </Popconfirm>
            )
          : null,
    },
  ]

  return (
    <Table<CartDataType>
      columns={columns}
      dataSource={dataSource ?? []}
    />
  )
}
