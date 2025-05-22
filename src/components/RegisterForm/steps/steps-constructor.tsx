import type { ReactNode } from 'react'
import { Billing } from '@/components/RegisterForm/steps/Billing'
import { Passwords } from '@/components/RegisterForm/steps/Password'
import { Shipping } from '@/components/RegisterForm/steps/Shipping'
import { PersonalInfo } from './Info'

export const steps: { title?: string, content: ReactNode }[] = [
  {
    title: 'Info',
    content: <PersonalInfo />,
  },
  {
    title: 'Shipping',
    content: <Shipping />,
  },
  {
    title: 'Billing',
    content: <Billing />,
  },
  {
    title: 'Finish',
    content: <Passwords />,
  },
] as const
