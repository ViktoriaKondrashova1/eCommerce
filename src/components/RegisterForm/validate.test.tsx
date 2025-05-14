import { describe, expect, it } from 'vitest'
import { countries } from './model/countries'
import {
  passwordValidationRules,
  postalCodeValidationRules,
} from './validate'

describe('validation rules', () => {
  describe('password validation', () => {
    it('should have correct number of rules', () => {
      expect(passwordValidationRules.length).toBe(6)
    })

    it('first rule should be required', () => {
      expect(passwordValidationRules[0]).toHaveProperty('required', true)
      expect(passwordValidationRules[0]).toHaveProperty('message')
    })

    it('should have min length rule', () => {
      expect(passwordValidationRules[1]).toHaveProperty('min', 8)
    })
  })

  describe('postal code validation', () => {
    it('should include pattern for country', () => {
      const testCountry = countries[0]
      const rules = postalCodeValidationRules(testCountry.value)
      expect(rules.some(rule => 'pattern' in rule)).toBe(true)
    })
  })
})
