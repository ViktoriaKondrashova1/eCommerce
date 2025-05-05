import type { FC } from 'react'
import { DatePicker, Form, Input } from 'antd'
import { useState } from 'react'
import { AppInput } from '../AppInput/AppInput'
import { confirmPasswordValidationRules, dateValidationRules, emailValidationRules, nameValidationRules, passwordValidationRules } from './index'

export const RegisterForm: FC = () => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false)

  return (
    <>
      <Form name="register" style={{ maxWidth: 360 }} layout="vertical">
        <Form.Item
          name="firstName"
          label="First name"
          rules={nameValidationRules}
        >
          <Input placeholder="John"></Input>
        </Form.Item>
        <Form.Item
          name="lastName"
          label="Last name"
          rules={nameValidationRules}
        >
          <Input placeholder="Wick"></Input>
        </Form.Item>
        <Form.Item
          name="dateOfBirth"
          label="Date of birth"
          rules={dateValidationRules}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={emailValidationRules}
        >
          <AppInput placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={passwordValidationRules}
        >
          <AppInput
            isPassword
            placeholder="Password"
            visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
          />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          label="Confirm password"
          dependencies={['password']}
          rules={confirmPasswordValidationRules}
        >
          <AppInput
            isPassword
            placeholder="Confirm password"
            visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
          />
        </Form.Item>
      </Form>
    </>
  )
}
