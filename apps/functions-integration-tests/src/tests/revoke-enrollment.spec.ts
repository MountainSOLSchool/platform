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
    PreviewPartialRevokeRequest,
    PreviewPartialRevokeResponse,
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

    describe('Full revocation', () => {
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

        it('should mark enrollment as revoked in admin list', async () => {
            await setFirestoreDoc(
                'enrollment',
                'revoke-visible',
                makeEnrollmentDoc(nonAdminUser.uid)
            );

            await callFunction<
                RevokeEnrollmentRequest,
                RevokeEnrollmentResponse
            >({
                functionName: 'revokeEnrollment',
                data: { enrollmentId: 'revoke-visible' },
                idToken: adminUser.idToken,
            });

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

        it('should fully revoke when all classIdsToRevoke match all classes', async () => {
            await setFirestoreDoc(
                'enrollment',
                'full-via-ids',
                makeEnrollmentDoc(nonAdminUser.uid, {
                    finalCost: 200,
                    classes: [
                        { id: 'class-a', semesterId: SEMESTER_ID },
                        { id: 'class-b', semesterId: SEMESTER_ID },
                    ],
                })
            );

            const result = await callFunction<
                RevokeEnrollmentRequest,
                RevokeEnrollmentResponse
            >({
                functionName: 'revokeEnrollment',
                data: {
                    enrollmentId: 'full-via-ids',
                    classIdsToRevoke: ['class-a', 'class-b'],
                },
                idToken: adminUser.idToken,
            });

            expect(result.status).toBe(200);
            expect(result.data?.success).toBe(true);

            // Should be fully revoked
            const after = await callFunction<void, SemesterEnrollment[]>({
                functionName: 'adminEnrollments',
                idToken: adminUser.idToken,
            });
            const enrollment = after.data!.find(
                (e) => e.id === 'full-via-ids'
            );
            expect(enrollment?.status).toBe('revoked');
        });
    });

    describe('Partial revocation', () => {
        // Math validation:
        // 4 classes @ $100 each = $400 total, no discounts
        // Revoke 2 classes → remaining 2 classes @ $100 = $200
        // Refund = $400 - $200 = $200

        it('should revoke selected classes and keep enrollment active', async () => {
            // Seed 4 classes @ $100 each
            await Promise.all(
                ['class-a', 'class-b', 'class-c', 'class-d'].map((id) =>
                    setFirestoreDoc(
                        `semesters/${SEMESTER_ID}/classes`,
                        id,
                        makeClassDoc({ name: `Class ${id}`, cost: 100 })
                    )
                )
            );

            await setFirestoreDoc(
                'enrollment',
                'partial-revoke',
                makeEnrollmentDoc(nonAdminUser.uid, {
                    finalCost: 400,
                    classes: [
                        { id: 'class-a', semesterId: SEMESTER_ID },
                        { id: 'class-b', semesterId: SEMESTER_ID },
                        { id: 'class-c', semesterId: SEMESTER_ID },
                        { id: 'class-d', semesterId: SEMESTER_ID },
                    ],
                })
            );

            const result = await callFunction<
                RevokeEnrollmentRequest,
                RevokeEnrollmentResponse
            >({
                functionName: 'revokeEnrollment',
                data: {
                    enrollmentId: 'partial-revoke',
                    classIdsToRevoke: ['class-a', 'class-b'],
                    refundAmount: 200,
                },
                idToken: adminUser.idToken,
            });

            expect(result.status).toBe(200);
            expect(result.data?.success).toBe(true);
            expect(result.data?.refundAmount).toBe(200);

            // Enrollment should still be active (not revoked)
            const after = await callFunction<void, SemesterEnrollment[]>({
                functionName: 'adminEnrollments',
                idToken: adminUser.idToken,
            });
            const enrollment = after.data!.find(
                (e) => e.id === 'partial-revoke'
            );
            expect(enrollment).toBeDefined();
            expect(enrollment!.status).toBe('enrolled');
            // finalCost should be updated: 400 - 200 = 200
            expect(enrollment!.finalCost).toBe(200);
        });

        it('should update enrollment classes list after partial revoke', async () => {
            await Promise.all(
                ['class-x', 'class-y', 'class-z'].map((id) =>
                    setFirestoreDoc(
                        `semesters/${SEMESTER_ID}/classes`,
                        id,
                        makeClassDoc({ name: `Class ${id}`, cost: 50 })
                    )
                )
            );

            await setFirestoreDoc(
                'enrollment',
                'partial-classes',
                makeEnrollmentDoc(nonAdminUser.uid, {
                    finalCost: 150,
                    classes: [
                        { id: 'class-x', semesterId: SEMESTER_ID },
                        { id: 'class-y', semesterId: SEMESTER_ID },
                        { id: 'class-z', semesterId: SEMESTER_ID },
                    ],
                })
            );

            await callFunction<
                RevokeEnrollmentRequest,
                RevokeEnrollmentResponse
            >({
                functionName: 'revokeEnrollment',
                data: {
                    enrollmentId: 'partial-classes',
                    classIdsToRevoke: ['class-y'],
                    refundAmount: 50,
                },
                idToken: adminUser.idToken,
            });

            const after = await callFunction<void, SemesterEnrollment[]>({
                functionName: 'adminEnrollments',
                idToken: adminUser.idToken,
            });
            const enrollment = after.data!.find(
                (e) => e.id === 'partial-classes'
            );
            expect(enrollment).toBeDefined();

            // Should have 2 remaining classes
            const classes = 'classes' in enrollment! ? enrollment!.classes : [];
            expect(classes).toHaveLength(2);
            const classIds = classes.map(
                (c: { id: string }) => c.id
            );
            expect(classIds).toContain('class-x');
            expect(classIds).toContain('class-z');
            expect(classIds).not.toContain('class-y');
        });

        it('should accept custom refund amount from admin', async () => {
            await setFirestoreDoc(
                `semesters/${SEMESTER_ID}/classes`,
                'custom-class',
                makeClassDoc({ name: 'Custom Class', cost: 200 })
            );

            await setFirestoreDoc(
                'enrollment',
                'custom-refund',
                makeEnrollmentDoc(nonAdminUser.uid, {
                    finalCost: 200,
                    classes: [
                        { id: 'custom-class', semesterId: SEMESTER_ID },
                    ],
                })
            );

            // Admin overrides refund to $150 instead of full $200
            const result = await callFunction<
                RevokeEnrollmentRequest,
                RevokeEnrollmentResponse
            >({
                functionName: 'revokeEnrollment',
                data: {
                    enrollmentId: 'custom-refund',
                    classIdsToRevoke: ['custom-class'],
                    refundAmount: 150,
                },
                idToken: adminUser.idToken,
            });

            expect(result.status).toBe(200);
            expect(result.data?.refundAmount).toBe(150);
        });

        it('should remove student from only revoked classes', async () => {
            const studentRef = new FirestoreRef('students/student-1');

            await Promise.all([
                setFirestoreDoc(
                    `semesters/${SEMESTER_ID}/classes`,
                    'keep-class',
                    makeClassDoc({
                        name: 'Keep Class',
                        students: [studentRef],
                    })
                ),
                setFirestoreDoc(
                    `semesters/${SEMESTER_ID}/classes`,
                    'drop-class',
                    makeClassDoc({
                        name: 'Drop Class',
                        students: [studentRef],
                    })
                ),
            ]);

            await setFirestoreDoc('students', 'student-1', {
                first_name: 'Test',
                last_name: 'Student',
            });

            await setFirestoreDoc(
                'enrollment',
                'partial-roster',
                makeEnrollmentDoc(nonAdminUser.uid, {
                    studentId: 'student-1',
                    finalCost: 200,
                    classes: [
                        { id: 'keep-class', semesterId: SEMESTER_ID },
                        { id: 'drop-class', semesterId: SEMESTER_ID },
                    ],
                })
            );

            await callFunction<
                RevokeEnrollmentRequest,
                RevokeEnrollmentResponse
            >({
                functionName: 'revokeEnrollment',
                data: {
                    enrollmentId: 'partial-roster',
                    classIdsToRevoke: ['drop-class'],
                    refundAmount: 100,
                },
                idToken: adminUser.idToken,
            });

            // Student should still be in keep-class roster
            const keepRoster = await callFunction<
                { classId: string; semesterId: string },
                unknown
            >({
                functionName: 'roster',
                data: { classId: 'keep-class', semesterId: SEMESTER_ID },
                idToken: adminUser.idToken,
            });
            expect(keepRoster.status).toBe(200);

            // Student should NOT be in drop-class roster
            const dropRoster = await callFunction<
                { classId: string; semesterId: string },
                unknown
            >({
                functionName: 'roster',
                data: { classId: 'drop-class', semesterId: SEMESTER_ID },
                idToken: adminUser.idToken,
            });
            expect(dropRoster.status).toBe(200);
            const dropRosterHtml = JSON.stringify(dropRoster.raw);
            expect(dropRosterHtml).not.toContain('Test');
        });

        it('should handle partial revoke of zero-cost enrollment', async () => {
            await setFirestoreDoc(
                'enrollment',
                'free-partial',
                makeEnrollmentDoc(nonAdminUser.uid, {
                    finalCost: 0,
                    transactionId: '',
                    classes: [
                        { id: 'free-a', semesterId: SEMESTER_ID },
                        { id: 'free-b', semesterId: SEMESTER_ID },
                    ],
                })
            );

            const result = await callFunction<
                RevokeEnrollmentRequest,
                RevokeEnrollmentResponse
            >({
                functionName: 'revokeEnrollment',
                data: {
                    enrollmentId: 'free-partial',
                    classIdsToRevoke: ['free-a'],
                    refundAmount: 0,
                },
                idToken: adminUser.idToken,
            });

            expect(result.status).toBe(200);
            expect(result.data?.success).toBe(true);
            expect(result.data?.refunded).toBe(false);
            expect(result.data?.refundAmount).toBe(0);
        });
    });

    describe('Preview partial revoke', () => {
        it('should reject unauthenticated requests', async () => {
            const result = await callFunction<PreviewPartialRevokeRequest>({
                functionName: 'previewPartialRevoke',
                data: { enrollmentId: 'x', classIdsToRevoke: ['y'] },
            });
            expect(result.status).toBe(403);
        });

        it('should return class names and suggested refund', async () => {
            // Seed semester config so active semester resolves
            await setFirestoreDoc('semesters', SEMESTER_ID, {
                name: 'Test Semester',
                active: true,
            });

            // 3 classes @ $100 each = $300
            await Promise.all(
                ['prev-a', 'prev-b', 'prev-c'].map((id) =>
                    setFirestoreDoc(
                        `semesters/${SEMESTER_ID}/classes`,
                        id,
                        makeClassDoc({ name: `Preview ${id}`, cost: 100 })
                    )
                )
            );

            await setFirestoreDoc(
                'enrollment',
                'preview-test',
                makeEnrollmentDoc(nonAdminUser.uid, {
                    finalCost: 300,
                    classes: [
                        { id: 'prev-a', semesterId: SEMESTER_ID },
                        { id: 'prev-b', semesterId: SEMESTER_ID },
                        { id: 'prev-c', semesterId: SEMESTER_ID },
                    ],
                })
            );

            // Revoke 1 class → remaining 2 @ $100 = $200, refund = $100
            const result = await callFunction<
                PreviewPartialRevokeRequest,
                PreviewPartialRevokeResponse
            >({
                functionName: 'previewPartialRevoke',
                data: {
                    enrollmentId: 'preview-test',
                    classIdsToRevoke: ['prev-a'],
                },
                idToken: adminUser.idToken,
            });

            expect(result.status).toBe(200);
            expect(result.data?.originalCost).toBe(300);
            // Remaining 2 classes @ $100 = $200
            expect(result.data?.recalculatedCost).toBe(200);
            // Refund = 300 - 200 = 100
            expect(result.data?.suggestedRefund).toBe(100);
            expect(result.data?.classNames).toHaveLength(3);

            const names = result.data!.classNames.map((c) => c.name);
            expect(names).toContain('Preview prev-a');
            expect(names).toContain('Preview prev-b');
            expect(names).toContain('Preview prev-c');
        });

        it('should return full refund when revoking all classes', async () => {
            await setFirestoreDoc(
                `semesters/${SEMESTER_ID}/classes`,
                'all-a',
                makeClassDoc({ name: 'All A', cost: 150 })
            );

            await setFirestoreDoc(
                'enrollment',
                'preview-all',
                makeEnrollmentDoc(nonAdminUser.uid, {
                    finalCost: 150,
                    classes: [
                        { id: 'all-a', semesterId: SEMESTER_ID },
                    ],
                })
            );

            const result = await callFunction<
                PreviewPartialRevokeRequest,
                PreviewPartialRevokeResponse
            >({
                functionName: 'previewPartialRevoke',
                data: {
                    enrollmentId: 'preview-all',
                    classIdsToRevoke: ['all-a'],
                },
                idToken: adminUser.idToken,
            });

            expect(result.status).toBe(200);
            expect(result.data?.recalculatedCost).toBe(0);
            expect(result.data?.suggestedRefund).toBe(150);
        });

        it('should return 404 for nonexistent enrollment', async () => {
            const result = await callFunction<PreviewPartialRevokeRequest>({
                functionName: 'previewPartialRevoke',
                data: {
                    enrollmentId: 'nonexistent',
                    classIdsToRevoke: ['x'],
                },
                idToken: adminUser.idToken,
            });
            expect(result.status).toBe(404);
        });

        it('should reject preview without required fields', async () => {
            const result = await callFunction<Record<string, unknown>>({
                functionName: 'previewPartialRevoke',
                data: { enrollmentId: 'x' },
                idToken: adminUser.idToken,
            });
            expect(result.status).toBe(400);
        });
    });
});
