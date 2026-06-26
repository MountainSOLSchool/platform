import {
    clearAll,
    createUser,
    seedBaseFixtures,
    seedExistingEnrollment,
    seedStaleStudent,
    writeAddendumEnrollmentId,
} from './support/seed';
import { seedDev } from './support/seed-admin';
import { E2E_USERS } from './support/test-users';

/**
 * Runs once before the Playwright suite. Branches on E2E_TARGET:
 *
 * - `dev` — seed the deployed dev project via the Admin SDK (seed-admin.ts).
 *   Only the `fresh` scenario is needed for the deployed core enrollment spec.
 * - `emulator` (default) — seed the local emulators via REST, inside
 *   `firebase emulators:exec` (FIRESTORE/AUTH emulator host env already set).
 *   Seeds the shared catalog plus one user per scenario.
 */
export default async function globalSetup(): Promise<void> {
    if (process.env['E2E_TARGET'] === 'dev') {
        await seedDev();
        console.log('[e2e] global-setup: seeded dev catalog + fresh user');
        return;
    }

    await clearAll();
    await seedBaseFixtures();

    // Fresh user: no students / enrollments.
    await createUser(E2E_USERS.fresh.email, E2E_USERS.fresh.password);

    // Stale user: owns a student whose info is >2 years old. The student is
    // only surfaced on the Student Selection step via a prior `enrolled`
    // enrollment (AuthUtility.getUserStudentIds reads the enrollment
    // collection), so pair the stale student with one.
    const stale = await createUser(
        E2E_USERS.stale.email,
        E2E_USERS.stale.password
    );
    await seedStaleStudent(stale.uid);
    await seedExistingEnrollment(stale.uid);

    // Addendum user: owns an existing enrollment.
    const addendum = await createUser(
        E2E_USERS.addendum.email,
        E2E_USERS.addendum.password
    );
    const addendumEnrollmentId = await seedExistingEnrollment(addendum.uid);
    writeAddendumEnrollmentId(addendumEnrollmentId);

    console.log('[e2e] global-setup: seeded catalog + 3 scenario users');
}
