import type { ErrorResponse } from '@commercetools/platform-sdk'
import type { FC } from 'react'
import { LockOutlined, MailOutlined } from '@ant-design/icons'
import { Form } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchMe } from '@/entities/customer/api/fetch-me'
import { loginCustomer } from '@/entities/customer/api/sign-in'
import { customerStore } from '@/entities/customer/model/customer.store'
import { globalStore } from '@/entities/global/model/global.store'
import { setCommerceApiFlow } from '@/shared/configs/commerce-client'
import { useNotify } from '@/shared/hooks/use-notify'
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
  const { showErrorNotify } = useNotify()

  const [passwordVisible, setPasswordVisible] = useState<boolean>(false)
  const [form] = Form.useForm<FormFields>()
  const navigate = useNavigate()

  const handleLogin = () => {
    form.validateFields().then(() => {
      globalStore.setLoading(true)
      const { email, password } = form.getFieldsValue()

      setCommerceApiFlow({ flow: 'password', payload: { password, username: email } })

      loginCustomer({ email, password })
        .then((res) => {
          if (res.statusCode === 200) {
            void fetchMe().then((res) => {
              if (res.statusCode === 200) {
                customerStore.setCustomer(res.body)
              }
            })
            customerStore.setIsAuth(true)
            navigate('/')
          }
        })
        .catch((res) => {
          if (isNonNullable(res) && isType<ErrorResponse>(res)) {
            showErrorNotify('Incorrect login or password')
          }
        })
        .finally(() => {
          globalStore.setLoading(false)
        })
    }).catch(() => {
      return null
    })
  }

  return (
    <Form name="login" layout="vertical" form={form}>
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
