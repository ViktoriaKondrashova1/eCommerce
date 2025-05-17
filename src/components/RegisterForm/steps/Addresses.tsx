import type { AddressWithCustomFileds } from '../model/form-store'
import { DeleteOutlined, PushpinOutlined } from '@ant-design/icons'
import { Card, Col, Form, Row, Select } from 'antd'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { AppButton } from '@/components/AppButton'
import { AppInput } from '@/components/AppInput/AppInput'
import { AppTitle } from '@/components/AppTitle/AppTitle'
import { countries } from '../model/countries'
import {
  cityValidationRules,
  countryValidationRules,
  postalCodeValidationRules,
  streetValidationRules,
} from '../validate'

export const AddressFields = observer(
  ({
    address,
    onUpdate,
    onSetPrimary,
    onDelete,
    isPrimary,
    index,
  }: {
    address: AddressWithCustomFileds
    onUpdate: (field: string, value: string) => void
    onSetPrimary: () => void
    onDelete: () => void
    isPrimary: boolean
    index: number
  }) => {
    const [country, setCountry] = useState('')
    const onCountryChange = (value: string) => {
      setCountry(value)
      onUpdate('country', value)
    }
    const selectedCountry = countries.find(item => item.value === country)
    const postalCodePlaceholder = selectedCountry ? selectedCountry.example : '220044'

    return (
      <Card
        className="shadow-sm mb-4"
        style={{ maxWidth: '600px', width: '100%', marginBottom: '15px' }}
      >
        <AppTitle level={5} className="mb-4">
          Address
          {' '}
          {index + 1}
        </AppTitle>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item
              name={`country-${address.id}`}
              label="Country"
              rules={countryValidationRules}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              required
            >
              <Select
                placeholder="Belarus"
                onChange={onCountryChange}
                value={address.country}
              >
                {countries.map(country => (
                  <Select.Option key={country.value} value={country.value}>
                    {country.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name={`city-${address.id}`}
              label="City"
              rules={cityValidationRules}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              required
            >
              <AppInput
                placeholder="Minsk"
                onChange={e => onUpdate('city', e.target.value)}
                value={address.city}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name={`postalCode-${address.id}`}
              label="Postal code"
              rules={postalCodeValidationRules(country)}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              required
            >
              <AppInput
                placeholder={postalCodePlaceholder}
                onChange={e => onUpdate('postalCode', e.target.value)}
                value={address.postalCode}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name={`street-${address.id}`}
              label="Street"
              rules={streetValidationRules}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              required
            >
              <AppInput
                placeholder="Niamiha"
                onChange={e => onUpdate('street', e.target.value)}
                value={address.streetName}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <AppButton
              type={isPrimary ? 'primary' : 'default'}
              icon={<PushpinOutlined size={16} />}
              onClick={onSetPrimary}
            >
              Set as default
            </AppButton>
          </Col>

          <Col span={12} className="flex justify-between items-center">
            <AppButton
              danger
              disabled={!!isPrimary}
              icon={<DeleteOutlined />}
              onClick={onDelete}
              className="mb-4"
            >
              Delete
            </AppButton>
          </Col>
        </Row>
      </Card>
    )
  },
)
