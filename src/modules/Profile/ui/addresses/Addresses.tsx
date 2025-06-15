import type { ErrorResponse } from '@commercetools/platform-sdk'
import type { FC } from 'react'
import type { FormDataAddress } from '@/modules/Profile/model/types.ts'
import { DeleteOutlined, EditOutlined, EnvironmentOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Card, Checkbox, Col, Form, List, Modal, Popconfirm, Radio, Row, Select, Space, Tag } from 'antd'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { AppButton } from '@/components/AppButton'
import { AppInput } from '@/components/AppInput/AppInput.tsx'
import { AppText } from '@/components/AppText/AppText.tsx'
import { customerStore } from '@/entities/customer/model/customer.store.ts'
import { profileAdapter } from '@/modules/Profile/model/adapter.ts'
import { getCountry } from '@/modules/Profile/model/lib.ts'
import { profileService } from '@/modules/Profile/model/service.ts'
import { useAddresses } from '@/modules/Profile/ui/addresses/use-addresses.ts'
import { useNotify } from '@/shared/hooks/use-notify.tsx'
import { isNullable } from '@/shared/types/is-nullable.ts'
import { countries } from '@/shared/validators/countries.ts'
import {
  cityValidationRules,
  countryValidationRules,
  postalCodeValidationRules,
} from '@/shared/validators/validate.ts'

interface Props {}

