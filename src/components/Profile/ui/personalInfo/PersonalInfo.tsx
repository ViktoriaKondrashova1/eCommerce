import type { Dayjs } from 'dayjs'
import type { FC } from 'react'
import type { StatePersonalInfo } from '@/components/Profile/model/types.ts'
import { Form } from 'antd'
import dayjs from 'dayjs'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { ModeAwareContent } from '@/components/Profile/ui/ModeAwareContent.tsx'
import { PersonalInfoEdit } from '@/components/Profile/ui/personalInfo/PersonalInfoEdit.tsx'
import { PersonalInfoView } from '@/components/Profile/ui/personalInfo/PersonalInfoView.tsx'
import { updatePersonalInfo } from '@/entities/customer/api/update-personal-info.ts'
import { customerStore } from '@/entities/customer/model/customer.store.ts'
import { globalStore } from '@/entities/global/model/global.store.ts'
import { isNonNullable } from '@/shared/types/is-non-nullable.ts'

interface Props {}

const initialState = {
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  email: '',
} satisfies StatePersonalInfo

export const PersonalInfo: FC<Props> = observer(() => {
  const [formData, setFormData] = useState<StatePersonalInfo>(initialState)
  const [form] = Form.useForm<StatePersonalInfo>()

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

  const handleClickSave = async () => {
    const dateOfBirth = dayjs(formData.dateOfBirth).format('YYYY-MM-DD')
    if (customerStore.customer?.version !== undefined && typeof dateOfBirth === 'string') {
      globalStore.setLoading(true)
      updatePersonalInfo({
        version: customerStore.customer?.version,
        actions: [
          {
            action: 'changeEmail',
            email: formData.email,
          },
          {
            action: 'setFirstName',
            firstName: formData.firstName,
          },
          {
            action: 'setLastName',
            lastName: formData.lastName,
          },
          {
            action: 'setDateOfBirth',
            dateOfBirth,
          },
        ],
      })
        .then((res) => {
          if (res.statusCode === 200) {
            customerStore.setCustomer(res.body)
            setIsNeedFormChanged(true)
          }
        })
        .catch(() => {
          throw new Error('Update date error')
        })
        .finally(() => globalStore.setLoading(false))
    }
  }

  const handleChangeForm = (key: keyof StatePersonalInfo, value: string | Dayjs) => {
    const updatedForm = { ...formData, [key]: value }

    setIsNeedFormChanged(JSON.stringify(viewData) === JSON.stringify(updatedForm))
    setFormData(() => updatedForm)
  }

  return (
    <>
      <ModeAwareContent
        onClickSave={handleClickSave}
        isDisabledSaveButton={isNeedFormChanged}
        viewSlot={<PersonalInfoView data={viewData} />}
        editSlot={<PersonalInfoEdit data={formData} onChange={handleChangeForm} controller={form} />}
      />
    </>
  )
})
