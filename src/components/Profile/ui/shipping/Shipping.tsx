import type { FC } from 'react'
import { observer } from 'mobx-react-lite'
import { ModeAwareContent } from '@/components/Profile/ui/ModeAwareContent.tsx'
import { ShippingEdit } from '@/components/Profile/ui/shipping/ShippingEdit.tsx'
import { ShippingView } from '@/components/Profile/ui/shipping/ShippingView.tsx'

interface Props {}

export const Shipping: FC<Props> = observer(() => {
  const handleClickSave = () => {}

  return (
    <>
      <ModeAwareContent
        onSaveClick={handleClickSave}
        viewSlot={<ShippingView />}
        editSlot={<ShippingEdit />}
      />
    </>
  )
})
