/**
 * Admin-SDK seed/teardown for the deployed-dev e2e (E2E_TARGET=dev).
 *
 * The emulator suite seeds via the Firestore/Auth REST APIs (seed.ts). Against
 * the deployed dev project there's no emulator REST surface, so we seed the real
 * `mountain-sol-platform-dev` Firestore + Auth through firebase-admin. Credentials
 * come from Application Default Credentials (GOOGLE_APPLICATION_CREDENTIALS — set
 * in CI by google-github-actions/auth, or `gcloud auth application-default login`
 * locally).
 *
 * Fixtures mirror seed.ts (same SEED ids + shapes the functions read through) so
 * the same specs assert against either backend. Teardown removes the seeded
 * fixtures plus anything the run created (the test user, its students, drafts and
 * enrollments) so dev doesn't accumulate test data.
 */
import { getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';
import { SEED } from './seed';
import { E2E_USERS } from './test-users';

const DEV_PROJECT_ID = 'mountain-sol-platform-dev';

function app() {
    if (getApps().length === 0) {
        // Explicit projectId avoids "could not load default credentials" when the
        // WIF credential file carries no embedded project_id.
        initializeApp({ projectId: DEV_PROJECT_ID });
    }
}

const db = () => {
    app();
    return getFirestore();
};
const auth = () => {
    app();
    return getAuth();
};

/**
 * Retry a Firestore/Auth op on transient connection failures. In CI the Admin
 * SDK gets credentials keylessly; the first call triggers an STS token exchange
 * (sts.googleapis.com via WIF) whose HTTPS connection intermittently drops with
 * "Premature close" etc. gax's own retries don't always ride it out, which would
 * fail the whole suite at setup/teardown. Non-transient errors throw immediately.
 */
async function withRetry<T>(label: string, fn: () => Promise<T>): Promise<T> {
    const MAX_ATTEMPTS = 4;
    let lastErr: unknown;
    for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
        try {
            return await fn();
        } catch (err) {
            lastErr = err;
            const msg = err instanceof Error ? err.message : String(err);
            const transient =
                /Premature close|metadata from plugin|sts\.googleapis\.com|ECONNRESET|ETIMEDOUT|EAI_AGAIN|socket hang up|fetch failed|UNAVAILABLE|DEADLINE_EXCEEDED|Getting metadata|503|429/i.test(
                    msg
                );
            if (!transient || attempt === MAX_ATTEMPTS) break;
            const delayMs = 1000 * 2 ** (attempt - 1); // 1s, 2s, 4s
            console.warn(
                `[e2e] ${label} attempt ${attempt}/${MAX_ATTEMPTS} failed (${msg}); retrying in ${delayMs}ms`
            );
            await new Promise((resolve) => setTimeout(resolve, delayMs));
        }
    }
    throw lastErr;
}

const futureDate = (() => {
    const d = new Date();
    d.setFullYear(d.getFullYear() + 1);
    return d;
})();
const pastDate = (() => {
    const d = new Date();
    d.setFullYear(d.getFullYear() - 1);
    return d;
})();

// ClassDbo shape — mirror of makeClassDoc in seed.ts, with admin Timestamps.
function makeClassDoc(overrides: Record<string, unknown> = {}) {
    return {
        name: 'E2E Class',
        description: 'Seeded by the e2e suite',
        live: true,
        cost: 0,
        location: 'Room A',
        weekday: 'Monday',
        daily_times: '9:00 AM - 12:00 PM',
        class_type: 'Standard',
        grade_range_start: 1,
        grade_range_end: 12,
        thumbnailUrl: '',
        paused_for_enrollment: false,
        for_information_only: false,
        max_student_size: 12,
        min_student_size: 1,
        instructors: [],
        students: [],
        start: Timestamp.fromDate(pastDate),
        end: Timestamp.fromDate(futureDate),
        registration_end_date: Timestamp.fromDate(futureDate),
        ...overrides,
    };
}

/** Create the scenario Auth user fresh (delete any leftover from a prior run). */
async function recreateUser(email: string, password: string): Promise<string> {
    return await withRetry(`seed:user:${email}`, async () => {
        try {
            const existing = await auth().getUserByEmail(email);
            await auth().deleteUser(existing.uid);
        } catch {
            // No existing user — fine.
        }
        const created = await auth().createUser({ email, password });
        return created.uid;
    });
}

/**
 * Contact-audience fixtures — the dev-mode mirror of seedContactFamilies() in
 * seed.ts. Same ids and shapes, so the same spec asserts against either backend.
 */
