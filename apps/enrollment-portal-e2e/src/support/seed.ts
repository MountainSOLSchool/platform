/**
 * Firestore/Auth seed module for the enrollment-portal Playwright e2e suite.
 *
 * Seeds the minimum a real $0-class enrollment flow needs:
 *   - config/activeSemester  -> { id }          (Semester.active())
 *   - semesters/{id}         -> { displayName }  (_getSemestersAvailableToEnroll)
 *   - semesters/{id}/classes/{freeClassId}       (a FREE, open, under-capacity class)
 *   - .../additional_options/{paidOptionId}      (a PAID add-on, subcollection)
 *   - discounts/{auto}       -> active percent discount
 *
 * All writes use the emulator REST API (emulator.ts), matching the approach in
 * apps/functions-integration-tests. The doc shapes are taken from the actual
 * repositories the functions read through:
 *   - ClassDbo:            libs/firebase/classes/class-repository/src/lib/class.repository.ts
 *   - active semester:     libs/firebase/classes/class-repository/src/lib/active-semester.repository.ts
 *   - available semesters: libs/firebase/enrollment-functions/shared/.../_getSemestersAvailableToEnroll.ts
 *   - additional options:  apps/functions-integration-tests/.../additional-options-subcollection.spec.ts
 *   - student DBO:         libs/firebase/.../_mapStudentFormToStudentDbEntry.ts (+ student-db-entry.type.ts)
 *   - enrollment DBO:      apps/functions-integration-tests/.../admin-enrollments.spec.ts
 *   - discount DBO:        libs/firebase/enrollment-functions/create-discount/.../create-discount.ts
 */

import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import {
    EMULATOR_CONFIG,
    FirestoreRef,
    FirestoreTimestamp,
    TestUser,
    addFirestoreDoc,
    clearAuthEmulator,
    clearFirestoreEmulator,
    createTestUser,
    deleteFirestoreCollection,
    setFirestoreDoc,
} from './emulator';

export { EMULATOR_CONFIG } from './emulator';
export type { TestUser } from './emulator';

// ─── Fixture constants (import these in specs) ──────────────────────────────

export const SEED = {
    /** Active semester id (config/activeSemester.id -> semesters/{id}). */
    semesterId: 'e2e-semester',
    semesterDisplayName: 'E2E Test Semester',

    /** FREE, open, under-capacity class. cost 0 => enroll() no-payment path. */
    freeClassId: 'e2e-free-class',
    freeClassName: 'E2E Free Class',

    /**
     * PAID ($100) open class, no add-ons. Lets the discount-code flow assert a
     * meaningful (non-$0) total drop. Cannot complete a real enrollment
     * hermetically (Braintree is required when finalTotal > 0).
     */
    paidClassId: 'e2e-paid-class',
    paidClassName: 'E2E Paid Class',
    paidClassCost: 100,

    /** PAID add-on on the free class (subcollection additional_options doc). */
    paidOptionId: 'e2e-paid-option',
    paidOptionCost: 25,
    paidOptionDescription: 'E2E Before Care 8am-9am',

    /** Active discount code (uppercased to match create-discount behaviour). */
    discountCode: 'E2ESAVE10',
    discountPercent: 10,

    /** Existing-enrollment fixture ids (seedExistingEnrollment). */
    existingStudentId: 'e2e-existing-student',
    existingStudentName: 'Existing E2E Student',
} as const;

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

// ─── Class doc shape (ClassDbo) ─────────────────────────────────────────────

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
        start: new FirestoreTimestamp(pastDate),
        end: new FirestoreTimestamp(futureDate),
        // Must be >= now AND live === true for getOpenForRegistration().
        registration_end_date: new FirestoreTimestamp(futureDate),
        ...overrides,
    };
}

// ─── Public API ─────────────────────────────────────────────────────────────

/** Wipe Auth + Firestore emulators. Call before each spec/run. */
export async function clearAll(): Promise<void> {
    await clearAuthEmulator();
    await clearFirestoreEmulator();
}

/**
 * Delete all enrollment_draft docs. The enrollment flow autosaves a per-user
 * draft (update-enrollment-draft) as the form is filled; on the next sign-in it
 * is reloaded and shows a "previous session" banner that changes the Student
 * Selection UI. Since these suites reuse a small set of fixed users across
 * tests, clear drafts before each test so every flow starts clean.
 * Draft doc location: enrollment_draft/{userId} (_deleteEnrollmentDraft.ts).
 */
export async function clearEnrollmentDrafts(): Promise<void> {
    await deleteFirestoreCollection('enrollment_draft');
}

/**
 * Seed the active semester, a FREE open under-capacity class, a PAID additional
 * option on that class, and one active discount code. After this, the class is
 * returned by currentSemester / availableEnrollmentClasses and enroll() takes
 * the no-payment ($0) path when no add-on is selected.
 */
