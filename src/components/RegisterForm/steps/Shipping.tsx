import { AppButton } from '@/components/AppButton'
import { PlusSquareOutlined } from '@ant-design/icons'
import { Form } from 'antd'
import { observer } from 'mobx-react-lite'
import { formStore } from '../model/formStore'
import { AddressFields } from './Addresses'

export const Shipping = observer(() => {
  return (
    <>
      <Form.Item style={{ maxWidth: '250px', width: '100%', margin: '20px 10px' }}>
        <AppButton
          color="cyan"
          variant="outlined"
          icon={<PlusSquareOutlined />}
          style={{ maxWidth: '300px', width: '100%' }}
          onClick={() => formStore.addShippingAddress()}
          className="w-full mb-8"
        >
          Add Address
        </AppButton>
      </Form.Item>

      {formStore.formData.shippingAddresses.map((address, index) => (
        <div key={address.id}>
          <AddressFields
            address={address}
            onUpdate={(field, value) =>
              formStore.updateShippingAddress(address.id, field, value)}
            onSetPrimary={() => formStore.setPrimaryShippingAddress(address.id)}
            onDelete={() => formStore.removeShippingAddress(address.id)}
            isPrimary={address.custom.fields.isPrimary}
            index={index}
          />
        </div>
      ))}
    </>
  )
})
