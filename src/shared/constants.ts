export const appName = 'BREWPORT'

export const promocode = 'BEER2025'

export const promocodeText = 'SPECIAL OFFER: Get 15% off your first order'

export const carouselData = [
  {
    id: 1,
    title: 'LAGER',
    image: 'https://www.noam.beer/cdn/shop/files/Schaum.png?v=1740134739&width=1080',
  },
  {
    id: 2,
    title: 'IPA',
    image: 'https://plus.unsplash.com/premium_photo-1695285406050-c0cdc1003e18?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 3,
    title: 'GOSE',
    image: 'https://i.pinimg.com/736x/54/af/00/54af00f045585174cfa4ef0f969f8f5d.jpg',
  },
  {
    id: 4,
    title: 'PALE ALE',
    image: 'https://i.pinimg.com/736x/4d/36/ba/4d36ba6955c05f85774a33a0ae02c2de.jpg',
  },
  {
    id: 5,
    title: 'STOUT',
    image: 'https://images.unsplash.com/photo-1585620384276-5a3112892e19?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 6,
    title: 'PILSNER',
    image: 'https://i.pinimg.com/736x/93/b3/63/93b3630fd3e5ce62a8d956451170ee2a.jpg',
  },
  {
    id: 7,
    title: 'RED ALE',
    image: 'https://i.pinimg.com/736x/74/36/39/74363998001ec8e17676c5db74dc0f5a.jpg',
  },
  {
    id: 8,
    title: 'SOUR',
    image: 'https://craft-beer.bold-themes.com/main-demo/wp-content/uploads/sites/3/2017/05/ingredients_03.jpg',
  },
]

export const mockProducts = [
  {
    ABV: '6.5',
    IBU: '60',
    brewery: 'Craft Brew Co',
    country: 'USA',
    category: 'IPA',
    title: 'IPA Master',
    description: 'A refreshing attempt at perfection with special Norwegian Kveik yeast, stone fruits notes like peach and apricot, 3 malt varieties for a rich crisp base and 4 American aroma hops, all working together to pull off a flawless, dry-hopped balancing act.',
    slug: 'ipa-master',
    id: 'prod-1',
    key: 'ipa-key-123',
    price: {
      amount: '$ 4.50',
      discount: '$ 4.00',
    },
    images: [
      { url: 'https://s2.wine.style/images_gen/175/175819/0_1_695x600.webp', dimensions: { w: 800, h: 600 } },
      { url: 'https://pivo.by/images/2016/10/lidskoe-ginger-beer-ipa-1000x666.jpg', dimensions: { w: 800, h: 600 } },
    ],
  },
  {
    ABV: '8.0',
    IBU: '45',
    brewery: 'Black Sheep Brewery',
    country: 'UK',
    category: 'Stout',
    title: 'Dark Night',
    description: 'This version of Scrumper Sour goes to dark fruits - black raspberries and cherries give this go around a bright acidity and a touch of sweetness to make for a refreshing and balanced beer.',
    slug: 'dark-night-stout',
    id: 'prod-2',
    price: {
      amount: '$ 5.50',
      discount: '',
    },
    images: [
      { url: 'https://s2.wine.style/images_raw/pages/stout1589773896.jpg', dimensions: { w: 800, h: 600 } },
      { url: 'https://click-or-die.ru/app/uploads/2020/03/guinnes-680x383.jpg', dimensions: { w: 800, h: 600 } },
      { url: 'https://opillia.com.ua/wp-content/uploads/2021/10/e28cedb01ffb769a6fdd21dc47b14586.jpg', dimensions: { w: 800, h: 600 } },
    ],
  },
  {
    ABV: '5.0',
    IBU: '25',
    brewery: 'Pure Brewing',
    country: 'Germany',
    category: 'Lager',
    title: 'Crystal Clear',
    description: 'Calidad Beer “Classic” is a refreshing, premium Mexican-style lager handcrafted with more high-quality ingredients than any leading Mexican beer on the scene. It is a sessionable, bright, crisp, light-bodied cerveza with sweet corn and crisp citrus notes.',
    slug: 'crystal-clear-lager',
    id: 'prod-3',
    price: {
      amount: '$ 3.50',
      discount: '$ 3.00',
    },
    // images специально отсутствуют для проверки опционального поля
  },
]

export const catalogPageLimit = 20

export const TOKEN_STORAGE_KEY = 'ctp_token_cache' as const
