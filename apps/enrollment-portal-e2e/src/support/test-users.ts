/**
 * Fixed emulator user credentials, one per scenario so seeded state never
 * collides. global-setup creates these users and seeds the data each owns;
 * specs log in through the UI with the matching credentials.
 */
export const E2E_USERS = {
    /** No students, no enrollments — drives basic / options / coupon flows. */
    fresh: { email: 'fresh@e2e.mountainsol.test', password: 'E2eTester!1' },
    /** Owns a student whose info is >2 years stale — drives the review flow. */
    stale: { email: 'stale@e2e.mountainsol.test', password: 'E2eTester!1' },
    /** Owns an existing enrollment — drives the addendum flow. */
    addendum: {
        email: 'addendum@e2e.mountainsol.test',
        password: 'E2eTester!1',
    },
} as const;
