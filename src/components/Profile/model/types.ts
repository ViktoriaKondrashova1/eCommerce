import type { CustomerSignInResult } from '@commercetools/platform-sdk'

export type Profile = CustomerSignInResult['customer']
export type FormMode = 'view' | 'edit'
