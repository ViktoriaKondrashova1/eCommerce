import type { ReactNode } from 'react'
import { Billing } from '@/modules/RegisterForm/ui/steps/Billing.tsx'
import { Passwords } from '@/modules/RegisterForm/ui/steps/Password.tsx'
import { Shipping } from '@/modules/RegisterForm/ui/steps/Shipping.tsx'
import { PersonalInfo } from './Info.tsx'

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
