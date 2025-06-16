import type { FormDataAddress, StatePersonalInfo } from '@/modules/Profile/model/types.ts'
import type { Address } from '@commercetools/platform-sdk'
import { getCountryAbbr } from '@/modules/Profile/model/lib.ts'
import dayjs from 'dayjs'
import { nanoid } from 'nanoid'

export const profileAdapter = {
  exportUpdateAddress: (formState: FormDataAddress, controllerValues: FormDataAddress): FormDataAddress => {
    return {
      id: formState.id,
      type: controllerValues.type,
      streetName: controllerValues.streetName,
      postalCode: controllerValues.postalCode,
      city: controllerValues.city,
      isPrimary: controllerValues.isPrimary,
      country: getCountryAbbr(controllerValues.country),
      custom: {
        type: { key: 'address-custom-field' },
        fields: {
          isPrimary: Boolean(controllerValues.isPrimary),
        },
      },
    } satisfies FormDataAddress
  },

  exportAddAddress: (controllerValues: FormDataAddress): FormDataAddress => {
    return {
      ...controllerValues,
      country: getCountryAbbr(controllerValues.country),
      id: nanoid(),
    } satisfies FormDataAddress
  },

  exportUserInfo: (formData: StatePersonalInfo): { email: string, firstName: string, lastName: string, dateOfBirth: string } => {
    return {
      email: formData.email,
      firstName: formData.firstName ?? '',
      lastName: formData.lastName ?? '',
      dateOfBirth: dayjs(formData.dateOfBirth).format('YYYY-MM-DD'),
    }
  },

  importAddresses: ({ addresses, billingIds }: { addresses: Address[], billingIds: string[] }): FormDataAddress[] => {
    return addresses?.map((addr) => {
      const isBillingAddress = billingIds?.some(id => id === addr?.id)
      const isPrimary
          = addr.custom?.fields.isPrimary !== undefined
            ? Boolean(addr.custom?.fields.isPrimary)
            : false

      return {
        ...addr,
        type: isBillingAddress ? 'billing' : 'shipping',
        isPrimary,
        custom: {
          ...addr.custom,
          type: { key: 'address-custom-field' },
          fields: {
            isPrimary: Boolean(addr?.custom?.fields.isPrimary),
          },
        },
      } satisfies FormDataAddress
    })
  },
}
