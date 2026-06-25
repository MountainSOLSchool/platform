/**
 * Self-contained Firebase emulator helpers for the enrollment-portal e2e suite.
 *
 * These are faithful copies of the REST helpers used by the functions
 * integration tests (apps/functions-integration-tests/src/utils). They are
 * duplicated here so the e2e project does not depend on the integration-tests
 * app. Seeding uses the Firestore/Auth emulator REST APIs (no firebase-admin).
 */

export const EMULATOR_CONFIG = {
    projectId: 'mountain-sol-platform',
    functionsHost: 'http://localhost:5001',
    firestoreHost: 'localhost:8080',
    authHost: 'localhost:9099',
    region: 'us-central1',
    origin: 'http://localhost:4200',
} as const;

// Honor the standard Firebase emulator env vars when present (e.g. CI that
// runs the emulators on non-default ports), falling back to EMULATOR_CONFIG.
const firestoreHost =
    process.env['FIRESTORE_EMULATOR_HOST'] ?? EMULATOR_CONFIG.firestoreHost;
const authHost =
    process.env['FIREBASE_AUTH_EMULATOR_HOST'] ?? EMULATOR_CONFIG.authHost;

const FIRESTORE_URL = `http://${firestoreHost}`;
const AUTH_EMULATOR_URL = `http://${authHost}`;

// ─── Firestore value wrappers ───────────────────────────────────────────────

/** Wrap a value so it is encoded as a Firestore document reference. */
export class FirestoreRef {
    constructor(public readonly path: string) {}
}

/** Wrap a Date so it is encoded as a Firestore timestamp. */
export class FirestoreTimestamp {
    constructor(public readonly date: Date) {}
}

// ─── Auth emulator ──────────────────────────────────────────────────────────

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
        throw new Error(`Failed to create test user: ${await response.text()}`);
    }

    const data = (await response.json()) as {
        localId: string;
        idToken: string;
    };

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

    const data = (await response.json()) as {
        localId: string;
        idToken: string;
    };
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

// ─── Firestore emulator ─────────────────────────────────────────────────────

export async function clearFirestoreEmulator(): Promise<void> {
    const url = `${FIRESTORE_URL}/emulator/v1/projects/${EMULATOR_CONFIG.projectId}/databases/(default)/documents`;
    await fetch(url, { method: 'DELETE' });
}

/**
 * Create or overwrite a Firestore document at `${collectionPath}/${docId}`
 * using the emulator REST API. `data` is a plain object; use FirestoreRef /
 * FirestoreTimestamp wrappers for references and timestamps.
 */
export async function setFirestoreDoc(
    collectionPath: string,
    docId: string,
    data: Record<string, unknown>
): Promise<void> {
    const url = `${FIRESTORE_URL}/v1/projects/${EMULATOR_CONFIG.projectId}/databases/(default)/documents/${collectionPath}/${docId}`;

    const fields = convertToFirestoreFields(data);

    const response = await fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer owner',
        },
        body: JSON.stringify({ fields }),
    });

    if (!response.ok) {
        throw new Error(
            `Failed to set Firestore doc ${collectionPath}/${docId}: ${await response.text()}`
        );
    }
}

/**
 * Add a document to a collection with an auto-generated ID. Returns the new id.
 * Mirrors `collection.add()` semantics, which several functions rely on
 * (e.g. discounts, enrollment).
 */
export async function addFirestoreDoc(
    collectionPath: string,
    data: Record<string, unknown>
): Promise<string> {
    const url = `${FIRESTORE_URL}/v1/projects/${EMULATOR_CONFIG.projectId}/databases/(default)/documents/${collectionPath}`;

    const fields = convertToFirestoreFields(data);

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer owner',
        },
        body: JSON.stringify({ fields }),
    });

    if (!response.ok) {
        throw new Error(
            `Failed to add Firestore doc to ${collectionPath}: ${await response.text()}`
        );
    }

    const body = (await response.json()) as { name: string };
    return body.name.split('/').pop()!;
}

