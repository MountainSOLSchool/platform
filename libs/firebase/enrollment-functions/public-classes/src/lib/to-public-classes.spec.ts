import { SemesterClass } from '@sol/classes/domain';
import {
    toDayNames,
    toEasternDate,
    toPublicClass,
    toPublicSemester,
} from './to-public-classes';

const semesterClass: SemesterClass = {
    id: 'c1',
    title: 'Winter Tree Identification',
    startMs: Date.UTC(2027, 0, 4, 5),
    endMs: Date.UTC(2027, 2, 5, 5),
    registrationEndMs: Date.UTC(2027, 2, 4, 5),
    classType: 'Winter Workshop',
    gradeRangeStart: 2,
    gradeRangeEnd: 12,
    description: 'Learn trees by their bark.\n',
    cost: 105,
    paymentRange: { lowest: 105, highest: 165 },
    location: 'Mountain SOL Campus at MLA',
    instructors: [{ firstName: 'Ada', lastName: 'Example' }],
    dailyTimes: '4pm-5:30pm',
    weekday: 'Tu',
    thumbnailUrl: 'https://example.com/t.png',
    enrolledCount: 7,
    live: true,
    pausedForEnrollment: false,
    studentIds: ['student-1', 'student-2'],
    semesterId: 'winter2027',
    forInformationOnly: false,
    unitIds: ['u1'],
    additionalOptions: [
        { id: 'o1', description: 'Lunch', cost: 5, studentsIds: ['student-1'] },
    ],
};

describe('toPublicClass', () => {
    it('keeps only public fields', () => {
        expect(toPublicClass(semesterClass)).toEqual({
            id: 'c1',
            title: 'Winter Tree Identification',
            classType: 'Winter Workshop',
            days: ['Tuesday'],
            dailyTimes: '4pm-5:30pm',
            startDate: '2027-01-04',
            endDate: '2027-03-05',
            registrationEndDate: '2027-03-04',
            gradeRangeStart: 2,
            gradeRangeEnd: 12,
            location: 'Mountain SOL Campus at MLA',
            cost: 105,
            paymentRange: { lowest: 105, highest: 165 },
            description: 'Learn trees by their bark.',
            full: false,
            forInformationOnly: false,
        });
    });

    it('never includes students, instructors or counts', () => {
        const json = JSON.stringify(
            toPublicSemester(
                { id: 's', name: 'Winter 2027' },
                [semesterClass],
                [{ id: 'g', name: 'Group', cost: 1, classes: [semesterClass] }]
            )
        );
        for (const secret of [
            'student-1',
            'Ada',
            'Example',
            'enrolledCount',
            'studentIds',
            'unitIds',
            'Lunch',
        ]) {
            expect(json).not.toContain(secret);
        }
    });

    it('uses null when there is no sliding scale', () => {
        const { paymentRange, ...rest } = semesterClass;
        expect(paymentRange).toBeDefined();
        expect(toPublicClass(rest).paymentRange).toBeNull();
    });
});

describe('toDayNames', () => {
    it.each([
        ['M', ['Monday']],
        ['Th', ['Thursday']],
        ['Tu, Th', ['Tuesday', 'Thursday']],
        ['M-F', ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']],
        ['M-W', ['Monday', 'Tuesday', 'Wednesday']],
        ['Weekends', ['Saturday', 'Sunday']],
        ['', []],
    ])('%s', (weekday, expected) => {
        expect(toDayNames(weekday)).toEqual(expected);
    });
});

describe('toEasternDate', () => {
    it('keeps the Eastern calendar day', () => {
        expect(toEasternDate(Date.UTC(2027, 0, 4, 4, 59))).toBe('2027-01-03');
        expect(toEasternDate(Date.UTC(2027, 0, 4, 5))).toBe('2027-01-04');
    });
    it('returns empty for a missing date', () => {
        expect(toEasternDate(0)).toBe('');
    });
});
