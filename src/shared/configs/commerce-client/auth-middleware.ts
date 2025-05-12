import type { AuthMiddlewareOptions } from '@commercetools/sdk-client-v2'
import { createAuthMiddleWareOptions } from './factory'

/**
 * параметры аутентификации
 * createAuthMiddleWareOptions вызывается с провайдером, который берется из енва (если не задан, по дефолту используется админ)
 * getAuthMiddlewareOptions экспортирует объект с нужными опциями
 */
const options = createAuthMiddleWareOptions(import.meta.env.VITE_CTP_API_PROVIDER ?? 'ADMIN')

export const getAuthMiddlewareOptions = (): AuthMiddlewareOptions => options
