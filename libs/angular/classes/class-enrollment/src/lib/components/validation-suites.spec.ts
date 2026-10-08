import { createCheckoutSuite } from './checkout/checkout.suite';
import { createInfoSuite } from './info/info.suite';
import { createMedicalSuite } from './medical/medical.suite';
import { createReleasesSuite } from './releases/releases.suite';
import { createSelectStudentSuite } from './select-student/select-student.suite';

// Pins the enrollment-step validation behaviour so a vest upgrade can't
// change it silently. `run` accepts both the vest 5 callable suite and the
// vest 6 `suite.run()` API, so these specs stay unchanged across the upgrade.
type AnyResult = {
    getErrors(): Record<string, string[]>;
    getErrorsByGroup(group: string): Record<string, string[]>;
    isValid(): boolean;
    groups: Record<string, unknown>;
};

type Callable = (...args: unknown[]) => AnyResult;
type Runnable = { run: (...args: unknown[]) => AnyResult };
const run = (suite: unknown, ...args: unknown[]): AnyResult =>
    typeof suite === 'function'
        ? (suite as Callable)(...args)
        : (suite as Runnable).run(...args);

const summarize = (result: AnyResult) => ({
    valid: result.isValid(),
    errors: result.getErrors(),
    groups: Object.keys(result.groups ?? {}).sort(),
    byGroup: Object.fromEntries(
        Object.keys(result.groups ?? {})
            .sort()
            .map((group) => [group, result.getErrorsByGroup(group)])
    ),
});

const upToDate = { isOutOfDate: false, accuracyConfirmations: {} };
const outOfDate = { isOutOfDate: true, accuracyConfirmations: {} };

const completeStudent = {
    firstName: 'Test',
    lastName: 'Student',
    birthdate: '2015-01-01',
    pronouns: 'they/them',
    school: 'Test School',
    tshirtSize: 'YM',
    contactFirstName: 'Test',
    contactLastName: 'Contact',
    contactEmail: 'contact@example.test',
    contactPhone: '555-0100',
    address: '1 Test Way',
    city: 'Testville',
    state: 'TS',
    zip: '00000',
    photography: true,
    deetBugspray: false,
    naturalBugspray: true,
    sunscreen: true,
    guardians: [
        {
            guardianName: 'Guardian A',
            guardianEmail: 'a@example.test',
            guardianPhone: '555-0101',
            guardianRelationship: 'Parent',
            guardianResidesWithStudent: true,
        },
    ],
    pickupCodeword: 'codeword',
    authorizedForPickup: [
        { name: 'Pickup A', relationship: 'Aunt', phone: '555-0102' },
    ],
    emergencyContacts: [
        { name: 'Contact A', phone: '555-0103', relationship: 'Uncle' },
    ],
    weightImperial: '60',
    heightFeet: '4',
    heightInches: '2',
    doctorName: 'Dr Test',
    doctorPhone: '555-0104',
    insuranceCompany: 'Test Insurance',
    insuranceId: 'TEST-1',
    hasLifeThreateningAllergies: false,
    medications: [{ name: 'Med A', dosage: '1 tab', doctor: 'Dr Test' }],
    authorizedToAdministerMedication: 'yes',
};

describe('checkout suite', () => {
    it('requires a payment method', () => {
        const suite = createCheckoutSuite();
        expect(
            summarize(run(suite, { hasPaymentMethod: false }))
        ).toMatchSnapshot();
        expect(
            summarize(run(suite, { hasPaymentMethod: true }))
        ).toMatchSnapshot();
    });
});

