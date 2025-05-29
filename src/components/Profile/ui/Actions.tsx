import type { FC } from 'react'
import type { FormMode } from '@/components/Profile/model/types.ts'
import { EditOutlined } from '@ant-design/icons'
import { Flex } from 'antd'
import { observer } from 'mobx-react-lite'
import { AppButton } from '@/components/AppButton'

interface Props {
  mode: FormMode
  onClickEdit: () => void
  onClickCancel: () => void
  onClickSave: () => void
  isDisabledSaveButton?: boolean
}
export const Actions: FC<Props> = observer(({ mode, onClickCancel, onClickEdit, onClickSave, isDisabledSaveButton = false }) => {
  return (
    <div>
      {mode === 'view'
        ? (
            <Flex justify="end">
              <AppButton type="primary" onClick={onClickEdit} icon={<EditOutlined />}>
                Edit Profile
              </AppButton>
            </Flex>
          )
        : (
            <Flex gap={16} justify="end">
              <AppButton onClick={onClickCancel}>Cancel</AppButton>
              <AppButton disabled={isDisabledSaveButton} type="primary" onClick={() => onClickSave()}>
                Save
              </AppButton>
            </Flex>
          )}
    </div>
  )
})
