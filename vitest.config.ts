import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(viteConfig, defineConfig({
  test: {
    testTimeout: 15000,
    environment: 'happy-dom',
    globals: true,
    watch: false,
    setupFiles: './src/shared/configs/setupTests.ts',

    exclude: [
      '**/node_modules/**',
    ],

    onConsoleLog: (log) => {
      const warnings = [
          'React Router will begin wrapping state updates in `React.startTransition` in v7.',
          'React Router Future Flag Warning',
        'Instead, add a ref directly to the element you want to reference',
        'Warning: An update to ForwardRef inside a test was not wrapped in act(...)']
      if (warnings.some(warn => log.includes(warn))) {
        return false;
      }
    },

    fileParallelism: true,
    pool: 'threads',
    poolOptions: {
      threads: {
        minThreads: 1,
        maxThreads: 8
      }
    }
  },

  cacheDir: './node_modules/.vitest'
}))
