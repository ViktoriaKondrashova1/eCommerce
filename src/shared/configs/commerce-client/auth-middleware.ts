import type { AuthMiddlewareOptions } from '@commercetools/sdk-client-v2'
import { createAuthMiddleWareOptions } from './factory'

const options = createAuthMiddleWareOptions(import.meta.env.VITE_CTP_API_PROVIDER ?? 'ADMIN')

export const getAuthMiddlewareOptions = (): AuthMiddlewareOptions => options
