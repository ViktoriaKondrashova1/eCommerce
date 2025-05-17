import { CheckOutlined, CloseOutlined, PlusSquareOutlined } from '@ant-design/icons'
import { Flex, Form, Switch } from 'antd'
import { observer } from 'mobx-react-lite'
import { AppButton } from '@/components/AppButton'
import { AppText } from '@/components/AppText/AppText'
import { formStore } from '../model/form-store'
import { AddressFields } from './Addresses'

export const Billing = observer(() => {
  return (
    <>
      <Flex style={{ maxWidth: '600px', width: '100%' }} justify="space-between" align="center">
        <Form.Item style={{ maxWidth: '250px', width: '100%', margin: '0' }}>
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            defaultChecked
            checked={formStore.formData.useShippingForBilling}
            onChange={checked => formStore.setUseShippingForBilling(checked)}
          />
          {' '}
          <AppText>Use shipping address for billing</AppText>
        </Form.Item>
        <Form.Item style={{ maxWidth: '250px', width: '100%', margin: '20px 10px' }}>
          <AppButton
            color="cyan"
            variant="outlined"
            disabled={formStore.formData.useShippingForBilling}
            icon={<PlusSquareOutlined />}
            style={{ maxWidth: '300px', width: '100%' }}
            onClick={() => formStore.addBillingAddress()}
            className="w-full mb-8"
          >
            Add Address
          </AppButton>
        </Form.Item>
      </Flex>
      {!formStore.formData.useShippingForBilling && (
        <>
          {formStore.formData.billingAddresses.map((address, index) => (
            <div key={address.id}>
              <AddressFields
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
