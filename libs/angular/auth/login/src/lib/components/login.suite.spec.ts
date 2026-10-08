import { loginSuite } from './login.suite';

// Pins login validation across vest upgrades. `run` accepts both the vest 5
// callable suite and the vest 6 `suite.run()` API.
type AnyResult = { getErrors(): Record<string, string[]>; isValid(): boolean };
type Callable = (...args: unknown[]) => AnyResult;
type Runnable = { run: (...args: unknown[]) => AnyResult };
const run = (suite: unknown, ...args: unknown[]): AnyResult =>
    typeof suite === 'function'
        ? (suite as Callable)(...args)
        : (suite as Runnable).run(...args);

describe('loginSuite', () => {
    it('requires email and password, and clears errors once filled', () => {
        expect(
            run(loginSuite, { email: '', password: '' }).getErrors()
        ).toMatchSnapshot();
        expect(
            run(loginSuite, {
                email: 'user@example.test',
                password: '',
            }).getErrors()
        ).toMatchSnapshot();
        const filled = run(loginSuite, {
            email: 'user@example.test',
            password: 'secret',
        });
        expect({
            errors: filled.getErrors(),
            valid: filled.isValid(),
        }).toMatchSnapshot();
    });
});
