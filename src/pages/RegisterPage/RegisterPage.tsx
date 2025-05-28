import type { FC } from 'react'
import { Link } from 'react-router-dom'
import { AppText } from '@/components/AppText/AppText'
import { AppTitle } from '@/components/AppTitle/AppTitle'
import { RegisterContainer } from '@/components/RegisterForm/RegisterContainer'

export const RegisterPage: FC = () => {
  return (
    <>
      <AppTitle level={2} style={{ textAlign: 'center' }}>Register</AppTitle>

      <div style={{ textAlign: 'center' }}>
        <AppText>
          <RegisterContainer />
          Already have an account?
          {' '}
          <Link to="/login">Login</Link>
        </AppText>
      </div>
    </>
  )
}
