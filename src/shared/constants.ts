export const appName = 'BrewPort'

export const promocode = 'BEER2025'

export const promocodeText = 'SPECIAL OFFER: Get 15% off your first order!'

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
    id: 1,
    title: 'Duvel',
    category: 'Pale Ale',
    country: 'Belgium',
    brewery: 'Duvel Moortgat Brewery',
    ABV: '8.5%',
    IBU: 'N/A',
    price: '$5.95',
    description: 'Duvel is a natural beer with a subtle bitterness, a refined flavour and a distinctive hop character. The refermentation in the bottle and a long maturation, guarantees a pure character, delicate effervescence and a pleasant sweet taste of alcohol.',
    images: [
      'https://images.squarespace-cdn.com/content/v1/65dca9e40147be713273f29d/d869679b-0627-468c-a6a4-af58d7284398/DuvelxHenriPFR-HR-BuroBonito-26%2B.jpeg?format=750w',
      'https://www.thirsty.com.sg/cdn/shop/files/DuvelGoldenMobile.jpg?v=1709181756&width=800',
      'https://images.squarespace-cdn.com/content/v1/65dca9e40147be713273f29d/8269f05a-832b-4a37-885a-72d6e46bdac9/DuvelxHenriPFR-HR-BuroBonito-24.jpeg?format=750w',
    ],
  },
  {
    id: 2,
    title: 'Gigant Blonde Kveik IPA \'Yellow Stone',
    category: 'IPA',
    country: 'Belgium',
    brewery: 'Kanaal One / Gigant',
    ABV: '4.4%',
    IBU: 'N/A',
    price: '$6.50',
    description: 'A refreshing attempt at perfection with special Norwegian Kveik yeast, stone fruits notes like peach and apricot, 3 malt varieties for a rich crisp base and 4 American aroma hops, all working together to pull off a flawless, dry-hopped balancing act.',
    images: [
      'https://i0.wp.com/packagingoftheworld.com/wp-content/uploads/2021/11/Zware-Jongens_Gigant_1.jpeg?fit=1001%2C1500&ssl=1',
      'https://i0.wp.com/packagingoftheworld.com/wp-content/uploads/2021/11/Zware-Jongens_Gigant_4.jpeg?fit=1001%2C1500&ssl=1',
      'http://i0.wp.com/packagingoftheworld.com/wp-content/uploads/2021/11/Zware-Jongens_Gigant_13.jpg?fit=1001%2C1500&ssl=1',
      'https://i0.wp.com/packagingoftheworld.com/wp-content/uploads/2021/11/Zware-Jongens_Gigant_9.jpeg?fit=1001%2C1500&ssl=1',
    ],
  },
  {
    id: 3,
    title: 'Raspberried at Sea',
    category: 'Sour',
    country: 'United States',
    brewery: 'Pelican Brewing Company',
    ABV: '6%',
    IBU: '25',
    price: '$7.25',
    discount: '$6.34',
    description: 'Some of the most delicious and plentiful berries from the Pacific Northwest are red raspberries. Imagining the perfect beer to highlight this glorious fruit led to a lighter touch with malt and hops, letting the raspberries shine through. Raspberried at Sea Volume II is even more drinkable than its predecessor and starts with a base beer of clean malty simplicity, then layers on color and flavor with immense amounts of raspberries and carefully selected ale yeast. With a light color topped by pink-hued foam, and an aroma and flavor that layers bright raspberry flavor with light malt flavor, this beer brings to mind a sparkling rosé perfect for the season.',
    images: [
      'https://i.pinimg.com/736x/80/c4/63/80c463d5c9aa0cc14ea0702aecf1b9e1.jpg',
      'https://res.cloudinary.com/tavour/image/upload/siatk83gy89db7e76ihd',
    ],
  },
  {
    id: 4,
    title: 'Farm To Face',
    category: 'Pale Ale',
    country: 'United States',
    brewery: 'Allagash Brewing Company',
    ABV: '5.7%',
    IBU: 'N/A',
    price: '$8.75',
    description: 'FARM TO FACE was brewed as a pale ale and fermented in stainless with our house yeast. After primary fermentation, pediococcus and lactobacillus were added along with 3lbs of peaches per gallon. Ten months later, the finshed beer is bright amber in color with peach, graham cracker and green apple in the aroma. Drinking this medium bodied beer is like biting into a juicy peach with tartness throughout. The finish has a long lasting peachyness.',
    images: [
      'https://i.pinimg.com/736x/f8/f2/69/f8f269c56e7e4d75b6ce17e977d00f52.jpg',
      'https://www.totalwine.com/dynamic/x1000,375ml/media/sys_master/twmmedia/h2e/hc2/9664168591390.png',
    ],
  },
]
