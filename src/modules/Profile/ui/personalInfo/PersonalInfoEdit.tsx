import type { FormInstance } from 'antd'
import type { Dayjs } from 'dayjs'
import type { FC } from 'react'
import type { StatePersonalInfo } from '@/modules/Profile/model/types.ts'
import { DatePicker, Form } from 'antd'
import dayjs from 'dayjs'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { AppInput } from '@/components/AppInput/AppInput.tsx'
import { emailValidationRules } from '@/components/LoginForm'
import { dateValidationRules, nameValidationRules } from '@/shared/validators/validate.ts'

interface Props {
  data: StatePersonalInfo
  onChange: (key: keyof StatePersonalInfo, value: string | Dayjs) => void
  controller: FormInstance<StatePersonalInfo>
}

export const PersonalInfoEdit: FC<Props> = observer(({ data, onChange, controller }) => {
  const disabledDate = (current: Dayjs | null): boolean => {
    if (!current) {
      return false
    }
    const today = dayjs().startOf('day')
    return current.isAfter(today)
  }

  useEffect(() => {
    controller.setFieldsValue({
      firstName: data.firstName,
      lastName: data.lastName,
      dateOfBirth: data.dateOfBirth !== null ? dayjs(data.dateOfBirth, 'YYYY-MM-DD') : '',
      email: data.email,
    })
  }, [])

  return (
    <Form form={controller}>
      <Form.Item
        name="firstName"
        label="First name"
        rules={nameValidationRules}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 6 }}
      >
        <AppInput
          onChange={e => onChange('firstName', e.target.value)}
        />
      </Form.Item>
      <Form.Item
        name="lastName"
        label="Last name"
        rules={nameValidationRules}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 6 }}
      >
        <AppInput
          onChange={e => onChange('lastName', e.target.value)}
        />
      </Form.Item>

      <Form.Item
        name="dateOfBirth"
        label="Date of birth"
        rules={dateValidationRules}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 6 }}
      >
        <DatePicker
          style={{ width: '100%' }}
          disabledDate={disabledDate}
          onChange={date => onChange('dateOfBirth', date)}
        />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
        rules={emailValidationRules}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 6 }}
      >
        <AppInput
          onChange={e => onChange('email', e.target.value)}
        />
      </Form.Item>
    </Form>
  )
})