async function seedContactFamiliesDev(): Promise<void> {
    const firestore = db();
    const [siblingA, siblingB] = SEED.siblingStudentIds;
    const [primaryFirst, primaryLast] = SEED.siblingPrimaryName.split(' ');
    const [guardianFirst, guardianLast] =
        SEED.siblingSecondGuardianName.split(' ');
    const [unlistedFirst, unlistedLast] = SEED.unlistedPrimaryName.split(' ');

    const siblingGuardians = [
        {
            first_name: primaryFirst,
            last_name: primaryLast,
            relationship: 'Parent',
            phone: '555-0100',
            email: SEED.siblingPrimaryEmail,
        },
        {
            first_name: guardianFirst,
            last_name: guardianLast,
            relationship: 'Parent',
            phone: '555-0101',
            email: SEED.siblingSecondGuardianEmail,
        },
    ];

    await withRetry('seed:contactFamilies', () =>
        Promise.all([
            ...(
                [
                    [siblingA, 'Ada'],
                    [siblingB, 'Abel'],
                ] as const
            ).map(([id, firstName]) =>
                firestore.doc(`students/${id}`).set({
                    first_name: firstName,
                    last_name: primaryLast,
                    primary_first_name: primaryFirst,
                    primary_last_name: primaryLast,
                    primary_email: SEED.siblingPrimaryEmail,
                    guardians: siblingGuardians,
                })
            ),
            firestore.doc(`students/${SEED.unlistedStudentId}`).set({
                first_name: 'Wilder',
                last_name: unlistedLast,
                primary_first_name: unlistedFirst,
                primary_last_name: unlistedLast,
                primary_email: SEED.unlistedPrimaryEmail,
                guardians: [],
            }),
            firestore
                .doc(
                    `semesters/${SEED.semesterId}/classes/${SEED.contactsClassId}`
                )
                .set(
                    makeClassDoc({
                        name: SEED.contactsClassName,
                        cost: 0,
                        students: SEED.siblingStudentIds.map((id) =>
                            firestore.doc(`students/${id}`)
                        ),
                    })
                ),
            firestore
                .doc(
                    `semesters/${SEED.semesterId}/classes/${SEED.contactsUnlistedClassId}`
                )
                .set(
                    makeClassDoc({
                        name: SEED.contactsUnlistedClassName,
                        cost: 0,
                        live: false,
                        students: [
                            firestore.doc(`students/${SEED.unlistedStudentId}`),
                        ],
                    })
                ),
        ])
    );
}

/**
 * Seed the active semester, a FREE open class (cost 0 => enroll()'s no-payment
 * path), a PAID class + add-on, an active discount, and the `fresh` scenario
 * user. Idempotent: fixed doc ids are overwritten and the user is recreated.
 */
export async function seedDev(): Promise<void> {
    await withRetry('seed:fixtures', () =>
        Promise.all([
            db().doc('config/activeSemester').set({ id: SEED.semesterId }),
            db()
                .doc('config/otherSemestersAvailableToEnroll')
                .set({ list: [] }),
            db()
                .doc(`semesters/${SEED.semesterId}`)
                .set({ displayName: SEED.semesterDisplayName }),
            db()
                .doc(`semesters/${SEED.semesterId}/classes/${SEED.freeClassId}`)
                .set(
                    makeClassDoc({
                        name: SEED.freeClassName,
                        cost: 0,
                        students: [],
                    })
                ),
            db()
                .doc(`semesters/${SEED.semesterId}/classes/${SEED.paidClassId}`)
                .set(
                    makeClassDoc({
                        name: SEED.paidClassName,
                        cost: SEED.paidClassCost,
                        students: [],
                    })
                ),
            db()
                .doc(
                    `semesters/${SEED.semesterId}/classes/${SEED.freeClassId}/additional_options/${SEED.paidOptionId}`
                )
                .set({
                    description: SEED.paidOptionDescription,
                    cost: SEED.paidOptionCost,
                    students: [],
                }),
            // Fixed id (REST seed uses an auto-id; DiscountRepository matches on
            // `code`, so the doc id is irrelevant — fixed keeps it idempotent).
            db().doc('discounts/e2e-discount').set({
                code: SEED.discountCode,
                type: 'percent',
                active: true,
                percent: SEED.discountPercent,
            }),
        ])
    );

    await recreateUser(E2E_USERS.fresh.email, E2E_USERS.fresh.password);
    await recreateUser(E2E_USERS.payment.email, E2E_USERS.payment.password);

    // Admin scenario: the Auth user plus the `admins` doc that the /admin route
    // guard and every admin-only callable check.
    const adminUid = await recreateUser(
        E2E_USERS.admin.email,
        E2E_USERS.admin.password
    );
    await withRetry('seed:adminDoc', () =>
        db()
            .doc(`admins/${adminUid}`)
            .set({ userId: adminUid, email: E2E_USERS.admin.email })
    );
    await seedContactFamiliesDev();
}

