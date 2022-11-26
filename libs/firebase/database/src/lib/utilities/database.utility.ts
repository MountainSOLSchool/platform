import * as admin from 'firebase-admin';
import { DocumentReference } from 'firebase-admin/firestore';
import * as functions from 'firebase-functions';

if (admin.apps.length === 0) {
    admin.initializeApp();
}
const db = admin.firestore(functions.config().firebase);

type Collection = Array<DocumentProperty>;

type DocumentProperty = {
    [x: string]:
        | DocumentProperty
        | Collection
        | string
        | FirebaseFirestore.DocumentReference
        | Array<FirebaseFirestore.DocumentReference>
        | FirebaseFirestore.Timestamp
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

    public static async getHydratedCollection(
        collectionRef: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>
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
                    [
                        collectionName: string
                    ]: Array<FirebaseFirestore.DocumentData>;
                } = Object.assign({}, ...hydratedCollections);
                return {
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
        documentRefs: Array<
            FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>
        >
    ): Promise<Array<DocumentValue>> {
        if (!documentRefs?.length) {
            return new Array<DocumentValue>();
        }
        return await Promise.all(
            documentRefs.map(async (documentRef) => {
                const fields = (await documentRef.get()).data();
                const collectionRefs = await documentRef.listCollections();

                const collectionsList: Array<{
                    [
                        collectionName: string
                    ]: Array<FirebaseFirestore.DocumentData>;
                }> = await Promise.all(
                    collectionRefs.map(DatabaseUtility.getHydratedCollection)
                );

                const subCollectionsObject: {
                    [
                        collectionName: string
                    ]: Array<FirebaseFirestore.DocumentData>;
                } = Object.assign({}, ...collectionsList);

                return {
                    id: documentRef.id,
                    ...fields,
                    ...subCollectionsObject,
                } as DocumentValue;
            })
        );
    }

    public static async fetchFirstMatchingDocument(
        collection: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>,
        ...queries: Array<
            [
                string | FirebaseFirestore.FieldPath,
                FirebaseFirestore.WhereFilterOp,
                string
            ]
        >
    ): Promise<
        | FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>
        | undefined
    > {
        const queried = queries
            .slice(1)
            .reduce(
                (agg, q) => agg.where(...q),
                collection.where(...queries[0])
            );
        const documents = await queried.get();
        return documents.docs[0];
    }
}
