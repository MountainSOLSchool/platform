import { EMULATOR_CONFIG } from './emulator-config';

const AUTH_EMULATOR_URL = `http://${EMULATOR_CONFIG.authHost}`;

export interface TestUser {
    uid: string;
    email: string;
    idToken: string;
}

export async function createTestUser(
    email: string,
    password: string
): Promise<TestUser> {
    const signUpUrl = `${AUTH_EMULATOR_URL}/identitytoolkit.googleapis.com/v1/accounts:signUp?key=fake-api-key`;

    const response = await fetch(signUpUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email,
            password,
            returnSecureToken: true,
        }),
    });

    if (!response.ok) {
        throw new Error(
            `Failed to create test user: ${await response.text()}`
        );
    }

    const data = await response.json();

    return {
        uid: data.localId,
        email,
        idToken: data.idToken,
    };
}

export async function signInTestUser(
    email: string,
    password: string
): Promise<TestUser> {
    const signInUrl = `${AUTH_EMULATOR_URL}/identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=fake-api-key`;

    const response = await fetch(signInUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email,
            password,
            returnSecureToken: true,
        }),
    });

    if (!response.ok) {
        throw new Error(
            `Failed to sign in test user: ${await response.text()}`
        );
    }

    const data = await response.json();
    return {
        uid: data.localId,
        email,
        idToken: data.idToken,
    };
}

export async function clearAuthEmulator(): Promise<void> {
    const url = `${AUTH_EMULATOR_URL}/emulator/v1/projects/${EMULATOR_CONFIG.projectId}/accounts`;
    await fetch(url, { method: 'DELETE' });
}
