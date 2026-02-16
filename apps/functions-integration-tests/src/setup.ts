import { EMULATOR_CONFIG } from './utils';

jest.setTimeout(30000);

beforeAll(async () => {
    const checks = [
        {
            name: 'Functions',
            url: `${EMULATOR_CONFIG.functionsHost}`,
        },
        {
            name: 'Firestore',
            url: `http://${EMULATOR_CONFIG.firestoreHost}`,
        },
        {
            name: 'Auth',
            url: `http://${EMULATOR_CONFIG.authHost}`,
        },
    ];

    for (const check of checks) {
        try {
            await fetch(check.url);
        } catch {
            throw new Error(
                `${check.name} emulator is not running at ${check.url}. ` +
                    'Start emulators with: firebase emulators:start --project=dev --only auth,firestore,functions'
            );
        }
    }
});
