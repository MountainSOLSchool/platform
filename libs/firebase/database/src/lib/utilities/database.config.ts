/**
 * Firebase Admin + Firestore configuration — LAZILY initialized.
 *
 * The Admin SDK is NOT initialized at module load. Eager init
 * (`admin.initializeApp(); export const db = admin.firestore()`) breaks
 * Firebase's deploy-time function discovery under Workload Identity
 * Federation: discovery loads this module, and resolving the keyless
 * external_account credential throws "Could not load the default
 * credentials" (firebase-admin can't consume the WIF ADC file), so only a
 * partial set of functions gets discovered/deployed. Lazy init means module
 * load touches no credentials; the SDK initializes on first real use.
 *
 * `db` stays a value-shaped export (via a Proxy) so existing call sites
 * (`db.collection(...)`) keep working unchanged.
 */
import admin from 'firebase-admin';

let dbInstance: FirebaseFirestore.Firestore | undefined;
let settingsApplied = false;

function ensureAdminInitialized(): void {
    if (admin.apps.length === 0) {
        admin.initializeApp();
    }
}

/** Lazily initialize and return the Firestore instance (cached). */
export function getDb(): FirebaseFirestore.Firestore {
    if (!dbInstance) {
        ensureAdminInitialized();
        dbInstance = admin.firestore();

        // settings() must run once, before any operation — guard so a
        // double-call (or post-use call) can't throw.
        if (!settingsApplied) {
            try {
                const useEmulator = !!process.env['FIRESTORE_EMULATOR_HOST'];
                dbInstance.settings({
                    ignoreUndefinedProperties: true,
                    preferRest: !useEmulator,
                });
            } catch {
                // Already applied / Firestore already in use — ignore.
            }
            settingsApplied = true;
        }
    }
    return dbInstance;
}

/**
 * Backwards-compatible value-shaped Firestore export. Resolves the real
 * instance lazily on first property access, so importing/loading this module
 * (e.g. during deploy-time discovery) never initializes the Admin SDK.
 */
export const db = new Proxy({} as FirebaseFirestore.Firestore, {
    get(_target, prop) {
        const real = getDb();
        const value = real[prop as keyof FirebaseFirestore.Firestore];
        return typeof value === 'function'
            ? (value as (...args: unknown[]) => unknown).bind(real)
            : value;
    },
});
