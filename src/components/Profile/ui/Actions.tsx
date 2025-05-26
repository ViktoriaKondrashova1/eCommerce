import type { FC } from 'react'
import type { FormMode } from '@/components/Profile/model/types.ts'
import { Flex } from 'antd'
import { observer } from 'mobx-react-lite'
import { AppButton } from '@/components/AppButton'

interface Props {
  mode: FormMode
  onClickEdit: () => void
  onClickCancel: () => void
  onClickSave: () => void

}
export const Actions: FC<Props> = observer(({ mode, onClickCancel, onClickEdit, onClickSave }) => {
  return (
    <div>
      {mode === 'view'
        ? (
            <AppButton type="primary" onClick={onClickEdit}>
              Edit
            </AppButton>
          )
        : (
            <Flex gap={16}>
              <AppButton onClick={onClickCancel}>Cancel</AppButton>
              <AppButton type="primary" onClick={() => onClickSave()}>
                Save
              </AppButton>
            </Flex>
          )}
    </div>
  )
})
