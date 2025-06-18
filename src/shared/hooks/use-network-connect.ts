import { useEffect } from 'react'
import { useNotify } from '@/shared/hooks/use-notify'

export function useNetworkConnection(): void {
  const { showWarningNotify, showSuccessNotify } = useNotify()

  const showConnected = () => showSuccessNotify('Network connected')
  const showDisconnected = () => showWarningNotify('Network connection lost')

  useEffect(() => {
    window.addEventListener('offline', showDisconnected)
    window.addEventListener('online', showConnected)

    return () => {
      window.removeEventListener('offline', showDisconnected)
      window.removeEventListener('online', showConnected)
    }
  }, [])
}
