import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as XLSX from 'xlsx';
import * as pdf from 'html-pdf';

admin.initializeApp();

const db = admin.firestore();

export const roster = functions.https.onRequest(async (request, response) => {
  const classes = db.collection('classes');

  const className = request.query.class as string;

  const knotsClassDocument = await getFirstMatchingDocument(classes, [
    'name',
    '==',
    className,
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
  const worksheet = XLSX.utils.aoa_to_sheet([
    [`${className} Roster`],
    [],
    ["Last Name", "First Name"]
  ]);
  XLSX.utils.sheet_add_json(worksheet, students, { skipHeader: true, origin: -1, header: ["last_name", "first_name"] });

  const spreadsheetHtml = XLSX.utils.sheet_to_html(worksheet);
  const spreadsheetPdf = pdf.create(spreadsheetHtml);

  spreadsheetPdf.toBuffer((err, buffer) => response.send(buffer.toJSON()));
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
