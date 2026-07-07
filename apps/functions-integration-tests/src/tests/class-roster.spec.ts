import {
    createTestUser,
    clearAuthEmulator,
    clearFirestoreEmulator,
    setFirestoreDoc,
    FirestoreRef,
    FirestoreTimestamp,
} from '../utils';
import type { TestUser } from '../utils';
import { ADMIN_USER, NON_ADMIN_USER } from '../fixtures';
import { EMULATOR_CONFIG, getFunctionUrl } from '../utils/emulator-config';
import type { RosterStudent } from '@sol/ts/firebase/api-types';

const SEMESTER_ID = 'test-semester-class-roster';

const futureDate = new Date();
futureDate.setFullYear(futureDate.getFullYear() + 1);
const pastDate = new Date();
pastDate.setFullYear(pastDate.getFullYear() - 1);

async function fetchClassRoster(
    classId: string,
    idToken: string
): Promise<{ status: number; students: RosterStudent[] }> {
    const url = `${getFunctionUrl('classRoster')}?classId=${encodeURIComponent(
        classId
    )}&semesterId=${encodeURIComponent(SEMESTER_ID)}`;
    const response = await fetch(url, {
        headers: {
            Origin: EMULATOR_CONFIG.origin,
            Authorization: `Bearer ${idToken}`,
        },
    });
    const text = await response.text();
    let body: { data?: { students?: RosterStudent[] } } = {};
    try {
        body = JSON.parse(text);
    } catch {
        // non-JSON body (e.g. 403 "Unauthorized")
    }
    return { status: response.status, students: body.data?.students ?? [] };
}

describe('classRoster (structured roster for admin report)', () => {
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

    it('returns structured student facts incl. additional options, safety info', async () => {
        await setFirestoreDoc('students', 'stu-1', {
            first_name: 'Alex',
            last_name: 'Rivera',
            birth_date: new Date('2015-06-01').toISOString(),
            code_word: 'sunflower',
            allergies: 'peanuts',
            has_life_threatening_allergies: true,
            medications: [
                { name: 'EpiPen', dosage: 'as needed', doctor: 'Dr. T' },
            ],
            guardians: [
                {
                    first_name: 'Parent',
                    last_name: 'Rivera',
                    relationship: 'Parent',
                    phone: '555-0100',
                    email: 'parent@test.com',
                },
            ],
            authorized_pick_up_contacts: [
                {
                    first_name: 'Aunt',
                    last_name: 'Jo',
                    relationship: 'Aunt',
                    phone: '555-0200',
                    email: '',
                },
            ],
        });

        await setFirestoreDoc(`semesters/${SEMESTER_ID}/classes`, 'class-1', {
            name: 'Camo and Stealth',
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
            min_student_size: 5,
            instructors: [],
            students: [new FirestoreRef('students/stu-1')],
            start: new FirestoreTimestamp(pastDate),
            end: new FirestoreTimestamp(futureDate),
            registration_end_date: new FirestoreTimestamp(futureDate),
        });
        await setFirestoreDoc(
            `semesters/${SEMESTER_ID}/classes/class-1/additional_options`,
            'opt-1',
            {
                description: 'Additional hour before class, 8am-9am',
                cost: 25,
                students: [new FirestoreRef('students/stu-1')],
            }
        );

        const { status, students } = await fetchClassRoster(
            'class-1',
            adminUser.idToken
        );

        expect(status).toBe(200);
        expect(students).toHaveLength(1);
        const s = students[0];
        expect(s.firstName).toBe('Alex');
        expect(s.lastName).toBe('Rivera');
        expect(s.age).toBeGreaterThanOrEqual(10);
        expect(s.additionalOptions).toEqual([
            'Additional hour before class, 8am-9am',
        ]);
        expect(s.allergies).toBe('peanuts');
        expect(s.hasLifeThreateningAllergies).toBe(true);
        expect(s.medications).toEqual(['EpiPen (as needed)']);
        expect(s.codeWord).toBe('sunflower');
        expect(s.guardians).toEqual([
            {
                name: 'Parent Rivera',
                relationship: 'Parent',
                phone: '555-0100',
                email: 'parent@test.com',
            },
        ]);
        expect(s.authorizedPickUp[0].name).toBe('Aunt Jo');
    });

    it('rejects non-admin callers', async () => {
        const { status } = await fetchClassRoster(
            'class-1',
            nonAdminUser.idToken
        );
        expect(status).toBe(403);
    });
});
