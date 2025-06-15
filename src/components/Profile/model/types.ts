import type { Customer, CustomerSignInResult } from '@commercetools/platform-sdk'
import type { Dayjs } from 'dayjs'
import type { AddressWithCustomFields } from '@/modules/RegisterForm/model/form-store.ts'

export type Profile = CustomerSignInResult['customer']
export type FormMode = 'view' | 'edit'
export interface StatePersonalInfo extends Pick<Customer, 'firstName' | 'lastName' | 'email'> {
  dateOfBirth: string | Dayjs
}

export interface StateSecurity {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export interface FormDataAddress extends AddressWithCustomFields {
  isPrimary: boolean
  type: 'shipping' | 'billing'
}
