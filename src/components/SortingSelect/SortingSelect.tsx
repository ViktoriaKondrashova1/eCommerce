import type { SelectProps } from 'antd'
import type { FC } from 'react'
import type { BaseComponent } from '@/shared/types/common.types'
import { Select } from 'antd'
import './SortingSelect.scss'

interface Props extends BaseComponent {
  options: SelectProps['options']
  title: string
  isMultiple?: boolean
  onClick: (value: string[]) => void
}

export const SortingSelect: FC<Props> = ({ testId = 'sorting-select', title, options, isMultiple = true, onClick }) => {
  return (
    <Select
      data-testid={testId}
      mode={isMultiple ? 'multiple' : undefined}
      placeholder={title}
      onChange={() => onClick(['sadsdasd', 'test'])}
      style={{ width: '100%' }}
      options={options}
      className="sorting-select"
    />
  )
}
