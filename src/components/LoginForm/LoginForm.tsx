import type { FC } from 'react'
import { LockOutlined, MailOutlined } from '@ant-design/icons'
import { Form } from 'antd'
import { AppButton } from '../AppButton'
import { AppInput } from '../AppInput/AppInput'

export const LoginForm: FC = () => {
  return (
    <Form name="login" style={{ maxWidth: 360 }} layout="vertical">
      <Form.Item
        name="email"
        label="Email"
        rules={[{ required: true, message: 'Please input your Email!' }, { type: 'email', message: 'Please enter a valid email' }]}
      >
        <AppInput prefix={<MailOutlined />} placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <AppInput prefix={<LockOutlined />} type="password" placeholder="Password" />
      </Form.Item>
      <Form.Item>
        <AppButton block type="primary" htmlType="submit">
          Log in
        </AppButton>
      </Form.Item>
    </Form>
  )
}
