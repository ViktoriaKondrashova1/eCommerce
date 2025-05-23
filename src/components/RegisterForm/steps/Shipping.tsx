import { observer } from 'mobx-react-lite'
import { formStore } from '../model/form-store'
import { AddressFields } from './Addresses'

export const Shipping = observer(() => {
  return (
    <>
      {formStore.formData.shippingAddresses.map((address, index) => (
        <div key={address.id}>
          <AddressFields
            onSetDefault={id => formStore.setPrimaryShippingAddress(id)}
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
