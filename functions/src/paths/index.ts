import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as XLSX from "xlsx";
import * as pdf from "html-pdf";
import * as CORS from "cors";

admin.initializeApp();

const db = admin.firestore();

const cors = CORS({ origin: true });

export const roster = functions.https.onRequest(async (request, response) => {
  cors(request, response, async () => {
    const className = request.query.class as string;

    const students = await getStudentsForClass(className);
  
    const spreadsheetHtml = generateSpreadsheetHtmlForClass(className, students);

    const spreadsheetPdf = pdf.create(spreadsheetHtml, { orientation: "landscape" });
  
    spreadsheetPdf.toBuffer((err, buffer) => response.send(buffer.toJSON()));
  });
});

function generateSpreadsheetHtmlForClass(className: string, students: { first_name: string; }[]) {
  console.log(students);
  
  const worksheet = XLSX.utils.aoa_to_sheet([
    [`${className} Roster`],
    [],
    ["Last Name", "First Name", "Code Word", "Can Photograph", "Can Use Name", "Can Apply Sunscreen/Bugspray"],
  ]);

  XLSX.utils.sheet_add_json(
    worksheet,
    students,
    { skipHeader: true, origin: -1, header: ["last_name", "first_name", "code_word", "ok_to_photograph", "ok_use_name_photographs", "sunscreen_bug_spray"] });

  const spreadsheetHtml = XLSX.utils.sheet_to_html(worksheet);
  return spreadsheetHtml;
}

async function getStudentsForClass(className: string) {
  const classes = db.collection("classes");

  const classDocument = await getFirstMatchingDocument(classes, [
    "name",
    "==",
    className,
  ]);
  const classStudentRefs: Array<FirebaseFirestore.DocumentReference> = classDocument?.get("students") ?? [];
  const students = await Promise.all(
    classStudentRefs.map(
      async (studentRef) => (await studentRef.get()).data() as { "first_name": string; }
    )
  );
  return students;
}

/**
 * Find the first document in the collection for the query
 * @param {CollectionReference} collection
 * @param {Array} query
 * @return {Promise} a Promise returning a QueryDocumentSnapshot or undefined
 */
async function getFirstMatchingDocument(
    collection:
      FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>,
    query: [
      string | FirebaseFirestore.FieldPath,
      FirebaseFirestore.WhereFilterOp,
      string
    ]
):
  Promise<
      FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData
  >
  | undefined> {
  const documents = await collection.where(...query).get();
  return documents.docs[0];
}