/** Read a single document back, returning decoded plain fields (or null). */
export async function getFirestoreDoc(
    path: string
): Promise<Record<string, unknown> | null> {
    const url = `${FIRESTORE_URL}/v1/projects/${EMULATOR_CONFIG.projectId}/databases/(default)/documents/${path}`;
    const response = await fetch(url, {
        headers: { Authorization: 'Bearer owner' },
    });
    if (!response.ok) return null;
    const body = (await response.json()) as {
        fields?: Record<string, unknown>;
    };
    return body.fields ? parseFirestoreFields(body.fields) : null;
}

/** List a collection, returning each doc's id and decoded plain fields. */
export async function listFirestoreCollection(
    path: string
): Promise<Array<{ id: string; fields: Record<string, unknown> }>> {
    const url = `${FIRESTORE_URL}/v1/projects/${EMULATOR_CONFIG.projectId}/databases/(default)/documents/${path}`;
    const response = await fetch(url, {
        headers: { Authorization: 'Bearer owner' },
    });
    if (!response.ok) return [];
    const body = (await response.json()) as {
        documents?: Array<{ name: string; fields?: Record<string, unknown> }>;
    };
    return (body.documents ?? []).map((doc) => ({
        id: doc.name.split('/').pop()!,
        fields: doc.fields ? parseFirestoreFields(doc.fields) : {},
    }));
}

/** Delete every document in a (top-level) collection via the REST API. */
export async function deleteFirestoreCollection(path: string): Promise<void> {
    const docs = await listFirestoreCollection(path);
    await Promise.all(
        docs.map(({ id }) => {
            const url = `${FIRESTORE_URL}/v1/projects/${EMULATOR_CONFIG.projectId}/databases/(default)/documents/${path}/${id}`;
            return fetch(url, {
                method: 'DELETE',
                headers: { Authorization: 'Bearer owner' },
            });
        })
    );
}

// ─── Firestore field encoding/decoding ──────────────────────────────────────

function convertToFirestoreFields(
    data: Record<string, unknown>
): Record<string, unknown> {
    const fields: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(data)) {
        fields[key] = convertValue(value);
    }
    return fields;
}

function convertValue(value: unknown): unknown {
    if (value === null || value === undefined) {
        return { nullValue: null };
    }
    if (value instanceof FirestoreRef) {
        return {
            referenceValue: `projects/${EMULATOR_CONFIG.projectId}/databases/(default)/documents/${value.path}`,
        };
    }
    if (value instanceof FirestoreTimestamp) {
        return { timestampValue: value.date.toISOString() };
    }
    if (value instanceof Date) {
        return { timestampValue: value.toISOString() };
    }
    if (typeof value === 'string') {
        return { stringValue: value };
    }
    if (typeof value === 'number') {
        if (Number.isInteger(value)) {
            return { integerValue: String(value) };
        }
        return { doubleValue: value };
    }
    if (typeof value === 'boolean') {
        return { booleanValue: value };
    }
    if (Array.isArray(value)) {
        return {
            arrayValue: {
                values: value.map(convertValue),
            },
        };
    }
    if (typeof value === 'object') {
        return {
            mapValue: {
                fields: convertToFirestoreFields(
                    value as Record<string, unknown>
                ),
            },
        };
    }
    return { stringValue: String(value) };
}

function parseFirestoreFields(
    fields: Record<string, unknown>
): Record<string, unknown> {
    const result: Record<string, unknown> = {};
    for (const [key, wrapper] of Object.entries(fields)) {
        result[key] = parseFirestoreValue(wrapper);
    }
    return result;
}

function parseFirestoreValue(wrapper: unknown): unknown {
    if (!wrapper || typeof wrapper !== 'object') return wrapper;
    const w = wrapper as Record<string, unknown>;
    if ('stringValue' in w) return w.stringValue;
    if ('integerValue' in w) return Number(w.integerValue);
    if ('doubleValue' in w) return w.doubleValue;
    if ('booleanValue' in w) return w.booleanValue;
    if ('nullValue' in w) return null;
    if ('referenceValue' in w) return w.referenceValue;
    if ('timestampValue' in w) return w.timestampValue;
    if ('arrayValue' in w) {
        const arr = w.arrayValue as { values?: unknown[] };
        return (arr.values ?? []).map(parseFirestoreValue);
    }
    if ('mapValue' in w) {
        const map = w.mapValue as { fields?: Record<string, unknown> };
        return map.fields ? parseFirestoreFields(map.fields) : {};
    }
    return wrapper;
}
