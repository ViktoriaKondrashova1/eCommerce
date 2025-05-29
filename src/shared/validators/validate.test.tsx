import dayjs from 'dayjs'
import { countries } from './countries.ts'
import {
  cityValidationRules,
  confirmPasswordValidationRules,
  countryValidationRules,
  dateValidationRules,
  emailValidationRules,
  isOver18,
  nameValidationRules,
  passwordValidationRules,
  postalCodeValidationRules,
  streetValidationRules,
} from './validate.ts'

describe('password validation', () => {
  it('should have correct number of rules', () => {
    expect(passwordValidationRules.length).toBe(3)
  })

  it('should be required', () => {
    expect(passwordValidationRules[0]).toHaveProperty('required', true)
    expect(passwordValidationRules[0]).toHaveProperty('message')
  })

  it('should have min length rule', () => {
    expect(passwordValidationRules[1]).toHaveProperty('min', 8)
  })
})

describe('confirm password validation', () => {
  it('rule should be required', () => {
    expect(confirmPasswordValidationRules[0]).toHaveProperty('required', true)
    expect(confirmPasswordValidationRules[0]).toHaveProperty('message')
  })
})

describe('postal code validation', () => {
  it('should include pattern for country', () => {
    const testCountry = countries[0]
    const rules = postalCodeValidationRules(testCountry.value)
    expect(rules.some(rule => 'pattern' in rule)).toBe(true)
  })
})

describe('email validation', () => {
  it('should have correct number of rules', () => {
    expect(emailValidationRules.length).toBe(2)
  })
})

it('should validate correct email format', () => {
  const rule = emailValidationRules[1]
  if ('pattern' in rule && rule.pattern !== undefined) {
    const validEmails = [
      'user@example.com',
      'user.name+tag@sub.domain',
      'user123@domain.io',
    ]
    validEmails.forEach((email) => {
      expect(rule.pattern?.test(email)).toBe(true)
    })
  }
})

it('should invalidate incorrect email format', () => {
  const rule = emailValidationRules[1]
  if ('pattern' in rule && rule.pattern !== undefined) {
    const invalidEmails = [
      'userexample.com',
      'user@.com',
      'user@domain',
      'user@domain..com',
      'user@domain.c',
    ]
    invalidEmails.forEach((email) => {
      expect(rule.pattern?.test(email)).toBe(false)
    })
  }
})

describe('name validation', () => {
  it('should have correct number of rules', () => {
    expect(nameValidationRules.length).toBe(2)
  })

  it('should validate correct name format', () => {
    const rule = nameValidationRules[1]
    if ('pattern' in rule && rule.pattern !== undefined) {
      const validNames = [
        'user',
        'uSeR',
        'user USER',
      ]
      validNames.forEach((name) => {
        expect(rule.pattern?.test(name)).toBe(true)
      })
    }
  })

  it('should invalidate incorrect name format', () => {
    const rule = nameValidationRules[1]
    if ('pattern' in rule && rule.pattern !== undefined) {
      const validNames = [
        'user!',
        'uSeR1',
        'user-USER',
      ]
      validNames.forEach((name) => {
        expect(rule.pattern?.test(name)).toBe(false)
      })
    }
  })
})

describe('date validation', () => {
  it('should be required', () => {
    expect(dateValidationRules[0]).toHaveProperty('required', true)
    expect(dateValidationRules[0]).toHaveProperty('message')
  })

  it('should resolve if date is null', async () => {
    await expect(isOver18(null)).resolves.toBeUndefined()
  })

  it('should resolve if date is more than 18 years ago', async () => {
    const oldDate = dayjs().subtract(19, 'year')
    await expect(isOver18(oldDate)).resolves.toBeUndefined()
  })

  it('should reject if date is exactly 18 years ago', async () => {
    const exact18 = dayjs().subtract(18, 'year')
    await expect(isOver18(exact18)).rejects.toThrow('You must be over 18 years')
  })

  it('should reject if date is less than 18 years ago', async () => {
    const recentDate = dayjs().subtract(17, 'year').add(1, 'day')
    await expect(isOver18(recentDate)).rejects.toThrow('You must be over 18 years')
  })
})

describe('country validation', () => {
  it('should be required', () => {
    expect(countryValidationRules[0]).toHaveProperty('required', true)
    expect(countryValidationRules[0]).toHaveProperty('message')
  })
})

describe('city validation', () => {
  it('should be required', () => {
    expect(cityValidationRules[0]).toHaveProperty('required', true)
    expect(cityValidationRules[0]).toHaveProperty('message')
  })

  it('should validate correct city format', () => {
    const rule = cityValidationRules[1]
    if ('pattern' in rule && rule.pattern !== undefined) {
      const validCities = [
        'minsk',
        'mInSk',
        'minsk MINSK',
      ]
      validCities.forEach((city) => {
        expect(rule.pattern?.test(city)).toBe(true)
      })
    }
  })

  it('should invalidate incorrect city format', () => {
    const rule = cityValidationRules[1]
    if ('pattern' in rule && rule.pattern !== undefined) {
      const invalidCities = [
        'minsk!',
        'mInSk1',
        'minsk*MINSK',
      ]
      invalidCities.forEach((city) => {
        expect(rule.pattern?.test(city)).toBe(false)
      })
    }
  })
})

describe('street validation', () => {
  it('should be required', () => {
    expect(streetValidationRules[0]).toHaveProperty('required', true)
    expect(streetValidationRules[0]).toHaveProperty('message')
  })

  it('should have min length rule', () => {
    expect(streetValidationRules[1]).toHaveProperty('min', 1)
  })
})
