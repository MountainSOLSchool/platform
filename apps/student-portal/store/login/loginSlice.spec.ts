import { selectValidationErrors } from './loginSlice';

// Pins the student-portal login validation (skipWhen until the first
// attempt) across vest upgrades.
describe('selectValidationErrors', () => {
    const errorsFor = (
        email: string,
        password: string,
        hasTriedToLogInOnce: boolean
    ) =>
        selectValidationErrors.resultFunc(email, password, hasTriedToLogInOnce);

    it('shows nothing before the first login attempt', () => {
        expect(errorsFor('', '', false)).toEqual({ email: '', password: '' });
    });

    it('shows required-field errors after an attempt', () => {
        expect(errorsFor('', '', true)).toMatchSnapshot();
        expect(errorsFor('user@example.test', '', true)).toMatchSnapshot();
        expect(errorsFor('user@example.test', 'secret', true)).toEqual({
            email: '',
            password: '',
        });
    });
});
