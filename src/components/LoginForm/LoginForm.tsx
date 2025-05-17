import type { ErrorResponse } from '@commercetools/platform-sdk'
import type { FC } from 'react'
import { LockOutlined, MailOutlined } from '@ant-design/icons'
import { Alert, Form } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginCustomer } from '@/entities/customer/api/sign-in'
import { customerStore } from '@/entities/customer/model/customer.store'
import { globalStore } from '@/entities/global/model/global.store'
import { storage } from '@/shared/lib/storage'
import { isNonNullable } from '@/shared/types/is-non-nullable'
import { isType } from '@/shared/types/is-type'
import { AppButton } from '../AppButton'
import { AppInput } from '../AppInput/AppInput'
import { emailValidationRules, passwordValidationRules } from './index'

interface FormFields {
  email: string
  password: string
}

export const LoginForm: FC = () => {
  const [errorMsg, setErrorMsg] = useState<string>('')

  const [passwordVisible, setPasswordVisible] = useState<boolean>(false)
  const [form] = Form.useForm<FormFields>()
  const navigate = useNavigate()

  const handleLogin = () => {
    form.validateFields().then(() => {
      globalStore.setLoading(true)
      const { email, password } = form.getFieldsValue()

      loginCustomer({ email, password })
        .then((res) => {
          if (res.statusCode === 200) {
            storage.set('customer', res.body.customer)
            storage.set('cart', res.body.cart ?? [])
            customerStore.setIsAuth(true)
            navigate('/catalog')
          }
        })
        .catch((res) => {
          if (isNonNullable(res) && isType<ErrorResponse>(res)) {
            setErrorMsg('Incorrect login or password')
          }
        })
        .finally(() => {
          globalStore.setLoading(false)
        })
    }).catch(() => {
      return null
    })
  }

  const handleChangeField = () => {
    setErrorMsg('')
  }

  return (
    <Form onFieldsChange={handleChangeField} name="login" layout="vertical" form={form}>
      <Form.Item
        name="email"
        label="Email"
        rules={emailValidationRules}

      >
        <AppInput
          prefix={<MailOutlined />}
          disabled={globalStore.isLoading}
          placeholder="Email"
        />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={passwordValidationRules}
      >
        <AppInput
          isPassword
          disabled={globalStore.isLoading}
          prefix={<LockOutlined />}
          placeholder="Password"
          visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
        />
      </Form.Item>

      {errorMsg && <Alert style={{ marginBottom: '1rem' }} type="error" message={errorMsg} />}
      <Form.Item>
        <AppButton
          disabled={globalStore.isLoading}
          block
          type="primary"
          htmlType="submit"
          onClick={handleLogin}
        >
          Log in
        </AppButton>
      </Form.Item>
    </Form>
  )
}
