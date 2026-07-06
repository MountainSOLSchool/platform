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
import { EMULATOR_CONFIG, getFunctionUrl } from '../utils/emulator-config';

const SEMESTER_ID = 'test-semester-roster';

const futureDate = new Date();
futureDate.setFullYear(futureDate.getFullYear() + 1);

const pastDate = new Date();
pastDate.setFullYear(pastDate.getFullYear() - 1);

// ─── Helpers ────────────────────────────────────────────────────────────────

// cost: 0 keeps enrollment free so the flow never touches Braintree.
function makeClassDoc(
    overrides: Record<string, unknown> = {}
): Record<string, unknown> {
    return {
        name: 'Roster Test Class',
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
        students: [],
        start: new FirestoreTimestamp(pastDate),
        end: new FirestoreTimestamp(futureDate),
        registration_end_date: new FirestoreTimestamp(futureDate),
        ...overrides,
    };
}

function makeStudentForm(overrides: Record<string, unknown> = {}) {
    return {
        firstName: 'Alex',
        lastName: 'Rivera',
        birthdate: '2015-01-01',
        pronouns: 'they/them',
        school: 'Test School',
        tshirtSize: 'M',
        notes: '',
        contactEmail: 'parent@test.com',
        contactFirstName: 'Parent',
        contactLastName: 'Rivera',
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
                guardianName: 'Parent Rivera',
                guardianRelationship: 'Parent',
                guardianPhone: '555-0100',
                guardianEmail: 'parent@test.com',
                guardianResidesWithStudent: true,
            },
        ],
        pickupCodeword: 'sunflower',
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
        ...overrides,
    };
}

async function enroll(
    classId: string,
    optionIds: string[],
    idToken: string
): Promise<{ status: number; success?: boolean }> {
    const result = await callFunction<unknown, { success?: boolean }>({
        functionName: 'enroll',
        data: {
            selectedClasses: [{ id: classId, semesterId: SEMESTER_ID }],
            student: makeStudentForm(),
            releaseSignatures: [],
            discountCodes: [],
            userCostsToSelectedClassIds: {},
            additionalOptionIdsByClassId: { [classId]: optionIds },
            expectedTotal: 0,
        },
        idToken,
    });
    return { status: result.status, success: result.data?.success };
}

async function fetchRosterHtml(
    classId: string,
    idToken: string
): Promise<{ status: number; html: string }> {
    const url = `${getFunctionUrl('roster')}?classId=${encodeURIComponent(
        classId
    )}&semesterId=${encodeURIComponent(SEMESTER_ID)}`;

    const response = await fetch(url, {
        headers: {
            Origin: EMULATOR_CONFIG.origin,
            Authorization: `Bearer ${idToken}`,
        },
    });

    const body = (await response.json()) as { data?: { html?: string } };
    return { status: response.status, html: body.data?.html ?? '' };
}

// ─── Tests ──────────────────────────────────────────────────────────────────

describe('Roster additional options (enroll → roster)', () => {
    let adminUser: TestUser;
    let enrollmentUser: TestUser;

    beforeAll(async () => {
        await clearAuthEmulator();
        adminUser = await createTestUser(ADMIN_USER.email, ADMIN_USER.password);
        enrollmentUser = await createTestUser(
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

    // Regression guard for the storage refactor (#185). Options moved from an
    // inline class field to an `additional_options` subcollection, but the
    // enrollment write path (addStudentToClass) only wrote to the subcollection
    // — so for classes whose options still live inline (the shape production
    // summer2026 classes have), a paid add-on like early dropoff was silently
    // dropped and never reached the roster.
    it('records an inline (legacy) option purchase onto the roster', async () => {
        await setFirestoreDoc(
            `semesters/${SEMESTER_ID}/classes`,
            'legacy-class',
            makeClassDoc({
                additional_options: [
                    {
                        id: 'opt-early-drop',
                        description: 'Early Dropoff',
                        cost: 0,
                        students: [],
                    },
                ],
            })
        );

        const enrolled = await enroll(
            'legacy-class',
            ['opt-early-drop'],
            enrollmentUser.idToken
        );
        expect(enrolled.status).toBe(200);
        expect(enrolled.success).toBe(true);

        const { status, html } = await fetchRosterHtml(
            'legacy-class',
            adminUser.idToken
        );
        expect(status).toBe(200);
        expect(html).toContain('Rivera');
        expect(html).toContain('Early Dropoff');
    });

    // End-to-end coverage of the current (subcollection) storage shape.
    it('records a subcollection option purchase onto the roster', async () => {
        await setFirestoreDoc(
            `semesters/${SEMESTER_ID}/classes`,
            'subcoll-class',
            makeClassDoc()
        );
        await setFirestoreDoc(
            `semesters/${SEMESTER_ID}/classes/subcoll-class/additional_options`,
            'opt-after-care',
            { description: 'After Care', cost: 0, students: [] }
        );

        const enrolled = await enroll(
            'subcoll-class',
            ['opt-after-care'],
            enrollmentUser.idToken
        );
        expect(enrolled.status).toBe(200);
        expect(enrolled.success).toBe(true);

        const { status, html } = await fetchRosterHtml(
            'subcoll-class',
            adminUser.idToken
        );
        expect(status).toBe(200);
        expect(html).toContain('Rivera');
        expect(html).toContain('After Care');
    });

    // An option nobody bought must not leak onto the roster.
    it('does not show an option the enrolled student did not purchase', async () => {
        await setFirestoreDoc(
            `semesters/${SEMESTER_ID}/classes`,
            'no-purchase-class',
            makeClassDoc({
                additional_options: [
                    {
                        id: 'opt-early-drop',
                        description: 'Early Dropoff',
                        cost: 0,
                        students: [],
                    },
                ],
            })
        );

        const enrolled = await enroll(
            'no-purchase-class',
            [],
            enrollmentUser.idToken
        );
        expect(enrolled.status).toBe(200);
        expect(enrolled.success).toBe(true);

        const { status, html } = await fetchRosterHtml(
            'no-purchase-class',
            adminUser.idToken
        );
        expect(status).toBe(200);
        expect(html).toContain('Rivera');
        expect(html).not.toContain('Early Dropoff');
    });
});
