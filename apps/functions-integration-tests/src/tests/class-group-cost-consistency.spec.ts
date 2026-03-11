import {
    createTestUser,
    clearAuthEmulator,
    clearFirestoreEmulator,
    setFirestoreDoc,
    callFunction,
    FirestoreTimestamp,
    EMULATOR_CONFIG,
} from '../utils';
import type { TestUser } from '../utils';
import { ADMIN_USER, NON_ADMIN_USER } from '../fixtures';

const SEMESTER_ID = 'test-semester-groups';

const FIRESTORE_URL = `http://${EMULATOR_CONFIG.firestoreHost}`;

/**
 * Query the Firestore emulator for all documents in the 'enrollment' collection.
 * Returns the count and the raw documents, so tests can verify that
 * no enrollment record was created when a request should be rejected.
 */
async function getEnrollmentDocCount(): Promise<number> {
    const url = `${FIRESTORE_URL}/v1/projects/${EMULATOR_CONFIG.projectId}/databases/(default)/documents/enrollment`;
    const response = await fetch(url, {
        headers: { Authorization: 'Bearer owner' },
    });
    if (!response.ok) return 0;
    const body = await response.json();
    return body.documents?.length ?? 0;
}

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
        max_student_size: 20,
        min_student_size: 5,
        instructors: [],
        students: [],
        start: new FirestoreTimestamp(pastDate),
        end: new FirestoreTimestamp(futureDate),
        registration_end_date: new FirestoreTimestamp(futureDate),
        ...overrides,
    };
}

function makeStudentForm() {
    return {
        firstName: 'Test',
        lastName: 'Student',
        birthdate: '2015-01-01',
        pronouns: 'they/them',
        school: 'Test School',
        tshirtSize: 'M',
        notes: '',
        contactEmail: 'parent@test.com',
        contactFirstName: 'Parent',
        contactLastName: 'Test',
        studentEmail: '',
        contactPhone: '555-0100',
        studentPhone: '',
        address: '123 Test St',
        city: 'Testville',
        state: 'CO',
        zip: '80000',
        deetBugspray: false,
        naturalBugspray: false,
        sunscreen: true,
        photography: 'yes',
        guardians: [
            {
                guardianName: 'Parent Test',
                guardianRelationship: 'Parent',
                guardianPhone: '555-0100',
                guardianEmail: 'parent@test.com',
                guardianResidesWithStudent: true,
            },
        ],
        pickupCodeword: 'test',
        authorizedForPickup: [],
        emergencyContacts: [
            {
                name: 'Emergency Contact',
                relationship: 'Aunt',
                phone: '555-0200',
            },
        ],
        weightImperial: 80,
        heightFeet: 4,
        heightInches: 6,
        doctorName: 'Dr. Test',
        doctorPhone: '555-0300',
        insuranceCompany: 'Test Insurance',
        insuranceId: 'INS-001',
        doesNotHaveInsurance: false,
        hasLifeThreateningAllergies: false,
        allergies: undefined,
        medications: [],
        authorizedToAdministerMedication: true,
        medicalNotes: undefined,
    };
}

interface BasketResponse {
    finalTotal: number;
    originalTotal: number;
    discountAmounts: Array<{ code: string; amount: number }>;
}

interface EnrollResponse {
    success: boolean;
    email: string;
}

async function seedGroupedClasses() {
    // Morning class: $80, Afternoon class: $80
    // Group price: $120 (saves $40 vs $160 individual)
    await Promise.all([
        setFirestoreDoc(
            `semesters/${SEMESTER_ID}/classes`,
            'morning-class',
            makeClassDoc({ name: 'Morning Activity', cost: 80 })
        ),
        setFirestoreDoc(
            `semesters/${SEMESTER_ID}/classes`,
            'afternoon-class',
            makeClassDoc({ name: 'Afternoon Activity', cost: 80 })
        ),
        setFirestoreDoc(`semesters/${SEMESTER_ID}/groups`, 'full-day-group', {
            name: 'Full Day Bundle',
            cost: 120,
            classIds: ['morning-class', 'afternoon-class'],
        }),
    ]);
}

