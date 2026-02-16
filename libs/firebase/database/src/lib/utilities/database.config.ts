import admin from 'firebase-admin';

if (admin.apps.length === 0) {
    admin.initializeApp();
}
export const db = admin.firestore();

const useEmulator = !!process.env['FIRESTORE_EMULATOR_HOST'];
db.settings({ ignoreUndefinedProperties: true, preferRest: !useEmulator });
