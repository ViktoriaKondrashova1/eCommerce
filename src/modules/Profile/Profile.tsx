import type { FC } from 'react'
import { Card, Flex, Tabs } from 'antd'
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint'
import { observer } from 'mobx-react-lite'
import { useNavigate, useParams } from 'react-router-dom'
import { AppTitle } from '@/components/AppTitle/AppTitle.tsx'
import { Addresses } from '@/modules/Profile/ui/addresses/Addresses.tsx'
import { PersonalInfo } from '@/modules/Profile/ui/personalInfo/PersonalInfo.tsx'
import { Security } from '@/modules/Profile/ui/security/Security.tsx'
import './Profile.scss'

type ChapterKey = 'info' | 'addresses' | 'security'

const CHAPTERS: Record<ChapterKey, string> = {
  info: 'Personal Info',
  addresses: 'Addresses',
  security: 'Security settings',
} as const

export const Profile: FC = observer(() => {
  const { chapter } = useParams()
  const navigate = useNavigate()
  const screens = useBreakpoint()

  const isMobile = screens.md === false

  const getContent = (chapterKey: ChapterKey | string) => {
    switch (chapterKey) {
      case 'info': return <PersonalInfo />
      case 'addresses': return <Addresses />
      case 'security': return <Security />

      default:
        return null
    }
  }

  if (isMobile) {
    return (
      <Flex vertical gap={24} className="profile">
        <Card>
          <AppTitle level={2}>My Profile</AppTitle>
          {typeof chapter === 'string' && getContent(chapter)}
        </Card>
      </Flex>
    )
  }

  return (
    <Flex vertical gap={24} className="profile">
      <Card>
        <AppTitle level={2}>
          My Profile
        </AppTitle>
        <Tabs
          tabPosition="left"
          activeKey={chapter}
          onChange={key => navigate(`/profile/${key}`)}
          items={Object.entries(CHAPTERS).map(([key, label]) => ({
            key,
            label,
            children: getContent(key),
          }))}
        />

      </Card>
    </Flex>
  )
},
)
