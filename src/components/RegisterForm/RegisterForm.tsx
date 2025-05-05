import type { FC } from 'react'
import { DatePicker, Divider, Form, Input } from 'antd'
import { useState } from 'react'
import { AppButton } from '../AppButton'
import { AppInput } from '../AppInput/AppInput'
import { cityValidationRules, confirmPasswordValidationRules, countryValidationRules, dateValidationRules, emailValidationRules, nameValidationRules, passwordValidationRules, postalCodeValidationRules, streetValidationRules } from './index'

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
          <DatePicker
            style={{ width: '100%' }}
            placeholder="1964-04-01"
          />
        </Form.Item>
        <Divider>Address</Divider>
        <Form.Item
          name="country"
          label="Your country"
          rules={countryValidationRules}
        >
          <AppInput placeholder="Belarus" />
        </Form.Item>
        <Form.Item
          name="city"
          label="Your city"
          rules={cityValidationRules}
        >
          <AppInput placeholder="Minsk" />
        </Form.Item>
        <Form.Item
          name="postalCode"
          label="Postal code"
          rules={postalCodeValidationRules}
        >
          <AppInput placeholder="220004" />
        </Form.Item>
        <Form.Item
          name="street"
          label="Your street"
          rules={streetValidationRules}
        >
          <AppInput placeholder="Nemiga street" />
        </Form.Item>
        <Divider></Divider>
        <Form.Item
          name="email"
          label="Email"
          rules={emailValidationRules}
        >
          <AppInput placeholder="john@gmail.com" />
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
        <Form.Item>
          <AppButton block type="primary" htmlType="submit">
            Sign up
          </AppButton>
        </Form.Item>
      </Form>
    </>
  )
}
