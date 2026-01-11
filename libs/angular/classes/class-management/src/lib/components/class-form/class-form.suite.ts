import { create, test, enforce } from 'vest';

export interface ClassFormData {
    semesterId: string;
    name: string;
    classType: string;
    startDate: Date | null;
    endDate: Date | null;
    registrationEndDate: Date | null;
    weekday: string;
    dailyTimes: string;
    location: string;
    instructorIds: string[];
}

export const classFormSuite = create('classForm', (data: ClassFormData) => {
    test('semesterId', 'Semester is required', () => {
        enforce(data.semesterId).isNotEmpty();
    });

    test('name', 'Class name is required', () => {
        enforce(data.name?.trim()).isNotEmpty();
    });

    test('classType', 'Class type is required', () => {
        enforce(data.classType).isNotEmpty();
    });

    test('startDate', 'Start date is required', () => {
        enforce(data.startDate).isNotNull();
    });

    test('endDate', 'End date is required', () => {
        enforce(data.endDate).isNotNull();
    });

    test('registrationEndDate', 'Registration end date is required', () => {
        enforce(data.registrationEndDate).isNotNull();
    });

    test('weekday', 'Day(s) of week is required', () => {
        enforce(data.weekday).isNotEmpty();
    });

    test('dailyTimes', 'Time is required', () => {
        enforce(data.dailyTimes).isNotEmpty();
    });

    test('location', 'Location is required', () => {
        enforce(data.location).isNotEmpty();
    });

    test('instructorIds', 'At least one instructor is required', () => {
        enforce(data.instructorIds?.length).greaterThan(0);
    });
});
