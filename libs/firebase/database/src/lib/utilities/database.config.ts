import * as admin from 'firebase-admin';

if (admin.apps.length === 0) {
    admin.initializeApp();
}
export const db = admin.firestore();

db.settings({ ignoreUndefinedProperties: true });
