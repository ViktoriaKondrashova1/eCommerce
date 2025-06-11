import type { FC } from 'react'
import type { teamMembers } from '@/pages/AboutPage/constructor.ts'
import { FileTextOutlined, GithubOutlined, RocketOutlined } from '@ant-design/icons'
import { Avatar, Card, Flex, List } from 'antd'
import React, { useState } from 'react'

import { AppButton } from '@/components/AppButton'
import { AppText } from '@/components/AppText/AppText.tsx'
import { AppTitle } from '@/components/AppTitle/AppTitle.tsx'

export const TeamMemberCard: FC<{ member: typeof teamMembers[0] }> = ({ member }) => {
  const [hovered, setHovered] = useState(false)

  const cardStyle: React.CSSProperties = {
    height: '100%',
    boxShadow: '0 5px 15px rgba(0,0,0,0.08)',
    transition: 'all 0.3s ease',
    transform: hovered ? 'translateY(-10px)' : 'none',
    display: 'flex',
    flexDirection: 'column',
  }

  const avatarStyle: React.CSSProperties = {
    width: 140,
    height: 140,
    transition: 'all 0.3s ease',
    transform: hovered ? 'scale(1.1)' : 'scale(1)',
    boxShadow: hovered ? '0 8px 20px rgba(0,0,0,0.15)' : '0 5px 15px rgba(0,0,0,0.1)',
    objectFit: 'cover',
    borderRadius: '100px',
  }

  return (
    <Card
      style={cardStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Flex justify="center" style={{ padding: '30px 0 20px' }}>
        <Avatar
          size={140}
          src={member.photo}
          style={avatarStyle}
          alt={member.name}
        >
          {!member.photo && member.name.charAt(0)}
        </Avatar>
      </Flex>
      <Card.Meta
        title={<AppText strong style={{ fontSize: 26 }}>{member.name}</AppText>}
        description={<AppText type="secondary">{member.role}</AppText>}
        style={{ marginBottom: 15 }}
      />

      <AppText style={{ color: '#5a6268', fontSize: 14 }}>
        {member.bio}
      </AppText>

      <div style={{
        background: '#f8f9fa',
        borderRadius: 10,
        padding: 15,
        margin: '20px 0',
        flex: 1,
      }}
      >
        <AppTitle level={4}>
          <RocketOutlined />
          {' '}
          Key Contributions:
        </AppTitle>
        <List
          size="small"
          dataSource={member.contributions}
          renderItem={item => <List.Item>{item}</List.Item>}
          style={{ marginTop: 8 }}
        />
      </div>

      <Flex gap={16} style={{ width: '100%' }}>
        <AppButton
          type="primary"
          icon={<GithubOutlined />}
          href={member.github}
          target="_blank"
          block
        >
          GitHub Profile
        </AppButton>

        <AppButton
          icon={<FileTextOutlined />}
          href={member.resume}
          target="_blank"
          block
        >
          View Resume
        </AppButton>
      </Flex>
    </Card>
  )
}
