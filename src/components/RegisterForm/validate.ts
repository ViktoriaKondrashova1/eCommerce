import type { Rule } from 'antd/es/form'
import type { Dayjs } from 'dayjs'
import { commerceApi } from '@/shared/configs/commerce-client'
import dayjs from 'dayjs'
import { countries } from './countries'

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
  // { type: 'email', message: 'Please enter a valid Email (e.g., user@example.com)' },
  { pattern: /^[\w.%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i, message: 'Please enter a valid Email (e.g., user@example.com)' },
  {
    pattern: /^\S.*\S$/,
    message: 'Email must not contain leading or trailing whitespace',
  },
  { validator: async (_, value) => {
    if (value === null) {
      return Promise.resolve()
    }

    try {
      const response = await commerceApi.customers().get().execute()
      // eslint-disable-next-line no-console
      console.log(response)
      // const customers = response.data;
      // const emailExists = customers.some(customer =>
      //   customer.email.toLowerCase() === value.toLowerCase().trim()
      // );

      // if (emailExists) {
      //   throw new Error('This email is already registered');
      // }
      // return Promise.resolve();
    }
    catch {
      throw new Error('Unable to verify email. Please try again.')
    }
  } },
]

export const nameValidationRules: Rule[] = [
  { required: true, message: 'Please input your name!' },
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

export const countryValidationRules: Rule[] = [
  { required: true, message: 'Please input your country!' },
]

export const cityValidationRules: Rule[] = [
  { required: true, message: 'Please input your city!' },
  { pattern: /^[a-z\s]*$/i, message: 'City must contain only letters!' },
]

export const postalCodeValidationRules: (country: string) => Rule[] = (country) => {
  const selectedCountry = countries.find(c => c.value === country)
  if (!selectedCountry) {
    return [{ required: true, message: 'Select a country' }]
  }

  const rules: Rule[] = [{ required: true, message: 'Please input your postal code!' }]

  if (selectedCountry.code != null) {
    rules.push({
      pattern: new RegExp(selectedCountry.code),
      message: `Invalid postal code format for ${selectedCountry.label}`,
    })
  }

  return rules
}

export const streetValidationRules: Rule[] = [
  { required: true, message: 'Please input your street!' },
  { min: 1, message: 'Street must contain at least one character!' },
]
