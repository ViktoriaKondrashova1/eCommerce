import type { ErrorResponse } from '@commercetools/platform-sdk'
import type { Dayjs } from 'dayjs'
import type { FC } from 'react'
import type { FormMode, StatePersonalInfo } from '@/modules/Profile/model/types.ts'
import { EditOutlined } from '@ant-design/icons'
import { Flex, Form } from 'antd'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'
import { AppButton } from '@/components/AppButton'
import { customerStore } from '@/entities/customer/model/customer.store.ts'
import { globalStore } from '@/entities/global/model/global.store.ts'
import { profileAdapter } from '@/modules/Profile/model/adapter.ts'
import { profileService } from '@/modules/Profile/model/service.ts'
import { PersonalInfoEdit } from '@/modules/Profile/ui/personalInfo/PersonalInfoEdit.tsx'
import { PersonalInfoView } from '@/modules/Profile/ui/personalInfo/PersonalInfoView.tsx'
import { useNotify } from '@/shared/hooks/use-notify.tsx'
import { isNonNullable } from '@/shared/types/is-non-nullable.ts'
import { isNullable } from '@/shared/types/is-nullable.ts'
import { isType } from '@/shared/types/is-type.ts'

interface Props {}

const initialState = {
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  email: '',
} satisfies StatePersonalInfo

export const PersonalInfo: FC<Props> = observer(() => {
  const [mode, setMode] = useState<FormMode>('view')
  const { chapter } = useParams()
  const [formData, setFormData] = useState<StatePersonalInfo>(initialState)
  const [form] = Form.useForm<StatePersonalInfo>()
  const { showErrorNotify, showSuccessNotify } = useNotify()

  const [viewData, setViewData] = useState<StatePersonalInfo>(initialState)
  const [isNeedFormChanged, setIsNeedFormChanged] = useState<boolean>(true)

  useEffect(() => {
    if (isNonNullable(customerStore.customer)) {
      const userData = (() => {
        const { firstName = '', lastName = '', dateOfBirth = '', email = '' } = customerStore.customer || {}

        return {
          firstName,
          lastName,
          dateOfBirth,
          email,
        }
      })()

      setFormData(() => userData)
      setViewData(() => userData)
    }
  }, [customerStore.customer])

  useEffect(() => {
    return () => setMode('view')
  }, [chapter])

  const handleClickSave = async () => {
    const currentVersion = customerStore.customer?.version

    if (isNullable(currentVersion)) {
      throw new Error('version is not defined')
    }

    globalStore.setLoading(true)

    void await form.validateFields()

    const userData = profileAdapter.exportUserInfo(formData)

    profileService.updatePersonalInfo({ version: currentVersion, userData })
      .then((res) => {
        if (res.statusCode === 200) {
          customerStore.setCustomer(res.body)
          setIsNeedFormChanged(true)
          setMode('view')
          showSuccessNotify('Personal info successfully updated')
        }
      })
      .catch((error) => {
        if (error !== undefined && isType<ErrorResponse>(error)) {
          showErrorNotify(error.message)
        }
      })
      .finally(() => globalStore.setLoading(false))
  }

  const handleClickCancel = () => {
    setMode('view')
  }
  const handleClickEdit = () => {
    setMode('edit')
  }

  const handleChangeForm = (key: keyof StatePersonalInfo, value: string | Dayjs) => {
    const updatedForm = { ...formData, [key]: value }

    setIsNeedFormChanged(JSON.stringify(viewData) === JSON.stringify(updatedForm))
    setFormData(() => updatedForm)
  }

  const Component = mode === 'view'
    ? <PersonalInfoView data={viewData} />
    : <PersonalInfoEdit data={formData} onChange={handleChangeForm} controller={form} />

  const ButtonBlock = mode === 'view'
    ? (
        <Flex justify="end">
          <AppButton type="primary" onClick={handleClickEdit} icon={<EditOutlined />}>
            Edit Profile
          </AppButton>
        </Flex>
      )
    : (
        <Flex gap={16} justify="end">
          <AppButton onClick={handleClickCancel}>Cancel</AppButton>
          <AppButton disabled={isNeedFormChanged} type="primary" onClick={() => void handleClickSave()}>
            Save
          </AppButton>
        </Flex>
      )

  return (
    <Flex vertical>
      <div className="profile__content">{Component}</div>
      <div>{ButtonBlock}</div>
    </Flex>
  )
})
