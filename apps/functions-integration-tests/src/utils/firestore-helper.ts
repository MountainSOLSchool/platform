import { EMULATOR_CONFIG } from './emulator-config';

const FIRESTORE_URL = `http://${EMULATOR_CONFIG.firestoreHost}`;

export class FirestoreRef {
    constructor(public readonly path: string) {}
}

export class FirestoreTimestamp {
    constructor(public readonly date: Date) {}
}

export async function clearFirestoreEmulator(): Promise<void> {
    const url = `${FIRESTORE_URL}/emulator/v1/projects/${EMULATOR_CONFIG.projectId}/databases/(default)/documents`;
    await fetch(url, { method: 'DELETE' });
}

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
