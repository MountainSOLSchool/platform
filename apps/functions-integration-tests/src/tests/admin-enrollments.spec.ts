import {
    createTestUser,
    clearAuthEmulator,
    clearFirestoreEmulator,
    setFirestoreDoc,
    callFunction,
    FirestoreTimestamp,
} from '../utils';
import type { TestUser } from '../utils';
import { ADMIN_USER, NON_ADMIN_USER } from '../fixtures';
import type { SemesterEnrollment } from '@sol/classes/domain';

const SEMESTER_ID = 'test-semester-admin-enrollments';

const futureDate = new Date();
futureDate.setFullYear(futureDate.getFullYear() + 1);

const pastDate = new Date();
pastDate.setFullYear(pastDate.getFullYear() - 1);

function makeClassDoc(overrides: Record<string, unknown> = {}) {
    return {
        name: 'Test Class',
        description: 'A test class',
        live: true,
        cost: 100,
        location: 'Room A',
        weekday: 'Monday',
        daily_times: '9:00 AM - 12:00 PM',
        class_type: 'Standard',
        grade_range_start: 1,
        grade_range_end: 5,
        thumbnailUrl: '',
        paused_for_enrollment: false,
        for_information_only: false,
        max_student_size: 12,
        min_student_size: 5,
        instructors: [],
        students: [],
        start: new FirestoreTimestamp(pastDate),
        end: new FirestoreTimestamp(futureDate),
        registration_end_date: new FirestoreTimestamp(futureDate),
        ...overrides,
    };
}

function makeEnrollmentDoc(
    userId: string,
    overrides: Record<string, unknown> = {}
) {
    return {
        userId,
        studentName: 'Test Student',
        contactEmail: 'parent@test.com',
        studentId: 'student-1',
        finalCost: 100,
        discountIds: [],
        discounts: [],
        classes: [{ id: 'class-1', semesterId: SEMESTER_ID }],
        additionalOptionIdsByClassId: {},
        status: 'enrolled',
        transactionId: 'emulator-mock-txn',
        timestamp: new FirestoreTimestamp(new Date()),
        ...overrides,
    };
}

function findEnrollment(
    data: SemesterEnrollment[] | undefined,
    id: string
): SemesterEnrollment | undefined {
    return data?.find((e) => e.id === id);
}

