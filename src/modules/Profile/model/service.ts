import type { FormDataAddress } from '@/modules/Profile/model/types.ts'
import { updateMe } from '@/entities/customer/api/update-me.ts'

export const profileService = {

  updateAddress: async ({ version, address }: { version: number, address: FormDataAddress }) => {
    return updateMe({
      version,
      actions: [{
        action: 'changeAddress',
        addressId: address.id,
        address: {
          ...address,
          custom: {
            fields: {
              isPrimary: address.isPrimary,
            },
            type: {
              typeId: 'type',
              key: 'address-custom-field',
            },
          },
        },
      }],
    })
  },

  resetIsPrimaryAddress: async ({ version, address }: { version: number, address: FormDataAddress }) => {
    return updateMe({
      version,
      actions: [{
        action: 'changeAddress',
        addressId: address.id,
        address: {
          ...address,
          custom: {
            fields: {
              isPrimary: false,
            },
            type: {
              typeId: 'type',
              key: 'address-custom-field',
            },
          },
        },
      }],
    })
  },

  addAddress: async ({ version, address }: { version: number, address: FormDataAddress }) => {
    return updateMe({
      version,
      actions: [{
        action: 'addAddress',
        address: {
          ...address,
          ...address,
          custom: {
            fields: {
              isPrimary: address.isPrimary ?? false,
            },
            type: {
              typeId: 'type',
              key: 'address-custom-field',
            },
          },
        },
      }],
    })
  },

  addAddressIdByType: async ({ version, type, id }: { version: number, type: 'shipping' | 'billing', id: string }) => {
    return updateMe({
      version,
      actions: [
        {
          action: type === 'billing' ? 'addBillingAddressId' : 'addShippingAddressId',
          addressId: id,
        },
      ],
    })
  },

  removeAddress: async ({ version, id }: { version: number, id: string }) => {
    return updateMe({
      version,
      actions: [
        {
          action: 'removeAddress',
          addressId: id,
        },
      ],
    })
  },

  removeAddressIdByType: async ({ version, type, id }: { version: number, type: 'shipping' | 'billing', id: string }) => {
    return updateMe({
      version,
      actions: [
        {
          action: type === 'billing' ? 'removeBillingAddressId' : 'removeShippingAddressId',
          addressId: id,
        },
      ],
    })
  },

  updatePersonalInfo: async ({ version, userData }: {
    version: number
    userData: {
      email: string
      firstName: string
      lastName: string
      dateOfBirth: string
    }
  }) => {
    return updateMe({
      version,
      actions: [
        {
          action: 'changeEmail',
          email: userData.email,
        },
        {
          action: 'setFirstName',
          firstName: userData.firstName,
        },
        {
          action: 'setLastName',
          lastName: userData.lastName,
        },
        {
          action: 'setDateOfBirth',
          dateOfBirth: userData.dateOfBirth,
        },
      ],
    })
  },

}
