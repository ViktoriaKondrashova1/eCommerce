import type { FC } from 'react'
import { observer } from 'mobx-react-lite'
import { ModeAwareContent } from '@/components/Profile/ui/ModeAwareContent.tsx'
import { PersonalInfoEdit } from '@/components/Profile/ui/personalInfo/PersonalInfoEdit.tsx'
import { PersonalInfoView } from '@/components/Profile/ui/personalInfo/PersonalInfoView.tsx'

interface Props {}

export const PersonalInfo: FC<Props> = observer(() => {
  const handleClickSave = () => {}

  return (
    <>
      <ModeAwareContent
        onSaveClick={handleClickSave}
        viewSlot={<PersonalInfoView />}
        editSlot={<PersonalInfoEdit />}
      />
    </>
  )
})
