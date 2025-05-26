import antfu from '@antfu/eslint-config'

export default antfu({
  react: true,
  typescript: {
    tsconfigPath: './tsconfig.json',
    overrides: {
      'ts/no-explicit-any': 'error',
      'ts/consistent-type-assertions': ['error', { assertionStyle: 'never' }],
      'node/prefer-global/process': 'off',
      'prefer-const': 'off',
    },
  },
  ignores: ['*.config.ts', '*.d.ts'],
}, {
  files: ['**/*.test.ts', '**/*.test.tsx'],
  rules: {
    'ts/consistent-type-assertions': 'off',
    'ts/no-unsafe-assignment': 'off',
    'ts/no-unsafe-call': 'off',
    'react-hooks-extra/no-unnecessary-use-prefix': 'off',
    'react-hooks-extra/ no-direct-set-state-in-use-effect': 'off',
  },
}, {
  files: ['vite.config.ts'],
  rules: {
    'ts/strict-boolean-expressions': 'off',
  },
})
