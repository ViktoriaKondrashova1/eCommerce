import { useCallback, useEffect, useState } from 'react'

type RequestFunction<T> = () => Promise<T>

interface RequestResult<T> {
  data: T | null
  isLoading: boolean
  isError: boolean
  error: Error | null
}

export function useRequest<T>(request: RequestFunction<T>): RequestResult<T> {
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isError, setIsError] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  const executeRequest = useCallback(async () => {
    setIsLoading(true)
    setIsError(false)
    setError(null)

    try {
      const response = await request()
      setData(response)
      return response
    }
    catch (err) {
      setIsError(true)
      setError(err instanceof Error ? err : new Error('Unknown error'))
      return null
    }
    finally {
      setIsLoading(false)
    }
  }, [request])

  useEffect(() => {
    executeRequest().catch(() => {
      throw new Error('Request failed')
    })
  }, [executeRequest])

  return { data, isLoading, isError, error }
}
