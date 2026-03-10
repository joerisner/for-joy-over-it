/// <reference types="vitest/config" />
import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    include: ['test/**/*.test.ts'],
    exclude: ['test/browser/**/*'],
    typecheck: {
      enabled: true,
      include: ['test/**/*.test.ts'],
      exclude: ['test/browser/**/*'],
      ignoreSourceErrors: true
    },
    watch: false
  }
});
