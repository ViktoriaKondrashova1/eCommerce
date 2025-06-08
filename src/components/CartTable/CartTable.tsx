/* eslint-disable react-hooks-extra/no-direct-set-state-in-use-effect */
import type { TableColumnsType } from 'antd'
import type { FC } from 'react'
import type { CartDataType } from '@/entities/cart/model/cart.types'
import { DeleteOutlined } from '@ant-design/icons'
import { Popconfirm, Table } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { updateCart } from '@/entities/cart/api/update-cart'
import { isNullable } from '@/shared/types/is-nullable'
import { AppButton } from '../AppButton'
import { AppEmpty } from '../AppEmpty/AppEmpty'

interface Props {
  tableData: CartDataType[] | null
}

export const CartTable: FC<Props> = ({ tableData }) => {
  const navigate = useNavigate()
  const [dataSource, setDataSource] = useState<CartDataType[] | null>(tableData)

  const handleDelete = async (key: React.Key, record: CartDataType): Promise<void> => {
    if (!isNullable(dataSource)) {
      const newData = dataSource.filter(item => item.key !== key)
      setDataSource(newData)
      await updateCart({
        action: 'removeLineItem',
        productId: record.quantity.props.productId,
        lineItemId: record.quantity.props.lineItemId,
        quantity: record.quantity.props.quantity,
      })
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
              <Popconfirm
                title="Remove item from cart?"
                onConfirm={() => {
                  handleDelete(record.key, record).catch(console.error)
                }}
              >
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
      locale={{ emptyText: (
        <AppEmpty>
          <AppButton type="primary" onClick={() => navigate('/catalog/1')}>Continue shopping</AppButton>
        </AppEmpty>
      ) }}
    />
  )
}
