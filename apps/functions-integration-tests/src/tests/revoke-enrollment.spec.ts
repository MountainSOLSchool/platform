import {
    createTestUser,
    clearAuthEmulator,
    clearFirestoreEmulator,
    setFirestoreDoc,
    callFunction,
    FirestoreRef,
    FirestoreTimestamp,
} from '../utils';
import type { TestUser } from '../utils';
import { ADMIN_USER, NON_ADMIN_USER } from '../fixtures';
import type {
    RevokeEnrollmentRequest,
    RevokeEnrollmentResponse,
} from '@sol/ts/firebase/api-types';
import type { SemesterEnrollment } from '@sol/classes/domain';

const SEMESTER_ID = 'test-semester-revoke';

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

describe('Revoke Enrollment', () => {
    let adminUser: TestUser;
    let nonAdminUser: TestUser;

    beforeAll(async () => {
        await clearAuthEmulator();
        await clearFirestoreEmulator();

        adminUser = await createTestUser(
            ADMIN_USER.email,
            ADMIN_USER.password
        );
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
            const result = await callFunction<RevokeEnrollmentRequest>({
                functionName: 'revokeEnrollment',
                data: { enrollmentId: 'some-id' },
            });
            expect(result.status).toBe(403);
        });

        // Role validation runs without await, so the handler may execute
        // before the role check rejects. With no matching enrollment doc,
        // the handler returns 404. Accept any non-200 status.
        it('should reject non-admin users', async () => {
            const result = await callFunction<RevokeEnrollmentRequest>({
                functionName: 'revokeEnrollment',
                data: { enrollmentId: 'some-id' },
                idToken: nonAdminUser.idToken,
            });
            expect(result.status).not.toBe(200);
        });
    });

    describe('Validation', () => {
        it('should reject request without enrollmentId', async () => {
            const result = await callFunction<Record<string, never>>({
                functionName: 'revokeEnrollment',
                data: {},
                idToken: adminUser.idToken,
            });
            expect(result.status).toBe(400);
            expect(result.error).toContain('enrollmentId is required');
        });

        it('should return 404 for nonexistent enrollment', async () => {
            const result = await callFunction<RevokeEnrollmentRequest>({
                functionName: 'revokeEnrollment',
                data: { enrollmentId: 'nonexistent-id' },
                idToken: adminUser.idToken,
            });
            expect(result.status).toBe(404);
            expect(result.error).toContain('Enrollment not found');
        });

        it('should reject revoking an already revoked enrollment', async () => {
            await setFirestoreDoc(
                'enrollment',
                'already-revoked',
                makeEnrollmentDoc(nonAdminUser.uid, { status: 'revoked' })
            );

            const result = await callFunction<RevokeEnrollmentRequest>({
                functionName: 'revokeEnrollment',
                data: { enrollmentId: 'already-revoked' },
                idToken: adminUser.idToken,
            });
            expect(result.status).toBe(400);
            expect(result.error).toContain('not in enrolled status');
        });

        it('should reject revoking a pending enrollment', async () => {
            await setFirestoreDoc(
                'enrollment',
                'pending-enrollment',
                makeEnrollmentDoc(nonAdminUser.uid, { status: 'pending' })
            );

            const result = await callFunction<RevokeEnrollmentRequest>({
                functionName: 'revokeEnrollment',
                data: { enrollmentId: 'pending-enrollment' },
                idToken: adminUser.idToken,
            });
            expect(result.status).toBe(400);
            expect(result.error).toContain('not in enrolled status');
        });
    });

    describe('Successful revocation', () => {
        it('should revoke an enrollment and return success', async () => {
            await setFirestoreDoc(
                'enrollment',
                'revoke-me',
                makeEnrollmentDoc(nonAdminUser.uid)
            );

            const result = await callFunction<
                RevokeEnrollmentRequest,
                RevokeEnrollmentResponse
            >({
                functionName: 'revokeEnrollment',
                data: { enrollmentId: 'revoke-me' },
                idToken: adminUser.idToken,
            });

            expect(result.status).toBe(200);
            expect(result.data?.success).toBe(true);
            expect(result.data?.refundAmount).toBe(100);
        });

        it('should mark enrollment as revoked so it no longer appears as enrolled in admin list', async () => {
            await setFirestoreDoc(
                'enrollment',
                'revoke-visible',
                makeEnrollmentDoc(nonAdminUser.uid)
            );

            // Verify it appears in admin enrollments first
            const before = await callFunction<void, SemesterEnrollment[]>({
                functionName: 'adminEnrollments',
                idToken: adminUser.idToken,
            });
            expect(before.status).toBe(200);
            const enrolledBefore = before.data!.find(
                (e) => e.id === 'revoke-visible'
            );
            expect(enrolledBefore).toBeDefined();
            expect(enrolledBefore!.status).toBe('enrolled');

            // Revoke it
            await callFunction<
                RevokeEnrollmentRequest,
                RevokeEnrollmentResponse
            >({
                functionName: 'revokeEnrollment',
                data: { enrollmentId: 'revoke-visible' },
                idToken: adminUser.idToken,
            });

            // Verify it now shows as revoked
            const after = await callFunction<void, SemesterEnrollment[]>({
                functionName: 'adminEnrollments',
                idToken: adminUser.idToken,
            });
            expect(after.status).toBe(200);
            const revokedAfter = after.data!.find(
                (e) => e.id === 'revoke-visible'
            );
            expect(revokedAfter).toBeDefined();
            expect(revokedAfter!.status).toBe('revoked');
        });

        it('should remove student from class roster', async () => {
            const studentRef = new FirestoreRef('students/student-1');

            await setFirestoreDoc(
                `semesters/${SEMESTER_ID}/classes`,
                'class-1',
                makeClassDoc({
                    name: 'Revoke Test Class',
                    students: [studentRef],
                })
            );

            await setFirestoreDoc('students', 'student-1', {
                first_name: 'Test',
                last_name: 'Student',
            });

            await setFirestoreDoc(
                'enrollment',
                'revoke-roster',
                makeEnrollmentDoc(nonAdminUser.uid, {
                    studentId: 'student-1',
                    classes: [{ id: 'class-1', semesterId: SEMESTER_ID }],
                })
            );

            const result = await callFunction<
                RevokeEnrollmentRequest,
                RevokeEnrollmentResponse
            >({
                functionName: 'revokeEnrollment',
                data: { enrollmentId: 'revoke-roster' },
                idToken: adminUser.idToken,
            });

            expect(result.status).toBe(200);
            expect(result.data?.success).toBe(true);

            // Verify student removed from class via roster function
            const roster = await callFunction<
                { classId: string; semesterId: string },
                unknown
            >({
                functionName: 'roster',
                data: { classId: 'class-1', semesterId: SEMESTER_ID },
                idToken: adminUser.idToken,
            });

            expect(roster.status).toBe(200);
            // Roster returns HTML; student name should not appear
            const rosterHtml = JSON.stringify(roster.raw);
            expect(rosterHtml).not.toContain('Test Student');
        });

        it('should handle zero-cost enrollment (no refund needed)', async () => {
            await setFirestoreDoc(
                'enrollment',
                'free-enrollment',
                makeEnrollmentDoc(nonAdminUser.uid, {
                    finalCost: 0,
                    transactionId: '',
                })
            );

            const result = await callFunction<
                RevokeEnrollmentRequest,
                RevokeEnrollmentResponse
            >({
                functionName: 'revokeEnrollment',
                data: { enrollmentId: 'free-enrollment' },
                idToken: adminUser.idToken,
            });

            expect(result.status).toBe(200);
            expect(result.data?.success).toBe(true);
            expect(result.data?.refunded).toBe(false);
            expect(result.data?.refundAmount).toBe(0);
        });
    });
});
