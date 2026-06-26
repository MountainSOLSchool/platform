import { teardownDev } from './support/seed-admin';

/**
 * Runs once after the suite.
 *
 * - `emulator` — nothing to do; the emulator process exits with the job,
 *   discarding all seeded state.
 * - `dev` — delete the seeded catalog + everything the run created (test user,
 *   its students/enrollments/draft) so the deployed dev project doesn't
 *   accumulate test data. Best-effort: a teardown hiccup shouldn't fail the
 *   run, since the test result is the real signal.
 */
export default async function globalTeardown(): Promise<void> {
    if (process.env['E2E_TARGET'] !== 'dev') {
        return;
    }
    try {
        await teardownDev();
        console.log('[e2e] global-teardown: removed dev fixtures + run data');
    } catch (err) {
        console.error('[e2e] global-teardown failed (continuing):', err);
    }
}
