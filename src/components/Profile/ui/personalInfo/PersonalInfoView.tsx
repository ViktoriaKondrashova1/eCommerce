import type { FC } from 'react'
import type { StatePersonalInfo } from '@/components/Profile/model/types.ts'
import { CalendarOutlined, MailOutlined } from '@ant-design/icons'
import { Flex } from 'antd'
import dayjs from 'dayjs'
import { observer } from 'mobx-react-lite'
import { AppText } from '@/components/AppText/AppText.tsx'
import { AppTitle } from '@/components/AppTitle/AppTitle.tsx'

interface Props {
  data: StatePersonalInfo
}
export const PersonalInfoView: FC<Props> = observer(({ data }) => {
  return (
    <Flex vertical>
      <AppTitle level={3}>
        {data.firstName}
        {' '}
        {data.lastName}
      </AppTitle>

      <AppText type="secondary">
        <MailOutlined />
        {' '}
        {data.email}
      </AppText>

      <AppText type="secondary">
        <CalendarOutlined />
        {' '}
        {dayjs(data.dateOfBirth).format('YYYY-MM-DD')}
      </AppText>
    </Flex>
  )
})
