// © 2021 developed by Katie and David with ❤️❤️❤️

import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as CORS from 'cors';
import * as pdf from 'html-pdf';
import {
    CellStyle,
    StudentDbEntry,
    StudentRecordPropertyNames,
    TableHeader,
} from '../models';
import { createTablePdf, transformStudentEntriesIntoRecords } from './table';

admin.initializeApp();
const db = admin.firestore();
const cors = CORS({ origin: true });

export const roster = aGetEndpoint(async (request, response) => {
    const className = request.query.class as string;

    const pdf = await createRosterPdf(className);

    respondWithPdf(pdf, response);
});

// firebase controller
function aGetEndpoint(
    handler: (
        request: functions.https.Request,
        response: functions.Response
    ) => void
) {
    return functions.https.onRequest(async (request, response) => {
        cors(request, response, async () => handler(request, response));
    });
}

// firebase controller
function respondWithPdf(
    pdf: pdf.CreateResult,
    response: functions.Response
): void {
    pdf.toBuffer((err, buffer) => response.send(buffer.toJSON()));
}

async function createRosterPdf(className: string) {
    const students = await fetchStudents(className);

    const studentRecords = transformStudentEntriesIntoRecords(students);

    return createTablePdf({
        records: studentRecords,
        headers: studentRowHeaders,
        styleBuilder: buildStudentRecordStyle,
    });
}

const studentRowHeaders: readonly TableHeader<StudentRecordPropertyNames>[] = [
    {
        title: 'Last Name',
        propertyName: 'lastName',
    },
    {
        title: 'First Name',
        propertyName: 'firstName',
    },
    {
        title: 'Age',
        propertyName: 'age',
    },
    {
        title: 'Parent/Guardian Names/s and #/s',
        propertyName: 'guardianContacts',
    },
    {
        title: 'Emergency Contact Info',
        propertyName: 'emergencyContacts',
    },
    {
        title: 'Authorized to Pick Up',
        propertyName: 'authorizedPickUpContacts',
    },
    {
        title: 'Code Word',
        propertyName: 'codeWord',
    },
    {
        title: 'Medications',
        propertyName: 'medications',
    },
    {
        title: 'Sunscreen/Bugspray',
        propertyName: 'sunscreenBugSpray',
    },
    {
        title: 'Allergies',
        propertyName: 'allergies',
    },
    {
        title: 'OK to Photograph?',
        propertyName: 'okToPhotographAndUseName',
    },
] as const;

function buildStudentRecordStyle(
    propertyName: StudentRecordPropertyNames,
    value: string,
    extras: { isImportant: boolean } | undefined
): CellStyle {
    return {
        isHighlighted: !!extras?.isImportant,
        isBold: !!extras?.isImportant,
    };
}

async function fetchStudents(
    className: string
): Promise<Array<StudentDbEntry>> {
    const classes = db.collection('classes');

    const classDocument = await fetchFirstMatchingDocument(classes, [
        'name',
        '==',
        className,
    ]);

    const classStudentRefs: Array<FirebaseFirestore.DocumentReference> =
        classDocument?.get('students') ?? [];

    const students = await getHydratedDocuments<StudentDbEntry>(
        classStudentRefs
    );

    console.log(students);
    console.log(students[1].allergies);
    console.log(students[1].medications[0].doctor);

    return students;
}

type Collection = Array<Document>;

type Document = {
    [x: string]: Document | Collection | string;
};

async function getHydratedCollection(
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
                        await getHydratedCollection(subCollectionRef)
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

async function getHydratedDocuments<DocumentValue>(
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
            }> = await Promise.all(collectionRefs.map(getHydratedCollection));

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

async function fetchFirstMatchingDocument(
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
