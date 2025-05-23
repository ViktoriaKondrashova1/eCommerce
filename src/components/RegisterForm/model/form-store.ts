import type { AddressDraft, MyCustomerDraft } from '@commercetools/platform-sdk'
import type { Dayjs } from 'dayjs'
import { makeAutoObservable } from 'mobx'
import { nanoid } from 'nanoid'
import { registerCustomer } from '@/entities/customer/api/sign-up'

export interface AddressWithCustomFileds extends Omit<AddressDraft, 'custom'> {
  custom: {
    type: {
      key: 'address-custom-field'
    }
    fields: {
      isPrimary: boolean
    }
  }
}

export interface FormData {
  firstName: string
  lastName: string
  email: string
  dateOfBirth: Dayjs | null
  shippingAddresses: AddressWithCustomFileds[]
  billingAddresses: AddressWithCustomFileds[]
  isUseShippingForBilling: boolean
  isShippingAddressAsDefault: boolean
  isBillingAddressAsDefault: boolean
  password: string
  confirmPassword: string
}

const addressTemplate = {
  country: '',
  city: '',
  postalCode: '',
  streetName: '',
  custom: {
    type: {
      key: 'address-custom-field',
    },
    fields: {
      isPrimary: false,
    },
  },
} satisfies AddressWithCustomFileds

const initialState: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  dateOfBirth: null,
  isUseShippingForBilling: false,
  isShippingAddressAsDefault: false,
  isBillingAddressAsDefault: false,

  shippingAddresses: [
    { ...addressTemplate, custom:
       {
         ...addressTemplate.custom,
         fields: {
           isPrimary: true,
         },
       }, id: nanoid() },
  ],
  billingAddresses: [
    { ...addressTemplate, custom:
      {
        ...addressTemplate.custom,
        fields: {
          isPrimary: true,
        },
      }, id: nanoid() },
  ],

}

export class FormStore {
  formData: FormData = initialState

  constructor() {
    makeAutoObservable(this)
  }

  setPrimaryShippingAddress = (id: string | undefined) => {
    const index = this.formData.shippingAddresses.findIndex(
      address => address.id === id,
    )

    if (index === 0) {
      this.formData.isShippingAddressAsDefault = !this.formData.isShippingAddressAsDefault
    }
    else {
      this.formData.isBillingAddressAsDefault = !this.formData.isBillingAddressAsDefault
    }
  }

  updateField<T extends keyof FormData>(field: T, value: FormData[T]) {
    this.formData[field] = value
  }

  addShippingAddress = () => {
    this.formData.shippingAddresses.push({ ...addressTemplate, id: nanoid() })
  }

  addBillingAddress = () => {
    this.formData.billingAddresses.push({ ...addressTemplate, id: nanoid() })
  }

  removeShippingAddress = (id: string | undefined) => {
    const addressToRemove = this.formData.shippingAddresses.find(
      a => a.id === id,
    )
    if (
      addressToRemove?.custom.fields.isPrimary
      && this.formData.shippingAddresses.length > 1
    ) {
      this.formData.shippingAddresses[0].custom.fields.isPrimary = true
    }
    this.formData.shippingAddresses = this.formData.shippingAddresses.filter(
      address => address.id !== id,
    )
  }

  removeBillingAddress = (id: string | undefined) => {
    const addressToRemove = this.formData.billingAddresses.find(
      a => a.id === id,
    )
    if (
      addressToRemove?.custom.fields.isPrimary
      && this.formData.billingAddresses.length > 1
    ) {
      this.formData.billingAddresses[0].custom.fields.isPrimary = true
    }
    this.formData.billingAddresses = this.formData.billingAddresses.filter(
      address => address.id !== id,
    )
  }

  setPrimaryBillingAddress = (id: string | undefined) => {
    this.formData.billingAddresses = this.formData.billingAddresses.map(
      address => ({
        ...address,
        custom: {
          ...address.custom,
          fields: {
            ...address.custom.fields,
            isPrimary: address.id === id,
          },
        },
      }),
    )
  }

  updateShippingAddress = (
    id: string | undefined,
    field: string,
    value: string,
  ) => {
    this.formData.shippingAddresses = this.formData.shippingAddresses.map(
      address =>
        address.id === id ? { ...address, [field]: value } : address,
    )
  }

  updateBillingAddress = (
    id: string | undefined,
    field: string,
    value: string,
  ) => {
    this.formData.billingAddresses = this.formData.billingAddresses.map(
      address =>
        address.id === id ? { ...address, [field]: value } : address,
    )
  }

  setUseShippingForBilling = (value: boolean) => {
    this.formData.isUseShippingForBilling = value
    if (value) {
      const newBillingAddresses = this.formData.shippingAddresses.map(
        (address) => {
          const newAddress = {
            ...address,
            id: nanoid(),
            custom: {
              ...address.custom,
              fields: {
                ...address.custom.fields,
              },
            },
          }
          return newAddress
        },
      )

      this.formData.billingAddresses = newBillingAddresses

      const primaryShipping = this.formData.shippingAddresses.find(
        address => address.custom.fields.isPrimary,
      )
      if (primaryShipping) {
        this.formData.billingAddresses.forEach((billingAddr) => {
          billingAddr.custom.fields.isPrimary = billingAddr.id === primaryShipping.id
        })
      }
    }
    else {
      this.formData.billingAddresses = [
        {
          ...addressTemplate,
          custom: {
            ...addressTemplate.custom,
            fields: {
              isPrimary: true,
            },
          },
          id: nanoid(),
        },
      ]
    }
  }

  async submitForm() {
    const {
      isUseShippingForBilling,
      firstName,
      lastName,
      email,
      password,
      dateOfBirth,
      shippingAddresses,
      billingAddresses,
    } = this.formData

    const dateOfBirthStr = dateOfBirth ? dateOfBirth.toISOString().split('T')[0] : undefined

    const addresses = isUseShippingForBilling
      ? [
          ...shippingAddresses,
          ...billingAddresses,
        ].map(addr => ({
          ...addr,
          key: addr.id,
          country: addr.country,
          city: addr.city,
          postalCode: addr.postalCode,
          streetName: addr.streetName,
        }))
      : [
          ...shippingAddresses,
          ...billingAddresses,
        ].map(addr => ({
          ...addr,
          key: addr.id,
          country: addr.country,
          city: addr.city,
          postalCode: addr.postalCode,
          streetName: addr.streetName,
        }))

    const getDefaultIndex = (isDefault: boolean, addresses: AddressWithCustomFileds[]) =>
      isDefault ? addresses.findIndex(address => address.custom.fields.isPrimary) : undefined

    const customerDraft: MyCustomerDraft = {
      email,
      password,
      firstName,
      lastName,
      dateOfBirth: dateOfBirthStr,
      addresses,
      defaultShippingAddress: getDefaultIndex(this.formData.isShippingAddressAsDefault, shippingAddresses),
      defaultBillingAddress: getDefaultIndex(
        this.formData.isBillingAddressAsDefault,
        isUseShippingForBilling ? shippingAddresses : billingAddresses,
      ),
    }

    const response = await registerCustomer(customerDraft)

    return response
  }
}

export const formStore = new FormStore()
