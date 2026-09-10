import {
    clearAll,
    createUser,
    seedAdmin,
    seedBaseFixtures,
    seedContactFamilies,
    seedExistingEnrollment,
    seedStaleStudent,
    writeAddendumEnrollmentId,
} from './support/seed';
import { seedDev } from './support/seed-admin';
import { E2E_USERS } from './support/test-users';

/**
 * Runs once before the Playwright suite. Branches on E2E_TARGET:
 *
 * - `dev` — seed the deployed dev project via the Admin SDK (seed-admin.ts):
 *   the `fresh` and `payment` scenarios for the core enrollment specs (kept
 *   separate so neither inherits the other's enrollment draft — #295), plus the
 *   admin user and contact fixtures so admin specs can run against dev too.
 * - `emulator` (default) — seed the local emulators via REST, inside
 *   `firebase emulators:exec` (FIRESTORE/AUTH emulator host env already set).
 *   Seeds the shared catalog plus one user per scenario.
 */
export default async function globalSetup(): Promise<void> {
    if (process.env['E2E_TARGET'] === 'dev') {
        await seedDev();
        console.log(
            '[e2e] global-setup: seeded dev catalog + enrolling users + admin/contact fixtures'
        );
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

    // Admin user + the fixtures the admin specs read. The admins doc is what
    // both the /admin route guard and the admin-only callables check.
    const admin = await createUser(
        E2E_USERS.admin.email,
        E2E_USERS.admin.password
    );
    await seedAdmin(admin);
    await seedContactFamilies();

    console.log('[e2e] global-setup: seeded catalog + 4 scenario users');
}
