import type { FC } from 'react'
import { AppText } from '@/components/AppText/AppText'
import { AppTitle } from '@/components/AppTitle/AppTitle'
import { Backdrop } from '@/components/Backdrop/Backdrop'
import { LoginForm } from '@/modules/LoginForm/LoginForm'
import { Link } from 'react-router-dom'

export const LoginPage: FC = () => {
  return (
    <>
      <Backdrop style={{ width: 400 }}>
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
