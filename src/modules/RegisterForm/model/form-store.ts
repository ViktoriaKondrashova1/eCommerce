import type { AddressDraft, MyCustomerDraft } from '@commercetools/platform-sdk'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import { makeAutoObservable } from 'mobx'
import { nanoid } from 'nanoid'
import { registerCustomer } from '@/entities/customer/api/sign-up.ts'

export interface AddressWithCustomFields extends Omit<AddressDraft, 'custom'> {
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
  shippingAddress: AddressWithCustomFields
  billingAddress: AddressWithCustomFields
  isUseShippingForBilling: boolean
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
} satisfies AddressWithCustomFields

const initialState: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  dateOfBirth: null,
  isUseShippingForBilling: false,

  shippingAddress: { ...addressTemplate, id: nanoid() },
  billingAddress: { ...addressTemplate, id: nanoid() },

}

export class FormStore {
  formData: FormData = initialState

  constructor() {
    makeAutoObservable(this)
  }

  togglePrimaryAddress = (type: 'billingAddress' | 'shippingAddress') => {
    // if (type === 'shippingAddresses') {
    //   this.formData.isShippingAddressAsDefault = !this.formData.isShippingAddressAsDefault
    // }
    // else {
    //   this.formData.isBillingAddressAsDefault = !this.formData.isBillingAddressAsDefault
    // }

    const currentAddress = this.formData[type]

    this.formData[type] = {
      ...currentAddress,
      custom: {
        ...currentAddress.custom,
        fields: {
          isPrimary: !currentAddress.custom.fields.isPrimary,
        },
      },
    }
  }

  updateField<T extends keyof FormData>(field: T, value: FormData[T]) {
    this.formData[field] = value
  }

  updateAddress = (
    field: string,
    value: string,
    type: 'shippingAddress' | 'billingAddress',
  ) => {
    this.formData[type] = { ...this.formData[type], [field]: value }
  }

  setUseShippingForBilling = (value: boolean) => {
    this.formData.isUseShippingForBilling = value
    if (value) {
      this.formData.billingAddress = { ...this.formData.shippingAddress, id: nanoid() }
    }
    else {
      this.formData.billingAddress = { ...addressTemplate, id: nanoid() }
    }
  }

  resetForm(): void {
    this.formData = initialState
  }

  async submitForm() {
    const {
      firstName,
      lastName,
      email,
      password,
      dateOfBirth,
      shippingAddress,
      billingAddress,
    } = this.formData

    const dateOfBirthStr = dayjs(dateOfBirth).format('YYYY-MM-DD')

    const customerDraft: MyCustomerDraft = {
      email,
      password,
      firstName,
      lastName,
      dateOfBirth: dateOfBirthStr,
      addresses: [shippingAddress, billingAddress],
      defaultShippingAddress: 0,
      defaultBillingAddress: 1,
    }

    return registerCustomer(customerDraft)
  }
}

export const formStore = new FormStore()
