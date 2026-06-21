import {
    clearAll,
    createUser,
    seedBaseFixtures,
    seedExistingEnrollment,
    seedStaleStudent,
} from './support/seed';
import { E2E_USERS } from './support/test-users';

/**
 * Runs once before the Playwright suite, inside `firebase emulators:exec`
 * (so FIRESTORE_EMULATOR_HOST / FIREBASE_AUTH_EMULATOR_HOST are already set).
 * Seeds the shared catalog plus one user per scenario.
 */
export default async function globalSetup(): Promise<void> {
    await clearAll();
    await seedBaseFixtures();

    // Fresh user: no students / enrollments.
    await createUser(E2E_USERS.fresh.email, E2E_USERS.fresh.password);

    // Stale user: owns a student whose info is >2 years old.
    const stale = await createUser(
        E2E_USERS.stale.email,
        E2E_USERS.stale.password
    );
    await seedStaleStudent(stale.uid);

    // Addendum user: owns an existing enrollment.
    const addendum = await createUser(
        E2E_USERS.addendum.email,
        E2E_USERS.addendum.password
    );
    await seedExistingEnrollment(addendum.uid);

    console.log('[e2e] global-setup: seeded catalog + 3 scenario users');
}
