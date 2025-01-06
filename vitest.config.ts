/// <reference types="vitest/config" />
import { defineConfig } from 'vitest/config';

export default defineConfig({
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
