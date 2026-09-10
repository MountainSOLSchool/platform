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
    ContactAudienceRequest,
    ContactAudienceResponse,
} from '@sol/ts/firebase/api-types';

const SEMESTER_ID = 'test-semester-contact-audiences';

const futureDate = new Date();
futureDate.setFullYear(futureDate.getFullYear() + 1);
const pastDate = new Date();
pastDate.setFullYear(pastDate.getFullYear() - 1);

function classDoc(overrides: Record<string, unknown>) {
    return {
        name: 'A Class',
        description: 'Test',
        live: true,
        cost: 0,
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
        min_student_size: 1,
        instructors: [],
        start: new FirestoreTimestamp(pastDate),
        end: new FirestoreTimestamp(futureDate),
        registration_end_date: new FirestoreTimestamp(futureDate),
        ...overrides,
    };
}

async function fetchAudience(data: ContactAudienceRequest, idToken: string) {
    return await callFunction<ContactAudienceRequest, ContactAudienceResponse>({
        functionName: 'contactAudiences',
        data,
        idToken,
    });
}

describe('contactAudiences (family contact lists)', () => {
    let adminUser: TestUser;
    let nonAdminUser: TestUser;

    beforeAll(async () => {
        await clearAuthEmulator();
        adminUser = await createTestUser(ADMIN_USER.email, ADMIN_USER.password);
        nonAdminUser = await createTestUser(
            NON_ADMIN_USER.email,
            NON_ADMIN_USER.password
        );
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

    async function seedSiblingsAndOneOtherFamily() {
        // Two siblings share a primary contact — the duplicate the old
        // per-class email button produced.
        for (const [id, first] of [
            ['stu-a1', 'Ada'],
            ['stu-a2', 'Abel'],
        ]) {
            await setFirestoreDoc('students', id, {
                first_name: first,
                last_name: 'Ahmed',
                primary_first_name: 'Amina',
                primary_last_name: 'Ahmed',
                primary_email: 'amina@test.com',
                guardians: [
                    {
                        first_name: 'Amina',
                        last_name: 'Ahmed',
                        relationship: 'Parent',
                        phone: '555-0100',
                        email: 'amina@test.com',
                    },
                    {
                        first_name: 'Omar',
                        last_name: 'Ahmed',
                        relationship: 'Parent',
                        phone: '555-0101',
                        email: 'omar@test.com',
                    },
                ],
            });
        }

        await setFirestoreDoc('students', 'stu-b1', {
            first_name: 'Bo',
            last_name: 'Brooks',
            primary_first_name: 'Bea',
            primary_last_name: 'Brooks',
            // Casing differs from nothing else in the fixture; dedupe is
            // case-insensitive so this must not become a second address.
            primary_email: 'BEA@test.com',
            guardians: [],
        });

        await setFirestoreDoc(
            `semesters/${SEMESTER_ID}/classes`,
            'class-1',
            classDoc({
                name: 'Camo and Stealth',
                students: [
                    new FirestoreRef('students/stu-a1'),
                    new FirestoreRef('students/stu-a2'),
                ],
            })
        );

        // Not live: a class since unlisted still has families who enrolled.
        await setFirestoreDoc(
            `semesters/${SEMESTER_ID}/classes`,
            'class-2',
            classDoc({
                name: 'Retired Class',
                live: false,
                students: [new FirestoreRef('students/stu-b1')],
            })
        );
    }

    it('dedupes siblings and includes families of unlisted classes', async () => {
        await seedSiblingsAndOneOtherFamily();

        const { status, data } = await fetchAudience(
            {
                selector: { type: 'semester', semesterId: SEMESTER_ID },
                includeAllGuardians: false,
            },
            adminUser.idToken
        );

        expect(status).toBe(200);
        expect(data?.contacts.map((c) => c.email).sort()).toEqual([
            'amina@test.com',
            'bea@test.com',
        ]);
        // Three students collapsed to two addresses.
        expect(data?.totalBeforeDedupe).toBe(3);

        const amina = data?.contacts.find((c) => c.email === 'amina@test.com');
        expect(amina?.name).toBe('Amina Ahmed');
        expect(amina?.students.sort()).toEqual(['Abel Ahmed', 'Ada Ahmed']);
    });

    it('adds second guardians when asked for all guardian emails', async () => {
        await seedSiblingsAndOneOtherFamily();

        const { data } = await fetchAudience(
            {
                selector: { type: 'semester', semesterId: SEMESTER_ID },
                includeAllGuardians: true,
            },
            adminUser.idToken
        );

        expect(data?.contacts.map((c) => c.email).sort()).toEqual([
            'amina@test.com',
            'bea@test.com',
            'omar@test.com',
        ]);
    });

    it('scopes a class audience to that class', async () => {
        await seedSiblingsAndOneOtherFamily();

        const { data } = await fetchAudience(
            {
                selector: {
                    type: 'class',
                    semesterId: SEMESTER_ID,
                    classId: 'class-2',
                },
                includeAllGuardians: false,
            },
            adminUser.idToken
        );

        expect(data?.contacts.map((c) => c.email)).toEqual(['bea@test.com']);
    });

    it('counts students with no email on file rather than emitting blanks', async () => {
        await setFirestoreDoc('students', 'stu-c1', {
            first_name: 'Cal',
            last_name: 'Cruz',
            primary_first_name: 'Cam',
            primary_last_name: 'Cruz',
            primary_email: '',
            guardians: [],
        });
        await setFirestoreDoc(
            `semesters/${SEMESTER_ID}/classes`,
            'class-3',
            classDoc({ students: [new FirestoreRef('students/stu-c1')] })
        );

        const { data } = await fetchAudience(
            {
                selector: { type: 'semester', semesterId: SEMESTER_ID },
                includeAllGuardians: false,
            },
            adminUser.idToken
        );

        expect(data?.contacts).toEqual([]);
        expect(data?.studentsWithoutEmail).toBe(1);
    });

    it('windows a recent-years audience by enrollment date', async () => {
        await setFirestoreDoc('students', 'stu-d1', {
            first_name: 'Dee',
            last_name: 'Diaz',
            primary_first_name: 'Dani',
            primary_last_name: 'Diaz',
            primary_email: 'dani@test.com',
            guardians: [],
        });

        const recent = new Date();
        recent.setMonth(recent.getMonth() - 3);
        const longAgo = new Date();
        longAgo.setFullYear(longAgo.getFullYear() - 5);

        await setFirestoreDoc('enrollment', 'enr-recent', {
            status: 'enrolled',
            studentId: 'stu-d1',
            studentName: 'Dee Diaz',
            contactEmail: 'dani@test.com',
            timestamp: new FirestoreTimestamp(recent),
        });
        await setFirestoreDoc('enrollment', 'enr-old', {
            status: 'enrolled',
            // Legacy shape: no studentId, only the checkout address.
            studentName: 'Old Student',
            contactEmail: 'old@test.com',
            timestamp: new FirestoreTimestamp(longAgo),
        });

        const { data } = await fetchAudience(
            {
                selector: { type: 'recentYears', years: 2 },
                includeAllGuardians: false,
            },
            adminUser.idToken
        );

        expect(data?.contacts.map((c) => c.email)).toEqual(['dani@test.com']);
    });

    it('keeps legacy enrollments that predate studentId', async () => {
        const recent = new Date();
        recent.setMonth(recent.getMonth() - 1);

        await setFirestoreDoc('enrollment', 'enr-legacy', {
            status: 'enrolled',
            studentName: 'Legacy Student',
            contactEmail: 'legacy@test.com',
            timestamp: new FirestoreTimestamp(recent),
        });

        const { data } = await fetchAudience(
            {
                selector: { type: 'recentYears', years: 2 },
                includeAllGuardians: false,
            },
            adminUser.idToken
        );

        expect(data?.contacts).toEqual([
            {
                name: '',
                email: 'legacy@test.com',
                students: ['Legacy Student'],
            },
        ]);
    });

    it('rejects non-admin callers', async () => {
        const { status } = await fetchAudience(
            {
                selector: { type: 'allTime' },
                includeAllGuardians: false,
            },
            nonAdminUser.idToken
        );

        expect(status).toBe(403);
    });
});
