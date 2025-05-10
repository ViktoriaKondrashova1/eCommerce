import type { FC } from 'react'
import { AppText } from '@/components/AppText/AppText'
import { AppTitle } from '@/components/AppTitle/AppTitle'
// import { Backdrop } from '@/components/Backdrop/Backdrop'
import { RegisterContainer } from '@/components/RegisterForm/RegisterContainer'
// import { RegisterForm } from '@/components/RegisterForm/RegisterForm'
import { Link } from 'react-router-dom'

export const RegisterPage: FC = () => {
  return (
    <>
      {/* <Backdrop> */}
      <AppTitle level={2} style={{ textAlign: 'center' }}>Register</AppTitle>

      <div style={{ textAlign: 'center' }}>
        <AppText>
          <RegisterContainer />
          Already have an account?
          {' '}
          <Link to="/login">Login</Link>
        </AppText>
      </div>
      {/* </Backdrop> */}
    </>
  )
}
