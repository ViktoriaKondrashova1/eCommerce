import type { Rule } from 'antd/es/form'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import { countries } from './countries.ts'

export const passwordValidationRules: Rule[] = [
  {
    required: true,
    message: 'Please type your Password',
    whitespace: true,
  },
  {
    min: 8,
    message: 'Password must be at least 8 characters',
  },
  {
    pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)\S+$/,
    message: 'Must contain uppercase, lowercase, digit and no spaces',
  },
]

export function confirmPasswordValidationRules(fieldName: string = 'password'): Rule[] {
  return [
    { required: true, message: 'Please confirm your password' },
    ({ getFieldValue }) => ({
      async validator(_, value) {
        if (getFieldValue(fieldName) === value) {
          return Promise.resolve()
        }
        return Promise.reject(new Error('Your passwords don\'t match'))
      },
    }),
  ]
}

export const emailValidationRules: Rule[] = [
  {
    required: true,
    message: 'Please type your Email',
    whitespace: true,
  },
  {
    pattern: /^[\w.%+-]+@[a-z0-9-]+\.[a-z]{2,}$/i,
    message: 'Please enter a valid Email (e.g., user@example.com)',
  },
]

export const nameValidationRules: Rule[] = [
  {
    required: true,
    message: 'Please type your name',
    whitespace: true,
  },
  {
    pattern: /^[a-z\s]*$/i,
    message: 'Only Latin letters and spaces allowed',
  },
]

export const dateValidationRules: Rule[] = [
  {
    required: true,
    message: 'Please select birth date',
  },
  { validator: async (_, value: Dayjs | null) => isOver18(value) },
]

export async function isOver18(date: Dayjs | null): Promise<void> {
  if (date === null) {
    return Promise.resolve()
  }

  const eighteenYearsAgo = dayjs().subtract(18, 'year')

  if (date?.isBefore?.(eighteenYearsAgo)) {
    return Promise.resolve()
  }
  else {
    return Promise.reject(new Error('You must be over 18 years'))
  }
}

export const countryValidationRules: Rule[] = [
  { required: true, message: 'Please type your country' },
]

export const cityValidationRules: Rule[] = [
  {
    required: true,
    message: 'Please type your city',
    whitespace: true,
  },
  {
    pattern: /^[a-z\s]*$/i,
    message: 'City must contain only letters',
  },
]

export const postalCodeDependOnAddressValidationRules: (country?: string | null) => Rule[] = (country) => {
  const selectedCountry = countries.find(c => c.value === country)
  if (!selectedCountry) {
    return [{ required: true, message: 'Select a country' }]
  }

  const rules: Rule[] = [
    {
      required: true,
      message: 'Please type your postal code',
      whitespace: true,
    },
  ]

  if (selectedCountry.code != null) {
    rules.push({
      pattern: new RegExp(selectedCountry.code),
      message: `Invalid postal code format for ${selectedCountry.label}`,
    })
  }

  return rules
}

export const postalCodeValidationRules = [
  {
    required: true,
    message: 'Please type your postal code',
    whitespace: true,
  },
  {
    pattern: /^\d+$/,
    message: 'Postal code must contain only digits',
  },
]

export const streetValidationRules: Rule[] = [
  {
    required: true,
    message: 'Please type your street',
    whitespace: true,
  },
  {
    min: 1,
    message: 'Street must contain at least one character',
    whitespace: true,
  },
]
