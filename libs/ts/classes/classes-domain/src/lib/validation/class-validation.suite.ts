import { create, test, enforce, only } from 'vest';

export interface ClassValidationData {
    semesterId?: string;
    name?: string;
    classType?: string;
    startDate?: string | Date | null;
    endDate?: string | Date | null;
    registrationEndDate?: string | Date | null;
    weekday?: string;
    dailyTimes?: string;
    location?: string;
    instructorIds?: string[];
}

export const classValidationSuite = create(
    'class',
    (data: ClassValidationData, fieldToValidate?: string) => {
        if (fieldToValidate) {
            only(fieldToValidate);
        }

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
            enforce(data.startDate).isNotNullish();
        });

        test('endDate', 'End date is required', () => {
            enforce(data.endDate).isNotNullish();
        });

        test('registrationEndDate', 'Registration end date is required', () => {
            enforce(data.registrationEndDate).isNotNullish();
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
            enforce(data.instructorIds?.length ?? 0).greaterThan(0);
        });
    }
);

export function validateClassForPublish(
    data: ClassValidationData
): { valid: boolean; errors: string[] } {
    const result = classValidationSuite(data);
    const errors = result.getErrors();

    const allErrors: string[] = [];
    for (const field of Object.keys(errors)) {
        allErrors.push(...errors[field]);
    }

    return {
        valid: result.isValid(),
        errors: allErrors,
    };
}
