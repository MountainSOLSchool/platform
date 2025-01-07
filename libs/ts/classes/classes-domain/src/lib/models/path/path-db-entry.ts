export interface PathDbEntry {
    id: string;
    name: string;
    description: string;
    // it's an array of Firestore.DocumentReference, but that can't class can't be imported here
    requirements?: Array<unknown>;
    electives?: Array<{
        name: string;
        // it's an array of Firestore.DocumentReference, but that can't class can't be imported here
        options: Array<unknown>;
    }>;
}
