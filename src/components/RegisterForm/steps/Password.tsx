import type { FC } from 'react'
import type { BaseComponent } from '@/shared/types/common.types'
import { Card, Form } from 'antd'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { AppInput } from '@/components/AppInput/AppInput'
import { emailValidationRules } from '@/components/LoginForm'
import {
  confirmPasswordValidationRules,
  passwordValidationRules,
} from '../../../shared/validators/validate.ts'
import { formStore } from '../model/form-store'

interface Props extends BaseComponent {}

export const Passwords: FC<Props> = observer(({ testId = 'cardPassword', ...rest }) => {
  const [passwordVisible, setPV] = useState<boolean>(false)
  const [confirmPasswordVisible, setCPV] = useState<boolean>(false)

  return (
    <Card data-testid={testId} {...rest} className="cardPassword" style={{ maxWidth: '300px', width: '100%' }}>

      <Form.Item
        name="email"
        label="Email"
        rules={emailValidationRules}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
      >
        <AppInput
          placeholder="john@gmail.com"
          onChange={e => formStore.updateField('email', e.target.value)}
          value={formStore.formData.email}
        />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={passwordValidationRules}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
      >
        <AppInput
          isPassword
          placeholder="Password"
          visibilityToggle={{
            visible: passwordVisible,
            onVisibleChange: setPV,
          }}
          onChange={e => formStore.updateField('password', e.target.value)}
          value={formStore.formData.password}
        />
      </Form.Item>
      <Form.Item
        name="confirmPassword"
        label="Confirm password"
        dependencies={['password']}
        rules={confirmPasswordValidationRules}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
      >
        <AppInput
          isPassword
          placeholder="Confirm password"
          visibilityToggle={{
            visible: confirmPasswordVisible,
            onVisibleChange: setCPV,
          }}
          onChange={e =>
            formStore.updateField('confirmPassword', e.target.value)}
          value={formStore.formData.confirmPassword}
        />
      </Form.Item>
    </Card>
  )
})
