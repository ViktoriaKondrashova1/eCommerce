import type { FC } from 'react'
import { Card, Col, Row } from 'antd'
import { AppText } from '../AppText/AppText'
import { AppTitle } from '../AppTitle/AppTitle'
import './MainPageGrid.scss'

const gridData = [
  {
    id: 1,
    content: (
      <img
        src="https://images.unsplash.com/photo-1593599860902-b8cf009c427c?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        style={{ maxWidth: '100%', maxHeight: 350 }}
      />
    ),
  },
  {
    id: 2,
    content: (
      <img
        src="https://craft-beer.bold-themes.com/main-demo/wp-content/uploads/sites/3/2017/05/inner_vertical_transparent_01.png"
        style={{ maxWidth: '100%', maxHeight: 450 }}
      />
    ),
    isAlternateBg: true,
  },
  {
    id: 3,
    content: (
      <>
        <AppTitle level={2}>THE CRUELEST WINTER ALE</AppTitle>
        <AppText>
          Brewed to conquer the coldest nights, this bold ale blends rich malt warmth with a hint of spice.
          Dark, robust, and unforgiving—like winter itself. Best enjoyed by a roaring fire.
          A liquid rebellion against the frost, rewarding those who brave the chill.
        </AppText>
      </>
    ),
  },
  {
    id: 4,
    content: (
      <>
        <AppTitle level={2}>THE BEST WEISS BEER ON EARTH</AppTitle>
        <AppText>
          Crafted with Bavarian tradition, this unfiltered masterpiece bursts with flavors of banana,
          clove, and sun-ripened wheat. Light yet complex, with a velvety haze that dances in golden
          perfection. Every sip is sunshine in a glass—pure, refreshing, and endlessly drinkable.
          The ultimate tribute to 500 years of brewing artistry.
        </AppText>
      </>
    ),
    isAlternateBg: true,
  },
  {
    id: 5,
    content: (
      <img
        src="https://images.unsplash.com/photo-1601790189147-a6213f4feb9b?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        style={{ maxWidth: '100%', maxHeight: 350 }}
      />
    ),
  },
  {
    id: 6,
    content: (
      <img
        src="https://craft-beer.bold-themes.com/main-demo/wp-content/uploads/sites/3/2017/05/inner_vertical_transparent_02.png"
        style={{ maxWidth: '100%', maxHeight: 450 }}
      />
    ),
    isAlternateBg: true,
  },
]

export const MainPageGrid: FC = () => {
  return (
    <div>
      <Row gutter={[0, 0]}>
        {gridData.slice(0, 3).map(item => (
          <Col
            key={item.id}
            xs={24}
            sm={24}
            md={8}
          >
            <Card
              className="grid-section-card"
              style={{ backgroundColor: item.isAlternateBg ? 'inherit' : 'white' }}
            >
              {item.content}
            </Card>
          </Col>
        ))}
      </Row>
      <Row gutter={[0, 0]}>
        {gridData.slice(3, 6).map(item => (
          <Col
            key={item.id}
            xs={24}
            sm={24}
            md={8}
          >
            <Card
              className="grid-section-card"
              style={{ backgroundColor: item.isAlternateBg ? 'inherit' : 'white' }}
            >
              {item.content}
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}
