import type { AddressWithCustomFields } from '@/components/RegisterForm/model/form-store.ts'
import { Card, Checkbox, Col, Form, Row, Select } from 'antd'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { AppInput } from '@/components/AppInput/AppInput'
import { useRegisterFormContext } from '@/components/RegisterForm/model/registration-form-context'
import { isNonNullable } from '@/shared/types/is-non-nullable.ts'
import { countries } from '@/shared/validators/countries.ts'
import {
  cityValidationRules,
  countryValidationRules,
  postalCodeValidationRules,
  streetValidationRules,
} from '@/shared/validators/validate.ts'

export const AddressFields = observer(
  ({
    address,
    onUpdate,
    onSetDefault,
    isDefault = false,
  }: {
    isDefault: boolean
    address: AddressWithCustomFields
    onUpdate: (field: string, value: string) => void
    onSetDefault: () => void
  }) => {
    const [country, setCountry] = useState('')
    const { form } = useRegisterFormContext()

    const onCountryChange = (value: string) => {
      setCountry(value)
      onUpdate('country', value)

      if (isNonNullable(address.postalCode) && typeof address.postalCode === 'string' && address.postalCode.length > 0) {
        void form.validateFields([`postalCode-${address.id}`])
      }
    }

    const selectedCountry = countries.find(item => item.value === country)
    const postalCodePlaceholder = selectedCountry ? selectedCountry.example : '220044'

    return (
      <Card
        className="shadow-sm mb-4"
        style={{ maxWidth: '600px', width: '100%', marginBottom: '15px' }}
      >
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
                options={countries}
                showSearch
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
                maxLength={7}
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
                onChange={e => onUpdate('streetName', e.target.value)}
                value={address.streetName}
              />
            </Form.Item>
          </Col>

          <Row>
            <Col offset={2} span={24}>
              <Checkbox
                checked={isDefault}
                onClick={onSetDefault}
              >
                Mark as default
              </Checkbox>
            </Col>
          </Row>
        </Row>
      </Card>
    )
  },
)
