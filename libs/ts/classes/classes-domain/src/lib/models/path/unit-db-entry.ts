export interface UnitDbEntry {
    id: string;
    name: string;
    description: string;
    category: string;
    is_repeatable?: boolean;
    // it's an array of Firestore.DocumentReference, but that can't class can't be imported here
    prereqs?: Array<unknown>;
}
