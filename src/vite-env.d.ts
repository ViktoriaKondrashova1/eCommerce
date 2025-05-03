/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CTP_AUTH_URL: string
  readonly VITE_CTP_API_URL: string
  readonly VITE_CTP_KEY: string
  readonly VITE_CTP_ADMIN_CLIENT_ID: string
  readonly VITE_CTP_ADMIN_SECRET: string
  readonly VITE_CTP_ADMIN_SCOPES: string
  readonly VITE_CTP_B2B_CLIENT_ID: string
  readonly VITE_CTP_B2B_SECRET: string
  readonly VITE_CTP_B2B_SCOPES: string
  readonly VITE_CTP_B2C_CLIENT_ID: string
  readonly VITE_CTP_B2C_SECRET: string
  readonly VITE_CTP_B2C_SCOPES: string
  readonly VITE_CTP_API_PROVIDER: 'ADMIN' | 'B2B' | 'B2C'

}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
