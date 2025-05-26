import type { FC } from 'react'
import { Card, Flex, Tabs } from 'antd'
import { observer } from 'mobx-react-lite'
import { useNavigate, useParams } from 'react-router-dom'
import { Billing } from '@/components/Profile/ui/billing/Billing.tsx'
import { PersonalInfo } from '@/components/Profile/ui/personalInfo/PersonalInfo.tsx'
import { Security } from '@/components/Profile/ui/security/Security.tsx'
import { Shipping } from '@/components/Profile/ui/shipping/Shipping.tsx'

type ChapterKey = 'info' | 'shipping' | 'billing' | 'security'

const CHAPTERS: Record<ChapterKey, string> = {
  info: 'Personal Info',
  shipping: 'Shipping addresses',
  billing: 'Billing addresses',
  security: 'Security settings',
} as const

export const Profile: FC = observer(() => {
  const { chapter } = useParams()
  const navigate = useNavigate()

  const getContent = (chapterKey: ChapterKey | string) => {
    switch (chapterKey) {
      case 'info': return <PersonalInfo />
      case 'shipping': return <Shipping />
      case 'billing': return <Billing />
      case 'security': return <Security />

      default:
        return null
    }
  }

  return (
    <Flex vertical gap={24} className="profile">
      <Card>
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
