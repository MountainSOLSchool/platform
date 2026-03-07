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
import type { SemesterClass } from '@sol/classes/domain';

const SEMESTER_ID = 'test-semester-capacity';

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

function studentRefs(count: number): FirestoreRef[] {
    return Array.from({ length: count }, (_, i) =>
        new FirestoreRef(`students/student-${i}`)
    );
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
        guardians: [{
            guardianName: 'Parent Test',
            guardianRelationship: 'Parent',
            guardianPhone: '555-0100',
            guardianEmail: 'parent@test.com',
            guardianResidesWithStudent: true,
        }],
        pickupCodeword: 'test',
        authorizedForPickup: [],
        emergencyContacts: [{
            name: 'Emergency Contact',
            relationship: 'Aunt',
            phone: '555-0200',
        }],
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

interface ClassesBySemesterResponse {
    [semesterId: string]: {
        classes: SemesterClass[];
        groups: Array<{ id: string; classes: SemesterClass[] }>;
    };
}

interface AdminClass {
    id: string;
    name: string;
    enrolledCount: number;
    maxStudentSize: number;
    pausedForEnrollment: boolean;
}

interface GetClassesForAdminResponse {
    classes: AdminClass[];
}

describe('Enrollment Capacity Enforcement', () => {
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

    describe('classesBySemester pausedForEnrollment calculation', () => {
        it('should return pausedForEnrollment=false when students < max', async () => {
            await setFirestoreDoc(
                `semesters/${SEMESTER_ID}/classes`,
                'class-under',
                makeClassDoc({
                    name: 'Under Capacity',
                    max_student_size: 5,
                    students: studentRefs(3),
                })
            );

            const result = await callFunction<string[], ClassesBySemesterResponse>({
                functionName: 'classesBySemester',
                data: [SEMESTER_ID],
            });

            expect(result.status).toBe(200);
            const classes = result.data![SEMESTER_ID].classes;
            const underClass = classes.find((c) => c.id === 'class-under');
            expect(underClass).toBeDefined();
            expect(underClass!.pausedForEnrollment).toBe(false);
            expect(underClass!.enrolledCount).toBe(3);
        });

        it('should return pausedForEnrollment=true when students == max (at capacity)', async () => {
            await setFirestoreDoc(
                `semesters/${SEMESTER_ID}/classes`,
                'class-at-capacity',
                makeClassDoc({
                    name: 'At Capacity',
                    max_student_size: 5,
                    students: studentRefs(5),
                })
            );

            const result = await callFunction<string[], ClassesBySemesterResponse>({
                functionName: 'classesBySemester',
                data: [SEMESTER_ID],
            });

            expect(result.status).toBe(200);
            const classes = result.data![SEMESTER_ID].classes;
            const atCapacityClass = classes.find((c) => c.id === 'class-at-capacity');
            expect(atCapacityClass).toBeDefined();
            expect(atCapacityClass!.pausedForEnrollment).toBe(true);
            expect(atCapacityClass!.enrolledCount).toBe(5);
        });

        it('should return pausedForEnrollment=true when students > max (over capacity)', async () => {
            await setFirestoreDoc(
                `semesters/${SEMESTER_ID}/classes`,
                'class-over',
                makeClassDoc({
                    name: 'Over Capacity',
                    max_student_size: 5,
                    students: studentRefs(7),
                })
            );

            const result = await callFunction<string[], ClassesBySemesterResponse>({
                functionName: 'classesBySemester',
                data: [SEMESTER_ID],
            });

            expect(result.status).toBe(200);
            const classes = result.data![SEMESTER_ID].classes;
            const overClass = classes.find((c) => c.id === 'class-over');
            expect(overClass).toBeDefined();
            expect(overClass!.pausedForEnrollment).toBe(true);
            expect(overClass!.enrolledCount).toBe(7);
        });

        it('should return pausedForEnrollment=false when no max_student_size is set', async () => {
            await setFirestoreDoc(
                `semesters/${SEMESTER_ID}/classes`,
                'class-no-max',
                makeClassDoc({
                    name: 'No Max',
                    max_student_size: 0,
                    students: studentRefs(20),
                })
            );

            const result = await callFunction<string[], ClassesBySemesterResponse>({
                functionName: 'classesBySemester',
                data: [SEMESTER_ID],
            });

            expect(result.status).toBe(200);
            const classes = result.data![SEMESTER_ID].classes;
            const noMaxClass = classes.find((c) => c.id === 'class-no-max');
            expect(noMaxClass).toBeDefined();
            expect(noMaxClass!.pausedForEnrollment).toBe(false);
        });

        it('should return pausedForEnrollment=false when students array is empty', async () => {
            await setFirestoreDoc(
                `semesters/${SEMESTER_ID}/classes`,
                'class-empty',
                makeClassDoc({
                    name: 'Empty Class',
                    max_student_size: 10,
                    students: [],
                })
            );

            const result = await callFunction<string[], ClassesBySemesterResponse>({
                functionName: 'classesBySemester',
                data: [SEMESTER_ID],
            });

            expect(result.status).toBe(200);
            const classes = result.data![SEMESTER_ID].classes;
            const emptyClass = classes.find((c) => c.id === 'class-empty');
            expect(emptyClass).toBeDefined();
            expect(emptyClass!.pausedForEnrollment).toBe(false);
            expect(emptyClass!.enrolledCount).toBe(0);
        });

        it('should correctly report capacity across multiple classes in one request', async () => {
            await Promise.all([
                setFirestoreDoc(
                    `semesters/${SEMESTER_ID}/classes`,
                    'class-open',
                    makeClassDoc({
                        name: 'Open Class',
                        max_student_size: 10,
                        students: studentRefs(5),
                    })
                ),
                setFirestoreDoc(
                    `semesters/${SEMESTER_ID}/classes`,
                    'class-full',
                    makeClassDoc({
                        name: 'Full Class',
                        max_student_size: 3,
                        students: studentRefs(3),
                    })
                ),
            ]);

            const result = await callFunction<string[], ClassesBySemesterResponse>({
                functionName: 'classesBySemester',
                data: [SEMESTER_ID],
            });

            expect(result.status).toBe(200);
            const classes = result.data![SEMESTER_ID].classes;

            const openClass = classes.find((c) => c.id === 'class-open');
            const fullClass = classes.find((c) => c.id === 'class-full');

            expect(openClass!.pausedForEnrollment).toBe(false);
            expect(fullClass!.pausedForEnrollment).toBe(true);
        });
    });

    describe('enroll function capacity enforcement', () => {
        it('should reject enrollment when class is at capacity', async () => {
            await setFirestoreDoc(
                `semesters/${SEMESTER_ID}/classes`,
                'full-class',
                makeClassDoc({
                    name: 'Full Class',
                    max_student_size: 3,
                    students: studentRefs(3),
                })
            );

            const result = await callFunction<unknown, unknown>({
                functionName: 'enroll',
                data: {
                    selectedClasses: [
                        { id: 'full-class', semesterId: SEMESTER_ID },
                    ],
                    student: makeStudentForm(),
                    releaseSignatures: [],
                    discountCodes: [],
                    userCostsToSelectedClassIds: {},
                    additionalOptionIdsByClassId: {},
                },
                idToken: enrollmentUser.idToken,
            });

            expect(result.status).toBe(400);
            expect(result.error).toContain('classes are full');
        });

        it('should reject enrollment when class is over capacity', async () => {
            await setFirestoreDoc(
                `semesters/${SEMESTER_ID}/classes`,
                'over-class',
                makeClassDoc({
                    name: 'Over Capacity Class',
                    max_student_size: 2,
                    students: studentRefs(5),
                })
            );

            const result = await callFunction<unknown, unknown>({
                functionName: 'enroll',
                data: {
                    selectedClasses: [
                        { id: 'over-class', semesterId: SEMESTER_ID },
                    ],
                    student: makeStudentForm(),
                    releaseSignatures: [],
                    discountCodes: [],
                    userCostsToSelectedClassIds: {},
                    additionalOptionIdsByClassId: {},
                },
                idToken: enrollmentUser.idToken,
            });

            expect(result.status).toBe(400);
            expect(result.error).toContain('classes are full');
        });

        it('should include fullClassIds in rejection response', async () => {
            await setFirestoreDoc(
                `semesters/${SEMESTER_ID}/classes`,
                'full-class-ids',
                makeClassDoc({
                    name: 'Full For IDs Test',
                    max_student_size: 2,
                    students: studentRefs(2),
                })
            );

            const result = await callFunction<unknown, { fullClassIds: string[] }>({
                functionName: 'enroll',
                data: {
                    selectedClasses: [
                        { id: 'full-class-ids', semesterId: SEMESTER_ID },
                    ],
                    student: makeStudentForm(),
                    releaseSignatures: [],
                    discountCodes: [],
                    userCostsToSelectedClassIds: {},
                    additionalOptionIdsByClassId: {},
                },
                idToken: enrollmentUser.idToken,
            });

            expect(result.status).toBe(400);
            const body = result.raw as { fullClassIds?: string[] };
            expect(body.fullClassIds).toContain('full-class-ids');
        });

        it('should reject when any one of multiple selected classes is full', async () => {
            await Promise.all([
                setFirestoreDoc(
                    `semesters/${SEMESTER_ID}/classes`,
                    'open-class',
                    makeClassDoc({
                        name: 'Open Class',
                        max_student_size: 10,
                        students: studentRefs(2),
                    })
                ),
                setFirestoreDoc(
                    `semesters/${SEMESTER_ID}/classes`,
                    'full-class-mix',
                    makeClassDoc({
                        name: 'Full Class',
                        max_student_size: 3,
                        students: studentRefs(3),
                    })
                ),
            ]);

            const result = await callFunction<unknown, unknown>({
                functionName: 'enroll',
                data: {
                    selectedClasses: [
                        { id: 'open-class', semesterId: SEMESTER_ID },
                        { id: 'full-class-mix', semesterId: SEMESTER_ID },
                    ],
                    student: makeStudentForm(),
                    releaseSignatures: [],
                    discountCodes: [],
                    userCostsToSelectedClassIds: {},
                    additionalOptionIdsByClassId: {},
                },
                idToken: enrollmentUser.idToken,
            });

            expect(result.status).toBe(400);
            expect(result.error).toContain('classes are full');
        });

        it('should reject unauthenticated enrollment attempts', async () => {
            await setFirestoreDoc(
                `semesters/${SEMESTER_ID}/classes`,
                'any-class',
                makeClassDoc({
                    name: 'Any Class',
                    max_student_size: 10,
                    students: [],
                })
            );

            const result = await callFunction<unknown, unknown>({
                functionName: 'enroll',
                data: {
                    selectedClasses: [
                        { id: 'any-class', semesterId: SEMESTER_ID },
                    ],
                    student: makeStudentForm(),
                    releaseSignatures: [],
                    discountCodes: [],
                    userCostsToSelectedClassIds: {},
                    additionalOptionIdsByClassId: {},
                },
            });

            expect(result.status).toBe(403);
        });
    });

    describe('getClassesForAdmin capacity calculation', () => {
        it('should calculate pausedForEnrollment dynamically (not from stored field)', async () => {
            await setFirestoreDoc(
                `semesters/${SEMESTER_ID}/classes`,
                'admin-full-class',
                makeClassDoc({
                    name: 'Admin Full Class',
                    max_student_size: 3,
                    students: studentRefs(3),
                    paused_for_enrollment: false,
                })
            );

            const result = await callFunction<
                { semesterId: string },
                GetClassesForAdminResponse
            >({
                functionName: 'getClassesForAdmin',
                data: { semesterId: SEMESTER_ID },
                idToken: adminUser.idToken,
            });

            expect(result.status).toBe(200);
            const fullClass = result.data!.classes.find(
                (c) => c.id === 'admin-full-class'
            );
            expect(fullClass).toBeDefined();
            expect(fullClass!.enrolledCount).toBe(3);
            expect(fullClass!.maxStudentSize).toBe(3);
            expect(fullClass!.pausedForEnrollment).toBe(true);
        });

        it('should show pausedForEnrollment=false when class has capacity', async () => {
            await setFirestoreDoc(
                `semesters/${SEMESTER_ID}/classes`,
                'admin-open-class',
                makeClassDoc({
                    name: 'Admin Open Class',
                    max_student_size: 10,
                    students: studentRefs(3),
                })
            );

            const result = await callFunction<
                { semesterId: string },
                GetClassesForAdminResponse
            >({
                functionName: 'getClassesForAdmin',
                data: { semesterId: SEMESTER_ID },
                idToken: adminUser.idToken,
            });

            expect(result.status).toBe(200);
            const openClass = result.data!.classes.find(
                (c) => c.id === 'admin-open-class'
            );
            expect(openClass).toBeDefined();
            expect(openClass!.enrolledCount).toBe(3);
            expect(openClass!.pausedForEnrollment).toBe(false);
        });

        it('should correctly report mixed capacity across classes', async () => {
            await Promise.all([
                setFirestoreDoc(
                    `semesters/${SEMESTER_ID}/classes`,
                    'admin-open',
                    makeClassDoc({
                        name: 'Open',
                        max_student_size: 10,
                        students: studentRefs(5),
                    })
                ),
                setFirestoreDoc(
                    `semesters/${SEMESTER_ID}/classes`,
                    'admin-at-cap',
                    makeClassDoc({
                        name: 'At Capacity',
                        max_student_size: 4,
                        students: studentRefs(4),
                    })
                ),
                setFirestoreDoc(
                    `semesters/${SEMESTER_ID}/classes`,
                    'admin-over-cap',
                    makeClassDoc({
                        name: 'Over Capacity',
                        max_student_size: 2,
                        students: studentRefs(5),
                    })
                ),
            ]);

            const result = await callFunction<
                { semesterId: string },
                GetClassesForAdminResponse
            >({
                functionName: 'getClassesForAdmin',
                data: { semesterId: SEMESTER_ID },
                idToken: adminUser.idToken,
            });

            expect(result.status).toBe(200);
            const classes = result.data!.classes;

            const open = classes.find((c) => c.id === 'admin-open');
            const atCap = classes.find((c) => c.id === 'admin-at-cap');
            const overCap = classes.find((c) => c.id === 'admin-over-cap');

            expect(open!.pausedForEnrollment).toBe(false);
            expect(atCap!.pausedForEnrollment).toBe(true);
            expect(overCap!.pausedForEnrollment).toBe(true);
        });
    });
});
