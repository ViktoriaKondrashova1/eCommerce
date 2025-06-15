import type { FC } from 'react'
import { CodeOutlined, TeamOutlined } from '@ant-design/icons'
import { Carousel, Col, Divider, Flex, Row, Tag } from 'antd'
import { AppText } from '@/components/AppText/AppText.tsx'
import { AppTitle } from '@/components/AppTitle/AppTitle.tsx'
import { aboutPageContent, carouselImages, teamMembers } from '@/pages/AboutPage/constructor.ts'
import { TeamMemberCard } from '@/pages/AboutPage/MemberCards.tsx'
import { appName } from '@/shared/constants.ts'
import styles from './AboutPage.module.scss'

export const AboutPage: FC = () => {
  return (

    <div className={styles['about-page']}>
      <Flex justify="center">
        <div>
          <AppTitle level={1} className={styles.title}>
            {`Welcome to ${appName}`}
          </AppTitle>
          <Divider />
          <Flex vertical gap={12}>
            <AppText className={styles.description}>
              {aboutPageContent.description1}
            </AppText>
            <AppText className={styles.description}>
              {aboutPageContent.description2}
            </AppText>
          </Flex>
        </div>
      </Flex>

      <div className={styles['carousel-container']}>
        <Carousel
          className={styles.carousel}
          autoplay
          autoplaySpeed={3000}
          effect="fade"
          dotPosition="bottom"
        >
          {carouselImages.map((img, index) => (
            <div key={index}>
              <div
                className={styles['carousel-image']}
                style={{ backgroundImage: `url(${img})` }}
              >
              </div>
            </div>
          ))}
        </Carousel>
      </div>

      <Flex vertical>
        <Divider orientation="center">
          <AppTitle level={2}>
            <TeamOutlined />
            {' '}
            Meet Our Team
          </AppTitle>
        </Divider>
        <Flex vertical gap={12} className={styles['team-section']}>
          <AppText className={styles.description}>
            {aboutPageContent.teamDescription1}
          </AppText>
          <AppText className={styles.description}>
            {aboutPageContent.teamDescription2}
          </AppText>
        </Flex>

        <Row
          gutter={[24, 24]}
          className={styles['team-grid']}
          justify="center"
        >
          {teamMembers.map(member => (
            <Col key={member.bio} xs={22} sm={20} md={12} xl={8}>
              <TeamMemberCard member={member} />
            </Col>
          ))}
        </Row>

        <Divider></Divider>

        <Flex
          vertical
          align="center"
          className={styles['development-journey']}
        >
          <AppTitle level={3}>
            <CodeOutlined />
            {' '}
            Our Development Journey
          </AppTitle>
          <AppText style={{ marginBottom: 16 }}>
            {aboutPageContent.learningDescription}
          </AppText>
          <Flex gap={8} wrap="wrap" justify="center">
            {aboutPageContent.badges.map(badge => (
              <Tag
                key={badge}
                color="orange"
                className={styles.badge}
              >
                {badge}
              </Tag>
            ))}
          </Flex>
        </Flex>
      </Flex>

      <Flex gap={12} justify="center" vertical={true}>
        <Row justify="center">
          <Col>
            <AppText style={{ textAlign: 'center' }}>
              This project was created as part of the RS School curriculum, an educational program that provides free high-quality education in web development.
            </AppText>
          </Col>
        </Row>

        <Row justify="center" align="middle">
          <Col>
            <a href="https://rs.school/" target="_blank">
              <img
                src="https://rs.school/_next/static/media/rss-logo.c19ce1b4.svg"
                alt="RS School"
                className={styles['rs-logo']}
              />
            </a>
          </Col>
        </Row>
      </Flex>
    </div>
  )
}
