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
import { EMULATOR_CONFIG } from '../utils/emulator-config';
import type {
    CreateClassRequest,
    CreateClassResponse,
    UpdateClassRequest,
    UpdateClassResponse,
} from '@sol/ts/firebase/api-types';

const SEMESTER_ID = 'test-semester-options';
const FIRESTORE_URL = `http://${EMULATOR_CONFIG.firestoreHost}`;

const futureDate = new Date();
futureDate.setFullYear(futureDate.getFullYear() + 1);

const pastDate = new Date();
pastDate.setFullYear(pastDate.getFullYear() - 1);

// ─── Firestore REST helpers ─────────────────────────────────────────────────

async function getFirestoreDoc(
    path: string
): Promise<Record<string, unknown> | null> {
    const url = `${FIRESTORE_URL}/v1/projects/${EMULATOR_CONFIG.projectId}/databases/(default)/documents/${path}`;
    const response = await fetch(url, {
        headers: { Authorization: 'Bearer owner' },
    });
    if (!response.ok) return null;
    const body = (await response.json()) as {
        fields?: Record<string, unknown>;
    };
    return body.fields ? parseFirestoreFields(body.fields) : null;
}

async function listFirestoreCollection(
    path: string
): Promise<Array<{ id: string; fields: Record<string, unknown> }>> {
    const url = `${FIRESTORE_URL}/v1/projects/${EMULATOR_CONFIG.projectId}/databases/(default)/documents/${path}`;
    const response = await fetch(url, {
        headers: { Authorization: 'Bearer owner' },
    });
    if (!response.ok) return [];
    const body = (await response.json()) as {
        documents?: Array<{ name: string; fields?: Record<string, unknown> }>;
    };
    return (body.documents ?? []).map((doc) => ({
        id: doc.name.split('/').pop()!,
        fields: doc.fields ? parseFirestoreFields(doc.fields) : {},
    }));
}

function parseFirestoreFields(
    fields: Record<string, unknown>
): Record<string, unknown> {
    const result: Record<string, unknown> = {};
    for (const [key, wrapper] of Object.entries(fields)) {
        result[key] = parseFirestoreValue(wrapper);
    }
    return result;
}

function parseFirestoreValue(wrapper: unknown): unknown {
    if (!wrapper || typeof wrapper !== 'object') return wrapper;
    const w = wrapper as Record<string, unknown>;
    if ('stringValue' in w) return w.stringValue;
    if ('integerValue' in w) return Number(w.integerValue);
    if ('doubleValue' in w) return w.doubleValue;
    if ('booleanValue' in w) return w.booleanValue;
    if ('nullValue' in w) return null;
    if ('referenceValue' in w) return w.referenceValue;
    if ('timestampValue' in w) return w.timestampValue;
    if ('arrayValue' in w) {
        const arr = w.arrayValue as { values?: unknown[] };
        return (arr.values ?? []).map(parseFirestoreValue);
    }
    if ('mapValue' in w) {
        const map = w.mapValue as { fields?: Record<string, unknown> };
        return map.fields ? parseFirestoreFields(map.fields) : {};
    }
    return wrapper;
}

// ─── Shared helpers ─────────────────────────────────────────────────────────

function makeCreateClassRequest(
    overrides: Partial<CreateClassRequest> = {}
): CreateClassRequest {
    return {
        semesterId: SEMESTER_ID,
        name: 'Test Class',
        description: 'A test class',
        classType: 'Standard',
        gradeRangeStart: 1,
        gradeRangeEnd: 5,
        cost: 100,
        location: 'Room A',
        instructorIds: [],
        weekday: 'Monday',
        dailyTimes: '9:00 AM - 12:00 PM',
        startDate: pastDate.toISOString(),
        endDate: futureDate.toISOString(),
        registrationEndDate: futureDate.toISOString(),
        live: false,
        ...overrides,
    };
}

// ─── Tests ──────────────────────────────────────────────────────────────────

