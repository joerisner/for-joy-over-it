import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  expect: {
    timeout: 5000
  },
  forbidOnly: !!process.env.CI,
  fullyParallel: true,
  outputDir: './test/browser/artifacts',
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] }
    }
  ],
  reporter: [['dot'], ['html', { open: 'never', outputFolder: './test/browser/report' }]],
  retries: process.env.CI ? 2 : 0,
  testDir: './test/browser',
  timeout: 20 * 1000,
  use: {
    actionTimeout: 0,
    baseURL: 'http://localhost:4000',
    screenshot: {
      mode: 'only-on-failure',
      fullPage: true
    },
    trace: 'on-first-retry'
  },
  webServer: {
    command: 'npm run preview',
    reuseExistingServer: !process.env.CI,
    timeout: 20 * 1000,
    url: 'http://localhost:4000'
  },
  workers: process.env.CI ? 1 : undefined // Opt out of parallel tests on CI.
});
