export const appName = 'BREWPORT'

export const promocode15 = 'BEER2025'

export const promocode20 = 'BREWPORT'

export const promocodeText15 = 'SPECIAL OFFER: Get 15% off your first order'

export const promocodeText20 = 'SPECIAL OFFER: Get 20% off your first order'

export const catalogPageLimit = 20

export const TOKEN_STORAGE_KEY = 'ctp_token_cache' as const

export const CART_STORAGE_KEY = 'cart'

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
