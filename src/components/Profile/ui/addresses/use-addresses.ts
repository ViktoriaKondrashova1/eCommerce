import type { FormDataAddress } from '@/components/Profile/model/types.ts'
import { useEffect, useState } from 'react'
import { profileAdapter } from '@/components/Profile/model/adapter.ts'
import { customerStore } from '@/entities/customer/model/customer.store.ts'

export function useAddresses() {
  const [addresses, setAddresses] = useState<FormDataAddress[] | []>([])

  useEffect(() => {
    const { addresses, billingAddressIds } = customerStore.customer || {}

    const normalizedAddresses = profileAdapter.importAddresses({ addresses: addresses ?? [], billingIds: billingAddressIds ?? [] })

    setAddresses(() => normalizedAddresses)
  }, [customerStore.customer?.addresses])

  return addresses
}
