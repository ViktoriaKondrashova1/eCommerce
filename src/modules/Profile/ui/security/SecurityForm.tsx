import type { FormInstance } from 'antd'
import type { FC } from 'react'
import type { StateSecurity } from '@/modules/Profile/model/types.ts'
import { LockOutlined } from '@ant-design/icons'
import { Form } from 'antd'
import { useEffect } from 'react'
import { AppInput } from '@/components/AppInput/AppInput.tsx'
import { confirmPasswordValidationRules, passwordValidationRules } from '@/shared/validators/validate.ts'

interface Props {
  data: StateSecurity
  onChange: (key: keyof StateSecurity, value: string) => void
  controller: FormInstance<StateSecurity>
}

export const SecurityForm: FC<Props> = ({ data, onChange, controller }) => {
  useEffect(() => {
    controller.setFieldsValue({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
      confirmPassword: data.confirmPassword,
    })
  }, [])
  return (
    <Form form={controller}>
      <Form.Item
        name="currentPassword"
        label="Current Password"
        rules={passwordValidationRules}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 6 }}
      >
        <AppInput
          isPassword
          value={data.currentPassword}
          prefix={<LockOutlined />}
          placeholder="Enter current password"
          onChange={e => onChange('currentPassword', e.target.value)}
        />
      </Form.Item>

      <Form.Item
        name="newPassword"
        label="New Password"
        rules={passwordValidationRules}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 6 }}
      >
        <AppInput
          isPassword
          value={data.newPassword}
          prefix={<LockOutlined />}
          placeholder="Enter new password"
          onChange={e => onChange('newPassword', e.target.value)}
        />
      </Form.Item>

      <Form.Item
        name="confirmPassword"
        label="Confirm New Password"
        dependencies={['newPassword']}
        rules={confirmPasswordValidationRules('newPassword')}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 6 }}
      >
        <AppInput
          isPassword
          value={data.confirmPassword}
          prefix={<LockOutlined />}
          placeholder="Confirm new password"
          onChange={e => onChange('confirmPassword', e.target.value)}
        />
      </Form.Item>
    </Form>
  )
}
