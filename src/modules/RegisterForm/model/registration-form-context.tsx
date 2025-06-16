import type { FormInstance } from 'antd'
import React from 'react'

const registerFormContext = React.createContext<{
  form: FormInstance
} | null>(null)

export function useRegisterFormContext() {
  const context = React.useContext(registerFormContext)
  if (!context) {
    throw new Error('useRegisterFormContext must be used within a RegisterFormProvider')
  }
  return context
}

export const RegisterFormProvider: React.FC<{ form: FormInstance, children: React.ReactNode }> = ({ form, children }) => {
  return (
    <registerFormContext.Provider value={{ form }}>
      {children}
    </registerFormContext.Provider>
  )
}
