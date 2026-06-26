import { defineConfig, devices } from '@playwright/test';

/**
 * Runs the same specs against either backend, picked by `E2E_TARGET`:
 *
 * - `emulator` (default) — PR check: the Angular app on a local dev server in
 *   emulator mode, callables on the local Firebase emulator. Boots the app via
 *   the `webServer` block. Pair with `firebase emulators:exec`.
 * - `dev` — post-merge gate: the deployed portal on dev Hosting
 *   (mountain-sol-platform-dev.web.app), callables on the deployed dev project.
 *   No `webServer`; baseURL points at the deployed site. Seed runs against the
 *   real dev Firestore/Auth via the Admin SDK (see seed-admin.ts).
 */
const target = process.env['E2E_TARGET'] ?? 'emulator';

const DEFAULT_DEV_URL = 'https://mountain-sol-platform-dev.web.app';

const baseURL =
    process.env['E2E_BASE_URL'] ??
    (target === 'dev' ? DEFAULT_DEV_URL : 'http://localhost:4200');

export default defineConfig({
    testDir: './src/e2e',
    // Against deployed dev, run only the core enrollment paths (basic $0 flow).
    // The full variation matrix stays on the emulator PR job.
    testMatch: target === 'dev' ? '**/enrollment.spec.ts' : '**/*.spec.ts',
    globalSetup: './src/global-setup.ts',
    globalTeardown: './src/global-teardown.ts',
    outputDir: './test-results',
    // Deployed-dev callables can cold-start past the emulator's budget,
    // especially on the first request after a deploy.
    timeout: target === 'dev' ? 120_000 : 90_000,
    expect: { timeout: target === 'dev' ? 20_000 : 15_000 },
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
    // Local dev server is only needed in emulator mode; in dev mode the portal
    // is already deployed to Hosting.
    ...(target === 'emulator' && {
        webServer: {
            command: 'npx nx run enrollment-portal:serve:emulator',
            url: baseURL,
            cwd: '../..',
            timeout: 180_000,
            reuseExistingServer: !process.env['CI'],
            stdout: 'pipe',
            stderr: 'pipe',
        },
    }),
    projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
