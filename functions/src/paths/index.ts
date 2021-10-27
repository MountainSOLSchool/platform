// © 2021 developed by Katie and David with ❤️❤️❤️ 

import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as CORS from "cors";
import * as pdf from "html-pdf";
import {
  CellStyle,
  StudentDbEntry,
  StudentRecordPropertyNames,
  TableHeader,
} from "../models";
import { createTablePdf, transformStudentEntriesIntoRecords } from "./table";

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
    title: "Last Name",
    propertyName: "lastName",
  },
  {
    title: "First Name",
    propertyName: "firstName",
  },
  {
    title: "Age",
    propertyName: "age",
  },
  {
    title: "Parent/Guardian Names/s and #/s",
    propertyName: "guardianContacts"
  },
  {
    title: "Emergency Contact Info",
    propertyName: "emergencyContacts",
  },
  {
    title: "Authorized to Pick Up",
    propertyName: "authorizedPickUpContacts",
  },
  {
    title: "Code Word",
    propertyName: "codeWord",
  },
  {
    title: "Medications",
    propertyName: "medications",
  },
  {
    title: "Sunscreen/Bugspray",
    propertyName: "sunscreenBugSpray",
  },
  {
    title: "Allergies",
    propertyName: "allergies"
  },
  {
    title: "OK to Photograph?",
    propertyName: "okToPhotographAndUseName",
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
  const classes = db.collection("classes");

  const classDocument = await fetchFirstMatchingDocument(classes, [
    "name",
    "==",
    className,
  ]);

  const classStudentRefs: Array<FirebaseFirestore.DocumentReference> =
    classDocument?.get("students") ?? [];

  const students = await Promise.all(
    classStudentRefs.map(
      async (studentRef) => (await studentRef.get()).data() as StudentDbEntry
    )
  );

  return students;
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
