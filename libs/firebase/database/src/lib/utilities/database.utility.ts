import {
    DocumentReference,
    Timestamp,
    CollectionReference,
    DocumentData,
    QueryDocumentSnapshot,
    FieldPath,
    WhereFilterOp,
    getFirestore,
} from 'firebase-admin/firestore';
import { getApps, initializeApp } from 'firebase-admin/app';

const apps = getApps();
const app = apps.length === 0 ? initializeApp() : apps[0];
const db = getFirestore(app);

db.settings({ ignoreUndefinedProperties: true });

type Collection = Array<DocumentProperty>;

type DocumentProperty = {
    [x: string]:
        | DocumentProperty
        | Collection
        | string
        | DocumentReference
        | Array<DocumentReference>
        | Timestamp
        | number
        | boolean
        | null;
};

export class DatabaseUtility {
    public static getDatabase() {
        return db;
    }

    public static async getDocumentRef(
        path: string
    ): Promise<DocumentReference> {
        return await db.doc(path);
    }

    public static async getCollectionRef(
        path: string
    ): Promise<CollectionReference> {
        return db.collection(path);
    }

    public static async getHydratedCollection(
        collectionRef: CollectionReference<DocumentData>
    ): Promise<{ [collectionName: string]: Collection }> {
        const collectionDocs = (await collectionRef.get()).docs;
        const docValues = await Promise.all(
            collectionDocs.map(async (doc) => {
                const fields = doc.data();
                const subCollectionRefs = await doc.ref.listCollections();
                const hydratedCollections = await Promise.all(
                    subCollectionRefs.map(
                        async (subCollectionRef) =>
                            await DatabaseUtility.getHydratedCollection(
                                subCollectionRef
                            )
                    )
                );
                const mergedCollections: {
                    [collectionName: string]: Array<DocumentData>;
                } = Object.assign({}, ...hydratedCollections);
                return {
                    id: doc.id,
                    ...fields,
                    ...mergedCollections,
                };
            })
        );
        return {
            [collectionRef.id]: docValues,
        };
    }

    public static async getHydratedDocuments<
        DocumentValue extends { id: string }
    >(
        documentRefs: Array<DocumentReference<DocumentData>>
    ): Promise<Array<DocumentValue>> {
        if (!documentRefs?.length) {
            return new Array<DocumentValue>();
        }
        return await Promise.all(
            documentRefs.map(async (documentRef) => {
                const fields = (await documentRef.get()).data();
                const collectionRefs = await documentRef.listCollections();

                const collectionsList: Array<{
                    [collectionName: string]: Array<DocumentData>;
                }> = await Promise.all(
                    collectionRefs.map(DatabaseUtility.getHydratedCollection)
                );

                const subCollectionsObject: {
                    [collectionName: string]: Array<DocumentData>;
                } = Object.assign({}, ...collectionsList);

                return {
                    id: documentRef.id,
                    ...fields,
                    ...subCollectionsObject,
                } as DocumentValue;
            })
        );
    }

    public static async fetchMatchingDocuments(
        collection: CollectionReference,
        ...queries: Array<
            [
                fieldPath: string | FieldPath,
                opString: WhereFilterOp,
                value: unknown
            ]
        >
    ): Promise<Array<QueryDocumentSnapshot>> {
        const queried = queries
            .slice(1)
            .reduce(
                (agg, q) => agg.where(...q),
                collection.where(...queries[0])
            );
        const documents = await queried.get();
        return documents.docs;
    }

    public static async fetchFirstMatchingDocument(
        collection: CollectionReference,
        ...queries: Array<[string | FieldPath, WhereFilterOp, string]>
    ): Promise<QueryDocumentSnapshot | undefined> {
        const documents = await DatabaseUtility.fetchMatchingDocuments(
            collection,
            ...queries
        );
        return documents[0];
    }
}
