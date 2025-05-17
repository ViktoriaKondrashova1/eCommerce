import type { AddressDraft, BaseAddress, CustomerDraft } from '@commercetools/platform-sdk'
import type { Dayjs } from 'dayjs'
import { makeAutoObservable } from 'mobx'
import { registerCustomer } from '@/entities/customer/api/sign-up'

export interface AddressWithCustomFileds extends Omit<AddressDraft, 'custom'> {
  custom: {
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
  useShippingForBilling: boolean
  password: string
  confirmPassword: string
}

export class FormStore {
  formData: FormData = {
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: null,
    shippingAddresses: [
      {
        id: '1',
        country: '',
        city: '',
        postalCode: '',
        streetName: '',
        custom: {
          fields: {
            isPrimary: true,
          },
        },
      },
    ],
    billingAddresses: [
      {
        id: '999',
        country: '',
        city: '',
        postalCode: '',
        streetName: '',
        custom: {
          fields: {
            isPrimary: true,
          },
        },
      },
    ],
    useShippingForBilling: false,
    password: '',
    confirmPassword: '',
  }

  constructor() {
    makeAutoObservable(this)
  }

  updateField<T extends keyof FormData>(field: T, value: FormData[T]) {
    this.formData[field] = value
  }

  addShippingAddress = () => {
    const newAddress = {
      id: crypto.randomUUID(),
      country: '',
      city: '',
      postalCode: '',
      street: '',
      custom: {
        fields: {
          isPrimary: false,
        },
      },
    }
    this.formData.shippingAddresses.push(newAddress)
  }

  addBillingAddress = () => {
    const newAddress = {
      id: crypto.randomUUID(),
      country: '',
      city: '',
      postalCode: '',
      street: '',
      custom: {
        fields: {
          isPrimary: false,
        },
      },
    }
    this.formData.billingAddresses.push(newAddress)
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

  setPrimaryShippingAddress = (id: string | undefined) => {
    this.formData.shippingAddresses = this.formData.shippingAddresses.map(
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
    this.formData.useShippingForBilling = value
    if (value) {
      this.formData.billingAddresses = this.formData.shippingAddresses.map(
        address => ({
          ...address,
          id: crypto.randomUUID(),
        }),
      )
    }
    else {
      this.formData.billingAddresses = [
        {
          id: crypto.randomUUID(),
          country: '',
          city: '',
          postalCode: '',
          streetName: '',
          custom: {
            fields: {
              isPrimary: true,
            },
          },
        },
      ]
    }
  }

  async submitForm() {
    try {
      const {
        firstName,
        lastName,
        email,
        password,
        dateOfBirth,
        shippingAddresses,
        billingAddresses,
      } = this.formData

      const dateOfBirthStr = dateOfBirth ? dateOfBirth.toISOString().split('T')[0] : undefined

      const addresses: BaseAddress[] = [
        ...shippingAddresses.map(addr => ({
          key: addr.id,
          country: addr.country,
          city: addr.city,
          postalCode: addr.postalCode,
          streetName: addr.streetName,
        })),
        ...billingAddresses.map(addr => ({
          key: addr.id,
          country: addr.country,
          city: addr.city,
          postalCode: addr.postalCode,
          streetName: addr.streetName,
        })),
      ]

      const customerDraft: CustomerDraft = {
        email,
        password,
        firstName,
        lastName,
        dateOfBirth: dateOfBirthStr,
        addresses,
      }

      const response = await registerCustomer(customerDraft)

      return response
    }
    catch {
      throw new Error('Registration failed:')
    }
  }
}

export const formStore = new FormStore()
