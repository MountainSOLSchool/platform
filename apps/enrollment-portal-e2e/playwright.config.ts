import { defineConfig, devices } from '@playwright/test';

const baseURL = process.env['E2E_BASE_URL'] ?? 'http://localhost:4200';

export default defineConfig({
    testDir: './src/e2e',
    testMatch: '**/*.spec.ts',
    globalSetup: './src/global-setup.ts',
    outputDir: './test-results',
    timeout: 90_000,
    expect: { timeout: 15_000 },
    workers: 1,
    fullyParallel: false,
    retries: process.env['CI'] ? 1 : 0,
    reporter: process.env['CI']
        ? [
              ['html', { open: 'never', outputFolder: 'playwright-report' }],
              ['list'],
          ]
        : 'list',
    use: {
        baseURL,
        trace: 'on-first-retry',
        video: 'retain-on-failure',
        screenshot: 'only-on-failure',
    },
    webServer: {
        command: 'npx nx run enrollment-portal:serve:emulator',
        url: baseURL,
        cwd: '../..',
        timeout: 180_000,
        reuseExistingServer: !process.env['CI'],
        stdout: 'pipe',
        stderr: 'pipe',
    },
    projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
