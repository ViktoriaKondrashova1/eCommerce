import type { ErrorResponse } from '@commercetools/platform-sdk'
import type { FC } from 'react'
import type { StateSecurity } from '@/components/Profile/model/types.ts'
import { Divider, Flex, Form } from 'antd'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { AppButton } from '@/components/AppButton'
import { AppText } from '@/components/AppText/AppText.tsx'
import { AppTitle } from '@/components/AppTitle/AppTitle.tsx'
import { SecurityForm } from '@/components/Profile/ui/security/SecurityForm.tsx'
import { changePassword } from '@/entities/customer/api/change-password.ts'
import { customerStore } from '@/entities/customer/model/customer.store.ts'
import { globalStore } from '@/entities/global/model/global.store.ts'
import { useNotify } from '@/shared/hooks/use-notify.tsx'
import { isType } from '@/shared/types/is-type.ts'

interface Props {}

const initialState = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
} satisfies StateSecurity

export const Security: FC<Props> = observer(() => {
  const [formData, setFormData] = useState<StateSecurity>(initialState)
  const [formController] = Form.useForm<StateSecurity>()
  const { showErrorNotify, showSuccessNotify } = useNotify()

  const handleOnChangePasswordValue = (key: keyof StateSecurity, value: string) => {
    setFormData(prevValue => ({ ...prevValue, [key]: value }))
  }

  const handleSave = async () => {
    try {
      await formController.validateFields()

      if (formData.newPassword !== formData.confirmPassword) {
        showErrorNotify('Passwords don\'t match')
      }

      globalStore.setLoading(true)

      const { id, version } = customerStore?.customer || {}

      if (typeof id === 'string' && typeof version === 'number') {
        const res = await changePassword({
          id,
          version,
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        })

        customerStore.setCustomer(res.body)
        setFormData(initialState)
        formController.resetFields()
        showSuccessNotify('Password change successfully')
      }
    }
    catch (error) {
      if (isType<ErrorResponse>(error)) {
        showErrorNotify(error.message)
      }
    }
    finally {
      globalStore.setLoading(false)
    }
  }

  const handleCancel = () => {
    formController.resetFields()
    setFormData(initialState)
  }

  return (
    <Flex vertical>
      <AppTitle level={5}>Securely change your password to protect your account. </AppTitle>
      <AppText>We recommend you to use a strong password that you don't use elsewhere.</AppText>
      <Divider style={{ marginBottom: '14px', marginTop: '10px' }} />
      <div>
        <SecurityForm
          data={formData}
          onChange={handleOnChangePasswordValue}
          controller={formController}
        />
      </div>

      <Flex gap={16} justify="end">
        <AppButton onClick={handleCancel}>
          Reset
        </AppButton>
        <AppButton
          type="primary"
          onClick={() => void handleSave()}
        >
          Change Password
        </AppButton>
      </Flex>
    </Flex>
  )
})
