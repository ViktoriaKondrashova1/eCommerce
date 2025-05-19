import type { FC } from 'react'
import { Link } from 'react-router-dom'
import { AppText } from '@/components/AppText/AppText'
import { AppTitle } from '@/components/AppTitle/AppTitle'
import { Backdrop } from '@/components/Backdrop/Backdrop'
import { LoginForm } from '@/components/LoginForm/LoginForm'

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
