export const appName = 'BREWPORT'

export const promocode = 'BEER2025'

export const promocodeText = 'SPECIAL OFFER: Get 15% off your first order'

export const catalogPageLimit = 20

export const TOKEN_STORAGE_KEY = 'ctp_token_cache' as const

export const ROUTES = {
  main: '/',
  profile: {
    root: '/profile',
    info: '/profile/info',
    addresses: '/profile/addresses',
    security: '/profile/security',
  },
  catalog: {
    root: '/catalog',
    default: '/catalog/1',
  },
  about: '/about',
  cart: '/cart',
  login: '/login',
  register: '/register',
} as const
