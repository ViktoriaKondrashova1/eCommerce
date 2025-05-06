import type { FC } from 'react'
import { ArrowRightOutlined } from '@ant-design/icons'
import { Flex } from 'antd'
import { useNavigate } from 'react-router-dom'
import { AppButton } from '../AppButton/AppButton'
import { AppProductCard } from '../AppProductCard/AppProductCard'
import { AppTitle } from '../AppTitle/AppTitle'

const mockProducts = [
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

export const NewProducts: FC = () => {
  const navigate = useNavigate()

  return (
    <Flex vertical gap="large">
      <Flex justify="space-between">
        <AppTitle level={3}>NEW</AppTitle>
        <AppButton type="text" icon={<ArrowRightOutlined />} iconPosition="end" onClick={() => navigate('/catalog')}>Go To Catalog</AppButton>
      </Flex>
      <Flex wrap="wrap" justify="space-around" gap="large">
        {mockProducts.map(card =>
          <AppProductCard key={card.id} title={card.title} imageUrl={card.images[0]} price={card.price} category={card.category} brewery={card.brewery} discount={card.discount} />,
        )}
      </Flex>
    </Flex>
  )
}
