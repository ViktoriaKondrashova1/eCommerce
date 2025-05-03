import type { FC } from 'react'
import { AppText } from '@/components/AppText/AppText'
import { AppTitle } from '@/components/AppTitle/AppTitle'
import { Backdrop } from '@/components/Backdrop/Backdrop'
import { LoginForm } from '@/components/LoginForm/LoginForm'
import { Link } from 'react-router-dom'

export const LoginPage: FC = () => {
  return (
    <>
      <Backdrop>
        <AppTitle level={2} style={{ textAlign: 'center' }}>Login</AppTitle>
        <LoginForm />
        <div style={{ textAlign: 'center' }}>
          <AppText>
            Don't have an account?
            {' '}
            <Link to="/register">Register</Link>
          </AppText>
        </div>
      </Backdrop>
    </>
  )
}