describe('Additional Options Subcollection', () => {
    let adminUser: TestUser;

    beforeAll(async () => {
        await clearAuthEmulator();
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
        await setFirestoreDoc('admins', adminUser.uid, {
            userId: adminUser.uid,
            email: adminUser.email,
        });
    });

    afterAll(async () => {
        await clearAuthEmulator();
        await clearFirestoreEmulator();
    });

    describe('createClass', () => {
        it('should store additional options as subcollection documents', async () => {
            const result = await callFunction<
                CreateClassRequest,
                CreateClassResponse
            >({
                functionName: 'createClass',
                data: makeCreateClassRequest({
                    name: 'Class With Options',
                    additionalOptions: [
                        {
                            id: 'opt-1',
                            description: 'Before care 8am-9am',
                            cost: 25,
                        },
                        {
                            id: 'opt-2',
                            description: 'After care 4pm-5pm',
                            cost: 30,
                        },
                    ],
                }),
                idToken: adminUser.idToken,
            });

            expect(result.status).toBe(200);
            const classId = result.data!.classId;

            // Verify subcollection docs exist
            const options = await listFirestoreCollection(
                `semesters/${SEMESTER_ID}/classes/${classId}/additional_options`
            );
            expect(options).toHaveLength(2);

            const opt1 = options.find((o) => o.id === 'opt-1');
            const opt2 = options.find((o) => o.id === 'opt-2');

            expect(opt1).toBeDefined();
            expect(opt1!.fields.description).toBe('Before care 8am-9am');
            expect(opt1!.fields.cost).toBe(25);
            expect(opt1!.fields.students).toEqual([]);

            expect(opt2).toBeDefined();
            expect(opt2!.fields.description).toBe('After care 4pm-5pm');
            expect(opt2!.fields.cost).toBe(30);
            expect(opt2!.fields.students).toEqual([]);

            // Verify NO inline additional_options field on the class doc
            const classDoc = await getFirestoreDoc(
                `semesters/${SEMESTER_ID}/classes/${classId}`
            );
            expect(classDoc).toBeDefined();
            expect(classDoc!['additional_options']).toBeUndefined();
        });

        it('should create class without subcollection when no options provided', async () => {
            const result = await callFunction<
                CreateClassRequest,
                CreateClassResponse
            >({
                functionName: 'createClass',
                data: makeCreateClassRequest({
                    name: 'Class Without Options',
                }),
                idToken: adminUser.idToken,
            });

            expect(result.status).toBe(200);
            const classId = result.data!.classId;

            const options = await listFirestoreCollection(
                `semesters/${SEMESTER_ID}/classes/${classId}/additional_options`
            );
            expect(options).toHaveLength(0);
        });
    });

    describe('updateClass', () => {
        it('should create subcollection docs when adding options to existing class', async () => {
            // Create a class first (without options)
            const createResult = await callFunction<
                CreateClassRequest,
                CreateClassResponse
            >({
                functionName: 'createClass',
                data: makeCreateClassRequest({ name: 'Updatable Class' }),
                idToken: adminUser.idToken,
            });

            expect(createResult.status).toBe(200);
            const classId = createResult.data!.classId;

            // Update to add options
            const updateResult = await callFunction<
                UpdateClassRequest,
                UpdateClassResponse
            >({
                functionName: 'updateClass',
                data: {
                    ...makeCreateClassRequest({ name: 'Updatable Class' }),
                    classId,
                    additionalOptions: [
                        {
                            id: 'new-opt',
                            description: 'New option',
                            cost: 15,
                        },
                    ],
                },
                idToken: adminUser.idToken,
            });

            expect(updateResult.status).toBe(200);

            const options = await listFirestoreCollection(
                `semesters/${SEMESTER_ID}/classes/${classId}/additional_options`
            );
            expect(options).toHaveLength(1);
            expect(options[0].id).toBe('new-opt');
            expect(options[0].fields.description).toBe('New option');
            expect(options[0].fields.cost).toBe(15);
            expect(options[0].fields.students).toEqual([]);
        });

        it('should preserve students array when updating option description/cost', async () => {
            // Seed a class with a subcollection option that has students
            await setFirestoreDoc(
                `semesters/${SEMESTER_ID}/classes`,
                'class-with-students',
                {
                    name: 'Class With Students',
                    description: 'Test',
                    live: false,
                    cost: 100,
                    location: 'Room A',
                    weekday: 'Monday',
                    daily_times: '9-12',
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
                }
            );

            // Seed the subcollection option with enrolled students
            await setFirestoreDoc(
                `semesters/${SEMESTER_ID}/classes/class-with-students/additional_options`,
                'opt-keep',
                {
                    description: 'Before care',
                    cost: 25,
                    students: [
                        new FirestoreRef('students/student-a'),
                        new FirestoreRef('students/student-b'),
                    ],
                }
            );

            // Verify students are seeded
            const before = await listFirestoreCollection(
                `semesters/${SEMESTER_ID}/classes/class-with-students/additional_options`
            );
            expect(before).toHaveLength(1);
            expect(before[0].fields.students).toHaveLength(2);

            // Update the class — change option description/cost but keep same ID
            const updateResult = await callFunction<
                UpdateClassRequest,
                UpdateClassResponse
            >({
                functionName: 'updateClass',
                data: {
                    semesterId: SEMESTER_ID,
                    classId: 'class-with-students',
                    name: 'Class With Students',
                    description: 'Test',
                    classType: 'Standard',
                    gradeRangeStart: 1,
                    gradeRangeEnd: 5,
                    cost: 100,
                    location: 'Room A',
                    instructorIds: [],
                    weekday: 'Monday',
                    dailyTimes: '9-12',
                    startDate: pastDate.toISOString(),
                    endDate: futureDate.toISOString(),
                    registrationEndDate: futureDate.toISOString(),
                    live: false,
                    additionalOptions: [
                        {
                            id: 'opt-keep',
                            description: 'Updated before care',
                            cost: 30,
                        },
                    ],
                },
                idToken: adminUser.idToken,
            });

            expect(updateResult.status).toBe(200);

            // Verify the option was updated but students preserved
            const after = await listFirestoreCollection(
                `semesters/${SEMESTER_ID}/classes/class-with-students/additional_options`
            );
            expect(after).toHaveLength(1);
            expect(after[0].id).toBe('opt-keep');
            expect(after[0].fields.description).toBe('Updated before care');
            expect(after[0].fields.cost).toBe(30);
            expect(after[0].fields.students).toHaveLength(2);
        });

        it('should delete removed options and add new ones', async () => {
            await setFirestoreDoc(
                `semesters/${SEMESTER_ID}/classes`,
                'class-swap-opts',
                {
                    name: 'Swap Options Class',
                    description: 'Test',
                    live: false,
                    cost: 100,
                    location: 'Room A',
                    weekday: 'Monday',
                    daily_times: '9-12',
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
                }
            );

            // Seed two existing options
            await setFirestoreDoc(
                `semesters/${SEMESTER_ID}/classes/class-swap-opts/additional_options`,
                'opt-remove',
                { description: 'Will be removed', cost: 10, students: [] }
            );
            await setFirestoreDoc(
                `semesters/${SEMESTER_ID}/classes/class-swap-opts/additional_options`,
                'opt-stays',
                { description: 'Stays', cost: 20, students: [] }
            );

            // Update: remove opt-remove, keep opt-stays, add opt-new
            const updateResult = await callFunction<
                UpdateClassRequest,
                UpdateClassResponse
            >({
                functionName: 'updateClass',
                data: {
                    semesterId: SEMESTER_ID,
                    classId: 'class-swap-opts',
                    name: 'Swap Options Class',
                    description: 'Test',
                    classType: 'Standard',
                    gradeRangeStart: 1,
                    gradeRangeEnd: 5,
                    cost: 100,
                    location: 'Room A',
                    instructorIds: [],
                    weekday: 'Monday',
                    dailyTimes: '9-12',
                    startDate: pastDate.toISOString(),
                    endDate: futureDate.toISOString(),
                    registrationEndDate: futureDate.toISOString(),
                    live: false,
                    additionalOptions: [
                        { id: 'opt-stays', description: 'Stays', cost: 20 },
                        { id: 'opt-new', description: 'Brand new', cost: 35 },
                    ],
                },
                idToken: adminUser.idToken,
            });

            expect(updateResult.status).toBe(200);

            const options = await listFirestoreCollection(
                `semesters/${SEMESTER_ID}/classes/class-swap-opts/additional_options`
            );
            const optionIds = options.map((o) => o.id).sort();

            expect(optionIds).toEqual(['opt-new', 'opt-stays']);
            expect(
                options.find((o) => o.id === 'opt-new')!.fields.description
            ).toBe('Brand new');
        });

        it('should clean up inline additional_options field if present', async () => {
            // Seed a class with an inline additional_options field (the old bug)
            await setFirestoreDoc(
                `semesters/${SEMESTER_ID}/classes`,
                'class-inline-cleanup',
                {
                    name: 'Inline Cleanup Class',
                    description: 'Test',
                    live: false,
                    cost: 100,
                    location: 'Room A',
                    weekday: 'Monday',
                    daily_times: '9-12',
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
                    additional_options: [
                        { id: 'inline-opt', description: 'Inline', cost: 10 },
                    ],
                }
            );

            // Verify inline field exists before update
            const before = await getFirestoreDoc(
                `semesters/${SEMESTER_ID}/classes/class-inline-cleanup`
            );
            expect(before!['additional_options']).toBeDefined();

            // Update the class with options (should move to subcollection)
            const updateResult = await callFunction<
                UpdateClassRequest,
                UpdateClassResponse
            >({
                functionName: 'updateClass',
                data: {
                    semesterId: SEMESTER_ID,
                    classId: 'class-inline-cleanup',
                    name: 'Inline Cleanup Class',
                    description: 'Test',
                    classType: 'Standard',
                    gradeRangeStart: 1,
                    gradeRangeEnd: 5,
                    cost: 100,
                    location: 'Room A',
                    instructorIds: [],
                    weekday: 'Monday',
                    dailyTimes: '9-12',
                    startDate: pastDate.toISOString(),
                    endDate: futureDate.toISOString(),
                    registrationEndDate: futureDate.toISOString(),
                    live: false,
                    additionalOptions: [
                        {
                            id: 'subcoll-opt',
                            description: 'In subcollection',
                            cost: 20,
                        },
                    ],
                },
                idToken: adminUser.idToken,
            });

            expect(updateResult.status).toBe(200);

            // Verify inline field is removed
            const after = await getFirestoreDoc(
                `semesters/${SEMESTER_ID}/classes/class-inline-cleanup`
            );
            expect(after!['additional_options']).toBeUndefined();

            // Verify subcollection doc exists
            const options = await listFirestoreCollection(
                `semesters/${SEMESTER_ID}/classes/class-inline-cleanup/additional_options`
            );
            expect(options).toHaveLength(1);
            expect(options[0].id).toBe('subcoll-opt');
        });
    });

    describe('classesBySemester reads subcollection options', () => {
        it('should return additional options from subcollection with student IDs', async () => {
            // Seed class
            await setFirestoreDoc(
                `semesters/${SEMESTER_ID}/classes`,
                'class-roster-test',
                {
                    name: 'Roster Test Class',
                    description: 'Test',
                    live: true,
                    cost: 100,
                    location: 'Room A',
                    weekday: 'Monday',
                    daily_times: '9-12',
                    class_type: 'Standard',
                    grade_range_start: 1,
                    grade_range_end: 5,
                    thumbnailUrl: '',
                    paused_for_enrollment: false,
                    for_information_only: false,
                    max_student_size: 12,
                    min_student_size: 5,
                    instructors: [],
                    students: [new FirestoreRef('students/student-1')],
                    start: new FirestoreTimestamp(pastDate),
                    end: new FirestoreTimestamp(futureDate),
                    registration_end_date: new FirestoreTimestamp(futureDate),
                }
            );

            // Seed subcollection option with a student
            await setFirestoreDoc(
                `semesters/${SEMESTER_ID}/classes/class-roster-test/additional_options`,
                'opt-with-student',
                {
                    description: 'Before care',
                    cost: 25,
                    students: [new FirestoreRef('students/student-1')],
                }
            );

            const result = await callFunction<
                string[],
                Record<
                    string,
                    {
                        classes: Array<{
                            id: string;
                            additionalOptions?: Array<{
                                id: string;
                                description: string;
                                cost: number;
                                studentsIds: string[];
                            }>;
                        }>;
                    }
                >
            >({
                functionName: 'classesBySemester',
                data: [SEMESTER_ID],
            });

            expect(result.status).toBe(200);
            const classes = result.data![SEMESTER_ID].classes;
            const testClass = classes.find(
                (c) => c.id === 'class-roster-test'
            );
            expect(testClass).toBeDefined();
            expect(testClass!.additionalOptions).toHaveLength(1);
            expect(testClass!.additionalOptions![0].description).toBe(
                'Before care'
            );
            expect(testClass!.additionalOptions![0].studentsIds).toContain(
                'student-1'
            );
        });
    });
});
