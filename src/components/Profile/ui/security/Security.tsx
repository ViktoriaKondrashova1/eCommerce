import type { FC } from 'react'
import { observer } from 'mobx-react-lite'
import { ModeAwareContent } from '@/components/Profile/ui/ModeAwareContent.tsx'
import { SecurityEdit } from '@/components/Profile/ui/security/SecurityEdit.tsx'
import { SecurityView } from '@/components/Profile/ui/security/SecurityView.tsx'

interface Props {}

export const Security: FC<Props> = observer(() => {
  const handleClickSave = () => {}

  return (
    <>
      <ModeAwareContent
        onSaveClick={handleClickSave}
        viewSlot={<SecurityView />}
        editSlot={<SecurityEdit />}
      />
    </>
  )
})
