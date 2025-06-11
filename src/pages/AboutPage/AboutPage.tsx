import type { FC } from 'react'
import { CodeOutlined, TeamOutlined } from '@ant-design/icons'
import { Carousel, Col, Divider, Flex, Row, Tag } from 'antd'
import { AppText } from '@/components/AppText/AppText.tsx'
import { AppTitle } from '@/components/AppTitle/AppTitle.tsx'
import { aboutPageContent, carouselImages, teamMembers } from '@/pages/AboutPage/constructor.ts'
import { TeamMemberCard } from '@/pages/AboutPage/MemberCards.tsx'
import { appName } from '@/shared/constants.ts'

export const AboutPage: FC = () => {
  return (

    <div>
      <Flex justify="center" style={{ textAlign: 'center' }}>
        <div>
          <AppTitle level={1} style={{ margin: 0 }}>
            {`Welcome to ${appName}`}
          </AppTitle>
          <Divider />
          <Flex vertical gap={12}>
            <AppText style={{ fontSize: 16 }}>
              {aboutPageContent.description1}
            </AppText>
            <AppText style={{ fontSize: 16 }}>
              {aboutPageContent.description2}
            </AppText>
          </Flex>
        </div>
      </Flex>

      <div style={{
        margin: '40px 0',
        width: '100%',
      }}
      >
        <Carousel
          style={{ width: '90%' }}
          autoplay
          autoplaySpeed={3000}
          effect="fade"
          dotPosition="bottom"
        >
          {carouselImages.map((img, index) => (
            <div key={index}>
              <div style={{
                height: '640px',
                minWidth: '420px',
                backgroundImage: `url(${img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '8px',
                position: 'relative',
              }}
              >
              </div>
            </div>
          ))}
        </Carousel>
      </div>

      <Flex vertical>
        <Divider orientation="center">
          <AppTitle level={2} style={{ padding: 0 }}>
            <TeamOutlined />
            {' '}
            Meet Our Team
          </AppTitle>
        </Divider>
        <Flex vertical gap={12} style={{ marginBottom: 40, textAlign: 'center' }}>
          <AppText style={{ fontSize: 16 }}>
            {aboutPageContent.teamDescription1}
          </AppText>
          <AppText style={{ fontSize: 16 }}>
            {aboutPageContent.teamDescription2}
          </AppText>
        </Flex>

        <Row
          gutter={[24, 24]}
          style={{ padding: '0 16px' }}
          justify="center"
        >
          {teamMembers.map(member => (
            <Col key={member.bio} xs={22} sm={15} md={12} xl={8}>
              <TeamMemberCard member={member} />
            </Col>
          ))}
        </Row>

        <Divider></Divider>

        <Flex
          vertical
          align="center"
          style={{
            maxWidth: 800,
            padding: 30,
            background: '#f9f9f9',
            borderRadius: 15,
            border: '1px dashed #d9d9d9',
            margin: '20px auto',
            textAlign: 'center',
          }}
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
                style={{ fontSize: 14 }}
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
              This project was created as part of the
              <a style={{ color: '#0f1188' }} className="school-link" href="https://rs.school/" target="_blank">
                {' '}
                RS
                School
                {' '}
              </a>
              curriculum, an educational program that provides free high-quality education in web development.
            </AppText>
          </Col>
        </Row>

        <Row justify="center" align="middle">
          <Col>
            <a href="https://rs.school/" target="_blank" rel="noopener noreferrer">
              <img
                src="https://rs.school/_next/static/media/rss-logo.c19ce1b4.svg"
                alt="RS School"
                style={{ height: 40 }}
              />
            </a>
          </Col>
        </Row>
      </Flex>
    </div>
  )
}
