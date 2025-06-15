import type { SelectProps } from 'antd'
import type { FC } from 'react'
import type { BaseComponent } from '@/shared/types/common.types.ts'
import { Select } from 'antd'
import { useEffect, useState } from 'react'
import './SortingSelect.scss'

interface Props extends BaseComponent {
  options: SelectProps['options']
  title: string
  isMultiple?: boolean
  onChange: (value: string[]) => void
  shouldUpdate: boolean
}

export const SortingSelect: FC<Props> = ({
  testId = 'sorting-select',
  title,
  options,
  isMultiple = true,
  onChange,
  shouldUpdate,
}) => {
  const initialValue: string[] = []
  const [value, setValue] = useState<string[]>(initialValue)

  useEffect(() => {
    if (shouldUpdate) {
      setValue([])
    }
  }, [shouldUpdate])

  const handleChange = (newValue: string | string[]): void => {
    const values = Array.isArray(newValue) ? newValue : [newValue]
    setValue(values)
    onChange(values)
  }

  return (
    <Select
      data-testid={testId}
      mode={isMultiple ? 'multiple' : undefined}
      placeholder={title}
      onChange={handleChange}
      style={{ width: '100%' }}
      options={options}
      className="sorting-select"
      value={value}
    />
  )
}
