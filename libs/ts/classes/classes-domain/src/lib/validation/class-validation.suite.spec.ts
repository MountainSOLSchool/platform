import {
    classValidationSuite,
    validateClassForPublish,
} from './class-validation.suite';

// Pins class validation (shared by the admin class form and the
// create-class / update-class Cloud Functions) across vest upgrades. `run`
// accepts both the vest 5 callable suite and the vest 6 `suite.run()` API.
type AnyResult = {
    getErrors(): Record<string, string[]>;
    isValid(): boolean;
};
type Callable = (...args: unknown[]) => AnyResult;
type Runnable = { run: (...args: unknown[]) => AnyResult };
const run = (suite: unknown, ...args: unknown[]): AnyResult =>
    typeof suite === 'function'
        ? (suite as Callable)(...args)
        : (suite as Runnable).run(...args);

const completeClass = {
    semesterId: 'semester-1',
    name: 'Test Class',
    classType: 'standard',
    startDate: '2026-01-05',
    endDate: '2026-03-30',
    registrationEndDate: '2026-01-01',
    weekday: 'Monday',
    dailyTimes: '9:00 AM - 12:00 PM',
    location: 'Room A',
    instructorIds: ['instructor-1'],
};

describe('validateClassForPublish', () => {
    it('lists every missing field for an empty class', () => {
        expect(validateClassForPublish({})).toMatchSnapshot();
    });

    it('accepts a complete class', () => {
        expect(validateClassForPublish(completeClass)).toEqual({
            valid: true,
            errors: [],
        });
    });

    it('treats a whitespace-only name and no instructors as missing', () => {
        expect(
            validateClassForPublish({
                ...completeClass,
                name: '   ',
                instructorIds: [],
            })
        ).toMatchSnapshot();
    });

    it('does not leak state between calls (one suite serves every request)', () => {
        expect(validateClassForPublish({}).valid).toBe(false);
        expect(validateClassForPublish(completeClass).valid).toBe(true);
        expect(
            validateClassForPublish({ ...completeClass, location: '' })
        ).toMatchSnapshot();
        expect(validateClassForPublish(completeClass).valid).toBe(true);
    });
});

describe('classValidationSuite', () => {
    it('full runs replace the previous result', () => {
        expect(run(classValidationSuite, {}).getErrors()).toMatchSnapshot();
        expect(run(classValidationSuite, completeClass).getErrors()).toEqual(
            {}
        );
    });

    it('focused runs (field argument) keep earlier results for other fields', () => {
        // Not used by any caller today, but the suite supports it.
        run(classValidationSuite, {});
        const focused = run(
            classValidationSuite,
            { name: 'Test Class' },
            'name'
        );
        expect({
            errors: focused.getErrors(),
            valid: focused.isValid(),
        }).toMatchSnapshot();
        run(classValidationSuite, completeClass);
    });
});