/** The scenario users whose enrolment data a dev run creates and must clean up. */
const ENROLLING_USERS = [E2E_USERS.fresh, E2E_USERS.payment] as const;

async function uidOf(email: string): Promise<string | undefined> {
    try {
        return (await auth().getUserByEmail(email)).uid;
    } catch {
        return undefined;
    }
}

/**
 * Delete the scenario users' enrollment drafts on the deployed dev project.
 *
 * Completing an enrollment leaves a draft that only the
 * `onSuccessfulEnrollDeleteDraft` Firestore trigger removes, and on deployed
 * dev that trigger has real latency. A draft still present when the next spec
 * reaches Student Selection restores `selectedStudentType`, which renders the
 * step read-only and its Select button disabled — so the click waits on
 * actionability until the test times out. That is #295; clearing the drafts
 * between specs is what actually prevents it.
 */
export async function clearDevEnrollmentDrafts(): Promise<void> {
    const firestore = db();
    const uids = (
        await Promise.all(ENROLLING_USERS.map(({ email }) => uidOf(email)))
    ).filter((uid): uid is string => !!uid);

    await withRetry('clearDrafts', () =>
        Promise.all(
            uids.map((uid) => firestore.doc(`enrollment_draft/${uid}`).delete())
        )
    );
}

/**
 * Remove everything the run touched: the test user, its enrollment_draft, the
 * students + enrollments it created, and the seeded catalog. Idempotent and
 * best-effort — missing docs are ignored.
 */
export async function teardownDev(): Promise<void> {
    const firestore = db();

    // Each enrolling user's created data (enrollments reference userId +
    // studentId).
    for (const { email } of ENROLLING_USERS) {
        const uid = await uidOf(email);
        if (!uid) {
            continue;
        }

        const enrollments = await withRetry('teardown:queryEnrollments', () =>
            firestore.collection('enrollment').where('userId', '==', uid).get()
        );
        const studentIds = new Set<string>();
        enrollments.docs.forEach((d) => {
            const sid = d.get('studentId');
            if (typeof sid === 'string') studentIds.add(sid);
        });
        await withRetry('teardown:deleteEnrollments', () =>
            Promise.all(enrollments.docs.map((d) => d.ref.delete()))
        );
        await withRetry('teardown:deleteStudents', () =>
            Promise.all(
                [...studentIds].map((id) =>
                    firestore.doc(`students/${id}`).delete()
                )
            )
        );
        await withRetry('teardown:deleteDraft', () =>
            firestore.doc(`enrollment_draft/${uid}`).delete()
        );
        await withRetry('teardown:deleteUser', () => auth().deleteUser(uid));
    }

    // Seeded catalog. recursiveDelete clears the semester's classes +
    // additional_options subcollections.
    await withRetry('teardown:deleteSemester', () =>
        firestore.recursiveDelete(firestore.doc(`semesters/${SEED.semesterId}`))
    );
    // Admin scenario: the user, its admins doc, and the contact fixtures. The
    // seeded classes go with the semester's recursiveDelete above; the student
    // documents are top-level and have to be removed explicitly.
    let adminUid: string | undefined;
    try {
        adminUid = (await auth().getUserByEmail(E2E_USERS.admin.email)).uid;
    } catch {
        adminUid = undefined;
    }
    if (adminUid) {
        await withRetry('teardown:deleteAdmin', () =>
            Promise.all([
                firestore.doc(`admins/${adminUid}`).delete(),
                auth().deleteUser(adminUid as string),
            ])
        );
    }
    await withRetry('teardown:deleteContactStudents', () =>
        Promise.all(
            [...SEED.siblingStudentIds, SEED.unlistedStudentId].map((id) =>
                firestore.doc(`students/${id}`).delete()
            )
        )
    );

    await withRetry('teardown:deleteRest', () =>
        Promise.all([
            firestore.doc('config/activeSemester').delete(),
            firestore.doc('config/otherSemestersAvailableToEnroll').delete(),
            firestore.doc('discounts/e2e-discount').delete(),
        ])
    );
}