describe('Admin Enrollments', () => {
    let adminUser: TestUser;
    let nonAdminUser: TestUser;

    beforeAll(async () => {
        await clearAuthEmulator();
        await clearFirestoreEmulator();

        adminUser = await createTestUser(ADMIN_USER.email, ADMIN_USER.password);
        nonAdminUser = await createTestUser(
            NON_ADMIN_USER.email,
            NON_ADMIN_USER.password
        );

        await setFirestoreDoc('admins', adminUser.uid, {
            userId: adminUser.uid,
            email: adminUser.email,
        });
    });

    beforeEach(async () => {
        await clearFirestoreEmulator();
        await setFirestoreDoc('admins', adminUser.uid, {
            userId: adminUser.uid,
            email: adminUser.email,
        });
    });

    afterAll(async () => {
        await clearAuthEmulator();
        await clearFirestoreEmulator();
    });

    describe('Auth guard', () => {
        it('should reject unauthenticated requests', async () => {
            const result = await callFunction<void, SemesterEnrollment[]>({
                functionName: 'adminEnrollments',
            });
            expect(result.status).toBe(403);
        });

        // Regression: the shared Functions.handle wrapper must await the role
        // check before running the handler. Otherwise a non-admin races to a
        // 200 with real enrollment data before the 403 is sent.
        it('should reject non-admin users without leaking data', async () => {
            await setFirestoreDoc(
                'enrollment',
                'leak-check',
                makeEnrollmentDoc(nonAdminUser.uid)
            );

            const result = await callFunction<void, SemesterEnrollment[]>({
                functionName: 'adminEnrollments',
                idToken: nonAdminUser.idToken,
            });

            expect(result.status).toBe(403);
            expect(result.data).toBeUndefined();
        });
    });

    describe('Class name resolution', () => {
        it('should resolve class titles for an enrollment', async () => {
            await setFirestoreDoc(
                `semesters/${SEMESTER_ID}/classes`,
                'class-1',
                makeClassDoc({ name: 'Rock Climbing' })
            );

            await setFirestoreDoc(
                'enrollment',
                'single-class',
                makeEnrollmentDoc(nonAdminUser.uid)
            );

            const result = await callFunction<void, SemesterEnrollment[]>({
                functionName: 'adminEnrollments',
                idToken: adminUser.idToken,
            });

            expect(result.status).toBe(200);
            const enrollment = findEnrollment(result.data, 'single-class');
            expect(enrollment?.classNames).toEqual(['Rock Climbing']);
        });

        // Ben's scenario: two same-cost classes are indistinguishable by
        // amount alone, so the admin needs the class names to tell them apart.
        it('should distinguish multiple same-cost classes by name', async () => {
            await Promise.all([
                setFirestoreDoc(
                    `semesters/${SEMESTER_ID}/classes`,
                    'climb',
                    makeClassDoc({ name: 'Rock Climbing', cost: 200 })
                ),
                setFirestoreDoc(
                    `semesters/${SEMESTER_ID}/classes`,
                    'kayak',
                    makeClassDoc({ name: 'Kayaking', cost: 200 })
                ),
            ]);

            await setFirestoreDoc(
                'enrollment',
                'multi-class',
                makeEnrollmentDoc(nonAdminUser.uid, {
                    finalCost: 400,
                    classes: [
                        { id: 'climb', semesterId: SEMESTER_ID },
                        { id: 'kayak', semesterId: SEMESTER_ID },
                    ],
                })
            );

            const result = await callFunction<void, SemesterEnrollment[]>({
                functionName: 'adminEnrollments',
                idToken: adminUser.idToken,
            });

            expect(result.status).toBe(200);
            const enrollment = findEnrollment(result.data, 'multi-class');
            expect(enrollment?.classNames).toEqual(
                expect.arrayContaining(['Rock Climbing', 'Kayaking'])
            );
            expect(enrollment?.classNames).toHaveLength(2);
        });

        // Regression: legacy records store the deprecated `classIds` array and
        // no `classes` field. The repository still sets a `classes` key (value
        // undefined), so a naive `'classes' in enrollment` check returned
        // undefined and crashed the whole endpoint with a 500.
        it('should not 500 on a legacy classIds-only enrollment', async () => {
            await setFirestoreDoc('enrollment', 'legacy-classids', {
                userId: nonAdminUser.uid,
                studentName: 'Legacy Student',
                contactEmail: 'parent@test.com',
                studentId: 'student-legacy',
                finalCost: 100,
                discountIds: [],
                discounts: [],
                classIds: ['legacy-class-a', 'legacy-class-b'],
                additionalOptionIdsByClassId: {},
                status: 'enrolled',
                transactionId: 'emulator-mock-txn',
                timestamp: new FirestoreTimestamp(new Date()),
            });

            const result = await callFunction<void, SemesterEnrollment[]>({
                functionName: 'adminEnrollments',
                idToken: adminUser.idToken,
            });

            expect(result.status).toBe(200);
            const enrollment = findEnrollment(result.data, 'legacy-classids');
            expect(enrollment?.classNames).toEqual([
                'legacy-class-a',
                'legacy-class-b',
            ]);
        });

        it('should fall back to the class id when a class is missing', async () => {
            await setFirestoreDoc(
                'enrollment',
                'orphan-class',
                makeEnrollmentDoc(nonAdminUser.uid, {
                    classes: [{ id: 'deleted-class', semesterId: SEMESTER_ID }],
                })
            );

            const result = await callFunction<void, SemesterEnrollment[]>({
                functionName: 'adminEnrollments',
                idToken: adminUser.idToken,
            });

            expect(result.status).toBe(200);
            const enrollment = findEnrollment(result.data, 'orphan-class');
            expect(enrollment?.classNames).toEqual(['deleted-class']);
        });
    });
});
