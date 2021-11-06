import * as admin from 'firebase-admin';

admin.initializeApp();
const db = admin.firestore();

type Collection = Array<Document>;
    
type Document = {
    [x: string]: Document | Collection | string;
};

export class DatabaseUtility {
    public static getDatabase() {
        return db;
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
                            await DatabaseUtility.getHydratedCollection(subCollectionRef)
                    )
                );
                const mergedCollections: {
                    [collectionName: string]: Array<FirebaseFirestore.DocumentData>;
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
    
    public static async getHydratedDocuments<DocumentValue>(
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
                    [collectionName: string]: Array<FirebaseFirestore.DocumentData>;
                }> = await Promise.all(collectionRefs.map(DatabaseUtility.getHydratedCollection));
    
                const subCollectionsObject: {
                    [collectionName: string]: Array<FirebaseFirestore.DocumentData>;
                } = Object.assign({}, ...collectionsList);
    
                return {
                    ...fields,
                    ...subCollectionsObject,
                } as DocumentValue;
            })
        );
    }
    
    public static async fetchFirstMatchingDocument(
        collection: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>,
        query: [
            string | FirebaseFirestore.FieldPath,
            FirebaseFirestore.WhereFilterOp,
            string
        ]
    ): Promise<
        | FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>
        | undefined
    > {
        const documents = await collection.where(...query).get();
        return documents.docs[0];
    }
}