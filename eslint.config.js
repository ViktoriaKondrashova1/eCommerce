import antfu from '@antfu/eslint-config'

export default antfu({
  react: true,
  typescript: {
    tsconfigPath: './tsconfig.json',
    overrides: {
      'ts/no-explicit-any': 'error',
      'ts/consistent-type-assertions': ['error', { assertionStyle: 'never' }],
    },
  },
  ignores: ['*.config.ts', '*.d.ts'],
}, {
  files: ['**/*.test.ts', '**/*.test.tsx'],
  rules: {
    'ts/consistent-type-assertions': 'off',
    'ts/no-unsafe-assignment': 'off',
    'ts/no-unsafe-call': 'off',
  },
}, {
  files: ['vite.config.ts'],
  rules: {
    'ts/strict-boolean-expressions': 'off',
  },
})
