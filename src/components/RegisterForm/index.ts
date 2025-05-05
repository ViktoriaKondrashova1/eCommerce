import type { Rule } from 'antd/es/form'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'

export const passwordValidationRules: Rule[] = [
  { required: true, message: 'Please input your Password!' },
  { min: 8, message: 'Password must be at least 8 characters long!' },
  {
    pattern: /[A-Z]/,
    message: 'Password must contain at least one uppercase letter (A-Z)!',
  },
  {
    pattern: /[a-z]/,
    message: 'Password must contain at least one lowercase letter (a-z)!',
  },
  {
    pattern: /\d/,
    message: 'Password must contain at least one digit (0-9)!',
  },
  {
    pattern: /^\S.*\S$/,
    message: 'Password must not contain leading or trailing whitespace!',
  },
]

export const emailValidationRules: Rule[] = [
  { required: true, message: 'Please input your Email!' },
  { type: 'email', message: 'Please enter a valid Email (e.g., user@example.com)' },
  {
    pattern: /^\S.*\S$/,
    message: 'Email must not contain leading or trailing whitespace',
  },
]

export const nameValidationRules: Rule[] = [
  { required: true, message: 'Please input your first name!' },
  { min: 1, message: 'Name must contain at least one character!' },
  { pattern: /^[a-z\s]*$/i, message: 'Name must contain only letters!' },
]

export const dateValidationRules: Rule[] = [
  { required: true, message: 'Please input your date of birth!' },
  { validator: async (_, value: Dayjs | null) => {
    if (value === null) {
      return Promise.resolve()
    }

    const isAdult = dayjs().subtract(18, 'year')

    if (value.isBefore(isAdult)) {
      return Promise.resolve()
    }
    else {
      return Promise.reject(new Error('You must be over 18 years!'))
    }
  } },
]

export const confirmPasswordValidationRules: Rule[] = [
  { required: true, message: 'Please input your Password!' },
  ({ getFieldValue }) => ({
    async validator(_, value) {
      if (getFieldValue('password') === value) {
        return Promise.resolve()
      }
      return Promise.reject(new Error('Your passwords do not match!'))
    },
  }),
]

// TODO Must be a valid country from a predefined list or autocomplete field
export const countryValidationRules: Rule[] = [
  { required: true, message: 'Please input your country!' },
]

export const cityValidationRules: Rule[] = [
  { required: true, message: 'Please input your city!' },
  { pattern: /^[a-z\s]*$/i, message: 'City must contain only letters!' },
]

// TODO Must follow the format for the country
export const postalCodeValidationRules: Rule[] = [
  { required: true, message: 'Please input your postal code!' },
]

export const streetValidationRules: Rule[] = [
  { required: true, message: 'Please input your street!' },
]
