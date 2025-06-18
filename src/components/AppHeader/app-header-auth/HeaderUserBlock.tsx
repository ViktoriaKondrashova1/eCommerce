import { UserOutlined } from '@ant-design/icons'
import { Avatar, Flex, Popover } from 'antd'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'
import { AppButton } from '@/components/AppButton'
import { AppText } from '@/components/AppText/AppText'
import { customerStore } from '@/entities/customer/model/customer.store'
import { ROUTES } from '@/shared/constants'

export const HeaderUserBlock = observer(() => {
  const navigate = useNavigate()
  const content = (
    <Flex vertical>
      <AppButton color="default" variant="text" onClick={() => navigate(ROUTES.profile.info)}>
        PROFILE
      </AppButton>
      <AppButton
        color="default"
        variant="text"
        onClick={() => {
          customerStore.logout()
          navigate(ROUTES.main)
        }}
      >
        LOG OUT
      </AppButton>
    </Flex>
  )

  const { firstName } = customerStore.customer || {}
  const title = (
    <AppText style={{ textAlign: 'center', maxWidth: '130px' }} ellipsis>
      Hello,
      {' '}
      {firstName}
    </AppText>
  )

  return (
    <Popover
      data-testid="user-popover"
      content={content}
      title={title}
      trigger="click"
      placement="bottomRight"
      className="pointer"
      styles={{
        root: {
          maxWidth: '150px',
        },
      }}
    >
      <Avatar shape="square" icon={<UserOutlined />} />
    </Popover>
  )
})
