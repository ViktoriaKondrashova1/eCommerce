import type { BaseComponent } from '@/shared/types/common.types'
import type { FC } from 'react'
import beerIcon from '@/assets/broken-bottle.png'
import { AppButton } from '@/components/AppButton'
import { Flex, Result } from 'antd'
import { useNavigate } from 'react-router-dom'
import './NotFoundPage.scss'

interface Props extends BaseComponent {}

export const NotFoundPage: FC<Props> = ({ testId = 'not-found-page' }) => {
  const navigate = useNavigate()

  return (
    <Result
      data-testid={testId}
      title="404: Beer Not Found!"
      subTitle="Sorry, the page you visited does not exist."
      extra={(
        <Flex justify="center" gap="small">
          <AppButton type="primary" onClick={() => navigate('/')}>Back Home</AppButton>
          <AppButton type="primary" onClick={() => navigate('/catalog')}>Explore Beers</AppButton>
        </Flex>
      )}
      icon={<img src={beerIcon} alt="broken beer" width={200} />}
    />
  )
}
