import type { ReactNode } from 'react'
import { Billing } from '@/components/RegisterForm/steps/Billing'
import { Passwords } from '@/components/RegisterForm/steps/Password'
import { Shipping } from '@/components/RegisterForm/steps/Shipping'
import { PersonalInfo } from './Info'

export const steps: { title?: string, description: string, content: ReactNode }[] = [
  {
    title: 'Info',
    description: 'Personal info',
    content: <PersonalInfo />,
  },
  {
    title: 'Shipping',
    description: 'Shipping addresses',
    content: <Shipping />,
  },
  {
    title: 'Billing',
    description: 'Billing addresses',
    content: <Billing />,
  },
  {
    title: 'Finish',
    description: 'Finish registration',
    content: <Passwords />,
  },
] as const
