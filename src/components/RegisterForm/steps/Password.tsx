import type { BaseComponent } from '@/shared/types/common.types'
import type { FC } from 'react'
import { Card, Form, Input } from 'antd'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { formStore } from '../model/formStore'
import {
  confirmPasswordValidationRules,
  passwordValidationRules,
} from '../validate'

interface Props extends BaseComponent {}

export const Passwords: FC<Props> = observer(({ testId = 'cardPassword', ...rest }) => {
  const [passwordVisible, setPV] = useState<boolean>(false)
  const [confirmPasswordVisible, setCPV] = useState<boolean>(false)

  return (
    <Card data-testid={testId} {...rest} className="cardPassword" style={{ maxWidth: '300px', width: '100%' }}>
      <Form.Item
        name="password"
        label="Password"
        rules={passwordValidationRules}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
      >
        <Input.Password
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
        <Input.Password
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
