import type { FC } from 'react'
import { observer } from 'mobx-react-lite'
import { BillingEdit } from '@/components/Profile/ui/billing/BillingEdit.tsx'
import { BillingView } from '@/components/Profile/ui/billing/BillingView.tsx'
import { ModeAwareContent } from '@/components/Profile/ui/ModeAwareContent.tsx'

interface Props {}

export const Billing: FC<Props> = observer(() => {
  const handleClickSave = async () => {}

  return (
    <>
      <ModeAwareContent
        onClickSave={handleClickSave}
        viewSlot={<BillingView />}
        editSlot={<BillingEdit />}
      />
    </>
  )
})
