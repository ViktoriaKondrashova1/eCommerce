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
}, {
  files: ['**/*.test.ts', '**/*.test.tsx'],
  rules: {
    'ts/consistent-type-assertions': 'off',
  },
})
