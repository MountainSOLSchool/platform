import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

const db = admin.firestore();

export const roster = functions.https.onRequest(async (request, response) => {
  const classes = db.collection('classes');

  const knotsClassDocument = await getFirstMatchingDocument(classes, [
    'name',
    '==',
    request.query.class as string,
  ]);
  const knotClassStudentRefs: Array<FirebaseFirestore.DocumentReference> =
    knotsClassDocument?.get('students') ?? [];
  const students = await Promise.all(
    knotClassStudentRefs.map(
      async (studentRef) =>
        (await studentRef.get()).data() as { first_name: string }
    )
  );

  // TODO: convert each student into spreadsheet row

  response.send(students);
});

async function getFirstMatchingDocument(
  collection: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>,
  query: [
    string | FirebaseFirestore.FieldPath,
    FirebaseFirestore.WhereFilterOp,
    string
  ]
):
  Promise<FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>
  | undefined> {
  const documents = await collection.where(...query).get();
  return documents.docs[0];
}
