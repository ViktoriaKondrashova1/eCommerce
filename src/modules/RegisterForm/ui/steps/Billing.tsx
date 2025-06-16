import { AppText } from '@/components/AppText/AppText.tsx'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { Form, Switch } from 'antd'
import { observer } from 'mobx-react-lite'
import { formStore } from '../../model/form-store.ts'
import { AddressFields } from './Addresses.tsx'

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
        <div>
          <AddressFields
            isDefault={formStore.formData.billingAddress.custom.fields.isPrimary}
            onSetDefault={() => formStore.togglePrimaryAddress('billingAddress')}
            address={formStore.formData.billingAddress}
            onUpdate={(field, value) =>
              formStore.updateAddress(field, value, 'billingAddress')}
          />
        </div>
      )}
    </>
  )
})