export async function seedBaseFixtures(): Promise<void> {
    // Active semester pointer + semester doc (needs displayName).
    await setFirestoreDoc('config', 'activeSemester', { id: SEED.semesterId });
    await setFirestoreDoc('config', 'otherSemestersAvailableToEnroll', {
        list: [],
    });
    await setFirestoreDoc('semesters', SEED.semesterId, {
        displayName: SEED.semesterDisplayName,
    });

    // FREE class (cost 0), open for registration, under capacity, empty roster.
    await setFirestoreDoc(
        `semesters/${SEED.semesterId}/classes`,
        SEED.freeClassId,
        makeClassDoc({
            name: SEED.freeClassName,
            cost: 0,
            students: [],
        })
    );

    // PAID class (cost 100), open for registration, under capacity. Drives the
    // discount-code flow where a 10% code is a meaningful $100 -> $90 drop.
    await setFirestoreDoc(
        `semesters/${SEED.semesterId}/classes`,
        SEED.paidClassId,
        makeClassDoc({
            name: SEED.paidClassName,
            cost: SEED.paidClassCost,
            students: [],
        })
    );

    // PAID additional option (subcollection doc). Only adds cost when its id is
    // passed in additionalOptionIdsByClassId, so the base class stays $0.
    await setFirestoreDoc(
        `semesters/${SEED.semesterId}/classes/${SEED.freeClassId}/additional_options`,
        SEED.paidOptionId,
        {
            description: SEED.paidOptionDescription,
            cost: SEED.paidOptionCost,
            students: [],
        }
    );

    // Active percent discount. DiscountRepository.get() matches on `code`.
    // create-discount uppercases codes, so seed the uppercased value.
    await addFirestoreDoc('discounts', {
        code: SEED.discountCode,
        type: 'percent',
        active: true,
        percent: SEED.discountPercent,
    });
}

/**
 * Seed a student owned by `uid` whose last review is >2 years old, so
 * _doesStudentInfoRequireReview() returns true (drives the "info out of date"
 * review prompt). Pair with an enrollment for the same uid+student via
 * seedExistingEnrollment so getCurrentUserCompletedEnrollments finds it.
 */
export async function seedStaleStudent(uid: string): Promise<string> {
    const threeYearsAgo = new Date();
    threeYearsAgo.setFullYear(threeYearsAgo.getFullYear() - 3);

    await setFirestoreDoc('students', SEED.existingStudentId, {
        first_name: 'Existing',
        last_name: 'E2E Student',
        birth_date: '2015-01-01',
        code_word: 'seed',
        primary_email: 'parent@e2e.test',
        primary_first_name: 'Parent',
        primary_last_name: 'E2E',
        primary_phone: '555-0100',
        ok_to_photograph: true,
        ok_use_name_photographs: true,
        ok_deet_bugspray: false,
        ok_natural_bugspray: false,
        ok_sunscreen: true,
        pronouns: 'they/them',
        tshirt_size: 'M',
        student_email: '',
        student_phone: '',
        student_address: '123 Test St',
        student_city: 'Testville',
        student_state: 'CO',
        student_zip: '80000',
        school: 'Test School',
        emergency_contacts: [],
        authorized_pick_up_contacts: [],
        guardians: [],
        allergies: '',
        medications: [],
        weightPounds: 80,
        heightFeet: 4,
        heightInches: 6,
        has_life_threatening_allergies: false,
        authorized_to_administer_meds: true,
        medical_notes: '',
        insurance_company: 'Test Insurance',
        insurance_id: 'INS-001',
        does_not_have_insurance: false,
        doctor: 'Dr. Test',
        doctor_phone: '555-0300',
        parent_notes: '',
        // ISO string field read by _doesStudentInfoRequireReview. >2yr => stale.
        last_reviewed_student_info_timestamp: threeYearsAgo.toISOString(),
    });

    return SEED.existingStudentId;
}

/**
 * Seed a completed ('enrolled') enrollment for `uid` on the free class. Used to
 * drive the addendum flow and to satisfy getCurrentUserCompletedEnrollments
 * (e.g. so a stale student is recognized as previously enrolled).
 */
export async function seedExistingEnrollment(uid: string): Promise<string> {
    const oldTimestamp = new Date();
    oldTimestamp.setFullYear(oldTimestamp.getFullYear() - 3);

    return addFirestoreDoc('enrollment', {
        userId: uid,
        studentName: SEED.existingStudentName,
        studentId: SEED.existingStudentId,
        contactEmail: 'parent@e2e.test',
        finalCost: 0,
        discountIds: [],
        discounts: [],
        classes: [{ id: SEED.freeClassId, semesterId: SEED.semesterId }],
        additionalOptionIdsByClassId: {},
        status: 'enrolled',
        transactionId: '',
        releaseSignatures: [],
        timestamp: new FirestoreTimestamp(oldTimestamp),
    });
}

/**
 * Create an Auth-emulator user and return {uid, idToken, email}. Thin wrapper
 * over createTestUser so specs only import from seed.ts.
 */
export async function createUser(
    email: string,
    password: string
): Promise<TestUser> {
    return createTestUser(email, password);
}

/** Seed an admins doc so `uid` passes admin-only function role checks. */
export async function seedAdmin(user: TestUser): Promise<void> {
    await setFirestoreDoc('admins', user.uid, {
        userId: user.uid,
        email: user.email,
    });
}

/** Convenience: a student reference for building roster fixtures. */
export function studentRef(studentId: string): FirestoreRef {
    return new FirestoreRef(`students/${studentId}`);
}

// ─── Addendum enrollment id handoff (global-setup -> spec) ───────────────────
//
// seedExistingEnrollment() generates an auto-id we can't know statically, and
// the addendum route needs it (/classes/enrollment/addendum/:enrollmentId).
// global-setup writes it to a gitignored file under test-results/ which the
// addendum spec reads back, keeping the id out of source while still shared.

const ADDENDUM_ID_FILE = join(
    __dirname,
    '..',
    '..',
    'test-results',
    'addendum-enrollment-id.txt'
);

export function writeAddendumEnrollmentId(id: string): void {
    mkdirSync(dirname(ADDENDUM_ID_FILE), { recursive: true });
    writeFileSync(ADDENDUM_ID_FILE, id, 'utf8');
}

export function readAddendumEnrollmentId(): string {
    return readFileSync(ADDENDUM_ID_FILE, 'utf8').trim();
}
