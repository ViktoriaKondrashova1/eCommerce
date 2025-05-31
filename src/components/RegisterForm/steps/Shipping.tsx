import { observer } from 'mobx-react-lite'
import { formStore } from '../model/form-store'
import { AddressFields } from './Addresses'

export const Shipping = observer(() => {
  return (
    <div>
      <AddressFields
        isDefault={formStore.formData.shippingAddress.custom.fields.isPrimary}
        onSetDefault={() => formStore.togglePrimaryAddress('shippingAddress')}
        address={formStore.formData.shippingAddress}
        onUpdate={(key, value) =>
          formStore.updateAddress(key, value, 'shippingAddress')}
      />
    </div>
  )
})
