import type { BaseComponent } from '@/shared/types/common.types'
import type { Dayjs } from 'dayjs'
import type { FC } from 'react'
import { Card, DatePicker, Form, Input } from 'antd'
import dayjs from 'dayjs'
import { observer } from 'mobx-react-lite'
import { formStore } from '../model/formStore'
import {
  dateValidationRules,
  emailValidationRules,
  nameValidationRules,
} from '../validate'

interface Props extends BaseComponent {}

export const PersonalInfo: FC<Props> = observer(({ testId = 'cardInfo', ...rest }) => {
  const disabledDate = (current: Dayjs | null): boolean => {
    if (!current) {
      return false
    }
    const today = dayjs().startOf('day')
    return current.isAfter(today)
  }

  return (
    <Card
      data-testid={testId}
      {...rest}
      className="cardInfo"
      style={{ maxWidth: '300px', width: '100%' }}
    >
      <Form.Item
        name="firstName"
        label="First name"
        rules={nameValidationRules}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
      >
        <Input
          placeholder="John"
          onChange={e => formStore.updateField('firstName', e.target.value)}
          value={formStore.formData.firstName}
        />
      </Form.Item>
      <Form.Item
        name="lastName"
        label="Last name"
        rules={nameValidationRules}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
      >
        <Input
          placeholder="Wick"
          onChange={e => formStore.updateField('lastName', e.target.value)}
          value={formStore.formData.lastName}
        />
      </Form.Item>

      <Form.Item
        name="email"
        label="Email"
        rules={emailValidationRules}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
      >
        <Input
          placeholder="john@gmail.com"
          onChange={e => formStore.updateField('email', e.target.value)}
          value={formStore.formData.email}
        />
      </Form.Item>

      <Form.Item
        name="dateOfBirth"
        label="Date of birth"
        rules={dateValidationRules}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
      >
        <DatePicker
          style={{ width: '100%' }}
          disabledDate={disabledDate}
          placeholder="1964-04-01"
          onChange={date => formStore.updateField('dateOfBirth', date)}
          value={formStore.formData.dateOfBirth}
        />
      </Form.Item>
    </Card>
  )
})
