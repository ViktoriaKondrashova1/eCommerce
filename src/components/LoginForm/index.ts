import type { Rule } from 'antd/es/form'

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
