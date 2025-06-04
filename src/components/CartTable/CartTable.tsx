import type { TableColumnsType } from 'antd'
import type { FC } from 'react'
import type { DataType } from '@/pages/CartPage/CartPage'
import { DeleteOutlined } from '@ant-design/icons'
import { Popconfirm, Table } from 'antd'
import { useState } from 'react'

interface Props {
  tableData: DataType[]
}

export const CartTable: FC<Props> = ({ tableData }) => {
  const [dataSource, setDataSource] = useState<DataType[]>(tableData)

  const handleDelete = (key: React.Key): void => {
    const newData = dataSource.filter(item => item.key !== key)
    setDataSource(newData)
  }

  const columns: TableColumnsType<DataType> = [
    { title: 'Product', dataIndex: 'product', key: 'product' },
    { title: 'Price', dataIndex: 'price', key: 'price' },
    { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
    { title: 'Subtotal', dataIndex: 'subtotal', key: 'subtotal' },
    {
      dataIndex: 'delete',
      key: 'delete',
      render: (_, record) =>
        dataSource.length >= 1
          ? (
              <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
                <DeleteOutlined />
              </Popconfirm>
            )
          : null,
    },
  ]

  return (
    <Table<DataType>
      columns={columns}
      dataSource={dataSource}
    />
  )
}
