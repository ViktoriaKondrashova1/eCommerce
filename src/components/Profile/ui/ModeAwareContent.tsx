import type { FC, ReactNode } from 'react'
import type { FormMode } from '@/components/Profile/model/types.ts'
import { Flex } from 'antd'
import { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'
import { Actions } from '@/components/Profile/ui/Actions.tsx'

interface Props {
  viewSlot: ReactNode
  editSlot: ReactNode

  isDisabledSaveButton?: boolean

  onClickSave: () => Promise<void>
  onClickCancel?: () => void
  onClickEdit?: () => void
}

export const ModeAwareContent: FC<Props> = ({ editSlot, viewSlot, onClickSave, isDisabledSaveButton, onClickEdit, onClickCancel }) => {
  const [mode, setMode] = useState<FormMode>('view')
  const { chapter } = useParams()

  useEffect(() => {
    setMode('view')
  }, [chapter])

  const handleClickCancel = () => {
    setMode('view')
    onClickCancel?.()
  }
  const handleClickEdit = () => {
    setMode('edit')
    onClickEdit?.()
  }

  return (
    <Flex vertical>
      <div className="profile__content">{mode === 'view' ? viewSlot : editSlot}</div>
      <Actions
        mode={mode}
        isDisabledSaveButton={isDisabledSaveButton}
        onClickCancel={handleClickCancel}
        onClickEdit={handleClickEdit}
        onClickSave={() => void onClickSave()}
      />
    </Flex>
  )
}
