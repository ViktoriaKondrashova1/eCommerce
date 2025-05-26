import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { Form, Switch } from 'antd'
import { observer } from 'mobx-react-lite'
import { AppText } from '@/components/AppText/AppText'
import { formStore } from '../model/form-store'
import { AddressFields } from './Addresses'

export const Billing = observer(() => {
  return (
    <>
      <Form.Item style={{ maxWidth: '250px', width: '100%' }}>
        <Switch
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
          defaultChecked
          checked={formStore.formData.isUseShippingForBilling}
          onChange={checked => formStore.setUseShippingForBilling(checked)}
        />
        {' '}
        <AppText>Use shipping address for billing</AppText>
      </Form.Item>
      {!formStore.formData.isUseShippingForBilling && (
        <>
          {formStore.formData.billingAddresses.map((address, index) => (
            <div key={address.id}>
              <AddressFields
                onSetDefault={id => formStore.setPrimaryShippingAddress(id)}
                address={address}
                onUpdate={(field, value) =>
                  formStore.updateBillingAddress(address.id, field, value)}
                onSetPrimary={() => formStore.setPrimaryBillingAddress(address.id)}
                onDelete={() => formStore.removeBillingAddress(address.id)}
                isPrimary={address.custom.fields.isPrimary}
                index={index}
              />
            </div>
          ))}
        </>
      )}
    </>
  )
})
