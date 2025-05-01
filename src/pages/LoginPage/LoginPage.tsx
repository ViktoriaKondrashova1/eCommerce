import type { FC } from 'react'
import { AppText } from '@/components/AppText/AppText'
import { AppTitle } from '@/components/AppTitle/AppTitle'
import { LoginForm } from '@/components/LoginForm/LoginForm'
import { Card } from 'antd'
import { Link } from 'react-router-dom'

export const LoginPage: FC = () => {
  return (
    <>
      <Card style={{ maxWidth: 400, margin: '0 auto' }}>
        <AppTitle level={2} style={{ textAlign: 'center' }}>Login</AppTitle>
        <LoginForm />
        <div style={{ textAlign: 'center' }}>
          <AppText>
            Don't have an account?
            {' '}
            <Link to="/register">Register</Link>
          </AppText>
        </div>
      </Card>
    </>
  )
}
