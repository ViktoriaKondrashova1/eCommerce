import type { FC } from 'react'
import type { BaseComponent } from '@/shared/types/common.types'
import { Flex, Result } from 'antd'
import { useNavigate } from 'react-router-dom'
import beerIcon from '@/assets/broken-bottle.png'
import { AppButton } from '@/components/AppButton'
import './NotFoundPage.scss'

interface Props extends BaseComponent {}

export const NotFoundPage: FC<Props> = ({ testId = 'not-found-page' }) => {
  const navigate = useNavigate()

  return (
    <div data-testid={testId}>
      <Result
        title="404: Beer Not Found!"
        subTitle="Sorry, the page you visited does not exist."
        extra={(
          <Flex justify="center" gap="small">
            <AppButton type="primary" onClick={() => navigate('/')}>Back Home</AppButton>
            <AppButton type="primary" onClick={() => navigate('/catalog/1')}>Explore Beers</AppButton>
          </Flex>
        )}
        icon={<img src={beerIcon} alt="broken beer" width={200} />}
      />
    </div>

  )
}
