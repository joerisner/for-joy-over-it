import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    // Resolves the path aliases declared in tsconfig.json.
    tsconfigPaths: true
  },
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