describe('info suite', () => {
    it('reports every missing field, grouped', () => {
        expect(
            summarize(run(createInfoSuite(), {}, upToDate))
        ).toMatchSnapshot();
    });

    it('passes a complete, up-to-date student', () => {
        expect(
            summarize(run(createInfoSuite(), completeStudent, upToDate))
        ).toMatchSnapshot();
    });

    it('accepts the Date the birthdate datepicker stores', () => {
        const suite = createInfoSuite();
        const withDate = {
            ...completeStudent,
            birthdate: new Date(2015, 0, 1),
        };
        expect(summarize(run(suite, withDate, upToDate)).valid).toBe(true);
        expect(
            run(
                suite,
                { ...completeStudent, birthdate: '  ' },
                upToDate
            ).getErrors()['birthdate']
        ).toEqual(['Birthdate is required']);
        expect(
            run(
                suite,
                { ...completeStudent, birthdate: null },
                upToDate
            ).getErrors()['birthdate']
        ).toEqual(['Birthdate is required']);
    });

    it('requires accuracy confirmations only when the record is out of date', () => {
        const suite = createInfoSuite();
        expect(
            summarize(run(suite, completeStudent, outOfDate))
        ).toMatchSnapshot();
        expect(
            summarize(
                run(suite, completeStudent, {
                    isOutOfDate: true,
                    accuracyConfirmations: { student: true, contact: true },
                })
            )
        ).toMatchSnapshot();
    });

    it('drops a removed guardian/pickup entry on the next run (stateful suite)', () => {
        const suite = createInfoSuite();
        const twoIncomplete = {
            ...completeStudent,
            guardians: [completeStudent.guardians[0], { guardianName: '' }],
            authorizedForPickup: [
                completeStudent.authorizedForPickup[0],
                { name: '' },
            ],
        };
        expect(
            summarize(run(suite, twoIncomplete, upToDate))
        ).toMatchSnapshot();
        expect(
            summarize(run(suite, completeStudent, upToDate))
        ).toMatchSnapshot();
    });

    it('keeps instances independent', () => {
        const a = createInfoSuite();
        const b = createInfoSuite();
        run(a, {}, upToDate);
        expect(summarize(run(b, completeStudent, upToDate)).valid).toBe(true);
    });
});

describe('medical suite', () => {
    it('reports every missing field, including the nested medications group', () => {
        expect(
            summarize(
                run(
                    createMedicalSuite(),
                    { emergencyContacts: [{}], medications: [{}] },
                    upToDate
                )
            )
        ).toMatchSnapshot();
    });

    it('passes a complete student', () => {
        expect(
            summarize(run(createMedicalSuite(), completeStudent, upToDate))
        ).toMatchSnapshot();
    });

    it('drops a removed medication on the next run (stateful suite)', () => {
        const suite = createMedicalSuite();
        const withBlankMedication = {
            ...completeStudent,
            medications: [completeStudent.medications[0], { name: '' }],
        };
        expect(
            summarize(run(suite, withBlankMedication, outOfDate))
        ).toMatchSnapshot();
        expect(
            summarize(run(suite, completeStudent, upToDate))
        ).toMatchSnapshot();
    });
});

describe('releases suite', () => {
    const signed = (name: string) => ({ name, signature: 'Signed Name' });

    it('requires both release signatures', () => {
        const suite = createReleasesSuite();
        expect(
            summarize(run(suite, { releaseSignatures: [] }))
        ).toMatchSnapshot();
        expect(
            summarize(
                run(suite, {
                    releaseSignatures: [signed('MEDICAL_RELEASE_FALL_2023')],
                })
            )
        ).toMatchSnapshot();
        expect(
            summarize(
                run(suite, {
                    releaseSignatures: [
                        signed('MEDICAL_RELEASE_FALL_2023'),
                        signed('LIABILITY_RELEASE_FALL_2023'),
                    ],
                })
            )
        ).toMatchSnapshot();
    });
});

describe('select-student suite', () => {
    it('requires a choice, then a student only for existing students (omitWhen)', () => {
        const suite = createSelectStudentSuite();
        expect(
            summarize(run(suite, { isStudentNew: undefined }))
        ).toMatchSnapshot();
        expect(
            summarize(run(suite, { isStudentNew: false }))
        ).toMatchSnapshot();
        // Switching to "new student" must clear the omitted selection error.
        expect(summarize(run(suite, { isStudentNew: true }))).toMatchSnapshot();
        expect(
            summarize(
                run(suite, {
                    isStudentNew: false,
                    student: { id: 'student-1' },
                })
            )
        ).toMatchSnapshot();
    });
});
