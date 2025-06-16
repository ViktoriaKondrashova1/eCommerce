import type { FormDataAddress } from '@/modules/Profile/model/types.ts'
import { customerStore } from '@/entities/customer/model/customer.store.ts'
import { profileAdapter } from '@/modules/Profile/model/adapter.ts'
import { useEffect, useState } from 'react'

export function useAddresses() {
  const [addresses, setAddresses] = useState<FormDataAddress[] | []>([])

  useEffect(() => {
    const { addresses, billingAddressIds } = customerStore.customer || {}

    const normalizedAddresses = profileAdapter.importAddresses({ addresses: addresses ?? [], billingIds: billingAddressIds ?? [] })

    setAddresses(() => normalizedAddresses)
  }, [customerStore.customer?.addresses])

  return addresses
}
