import { db } from './database.config';

// Cold-start warmup of the Firestore connection — RUNTIME ONLY.
// Guarded on K_SERVICE (set only in the deployed Cloud Run runtime) so it
// never runs during Firebase's deploy-time function discovery or locally,
// where the Admin SDK has no usable credentials. Fire-and-forget: not awaited
// and errors are swallowed, so it can never block or break module load.
if (process.env['K_SERVICE']) {
    void db
        .collection('config')
        .doc('activeSemester')
        .get()
        .catch(() => undefined);
}

export {};
