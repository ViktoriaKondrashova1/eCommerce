import type { FC, ReactNode } from 'react'
import type { FormMode } from '@/components/Profile/model/types.ts'
import { useState } from 'react'
import { Actions } from '@/components/Profile/ui/Actions.tsx'

interface Props {
  viewSlot: ReactNode
  editSlot: ReactNode
  onSaveClick: () => void
}

export const ModeAwareContent: FC<Props> = ({ editSlot, viewSlot, onSaveClick }) => {
  const [mode, setMode] = useState<FormMode>('view')

  const handleClickCancel = () => setMode('view')
  const handleClickEdit = () => setMode('edit')

  return (
    <>
      {mode === 'view' ? viewSlot : editSlot}
      <Actions
        mode={mode}
        onClickCancel={handleClickCancel}
        onClickEdit={handleClickEdit}
        onClickSave={() => onSaveClick()}
      />
    </>
  )
}