export const Addresses: FC<Props> = observer(() => {
  const addresses = useAddresses()
  const [formController] = Form.useForm<FormDataAddress>()

  const { showErrorNotify, showSuccessNotify } = useNotify()

  const [selectedAddress, setSelectedAddress] = useState<FormDataAddress | null>(null)
  const [addressEditMode, setAddressEditMode] = useState<null | 'edit' | 'new'>(null)

  const handleAddressAdd = () => {
    setSelectedAddress(null)
    setAddressEditMode('new')
    formController.setFieldValue('type', 'shipping')
  }

  const handleAddressEdit = (address: FormDataAddress) => {
    setSelectedAddress(address)
    const selectedCountry = countries.find(item => item.value === address.country)
    formController.setFieldsValue({
      type: address.type,
      city: address.city,
      postalCode: address.postalCode,
      streetName: address.streetName,
      country: selectedCountry?.label,
      isPrimary: address.isPrimary,
    })
    setAddressEditMode('edit')
  }

  const updateAddressAndSyncStore = async (version: number, address: FormDataAddress) => {
    const res = await profileService.updateAddress({ version, address })
    customerStore.setCustomer(res.body)
    formController.resetFields()
    setAddressEditMode(null)

    if (res.statusCode === 200) {
      showSuccessNotify('Address updated successfully')
    }
  }

  const updateExistAddress = async (currentVersion: number, values: FormDataAddress) => {
    if (selectedAddress === null) {
      throw new Error('Selected address is not defined')
    }
    const address = profileAdapter.exportUpdateAddress(selectedAddress, values)

    if (values.isPrimary) {
      const currentPrimaryAddr = addresses
        .filter(addr => values?.type === values.type && addr.id !== values.id)
        .find(addr => addr.custom.fields.isPrimary)

      if (currentPrimaryAddr) {
        const data = await profileService.resetIsPrimaryAddress({ version: currentVersion, address: currentPrimaryAddr })
        await updateAddressAndSyncStore(data.body.version, address)
      }

      await updateAddressAndSyncStore(currentVersion, address)
    }
    else {
      await updateAddressAndSyncStore(currentVersion, address)
    }
  }

  const createNewAddress = async (currentVersion: number, values: FormDataAddress) => {
    const address = profileAdapter.exportAddAddress(values)
    if (values.isPrimary) {
      const currentPrimaryAddr = addresses
        .filter(addr => values?.type === values.type && addr.id !== values.id)
        .find(addr => addr.custom.fields.isPrimary)

      if (currentPrimaryAddr) {
        const removePrimaryRes = await profileService.resetIsPrimaryAddress({ version: currentVersion, address: currentPrimaryAddr })
        await profileService.addAddress({ version: removePrimaryRes.body.version, address })
      }

      const createAddressRes = await profileService.addAddress({ version: currentVersion, address })
      const createdAddr = createAddressRes.body.addresses.at(-1)

      if (!isNullable(createdAddr) && !isNullable(createdAddr.id)) {
        const updatedRes = await profileService.addAddressIdByType({ version: createAddressRes.body.version, type: address.type, id: createdAddr.id })
        customerStore.setCustomer(updatedRes.body)
        showSuccessNotify('Address successfully created')
        formController.resetFields()
        setAddressEditMode(null)
      }
    }
    else {
      const createAddressRes = await profileService.addAddress({ version: currentVersion, address })
      const createdAddr = createAddressRes.body.addresses.at(-1)

      if (!isNullable(createdAddr) && !isNullable(createdAddr.id)) {
        const updatedRes = await profileService.addAddressIdByType({ version: createAddressRes.body.version, type: address.type, id: createdAddr.id })
        customerStore.setCustomer(updatedRes.body)
        showSuccessNotify('Address successfully created')
        formController.resetFields()
        setAddressEditMode(null)
      }
    }
  }

  const handleAddressSave = async () => {
    try {
      const currentVersion = customerStore?.customer?.version
      if (isNullable(currentVersion)) {
        throw new Error('Customer version is not defined')
      }

      const values = await formController.validateFields()

      if (selectedAddress) {
        await updateExistAddress(currentVersion, values)
      }
      else {
        await createNewAddress(currentVersion, values)
      }
    }
    catch {}
  }

  const handleAddressDelete = (addressId: FormDataAddress['id']) => {
    const currentVersion = customerStore?.customer?.version

    if (isNullable(currentVersion)) {
      throw new Error('Customer version is not defined')
    }

    if (isNullable(addressId)) {
      throw new Error('Id isn\'t defined')
    }

    const addressForDelete = addresses.find(addr => addr.id === addressId)

    if (isNullable(addressForDelete)) {
      throw new Error('addres not found')
    }

    profileService.removeAddressIdByType({
      version: currentVersion,
      type: addressForDelete.type,
      id: addressId,
    })
      .then((deleteByIdResponse) => {
        if (deleteByIdResponse.statusCode === 200) {
          profileService.removeAddress({ version: deleteByIdResponse.body.version, id: addressId })
            .then((deleteRes) => {
              if (deleteRes.statusCode === 200) {
                customerStore.setCustomer(deleteRes.body)
                showSuccessNotify('Address removed successfully')
              }
            })
            .catch((errorRes: ErrorResponse) => {
              showErrorNotify(errorRes.message)
            })
        }
      })
      .catch((errorRes: ErrorResponse) => {
        showErrorNotify(errorRes.message)
      })
  }

  const handleCancel = () => {
    formController.resetFields()
    setAddressEditMode(null)
  }

  const renderAddressesList = () => (
    <Card
      title="My Addresses"
      extra={(
        <AppButton type="primary" icon={<PlusOutlined />} onClick={handleAddressAdd} />
      )}
    >
      <List
        itemLayout="vertical"
        dataSource={addresses}
        renderItem={address => (
          <List.Item
            key={address.id}
            actions={[
              <AppButton key="1" type="text" icon={<EditOutlined />} onClick={() => handleAddressEdit(address)}>
                Edit
              </AppButton>,
              <Popconfirm
                key="2"
                title="Are you sure you want to delete this address?"
                onConfirm={() => handleAddressDelete(address.id)}
                okText="Yes"
                cancelText="No"
              >
                <Button type="text" danger icon={<DeleteOutlined />}>
                  Delete
                </Button>
              </Popconfirm>,
            ]}
            extra={(
              <div>
                {address?.isPrimary && (
                  <Tag color="orange-inverse">
                    Default
                  </Tag>
                )}

              </div>
            )}
          >
            <Space direction="vertical">
              <AppText strong>
                {address?.type?.charAt(0)?.toUpperCase?.() + address?.type?.slice?.(1)}
                {' '}
                Address
              </AppText>
              <AppText>
                {address?.streetName}
                {' '}
                st.
              </AppText>
              <AppText>
                {address?.city}
                ,
                {address?.state}
                {' '}
                {address?.postalCode}
              </AppText>
              <AppText>{getCountry(address.country)}</AppText>
            </Space>
          </List.Item>
        )}
      />
    </Card>
  )

  return (
    <>
      {renderAddressesList()}
      <Modal
        title={selectedAddress ? 'Edit Address' : 'Add New Address'}
        open={typeof addressEditMode === 'string'}
        onCancel={handleCancel}
        footer={[
          <AppButton key="cancel" onClick={handleCancel}>
            Cancel
          </AppButton>,
          <AppButton key="save" type="primary" onClick={() => void handleAddressSave()}>
            Save
          </AppButton>,
        ]}
      >
        <Form form={formController} layout="vertical">
          <Form.Item name="type" label="Address Type" rules={[{ required: true }]}>
            <Radio.Group disabled={addressEditMode === 'edit'}>
              <Radio.Button value="shipping">Shipping</Radio.Button>
              <Radio.Button value="billing">Billing</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="country"
                label="Country"
                rules={countryValidationRules}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                required
              >
                <Select
                  placeholder="Belarus"
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
                name="city"
                label="City"
                rules={cityValidationRules}
              >
                <AppInput placeholder="City" />
              </Form.Item>
            </Col>

          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="postalCode"
                label="Postal Code"
                rules={postalCodeValidationRules}
              >
                <AppInput placeholder="Postal Code" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="streetName"
                label="Street Address"
                rules={[{ required: true, message: 'Please enter street address' }]}
              >
                <AppInput prefix={<EnvironmentOutlined />} placeholder="Street Address" />
              </Form.Item>

            </Col>
          </Row>

          <Form.Item name="isPrimary" valuePropName="checked">
            <Checkbox>
              Set as default
              {' '}
              {selectedAddress?.type}
              {' '}
              address
            </Checkbox>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
})
