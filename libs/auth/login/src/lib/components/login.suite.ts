import { create, test, enforce } from 'vest';

export const loginSuite = create(
    'login',
    (data: { email: string; password: string }) => {
        test('email', 'Email is required', () => {
            enforce(data.email).isNotEmpty();
        });

        test('password', 'Password is required', () => {
            enforce(data.password).isNotEmpty();
        });
    }
);