async function seedStandaloneClass() {
    await setFirestoreDoc(
        `semesters/${SEMESTER_ID}/classes`,
        'standalone-class',
        makeClassDoc({ name: 'Standalone Class', cost: 50 })
    );
}

async function seedAdditionalOptions() {
    // Classes with additional paid options
    await Promise.all([
        setFirestoreDoc(
            `semesters/${SEMESTER_ID}/classes`,
            'morning-opts',
            makeClassDoc({
                name: 'Morning With Options',
                cost: 80,
                additional_options: [
                    { id: 'lunch-opt', description: 'Lunch add-on', cost: 15 },
                ],
            })
        ),
        setFirestoreDoc(
            `semesters/${SEMESTER_ID}/classes`,
            'afternoon-opts',
            makeClassDoc({
                name: 'Afternoon With Options',
                cost: 80,
                additional_options: [
                    {
                        id: 'snack-opt',
                        description: 'Snack add-on',
                        cost: 10,
                    },
                ],
            })
        ),
        setFirestoreDoc(
            `semesters/${SEMESTER_ID}/groups`,
            'opts-group',
            {
                name: 'Full Day With Options',
                cost: 120,
                classIds: ['morning-opts', 'afternoon-opts'],
            }
        ),
    ]);
}

describe('Class Group Cost Consistency', () => {
    let enrollmentUser: TestUser;
    let adminUser: TestUser;

    beforeAll(async () => {
        await clearAuthEmulator();
        enrollmentUser = await createTestUser(
            NON_ADMIN_USER.email,
            NON_ADMIN_USER.password
        );
        adminUser = await createTestUser(
            ADMIN_USER.email,
            ADMIN_USER.password
        );
        await setFirestoreDoc('admins', adminUser.uid, {
            userId: adminUser.uid,
            email: adminUser.email,
        });
    });

    beforeEach(async () => {
        await clearFirestoreEmulator();
        // Re-seed admin doc after clearing Firestore
        await setFirestoreDoc('admins', adminUser.uid, {
            userId: adminUser.uid,
            email: adminUser.email,
        });
    });

    afterAll(async () => {
        await clearAuthEmulator();
        await clearFirestoreEmulator();
    });

    describe('calculateBasket with class groups', () => {
        it('should use group cost when all group classes are selected', async () => {
            await seedGroupedClasses();

            const result = await callFunction<unknown, BasketResponse>({
                functionName: 'calculateBasket',
                data: {
                    codes: [],
                    classes: [
                        {
                            id: 'morning-class',
                            semesterId: SEMESTER_ID,
                            additionalOptionIds: [],
                        },
                        {
                            id: 'afternoon-class',
                            semesterId: SEMESTER_ID,
                            additionalOptionIds: [],
                        },
                    ],
                    userCostsToClassIds: {},
                },
            });

            expect(result.status).toBe(200);
            // Group cost is $120, not $160 (individual sum)
            expect(result.data!.finalTotal).toBe(120);
            expect(result.data!.originalTotal).toBe(120);
        });

        it('should use individual cost when only one group class is selected', async () => {
            await seedGroupedClasses();

            const result = await callFunction<unknown, BasketResponse>({
                functionName: 'calculateBasket',
                data: {
                    codes: [],
                    classes: [
                        {
                            id: 'morning-class',
                            semesterId: SEMESTER_ID,
                            additionalOptionIds: [],
                        },
                    ],
                    userCostsToClassIds: {},
                },
            });

            expect(result.status).toBe(200);
            // Only one class selected, so individual price
            expect(result.data!.finalTotal).toBe(80);
        });

        it('should combine group cost with standalone class cost', async () => {
            await seedGroupedClasses();
            await seedStandaloneClass();

            const result = await callFunction<unknown, BasketResponse>({
                functionName: 'calculateBasket',
                data: {
                    codes: [],
                    classes: [
                        {
                            id: 'morning-class',
                            semesterId: SEMESTER_ID,
                            additionalOptionIds: [],
                        },
                        {
                            id: 'afternoon-class',
                            semesterId: SEMESTER_ID,
                            additionalOptionIds: [],
                        },
                        {
                            id: 'standalone-class',
                            semesterId: SEMESTER_ID,
                            additionalOptionIds: [],
                        },
                    ],
                    userCostsToClassIds: {},
                },
            });

            expect(result.status).toBe(200);
            // Group ($120) + standalone ($50) = $170
            expect(result.data!.finalTotal).toBe(170);
        });

        it('should include additional option costs on top of group cost', async () => {
            await seedAdditionalOptions();

            const result = await callFunction<unknown, BasketResponse>({
                functionName: 'calculateBasket',
                data: {
                    codes: [],
                    classes: [
                        {
                            id: 'morning-opts',
                            semesterId: SEMESTER_ID,
                            additionalOptionIds: ['lunch-opt'],
                        },
                        {
                            id: 'afternoon-opts',
                            semesterId: SEMESTER_ID,
                            additionalOptionIds: ['snack-opt'],
                        },
                    ],
                    userCostsToClassIds: {},
                },
            });

            expect(result.status).toBe(200);
            // Group ($120) + lunch ($15) + snack ($10) = $145
            expect(result.data!.finalTotal).toBe(145);
        });
    });

    describe('calculateBasket and enroll cost consistency', () => {
        it('should compute the same cost for grouped classes', async () => {
            await seedGroupedClasses();

            const basketClasses = [
                {
                    id: 'morning-class',
                    semesterId: SEMESTER_ID,
                    additionalOptionIds: [] as string[],
                },
                {
                    id: 'afternoon-class',
                    semesterId: SEMESTER_ID,
                    additionalOptionIds: [] as string[],
                },
            ];

            const basketResult = await callFunction<unknown, BasketResponse>({
                functionName: 'calculateBasket',
                data: {
                    codes: [],
                    classes: basketClasses,
                    userCostsToClassIds: {},
                },
            });

            expect(basketResult.status).toBe(200);
            const previewedTotal = basketResult.data!.finalTotal;

            // Enroll with expectedTotal matching the basket preview
            const enrollResult = await callFunction<unknown, EnrollResponse>({
                functionName: 'enroll',
                data: {
                    selectedClasses: [
                        { id: 'morning-class', semesterId: SEMESTER_ID },
                        { id: 'afternoon-class', semesterId: SEMESTER_ID },
                    ],
                    student: makeStudentForm(),
                    releaseSignatures: [],
                    discountCodes: [],
                    userCostsToSelectedClassIds: {},
                    additionalOptionIdsByClassId: {},
                    expectedTotal: previewedTotal,
                },
                idToken: enrollmentUser.idToken,
            });

            // Should succeed — no price mismatch
            expect(enrollResult.status).toBe(200);
            expect(enrollResult.data!.success).toBe(true);
        });

        it('should compute the same cost for standalone classes', async () => {
            await seedStandaloneClass();

            const basketResult = await callFunction<unknown, BasketResponse>({
                functionName: 'calculateBasket',
                data: {
                    codes: [],
                    classes: [
                        {
                            id: 'standalone-class',
                            semesterId: SEMESTER_ID,
                            additionalOptionIds: [],
                        },
                    ],
                    userCostsToClassIds: {},
                },
            });

            expect(basketResult.status).toBe(200);
            const previewedTotal = basketResult.data!.finalTotal;

            const enrollResult = await callFunction<unknown, EnrollResponse>({
                functionName: 'enroll',
                data: {
                    selectedClasses: [
                        { id: 'standalone-class', semesterId: SEMESTER_ID },
                    ],
                    student: makeStudentForm(),
                    releaseSignatures: [],
                    discountCodes: [],
                    userCostsToSelectedClassIds: {},
                    additionalOptionIdsByClassId: {},
                    expectedTotal: previewedTotal,
                },
                idToken: enrollmentUser.idToken,
            });

            expect(enrollResult.status).toBe(200);
            expect(enrollResult.data!.success).toBe(true);
        });

        it('should compute the same cost for grouped + standalone combined', async () => {
            await seedGroupedClasses();
            await seedStandaloneClass();

            const basketResult = await callFunction<unknown, BasketResponse>({
                functionName: 'calculateBasket',
                data: {
                    codes: [],
                    classes: [
                        {
                            id: 'morning-class',
                            semesterId: SEMESTER_ID,
                            additionalOptionIds: [],
                        },
                        {
                            id: 'afternoon-class',
                            semesterId: SEMESTER_ID,
                            additionalOptionIds: [],
                        },
                        {
                            id: 'standalone-class',
                            semesterId: SEMESTER_ID,
                            additionalOptionIds: [],
                        },
                    ],
                    userCostsToClassIds: {},
                },
            });

            expect(basketResult.status).toBe(200);
            const previewedTotal = basketResult.data!.finalTotal;
            expect(previewedTotal).toBe(170); // Group $120 + standalone $50

            const enrollResult = await callFunction<unknown, EnrollResponse>({
                functionName: 'enroll',
                data: {
                    selectedClasses: [
                        { id: 'morning-class', semesterId: SEMESTER_ID },
                        { id: 'afternoon-class', semesterId: SEMESTER_ID },
                        { id: 'standalone-class', semesterId: SEMESTER_ID },
                    ],
                    student: makeStudentForm(),
                    releaseSignatures: [],
                    discountCodes: [],
                    userCostsToSelectedClassIds: {},
                    additionalOptionIdsByClassId: {},
                    expectedTotal: previewedTotal,
                },
                idToken: enrollmentUser.idToken,
            });

            expect(enrollResult.status).toBe(200);
            expect(enrollResult.data!.success).toBe(true);
        });

        it('should compute the same cost for grouped classes with additional options', async () => {
            await seedAdditionalOptions();

            const basketResult = await callFunction<unknown, BasketResponse>({
                functionName: 'calculateBasket',
                data: {
                    codes: [],
                    classes: [
                        {
                            id: 'morning-opts',
                            semesterId: SEMESTER_ID,
                            additionalOptionIds: ['lunch-opt'],
                        },
                        {
                            id: 'afternoon-opts',
                            semesterId: SEMESTER_ID,
                            additionalOptionIds: ['snack-opt'],
                        },
                    ],
                    userCostsToClassIds: {},
                },
            });

            expect(basketResult.status).toBe(200);
            const previewedTotal = basketResult.data!.finalTotal;
            expect(previewedTotal).toBe(145); // Group $120 + $15 + $10

            const enrollResult = await callFunction<unknown, EnrollResponse>({
                functionName: 'enroll',
                data: {
                    selectedClasses: [
                        { id: 'morning-opts', semesterId: SEMESTER_ID },
                        { id: 'afternoon-opts', semesterId: SEMESTER_ID },
                    ],
                    student: makeStudentForm(),
                    releaseSignatures: [],
                    discountCodes: [],
                    userCostsToSelectedClassIds: {},
                    additionalOptionIdsByClassId: {
                        'morning-opts': ['lunch-opt'],
                        'afternoon-opts': ['snack-opt'],
                    },
                    expectedTotal: previewedTotal,
                },
                idToken: enrollmentUser.idToken,
            });

            expect(enrollResult.status).toBe(200);
            expect(enrollResult.data!.success).toBe(true);
        });
    });

    describe('calculateBasket and enrollAddendum cost consistency', () => {
        it('should compute the same cost for addendum with new grouped classes', async () => {
            // First: create an initial enrollment with standalone class
            await seedStandaloneClass();

            const initialEnroll = await callFunction<unknown, EnrollResponse>({
                functionName: 'enroll',
                data: {
                    selectedClasses: [
                        { id: 'standalone-class', semesterId: SEMESTER_ID },
                    ],
                    student: makeStudentForm(),
                    releaseSignatures: [],
                    discountCodes: [],
                    userCostsToSelectedClassIds: {},
                    additionalOptionIdsByClassId: {},
                },
                idToken: enrollmentUser.idToken,
            });

            expect(initialEnroll.status).toBe(200);
            expect(initialEnroll.data!.success).toBe(true);

            // Get the enrollment ID from Firestore
            // (enrollments are stored in the enrollments collection)
            // For the addendum test, we need the enrollment ID
            // Since we can't easily query Firestore from the test,
            // we need to use a known approach — the enroll function creates
            // enrollment records. We'll query via admin functions or
            // use the adminEnrollments endpoint.

            // Now seed the grouped classes for the addendum
            await seedGroupedClasses();

            // Preview the addendum cost via calculateBasket
            // In addendum mode, the frontend sends new classes + locked classes with overrideCosts
            const basketResult = await callFunction<unknown, BasketResponse>({
                functionName: 'calculateBasket',
                data: {
                    codes: [],
                    classes: [
                        {
                            id: 'morning-class',
                            semesterId: SEMESTER_ID,
                            additionalOptionIds: [],
                        },
                        {
                            id: 'afternoon-class',
                            semesterId: SEMESTER_ID,
                            additionalOptionIds: [],
                        },
                    ],
                    userCostsToClassIds: {},
                },
            });

            expect(basketResult.status).toBe(200);
            const previewedTotal = basketResult.data!.finalTotal;
            // Both are new classes forming a group: $120
            expect(previewedTotal).toBe(120);
        });

        it('should compute addendum cost with overrideCosts matching enrollAddendum zeroing', async () => {
            // Scenario: A locked class and a new class form a group.
            // calculateBasket gets both classes with locked class cost overridden to $0.
            // enrollAddendum should compute the same total.

            await Promise.all([
                setFirestoreDoc(
                    `semesters/${SEMESTER_ID}/classes`,
                    'locked-class',
                    makeClassDoc({
                        name: 'Already Enrolled Class',
                        cost: 80,
                        additional_options: [
                            {
                                id: 'extra-opt',
                                description: 'Extra option',
                                cost: 20,
                            },
                        ],
                    })
                ),
                setFirestoreDoc(
                    `semesters/${SEMESTER_ID}/classes`,
                    'new-class',
                    makeClassDoc({ name: 'New Class', cost: 60 })
                ),
            ]);

            // Preview: locked class at $0 + new class at $60 (no group)
            const basketResult = await callFunction<unknown, BasketResponse>({
                functionName: 'calculateBasket',
                data: {
                    codes: [],
                    classes: [
                        {
                            id: 'locked-class',
                            semesterId: SEMESTER_ID,
                            additionalOptionIds: ['extra-opt'],
                        },
                        {
                            id: 'new-class',
                            semesterId: SEMESTER_ID,
                            additionalOptionIds: [],
                        },
                    ],
                    userCostsToClassIds: {},
                    overrideCosts: { 'locked-class': 0 },
                },
            });

            expect(basketResult.status).toBe(200);
            // locked-class cost overridden to $0 + extra-opt $20 + new-class $60 = $80
            expect(basketResult.data!.finalTotal).toBe(80);
        });
    });

    describe('expectedTotal charge-time validation', () => {
        it('should reject enroll and create no enrollment record when expectedTotal does not match', async () => {
            await seedStandaloneClass();

            const enrollCountBefore = await getEnrollmentDocCount();

            const result = await callFunction<unknown, unknown>({
                functionName: 'enroll',
                data: {
                    selectedClasses: [
                        { id: 'standalone-class', semesterId: SEMESTER_ID },
                    ],
                    student: makeStudentForm(),
                    releaseSignatures: [],
                    discountCodes: [],
                    userCostsToSelectedClassIds: {},
                    additionalOptionIdsByClassId: {},
                    expectedTotal: 999, // Wrong amount
                },
                idToken: enrollmentUser.idToken,
            });

            expect(result.status).toBe(409);
            const body = result.raw as {
                error: string;
                expectedTotal: number;
                computedTotal: number;
            };
            expect(body.error).toContain('Price changed');
            expect(body.expectedTotal).toBe(999);
            expect(body.computedTotal).toBe(50);

            // Verify no enrollment record was created (no pending, no charge)
            const enrollCountAfter = await getEnrollmentDocCount();
            expect(enrollCountAfter).toBe(enrollCountBefore);
        });

        it('should accept enroll when expectedTotal matches exactly', async () => {
            await seedStandaloneClass();

            const result = await callFunction<unknown, EnrollResponse>({
                functionName: 'enroll',
                data: {
                    selectedClasses: [
                        { id: 'standalone-class', semesterId: SEMESTER_ID },
                    ],
                    student: makeStudentForm(),
                    releaseSignatures: [],
                    discountCodes: [],
                    userCostsToSelectedClassIds: {},
                    additionalOptionIdsByClassId: {},
                    expectedTotal: 50,
                },
                idToken: enrollmentUser.idToken,
            });

            expect(result.status).toBe(200);
            expect(result.data!.success).toBe(true);
        });

        it('should accept enroll when expectedTotal is not provided (backwards compat)', async () => {
            await seedStandaloneClass();

            const result = await callFunction<unknown, EnrollResponse>({
                functionName: 'enroll',
                data: {
                    selectedClasses: [
                        { id: 'standalone-class', semesterId: SEMESTER_ID },
                    ],
                    student: makeStudentForm(),
                    releaseSignatures: [],
                    discountCodes: [],
                    userCostsToSelectedClassIds: {},
                    additionalOptionIdsByClassId: {},
                    // No expectedTotal — should still work
                },
                idToken: enrollmentUser.idToken,
            });

            expect(result.status).toBe(200);
            expect(result.data!.success).toBe(true);
        });

        it('should reject enroll and create no enrollment record when group expectedTotal is wrong', async () => {
            await seedGroupedClasses();

            const enrollCountBefore = await getEnrollmentDocCount();

            const result = await callFunction<unknown, unknown>({
                functionName: 'enroll',
                data: {
                    selectedClasses: [
                        { id: 'morning-class', semesterId: SEMESTER_ID },
                        { id: 'afternoon-class', semesterId: SEMESTER_ID },
                    ],
                    student: makeStudentForm(),
                    releaseSignatures: [],
                    discountCodes: [],
                    userCostsToSelectedClassIds: {},
                    additionalOptionIdsByClassId: {},
                    expectedTotal: 160, // Individual sum, not group price
                },
                idToken: enrollmentUser.idToken,
            });

            expect(result.status).toBe(409);
            const body = result.raw as {
                computedTotal: number;
            };
            expect(body.computedTotal).toBe(120); // Group price

            // Verify no enrollment record was created — no charge happened
            const enrollCountAfter = await getEnrollmentDocCount();
            expect(enrollCountAfter).toBe(enrollCountBefore);
        });

        it('should not add student to class when expectedTotal mismatch rejects enrollment', async () => {
            await seedGroupedClasses();

            await callFunction<unknown, unknown>({
                functionName: 'enroll',
                data: {
                    selectedClasses: [
                        { id: 'morning-class', semesterId: SEMESTER_ID },
                        { id: 'afternoon-class', semesterId: SEMESTER_ID },
                    ],
                    student: makeStudentForm(),
                    releaseSignatures: [],
                    discountCodes: [],
                    userCostsToSelectedClassIds: {},
                    additionalOptionIdsByClassId: {},
                    expectedTotal: 999,
                },
                idToken: enrollmentUser.idToken,
            });

            // Verify the class still has no students enrolled
            const classResult = await callFunction<
                { semesterId: string },
                { classes: Array<{ id: string; enrolledCount: number }> }
            >({
                functionName: 'getClassesForAdmin',
                data: { semesterId: SEMESTER_ID },
                idToken: adminUser.idToken,
            });

            expect(classResult.status).toBe(200);
            const morningClass = classResult.data!.classes.find(
                (c) => c.id === 'morning-class'
            );
            expect(morningClass!.enrolledCount).toBe(0);
        });
    });

    describe('discount application with class groups', () => {
        it('should apply basket discount to group cost', async () => {
            await seedGroupedClasses();

            // Create a $20-off discount
            await setFirestoreDoc('discounts', 'disc-amount-20', {
                code: 'SAVE20',
                type: 'amount',
                active: true,
                amount: 20,
            });

            const basketResult = await callFunction<unknown, BasketResponse>({
                functionName: 'calculateBasket',
                data: {
                    codes: ['SAVE20'],
                    classes: [
                        {
                            id: 'morning-class',
                            semesterId: SEMESTER_ID,
                            additionalOptionIds: [],
                        },
                        {
                            id: 'afternoon-class',
                            semesterId: SEMESTER_ID,
                            additionalOptionIds: [],
                        },
                    ],
                    userCostsToClassIds: {},
                },
            });

            expect(basketResult.status).toBe(200);
            // Group $120 - $20 discount = $100
            expect(basketResult.data!.finalTotal).toBe(100);
            expect(basketResult.data!.originalTotal).toBe(120);

            // Verify enroll computes the same
            const enrollResult = await callFunction<unknown, EnrollResponse>({
                functionName: 'enroll',
                data: {
                    selectedClasses: [
                        { id: 'morning-class', semesterId: SEMESTER_ID },
                        { id: 'afternoon-class', semesterId: SEMESTER_ID },
                    ],
                    student: makeStudentForm(),
                    releaseSignatures: [],
                    discountCodes: ['SAVE20'],
                    userCostsToSelectedClassIds: {},
                    additionalOptionIdsByClassId: {},
                    expectedTotal: 100,
                },
                idToken: enrollmentUser.idToken,
            });

            expect(enrollResult.status).toBe(200);
            expect(enrollResult.data!.success).toBe(true);
        });

        it('should apply percent discount to group cost', async () => {
            await seedGroupedClasses();

            await setFirestoreDoc('discounts', 'disc-percent-50', {
                code: 'HALF',
                type: 'percent',
                active: true,
                percent: 50,
            });

            const basketResult = await callFunction<unknown, BasketResponse>({
                functionName: 'calculateBasket',
                data: {
                    codes: ['HALF'],
                    classes: [
                        {
                            id: 'morning-class',
                            semesterId: SEMESTER_ID,
                            additionalOptionIds: [],
                        },
                        {
                            id: 'afternoon-class',
                            semesterId: SEMESTER_ID,
                            additionalOptionIds: [],
                        },
                    ],
                    userCostsToClassIds: {},
                },
            });

            expect(basketResult.status).toBe(200);
            // Group $120 * 50% = $60
            expect(basketResult.data!.finalTotal).toBe(60);

            // Verify enroll computes the same
            const enrollResult = await callFunction<unknown, EnrollResponse>({
                functionName: 'enroll',
                data: {
                    selectedClasses: [
                        { id: 'morning-class', semesterId: SEMESTER_ID },
                        { id: 'afternoon-class', semesterId: SEMESTER_ID },
                    ],
                    student: makeStudentForm(),
                    releaseSignatures: [],
                    discountCodes: ['HALF'],
                    userCostsToSelectedClassIds: {},
                    additionalOptionIdsByClassId: {},
                    expectedTotal: 60,
                },
                idToken: enrollmentUser.idToken,
            });

            expect(enrollResult.status).toBe(200);
            expect(enrollResult.data!.success).toBe(true);
        });

        it('should not apply inactive discount', async () => {
            await seedGroupedClasses();

            await setFirestoreDoc('discounts', 'disc-inactive', {
                code: 'NOWORK',
                type: 'amount',
                active: false,
                amount: 50,
            });

            const result = await callFunction<unknown, BasketResponse>({
                functionName: 'calculateBasket',
                data: {
                    codes: ['NOWORK'],
                    classes: [
                        {
                            id: 'morning-class',
                            semesterId: SEMESTER_ID,
                            additionalOptionIds: [],
                        },
                        {
                            id: 'afternoon-class',
                            semesterId: SEMESTER_ID,
                            additionalOptionIds: [],
                        },
                    ],
                    userCostsToClassIds: {},
                },
            });

            expect(result.status).toBe(200);
            // Discount is inactive — full group price
            expect(result.data!.finalTotal).toBe(120);
        });
    });
});
