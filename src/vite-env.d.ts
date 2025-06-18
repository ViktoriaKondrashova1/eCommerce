/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CTP_AUTH_URL: string
  readonly VITE_CTP_API_URL: string
  readonly VITE_CTP_KEY: string
  readonly VITE_CTP_ADMIN_CLIENT_ID: string
  readonly VITE_CTP_ADMIN_SECRET: string
  readonly VITE_CTP_ADMIN_SCOPES: string
  readonly VITE_CTP_FRONTEND_CLIENT_CLIENT_ID: string
  readonly VITE_CTP_FRONTEND_CLIENT_SECRET: string

  readonly VITE_CTP_FRONTEND_CLIENT_SCOPES: string
  readonly VITE_CTP_API_PROVIDER: 'ADMIN' | 'FRONTEND_CLIENT'

}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
