import type { BaseComponent } from '@/shared/types/common.types.ts'
import { AppText } from '@/components/AppText/AppText.tsx'
import { AppTitle } from '@/components/AppTitle/AppTitle.tsx'

interface Props extends BaseComponent { title: string, description: string }
export function MobileTitle({ title, description }: Props) {
  return (
    <>
      <AppTitle level={4} style={{ margin: 0 }}>{title}</AppTitle>
      <AppText type="secondary">{description}</AppText>
    </>
  )
}
